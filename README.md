# 🥊 BodyRush — Official Website (`bodyrush.app`)

Vitrine web officielle et documentation de l'application **BodyRush** pour iOS & iPadOS.

> **BodyRush** est un jeu d'arcade, de fitness et de boxe en 3D piloté à 100 % par la caméra de l'iPhone et de l'iPad grâce au framework **Apple Vision Body Pose Tracking** — sans manette, sans capteur externe et sans casque VR — jouable directement sur l'appareil ou projeté en **16:9 1080p/4K sur TV via AirPlay**.

---

## 🚀 Déploiement & Automatisation GitHub Pages

Le déploiement est **100 % automatisé** via GitHub Actions à chaque `git push` sur la branche `main` :

- **Workflow GitHub Actions** : [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **Domaine personnalisé** : [`CNAME`](CNAME) configuré sur `bodyrush.app`
- **Garantie Sécurité** : Dépôt public sans aucune clé privée, aucun secret d'API et aucun token propriétaire.

### Activer GitHub Pages dans les réglages du dépôt :
1. Sur GitHub, aller dans **Settings** > **Pages**
2. Dans **Build and deployment** :
   - Source : Sélectionner **GitHub Actions** (ou déployer depuis la branche `main` / `root`)
3. Vérifier que le champ **Custom domain** indique bien `bodyrush.app` et que l'option **Enforce HTTPS** est cochée.

---

## ☁️ Configuration Cloudflare DNS pour `bodyrush.app`

Pour relier ton nom de domaine acheté chez Cloudflare (`bodyrush.app`) à GitHub Pages :

### 1. Entrées DNS dans Cloudflare Dashboard :
Dans **DNS** > **Records** pour la zone `bodyrush.app` :

| Type | Nom | Cible | Proxy status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (ou `bodyrush.app`) | `185.199.108.153` | Proxied ☁️ (ou DNS Only) | Auto |
| **A** | `@` (ou `bodyrush.app`) | `185.199.109.153` | Proxied ☁️ (ou DNS Only) | Auto |
| **A** | `@` (ou `bodyrush.app`) | `185.199.110.153` | Proxied ☁️ (ou DNS Only) | Auto |
| **A** | `@` (ou `bodyrush.app`) | `185.199.111.153` | Proxied ☁️ (ou DNS Only) | Auto |
| **CNAME** | `www` | `xabila.github.io` | Proxied ☁️ (ou DNS Only) | Auto |

### 2. Configuration SSL/TLS Cloudflare :
Dans **SSL/TLS** > **Overview** :
- Régler le mode de chiffrement sur **Full** (ou **Full (strict)**) pour éviter les boucles de redirection avec le certificat SSL de GitHub Pages.

---

## 🔒 Confidentialité & Propriété Intellectuelle

- **Contrats et Droits d'Auteur** : Tous les droits réservés (voir [`LICENSE`](LICENSE)). Les visuels 3D, personnages, stickers, musiques, marques et code sont la propriété exclusive de Xavier Larrodé.
- **Contributions fermées** : Les Pull Requests externes sont automatiquement clôturées via le workflow [`.github/workflows/close-prs.yml`](.github/workflows/close-prs.yml) (voir [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md)).
- **Confidentialité** : Politique conforme aux directives de l'App Store disponible sur [`privacy.html`](privacy.html).

---

## 🛠️ Structure du Projet

```
bodyrush-site/
├── assets/
│   ├── images/      # Icône de l'app, logo, mockups IAP
│   ├── stickers/    # Vilains 3D des 6 mondes, gants cristal, badge turbo run
│   └── videos/      # Démo de body pose tracking haute performance
├── .github/
│   ├── workflows/   # Déploiement automatique GitHub Pages & protection PR
│   └── CONTRIBUTING.md
├── index.html       # Landing page bilingue FR/EN responsive & optimisée ASO
├── styles.css       # Design System cyber-néon BodyRush
├── script.js        # Logique interactive, sélecteur de langue, explorateur 3D
├── privacy.html     # Politique de confidentialité (Apple Vision On-Device)
├── terms.html       # Conditions Générales d'Utilisation
├── CNAME            # Configuration du domaine bodyrush.app
├── robots.txt       # Directives SEO
├── sitemap.xml      # Plan du site pour l'indexation
└── LICENSE          # Licence propriétaire stricte
```

---

&copy; 2026 Xavier Larrodé — [bodyrush.app](https://bodyrush.app)
