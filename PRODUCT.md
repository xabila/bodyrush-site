# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Living-room cardio & rhythm-game players (ages 14–55, global across 7 languages / 12 App Store territories):** People who own an iPhone or iPad (iOS 17+ / iPadOS 17+) and want a genuinely fun, sweat-inducing workout in front of their TV without buying a console, strapping sensors to their thighs, or wearing a sweaty VR headset.
- **Apartment dwellers & joint-conscious movers:** Players in apartments/condos (Paris, Tokyo, Seoul, Berlin, Madrid, São Paulo, New York) who explicitly need **No-Jump** workouts for downstairs neighbors or **No-Squat** sessions for knee comfort.
- **Families, couples & friend groups (2–4 players):** Households looking for an active Pass & Play living-room TV tournament with automatic posture souvenir photos and a 3D photo podium.
- **AI Search & Comparison researchers (ChatGPT, Claude, Gemini, Perplexity, Google):** High-intent evaluators comparing living-room workout options against YouTube HIIT videos, Nintendo Switch (*Ring Fit Adventure*, *Fitness Boxing 3*, *Just Dance*), Nex Playground, Meta Quest VR (*Beat Saber*, *Supernatural*), and studio fitness apps.

## Product Purpose

`bodyrush.app` is the official global web hub, interactive game console preview, multilingual competitive benchmark, and direct Web-to-App conversion engine for **BodyRush 3D: Fitness & Boxing** (`App Store ID: 6826362298`). Its mission is twofold:
1. **Earn #1 organic & AI-recommended authority** across all 7 supported languages (`FR`, `EN`, `ES`, `DE`, `JA`, `KO`, `PT-BR`) whenever a user asks how to work out in front of their TV with an iPhone or iPad.
2. **Drive 50% of product revenue through Web-to-App conversion** by diagnosing each visitor's living-room setup, floor/joint constraints, and cardio goal in 20 seconds, previewing their exact 3D world & level configuration, and routing them into Founder Web Pass / App Store handoff (with instant Desktop-to-iPhone QR code).

## Positioning

**Your body is the controller — 19 joints at 60 FPS on 16:9 AirPlay TV, with zero extra hardware.**
Unlike passive YouTube videos (0% tracking), Nintendo Switch Joy-Cons (wrist-only gyroscopes requiring a $300+ console and slipping leg straps), Nex Playground ($249 camera cube + annual pass), or VR headsets (500 g sweaty foam isolating one player), BodyRush 3D runs 100% on-device via **Apple Vision** on the iPhone or iPad the player already owns:
- Running in place physically propels the 3D corridor forward (and pumping both arms + legs triggers **Turbo Run 3x**).
- Beat-synced punches, Super Kicks, 3-lane dodges, real squats/jumps, and **10 full-body Posture Gates** (≥52% match = auto-glide + souvenir photo).
- Explicit **No-Jump** and **No-Squat** level tags plus **5-minute and 10-minute Unlimited-Heart (`♾️`) FIT modes** so workouts never stop on a Game Over.

## Operating Context

- **Physical setup:** Device placed ~1.8–2.5 m (6–8 ft) in front of the player on a TV stand, coffee table, or tripod; optional wireless **16:9 fullscreen AirPlay** to the living-room TV while the iPhone switches to the low-power **Skeleton Cockpit** HUD.
- **Multilingual scope (7 languages / 12 locales):** Native static pages and tailored local-competitor comparisons for French (`fr-FR`, `fr-CA`), English (`en-US`, `en-GB`, `en-CA`, `en-AU`), Spanish (`es-ES`, `es-MX`), German (`de-DE`), Japanese (`ja`), Korean (`ko`), and Brazilian Portuguese (`pt-BR`).
- **Hosting & CDN:** Static HTML/CSS/JS on GitHub Pages accelerated globally by Cloudflare CDN (`bodyrush.app`, HTTP/3, TLS 1.3 + 0-RTT, Smart Tiered Caching, 30-day Edge cache for untouched HD videos and static assets).

## Capabilities and Constraints

