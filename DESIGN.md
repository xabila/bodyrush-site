---
name: BodyRush 3D Arcade Cockpit
description: Tactile dark-cabinet arcade HUD design system for BodyRush 3D living-room TV fitness.
colors:
  electric-cyan: "#00E5FF"
  ruby-punch: "#FF3B5C"
  ruby-ink-light: "#FF8FA3"
  arcade-gold: "#FFD600"
  turbo-amber: "#FF9F1C"
  vision-emerald: "#26E07A"
  spooky-violet: "#C47AFF"
  sakura-pink: "#FF6BE6"
  toy-sky: "#33A6FF"
  toy-navy: "#1A365A"
  spotify-green: "#1ED760"
  apple-music-rose: "#FF5C77"
  deezer-violet: "#B466FF"
  obsidian-stage: "#070811"
  cabinet-bezel: "#0C0E1D"
  console-surface: "#13172E"
  console-hover: "#1B2140"
  card-recess: "#0E1122"
  ink-white: "#FFFFFF"
  ink-bright: "#E4EAFD"
  ink-muted: "#A3B0D6"
  ink-dark: "#070811"
typography:
  display:
    fontFamily: "'Chakra Petch', 'Hiragino Sans', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "2.75rem"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Chakra Petch', 'Hiragino Sans', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "1.85rem"
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Chakra Petch', 'Hiragino Sans', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Apple SD Gothic Neo', sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.58
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.03em"
rounded:
  xs: "6px"
  compact: "8px"
  sm: "10px"
  icon: "11px"
  control: "12px"
  md: "14px"
  card: "16px"
  panel: "18px"
  lg: "20px"
  banner: "22px"
  console: "24px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.arcade-gold}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.electric-cyan}"
    textColor: "{colors.ink-dark}"
  button-secondary:
    backgroundColor: "{colors.console-surface}"
    textColor: "{colors.ink-bright}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  chip-active:
    backgroundColor: "{colors.electric-cyan}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
---

# Design System: BodyRush 3D Arcade Cockpit

## Overview

**Creative North Star: "The Living-Room Arcade Cabinet"**

BodyRush 3D's web interface translates the exact physical sensation of standing 2 meters in front of a glowing 16:9 television in a dim living room: crisp dark obsidian staging so vibrant 3D worlds and neon skeleton telemetry pop immediately, tactile arcade buttons that invite immediate interaction, and instrument-grade clarity for BPM, joint count, duration, and movement rules (`No-Jump`, `No-Squat`, `♾️ Hearts`).

Every surface prioritizes player legibility from arm's length and across 7 scripts (including dense French/Spanish labels and Japanese/Korean CJK glyphs). Decorative AI-slop tropes—zero-offset neon halos, purple radial fog, decorative background stripe grids, gradient text, and sub-11px micro-labels—are strictly excluded in favor of crisp illuminated 1px–1.5px bezels and grounded directional offset shadows.

**Key Characteristics:**
- **1:1 In-App Fidelity:** Mirrors `SuperHotGameView.swift` and `LevelSelectModalOverlayView` so visitors test-drive the real 3-step selector before installing.
- **High-Contrast Dark Telemetry:** Pure `#070811` dark ink on luminous Gold/Cyan/Emerald actions (`>11:1` contrast) and cool tinted `#E4EAFD` / `#A3B0D6` text on deep navy surfaces (`>7:1` contrast).
- **Tabular Data Precision:** `JetBrains Mono` with `tabular-nums` reserved strictly for BPM, FPS, KCAL, obstacle counts, and durations.
- **Multilingual CJK + Latin Harmony:** Self-hosted `Chakra Petch` + `Barlow` paired with native Apple/Android CJK fallbacks (`Hiragino Sans`, `Apple SD Gothic Neo`, `Noto Sans CJK`).

## Colors

Built for dim living-room ambient lighting and bright mobile screens alike, pairing deep obsidian-navy cabinet surfaces with four high-luminance functional signals.

### Primary
- **Electric Cyan** (`#00E5FF`): Active navigation state, Apple Vision 60 FPS skeleton tracking accents, active tab pills, and keyboard `:focus-visible` rings. Always paired with `#070811` dark ink when used as a fill.
- **Arcade Gold** (`#FFD600`): Primary conversion CTAs (Quiz Funnel, Founder Pass, VIP Priority), personal-best crown accents, and featured tier highlights. Always paired with `#070811` dark ink (`14.6:1` contrast).

