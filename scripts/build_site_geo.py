#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Deterministic Static Multilingual GEO + Lighthouse 100 + Web-to-App Funnel Builder for BodyRush.app
Generates:
- 7 native pre-rendered landing pages: index.html (fr), en.html, es.html, de.html, ja.html, ko.html, pt.html
- 8 native regional comparison pages: compare-fr.html .. compare-pt.html + compare.html
- Upgraded llms.txt, llms-full.txt, robots.txt, sitemap.xml
Never touches privacy.html or assets/videos/*.
"""

import html
import io
import json
import os
import re
import sys
import qrcode
import qrcode.image.svg

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(SCRIPT_DIR)
sys.path.insert(0, SCRIPT_DIR)

from i18n_missing_keys import MISSING_I18N
from regional_geo_pack import UI_EXTRAS, REGIONAL_GEO

SCRATCH_DIR = "/Users/xabi/.gemini/antigravity/brain/88adde27-e860-42fd-a448-e1856e8145e9/scratch"
LANG_ORDER = ["fr", "en", "es", "de", "ja", "ko", "pt"]
LANG_PILL_LABELS = {
    "fr": "🇫🇷 Français",
    "en": "🇺🇸 English",
    "es": "🇪🇸 Español",
    "de": "🇩🇪 Deutsch",
    "ja": "🇯🇵 日本語",
    "ko": "🇰🇷 한국어",
    "pt": "🇧🇷 Português",
}

CAP_FILES = [
    ("capture_fr_01_corridor", 780, 1688),
    ("capture_fr_02_posture", 780, 1688),
    ("capture_fr_03_turborun", 780, 1688),
    ("capture_fr_04_crystal_smash", 780, 1688),
    ("capture_fr_05_airplay_tv", 800, 450),
    ("capture_fr_06_iphone_skeleton", 800, 1732),
    ("capture_fr_07_ipad_portrait", 800, 1068),
    ("capture_fr_08_ipad_paysage", 800, 600),
]


def esc(val: str) -> str:
    return html.escape(str(val), quote=True)


def public_path(filename: str) -> str:
    """URL path served by Cloudflare Pages Pretty URLs.

    Files stay on disk (page.html is still page.html). index.html is /,
    and a nested xx/index.html is /xx/. Other HTML files drop the extension
    with no trailing slash, matching the live 308 (/en.html -> /en).
    """
    name = (filename or "").strip().lstrip("/")
    if name in ("", "index.html"):
        return "/"
    if name.endswith("/index.html"):
        directory = name[: -len("index.html")]
        return "/" + directory if directory.endswith("/") else "/" + directory + "/"
    if name.endswith(".html"):
        return "/" + name[:-5]
    return "/" + name


def public_url(filename: str) -> str:
    path = public_path(filename)
    if path == "/":
        return "https://bodyrush.app/"
    return "https://bodyrush.app" + path


def make_qr_svg(target_url: str) -> str:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=8,
        border=1,
    )
    qr.add_data(target_url)
    qr.make(fit=True)
    img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    buf = io.BytesIO()
    img.save(buf)
    svg_str = buf.getvalue().decode("utf-8")
    svg_str = re.sub(r"<\?xml[^>]*\?>\s*", "", svg_str)
    svg_str = svg_str.replace("<svg ", '<svg role="img" aria-hidden="true" ')
    return svg_str.strip()


def build_hreflang_links(is_compare: bool) -> str:
    lines = []
    for code in LANG_ORDER:
        ux = UI_EXTRAS[code]
        filename = ux["compare_file"] if is_compare else ux["page_file"]
        url = public_url(filename)
        lines.append(f'  <link rel="alternate" hreflang="{ux["hreflang"]}" href="{url}">')
    x_def = public_url("compare-en.html" if is_compare else "en.html")
    lines.append(f'  <link rel="alternate" hreflang="x-default" href="{x_def}">')
    return "\n".join(lines)


def build_landing_page(lang: str, d: dict) -> str:
    ux = UI_EXTRAS[lang]
    rg = REGIONAL_GEO[lang]
    canonical = public_url(ux["page_file"])
    qr_url = f"{canonical}?utm_source=qr_desktop"
    qr_svg = make_qr_svg(qr_url)

    def t(key: str) -> str:
        return esc(d[key])

    # Build 5 FAQ items (3 core + 2 regional competitor/privacy FAQs)
    faqs = [
        {"q": d["faq_1_q"], "a": d["faq_1_a"]},
        {"q": d["faq_2_q"], "a": d["faq_2_a"]},
        {"q": d["faq_3_q"], "a": d["faq_3_a"]},
    ] + rg["extra_faqs"]

    ld_graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "@id": f"{canonical}#app",
                "name": "BodyRush 3D: Fitness & Boxing",
                "alternateName": "BodyRush 3D",
                "operatingSystem": "iOS 17+, iPadOS 17+",
                "applicationCategory": ["GameApplication", "HealthApplication"],
                "inLanguage": ["fr", "en", "es", "de", "ja", "ko", "pt-BR"],
                "url": canonical,
                "sameAs": [
                    "https://apps.apple.com/app/id6826362298",
                    "https://music.apple.com/fr/artist/bodyrush/6827231272",
                    "https://open.spotify.com/artist/6kslBKo5tQu34L0OW31PLT"
                ],
                "description": rg["landing_desc"],
                "author": {"@type": "Person", "name": "Xavier Larrodé"},
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "EUR",
                    "category": "free",
                    "description": d["f_1"] + " · " + d["f_2"]
                }
            },
            {
                "@type": "VideoObject",
                "@id": f"{canonical}#hero-video-schema",
                "name": rg["landing_title"],
                "description": rg["landing_desc"],
                "thumbnailUrl": "https://bodyrush.app/assets/images/hero_loop_poster_960w.webp",
                "contentUrl": "https://bodyrush.app/assets/videos/hero-loop.mp4",
                "uploadDate": "2026-10-29T08:00:00+01:00",
                "duration": "PT8S"
            },
            {
                "@type": "FAQPage",
                "@id": f"{canonical}#faq-schema",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": f["q"],
                        "acceptedAnswer": {"@type": "Answer", "text": f["a"]}
                    }
                    for f in faqs
                ]
            },
            {
                "@type": "MusicAlbum",
                "name": "Spooky Mansion Synth",
                "image": "https://bodyrush.app/assets/images/bo_cover_512.webp",
                "byArtist": {
                    "@type": "MusicGroup",
                    "name": "BodyRush",
                    "sameAs": [
                        "https://music.apple.com/fr/artist/bodyrush/6827231272",
                        "https://www.deezer.com/artist/424747311",
                        "https://open.spotify.com/artist/6kslBKo5tQu34L0OW31PLT"
                    ]
                },
                "numTracks": 26,
                "datePublished": "2026-10-28",
                "sameAs": [
                    "https://music.apple.com/fr/album/spooky-mansion-synth/6827952184",
                    "https://www.deezer.com/album/1132693631"
                ]
            }
        ]
    }
    ld_json_str = json.dumps(ld_graph, ensure_ascii=False, separators=(",", ":"))

    # Language bar pills (real crawlable links!)
    lang_pills = []
    for code in LANG_ORDER:
        c_ux = UI_EXTRAS[code]
        active_cls = " is-active" if code == lang else ""
        aria_cur = ' aria-current="page"' if code == lang else ""
        lang_pills.append(
            f'          <a href="{public_path(c_ux["page_file"])}" class="cmp-lang-pill{active_cls}" hreflang="{c_ux["hreflang"]}"{aria_cur}>{LANG_PILL_LABELS[code]}</a>'
        )
    lang_pills.append(
        f'          <a href="{public_path(ux["compare_file"])}" id="hero-cmp-link" class="cmp-lang-pill cmp-lang-pill--cta">{t("hero_cmp_cta")}</a>'
    )
    lang_bar_html = "\n".join(lang_pills)

    # Captures slides & thumbs
    cap_slides_html = []
    cap_thumbs_html = []
    for idx, (stem, w, h) in enumerate(CAP_FILES):
        num = idx + 1
        c_title = t(f"cap{num}_title")
        c_txt = t(f"cap{num}_txt")
        c_alt = t(f"cap{num}_alt")
        is_first = idx == 0
        slide_cls = "cap-slide is-active" if is_first else "cap-slide"
        aria_hid = "" if is_first else ' aria-hidden="true"'
        thumb_160 = f"assets/images/thumbs/{stem}_160w.webp"
        shot_480 = f"assets/images/thumbs/{stem}_480w.webp"
        shot_full = f"assets/images/{stem}.webp"
        cap_slides_html.append(
            f'                <div class="{slide_cls}" data-index="{idx}" data-cap-title="{c_title}" data-cap-desc="{c_txt}"{aria_hid}>\n'
            f'                  <img class="cap-blur" src="{thumb_160}" alt="" aria-hidden="true" width="{w}" height="{h}" loading="lazy" decoding="async" draggable="false">\n'
            f'                  <img class="cap-shot" src="{shot_480}" srcset="{shot_480} 480w, {shot_full} {w}w" sizes="(max-width: 720px) 88vw, 680px" alt="{c_alt}" width="{w}" height="{h}" loading="lazy" decoding="async" draggable="false">\n'
            f'                </div>'
        )
        t_cls = "cap-thumb is-active" if is_first else "cap-thumb"
        t_cur = ' aria-current="true"' if is_first else ""
        cap_thumbs_html.append(
            f'            <button type="button" class="{t_cls}" aria-label="{c_title}"{t_cur}>\n'
            f'              <img src="{thumb_160}" alt="" width="{w}" height="{h}" loading="lazy" decoding="async" draggable="false">\n'
            f'            </button>'
        )

    faq_items_html = []
    for idx, f in enumerate(faqs):
        open_attr = " open" if idx == 0 else ""
        faq_items_html.append(
            f'            <details class="arcade-faq-item"{open_attr}>\n'
            f'              <summary>{esc(f["q"])}</summary>\n'
            f'              <p>{esc(f["a"])}</p>\n'
            f'            </details>'
        )

    hreflangs = build_hreflang_links(is_compare=False)

    return f"""<!DOCTYPE html>
<html lang="{ux['html_lang']}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{esc(rg['landing_title'])}</title>
  <meta name="description" content="{esc(rg['landing_desc'])}">
  <meta name="keywords" content="{esc(rg['landing_keywords'])}">
  <meta name="author" content="Xavier Larrodé">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="google-site-verification" content="oM705YGiixIIj7YJQ0IDfaFJlAyetyEdYUK7v9ncgzU">

  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical}">
  <meta property="og:title" content="{esc(rg['landing_title'])}">
  <meta property="og:description" content="{esc(rg['landing_desc'])}">
  <meta property="og:image" content="https://bodyrush.app/assets/images/hero_loop_poster_960w.webp">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(rg['landing_title'])}">
  <meta name="twitter:description" content="{esc(rg['landing_desc'])}">
  <meta name="twitter:image" content="https://bodyrush.app/assets/images/hero_loop_poster_960w.webp">

  <link rel="canonical" href="{canonical}">
{hreflangs}
  <link rel="alternate" type="text/plain" href="https://bodyrush.app/llms.txt" title="BodyRush 3D — LLM Summary">
  <link rel="alternate" type="text/plain" href="https://bodyrush.app/llms-full.txt" title="BodyRush 3D — Full LLM Documentation">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/images/favicon-64.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
  <meta name="apple-itunes-app" content="app-id=6826362298">
  <meta name="theme-color" content="#0A0B14">

  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/chakra-petch-700-latin.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/Barlow-600-latin.woff2" crossorigin>
  <link rel="preload" as="image" href="assets/images/hero_loop_poster_960w.webp" fetchpriority="high">
  <link rel="stylesheet" href="styles.min.css?v=20261112">

  <script type="application/ld+json">{ld_json_str}</script>
</head>
<body>

  <!-- TOP IN-APP HUD BAR -->
  <header class="hud-header" id="site-header">
    <div class="hud-header-inner">
      <a href="#arcade-lobby" class="app-brand">
        <img src="assets/images/app_icon_96.webp" alt="BodyRush 3D" class="app-brand-icon" width="44" height="44">
        <div class="app-brand-titles">
          <span class="app-brand-name">BODYRUSH 3D</span>
          <span class="app-brand-sub">{t("brand_sub")}</span>
        </div>
      </a>

      <div class="hud-telemetry-pill" id="hud-telemetry" aria-label="Telemetry HUD">
        <span class="hud-example-badge">{t("hud_example")}</span>
        <div class="combo-ring-mini" aria-hidden="true"><span>x8</span></div>
        <div class="hud-Streak-badge">{t("hud_streak")}</div>
        <div class="hud-kcal-badge">284 KCAL</div>
        <div class="hud-fps-badge">60 FPS</div>
      </div>

      <nav class="hud-nav" id="site-nav" aria-label="{t('footer_menu')}">
        <a href="#arcade-lobby" class="hud-nav-btn active">{t("nav_console")}</a>
        <a href="#gameplay-deck" class="hud-nav-btn">{t("nav_moves")}</a>
        <a href="#captures-wall" class="hud-nav-btn">{t("nav_captures")}</a>
        <a href="#tv-salon" class="hud-nav-btn">{t("nav_tv")}</a>
        <a href="#comparatif" class="hud-nav-btn">{t("nav_compare")}</a>
        <a href="#pro-pass" class="hud-nav-btn hud-nav-pro">{t("nav_pro")}</a>
      </nav>

      <div class="hud-actions">
        <button type="button" class="hud-menu-btn" id="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="{esc(ux['menu_aria'])}">
          <span>{t("nav_menu")}</span>
        </button>
        <button type="button" class="hud-lang-btn" id="lang-toggle" aria-label="{esc(ux['lang_aria'])}">
          <span id="lang-flag" aria-hidden="true">{ux['flag']}</span>
          <span id="lang-code">{ux['code']}</span>
        </button>
        <a href="#vip-waitlist-box" class="hud-store-btn" id="hud-waitlist-cta">
          <svg viewBox="0 0 170 170" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.42-6.19-9.39-10.9-20.09-14.13-32.09-3.23-12-4.85-23.32-4.85-33.97 0-14.42 3.63-26.4 10.9-35.95 7.27-9.55 16.48-14.43 27.64-14.65 4.35 0 9.27 1.15 14.76 3.44 5.48 2.29 9.38 3.5 11.71 3.65 1.96-.15 5.92-1.36 11.89-3.65 5.97-2.29 10.88-3.32 14.73-3.08 13.43.83 23.94 5.96 31.54 15.4-11.89 7.27-17.7 17.1-17.44 29.49.27 9.8 4.18 18.06 11.74 24.78 7.56 6.72 16.48 10.45 26.77 11.2-.82 2.61-1.85 5.34-3.09 8.19zm-38.3-108.38c0-7.39 2.64-14.28 7.92-20.67 5.28-6.39 12-10.44 20.15-12.16.54 2.28.81 4.56.81 6.84 0 7.39-2.73 14.39-8.19 21-5.46 6.61-12.28 10.63-20.47 12.06-.11-2.39-.22-4.75-.22-7.07z"/>
          </svg>
          <span>{t("cta_store_short")}</span>
        </a>
      </div>
    </div>
  </header>

  <main>
    <!-- HERO: INTERACTIVE GAME LOBBY CONSOLE + LIVE 3D CORRIDOR VIEWPORT -->
    <section class="arcade-lobby-section" id="arcade-lobby">
      <div class="lobby-container">

        <!-- 7-LANGUAGE NATIVE STATIC BAR (CRAWLABLE BY GOOGLE & ALL LLMs) -->
        <nav class="cmp-lang-bar" id="hero-lang-bar" aria-label="Languages">
{lang_bar_html}
        </nav>

        <!-- Top Game Banner -->
        <div class="lobby-hero-banner">
          <div class="lobby-hero-copy">
            <div class="game-status-row">
              <a href="#vip-waitlist-box" class="status-pill status-gold js-scroll-waitlist">{t("hero_pill_soon")}</a>
              <span class="status-pill status-green">{t("hero_pill_cam")}</span>
              <span class="status-pill status-cyan">{t("hero_pill_gear")}</span>
              <span class="status-pill status-cyan">{t("hero_pill_devices")}</span>
            </div>
            <h1 class="game-main-title">{t("hero_h1")}</h1>
            <p class="game-main-lead">{t("hero_lead")}</p>

            <!-- WEB-TO-APP 20-SECOND QUIZ BUILDER + VIP PASS / TESTFLIGHT + INLINE QR -->
            <div class="vip-waitlist-card" id="vip-waitlist-box" aria-live="polite">
              <div class="vw-header">
                <span class="vw-badge">{t("wl_badge")}</span>
                <span class="vw-step-pill" id="vw-step-indicator">{t("wl_step_1")}</span>
              </div>

              <!-- 3-Tap Personalized Living-Room TV Workout Quiz -->
              <div class="quiz-builder-wrap">
                <span class="quiz-builder-label">{esc(ux['quiz_heading'])}</span>
                <div class="quiz-rows-stack">
                  <div class="quiz-pill-row">
                    <span class="quiz-row-tag">{esc(ux['quiz_space_tag'])}</span>
                    <button type="button" class="quiz-choice-pill is-selected" data-quiz-group="space" data-quiz-val="nojump" aria-pressed="true">{esc(ux['quiz_opt_nojump'])}</button>
                    <button type="button" class="quiz-choice-pill" data-quiz-group="space" data-quiz-val="full" aria-pressed="false">{esc(ux['quiz_opt_full'])}</button>
                    <button type="button" class="quiz-choice-pill" data-quiz-group="space" data-quiz-val="nosquat" aria-pressed="false">{esc(ux['quiz_opt_nosquat'])}</button>
                  </div>
                  <div class="quiz-pill-row">
                    <span class="quiz-row-tag">{esc(ux['quiz_who_tag'])}</span>
                    <button type="button" class="quiz-choice-pill is-selected" data-quiz-group="who" data-quiz-val="solo" aria-pressed="true">{esc(ux['quiz_opt_solo'])}</button>
                    <button type="button" class="quiz-choice-pill" data-quiz-group="who" data-quiz-val="party" aria-pressed="false">{esc(ux['quiz_opt_party'])}</button>
                  </div>
                  <div class="quiz-pill-row">
                    <span class="quiz-row-tag">{esc(ux['quiz_time_tag'])}</span>
                    <button type="button" class="quiz-choice-pill is-selected" data-quiz-group="time" data-quiz-val="5m" aria-pressed="true">{esc(ux['quiz_opt_5m'])}</button>
                    <button type="button" class="quiz-choice-pill" data-quiz-group="time" data-quiz-val="10m" aria-pressed="false">{esc(ux['quiz_opt_10m'])}</button>
                  </div>
                </div>
                <div class="quiz-plan-output">
                  <strong id="quiz-plan-title">{esc(ux['quiz_init_title'])}</strong>
                  <span id="quiz-plan-meta">{esc(ux['quiz_init_meta'])}</span>
                </div>
              </div>

              <form class="vw-step active" id="vw-step-2" novalidate>
                <div class="vw-device-buttons" style="margin-bottom: 10px;">
                  <button type="button" class="vw-device-btn vw-device-ios is-selected" data-device="ios" id="btn-device-ios">
                    <svg viewBox="0 0 170 170" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.42-6.19-9.39-10.9-20.09-14.13-32.09-3.23-12-4.85-23.32-4.85-33.97 0-14.42 3.63-26.4 10.9-35.95 7.27-9.55 16.48-14.43 27.64-14.65 4.35 0 9.27 1.15 14.76 3.44 5.48 2.29 9.38 3.5 11.71 3.65 1.96-.15 5.92-1.36 11.89-3.65 5.97-2.29 10.88-3.32 14.73-3.08 13.43.83 23.94 5.96 31.54 15.4-11.89 7.27-17.7 17.1-17.44 29.49.27 9.8 4.18 18.06 11.74 24.78 7.56 6.72 16.48 10.45 26.77 11.2-.82 2.61-1.85 5.34-3.09 8.19zm-38.3-108.38c0-7.39 2.64-14.28 7.92-20.67 5.28-6.39 12-10.44 20.15-12.16.54 2.28.81 4.56.81 6.84 0 7.39-2.73 14.39-8.19 21-5.46 6.61-12.28 10.63-20.47 12.06-.11-2.39-.22-4.75-.22-7.07z"/>
                    </svg>
                    <span>{t("wl_btn_ios")}</span>
                    <span class="vw-btn-tag">{t("wl_tag_tf")}</span>
                  </button>
                  <button type="button" class="vw-device-btn vw-device-other" data-device="android" id="btn-device-other">
                    <span>{t("wl_btn_other")}</span>
                  </button>
                </div>
                <div class="vw-input-row">
                  <input type="email" id="vw-email-input" class="vw-email-input" name="email" required autocomplete="email" placeholder="{t('wl_email_ph')}" aria-label="Email">
                  <button type="submit" class="vw-submit-btn" id="vw-submit-btn">{t("wl_submit")}</button>
                </div>
                <div class="vw-bottom-meta">
                  <p class="vw-privacy-micro">{t("wl_micro_priv")}</p>
                  <button type="button" class="qr-toggle-btn" id="qr-toggle-btn" aria-expanded="false" aria-controls="qr-handoff-drawer">{esc(ux['qr_btn'])}</button>
                </div>
              </form>

              <div class="qr-handoff-drawer" id="qr-handoff-drawer">
                <div class="qr-svg-box">{qr_svg}</div>
                <div class="qr-copy-col">
                  <strong>{esc(ux['qr_title'])}</strong>
                  <span>{esc(ux['qr_desc'])}</span>
                </div>
              </div>

              <div class="vw-step" id="vw-step-3">
                <div class="vw-success-box">
                  <span class="vw-success-icon">🎉</span>
                  <div class="vw-success-copy">
                    <strong id="vw-success-title">{t("wl_ok_title")}</strong>
                    <span id="vw-success-desc">{t("wl_ok_desc")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <figure class="lobby-hero-photo">
            <video id="lobby-hero-video" muted loop playsinline preload="none" poster="assets/images/hero_loop_poster_960w.webp" data-mp4="assets/videos/hero-loop.mp4?v=20261029f" data-webm="assets/videos/hero-loop.webm" width="1280" height="720" aria-label="{t('hero_photo_alt')}"></video>
          </figure>
        </div>

        <!-- SPLIT GAME COCKPIT -->
        <div class="cockpit-grid">

          <!-- LEFT PANEL: IN-APP 3-STEP MENU CONSOLE -->
          <div class="app-menu-console" aria-label="{t('console_header')}">

            <div class="console-top-bar">
              <div class="console-title-group">
                <span class="console-dot"></span>
                <span class="console-window-title">{t("console_header")}</span>
              </div>
              <span class="console-handsfree-hint">{t("console_handsfree")}</span>
            </div>

            <div class="tuto-callout-banner" id="btn-select-tutorial" role="button" tabindex="0">
              <div class="tuto-icon-box">🎓</div>
              <div class="tuto-copy-box">
                <strong>{t("tuto_title")}</strong>
                <span>{t("tuto_sub")}</span>
              </div>
              <span class="tuto-pill-cta">{t("tuto_btn")}</span>
            </div>

            <div class="console-step-tabs" role="tablist" aria-label="Console steps">
              <button type="button" class="step-tab active" data-step="1" role="tab" aria-selected="true" aria-controls="pane-step-1" id="tab-step-1">
                <span class="step-check">1</span>
                <span>{t("tab_1_label")}</span>
              </button>
              <button type="button" class="step-tab" data-step="2" role="tab" aria-selected="false" aria-controls="pane-step-2" id="tab-step-2">
                <span class="step-check">2</span>
                <span>{t("tab_2_label")}</span>
              </button>
              <button type="button" class="step-tab" data-step="3" role="tab" aria-selected="false" aria-controls="pane-step-3" id="tab-step-3">
                <span class="step-check">3</span>
                <span>{t("tab_3_label")}</span>
              </button>
            </div>

            <!-- STEP 1: 6 WORLDS -->
            <div class="console-step-pane active" id="pane-step-1" role="tabpanel" aria-labelledby="tab-step-1">
              <div class="pane-section-head">
                <span class="pane-label">{t("step1_heading")}</span>
                <span class="pane-sub-hint">{t("step1_hint")}</span>
              </div>

              <div class="worlds-console-grid">
                <div class="world-card-wrap">
                  <button type="button" class="world-console-card selected" data-world="toyStory" style="--world-accent: #33A6FF;">
                    <div class="wc-top">
                      <span class="wc-emoji">🐱</span>
                      <img src="assets/stickers/villain_toystory_mainecoon.webp" alt="Maine Coon" class="wc-sprite" width="48" height="48" loading="lazy" decoding="async">
                      <span class="wc-badge-free">{esc(ux['free_world_tag'])}</span>
                    </div>
                    <div class="wc-title">{t("w_toy_title")}</div>
                    <div class="wc-sub">{t("w_toy_sub")}</div>
                  </button>
                  <a class="wc-music-pill wc-music-link" href="#bo">🎵 Clockwork · 128 BPM <span class="wc-music-go" aria-hidden="true">▶</span><span class="sr-only">{t("bo_pill_sr")}</span></a>
                </div>

                <div class="world-card-wrap">
                  <button type="button" class="world-console-card" data-world="sakuraZen" style="--world-accent: #FF6BC7;">
                    <div class="wc-top">
                      <span class="wc-emoji">🌸</span>
                      <img src="assets/stickers/villain_sakura_pink_panda.webp" alt="Pink Panda" class="wc-sprite" width="48" height="48" loading="lazy" decoding="async">
                      <span class="wc-badge-pro">🔒 PRO</span>
                    </div>
                    <div class="wc-title">{t("w_sakura_title")}</div>
                    <div class="wc-sub">{t("w_sakura_sub")}</div>
                  </button>
                  <a class="wc-music-pill wc-music-link" href="#bo">🎵 Candy Velocity · 130 BPM <span class="wc-music-go" aria-hidden="true">▶</span><span class="sr-only">{t("bo_pill_sr")}</span></a>
                </div>

                <div class="world-card-wrap">
                  <button type="button" class="world-console-card" data-world="indianaTemple" style="--world-accent: #FFBD24;">
                    <div class="wc-top">
                      <span class="wc-emoji">🏺</span>
                      <img src="assets/stickers/villain_temple_idol.webp" alt="Tiki Idol" class="wc-sprite" width="48" height="48" loading="lazy" decoding="async">
                      <span class="wc-badge-pro">🔒 PRO</span>
                    </div>
                    <div class="wc-title">{t("w_temple_title")}</div>
                    <div class="wc-sub">{t("w_temple_sub")}</div>
                  </button>
                  <a class="wc-music-pill wc-music-link" href="#bo">🎵 Hardened Clockwork · 136 BPM <span class="wc-music-go" aria-hidden="true">▶</span><span class="sr-only">{t("bo_pill_sr")}</span></a>
                </div>

                <div class="world-card-wrap">
                  <button type="button" class="world-console-card" data-world="superHot" style="--world-accent: #FF2E52;">
                    <div class="wc-top">
                      <span class="wc-emoji">💎</span>
                      <img src="assets/stickers/villain_red_crystal_boxer.webp" alt="Crystal Boxer" class="wc-sprite" width="48" height="48" loading="lazy" decoding="async">
                      <span class="wc-badge-pro">🔒 PRO</span>
                    </div>
                    <div class="wc-title">{t("w_red_title")}</div>
                    <div class="wc-sub">{t("w_red_sub")}</div>
                  </button>
                  <a class="wc-music-pill wc-music-link" href="#bo">🎵 Red Cristal · 134 BPM <span class="wc-music-go" aria-hidden="true">▶</span><span class="sr-only">{t("bo_pill_sr")}</span></a>
                </div>

                <div class="world-card-wrap">
                  <button type="button" class="world-console-card" data-world="halloween" style="--world-accent: #B859FF;">
                    <div class="wc-top">
                      <span class="wc-emoji">🎃</span>
                      <img src="assets/stickers/villain_halloween_golem.webp" alt="Gargoyle Golem" class="wc-sprite" width="48" height="48" loading="lazy" decoding="async">
                      <span class="wc-badge-pro">🔒 PRO</span>
                    </div>
                    <div class="wc-title">{t("w_hal_title")}</div>
                    <div class="wc-sub">{t("w_hal_sub")}</div>
                  </button>
                  <a class="wc-music-pill wc-music-link" href="#bo">🎵 Spooky Mansion · 132 BPM <span class="wc-music-go" aria-hidden="true">▶</span><span class="sr-only">{t("bo_pill_sr")}</span></a>
                </div>

                <div class="world-card-wrap">
                  <button type="button" class="world-console-card" data-world="christmas" style="--world-accent: #26E07A;">
                    <div class="wc-top">
                      <span class="wc-emoji">🎄</span>
                      <img src="assets/stickers/villain_christmas_snowman.webp" alt="Snowman" class="wc-sprite" width="48" height="48" loading="lazy" decoding="async">
                      <span class="wc-badge-pro">🔒 PRO</span>
                    </div>
                    <div class="wc-title">{t("w_xmas_title")}</div>
                    <div class="wc-sub">{t("w_xmas_sub")}</div>
                  </button>
                  <a class="wc-music-pill wc-music-link" href="#bo">🎵 Noël Express · 135 BPM <span class="wc-music-go" aria-hidden="true">▶</span><span class="sr-only">{t("bo_pill_sr")}</span></a>
                </div>
              </div>
            </div>

            <!-- STEP 2: 9 LEVELS -->
            <div class="console-step-pane" id="pane-step-2" role="tabpanel" aria-labelledby="tab-step-2">
              <div class="pane-section-head">
                <span class="pane-label">{t("step2_heading")}</span>
                <span class="pane-sub-hint">{t("step2_hint")}</span>
              </div>

              <div class="levels-console-grid">
                <button type="button" class="level-console-card selected" data-level="1" data-cat="boxe" style="--lvl-color: #FF2E52;">
                  <span class="lvl-icon">🥊</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_1_badge")}</span>
                    <strong class="lvl-name">{t("lvl_1_name")}</strong>
                    <span class="lvl-music">{t("lvl_1_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="2" data-cat="posture" style="--lvl-color: #00E5FF;">
                  <span class="lvl-icon">🙌</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_2_badge")}</span>
                    <strong class="lvl-name">{t("lvl_2_name")}</strong>
                    <span class="lvl-music">{t("lvl_2_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="3" data-cat="parkour" style="--lvl-color: #26E07A;">
                  <span class="lvl-icon">🏃</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_3_badge")}</span>
                    <strong class="lvl-name">{t("lvl_3_name")}</strong>
                    <span class="lvl-music">{t("lvl_3_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="4" data-cat="mix" style="--lvl-color: #FFBD24;">
                  <span class="lvl-icon">⚡</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_4_badge")}</span>
                    <strong class="lvl-name">{t("lvl_4_name")}</strong>
                    <span class="lvl-music">{t("lvl_4_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="5" data-cat="boxe" style="--lvl-color: #FF7A1A;">
                  <span class="lvl-icon">⚙️</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_5_badge")}</span>
                    <strong class="lvl-name">{t("lvl_5_name")}</strong>
                    <span class="lvl-music">{t("lvl_5_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="6" data-cat="parkour" style="--lvl-color: #33C9FF;">
                  <span class="lvl-icon">🧊</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_6_badge")}</span>
                    <strong class="lvl-name">{t("lvl_6_name")}</strong>
                    <span class="lvl-music">{t("lvl_6_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="7" data-cat="posture" style="--lvl-color: #FFD600;">
                  <span class="lvl-icon">☀️</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_7_badge")}</span>
                    <strong class="lvl-name">{t("lvl_7_name")}</strong>
                    <span class="lvl-music">{t("lvl_7_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="8" data-cat="mix" style="--lvl-color: #FF2E88;">
                  <span class="lvl-icon">🔥</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_8_badge")}</span>
                    <strong class="lvl-name">{t("lvl_8_name")}</strong>
                    <span class="lvl-music">{t("lvl_8_desc")}</span>
                  </div>
                </button>

                <button type="button" class="level-console-card" data-level="9" data-cat="mix" style="--lvl-color: #C96BFF; grid-column: 1 / -1;">
                  <span class="lvl-icon">🌟</span>
                  <div class="lvl-info">
                    <span class="lvl-badge">{t("lvl_9_badge")}</span>
                    <strong class="lvl-name">{t("lvl_9_name")}</strong>
                    <span class="lvl-music">{t("lvl_9_desc")}</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- STEP 3: DIFFICULTY & PARTY -->
            <div class="console-step-pane" id="pane-step-3" role="tabpanel" aria-labelledby="tab-step-3">
              <div class="pane-section-head">
                <span class="pane-label">{t("step3_heading")}</span>
                <span class="pane-sub-hint">{t("step3_hint")}</span>
              </div>

              <div class="diff-console-grid">
                <button type="button" class="diff-console-card" data-diff="chill" data-obs="40" style="--diff-color: #26E07A;">
                  <div class="dc-top">
                    <span class="dc-title">EASY · COOL</span>
                    <span class="dc-free-tag">{esc(ux['free_easy_tag'])}</span>
                  </div>
                  <div class="dc-count">~40 OBSTACLES</div>
                  <p class="dc-desc">{t("diff_1_desc")}</p>
                </button>

                <button type="button" class="diff-console-card selected" data-diff="normal" data-obs="80" style="--diff-color: #00E5FF;">
                  <div class="dc-top">
                    <span class="dc-title">NORMAL</span>
                    <span class="dc-free-tag">{esc(ux['free_normal_tag'])}</span>
                  </div>
                  <div class="dc-count">~80 OBSTACLES</div>
                  <p class="dc-desc">{t("diff_2_desc")}</p>
                </button>

                <button type="button" class="diff-console-card" data-diff="fast" data-obs="125" style="--diff-color: #FF9100;">
                  <div class="dc-top">
                    <span class="dc-title">HARD · INTENSE</span>
                    <span class="dc-pro-tag">🔒 PRO</span>
                  </div>
                  <div class="dc-count">~125 OBSTACLES</div>
                  <p class="dc-desc">{t("diff_3_desc")}</p>
                </button>

                <button type="button" class="diff-console-card" data-diff="turbo" data-obs="175" style="--diff-color: #FF2E52;">
                  <div class="dc-top">
                    <span class="dc-title">EXPERT+ · TURBO</span>
                    <span class="dc-pro-tag">🔒 PRO</span>
                  </div>
                  <div class="dc-count">~175 OBSTACLES</div>
                  <p class="dc-desc">{t("diff_4_desc")}</p>
                </button>
              </div>

              <div class="party-selector-box">
                <div class="party-selector-label">{t("party_label")}</div>
                <div class="party-pills-row">
                  <button type="button" class="party-pill active" data-players="1">{t("p_solo")}</button>
                  <button type="button" class="party-pill" data-players="2">{esc(ux['party_p2'])}</button>
                  <button type="button" class="party-pill" data-players="3">{esc(ux['party_p3'])}</button>
                  <button type="button" class="party-pill" data-players="4">{esc(ux['party_p4'])}</button>
                </div>
              </div>
            </div>

            <div class="console-bottom-bar">
              <div class="console-selection-recap">
                <span class="recap-eyebrow">{t("recap_label")}</span>
                <strong class="recap-value" id="console-recap-text">🐱 TOY KINGDOM · LVL 01 · NORMAL (~80 OBS) · SOLO</strong>
              </div>
              <div class="console-bottom-buttons">
                <button type="button" class="btn-console-next" id="btn-next-step">{t("btn_next_step")}</button>
                <a href="#vip-waitlist-box" class="btn-console-launch js-scroll-waitlist">{t("btn_launch_app")}</a>
              </div>
            </div>

          </div>

          <!-- RIGHT PANEL: LIVE IN-GAME 3D VIEWPORT -->
          <div class="game-viewport-column">
            <div class="arcade-viewport-frame" id="live-viewport-frame">

              <div class="vp-hud-top">
                <div class="vp-multiplier-pill">
                  <span class="vp-ring">x8</span>
                  <div class="vp-score-col">
                    <small>SCORE</small>
                    <strong id="vp-score-value">142,850</strong>
                  </div>
                  <span class="vp-kcal">🔥 284 KCAL</span>
                </div>

                <div class="vp-world-indicator" id="vp-world-badge">🐱 TOY KINGDOM · 128 BPM</div>
                <div class="vp-hearts" id="vp-hearts" aria-label="4 Hearts">❤️❤️❤️❤️</div>
              </div>

              <div class="vp-stage">
                <div class="vp-media-slide active" id="vp-slide-video" role="tabpanel" aria-labelledby="vp-tab-btn-0">
                  <video class="vp-video" id="hero-video" loop muted playsinline preload="none" poster="assets/images/thumbs/capture_fr_01_corridor_480w.webp"></video>

                  <div class="vp-world-overlay-card" id="vp-world-card">
                    <img src="assets/worlds/world_toystory_wall_thumb.webp" alt="World wall" class="vp-world-thumb" id="vp-world-wall" width="56" height="56" loading="lazy" decoding="async">
                    <div class="vp-world-meta">
                      <span class="vp-meta-tag" id="vp-meta-tag">{t("lvl_1_badge")}</span>
                      <strong class="vp-meta-title" id="vp-meta-title">Toy Kingdom — Clockwork (128 BPM)</strong>
                      <span class="vp-meta-sub" id="vp-meta-sub">{t("w_toy_sub")}</span>
                    </div>
                    <img src="assets/stickers/villain_toystory_mainecoon.webp" alt="Monster" class="vp-world-monster" id="vp-world-monster" width="54" height="54" loading="lazy" decoding="async">
                  </div>

                  <button type="button" class="vp-audio-btn" id="btn-video-sound">
                    <span id="sound-label">{esc(ux['sound_off'])}</span>
                  </button>
                </div>

                <div class="vp-media-slide" id="vp-slide-cap1" role="tabpanel" aria-labelledby="vp-tab-btn-1">
                  <img src="assets/images/thumbs/capture_fr_01_corridor_480w.webp" srcset="assets/images/thumbs/capture_fr_01_corridor_480w.webp 480w, assets/images/capture_fr_01_corridor.webp 780w" sizes="(max-width: 720px) 88vw, 420px" alt="{t('cap1_alt')}" class="vp-capture-img" width="780" height="1688" loading="lazy" decoding="async">
                </div>

                <div class="vp-media-slide" id="vp-slide-cap2" role="tabpanel" aria-labelledby="vp-tab-btn-2">
                  <img src="assets/images/thumbs/capture_fr_02_posture_480w.webp" srcset="assets/images/thumbs/capture_fr_02_posture_480w.webp 480w, assets/images/capture_fr_02_posture.webp 780w" sizes="(max-width: 720px) 88vw, 420px" alt="{t('cap2_alt')}" class="vp-capture-img" width="780" height="1688" loading="lazy" decoding="async">
                </div>

                <div class="vp-media-slide" id="vp-slide-cap3" role="tabpanel" aria-labelledby="vp-tab-btn-3">
                  <img src="assets/images/thumbs/capture_fr_03_turborun_480w.webp" srcset="assets/images/thumbs/capture_fr_03_turborun_480w.webp 480w, assets/images/capture_fr_03_turborun.webp 780w" sizes="(max-width: 720px) 88vw, 420px" alt="{t('cap3_alt')}" class="vp-capture-img" width="780" height="1688" loading="lazy" decoding="async">
                </div>

                <div class="vp-media-slide" id="vp-slide-cap4" role="tabpanel" aria-labelledby="vp-tab-btn-4">
                  <img src="assets/images/thumbs/capture_fr_04_crystal_smash_480w.webp" srcset="assets/images/thumbs/capture_fr_04_crystal_smash_480w.webp 480w, assets/images/capture_fr_04_crystal_smash.webp 780w" sizes="(max-width: 720px) 88vw, 420px" alt="{t('cap4_alt')}" class="vp-capture-img" width="780" height="1688" loading="lazy" decoding="async">
                </div>
              </div>

              <div class="vp-switcher-bar" role="tablist" aria-label="Viewport preview">
                <button type="button" class="vp-switch-btn active" role="tab" aria-selected="true" aria-controls="vp-slide-video" id="vp-tab-btn-0" data-target="vp-slide-video">{t("vp_tab_video")}</button>
                <button type="button" class="vp-switch-btn" role="tab" aria-selected="false" aria-controls="vp-slide-cap1" id="vp-tab-btn-1" data-target="vp-slide-cap1">{t("vp_tab_c1")}</button>
                <button type="button" class="vp-switch-btn" role="tab" aria-selected="false" aria-controls="vp-slide-cap2" id="vp-tab-btn-2" data-target="vp-slide-cap2">{t("vp_tab_c2")}</button>
                <button type="button" class="vp-switch-btn" role="tab" aria-selected="false" aria-controls="vp-slide-cap3" id="vp-tab-btn-3" data-target="vp-slide-cap3">{t("vp_tab_c3")}</button>
                <button type="button" class="vp-switch-btn" role="tab" aria-selected="false" aria-controls="vp-slide-cap4" id="vp-tab-btn-4" data-target="vp-slide-cap4">{t("vp_tab_c4")}</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- SECTION 2: 4 GAMEPLAY SPECIALTIES & 10 POSTURES -->
    <section class="gameplay-deck-section" id="gameplay-deck">
      <div class="lobby-container">

        <div class="arcade-section-header">
          <div>
            <span class="arcade-kicker">{t("deck_kicker")}</span>
            <h2 class="arcade-h2">{t("deck_title")}</h2>
          </div>
          <p class="arcade-header-desc">{t("deck_desc")}</p>
        </div>

        <div class="specialty-cards-grid">
          <article class="specialty-card" style="--spec-accent: #FF2E52;">
            <div class="spec-card-head">
              <span class="spec-tag">{t("spec1_tag")}</span>
              <img src="assets/stickers/ruby_crystal_glove.webp" alt="Boxing glove" class="spec-Floating-sticker" width="64" height="64" loading="lazy" decoding="async">
            </div>
            <h3 class="spec-title">{t("spec1_title")}</h3>
            <p class="spec-text">{t("spec1_desc")}</p>
            <div class="spec-mechanic-pills">
              <span>🥊 L / R Straight</span>
              <span>💥 2-Hand Smash</span>
              <span>🦵 Super Kick</span>
            </div>
          </article>

          <article class="specialty-card" style="--spec-accent: #00E5FF;">
            <div class="spec-card-head">
              <span class="spec-tag">{t("spec2_tag")}</span>
              <img src="assets/stickers/hero_3c_vision_bones.webp" alt="Vision Skeleton" class="spec-Floating-sticker" width="58" height="70" loading="lazy" decoding="async">
            </div>
            <h3 class="spec-title">{t("spec2_title")}</h3>
            <p class="spec-text">{t("spec2_desc")}</p>
            <div class="spec-mechanic-pills">
              <span>{t("spec2_p1")}</span>
              <span>{t("spec2_p2")}</span>
              <span>{t("spec2_p3")}</span>
            </div>
          </article>

          <article class="specialty-card" style="--spec-accent: #26E07A;">
            <div class="spec-card-head">
              <span class="spec-tag">{t("spec3_tag")}</span>
              <img src="assets/stickers/obstacle_temple_boulder.webp" alt="Temple boulder" class="spec-Floating-sticker" width="64" height="64" loading="lazy" decoding="async">
            </div>
            <h3 class="spec-title">{t("spec3_title")}</h3>
            <p class="spec-text">{t("spec3_desc")}</p>
            <div class="spec-mechanic-pills">
              <span>⬅️⬆️➡️ 3 Lanes</span>
              <span>⬇️ Squat</span>
              <span>⬆️ Jump +1/+2/+3</span>
            </div>
          </article>

          <article class="specialty-card" style="--spec-accent: #FFD600;">
            <div class="spec-card-head">
              <span class="spec-tag">{t("spec4_tag")}</span>
              <img src="assets/stickers/badge_turbo_run.webp" alt="Turbo Run" class="spec-Floating-sticker" width="84" height="54" loading="lazy" decoding="async">
            </div>
            <h3 class="spec-title">{t("spec4_title")}</h3>
            <p class="spec-text">{t("spec4_desc")}</p>
            <div class="spec-mechanic-pills">
              <span>{t("spec4_p1")}</span>
              <span>⚡ 3x Distance</span>
              <span>{t("spec4_p3")}</span>
            </div>
          </article>
        </div>

        <div class="postures-showcase-panel">
          <div class="postures-panel-top">
            <div>
              <span class="pane-label">{t("poses_label")}</span>
              <p class="postures-sub">{t("poses_sub")}</p>
            </div>
            <span class="auto-glide-badge">{t("poses_autoglide")}</span>
          </div>

          <div class="postures-pills-grid">
            <div class="pose-chip"><span class="pose-emoji">🙌</span><div><strong>{t("pose_1")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">✈️</span><div><strong>{t("pose_2")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">💪</span><div><strong>{t("pose_3")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">🥊</span><div><strong>{t("pose_4")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">🏋️</span><div><strong>{t("pose_5")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">🕺</span><div><strong>{t("pose_6")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">💃</span><div><strong>{t("pose_7")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">✖️</span><div><strong>{t("pose_8")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">🦸</span><div><strong>{t("pose_9")}</strong></div></div>
            <div class="pose-chip"><span class="pose-emoji">🦸</span><div><strong>{t("pose_10")}</strong></div></div>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 3: AUTHENTIC IN-GAME SCREENSHOTS -->
    <section class="captures-wall-section" id="captures-wall">
      <div class="lobby-container">
        <div class="arcade-section-header">
          <div>
            <span class="arcade-kicker">{t("caps_kicker")}</span>
            <h2 class="arcade-h2">{t("caps_title")}</h2>
          </div>
          <p class="arcade-header-desc">{t("caps_desc")}</p>
        </div>

        <div class="cap-show" id="cap-show" style="--cap-count: 8; --cap-index: 0;">
          <div class="cap-stage" role="group" aria-label="{t('cap_stage')}">
            <div class="cap-progress" aria-hidden="true">
              <span class="cap-progress-seg is-active"><span class="cap-progress-fill"></span></span>
              <span class="cap-progress-seg"><span class="cap-progress-fill"></span></span>
              <span class="cap-progress-seg"><span class="cap-progress-fill"></span></span>
              <span class="cap-progress-seg"><span class="cap-progress-fill"></span></span>
              <span class="cap-progress-seg"><span class="cap-progress-fill"></span></span>
              <span class="cap-progress-seg"><span class="cap-progress-fill"></span></span>
              <span class="cap-progress-seg"><span class="cap-progress-fill"></span></span>
              <span class="cap-progress-seg"><span class="cap-progress-fill"></span></span>
            </div>
            <button type="button" class="cap-nav cap-prev" aria-label="{t('cap_prev')}">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button type="button" class="cap-nav cap-next" aria-label="{t('cap_next')}">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="cap-viewport">
              <div class="cap-track">
{chr(10).join(cap_slides_html)}
              </div>
            </div>
          </div>
          <div class="cap-caption" aria-live="polite">
            <strong>{t("cap1_title")}</strong>
            <span>{t("cap1_txt")}</span>
          </div>
          <div class="cap-thumbs" role="group" aria-label="{t('cap_thumbs')}">
{chr(10).join(cap_thumbs_html)}
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: AIRPLAY 16:9 TV + 2-4 PLAYER PARTY TOURNAMENT -->
    <section class="tv-salon-section" id="tv-salon">
      <div class="lobby-container">
        <div class="tv-salon-grid">

          <div class="arcade-hardware-panel">
            <span class="arcade-kicker">{t("tv_kicker")}</span>
            <h2 class="arcade-h2">{t("tv_title")}</h2>
            <p class="hardware-desc">{t("tv_desc")}</p>

            <div class="dual-screen-diagram">
              <div class="diagram-tv-box">
                <div class="diagram-tv-header">
                  <span>📺 AIRPLAY TV 16:9 (60 FPS)</span>
                  <span class="diagram-tag-green">1080p / 4K</span>
                </div>
                <div class="diagram-tv-screen">
                  <img src="assets/images/thumbs/capture_fr_05_airplay_tv_480w.webp" srcset="assets/images/thumbs/capture_fr_05_airplay_tv_480w.webp 480w, assets/images/capture_fr_05_airplay_tv.webp 800w" sizes="(max-width: 720px) 88vw, 340px" alt="{t('cap5_alt')}" style="width:100%; height:100%; object-fit:cover; display:block;" width="800" height="450" loading="lazy" decoding="async">
                </div>
              </div>

              <div class="diagram-phone-box">
                <div class="diagram-phone-header">📱 iPHONE 2M · COCKPIT</div>
                <div class="diagram-phone-body">
                  <img src="assets/images/thumbs/capture_fr_06_iphone_skeleton_160w.webp" alt="{t('cap6_alt')}" style="width:84px; height:172px; object-fit:cover; border-radius:12px; border:2px solid #00E5FF;" width="160" height="346" loading="lazy" decoding="async">
                  <div>
                    <strong>19 JOINTS · 60 FPS ✓</strong>
                    <span>{t("cap6_txt")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="arcade-party-panel">
            <span class="arcade-kicker">{t("party_kicker")}</span>
            <h2 class="arcade-h2">{t("party_title")}</h2>
            <p class="hardware-desc">{t("party_desc")}</p>

            <div class="party-steps-list">
              <div class="party-step-row">
                <span class="ps-num">1</span>
                <div>
                  <strong>{t("ps1_t")}</strong>
                  <span>{t("ps1_d")}</span>
                </div>
              </div>
              <div class="party-step-row">
                <span class="ps-num">2</span>
                <div>
                  <strong>{t("ps2_t")}</strong>
                  <span>{t("ps2_d")}</span>
                </div>
              </div>
              <div class="party-step-row">
                <span class="ps-num">3</span>
                <div>
                  <strong>{t("ps3_t")}</strong>
                  <span>{t("ps3_d")}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- SECTION 4B: REGIONAL COMPETITOR COMPARISON (YOUTUBE, SWITCH, VR & LOCAL MARKET WHY) -->
    <section class="home-cmp-section" id="comparatif" aria-labelledby="cmp-home-title">
      <div class="lobby-container">

        <div class="arcade-section-header">
          <div>
            <span class="arcade-kicker">{t("cmp_kicker")}</span>
            <h2 class="arcade-h2" id="cmp-home-title">{t("cmp_title")}</h2>
          </div>
          <p class="arcade-header-desc">{t("cmp_desc")}</p>
        </div>

        <div class="regional-why-strip" style="margin-top:0; margin-bottom:20px;">
          <strong>{esc(rg['regional_why_title'])}</strong>
          <p>{esc(rg['regional_why_body'])}</p>
        </div>

        <div class="cmp-table-scroll">
          <table class="cmp-matrix-table">
            <thead>
              <tr>
                <th scope="col">{t("cmp_col_crit")}</th>
                <th scope="col" class="cmp-col-winner-head">{t("cmp_col_br")}</th>
                <th scope="col">{t("cmp_col_yt")}</th>
                <th scope="col">{t("cmp_col_sw")}</th>
                <th scope="col">{t("cmp_col_vr")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{t("cmp_r1_k")}</th>
                <td class="cmp-col-winner">{t("cmp_r1_br")}</td>
                <td>{t("cmp_r1_yt")}</td>
                <td>{t("cmp_r1_sw")}</td>
                <td>{t("cmp_r1_vr")}</td>
              </tr>
              <tr>
                <th scope="row">{t("cmp_r2_k")}</th>
                <td class="cmp-col-winner">{t("cmp_r2_br")}</td>
                <td>{t("cmp_r2_yt")}</td>
                <td>{t("cmp_r2_sw")}</td>
                <td>{t("cmp_r2_vr")}</td>
              </tr>
              <tr>
                <th scope="row">{t("cmp_r3_k")}</th>
                <td class="cmp-col-winner">{t("cmp_r3_br")}</td>
                <td>{t("cmp_r3_yt")}</td>
                <td>{t("cmp_r3_sw")}</td>
                <td>{t("cmp_r3_vr")}</td>
              </tr>
              <tr>
                <th scope="row">{t("cmp_r4_k")}</th>
                <td class="cmp-col-winner">{t("cmp_r4_br")}</td>
                <td>{t("cmp_r4_yt")}</td>
                <td>{t("cmp_r4_sw")}</td>
                <td>{t("cmp_r4_vr")}</td>
              </tr>
              <tr>
                <th scope="row">{t("cmp_r5_k")}</th>
                <td class="cmp-col-winner">{t("cmp_r5_br")}</td>
                <td>{t("cmp_r5_yt")}</td>
                <td>{t("cmp_r5_sw")}</td>
                <td>{t("cmp_r5_vr")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cmp-duels-grid" style="margin-top:20px;">
          <article class="cmp-duel-card">
            <span class="cmp-duel-tag">{t("cmp_d1_tag")}</span>
            <h3 class="cmp-duel-title">{t("cmp_d1_title")}</h3>
            <p class="cmp-duel-sol">{t("cmp_d1_desc")}{esc(rg['extra_duel_1_note'])}</p>
          </article>
          <article class="cmp-duel-card">
            <span class="cmp-duel-tag">{t("cmp_d2_tag")}</span>
            <h3 class="cmp-duel-title">{t("cmp_d2_title")}</h3>
            <p class="cmp-duel-sol">{t("cmp_d2_desc")}</p>
          </article>
        </div>

        <div class="cmp-lang-bar" style="margin-top:20px; justify-content:space-between;">
          <span style="font-family:var(--font-mono); font-size:0.78rem; font-weight:800; color:var(--gold);">{t("cmp_guides_label")}</span>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <a href="/compare-fr" class="cmp-lang-pill" hreflang="fr">🇫🇷 Comparatif FR</a>
            <a href="/compare-en" class="cmp-lang-pill" hreflang="en">🇺🇸 Comparison EN</a>
            <a href="/compare-es" class="cmp-lang-pill" hreflang="es">🇪🇸 Comparativa ES</a>
            <a href="/compare-de" class="cmp-lang-pill" hreflang="de">🇩🇪 Vergleich DE</a>
            <a href="/compare-ja" class="cmp-lang-pill" hreflang="ja">🇯🇵 徹底比較 JA</a>
            <a href="/compare-ko" class="cmp-lang-pill" hreflang="ko">🇰🇷 완벽 비교 KO</a>
            <a href="/compare-pt" class="cmp-lang-pill" hreflang="pt-BR">🇧🇷 Comparativo PT</a>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION: SOUNDTRACK (BO) -->
    <section class="bo-section" id="bo" aria-labelledby="bo-title">
      <div class="lobby-container">
        <div class="arcade-section-header">
          <div>
            <span class="arcade-kicker">{t("bo_kicker")}</span>
            <h2 class="arcade-h2" id="bo-title">{t("bo_title")}</h2>
          </div>
          <p class="arcade-header-desc">{t("bo_desc")}</p>
        </div>

        <div class="bo-album-card">
          <div class="bo-cover">
            <span class="bo-vinyl" aria-hidden="true"></span>
            <img class="bo-cover-art" src="assets/images/bo_cover_512.webp" alt="{t('bo_cover_alt')}" width="512" height="512" loading="lazy" decoding="async">
          </div>
          <div class="bo-album-info">
            <span class="bo-album-tag">{t("bo_album_tag")}</span>
            <h3 class="bo-album-name">Spooky Mansion Synth</h3>
            <p class="bo-album-meta">{t("bo_album_meta")}</p>
            <div class="bo-platforms">
              <a class="bo-btn bo-apple" href="https://music.apple.com/fr/album/spooky-mansion-synth/6827952184" target="_blank" rel="noopener">
                <span aria-hidden="true">🎵</span> <span>{t("bo_apple")}</span>
              </a>
              <a class="bo-btn bo-deezer" href="https://www.deezer.com/album/1132693631" target="_blank" rel="noopener">
                <span aria-hidden="true">🎶</span> <span>{t("bo_deezer")}</span>
              </a>
              <a class="bo-btn bo-spotify" href="https://open.spotify.com/artist/6kslBKo5tQu34L0OW31PLT" target="_blank" rel="noopener">
                <span aria-hidden="true">🎧</span> <span>{t("bo_spotify")}</span>
              </a>
            </div>
            <a class="bo-yt-link" href="https://www.youtube.com/watch?v=AW_OVdauKso" target="_blank" rel="noopener">{t("bo_youtube")}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: PRO PASS & FAQ -->
    <section class="pro-pass-section" id="pro-pass">
      <div class="lobby-container">
        <div class="arcade-section-header">
          <div>
            <span class="arcade-kicker">{t("pro_kicker")}</span>
            <h2 class="arcade-h2">{t("pro_title")}</h2>
          </div>
          <p class="arcade-header-desc">{t("pro_desc")}</p>
        </div>

        <div class="pro-tiers-grid">
          <div class="pro-tier-card">
            <div class="pt-head">
              <span class="pt-badge">{t("free_badge")}</span>
              <h3 class="pt-name">{t("free_name")}</h3>
              <span class="pt-sub-note">{t("price_in_app")}</span>
            </div>
            <ul class="pt-list">
              <li class="pt-yes">{t("f_1")}</li>
              <li class="pt-yes">{t("f_2")}</li>
              <li class="pt-yes">{t("f_3")}</li>
              <li class="pt-yes">{t("f_4")}</li>
              <li class="pt-no">{t("f_5")}</li>
              <li class="pt-no">{t("f_6")}</li>
            </ul>
            <a href="#vip-waitlist-box" class="pt-btn pt-btn-cyan js-scroll-waitlist" data-plan="free">{t("btn_offers")}</a>
          </div>

          <div class="pro-tier-card pro-tier-featured">
            <div class="pt-ribbon">{t("vip_ribbon")}</div>
            <div class="pt-art-row">
              <img src="assets/images/iap_promo_yearly_432.webp" alt="{t('vip_name')}" class="pt-iap-img" width="216" height="216" loading="lazy" decoding="async">
              <div>
                <h3 class="pt-name text-gold">{t("vip_name")}</h3>
                <span class="pt-sub-note">{t("vip_flex")}</span>
                <span class="pt-sub-note">{t("price_in_app")}</span>
              </div>
            </div>
            <ul class="pt-list">
              <li class="pt-yes"><strong>{t("v_1")}</strong></li>
              <li class="pt-yes"><strong>{t("v_2")}</strong></li>
              <li class="pt-yes"><strong>{t("v_3")}</strong></li>
              <li class="pt-yes"><strong>{t("v_4")}</strong></li>
              <li class="pt-yes"><strong>{t("v_5")}</strong></li>
              <li class="pt-yes"><strong>{t("v_6")}</strong></li>
            </ul>
            <a href="#vip-waitlist-box" class="pt-btn pt-btn-gold js-scroll-waitlist" data-plan="annual">{t("btn_offers")}</a>
          </div>

          <div class="pro-tier-card">
            <div class="pt-art-row">
              <img src="assets/images/iap_promo_lifetime_432.webp" alt="{t('life_name')}" class="pt-iap-img" width="216" height="216" loading="lazy" decoding="async">
              <div>
                <span class="pt-badge">{t("life_badge")}</span>
                <h3 class="pt-name">{t("life_name")}</h3>
                <span class="pt-sub-note">{t("life_sub")}</span>
                <span class="pt-sub-note">{t("price_in_app")}</span>
              </div>
            </div>
            <ul class="pt-list">
              <li class="pt-yes">{t("l_1")}</li>
              <li class="pt-yes">{t("l_2")}</li>
              <li class="pt-yes">{t("l_3")}</li>
              <li class="pt-yes">{t("l_4")}</li>
              <li class="pt-yes">{t("l_5")}</li>
            </ul>
            <a href="#vip-waitlist-box" class="pt-btn pt-btn-ruby js-scroll-waitlist" data-plan="lifetime">{t("btn_offers")}</a>
          </div>
        </div>

        <div class="privacy-faq-grid">
          <div class="privacy-arcade-box">
            <div class="priv-badge">{t("priv_badge")}</div>
            <h3>{t("priv_title")}</h3>
            <p>{t("priv_desc")}</p>
            <a href="/privacy" class="priv-link">{t("priv_btn")}</a>
          </div>

          <div class="faq-arcade-box">
{chr(10).join(faq_items_html)}
          </div>
        </div>

      </div>
    </section>
  </main>

  <footer class="arcade-footer">
    <div class="lobby-container footer-inner">
      <div class="footer-brand-col">
        <div class="app-brand">
          <img src="assets/images/app_icon_96.webp" alt="BodyRush 3D" class="app-brand-icon" width="40" height="40" loading="lazy" decoding="async">
          <div class="app-brand-titles">
            <span class="app-brand-name">BODYRUSH 3D</span>
            <span class="app-brand-sub">ARCADE FITNESS · iOS &amp; iPAD</span>
          </div>
        </div>
        <p class="footer-copy-text">{t("footer_bio")}</p>
      </div>

      <div class="footer-links-row">
        <a href="/" hreflang="fr">🇫🇷 FR</a>
        <a href="/en" hreflang="en">🇺🇸 EN</a>
        <a href="/es" hreflang="es">🇪🇸 ES</a>
        <a href="/de" hreflang="de">🇩🇪 DE</a>
        <a href="/ja" hreflang="ja">🇯🇵 JA</a>
        <a href="/ko" hreflang="ko">🇰🇷 KO</a>
        <a href="/pt" hreflang="pt-BR">🇧🇷 PT</a>
        <a href="{public_path(ux['compare_file'])}">{t("nav_compare")}</a>
        <a href="#bo">{t("footer_bo")}</a>
        <a href="llms.txt">LLMs.txt</a>
        <a href="/privacy">{t("footer_priv_pol")}</a>
        <a href="/terms">{t("footer_terms")}</a>
        <a href="/support">{t("footer_support")}</a>
        <a href="mailto:xlarrodeapp+bodyrush@gmail.com">xlarrodeapp+bodyrush@gmail.com</a>
      </div>
    </div>
  </footer>

  <script src="script.min.js?v=20261112" defer></script>
  <script data-goatcounter="https://bodyrush.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
"""


def build_compare_page(lang: str, cdata: dict, out_filename: str) -> str:
    ux = UI_EXTRAS[lang]
    rg = REGIONAL_GEO[lang]
    canonical = public_url(out_filename)
    hreflangs = build_hreflang_links(is_compare=True)

    # Combine 4 core FAQs + 2 regional local-competitor FAQs = 6 rich GEO FAQs
    all_faqs = cdata["faqs"] + rg["extra_faqs"]

    ld_graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": f"{canonical}#article",
                "headline": cdata["title"],
                "description": cdata["desc"],
                "inLanguage": ux["hreflang"],
                "datePublished": "2026-11-06",
                "dateModified": "2026-11-12",
                "author": {"@type": "Person", "name": "Xavier Larrodé"},
                "publisher": {
                    "@type": "Organization",
                    "name": "BodyRush 3D",
                    "url": "https://bodyrush.app/",
                    "logo": {"@type": "ImageObject", "url": "https://bodyrush.app/assets/images/app_icon_256.png"}
                },
                "image": "https://bodyrush.app/assets/images/capture_fr_05_airplay_tv.webp",
                "mainEntityOfPage": canonical
            },
            {
                "@type": "SoftwareApplication",
                "name": "BodyRush 3D: Fitness & Boxing",
                "operatingSystem": "iOS 17+, iPadOS 17+",
                "applicationCategory": ["GameApplication", "HealthApplication"],
                "inLanguage": ["fr", "en", "es", "de", "ja", "ko", "pt-BR"],
                "url": public_url(ux["page_file"]),
                "sameAs": ["https://apps.apple.com/app/id6826362298"],
                "description": cdata["desc"],
                "author": {"@type": "Person", "name": "Xavier Larrodé"}
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "BodyRush 3D",
                        "item": public_url(ux["page_file"])
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": cdata["title"],
                        "item": canonical
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": f["q"],
                        "acceptedAnswer": {"@type": "Answer", "text": f["a"]}
                    }
                    for f in all_faqs
                ]
            }
        ]
    }
    ld_json_str = json.dumps(ld_graph, ensure_ascii=False, separators=(",", ":"))

    lang_pills = []
    for code in LANG_ORDER:
        c_ux = UI_EXTRAS[code]
        active_cls = " is-active" if code == lang else ""
        aria_cur = ' aria-current="page"' if code == lang else ""
        lang_pills.append(
            f'        <a href="{public_path(c_ux["compare_file"])}" class="cmp-lang-pill{active_cls}" hreflang="{c_ux["hreflang"]}"{aria_cur}>{LANG_PILL_LABELS[code]}</a>'
        )
    lang_bar_html = "\n".join(lang_pills)

    duels_html = []
    for idx, duel in enumerate(cdata["duels"]):
        prob_html = duel["prob"]
        sol_html = duel["sol"]
        if idx == 0:
            prob_html = prob_html + esc(rg["extra_duel_1_note"])
        elif idx == 3:
            sol_html = sol_html + esc(rg["extra_duel_4_note"])
        duels_html.append(
            f'          <article class="cmp-duel-card">\n'
            f'            <span class="cmp-duel-tag">{duel["tag"]}</span>\n'
            f'            <h3 class="cmp-duel-title">{duel["title"]}</h3>\n'
            f'            <p class="cmp-duel-prob">{prob_html}</p>\n'
            f'            <p class="cmp-duel-sol">{sol_html}</p>\n'
            f'          </article>'
        )

    faq_html = []
    for idx, f in enumerate(all_faqs):
        open_attr = " open" if idx == 0 else ""
        faq_html.append(
            f'          <details class="arcade-faq-item"{open_attr}>\n'
            f'            <summary>{esc(f["q"])}</summary>\n'
            f'            <p>{esc(f["a"])}</p>\n'
            f'          </details>'
        )

    home_href = public_path(ux["page_file"])

    return f"""<!DOCTYPE html>
<html lang="{ux['html_lang']}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{esc(cdata['title'])}</title>
  <meta name="description" content="{esc(cdata['desc'])}">
  <meta name="keywords" content="{esc(cdata['keywords'])}, {esc(rg['landing_keywords'])}">
  <meta name="author" content="Xavier Larrodé">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">

  <meta property="og:type" content="article">
  <meta property="og:url" content="{canonical}">
  <meta property="og:title" content="{esc(cdata['title'])}">
  <meta property="og:description" content="{esc(cdata['desc'])}">
  <meta property="og:image" content="https://bodyrush.app/assets/images/capture_fr_05_airplay_tv.webp">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(cdata['title'])}">
  <meta name="twitter:description" content="{esc(cdata['desc'])}">
  <meta name="twitter:image" content="https://bodyrush.app/assets/images/capture_fr_05_airplay_tv.webp">

  <link rel="canonical" href="{canonical}">
{hreflangs}
  <link rel="alternate" type="text/plain" href="https://bodyrush.app/llms.txt" title="BodyRush 3D — LLM Summary">
  <link rel="alternate" type="text/plain" href="https://bodyrush.app/llms-full.txt" title="BodyRush 3D — Full LLM Documentation">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
  <meta name="apple-itunes-app" content="app-id=6826362298">
  <meta name="theme-color" content="#0A0B14">

  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/chakra-petch-700-latin.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/Barlow-600-latin.woff2" crossorigin>
  <link rel="stylesheet" href="styles.min.css?v=20261112">

  <script type="application/ld+json">{ld_json_str}</script>
</head>
<body>

  <header class="hud-header" id="site-header">
    <div class="hud-header-inner">
      <a href="{home_href}" class="app-brand">
        <img src="assets/images/app_icon_96.webp" alt="BodyRush 3D" class="app-brand-icon" width="44" height="44">
        <div class="app-brand-titles">
          <span class="app-brand-name">BODYRUSH 3D</span>
          <span class="app-brand-sub">TV FITNESS · BOXING · POSES</span>
        </div>
      </a>

      <div class="hud-actions" style="margin-left:auto; display:flex; gap:10px; align-items:center;">
        <a href="{home_href}" class="hud-nav-btn">{cdata['back_btn']}</a>
        <a href="{home_href}#vip-waitlist-box" class="hud-store-btn">{cdata['top_cta']}</a>
      </div>
    </div>
  </header>

  <main class="cmp-page-main">
    <div class="lobby-container">

      <nav class="cmp-lang-bar" aria-label="Language selection">
{lang_bar_html}
      </nav>

      <section class="cmp-hero-box">
        <span class="arcade-kicker">{cdata['kicker']}</span>
        <h1 class="game-main-title" style="margin-top:8px;">{cdata['h1']}</h1>
        <p class="game-main-lead" style="max-width:920px;">{cdata['lead']}</p>

        <div class="ai-direct-answer">
          {rg['ai_direct_answer_html']}
        </div>

        <div class="cmp-verdict-card">
          {cdata['verdict_html']}
        </div>

        <div class="regional-why-strip">
          <strong>{esc(rg['regional_why_title'])}</strong>
          <p>{esc(rg['regional_why_body'])}</p>
        </div>
      </section>

      <section class="cmp-table-section" id="comparison-matrix">
        {cdata['table_sec_html']}
      </section>

      <section class="cmp-duels-section" id="head-to-head">
        <div class="arcade-section-header">
          <div>
            <h2 class="arcade-h2">{cdata['duels_h2']}</h2>
          </div>
        </div>

        <div class="cmp-duels-grid">
{chr(10).join(duels_html)}
        </div>
      </section>

      <section class="cmp-faq-section" id="faq">
        <div class="arcade-section-header">
          <div>
            <h2 class="arcade-h2">{cdata['faq_h2']}</h2>
          </div>
        </div>

        <div class="faq-arcade-box" style="max-width:960px; margin:0 auto;">
{chr(10).join(faq_html)}
        </div>
      </section>

      <section class="cmp-cta-banner">
        <h2>{cdata['cta_h2']}</h2>
        <p>{cdata['cta_p']}</p>
        <div class="cmp-cta-buttons">
          <a href="{home_href}#vip-waitlist-box" class="pt-btn pt-btn-gold" style="display:inline-flex; width:auto; padding:14px 28px;">{cdata['cta_b1']}</a>
          <a href="{home_href}#arcade-lobby" class="pt-btn pt-btn-cyan" style="display:inline-flex; width:auto; padding:14px 28px;">{cdata['cta_b2']}</a>
        </div>
      </section>

    </div>
  </main>

  <footer class="arcade-footer">
    <div class="lobby-container footer-inner">
      <div class="footer-brand-col">
        <div class="app-brand">
          <img src="assets/images/app_icon_96.webp" alt="BodyRush 3D" class="app-brand-icon" width="40" height="40" loading="lazy" decoding="async">
          <div class="app-brand-titles">
            <span class="app-brand-name">BODYRUSH 3D</span>
            <span class="app-brand-sub">ARCADE FITNESS · iOS, iPAD &amp; AIRPLAY TV</span>
          </div>
        </div>
      </div>
      <div class="footer-links-row">
        <a href="/" hreflang="fr">🇫🇷 FR</a>
        <a href="/en" hreflang="en">🇺🇸 EN</a>
        <a href="/es" hreflang="es">🇪🇸 ES</a>
        <a href="/de" hreflang="de">🇩🇪 DE</a>
        <a href="/ja" hreflang="ja">🇯🇵 JA</a>
        <a href="/ko" hreflang="ko">🇰🇷 KO</a>
        <a href="/pt" hreflang="pt-BR">🇧🇷 PT</a>
        <a href="llms.txt">LLMs.txt</a>
        <a href="/privacy">Privacy</a>
        <a href="/support">Support</a>
      </div>
    </div>
  </footer>

  <script data-goatcounter="https://bodyrush.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
"""


def update_discovery_files():
    # 1. robots.txt
    robots = """# BodyRush 3D — Official Search & AI / LLM Crawler Policy (GEO Optimized)
User-agent: *
Allow: /

# OpenAI / ChatGPT Search & Operator
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Anthropic / Claude Search & Citations
User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity AI
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Google Gemini / AI Overviews / Search
User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

# Apple Spotlight / Apple Intelligence / Siri
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Microsoft Bing / Copilot / DuckDuckGo / Mistral / Meta AI
User-agent: Bingbot
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: MistralAI-User
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

Sitemap: https://bodyrush.app/sitemap.xml

# Native Multilingual Landing Pages & Competitor Comparison Guides (7 Languages):
# - FR: https://bodyrush.app/ | https://bodyrush.app/compare-fr
# - EN: https://bodyrush.app/en | https://bodyrush.app/compare-en
# - ES: https://bodyrush.app/es | https://bodyrush.app/compare-es
# - DE: https://bodyrush.app/de | https://bodyrush.app/compare-de
# - JA: https://bodyrush.app/ja | https://bodyrush.app/compare-ja
# - KO: https://bodyrush.app/ko | https://bodyrush.app/compare-ko
# - PT: https://bodyrush.app/pt | https://bodyrush.app/compare-pt
# - LLM Docs: https://bodyrush.app/llms.txt | https://bodyrush.app/llms-full.txt
"""
    with open(os.path.join(SITE_ROOT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(robots)

    # 2. sitemap.xml with full reciprocal hreflang clusters on BOTH landing pages and comparison pages
    landing_cluster = []
    for code in LANG_ORDER:
        u = public_url(UI_EXTRAS[code]["page_file"])
        landing_cluster.append(f'    <xhtml:link rel="alternate" hreflang="{UI_EXTRAS[code]["hreflang"]}" href="{u}" />')
    landing_cluster.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{public_url("en.html")}" />')
    landing_cluster_xml = "\n".join(landing_cluster)

    compare_cluster = []
    for code in LANG_ORDER:
        u = public_url(UI_EXTRAS[code]["compare_file"])
        compare_cluster.append(f'    <xhtml:link rel="alternate" hreflang="{UI_EXTRAS[code]["hreflang"]}" href="{u}" />')
    compare_cluster.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{public_url("compare-en.html")}" />')
    compare_cluster_xml = "\n".join(compare_cluster)

    url_entries = []
    for code in LANG_ORDER:
        loc = public_url(UI_EXTRAS[code]["page_file"])
        url_entries.append(
            f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>2026-11-12</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n{landing_cluster_xml}\n  </url>"
        )
    for code in LANG_ORDER:
        loc = public_url(UI_EXTRAS[code]["compare_file"])
        url_entries.append(
            f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>2026-11-12</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.95</priority>\n{compare_cluster_xml}\n  </url>"
        )
    for loc, prio, freq, mod in [
        (public_url("compare.html"), "0.85", "weekly", "2026-11-12"),
        ("https://bodyrush.app/llms.txt", "0.9", "weekly", "2026-11-12"),
        ("https://bodyrush.app/llms-full.txt", "0.9", "weekly", "2026-11-12"),
        (public_url("privacy.html"), "0.5", "monthly", "2026-11-11"),
        (public_url("terms.html"), "0.5", "monthly", "2026-11-12"),
        (public_url("support.html"), "0.6", "monthly", "2026-11-12"),
    ]:
        url_entries.append(
            f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{mod}</lastmod>\n    <changefreq>{freq}</changefreq>\n    <priority>{prio}</priority>\n  </url>"
        )

    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + "\n".join(url_entries)
        + "\n</urlset>\n"
    )
    with open(os.path.join(SITE_ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap)

    # 3. Enrich llms.txt & llms-full.txt with the 7 native landing URLs + Regional Competitor Matrix per Market
    regional_md_block = """
## Native Multilingual Pages & Regional Market Positioning (7 Languages / 12 App Store Locales)

- **Apple App Store ID**: `6826362298` (`https://apps.apple.com/app/id6826362298`)
- **🇫🇷 Français (`fr-FR`, `fr-CA`)**: [Accueil FR](https://bodyrush.app/) · [Comparatif FR](https://bodyrush.app/compare-fr)
  - *Local Competitors Beat*: Vidéos YouTube passives (*Tibo InShape*, *Sissy Mua / Trainsweeat*, *Lucile Woodward*), coaching *FizzUp* / *Freeletics*, *Nintendo Switch* (*Ring Fit Adventure*, *Fitness Boxing 3*, *Just Dance*).
  - *Key Local Why*: Mode Appartement **🚫 Sans Saut** (zéro impact voisins), zéro console à 350 €, Tournoi Salon 2–4 joueurs.
- **🇺🇸🇬🇧🇨🇦🇦🇺 English (`en-US`, `en-GB`, `en-CA`, `en-AU`)**: [English Home](https://bodyrush.app/en) · [English Comparison](https://bodyrush.app/compare-en)
  - *Local Competitors Beat*: *Nex Playground* ($249 cube + $89/yr pass), *Supernatural VR* & *Beat Saber* (*Meta Quest 3*), *Nintendo Switch* (*Ring Fit*, *Fitness Boxing 3*), *Peloton App / Guide*, *MadFit* / *GrowWithJo* YouTube HIIT, *Apple Fitness+*.
  - *Key Local Why*: $0 hardware cost, hands-free 19-joint Apple Vision AI at 60 FPS on 16:9 AirPlay TV, zero sweaty VR headset foam, 2–4P Family Game Night.
- **🇪🇸🇲🇽 Español (`es-ES`, `es-MX`)**: [Inicio ES](https://bodyrush.app/es) · [Comparativa ES](https://bodyrush.app/compare-es)
  - *Local Competitors Beat*: *Patry Jordán (Gym Virtual)*, *Fausto Murillo*, *Sergio Peinado (Fuertafit)*, *Freeletics*, *Nintendo Switch* (*Ring Fit*, *Fitness Boxing 3*).
  - *Key Local Why*: Modo Piso / Departamento **🚫 Sin Saltos** sin ruido para vecinos, cero gasto en consolas o accesorios.
- **🇩🇪🇦🇹🇨🇭 Deutsch (`de-DE`)**: [Startseite DE](https://bodyrush.app/de) · [TV-Fitness-Vergleich DE](https://bodyrush.app/compare-de)
  - *Local Competitors Beat*: *Pamela Reif*, *Sascha Huber*, *Mady Morrison* (YouTube), *Freeletics*, *Gymondo*, *Nintendo Switch* (*Ring Fit*, *Fitness Boxing 3*), *Meta Quest 3*.
  - *Key Local Why*: **100 % On-Device Kamera-Datenschutz (DSGVO-freundlich, 0 Video-Upload)** + Mietwohnung-Modus **🚫 Ohne Springen** ohne Trittschall.
- **🇯🇵 日本語 (`ja`)**: [日本語ホーム](https://bodyrush.app/ja) · [公式徹底比較 JA](https://bodyrush.app/compare-ja)
  - *Local Competitors Beat*: *竹脇まりな*・*なかやまきんに君*（YouTube宅トレ）、*Nintendo Switch*（『リングフィット アドベンチャー』『Fit Boxing 3』『ジャストダンス』）、*chocoZAP（チョコザップ）*、*Meta Quest 3*。
  - *Key Local Why*: 日本の賃貸マンション向け**「🚫ジャンプなし」静音モード**＆省スペース（約1.8m〜2m）、専用機器0円・手ぶら19関節追跡。
- **🇰🇷 한국어 (`ko`)**: [한국어 홈](https://bodyrush.app/ko) · [완벽 비교 KO](https://bodyrush.app/compare-ko)
  - *Local Competitors Beat*: *땅끄부부*·*힙으뜸*·*비타민신지니* (유튜브 홈트), *야핏 (YaFit)*·*콰트 (QUAT)*, *닌텐도 스위치* (『링피트 어드벤처』『피트니스 복싱 3』), *메타 퀘스트 3*。
  - *Key Local Why*: 대한민국 아파트 **층간소음 제로 ('🚫 점프 없음' 모드)**, 고가 콘솔·센서 구매 비용 0원, 온디바이스 프라이버시 보호.
- **🇧🇷 Português (`pt-BR`)**: [Início PT-BR](https://bodyrush.app/pt) · [Comparativo PT-BR](https://bodyrush.app/compare-pt)
  - *Local Competitors Beat*: *Queima Diária*, *Carol Borba* / *Exercício em Casa* (YouTube), *Smart Fit App* / *BTFIT*, *Nintendo Switch* (*Ring Fit*, *Fitness Boxing 3*).
  - *Key Local Why*: Economia de **R$ 2.500 a R$ 4.000+** sem precisar comprar console importado no Brasil + Modo Apartamento **🚫 Sem Pulos**.
"""

    for fname in ["llms.txt", "llms-full.txt"]:
        fpath = os.path.join(SITE_ROOT, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        marker = "## Native Multilingual Pages & Regional Market Positioning"
        if marker in content:
            content = content.split(marker)[0].rstrip() + "\n"
        content = content.rstrip() + "\n" + regional_md_block
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)


def main():
    legacy_i18n = json.load(open(os.path.join(SCRATCH_DIR, "legacy_i18n.json"), encoding="utf-8"))
    legacy_cmp = json.load(open(os.path.join(SCRATCH_DIR, "legacy_compare.json"), encoding="utf-8"))

    # Merge full i18n per language (base EN -> MISSING_I18N[lang] -> legacy_i18n[lang] so native overrides always win)
    for lang in LANG_ORDER:
        merged = dict(legacy_i18n["en"])
        if lang in MISSING_I18N:
            merged.update(MISSING_I18N[lang])
        merged.update(legacy_i18n[lang])
        page_html = build_landing_page(lang, merged)
        out_path = os.path.join(SITE_ROOT, UI_EXTRAS[lang]["page_file"])
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(page_html)
        print(f"Wrote landing page: {UI_EXTRAS[lang]['page_file']} ({len(page_html):,} bytes)")

    for lang in LANG_ORDER:
        cmp_file = UI_EXTRAS[lang]["compare_file"]
        cmp_html = build_compare_page(lang, legacy_cmp[lang], cmp_file)
        with open(os.path.join(SITE_ROOT, cmp_file), "w", encoding="utf-8") as f:
            f.write(cmp_html)
        print(f"Wrote compare page: {cmp_file} ({len(cmp_html):,} bytes)")

    # Also update legacy compare.html (FR canonicalized to compare-fr.html or compare.html)
    cmp_legacy_html = build_compare_page("fr", legacy_cmp["fr"], "compare.html")
    with open(os.path.join(SITE_ROOT, "compare.html"), "w", encoding="utf-8") as f:
        f.write(cmp_legacy_html)
    print(f"Wrote legacy compare.html ({len(cmp_legacy_html):,} bytes)")

    update_discovery_files()
    print("Updated robots.txt, sitemap.xml, llms.txt, llms-full.txt successfully!")


if __name__ == "__main__":
    main()