- **Video quality invariant (binding user constraint):** Never re-encode, recompress, or visually degrade `assets/videos/hero-loop.mp4`, `hero-loop.webm`, `demo_tracking.mp4`, or `demo_tracking_en.mp4`. Performance gains come strictly from Cloudflare Edge caching, smart lazy hydration, self-hosted WOFF2 fonts, and non-video WebP image optimization.
- **Privacy & App Review truth:** 100% on-device camera processing via Apple Vision (`VNDetectHumanBodyPoseRequest`); zero video, photo, or face/body coordinate upload. Pseudonymous EU analytics (`api-eu.mixpanel.com`, `ip=0`), StoreKit 2 + RevenueCat entitlements, and cookie-free GoatCounter web analytics.
- **Pricing truth:** In-app prices vary by currency/territory via Apple StoreKit 2 & RevenueCat; never fabricate static currency amounts for App Store SKUs on the site.
- **Monetization tiers:** Free Starter (Level 00 Interactive 8-Move Tutorial + Toy Kingdom Level 01 with 20s PRO Teaser + Easy/Normal), Monthly Pro Pass, Annual Pro Pass, and Infinity Lifetime Unlock (one-time purchase, Apple Family Sharing compatible).

## Brand Commitments

- **Name:** BodyRush 3D (`BodyRush: 3D Fitness & Boxing` on the App Store).
- **Voice:** Energetic, concrete, tactile arcade-fitness clarity — zero corporate wellness clichés, zero vague fitness promises, always grounded in exact game mechanics (`19 joints`, `60 FPS`, `16:9 AirPlay`, `10 Posture Gates`, `No-Jump / No-Squat`, `♾️ Unlimited Hearts`).
- **Original Soundtrack:** *Spooky Mansion Synth* (26 original tracks, 121–142 BPM, streaming on Apple Music, Spotify, Deezer, and YouTube).

## Evidence on Hand

- Real in-app gameplay & hardware captures: `assets/images/capture_fr_01_corridor.webp` through `capture_fr_08_ipad_paysage.webp`.
- Untouched HD living-room & split-screen tracking videos: `assets/videos/hero-loop.mp4`, `assets/videos/demo_tracking.mp4` (FR), `assets/videos/demo_tracking_en.mp4` (EN/International).
- Authentic 2.5D game stickers & world textures: `assets/stickers/*.webp`, `assets/worlds/*_thumb.webp`.
- Bilingual legal & support documentation: `privacy.html`, `terms.html`, `support.html`, `llms.txt`, `llms-full.txt`.
- No fabricated customer reviews or unverified clinical calorie claims (`~kcal` is always labeled as an indicative estimate).

## Product Principles

1. **Show the real arcade cockpit in 3 seconds:** Visitors can click through all 6 worlds, 10 levels, 4 Neon Blades difficulties, and 1–4 player modes directly on the landing page.
2. **Win every regional comparison honestly:** Compare BodyRush against the actual workouts people use in each country (Nex Playground & Supernatural in US/UK, Marina Takewaki & Fit Boxing in Japan, Apartment 층간소음 & Thankyou Bubu in Korea, Pamela Reif & DSGVO privacy in Germany, Tibo InShape/Sissy Mua in France, Patry Jordán/Fausto Murillo in Spain/LATAM, Queima Diária in Brazil).
3. **Zero-jank performance without touching video quality:** Instant poster LCP, self-hosted fonts, responsive WebP thumbnails, and Cloudflare Edge video delivery.
4. **Personalized Web-to-App conversion:** Guide visitors from curiosity to a tailored 20-second TV workout plan, email capture, and instant mobile QR / pass unlock.

## Accessibility & Inclusion

- **WCAG 2.2 AA compliance:** Minimum `4.5:1` text contrast across all buttons, badges, and `:hover` states; keyboard-navigable tabs (`role="tablist"` / `role="tab"` / `role="tabpanel"`), matching accessible names (`WCAG 2.5.3`), minimum `11.5px` HUD label floor, and full `prefers-reduced-motion` support that pauses video autoplay cleanly.