### Secondary
- **Vision Emerald** (`#26E07A`): Free-tier badges, verified `No-Jump` / privacy checkmarks, and valid posture confirmation (`≥52%`).
- **Ruby Punch** (`#FF3B5C`) & **Ruby Ink Light** (`#FF8FA3`): Boxing category accents and high-intensity Expert+ indicators (`#FF8FA3` is used whenever ruby text sits on dark translucent ruby surfaces to guarantee `≥5.2:1` WCAG AA contrast).

### Tertiary
- **Turbo Amber** (`#FF9F1C`): Turbo Run x3 speed callouts and calorie burn counters.
- **Spooky Violet** (`#C47AFF`): Multi-world marathon and Halloween theme accents.

### Neutral
- **Obsidian Stage** (`#070811`): Root page canvas and high-contrast button ink.
- **Cabinet Bezel** (`#0C0E1D`): Sticky HUD bar and section containers.
- **Console Surface** (`#13172E`) & **Console Hover** (`#1B2140`): Interactive console cards, table rows, and quiz option tiles.
- **Card Recess** (`#0E1122`): Inset viewports and code/telemetry wells.
- **Ink White** (`#FFFFFF`), **Ink Bright** (`#E4EAFD`), **Ink Muted** (`#A3B0D6`): Three-tier cool-tinted foreground hierarchy—never neutral mid-gray on navy.

### Named Rules
**The Dark-Ink-On-Neon Rule.** Every filled Cyan, Gold, Amber, or Emerald button and badge uses `#070811` dark ink—never white text on bright yellow, orange, or cyan, and never colored hover text on a bright fill.

**The No-Chromatic-Halo Rule.** Never apply zero-offset colored `box-shadow` glows (`0 0 24px #00e5ff`) or radial background purple blobs; express energy through crisp `1.5px` colored borders and directional dark elevation shadows.

## Typography

**Display Font:** `Chakra Petch` (self-hosted WOFF2, weights 600, 700, 700i; fallback `system-ui, sans-serif`)
**Body Font:** `Barlow` (self-hosted WOFF2, weights 500, 600, 700; fallback `-apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Apple SD Gothic Neo', sans-serif`)
**Label/Mono Font:** `JetBrains Mono` (self-hosted WOFF2, weights 700, 800; `font-variant-numeric: tabular-nums`)

**Character:** Geometric arcade-mecha authority in headings (`Chakra Petch`) grounded by clean, high-x-height contemporary legibility in prose (`Barlow`) and instrument-cluster precision on numeric telemetry (`JetBrains Mono`).

### Hierarchy
- **Display** (`700`, `clamp(1.85rem, 3.4vw, 2.75rem)`, `1.06`, `-0.02em`): Hero H1 headline; `text-wrap: balance`.
- **Headline** (`700`, `clamp(1.45rem, 2.5vw, 1.95rem)`, `1.14`, `-0.015em`): Section H2 headings.
- **Title** (`700`, `1.15rem–1.3rem`, `1.25`): Specialty cards, matchup titles, and tier names.
- **Body** (`500`, `0.95rem–1.05rem`, `1.58`): Explanatory copy, comparison cells, and FAQ answers (`65–72ch` max measure).
- **Label** (`700–800`, `0.76rem–0.82rem` / minimum `12px`, `0.03em`): Telemetry badges, BPM tags, level rules, and tab controls.

### Named Rules
**The 12px Floor Rule.** No functional label, badge, or body element ever renders below `12px` (`0.75rem`), ensuring effortless legibility on mobile screens and for Japanese/Korean characters.

**The Data-Only Mono Rule.** `JetBrains Mono` is reserved for numbers, BPM, durations, scores, and compact HUD controls—never long paragraphs.

## Layout

- **Max Container:** `1320px` centered with `20px` horizontal gutter (`16px` on narrow `<390px` viewports).
- **Split Arcade Cockpit:** Two-column asymmetric grid (`1.12fr 0.88fr` on desktop `≥1040px`, single-column stacked on tablet/mobile) pairing the 3-step interactive selector on the left with the sticky live 3D viewport on the right.
- **Vertical Rhythm:** `56px–72px` between major sections; `20px–24px` internal container padding so children never sit flush against borders.

## Elevation & Depth

Depth is communicated through **tonal navy layering** (`#070811` → `#0C0E1D` → `#13172E` → `#1B2140`) paired with **directional dark offset shadows** that anchor cabinets to the stage without blurry neon fog.

