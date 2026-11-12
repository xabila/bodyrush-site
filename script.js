/**
 * BodyRush 3D — Interactive In-App Arcade Console, 7-Language Controller & Web-to-App Funnel
 * Zero-TBT Smart Video Hydration · WCAG 2.2 AA · RevenueCat Web Billing Ready
 */

const WEB_CHECKOUT_CONFIG = {
  // Set enabled: true and paste your 2 RevenueCat Web Billing / Stripe links once Build 20 is approved on the App Store
  enabled: false,
  appStoreUrl: "https://apps.apple.com/app/id6826362298",
  annualCheckoutUrl: "",
  lifetimeCheckoutUrl: ""
};

document.addEventListener("DOMContentLoaded", () => {
  const supportedLangs = ["fr", "en", "es", "de", "ja", "ko", "pt"];
  const docLangRaw = (document.documentElement.lang || "fr").toLowerCase().slice(0, 2);
  let currentLang = supportedLangs.includes(docLangRaw) ? docLangRaw : "fr";
  const initialPageLang = currentLang;

  let activeStep = 1;
  let selectedWorld = "toyStory";
  let selectedLevel = "1";
  let selectedDiff = "normal";
  let selectedPlayers = "1";
  let selectedPlanIntent = "annual";

  // Quiz state (3-Tap Living-Room TV Program Builder)
  const quizState = {
    space: "nojump", // "nojump" | "full" | "nosquat"
    who: "solo",     // "solo" | "party"
    time: "5m"       // "5m" | "10m"
  };

  function trackFunnelEvent(eventSlug, detail) {
    try {
      if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.goatcounter.count({
          path: `funnel-${eventSlug}`,
          title: `${currentLang.toUpperCase()}${detail ? " · " + detail : ""}`,
          event: true
        });
      }
    } catch (_) {}
  }

  const worldCatalog = {
    toyStory: {
      badge: "🐱 TOY KINGDOM · CLOCKWORK 128 BPM",
      short: "🐱 TOY KINGDOM",
      wall: "assets/worlds/world_toystory_wall_thumb.webp",
      monster: "assets/stickers/villain_toystory_mainecoon.webp",
      titleFr: "Toy Kingdom — Musique : Clockwork (128 BPM)",
      titleEn: "Toy Kingdom — Track: Clockwork (128 BPM)",
      subFr: "Chat Maine Coon, Robot jouet, train en bois & cubes rythmés",
      subEn: "Maine Coon Cat, Toy Robot, wooden train & rhythm cubes"
    },
    sakuraZen: {
      badge: "🌸 SAKURA ZEN · CANDY VELOCITY 130 BPM",
      short: "🌸 SAKURA ZEN",
      wall: "assets/worlds/pm_sakura_wall_thumb.webp",
      monster: "assets/stickers/villain_sakura_pink_panda.webp",
      titleFr: "Sakura Zen — Musique : Candy Velocity (130 BPM)",
      titleEn: "Sakura Zen — Track: Candy Velocity (130 BPM)",
      subFr: "Panda Rose, Kitsune, arches de fleurs de cerisier & postures zen",
      subEn: "Pink Panda, Kitsune, cherry blossom arches & zen postures"
    },
    indianaTemple: {
      badge: "🏺 TEMPLE INDIANA · HARDENED CLOCKWORK 136 BPM",
      short: "🏺 TEMPLE INDIANA",
      wall: "assets/worlds/pm_temple_wall_thumb.webp",
      monster: "assets/stickers/villain_temple_idol.webp",
      titleFr: "Temple Indiana — Musique : Hardened Clockwork (136 BPM)",
      titleEn: "Indiana Temple — Track: Hardened Clockwork (136 BPM)",
      subFr: "Idole Tiki dorée, boule géante de pierre & pieux suspendus",
      subEn: "Golden Tiki Idol, giant rolling boulder & ceiling spikes"
    },
    superHot: {
      badge: "💎 RED CRISTAL · RED CRISTAL 134 BPM",
      short: "💎 RED CRISTAL",
      wall: "assets/worlds/pm_superhot_wall_thumb.webp",
      monster: "assets/stickers/villain_red_crystal_boxer.webp",
      titleFr: "Red Cristal — Musique : Red Cristal (134 BPM)",
      titleEn: "Red Crystal — Track: Red Cristal (134 BPM)",
      subFr: "Boxeurs de cristal rubis, lasers bas & murs de verre fissurés",
      subEn: "Ruby crystal boxers, low lasers & cracked glass walls"
    },
    halloween: {
      badge: "🎃 HALLOWEEN · SPOOKY MANSION 132 BPM",
      short: "🎃 HALLOWEEN",
      wall: "assets/worlds/pm_halloween_wall_thumb.webp",
      monster: "assets/stickers/villain_halloween_golem.webp",
      titleFr: "Halloween — Musique : Spooky Mansion (132 BPM)",
      titleEn: "Halloween — Track: Spooky Mansion (132 BPM)",
      subFr: "Golem Gargouille, fantômes farceurs & barrières de citrouilles",
      subEn: "Gargoyle Golem, spooky ghosts & pumpkin hurdles"
    },
    christmas: {
      badge: "🎄 NOËL EXPRESS · NOËL EXPRESS 135 BPM",
      short: "🎄 NOËL EXPRESS",
      wall: "assets/worlds/pm_christmas_wall_thumb.webp",
      monster: "assets/stickers/villain_christmas_snowman.webp",
      titleFr: "Noël Express — Musique : Noël Express (135 BPM)",
      titleEn: "Santa Village — Track: Noël Express (135 BPM)",
      subFr: "Bonhomme de neige boxeur, Casse-Noisette & traîneau de cadeaux",
      subEn: "Snowman boxer, Nutcracker soldier & holiday gift sleigh"
    }
  };

  const levelCatalog = {
    "0": {
      shortFr: "NIV. 00 TUTORIEL (♾️ CŒURS)",
      shortEn: "LVL 00 TUTORIAL (♾️ HEARTS)",
      tagFr: "🎓 TUTORIEL INTERACTIF DES 8 GESTES · ♾️ CŒURS",
      tagEn: "🎓 INTERACTIVE 8-MOVE TUTORIAL · ♾️ HEARTS",
      unlimitedHearts: true
    },
    "1": {
      shortFr: "NIV. 01 BOXE (🚫 SANS SAUT/SQUAT)",
      shortEn: "LVL 01 BOXING (🚫 NO JUMP/SQUAT)",
      tagFr: "🥊 NIV. 01 · 3 MIN · 4 ❤️ · 🚫 SANS SAUT NI SQUAT",
      tagEn: "🥊 LVL 01 · 3 MIN · 4 ❤️ · 🚫 NO JUMP OR SQUAT",
      unlimitedHearts: false
    },
    "2": {
      shortFr: "NIV. 02 POSTURES (🚫 SANS SAUT)",
      shortEn: "LVL 02 POSTURES (🚫 NO JUMP)",
      tagFr: "🙌 NIV. 02 · 3 MIN · 4 ❤️ · 🚫 SANS SAUT",
      tagEn: "🙌 LVL 02 · 3 MIN · 4 ❤️ · 🚫 NO JUMP",
      unlimitedHearts: false
    },
    "3": {
      shortFr: "NIV. 03 PARKOUR (🚫 SANS SQUAT)",
      shortEn: "LVL 03 PARKOUR (🚫 NO SQUAT)",
      tagFr: "🏃 NIV. 03 · 3 MIN · 4 ❤️ · 🚫 SANS SQUAT",
      tagEn: "🏃 LVL 03 · 3 MIN · 4 ❤️ · 🚫 NO SQUAT",
      unlimitedHearts: false
    },
    "4": {
      shortFr: "NIV. 04 HYPER-MIX (✅ COMPLET)",
      shortEn: "LVL 04 HYPER-MIX (✅ ALL MOVES)",
      tagFr: "⚡ NIV. 04 · 3 MIN · 4 ❤️ · ✅ TOUS LES MOUVEMENTS",
      tagEn: "⚡ LVL 04 · 3 MIN · 4 ❤️ · ✅ ALL MOVEMENTS",
      unlimitedHearts: false
    },
    "5": {
      shortFr: "NIV. 05 FIT CLOCKWORK (5 MIN · ♾️)",
      shortEn: "LVL 05 FIT CLOCKWORK (5 MIN · ♾️)",
      tagFr: "⚙️ BEATFIT 5 MIN · ♾️ CŒURS · 🚫 SANS SAUT NI SQUAT",
      tagEn: "⚙️ BEATFIT 5 MIN · ♾️ HEARTS · 🚫 NO JUMP OR SQUAT",
      unlimitedHearts: true
    },
    "6": {
      shortFr: "NIV. 06 FIT BLACK ICE (5 MIN · ♾️)",
      shortEn: "LVL 06 FIT BLACK ICE (5 MIN · ♾️)",
      tagFr: "🧊 BEATFIT 5 MIN · ♾️ CŒURS · 🚫 SANS SQUAT",
      tagEn: "🧊 BEATFIT 5 MIN · ♾️ HEARTS · 🚫 NO SQUAT",
      unlimitedHearts: true
    },
    "7": {
      shortFr: "NIV. 07 FIT SHORELINE (5 MIN · ♾️)",
      shortEn: "LVL 07 FIT SHORELINE (5 MIN · ♾️)",
      tagFr: "☀️ BEATFIT 5 MIN · ♾️ CŒURS · 🚫 SANS SAUT",
      tagEn: "☀️ BEATFIT 5 MIN · ♾️ HEARTS · 🚫 NO JUMP",
      unlimitedHearts: true
    },
    "8": {
      shortFr: "NIV. 08 FIT CROWN ARENA (10 MIN · ♾️)",
      shortEn: "LVL 08 FIT CROWN ARENA (10 MIN · ♾️)",
      tagFr: "🔥 FIT INTENSE 10 MIN · ♾️ CŒURS · ✅ TOUS MOUVEMENTS",
      tagEn: "🔥 FIT INTENSE 10 MIN · ♾️ HEARTS · ✅ ALL MOVEMENTS",
      unlimitedHearts: true
    },
    "9": {
      shortFr: "NIV. 09 BONUS MÉLI-MÉLO 6 MONDES (10 MIN · ♾️)",
      shortEn: "LVL 09 BONUS 6-WORLD MEGAMIX (10 MIN · ♾️)",
      tagFr: "🌟 BONUS 10 MIN · ♾️ CŒURS · TRAVERSE LES 6 MONDES !",
      tagEn: "🌟 BONUS 10 MIN · ♾️ HEARTS · ALL 6 WORLDS MARATHON!",
      unlimitedHearts: true
    }
  };

  const diffCatalog = {
    chill: { label: "EASY (~40 OBS)", obs: 40 },
    normal: { label: "NORMAL (~80 OBS · COMBOS x2)", obs: 80 },
    fast: { label: "HARD (~125 OBS · COMBOS x2/x3)", obs: 125 },
    turbo: { label: "EXPERT+ (~175 OBS · COMBOS x3)", obs: 175 }
  };

  const quizTranslations = {
    fr: {
      planPrefix: "🎯 Ton Programme Salon :",
      nojump_5m: "Sakura Zen · Niv. 07 BeatFit (5 min · 🚫 Sans Saut · ♾️ Cœurs)",
      nojump_10m: "Red Cristal · Niv. 05 + 07 Enchaînés (10 min · 🚫 Sans Saut · ♾️ Cœurs)",
      nosquat_5m: "Temple Indiana · Niv. 06 Black Ice (5 min · 🚫 Sans Squat · ♾️ Cœurs)",
      nosquat_10m: "Halloween · Niv. 03 + 06 Parkour (10 min · 🚫 Sans Squat · ♾️ Cœurs)",
      full_5m: "Red Cristal · Niv. 04 Hyper-Mix (Cardio Complet · 134 BPM)",
      full_10m: "Méli-Mélo des 6 Mondes · Niv. 09 Marathon (10 min · ♾️ Cœurs)",
      partySuffix: " · 🏆 Tournoi 2–4 Joueurs",
      soloSuffix: " · 👤 Solo + Fantôme 3D",
      kcal5: "~55–85 kcal / session · 0 impact voisins",
      kcal10: "~115–165 kcal / session · Endurance HIIT"
    },
    en: {
      planPrefix: "🎯 Your TV Workout Plan:",
      nojump_5m: "Sakura Zen · Lvl 07 BeatFit (5 Min · 🚫 No-Jump · ♾️ Hearts)",
      nojump_10m: "Red Crystal · Lvl 05 + 07 Combo (10 Min · 🚫 No-Jump · ♾️ Hearts)",
      nosquat_5m: "Indiana Temple · Lvl 06 Black Ice (5 Min · 🚫 No-Squat · ♾️ Hearts)",
      nosquat_10m: "Halloween · Lvl 03 + 06 Parkour (10 Min · 🚫 No-Squat · ♾️ Hearts)",
      full_5m: "Red Crystal · Lvl 04 Hyper-Mix (Full Body · 134 BPM)",
      full_10m: "6-World Megamix · Lvl 09 Marathon (10 Min · ♾️ Hearts)",
      partySuffix: " · 🏆 2–4P Party Podium",
      soloSuffix: " · 👤 Solo + 3D Ghost",
      kcal5: "~55–85 kcal / run · Apartment-friendly",
      kcal10: "~115–165 kcal / run · Full HIIT burn"
    },
    es: {
      planPrefix: "🎯 Tu Plan TV Personalizado:",
      nojump_5m: "Sakura Zen · Niv. 07 BeatFit (5 min · 🚫 Sin Saltos · ♾️ Vidas)",
      nojump_10m: "Red Cristal · Niv. 05 + 07 (10 min · 🚫 Sin Saltos · ♾️ Vidas)",
      nosquat_5m: "Templo Indiana · Niv. 06 Black Ice (5 min · 🚫 Sin Sentadillas · ♾️ Vidas)",
      nosquat_10m: "Halloween · Niv. 03 + 06 Parkour (10 min · 🚫 Sin Sentadillas)",
      full_5m: "Red Cristal · Niv. 04 Hyper-Mix (Cardio Total · 134 BPM)",
      full_10m: "Maratón 6 Mundos · Niv. 09 (10 min · ♾️ Vidas Ilimitadas)",
      partySuffix: " · 🏆 Torneo 2–4 Jugadores",
      soloSuffix: " · 👤 Solo + Fantasma 3D",
      kcal5: "~55–85 kcal · Ideal para piso sin ruido",
      kcal10: "~115–165 kcal · Resistencia HIIT"
    },
    de: {
      planPrefix: "🎯 Dein Wohnzimmer-TV-Plan:",
      nojump_5m: "Sakura Zen · Lvl 07 BeatFit (5 Min · 🚫 Ohne Springen · ♾️ Herzen)",
      nojump_10m: "Red Crystal · Lvl 05 + 07 (10 Min · 🚫 Ohne Springen · ♾️ Herzen)",
      nosquat_5m: "Indiana Temple · Lvl 06 Black Ice (5 Min · 🚫 Ohne Squats · ♾️ Herzen)",
      nosquat_10m: "Halloween · Lvl 03 + 06 Parkour (10 Min · 🚫 Ohne Squats)",
      full_5m: "Red Crystal · Lvl 04 Hyper-Mix (Ganzkörper · 134 BPM)",
      full_10m: "6-Welten-Megamix · Lvl 09 Marathon (10 Min · ♾️ Herzen)",
      partySuffix: " · 🏆 2–4 Spieler Turnier",
      soloSuffix: " · 👤 Solo + 3D-Geist",
      kcal5: "~55–85 kcal · Mietwohnung-freundlich",
      kcal10: "~115–165 kcal · Intensives HIIT"
    },
    ja: {
      planPrefix: "🎯 あなた専用リビングTVプラン：",
      nojump_5m: "Sakura Zen · Lv.07 BeatFit（5分 · 🚫ジャンプなし静音 · ♾️無敵ハート）",
      nojump_10m: "Red Cristal · Lv.05+07 連続燃焼（10分 · 🚫ジャンプなし · ♾️無敵）",
      nosquat_5m: "Temple Indiana · Lv.06 Black Ice（5分 · 🚫スクワットなし · ♾️無敵）",
      nosquat_10m: "Halloween · Lv.03+06 パルクール（10分 · 🚫膝に優しい）",
      full_5m: "Red Cristal · Lv.04 ハイパーミックス（全身燃焼 · 134 BPM）",
      full_10m: "6ワールド・メガミックス · Lv.09 マラソン（10分 · ♾️無敵ハート）",
      partySuffix: " · 🏆 2〜4人交代トーナメント",
      soloSuffix: " · 👤 ソロ＋3Dゴースト対戦",
      kcal5: "約55〜85 kcal · マンション防音OK",
      kcal10: "約115〜165 kcal · 本格HIIT脂肪燃焼"
    },
    ko: {
      planPrefix: "🎯 나만의 거실 TV 홈트 플랜:",
      nojump_5m: "Sakura Zen · Lv.07 BeatFit (5분 · 🚫층간소음 점프 없음 · ♾️무제한 하트)",
      nojump_10m: "Red Cristal · Lv.05+07 연속 복싱 (10분 · 🚫점프 없음 · ♾️무제한)",
      nosquat_5m: "Temple Indiana · Lv.06 Black Ice (5분 · 🚫스쿼트 없음 · ♾️무제한)",
      nosquat_10m: "Halloween · Lv.03+06 파쿠르 (10분 · 🚫무릎 보호)",
      full_5m: "Red Cristal · Lv.04 하이퍼 믹스 (전신 유산소 · 134 BPM)",
      full_10m: "6월드 메가믹스 · Lv.09 마라톤 (10분 · ♾️무제한 하트)",
      partySuffix: " · 🏆 2~4인 거실 토너먼트",
      soloSuffix: " · 👤 솔로 + 3D 고스트 대결",
      kcal5: "약 55~85 kcal · 아파트 층간소음 제로",
      kcal10: "약 115~165 kcal · 고강도 HIIT 버닝"
    },
    pt: {
      planPrefix: "🎯 Seu Plano de Treino na TV:",
      nojump_5m: "Sakura Zen · Nív. 07 BeatFit (5 min · 🚫 Sem Pulos · ♾️ Vidas)",
      nojump_10m: "Red Cristal · Nív. 05 + 07 (10 min · 🚫 Sem Pulos · ♾️ Vidas)",
      nosquat_5m: "Templo Indiana · Nív. 06 Black Ice (5 min · 🚫 Sem Agachamento)",
      nosquat_10m: "Halloween · Nív. 03 + 06 Parkour (10 min · 🚫 Sem Agachamento)",
      full_5m: "Red Cristal · Nív. 04 Hyper-Mix (Cardio Completo · 134 BPM)",
      full_10m: "Megamix 6 Mundos · Nív. 09 Maratona (10 min · ♾️ Vidas)",
      partySuffix: " · 🏆 Torneio 2–4 Jogadores",
      soloSuffix: " · 👤 Solo + Fantasma 3D",
      kcal5: "~55–85 kcal · Silencioso para apartamento",
      kcal10: "~115–165 kcal · Queima HIIT intensa"
    }
  };

  const langMeta = {
    fr: { flag: "🇫🇷", page: "index.html", aria: "FR — Changer la langue", soundOff: "🔇 SON OFF", soundOn: "🔊 SON ON", menuOpen: "Menu — Ouvrir", menuClose: "Menu — Fermer" },
    en: { flag: "🇺🇸", page: "en.html", aria: "EN — Change language", soundOff: "🔇 SOUND OFF", soundOn: "🔊 SOUND ON", menuOpen: "Menu — Open", menuClose: "Menu — Close" },
    es: { flag: "🇪🇸", page: "es.html", aria: "ES — Cambiar idioma", soundOff: "🔇 SONIDO OFF", soundOn: "🔊 SONIDO ON", menuOpen: "Menú — Abrir", menuClose: "Menú — Cerrar" },
    de: { flag: "🇩🇪", page: "de.html", aria: "DE — Sprache ändern", soundOff: "🔇 TON AUS", soundOn: "🔊 TON AN", menuOpen: "Menü — Öffnen", menuClose: "Menü — Schließen" },
    ja: { flag: "🇯🇵", page: "ja.html", aria: "JA — 言語を変更", soundOff: "🔇 音声OFF", soundOn: "🔊 音声ON", menuOpen: "メニューを開く", menuClose: "メニューを閉じる" },
    ko: { flag: "🇰🇷", page: "ko.html", aria: "KO — 언어 변경", soundOff: "🔇 소리 끔", soundOn: "🔊 소리 켬", menuOpen: "메뉴 열기", menuClose: "메뉴 닫기" },
    pt: { flag: "🇧🇷", page: "pt.html", aria: "PT — Mudar idioma", soundOff: "🔇 SOM OFF", soundOn: "🔊 SOM ON", menuOpen: "Menu — Abrir", menuClose: "Menu — Fechar" }
  };

  // --- Console Step Switching ---
  const stepTabs = document.querySelectorAll(".step-tab");
  const stepPanes = document.querySelectorAll(".console-step-pane");
  const nextStepBtn = document.getElementById("btn-next-step");

  function setStep(stepNum) {
    activeStep = stepNum;
    stepTabs.forEach((tab) => {
      const s = Number(tab.dataset.step);
      const isAct = s === activeStep;
      tab.classList.toggle("active", isAct);
      tab.setAttribute("aria-selected", isAct ? "true" : "false");
    });
    stepPanes.forEach((pane, idx) => {
      pane.classList.toggle("active", idx + 1 === activeStep);
    });
  }

  stepTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setStep(Number(tab.dataset.step));
    });
  });

  if (nextStepBtn) {
    nextStepBtn.addEventListener("click", () => {
      setStep(activeStep < 3 ? activeStep + 1 : 1);
    });
  }

  // --- Update Live Viewport & Recap Bar ---
  function refreshConsoleAndViewport() {
    const w = worldCatalog[selectedWorld] || worldCatalog.toyStory;
    const l = levelCatalog[selectedLevel] || levelCatalog["1"];
    const d = diffCatalog[selectedDiff] || diffCatalog.normal;
    const partyLabel =
      selectedPlayers === "1"
        ? "SOLO"
        : `${selectedPlayers} ${currentLang === "fr" ? "JOUEURS" : "PLAYERS"}`;

    const recapEl = document.getElementById("console-recap-text");
    if (recapEl) {
      const lvlText = currentLang === "fr" ? l.shortFr : l.shortEn;
      recapEl.textContent = `${w.short} · ${lvlText} · ${d.label} · ${partyLabel}`;
    }

    const vpBadge = document.getElementById("vp-world-badge");
    if (vpBadge) vpBadge.textContent = w.badge;

    const vpHearts = document.getElementById("vp-hearts");
    if (vpHearts) {
      if (l.unlimitedHearts) {
        vpHearts.textContent = currentLang === "fr" ? "♾️ CŒURS" : "♾️ HEARTS";
      } else {
        vpHearts.textContent = "❤️❤️❤️❤️";
      }
    }

    const vpWall = document.getElementById("vp-world-wall");
    if (vpWall && vpWall.getAttribute("src") !== w.wall) {
      vpWall.src = w.wall;
    }

    const vpMonster = document.getElementById("vp-world-monster");
    if (vpMonster && vpMonster.getAttribute("src") !== w.monster) {
      vpMonster.src = w.monster;
    }

    const vpMetaTag = document.getElementById("vp-meta-tag");
    if (vpMetaTag) {
      vpMetaTag.textContent = currentLang === "fr" ? l.tagFr : l.tagEn;
    }

    const vpMetaTitle = document.getElementById("vp-meta-title");
    if (vpMetaTitle) {
      const baseTitle = currentLang === "fr" ? w.titleFr : w.titleEn;
      vpMetaTitle.textContent = `${baseTitle} · ~${d.obs} obs`;
    }

    const vpMetaSub = document.getElementById("vp-meta-sub");
    if (vpMetaSub) {
      vpMetaSub.textContent = currentLang === "fr" ? w.subFr : w.subEn;
    }
  }

  // --- World, Level, Difficulty & Party Selection ---
  const worldCards = document.querySelectorAll(".world-console-card");
  worldCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedWorld = card.dataset.world || "toyStory";
      worldCards.forEach((c) => c.classList.toggle("selected", c === card));
      refreshConsoleAndViewport();
      activateViewportSlide("vp-slide-video");
      hydrateDemoVideo();
    });
  });

  const tutoBanner = document.getElementById("btn-select-tutorial");
  if (tutoBanner) {
    const startTutorial = () => {
      selectedLevel = "0";
      selectedDiff = "normal";
      refreshConsoleAndViewport();
      setStep(3);
    };
    tutoBanner.addEventListener("click", startTutorial);
    tutoBanner.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startTutorial();
      }
    });
  }

  const levelCards = document.querySelectorAll(".level-console-card");
  levelCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedLevel = card.dataset.level || "1";
      levelCards.forEach((c) => c.classList.toggle("selected", c === card));
      refreshConsoleAndViewport();
    });
  });

  const diffCards = document.querySelectorAll(".diff-console-card");
  diffCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedDiff = card.dataset.diff || "normal";
      diffCards.forEach((c) => c.classList.toggle("selected", c === card));
      refreshConsoleAndViewport();
    });
  });

  const partyPills = document.querySelectorAll(".party-pill");
  partyPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      selectedPlayers = pill.dataset.players || "1";
      partyPills.forEach((p) => p.classList.toggle("active", p === pill));
      refreshConsoleAndViewport();
    });
  });

  // --- Viewport Media Switcher (ARIA Tablist Compliant) ---
  const vpButtons = document.querySelectorAll(".vp-switch-btn");
  const vpSlides = document.querySelectorAll(".vp-media-slide");

  function activateViewportSlide(targetId) {
    vpSlides.forEach((s) => s.classList.toggle("active", s.id === targetId));
    vpButtons.forEach((b) => {
      const active = b.dataset.target === targetId;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  vpButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateViewportSlide(btn.dataset.target);
      if (btn.dataset.target === "vp-slide-video") {
        hydrateDemoVideo();
      }
    });
  });

  // --- Zero-Degradation Smart Video Hydration (Original Crisp MP4/WebM via Cloudflare Edge) ---
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const lobbyHeroVideo = document.getElementById("lobby-hero-video");
  const heroVideo = document.getElementById("hero-video");
  const soundBtn = document.getElementById("btn-video-sound");
  const soundLabel = document.getElementById("sound-label");

  let lobbyHydrated = false;
  let demoHydrated = false;
  let userHasInteracted = false;

  function hydrateLobbyVideo() {
    if (!lobbyHeroVideo || lobbyHydrated || motionQuery.matches || saveData) return;
    lobbyHydrated = true;
    const mp4Src = lobbyHeroVideo.getAttribute("data-mp4");
    const webmSrc = lobbyHeroVideo.getAttribute("data-webm");
    if (mp4Src && !lobbyHeroVideo.querySelector("source")) {
      const s1 = document.createElement("source");
      s1.src = mp4Src;
      s1.type = 'video/mp4; codecs="avc1.4D4028"';
      lobbyHeroVideo.appendChild(s1);
      if (webmSrc) {
        const s2 = document.createElement("source");
        s2.src = webmSrc;
        s2.type = "video/webm";
        lobbyHeroVideo.appendChild(s2);
      }
      lobbyHeroVideo.preload = "auto";
      lobbyHeroVideo.load();
    }
    const p = lobbyHeroVideo.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }

  function hydrateDemoVideo() {
    if (!heroVideo || motionQuery.matches || saveData) return;
    const targetSrc =
      currentLang === "fr"
        ? "assets/videos/demo_tracking.mp4"
        : "assets/videos/demo_tracking_en.mp4";
    const existingSource = heroVideo.querySelector("source");
    if (!demoHydrated) {
      demoHydrated = true;
      if (existingSource) {
        existingSource.src = targetSrc;
      } else {
        const s = document.createElement("source");
        s.src = targetSrc;
        s.type = "video/mp4";
        heroVideo.appendChild(s);
      }
      heroVideo.preload = "metadata";
      heroVideo.load();
    }
    const p = heroVideo.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }

  if (lobbyHeroVideo) {
    lobbyHeroVideo.loop = true;
    lobbyHeroVideo.addEventListener("ended", () => {
      if (motionQuery.matches) return;
      lobbyHeroVideo.currentTime = 0;
      lobbyHeroVideo.play().catch(() => {});
    });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && lobbyHydrated && !motionQuery.matches && lobbyHeroVideo.paused) {
        lobbyHeroVideo.play().catch(() => {});
      }
    });
    window.addEventListener("pageshow", () => {
      if (lobbyHydrated && !motionQuery.matches && lobbyHeroVideo.paused) {
        lobbyHeroVideo.play().catch(() => {});
      }
    });
  }

  const onFirstHumanSignal = () => {
    userHasInteracted = true;
    hydrateLobbyVideo();
  };
  ["pointerdown", "pointermove", "touchstart", "wheel", "keydown", "scroll"].forEach((evt) => {
    window.addEventListener(evt, onFirstHumanSignal, { once: true, passive: true });
  });

  // Idle fallback on wide desktop screens after initial reading pause if mouse hasn't moved yet
  window.addEventListener("load", () => {
    if (window.innerWidth >= 960 && !motionQuery.matches && !saveData) {
      setTimeout(() => {
        hydrateLobbyVideo();
      }, 7500);
    }
  });

  if (heroVideo && "IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && userHasInteracted) {
            hydrateDemoVideo();
          } else if (!entry.isIntersecting && demoHydrated && !heroVideo.paused) {
            heroVideo.pause();
          }
        });
      },
      { threshold: 0.35 }
    ).observe(heroVideo);
  }

  function refreshSoundLabel() {
    if (!heroVideo || !soundLabel) return;
    const meta = langMeta[currentLang] || langMeta.fr;
    soundLabel.textContent = heroVideo.muted ? meta.soundOff : meta.soundOn;
  }

  if (heroVideo && soundBtn && soundLabel) {
    soundBtn.addEventListener("click", () => {
      hydrateDemoVideo();
      heroVideo.muted = !heroVideo.muted;
      refreshSoundLabel();
    });
  }

  // --- Interactive 20-Second TV Workout Builder Quiz ---
  function syncQuizSelectionToConsole() {
    if (quizState.space === "nojump") {
      selectedWorld = "sakuraZen";
      selectedLevel = quizState.time === "10m" ? "5" : "7";
    } else if (quizState.space === "nosquat") {
      selectedWorld = "indianaTemple";
      selectedLevel = "6";
    } else {
      selectedWorld = quizState.time === "10m" ? "superHot" : "superHot";
      selectedLevel = quizState.time === "10m" ? "9" : "4";
    }
    selectedDiff = quizState.time === "10m" ? "fast" : "normal";
    selectedPlayers = quizState.who === "party" ? "2" : "1";

    worldCards.forEach((c) => c.classList.toggle("selected", c.dataset.world === selectedWorld));
    levelCards.forEach((c) => c.classList.toggle("selected", c.dataset.level === selectedLevel));
    diffCards.forEach((c) => c.classList.toggle("selected", c.dataset.diff === selectedDiff));
    partyPills.forEach((p) => p.classList.toggle("active", p.dataset.players === selectedPlayers));

    const qt = quizTranslations[currentLang] || quizTranslations.en;
    const planKey = `${quizState.space}_${quizState.time}`;
    const planTitleEl = document.getElementById("quiz-plan-title");
    const planMetaEl = document.getElementById("quiz-plan-meta");
    if (planTitleEl) {
      const suffix = quizState.who === "party" ? qt.partySuffix : qt.soloSuffix;
      planTitleEl.textContent = `${qt.planPrefix} ${qt[planKey] || qt.nojump_5m}${suffix}`;
    }
    if (planMetaEl) {
      planMetaEl.textContent = quizState.time === "10m" ? qt.kcal10 : qt.kcal5;
    }

    refreshConsoleAndViewport();
  }

  document.querySelectorAll(".quiz-choice-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const group = pill.getAttribute("data-quiz-group");
      const val = pill.getAttribute("data-quiz-val");
      if (!group || !val) return;
      quizState[group] = val;
      document
        .querySelectorAll(`.quiz-choice-pill[data-quiz-group="${group}"]`)
        .forEach((p) => {
          const active = p === pill;
          p.classList.toggle("is-selected", active);
          p.setAttribute("aria-pressed", active ? "true" : "false");
        });
      syncQuizSelectionToConsole();
      trackFunnelEvent("quiz-select", `${group}:${val}`);
    });
  });

  // Hydrate preset from URL query (?preset=nojump-party-10m)
  const urlParams = new URLSearchParams(window.location.search);
  const presetParam = urlParams.get("preset");
  if (presetParam) {
    const parts = presetParam.split("-");
    if (["nojump", "full", "nosquat"].includes(parts[0])) quizState.space = parts[0];
    if (["solo", "party"].includes(parts[1])) quizState.who = parts[1];
    if (["5m", "10m"].includes(parts[2])) quizState.time = parts[2];
    document.querySelectorAll(".quiz-choice-pill").forEach((p) => {
      const g = p.getAttribute("data-quiz-group");
      const v = p.getAttribute("data-quiz-val");
      const match = quizState[g] === v;
      p.classList.toggle("is-selected", match);
      p.setAttribute("aria-pressed", match ? "true" : "false");
    });
    syncQuizSelectionToConsole();
  }

  // --- Desktop-to-iPhone QR Drawer Toggle ---
  const qrToggleBtn = document.getElementById("qr-toggle-btn");
  const qrDrawer = document.getElementById("qr-handoff-drawer");
  if (qrToggleBtn && qrDrawer) {
    qrToggleBtn.addEventListener("click", () => {
      const open = !qrDrawer.classList.contains("is-open");
      qrDrawer.classList.toggle("is-open", open);
      qrToggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) trackFunnelEvent("qr-open", currentLang);
    });
  }

  // --- Header Language Button & Legacy ?lang= Redirect ---
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const idx = supportedLangs.indexOf(currentLang);
      const nextLang = supportedLangs[(idx + 1) % supportedLangs.length];
      const targetPage = (langMeta[nextLang] || langMeta.fr).page;
      window.location.href = targetPage;
    });
  }

  const queryLang = (urlParams.get("lang") || "").toLowerCase().slice(0, 2);
  if (supportedLangs.includes(queryLang) && queryLang !== initialPageLang) {
    const targetPage = (langMeta[queryLang] || langMeta.fr).page;
    window.location.replace(targetPage + window.location.hash);
    return;
  }

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = !siteNav.classList.contains("is-open");
      siteNav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      const meta = langMeta[currentLang] || langMeta.fr;
      navToggle.setAttribute("aria-label", open ? meta.menuClose : meta.menuOpen);
    });
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        const meta = langMeta[currentLang] || langMeta.fr;
        navToggle.setAttribute("aria-label", meta.menuOpen);
      });
    });
  }

  if (presetParam) {
    refreshSoundLabel();
  }

  // --- Founder VIP Pass / TestFlight + RevenueCat Web Billing Ready Checkout ---
  const waitlistBox = document.getElementById("vip-waitlist-box");
  const vwStep2 = document.getElementById("vw-step-2");
  const vwStep3 = document.getElementById("vw-step-3");
  const vwStepIndicator = document.getElementById("vw-step-indicator");
  const vwEmailInput = document.getElementById("vw-email-input");
  let waitlistDevice = "ios";

  document.querySelectorAll(".vw-device-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      waitlistDevice = btn.getAttribute("data-device") || "ios";
      document.querySelectorAll(".vw-device-btn").forEach((b) => {
        b.classList.toggle("is-selected", b === btn);
      });
      if (vwEmailInput) vwEmailInput.focus();
    });
  });

  if (vwStep2) {
    vwStep2.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!vwEmailInput) return;
      const email = vwEmailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        vwEmailInput.focus();
        vwEmailInput.style.borderColor = "#FF4769";
        return;
      }
      vwEmailInput.style.borderColor = "";
      const wantsTestFlight = waitlistDevice === "ios";
      const presetCode = `${quizState.space}-${quizState.who}-${quizState.time}`;
      const payload = {
        email,
        device: waitlistDevice === "ios" ? "Apple iOS (iPhone / iPad)" : "Android / Other",
        testflight: wantsTestFlight ? "YES (TestFlight Beta)" : "Launch Alert Only",
        planIntent: selectedPlanIntent,
        quizPreset: presetCode,
        lang: currentLang,
        timestamp: new Date().toISOString()
      };

      try {
        localStorage.setItem("bodyrush_vip_waitlist_v2", JSON.stringify(payload));
      } catch (_) {}

      trackFunnelEvent("vip-submit", `${selectedPlanIntent}:${presetCode}`);

      // Direct RevenueCat Web Billing handoff when enabled post-App-Review
      if (WEB_CHECKOUT_CONFIG.enabled) {
        const baseCheckout =
          selectedPlanIntent === "lifetime"
            ? WEB_CHECKOUT_CONFIG.lifetimeCheckoutUrl
            : WEB_CHECKOUT_CONFIG.annualCheckoutUrl;
        if (baseCheckout) {
          const sep = baseCheckout.includes("?") ? "&" : "?";
          window.location.href = `${baseCheckout}${sep}email=${encodeURIComponent(email)}&utm_source=bodyrush_web&lang=${currentLang}&preset=${presetCode}`;
          return;
        }
      }

      const subject = encodeURIComponent(
        wantsTestFlight
          ? `BodyRush.app — VIP & TestFlight iOS (${email} · ${currentLang.toUpperCase()})`
          : `BodyRush.app — VIP Waitlist (${email} · ${currentLang.toUpperCase()})`
      );
      const body = encodeURIComponent(
        `Hello Xavier,\n\nVIP Early Access & Personalized TV Plan registration on BodyRush.app:\n- Email: ${email}\n- Device: ${payload.device}\n- Edition Interest: ${selectedPlanIntent.toUpperCase()}\n- Custom TV Preset: ${presetCode}\n- Language: ${currentLang.toUpperCase()}\n`
      );
      const mailtoUrl = `mailto:xlarrodeapp+bodyrush@gmail.com?subject=${subject}&body=${body}`;

      if (vwStep2 && vwStep3) {
        vwStep2.classList.remove("active");
        vwStep3.classList.add("active");
      }
      if (vwStepIndicator) {
        vwStepIndicator.textContent = "✓ VIP";
      }

      window.location.href = mailtoUrl;
    });
  }

  document.querySelectorAll(".js-scroll-waitlist, #hud-waitlist-cta").forEach((el) => {
    el.addEventListener("click", (e) => {
      const planAttr = el.getAttribute("data-plan");
      if (planAttr) {
        selectedPlanIntent = planAttr;
        trackFunnelEvent("tier-click", planAttr);
        if (WEB_CHECKOUT_CONFIG.enabled) {
          const checkoutUrl =
            planAttr === "lifetime"
              ? WEB_CHECKOUT_CONFIG.lifetimeCheckoutUrl
              : planAttr === "annual"
              ? WEB_CHECKOUT_CONFIG.annualCheckoutUrl
              : WEB_CHECKOUT_CONFIG.appStoreUrl;
          if (checkoutUrl) {
            e.preventDefault();
            const sep = checkoutUrl.includes("?") ? "&" : "?";
            window.location.href = `${checkoutUrl}${sep}utm_source=bodyrush_web&lang=${currentLang}`;
            return;
          }
        }
      }
      if (!waitlistBox) return;
      e.preventDefault();
      waitlistBox.scrollIntoView({ behavior: "smooth", block: "center" });
      waitlistBox.classList.remove("vw-highlight-pulse");
      void waitlistBox.offsetWidth;
      waitlistBox.classList.add("vw-highlight-pulse");
      setTimeout(() => {
        if (vwEmailInput) vwEmailInput.focus({ preventScroll: true });
      }, 280);
    });
  });

  // --- Captures slideshow (#captures-wall) deferred off critical boot path ---
  const scheduleIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 120));
  scheduleIdle(() => {
  const capShow = document.getElementById("cap-show");
  if (capShow) {
    const DURATION = 4500;
    const stage = capShow.querySelector(".cap-stage");
    const track = capShow.querySelector(".cap-track");
    const slides = Array.from(capShow.querySelectorAll(".cap-slide"));
    const segs = Array.from(capShow.querySelectorAll(".cap-progress-seg"));
    const thumbs = Array.from(capShow.querySelectorAll(".cap-thumb"));
    const titleEl = capShow.querySelector(".cap-caption strong");
    const descEl = capShow.querySelector(".cap-caption span");
    const prevBtn = capShow.querySelector(".cap-prev");
    const nextBtn = capShow.querySelector(".cap-next");
    const count = slides.length;

    let index = 0;
    let timer = 0;
    let remaining = DURATION;
    let stamp = 0;
    let hovering = false;
    let touching = false;
    let focused = false;
    let reduced = motionQuery.matches;
    let swipe = null;
    let inView = false;

    function hold() {
      return reduced || hovering || touching || focused || !inView;
    }

    function clearTimer() {
      if (!timer) return;
      clearTimeout(timer);
      timer = 0;
    }

    function pause() {
      capShow.classList.add("is-paused");
      if (reduced || !timer) return;
      remaining -= Date.now() - stamp;
      if (remaining < 0) remaining = 0;
      clearTimer();
    }

    function arm() {
      if (hold()) {
        capShow.classList.add("is-paused");
        return;
      }
      capShow.classList.remove("is-paused");
      stamp = Date.now();
      clearTimer();
      timer = setTimeout(() => {
        timer = 0;
        go(index + 1);
      }, remaining);
    }

    function writeCaption() {
      const slide = slides[index];
      if (!slide) return;
      const capTitle = slide.getAttribute("data-cap-title");
      const capDesc = slide.getAttribute("data-cap-desc");
      if (titleEl && capTitle) titleEl.textContent = capTitle;
      if (descEl && capDesc) descEl.textContent = capDesc;
    }

    function restartProgress() {
      if (!inView) return;
      const fill = segs[index] && segs[index].querySelector(".cap-progress-fill");
      if (!fill) return;
      fill.style.animation = "none";
      requestAnimationFrame(() => {
        fill.style.animation = "";
      });
    }

    function go(next) {
      index = (next + count) % count;
      capShow.style.setProperty("--cap-index", String(index));
      if (track) track.style.setProperty("--cap-index", String(index));
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle("is-active", on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
      });
      segs.forEach((seg, i) => {
        seg.classList.toggle("is-done", i < index);
        seg.classList.toggle("is-active", i === index);
      });
      thumbs.forEach((btn, i) => {
        const on = i === index;
        btn.classList.toggle("is-active", on);
        if (on) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      });
      writeCaption();
      restartProgress();
      remaining = DURATION;
      clearTimer();
      arm();
    }

    function syncReduced() {
      reduced = motionQuery.matches;
      capShow.classList.toggle("is-reduced", reduced);
      if (reduced) {
        clearTimer();
        capShow.classList.add("is-paused");
      } else {
        remaining = DURATION;
        arm();
      }
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            inView = entry.isIntersecting;
            if (inView) arm();
            else pause();
          });
        },
        { threshold: 0.2 }
      ).observe(capShow);
    } else {
      inView = true;
    }

    if (prevBtn) prevBtn.addEventListener("click", () => go(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => go(index + 1));
    thumbs.forEach((btn, i) => btn.addEventListener("click", () => go(i)));

    capShow.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      }
    });

    capShow.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      hovering = true;
      pause();
    });
    capShow.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      hovering = false;
      if (!touching) arm();
    });
    capShow.addEventListener("focusin", () => {
      focused = true;
      pause();
    });
    capShow.addEventListener("focusout", () => {
      setTimeout(() => {
        focused = capShow.contains(document.activeElement);
        if (!focused) arm();
      }, 0);
    });

    if (stage) {
      stage.addEventListener("pointerdown", (e) => {
        if (e.target.closest("button")) return;
        swipe = { x: e.clientX, y: e.clientY, id: e.pointerId };
        touching = true;
        pause();
      });
      stage.addEventListener("pointerup", (e) => {
        if (!swipe || e.pointerId !== swipe.id) return;
        const dx = e.clientX - swipe.x;
        const dy = e.clientY - swipe.y;
        swipe = null;
        touching = false;
        if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
          go(dx < 0 ? index + 1 : index - 1);
          return;
        }
        arm();
      });
      stage.addEventListener("pointercancel", () => {
        swipe = null;
        touching = false;
        arm();
      });
    }

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", syncReduced);
    }
    syncReduced();
    writeCaption();
  }
  });
});
