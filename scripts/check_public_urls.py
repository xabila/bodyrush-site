#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""List sitemap and canonical URLs and check they are extension-less.

Confirms none of them end in .html, each is on https://bodyrush.app,
and each maps to a file that exists in this repo. Also checks hreflang,
og:url, JSON-LD page URLs, and that _redirects does not send /x to /x.html.
"""

import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HOST = "bodyrush.app"
ORIGIN = f"https://{HOST}"

HTML_PAGES = [
    "index.html",
    "en.html",
    "es.html",
    "de.html",
    "ja.html",
    "ko.html",
    "pt.html",
    "compare.html",
    "compare-fr.html",
    "compare-en.html",
    "compare-es.html",
    "compare-de.html",
    "compare-ja.html",
    "compare-ko.html",
    "compare-pt.html",
    "privacy.html",
    "terms.html",
    "support.html",
]


def public_path(filename: str) -> str:
    name = filename.strip().lstrip("/")
    if name in ("", "index.html"):
        return "/"
    if name.endswith("/index.html"):
        directory = name[: -len("index.html")]
        return "/" + directory if directory.endswith("/") else "/" + directory + "/"
    if name.endswith(".html"):
        return "/" + name[:-5]
    return "/" + name


def file_for_path(path: str):
    if path == "/":
        return ROOT / "index.html"
    if path.endswith("/"):
        return ROOT / path.strip("/") / "index.html"
    rel = path.lstrip("/")
    if "." in Path(rel).name:
        return ROOT / rel
    return ROOT / (rel + ".html")


def split_url(url: str):
    parsed = urlparse(url.strip())
    return parsed.scheme, parsed.netloc, parsed.path or "/", parsed.query, parsed.fragment


class Report:
    def __init__(self):
        self.errors = []
        self.rows = []

    def check(self, kind: str, url: str, source: str):
        scheme, host, path, query, fragment = split_url(url)
        path_for_file = path
        problems = []
        if scheme != "https" or host != HOST:
            problems.append(f"hôte attendu {ORIGIN}, reçu {scheme}://{host}")
        if path.endswith(".html") or path.endswith(".html/"):
            problems.append("finit par .html")
        target = file_for_path(path_for_file)
        if not target.is_file():
            problems.append(f"fichier introuvable ({target.relative_to(ROOT)})")
        status = "OK" if not problems else "ERREUR"
        self.rows.append((status, kind, url, source, "; ".join(problems)))
        if problems:
            self.errors.append(f"{kind} {url} ({source}): {'; '.join(problems)}")


def sitemap_urls(report: Report):
    text = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for loc in re.findall(r"<loc>\s*([^<]+?)\s*</loc>", text):
        report.check("sitemap", loc, "sitemap.xml")
    for href in re.findall(r'<xhtml:link\b[^>]*\bhref="([^"]+)"', text):
        report.check("sitemap-hreflang", href, "sitemap.xml")


def html_urls(report: Report):
    for page in HTML_PAGES:
        text = (ROOT / page).read_text(encoding="utf-8")
        for href in re.findall(r'<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"', text):
            report.check("canonical", href, page)
        for href in re.findall(r'<link\b[^>]*rel="alternate"[^>]*hreflang="[^"]+"[^>]*href="([^"]+)"', text):
            report.check("hreflang", href, page)
        for href in re.findall(r'<meta\b[^>]*property="og:url"[^>]*content="([^"]+)"', text):
            report.check("og:url", href, page)
        for block in re.findall(
            r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',
            text,
            flags=re.S,
        ):
            try:
                data = json.loads(block)
            except json.JSONDecodeError as exc:
                report.errors.append(f"JSON-LD illisible dans {page}: {exc}")
                continue
            for url in walk_urls(data):
                if url.startswith(ORIGIN):
                    report.check("json-ld", url, page)


def walk_urls(node):
    found = []
    if isinstance(node, dict):
        for key, value in node.items():
            if key in ("url", "@id", "item", "mainEntityOfPage") and isinstance(value, str):
                found.append(value.split("#", 1)[0])
            else:
                found.extend(walk_urls(value))
    elif isinstance(node, list):
        for item in node:
            found.extend(walk_urls(item))
    return found


def parse_redirects():
    rules = []
    path = ROOT / "_redirects"
    if not path.is_file():
        return rules
    for lineno, raw in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) < 2:
            continue
        source, dest = parts[0], parts[1]
        code = parts[2] if len(parts) > 2 else "302"
        rules.append((lineno, source, dest, code))
    return rules


def rule_matches(pattern: str, path: str):
    if "*" not in pattern and ":" not in pattern:
        return pattern == path
    regex = "^" + re.escape(pattern).replace(r"\*", "(.*)") + "$"
    return re.match(regex, path) is not None


def destination_for(rules, path: str):
    for _lineno, source, dest, _code in rules:
        if rule_matches(source, path):
            return dest
    return None


def check_redirects(report: Report):
    rules = parse_redirects()
    wanted = {("/fr", "/", "301"), ("/fr/", "/", "301"), ("/fr/*", "/", "301")}
    found = {(src, dest, code) for _n, src, dest, code in rules}
    missing = wanted - found
    if missing:
        report.errors.append(f"_redirects incomplet, règles manquantes: {sorted(missing)}")
    for lineno, source, dest, _code in rules:
        if source == dest:
            report.errors.append(f"_redirects:{lineno} boucle {source} → {dest}")
        if dest.endswith(".html"):
            report.errors.append(
                f"_redirects:{lineno} {source} → {dest} (une URL propre ne doit pas viser un .html)"
            )
    for page in HTML_PAGES:
        pretty = public_path(page)
        dest = destination_for(rules, pretty)
        if dest:
            report.errors.append(f"_redirects envoie {pretty} vers {dest}")
        html_url = "/" + page
        dest_html = destination_for(rules, html_url)
        if dest_html and dest_html.rstrip("/") == pretty.rstrip("/"):
            report.errors.append(
                f"_redirects renvoie {html_url} vers {dest_html}, en conflit avec Pretty URLs"
            )
    for sample in ("/fr", "/fr/", "/fr/compare", "/fr/en"):
        dest = destination_for(rules, sample)
        if dest != "/":
            report.errors.append(f"_redirects: {sample} devrait aller vers /, obtenu {dest}")
    home = destination_for(rules, "/")
    if home:
        report.errors.append(f"_redirects redirige / vers {home}")


def leftover_html_links():
    leftovers = []
    targets = [ROOT / name for name in HTML_PAGES]
    targets += [ROOT / "sitemap.xml", ROOT / "robots.txt", ROOT / "llms.txt", ROOT / "llms-full.txt", ROOT / "script.js", ROOT / "script.min.js"]
    pattern = re.compile(r"https://(?:www\.)?bodyrush\.app/[^\s\"'<>]*\.html|href=[\"'][^\"']+\.html")
    for path in targets:
        text = path.read_text(encoding="utf-8")
        for match in pattern.findall(text):
            leftovers.append(f"{path.relative_to(ROOT)}: {match}")
    return leftovers


def main():
    report = Report()
    sitemap_urls(report)
    html_urls(report)
    check_redirects(report)
    leftovers = leftover_html_links()

    print(f"{'statut':<8} {'type':<18} {'source':<18} url")
    seen = set()
    for status, kind, url, source, problem in report.rows:
        key = (kind, url)
        if key in seen and status == "OK":
            continue
        seen.add(key)
        extra = f"  ({problem})" if problem else ""
        print(f"{status:<8} {kind:<18} {source:<18} {url}{extra}")

    unique_ok = sorted({url for status, _k, url, _s, _p in report.rows if status == "OK"})
    print()
    print(f"URL distinctes OK : {len(unique_ok)}")
    print(f"Contrôles : {len(report.rows)}")
    if leftovers:
        print()
        print("Liens .html encore présents :")
        for item in leftovers:
            print(f"  {item}")
        report.errors.append(f"{len(leftovers)} lien(s) .html restant(s)")
    if report.errors:
        print()
        print("ÉCHECS :")
        for err in report.errors:
            print(f"  - {err}")
        return 1
    print("Aucune URL de sitemap ou de canonique ne finit par .html, et chaque URL a un fichier.")
    print("_redirects envoie /fr et /fr/* vers / et ne crée pas de boucle /x → /x.html.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