### Shadow Vocabulary
- **Cabinet Depth** (`box-shadow: 0 14px 34px rgba(3, 4, 10, 0.62)`): Main console frame, viewport stage, and quiz card.
- **Control Lift** (`box-shadow: 0 6px 16px rgba(3, 4, 10, 0.45)`): Interactive buttons and hovered cards (`transform: translateY(-2px)`).

### Named Rules
**The Single-Elevation Declaration Rule.** Cards declare structural boundaries via crisp `1px–1.5px` borders and tonal surface steps; reserve soft dark drop shadows for top-level cabinets and active hover lift, and never nest bordered cards inside bordered cards with duplicate shadows.

## Shapes

- **Console & Feature Panels:** `20px` radius (`--radius-console`) with `1.5px` illuminated border.
- **Interactive Option Cards:** `14px` radius (`--radius-card`)—never pill-shaped containers.
- **Action Buttons & Telemetry Chips:** `999px` pill radius (`--radius-pill`) for primary CTAs, language pills, and compact status tags.

## Components

### Buttons
- **Shape:** Full pill (`999px`) for primary CTAs; rounded rectangle (`12px`) for navigation and secondary controls.
- **Primary:** `#FFD600` Arcade Gold background, `#070811` dark ink, `700` weight, `14px 26px` padding, minimum `44px` touch height.
- **Hover / Focus:** Transitions to `#00E5FF` Electric Cyan with `#070811` ink (`transform: translateY(-1px)`) and a `2px solid #00E5FF` `:focus-visible` ring (`outline-offset: 3px`).

### Chips
- **Style:** `#13172E` background, `#E4EAFD` text, `1px solid rgba(228, 234, 253, 0.22)` border, minimum `12px` font size.
- **State:** Active state switches to `#00E5FF` fill with `#070811` ink and `aria-selected="true"` / `aria-current="page"`.

### Cards / Containers
- **Corner Style:** `14px` for grid items, `20px` for major panels.
- **Background:** `#13172E` on `#070811` stage; recessed wells use `#0E1122` without extra card borders to avoid nested-card clutter.
- **Internal Padding:** `18px–24px` (table scroll wrappers include `12px` inset padding so table borders never collide with outer frames).

### Inputs / Fields
- **Style:** `1.5px solid rgba(228, 234, 253, 0.28)`, `#0A0D1C` background, `12px` radius, `16px` font size on mobile (prevents iOS Safari auto-zoom), `48px` minimum height.
- **Focus:** `border-color: #00E5FF`, `caret-color: #00E5FF`, `outline: 2px solid rgba(0, 229, 255, 0.45)`.

### Navigation
- **Sticky HUD Header:** `rgba(10, 12, 24, 0.95)` with `1.5px` bottom cyan hairline, `44×44px` minimum tap targets, collapsible mobile drawer with synced `aria-expanded` state, and explicit 7-language pill switcher.

### Interactive Workout Quiz & Console Simulator
- **30-Second TV Workout Builder:** 4 single-tap visual option groups (Floor Constraint, Goal, Screen Setup, Intensity) that immediately compute a personalized BodyRush 3D plan, sync the 3D Console Simulator, and unlock Founder Pass / QR Mobile Handoff.

## Do's and Don'ts

### Do:
- **Do** self-host subsetted WOFF2 fonts (`Chakra Petch`, `Barlow`, `JetBrains Mono`) for zero render-blocking network requests.
- **Do** keep every `<video>` file untouched at original bitrate (`preload="none"` + instant responsive `.webp` poster + Cloudflare 30-day Edge cache).
- **Do** verify `≥4.5:1` WCAG AA contrast on every default, `:hover`, and `:focus-visible` state, and include visible button text inside `aria-label` when overriding (`WCAG 2.5.3`).
- **Do** theme browser defaults (`::selection` in Electric Cyan `#00E5FF` with `#070811` ink, dark custom scrollbars, `tabular-nums`).

### Don't:
- **Don't** compress, re-encode, or downscale `.mp4` or `.webm` gameplay videos.
- **Don't** use zero-offset neon `box-shadow` halos, decorative stripe/grid background gradients, or purple radial glow blobs.
- **Don't** render any UI text below `12px` (`0.75rem`) or leave `<img>` tags without a valid `src`, `width`, and `height`.
- **Don't** place white or yellow text on bright orange, gold, or cyan fills.
