/**
 * BodyRush 3D — Interactive In-App Arcade Console & Bilingual Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "fr";
  let activeStep = 1;
  let selectedWorld = "toyStory";
  let selectedLevel = "1";
  let selectedDiff = "normal";
  let selectedPlayers = "1";

  const worldCatalog = {
    toyStory: {
      badge: "🐱 TOY KINGDOM · CLOCKWORK 128 BPM",
      short: "🐱 TOY KINGDOM",
      wall: "assets/worlds/world_toystory_wall.jpg",
      monster: "assets/stickers/villain_toystory_mainecoon.png",
      titleFr: "Toy Kingdom — Musique : Clockwork (128 BPM)",
      titleEn: "Toy Kingdom — Track: Clockwork (128 BPM)",
      subFr: "Chat Maine Coon, Robot jouet, train en bois & cubes rythmés",
      subEn: "Maine Coon Cat, Toy Robot, wooden train & rhythm cubes"
    },
    sakuraZen: {
      badge: "🌸 SAKURA ZEN · CANDY VELOCITY 130 BPM",
      short: "🌸 SAKURA ZEN",
      wall: "assets/worlds/pm_sakura_wall.jpg",
      monster: "assets/stickers/villain_sakura_pink_panda.png",
      titleFr: "Sakura Zen — Musique : Candy Velocity (130 BPM)",
      titleEn: "Sakura Zen — Track: Candy Velocity (130 BPM)",
      subFr: "Panda Rose, Kitsune, arches de fleurs de cerisier & postures zen",
      subEn: "Pink Panda, Kitsune, cherry blossom arches & zen postures"
    },
    indianaTemple: {
      badge: "🏺 TEMPLE INDIANA · HARDENED CLOCKWORK 136 BPM",
      short: "🏺 TEMPLE INDIANA",
      wall: "assets/worlds/pm_temple_wall.jpg",
      monster: "assets/stickers/villain_temple_idol.png",
      titleFr: "Temple Indiana — Musique : Hardened Clockwork (136 BPM)",
      titleEn: "Indiana Temple — Track: Hardened Clockwork (136 BPM)",
      subFr: "Idole Tiki dorée, boule géante de pierre & pieux suspendus",
      subEn: "Golden Tiki Idol, giant rolling boulder & ceiling spikes"
    },
    superHot: {
      badge: "💎 RED CRISTAL · RED CRISTAL 134 BPM",
      short: "💎 RED CRISTAL",
      wall: "assets/worlds/pm_superhot_wall.jpg",
      monster: "assets/stickers/villain_red_crystal_boxer.png",
      titleFr: "Red Cristal — Musique : Red Cristal (134 BPM)",
      titleEn: "Red Crystal — Track: Red Cristal (134 BPM)",
      subFr: "Boxeurs de cristal rubis, lasers bas & murs de verre fissurés",
      subEn: "Ruby crystal boxers, low lasers & cracked glass walls"
    },
    halloween: {
      badge: "🎃 HALLOWEEN · SPOOKY MANSION 132 BPM",
      short: "🎃 HALLOWEEN",
      wall: "assets/worlds/pm_halloween_wall.jpg",
      monster: "assets/stickers/villain_halloween_golem.png",
      titleFr: "Halloween — Musique : Spooky Mansion (132 BPM)",
      titleEn: "Halloween — Track: Spooky Mansion (132 BPM)",
      subFr: "Golem Gargouille, fantômes farceurs & barrières de citrouilles",
      subEn: "Gargoyle Golem, spooky ghosts & pumpkin hurdles"
    },
    christmas: {
      badge: "🎄 NOËL EXPRESS · NOËL EXPRESS 135 BPM",
      short: "🎄 NOËL EXPRESS",
      wall: "assets/worlds/pm_christmas_wall.png",
      monster: "assets/stickers/villain_christmas_snowman.png",
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

  const i18n = {
    fr: {
      brand_sub: "FITNESS · BOXE · POSTURES",
      hud_streak: "🔥 7J SÉRIE",
      nav_console: "🕹️ Menu du Jeu",
      nav_moves: "🥊 Gestes & 10 Postures",
      nav_captures: "📸 Captures",
      nav_tv: "📺 AirPlay TV & Salon",
      nav_pro: "👑 Pass PRO",
      cta_store_short: "🔥 Accès Privé en Avant-Première",
      wl_badge: "🔥 ACCÈS PRIVÉ EN AVANT-PREMIÈRE & BÊTA TESTFLIGHT",
      wl_step_1: "INVITATION PRIORITAIRE",
      wl_step_2: "INVITATION PRIORITAIRE",
      wl_step_3: "✓ INSCRIT EN VIP",
      wl_q1: "Réserve ton accès prioritaire en avant-première :",
      wl_btn_ios: "iPhone / iPad (iOS)",
      wl_tag_tf: "✓ TESTFLIGHT",
      wl_btn_other: "🤖 Android / Autre",
      wl_ios_selected: " Appareil iOS (iPhone / iPad) sélectionné",
      wl_other_selected: "🤖 Android / Autre appareil sélectionné",
      wl_change: "Changer",
      wl_email_ph: "ton.email@exemple.com",
      wl_submit: "🔥 RÉSERVER MON ACCÈS VIP",
      wl_tf_optin: "✈️ Recevoir en priorité mon invitation privée Apple TestFlight pour jouer en avant-première",
      wl_micro_priv: "🔒 Zéro spam. Uniquement pour ton invitation privée TestFlight et l'accès prioritaire au lancement.",
      wl_ok_title: "Tu es sur la liste VIP BodyRush.app !",
      wl_ok_desc: "Ton client mail s'est ouvert automatiquement pour valider ta priorité TestFlight iOS.",
      wl_ok_mailto: "✉️ Priorité TestFlight directe",
      hero_pill_soon: "🔥 INSCRIPTIONS EN AVANT-PREMIÈRE · PLACES VIP LIMITÉES",
      hero_pill_cam: "✓ CAMÉRA VISION 60 FPS",
      hero_pill_gear: "ZÉRO MANETTE · ZÉRO CAPTEUR",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "POSE TON iPHONE À 2 MÈTRES. TON CORPS EST LA MANETTE.",
      hero_lead: "Cours sur place pour faire défiler le couloir 3D, décale-toi à gauche ou à droite, saute par-dessus les pièges, baisse-toi en squat, boxe les monstres en rythme sur la musique et traverse les 10 murs de posture.",
      hero_photo_alt: "Une femme fait du jogging sur place dans son salon, face à une télé qui affiche le couloir du Temple, avec un iPhone posé sur le meuble TV qui suit ses mouvements.",
      console_header: "SÉLECTEUR DE COURSE · COMME DANS L'APP",
      console_handsfree: "🥊 Sélection au doigt ou au coup de poing à 2m",
      tuto_title: "PREMIÈRE FOIS ? LANCE LE TUTORIEL (NIV. 00)",
      tuto_sub: "Pose l'iPhone à 2m et valide les 8 gestes en 1 minute",
      tuto_btn: "TUTO ➔",
      tab_1_label: "1. MONDE 3D (6)",
      tab_2_label: "2. NIVEAU & MUSIQUE (9)",
      tab_3_label: "3. DIFFICULTÉ & SALON",
      step1_heading: "CHOISIS TON UNIVERS 3D :",
      step1_hint: "Clique sur un monde pour voir son couloir et ses monstres",
      badge_free: "GRATUIT",
      w_toy_title: "TOY KINGDOM",
      w_toy_sub: "Chambre des jouets · Chat Maine Coon & Robot",
      w_sakura_title: "SAKURA ZEN",
      w_sakura_sub: "Studio rose & cerisiers · Kitsune & Panda",
      w_red_title: "RED CRISTAL",
      w_hal_title: "HALLOWEEN",
      w_temple_title: "TEMPLE INDIANA",
      w_temple_sub: "Boule géante, pieux & Gardien Tiki",
      w_red_sub: "Bunker de cristal · Boxeurs Rubis & Lasers",
      w_hal_sub: "Manoir hanté · Fantômes & Golem de pierre",
      w_xmas_title: "NOËL EXPRESS",
      w_xmas_sub: "Village enneigé · Bonhomme & Casse-Noisette",
      step2_heading: "CHOISIS TON NIVEAU, LA DURÉE & LES MOUVEMENTS :",
      step2_hint: "Niveaux 3 min (Sans Saut / Sans Squat / Complet), Cardio FIT 5 & 10 min (♾️ Cœurs Illimités) ou Bonus Méli-Mélo 6 Mondes !",
      lvl_1_badge: "NIV. 01 · GRATUIT · 3 MIN · 4 ❤️",
      lvl_1_name: "RYTHME & BOXE",
      lvl_1_desc: "🚫 Sans Saut ni Squat · Vilains G/C/D & Cubes Rythmés",
      lvl_2_badge: "NIV. 02 · POSTURES · 3 MIN · 4 ❤️",
      lvl_2_name: "GYM & POSTURES",
      lvl_2_desc: "🚫 Sans Saut · Murs de Posture Néon, Squats & Boxe",
      lvl_3_badge: "NIV. 03 · PARKOUR · 3 MIN · 4 ❤️",
      lvl_3_name: "PARKOUR ÉTAGES",
      lvl_3_desc: "🚫 Sans Squat · Piliers 3 voies, Sauts & Étages +1/+2/+3",
      lvl_4_badge: "NIV. 04 · HYPER-MIX · 3 MIN · 4 ❤️",
      lvl_4_name: "HYPER-MIX FINAL",
      lvl_4_desc: "✅ Tous les Mouvements · Boxe + Postures + Sauts + Squats",
      lvl_5_badge: "NIV. 05 · FIT 5 MIN · ♾️ CŒURS · 140 BPM",
      lvl_5_name: "BEATFIT · CLOCKWORK",
      lvl_5_desc: "🚫 Sans Saut ni Squat · Cardio Boxe 5 min sans perdre",
      lvl_6_badge: "NIV. 06 · FIT 5 MIN · ♾️ CŒURS · 133 BPM",
      lvl_6_name: "BEATFIT · BLACK ICE",
      lvl_6_desc: "🚫 Sans Squat · Slalom Latéral & Sauts 5 min sans perdre",
      lvl_7_badge: "NIV. 07 · FIT 5 MIN · ♾️ CŒURS · 121 BPM",
      lvl_7_name: "BEATFIT · SHORELINE",
      lvl_7_desc: "🚫 Sans Saut · Postures & Squats Cardio 5 min sans perdre",
      lvl_8_badge: "NIV. 08 · FIT 10 MIN · ♾️ CŒURS · 142 BPM",
      lvl_8_name: "FIT INTENSE · CROWN ARENA",
      lvl_8_desc: "✅ Tous les Mouvements · Endurance 10 min à Cœurs Illimités",
      lvl_9_badge: "NIV. 09 · BONUS 10 MIN · ♾️ CŒURS ILLIMITÉS · 6 MONDES",
      lvl_9_name: "MÉLI-MÉLO DES 6 MONDES ( MARATHON 10 MIN )",
      lvl_9_desc: "✅ Tous les Mouvements · Traverse Toy Kingdom ➔ Sakura ➔ Temple ➔ Cristal ➔ Halloween ➔ Noël avec difficulté progressive !",
      step3_heading: "CHOISIS LA DIFFICULTÉ (STYLE NEON BLADES) :",
      step3_hint: "Plus tu montes en difficulté, plus il y a d'événements et de combos enchaînés (x2 / x3) sur les temps forts !",
      diff_1_desc: "1 événement à la fois (0.82x) · 4 postures faciles · Idéal débutant & enfants",
      diff_2_desc: "2x plus d'événements (1.00x) · 7 postures · Premiers Combos x2 sur le beat",
      diff_3_desc: "3x plus d'événements (1.18x) · Les 10 postures · Combos x2 & x3 enchaînés",
      diff_4_desc: "4x plus d'événements (1.35x) · Les 10 postures · Rafales Combos x3 sur chaque drop",
      party_label: "🏆 MODE TOURNOI SALON (CHACUN SON TOUR DEVANT LA CAMÉRA) :",
      p_solo: "👤 SOLO",
      recap_label: "CONFIGURATION ACTIVE :",
      btn_next_step: "ÉTAPE SUIVANTE ➔",
      btn_launch_app: "🔥 S'INSCRIRE EN AVANT-PREMIÈRE",
      vp_tab_video: "🎬 DÉMO CAMÉRA",
      vp_tab_c1: "📸 COULOIR 3D",
      vp_tab_c2: "📸 POSTURE",
      vp_tab_c3: "📸 SPRINT",
      vp_tab_c4: "📸 BOXE",
      deck_kicker: "GAMEPLAY & CHORÉGRAPHIE MUSICALE",
      deck_title: "4 FAMILLES D'ACTIONS SYNCHRONISÉES SUR LE BEAT",
      deck_desc: "Comme dans les meilleurs jeux de rythme en VR, mais sans aucun casque sur la tête : la caméra détecte tes 19 articulations à 60 FPS et adapte les obstacles selon la catégorie du niveau choisi.",
      spec1_tag: "NIVEAUX 01 & 05 · BOXE & RYTHME",
      spec1_title: "Boxe les Monstres, Cubes & Murs Fissurés",
      spec1_desc: "Envoie de vrais directs du poing gauche, du poing droit ou des deux poings simultanément (ou un Super Kick frontal du pied !) pour pulvériser les vilains en carton 2.5D, trancher les cubes rythmés et briser les murs de cristal fissurés sur le beat.",
      spec2_tag: "NIVEAUX 02 & 07 · GYM & POSTURES",
      spec2_title: "Traverse les 10 Murs de Posture Néon",
      spec2_desc: "Reproduis la silhouette découpée dans le mur de verre avant l'impact ! Dès que ta posture dépasse 52% de précision, le mur s'illumine en vert émeraude, déclenche l'auto-propulsion et prend ta Photo Souvenir en pleine action.",
      spec2_p1: "🟢 Easy : 4 Postures",
      spec2_p2: "🔵 Normal : 7 Postures",
      spec2_p3: "🔥 Hard/Expert+ : 10 Postures",
      spec3_tag: "NIVEAUX 03 & 06 · PARKOUR & ÉVITEMENT",
      spec3_title: "Esquive sur 3 Voies, Saute & Grimpe les Étages",
      spec3_desc: "Décale ton corps à gauche, au centre ou à droite pour éviter les piliers, plie les genoux en vrai squat pour passer sous les poutres hautes, et saute pour franchir les barrières basses ou grimper aux étages supérieurs (+1, +2, +3).",
      spec4_tag: "SPRINT INTENSE & MODE FANTÔME",
      spec4_title: "Active le Turbo Run & Bats ton Fantôme 3D",
      spec4_desc: "Si tu t'arrêtes, le couloir ralentit. Mais si tu sprintes à fond en faisant travailler tes bras ET tes jambes très vite en même temps, tu déclenches le 🔥 TURBO RUN (+50% vitesse, points de distance x3) pour dépasser le Fantôme 3D de ton record !",
      spec4_p1: "🏃‍♂️ Bras + Jambes Rapides",
      spec4_p3: "👻 Fantôme 3D du Record",
      poses_label: "LES 10 POSTURES DU JEU DÉTECTÉES PAR LA CAMÉRA :",
      poses_sub: "En difficulté EASY tu commences avec les 4 postures les plus simples, puis tu débloques les 7 et 10 postures en NORMAL, HARD et EXPERT+.",
      poses_autoglide: "⚡ POSTURE MAINTENUE ≥ 52% = AUTO-AVANCE ACTIVE !",
      pose_1: "MAINS EN L'AIR (V)",
      pose_2: "BRAS EN CROIX (T)",
      pose_3: "DOUBLE BICEPS GYM",
      pose_4: "GARDE DE BOXE",
      pose_5: "SQUAT BOUCLIER",
      pose_6: "DISCO DROIT",
      pose_7: "DISCO GAUCHE",
      pose_8: "CROIX PHARAON",
      pose_9: "SUPERMAN GAUCHE",
      pose_10: "SUPERMAN DROIT",
      caps_kicker: "CAPTURES D'ÉCRAN AUTHENTIQUES",
      caps_title: "L'INTERFACE EXACTE SUR iPHONE & iPAD",
      caps_desc: "Découvre le rendu 2.5D cartoon, le radar squelette Apple Vision en direct en bas de l'écran et les retours de score instantanés.",
      cap1_txt: "Cours pour faire avancer le monde et dépasse le Fantôme 3D de ton meilleur score.",
      cap2_txt: "Aligne tes bras dans la découpe néon pour faire exploser le mur et capturer ta photo.",
      cap3_txt: "Enchaîne les obstacles sans faute pour monter à x8 et brûler un maximum de calories.",
      cap4_txt: "Pulvérise les boss et les murs fissurés d'un direct du poing sur les drops de la musique.",
      cap5_txt: "Vue grand angle 16:9 sans bordures sur la télévision du salon via AirPlay.",
      cap6_txt: "Pendant qu'AirPlay diffuse sur la TV, l'iPhone affiche ton squelette Vision à 60 FPS.",
      cap7_txt: "Interface native grand format sur iPad avec mur de posture vert émeraude validé.",
      cap8_txt: "Joue en portrait ou en paysage sur iPad avec détection caméra intégrale à 2 mètres.",
      cap1_title: "1. Couloir 3D & Fantôme du Record",
      cap2_title: "2. Murs de Posture & Photo Souvenir",
      cap3_title: "3. Multiplicateur x8 & Sprint",
      cap4_title: "4. Boxe & Smash Cristal sur le Beat",
      cap5_title: "5. Rendu TV AirPlay 16:9 (1080p · 60 FPS)",
      cap6_title: "6. Cockpit Squelette iPhone (Mode AirPlay)",
      cap7_title: "7. iPad Pro Portrait — Manoir Halloween",
      cap8_title: "8. iPad Pro Paysage — Noël Express",
      cap1_alt: "Course 3D dans Toy Kingdom avec Fantôme du record",
      cap2_alt: "Validation d'un Mur de Posture Double Biceps",
      cap3_alt: "Sprint rapide et multiplicateur x8",
      cap4_alt: "Frappe de cristal au poing en rythme",
      cap5_alt: "Rendu TV AirPlay 16:9 en plein écran",
      cap6_alt: "Cockpit Squelette sur iPhone pendant AirPlay",
      cap7_alt: "BodyRush sur iPad Pro en mode Portrait",
      cap8_alt: "BodyRush sur iPad Pro en mode Paysage",
      cap_prev: "Capture précédente",
      cap_next: "Capture suivante",
      cap_stage: "Diaporama des captures",
      cap_thumbs: "Miniatures des captures",
      tv_kicker: "MODE GRAND ÉCRAN SANS FIL",
      tv_title: "JOUE EN 16:9 SUR TA TV VIA AIRPLAY",
      tv_desc: "Pose ton iPhone ou ton iPad sous ta télévision à 2 mètres de toi et active AirPlay : ta TV affiche le couloir 3D en vrai 16:9 plein écran (1080p / 4K à 60 FPS), tandis que ton iPhone passe automatiquement en mode « 📱 Cockpit Squelette » basse consommation pour suivre tes 19 articulations sans chauffer !",
      party_kicker: "SOIRÉES ENTRE AMIS & EN FAMILLE",
      party_title: "TOURNOI SALON 2 À 4 JOUEURS & PODIUM PHOTO 3D",
      party_desc: "Lance un Tournoi Salon de 2, 3 ou 4 joueurs : chaque joueur passe à son tour devant la caméra sur le même monde et la même musique. À la fin des manches, BodyRush génère le Podium 3D des vainqueurs avec la Photo Souvenir prise sur la meilleure posture de chacun et le Replay Vidéo du sprint final !",
      ps1_t: "Chacun son tour devant la caméra (2 à 4 Joueurs)",
      ps1_d: "Aucun écran scindé illisible : chaque joueur dispose de tout l'espace du salon pour sprinter, sauter et boxer.",
      ps2_t: "Photo Souvenir automatique sur les Murs de Posture",
      ps2_d: "La caméra immortalise automatiquement ta posture la plus spectaculaire pendant la course.",
      ps3_t: "Podium 3D Final, Carte Morpho & Replay Vidéo partageable",
      ps3_d: "Comparez vos scores, vos calories brûlées et partagez la carte souvenir ou le replay vidéo en un tap.",
      pro_kicker: "ACCÈS PRIVÉ & ÉDITIONS BODYRUSH",
      pro_title: "INSCRIS-TOI EN AVANT-PREMIÈRE : TESTE GRATUITEMENT, DÉBLOQUE TOUTE L'ARCADE",
      pro_desc: "Réserve ton accès VIP dès maintenant pour recevoir ton invitation privée TestFlight ou être prévenu en premier à l'ouverture sur l'App Store. La version gratuite inclut le Tutoriel complet (Niv. 00) et le Niveau 01 de Toy Kingdom !",
      free_badge: "INCLUS AU TÉLÉCHARGEMENT",
      free_name: "VERSION GRATUITE",
      free_sub: "pour toujours",
      f_1: "✓ Tutoriel Interactif des 8 Gestes (Niv. 00 · ♾️ Cœurs)",
      f_2: "✓ Monde Toy Kingdom (Niv. 01 Sans Saut/Squat + Teaser PRO 20s)",
      f_3: "✓ Difficultés EASY (~40 obs) & NORMAL (~80 obs + Combos x2)",
      f_4: "✓ Mode Solo, Photo Souvenir & Replay Finish",
      f_5: "🔒 Les 5 autres Mondes 3D & Niveaux 02 à 09 (FIT 5/10 min & Méli-Mélo)",
      f_6: "🔒 Difficultés HARD (~125 obs) & EXPERT+ (~175 obs + Combos x3)",
      btn_dl_free: "🔥 S'inscrire en Avant-Première",
      vip_ribbon: "👑 OFFRE LA PLUS POPULAIRE",
      vip_name: "PASS ANNUEL PRO",
      vip_flex: "ou Pass Mensuel, sans engagement",
      v_1: "✓ Les 6 Mondes 3D Complets (Toy, Sakura, Temple, Cristal, Halloween, Noël)",
      v_2: "✓ Les 10 Niveaux (Modes Sans Saut/Squat, FIT 5/10 min ♾️ Cœurs & Méli-Mélo 6 Mondes)",
      v_3: "✓ Les 4 Difficultés jusqu'à EXPERT+ (~175 événements + Combos x3 sur le beat)",
      v_4: "✓ 26 Musiques Originales avec Détecteur de Drop Musical",
      v_5: "✓ Mode Tournoi Salon 2 à 4 Joueurs & Podium Photo 3D",
      v_6: "✓ Mode TV AirPlay 16:9 Haute Définition",
      btn_start_vip: "🔥 S'inscrire en Avant-Première",
      life_badge: "PAIEMENT UNIQUE · ZÉRO ABONNEMENT",
      life_name: "ÉDITION INFINITY À VIE",
      life_sub: "Paiement unique, sans renouvellement",
      l_1: "✓ Déblocage À Vie de tout BodyRush 3D PRO",
      l_2: "✓ Tous les 6 Mondes, 10 Niveaux (FIT & Méli-Mélo), 4 Difficultés & 26 Musiques",
      l_3: "✓ Tournoi Salon 2 à 4 Joueurs & Podium Photo 3D",
      l_4: "✓ Toutes les futures mises à jour et nouveaux mondes inclus",
      l_5: "✓ Compatible Partage Familial Apple",
      btn_buy_life: "🔥 S'inscrire en Avant-Première",
      priv_badge: "CAMÉRA SUR L'APPAREIL",
      priv_title: "La caméra est analysée sur ton iPhone ou ton iPad",
      priv_desc: "Les 19 articulations sont estimées sur l'appareil avec Apple Vision. Aucune vidéo, photo ou donnée biométrique issue de la caméra n'est envoyée. Des statistiques d'usage pseudonymes partent vers Mixpanel (UE) ; l'adresse IP n'est pas collectée. Les achats passent par Apple StoreKit 2, RevenueCat (identifiant pseudonyme) et Apple AdServices. Le site utilise une mesure d'audience anonyme et sans cookies (GoatCounter) : pages vues, site de provenance et paramètres de campagne, sans profil personnel ni suivi d'un site à l'autre.",
      price_in_app: "Les montants sont affichés dans l'app.",
      btn_offers: "🔥 S'inscrire en Avant-Première",
      priv_btn: "Consulter la Politique de Confidentialité",
      faq_1_q: "Quelle distance faut-il prévoir devant l'iPhone ou l'iPad ?",
      faq_1_a: "Pose ton iPhone ou ton iPad à environ 1,80 m – 2,50 m face à toi (sur une table basse, un meuble TV ou un support). Le guide de cadrage intelligent passe au vert dès que ta silhouette est bien visible.",
      faq_2_q: "Peut-on jouer sans sauter (en appartement) ou sans faire de squats ?",
      faq_2_a: "Oui ! Chaque niveau affiche clairement ses règles de mouvements : les Niveaux 01 & 05 sont 100% Sans Saut ni Squat (Boxe & Esquive), les Niveaux 02 & 07 sont Sans Saut (Postures & Squats), et les Niveaux 03 & 06 sont Sans Squat (Parkour & Sauts). Les Niveaux FIT 05 à 09 offrent en plus des Cœurs Illimités (♾️) sur 5 ou 10 minutes !",
      faq_3_q: "Comment le style Neon Blades change-t-il le nombre d'obstacles ?",
      faq_3_a: "Passer de EASY (~40 événements) à NORMAL (~80 + Combos x2), HARD (~125 + Combos x2/x3) ou EXPERT+ (~175 + Rafales Combos x3) multiplie le nombre d'obstacles et d'enchaînements calés sur les temps forts de la musique !",
      footer_bio: "Conçu et développé en France par Xavier Larrodé. Tous droits réservés © 2026 BodyRush.",
      footer_menu: "Menu du Jeu",
      footer_poses: "10 Postures",
      footer_captures: "Captures",
      footer_tv: "AirPlay TV",
      footer_priv_pol: "Confidentialité",
      footer_terms: "Conditions",
      footer_support: "Support",
      footer_bo: "BO",
      bo_kicker: "🎧 BANDE ORIGINALE · BODYRUSH",
      bo_title: "ÉCOUTER LA BO",
      bo_desc: "Les musiques synthwave de BodyRush s'écoutent aussi hors de l'arcade. Choisis ta plateforme.",
      bo_album_tag: "ALBUM",
      bo_album_meta: "BodyRush · 26 titres · sorti le 28/10/2026",
      bo_apple: "Apple Music",
      bo_deezer: "Deezer",
      bo_spotify: "Spotify · page artiste",
      bo_youtube: "Aussi sur YouTube ↗",
      bo_pill_sr: " — écouter la BO",
      bo_cover_alt: "Pochette de l'album Spooky Mansion Synth — icône BodyRush",
      hud_example: "EXEMPLE",
      hud_example_aria: "Exemple de télémétrie, pas vos statistiques",
      nav_menu: "Menu",
      nav_menu_open: "Ouvrir le menu",
      nav_menu_close: "Fermer le menu",
      lang_aria: "Changer la langue",
      sound_off: "🔇 SON OFF",
      sound_on: "🔊 SON ON",
      sound_aria: "Activer ou couper le son",
      nav_compare: "⚔️ Comparatif TV",
      hero_cmp_cta: "⚔️ BodyRush vs Switch / YouTube / VR ➔",
      cmp_kicker: "⚔️ COMPARATIF SPORT DEVANT LA TV · 2026",
      cmp_title: "POURQUOI BODYRUSH 3D BAT YOUTUBE, LA NINTENDO SWITCH & LA VR",
      cmp_desc: "Zéro console à acheter, zéro manette dans les mains, zéro casque sur le visage : pose ton iPhone ou ton iPad à 2 mètres sous ta TV et profite d'un suivi réel de tes 19 articulations à 60 FPS en 16:9 via AirPlay.",
      cmp_col_crit: "Critère",
      cmp_col_br: "🥇 BodyRush 3D (iPhone/iPad + TV 16:9)",
      cmp_col_yt: "📺 Vidéos Fitness YouTube",
      cmp_col_sw: "🎮 Nintendo Switch (Ring Fit / Boxe)",
      cmp_col_vr: "🥽 Casques VR (Quest / Beat Saber)",
      cmp_r1_k: "Matériel à acheter",
      cmp_r1_br: "✅ Aucun accessoire à acheter (utilise ton iPhone ou iPad + AirPlay TV)",
      cmp_r1_yt: "✅ Aucun accessoire",
      cmp_r1_sw: "❌ Console Switch + Joy-Con / Ring-Con dédiés",
      cmp_r1_vr: "❌ Casque VR lourd + 2 manettes",
      cmp_r2_k: "Suivi réel du corps",
      cmp_r2_br: "✅ 19 articulations du corps à 60 FPS (Apple Vision IA)",
      cmp_r2_yt: "❌ 0 % (vidéo passive, aucune détection)",
      cmp_r2_sw: "⚠️ Gyroscope poignet seul (on peut tricher assis !)",
      cmp_r2_vr: "⚠️ Tête + 2 mains uniquement (pas les jambes)",
      cmp_r3_k: "Interactivité & Propulsion",
      cmp_r3_br: "✅ Courir sur place fait avancer le couloir 3D + Turbo Run x3",
      cmp_r3_yt: "❌ Passif (regarder un coach parler + pubs)",
      cmp_r3_sw: "✅ Jeu vidéo, mais coupé par des dialogues lents",
      cmp_r3_vr: "✅ Rythme musical, mais immobile sur place",
      cmp_r4_k: "Mode Appartement & Cardio Continu",
      cmp_r4_br: "✅ 🚫 Sans Saut / 🚫 Sans Squat + FIT 5 & 10 min (♾️ Cœurs)",
      cmp_r4_yt: "⚠️ Sans score ni défi",
      cmp_r4_sw: "⚠️ Sangle de cuisse qui glisse quand on transpire",
      cmp_r4_vr: "❌ Mousse trempée de sueur sur le visage + buée",
      cmp_r5_k: "Grand Écran TV & Soirées Salon",
      cmp_r5_br: "✅ AirPlay TV 16:9 + Tournoi 2 à 4 Joueurs & Podium Photo 3D",
      cmp_r5_yt: "❌ Solo passif uniquement",
      cmp_r5_sw: "⚠️ Difficile de passer les sangles entre joueurs",
      cmp_r5_vr: "❌ 1 seul casque = 1 joueur isolé du salon",
      cmp_d1_tag: "DUEL #1 · INTERACTIVITÉ CAMÉRA VS VIDÉO PASSIVE",
      cmp_d1_title: "BodyRush 3D vs Vidéos Fitness YouTube",
      cmp_d1_desc: "Sur YouTube, personne ne voit tes mouvements et il est facile d'abandonner au bout de 3 minutes. Dans BodyRush, ta caméra suit tes 19 articulations à 60 FPS : si tu t'arrêtes de courir, le monde ralentit ! Chaque coup de poing brise un monstre sur le beat et les niveaux FIT 5 & 10 min à Cœurs Illimités (♾️) te gardent motivé jusqu'au bout.",
      cmp_d2_tag: "DUEL #2 · 19 ARTICULATIONS LIBRES VS MANETTES SWITCH",
      cmp_d2_title: "BodyRush 3D vs Nintendo Switch (Ring Fit / Fitness Boxing)",
      cmp_d2_desc: "Pas besoin d'acheter une console dédiée ni d'attacher une sangle qui glisse sur la cuisse. Contrairement aux Joy-Con qui ne captent que le poignet, Apple Vision vérifie tout ton corps (3 voies d'esquive, vrais squats, vrais sauts, Super Kicks et 10 murs de posture) en 16:9 sur ta TV via AirPlay !",
      cmp_guides_label: "🌍 GUIDES COMPARATIFS COMPLETS PAR LANGUE :"
    },
    en: {
      brand_sub: "FITNESS · BOXING · POSES",
      hud_streak: "🔥 7D STREAK",
      nav_console: "🕹️ Game Menu",
      nav_moves: "🥊 Moves & 10 Poses",
      nav_captures: "📸 Captures",
      nav_tv: "📺 AirPlay TV & Party",
      nav_pro: "👑 PRO Pass",
      cta_store_short: "🔥 Exclusive Early Access",
      wl_badge: "🔥 EXCLUSIVE EARLY ACCESS & TESTFLIGHT BETA",
      wl_step_1: "PRIORITY INVITE",
      wl_step_2: "PRIORITY INVITE",
      wl_step_3: "✓ VIP REGISTERED",
      wl_q1: "Reserve your priority Early Access spot:",
      wl_btn_ios: "iPhone / iPad (iOS)",
      wl_tag_tf: "✓ TESTFLIGHT",
      wl_btn_other: "🤖 Android / Other",
      wl_ios_selected: " iOS Device (iPhone / iPad) selected",
      wl_other_selected: "🤖 Android / Other device selected",
      wl_change: "Change",
      wl_email_ph: "your.email@example.com",
      wl_submit: "🔥 CLAIM MY VIP ACCESS",
      wl_tf_optin: "✈️ Send me a priority Apple TestFlight invite to play the Beta early",
      wl_micro_priv: "🔒 Zero spam. Only for your private TestFlight Beta invite and priority launch access.",
      wl_ok_title: "You're on the BodyRush.app VIP List!",
      wl_ok_desc: "Your email app opened automatically to confirm your priority iOS TestFlight invite.",
      wl_ok_mailto: "✉️ Direct TestFlight Priority",
      hero_pill_soon: "🔥 EXCLUSIVE EARLY ACCESS · LIMITED VIP SPOTS",
      hero_pill_cam: "✓ 60 FPS VISION CAMERA",
      hero_pill_gear: "ZERO CONTROLLER · ZERO SENSOR",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "PLACE YOUR iPHONE 6 FEET AWAY. YOUR BODY IS THE CONTROLLER.",
      hero_lead: "Run in place to drive the 3D corridor forward, dodge across 3 lanes, jump over traps, squat under beams, punch monsters to the beat of the music and clear all 10 neon posture gates.",
      hero_photo_alt: "A woman jogs in place in her living room, facing a TV showing the Temple corridor, with an iPhone on the TV cabinet tracking her moves.",
      console_header: "COURSE SELECTOR · JUST LIKE IN THE APP",
      console_handsfree: "🥊 Select by touch or throw a punch from 2m away",
      tuto_title: "FIRST TIME? START THE TUTORIAL (LVL 00)",
      tuto_sub: "Place iPhone 2m away & test all 8 moves in 1 minute",
      tuto_btn: "TUTO ➔",
      tab_1_label: "1. 3D WORLD (6)",
      tab_2_label: "2. LEVEL & MUSIC (9)",
      tab_3_label: "3. DIFFICULTY & PARTY",
      step1_heading: "CHOOSE YOUR 3D WORLD:",
      step1_hint: "Click any world to preview its corridor and monsters",
      badge_free: "FREE",
      w_toy_title: "TOY KINGDOM",
      w_toy_sub: "Toy room hallway · Maine Coon Cat & Robot",
      w_sakura_title: "SAKURA ZEN",
      w_sakura_sub: "Pink zen studio · Kitsune & Pink Panda",
      w_red_title: "RED CRYSTAL",
      w_hal_title: "HALLOWEEN",
      w_temple_title: "INDIANA TEMPLE",
      w_temple_sub: "Giant boulder, spikes & Tiki Guardian",
      w_red_sub: "Crystal bunker · Ruby Boxers & Lasers",
      w_hal_sub: "Haunted mansion · Ghosts & Gargoyle Golem",
      w_xmas_title: "SANTA VILLAGE",
      w_xmas_sub: "Snowy village · Snowman & Nutcracker",
      step2_heading: "CHOOSE YOUR LEVEL, DURATION & MOVEMENTS:",
      step2_hint: "3-Min Levels (No-Jump / No-Squat / Full), 5 & 10-Min FIT (♾️ Unlimited Hearts) or 10-Min 6-World Megamix!",
      lvl_1_badge: "LVL 01 · FREE · 3 MIN · 4 ❤️",
      lvl_1_name: "RHYTHM & BOXING",
      lvl_1_desc: "🚫 No Jump or Squat · L/C/R Villains & Rhythm Cubes",
      lvl_2_badge: "LVL 02 · POSTURES · 3 MIN · 4 ❤️",
      lvl_2_name: "GYM & POSTURES",
      lvl_2_desc: "🚫 No Jump · Neon Posture Gates, Squats & Boxing",
      lvl_3_badge: "LVL 03 · PARKOUR · 3 MIN · 4 ❤️",
      lvl_3_name: "PARKOUR STAIRS",
      lvl_3_desc: "🚫 No Squat · 3-Lane Pillars, Jumps & +1/+2/+3 Stairs",
      lvl_4_badge: "LVL 04 · HYPER-MIX · 3 MIN · 4 ❤️",
      lvl_4_name: "FINAL HYPER-MIX",
      lvl_4_desc: "✅ All Movements · Boxing + Postures + Jumps + Squats",
      lvl_5_badge: "LVL 05 · FIT 5 MIN · ♾️ HEARTS · 140 BPM",
      lvl_5_name: "BEATFIT · CLOCKWORK",
      lvl_5_desc: "🚫 No Jump or Squat · 5-Min Cardio Boxing (No Game Over)",
      lvl_6_badge: "LVL 06 · FIT 5 MIN · ♾️ HEARTS · 133 BPM",
      lvl_6_name: "BEATFIT · BLACK ICE",
      lvl_6_desc: "🚫 No Squat · 5-Min Lateral Slalom & Jumps (No Game Over)",
      lvl_7_badge: "LVL 07 · FIT 5 MIN · ♾️ HEARTS · 121 BPM",
      lvl_7_name: "BEATFIT · SHORELINE",
      lvl_7_desc: "🚫 No Jump · 5-Min Postures & Cardio Squats (No Game Over)",
      lvl_8_badge: "LVL 08 · FIT 10 MIN · ♾️ HEARTS · 142 BPM",
      lvl_8_name: "FIT INTENSE · CROWN ARENA",
      lvl_8_desc: "✅ All Movements · 10-Min Endurance Challenge (♾️ Hearts)",
      lvl_9_badge: "LVL 09 · BONUS 10 MIN · ♾️ UNLIMITED HEARTS · 6 WORLDS",
      lvl_9_name: "6-WORLD MEGAMIX ( 10-MIN MARATHON )",
      lvl_9_desc: "✅ All Movements · Travel through Toy Kingdom ➔ Sakura ➔ Temple ➔ Crystal ➔ Halloween ➔ Santa with progressive difficulty!",
      step3_heading: "CHOOSE THE NEON BLADES DIFFICULTY:",
      step3_hint: "Higher difficulties multiply the number of events and chained combos (x2 / x3) synced to musical accents!",
      diff_1_desc: "1 event at a time (0.82x) · 4 easy poses · Best for beginners & kids",
      diff_2_desc: "2x more events (1.00x) · 7 poses · First x2 Combos on the beat",
      diff_3_desc: "3x more events (1.18x) · All 10 poses · Chained x2 & x3 Combos",
      diff_4_desc: "4x more events (1.35x) · All 10 poses · x3 Combo flurries on every drop",
      party_label: "🏆 PARTY TOURNAMENT MODE (PASS & PLAY IN FRONT OF CAMERA):",
      p_solo: "👤 SOLO",
      recap_label: "ACTIVE SETUP:",
      btn_next_step: "NEXT STEP ➔",
      btn_launch_app: "🔥 JOIN EXCLUSIVE EARLY ACCESS",
      vp_tab_video: "🎬 CAMERA DEMO",
      vp_tab_c1: "📸 3D CORRIDOR",
      vp_tab_c2: "📸 POSTURE",
      vp_tab_c3: "📸 SPRINT",
      vp_tab_c4: "📸 BOXING",
      deck_kicker: "GAMEPLAY & MUSICAL CHOREOGRAPHY",
      deck_title: "4 ACTION FAMILIES SYNCED TO THE BEAT",
      deck_desc: "Like the best VR rhythm games, but with zero headset on your face: the camera tracks 19 body joints at 60 FPS and adapts obstacles to your chosen level specialty.",
      spec1_tag: "LEVELS 01 & 05 · BOXING & RHYTHM",
      spec1_title: "Punch Monsters, Cubes & Cracked Crystal Walls",
      spec1_desc: "Throw real left straights, right straights, double-hand smashes or front Super Kicks to shatter 2.5D cardboard villains, slice rhythm cubes and break cracked crystal walls on the beat.",
      spec2_tag: "LEVELS 02 & 07 · GYM & POSTURES",
      spec2_title: "Clear All 10 Neon Posture Gates",
      spec2_desc: "Match the glowing silhouette cut into the glass wall before impact! Once your pose reaches 52% accuracy, the gate lights up emerald green, activates auto-glide and snaps your Action Souvenir Photo.",
      spec2_p1: "🟢 Easy: 4 Postures",
      spec2_p2: "🔵 Normal: 7 Postures",
      spec2_p3: "🔥 Hard/Expert+: 10 Postures",
      spec3_tag: "LEVELS 03 & 06 · PARKOUR & DODGING",
      spec3_title: "Dodge Across 3 Lanes, Jump & Climb Floors",
      spec3_desc: "Step left, center or right to dodge side pillars, drop into a real squat to duck under overhead beams, and jump to clear low hurdles or climb 3D stairs (+1, +2, +3).",
      spec4_tag: "FAST SPRINT & GHOST MODE",
      spec4_title: "Trigger Turbo Run & Beat Your 3D Ghost",
      spec4_desc: "Stop moving and the corridor slows down. Pump BOTH arms and BOTH legs fast simultaneously to trigger 🔥 TURBO RUN (+50% speed, 3x distance points) and overtake your personal best 3D Ghost!",
      spec4_p1: "🏃‍♂️ Fast Arms + Legs",
      spec4_p3: "👻 3D Ghost of Your Best Score",
      poses_label: "ALL 10 CAMERA-TRACKED BODY POSTURES:",
      poses_sub: "Start with 4 intuitive postures in EASY, then unlock 7 and all 10 postures in NORMAL, HARD and EXPERT+.",
      poses_autoglide: "⚡ POSE HELD ≥ 52% = AUTO-GLIDE ACTIVE!",
      pose_1: "HANDS UP (V-POSE)",
      pose_2: "T-POSE ARMS WIDE",
      pose_3: "DOUBLE BICEPS FLEX",
      pose_4: "BOXING GUARD",
      pose_5: "POWER SQUAT SHIELD",
      pose_6: "DISCO RIGHT",
      pose_7: "DISCO LEFT",
      pose_8: "PHARAOH X-CROSS",
      pose_9: "SUPERMAN LEFT",
      pose_10: "SUPERMAN RIGHT",
      caps_kicker: "AUTHENTIC IN-GAME CAPTURES",
      caps_title: "THE EXACT INTERFACE ON iPHONE & iPAD",
      caps_desc: "See the 2.5D cartoon rendering, the live Apple Vision skeleton radar at the bottom of the screen and instant score callouts.",
      cap1_txt: "Run to drive the corridor forward and overtake the 3D Ghost of your best score.",
      cap2_txt: "Align your arms inside the neon cutout to shatter the gate and snap your souvenir photo.",
      cap3_txt: "Chain obstacles flawlessly to reach the x8 multiplier and burn maximum calories.",
      cap4_txt: "Smash bosses and cracked crystal walls with a straight punch right on musical bass drops.",
      cap5_txt: "True widescreen 16:9 borderless view on your living room TV via AirPlay.",
      cap6_txt: "While AirPlay streams to the TV, your iPhone displays your live 60 FPS Vision skeleton.",
      cap7_txt: "Native large-screen iPad Pro portrait interface with emerald green posture gate cleared.",
      cap8_txt: "Play in portrait or landscape on iPad with full-body camera tracking from 6 feet away.",
      cap1_title: "1. 3D Corridor & Record Ghost",
      cap2_title: "2. Posture Gates & Souvenir Photo",
      cap3_title: "3. x8 Multiplier & Sprint",
      cap4_title: "4. Boxing & Crystal Smash on the Beat",
      cap5_title: "5. AirPlay TV 16:9 (1080p · 60 FPS)",
      cap6_title: "6. iPhone Skeleton Cockpit (AirPlay Mode)",
      cap7_title: "7. iPad Pro Portrait — Halloween Mansion",
      cap8_title: "8. iPad Pro Landscape — Santa Village",
      cap1_alt: "3D run in Toy Kingdom with the record Ghost",
      cap2_alt: "Double Biceps posture gate cleared",
      cap3_alt: "Fast sprint and x8 multiplier",
      cap4_alt: "Crystal punch on the beat",
      cap5_alt: "Fullscreen AirPlay TV 16:9 render",
      cap6_alt: "Skeleton cockpit on iPhone during AirPlay",
      cap7_alt: "BodyRush on iPad Pro in portrait",
      cap8_alt: "BodyRush on iPad Pro in landscape",
      cap_prev: "Previous capture",
      cap_next: "Next capture",
      cap_stage: "Capture slideshow",
      cap_thumbs: "Capture thumbnails",
      tv_kicker: "WIRELESS BIG SCREEN MODE",
      tv_title: "PLAY IN 16:9 ON YOUR TV VIA AIRPLAY",
      tv_desc: "Place your iPhone or iPad below your TV 6 feet away and turn on AirPlay: your TV renders the 3D corridor in true 16:9 fullscreen (1080p / 4K at 60 FPS), while your iPhone automatically switches to the low-power '📱 Skeleton Cockpit' view!",
      party_kicker: "GAME NIGHTS WITH FRIENDS & FAMILY",
      party_title: "2-TO-4 PLAYER PARTY TOURNAMENT & 3D PHOTO PODIUM",
      party_desc: "Start a 2, 3 or 4 player Party Tournament: each player takes turns in front of the camera on the same world and music track. At the end, BodyRush reveals the 3D Winners Podium with each player's best posture Souvenir Photo and Finish Video Replay!",
      ps1_t: "Pass & Play in front of the camera (2 to 4 Players)",
      ps1_d: "No cramped split-screen: every player gets the full living-room space to sprint, jump and punch.",
      ps2_t: "Automatic Souvenir Photo on Posture Gates",
      ps2_d: "The camera automatically snaps your best posture moment during the run.",
      ps3_t: "Final 3D Podium, Morpho Card & Shareable Video Replay",
      ps3_d: "Compare scores and calories burned, and share the souvenir card or finish video replay in one tap.",
      pro_kicker: "PRIVATE ACCESS & BODYRUSH EDITIONS",
      pro_title: "JOIN EARLY ACCESS: TRY FOR FREE, UNLOCK THE FULL ARCADE",
      pro_desc: "Reserve your VIP spot now to get a private TestFlight invite or priority notification at App Store launch. The free edition includes the full 8-Move Tutorial (Lvl 00) and Toy Kingdom Level 01!",
      free_badge: "INCLUDED FOR FREE",
      free_name: "FREE EDITION",
      free_sub: "forever",
      f_1: "✓ Interactive 8-Move Gesture Tutorial (Lvl 00 · ♾️ Hearts)",
      f_2: "✓ Toy Kingdom World (Lvl 01 No-Jump/Squat + 20s PRO Teaser)",
      f_3: "✓ EASY (~40 obs) & NORMAL (~80 obs + x2 Combos) Difficulties",
      f_4: "✓ Solo Mode, Souvenir Photo & Finish Replay",
      f_5: "🔒 Remaining 5 3D Worlds & Levels 02 to 09 (5/10-Min FIT & Megamix)",
      f_6: "🔒 HARD (~125 obs) & EXPERT+ (~175 obs + x3 Combos) Difficulties",
      btn_dl_free: "🔥 Join Exclusive Early Access",
      vip_ribbon: "👑 MOST POPULAR",
      vip_name: "ANNUAL PRO PASS",
      vip_flex: "or a monthly pass, no commitment",
      v_1: "✓ All 6 Complete 3D Worlds (Toy, Sakura, Temple, Crystal, Halloween, Santa)",
      v_2: "✓ All 10 Custom Levels (No-Jump/Squat, 5/10-Min FIT ♾️ Hearts & 6-World Megamix)",
      v_3: "✓ All 4 Difficulties up to EXPERT+ (~175 events + x3 Combos on the beat)",
      v_4: "✓ 26 Original Tracks with Live Bass-Drop Detector",
      v_5: "✓ 2-to-4 Player Party Tournament & 3D Photo Podium",
      v_6: "✓ High-Definition 16:9 AirPlay TV Mode",
      btn_start_vip: "🔥 Join Exclusive Early Access",
      life_badge: "ONE-TIME PAYMENT · ZERO SUBSCRIPTION",
      life_name: "INFINITY LIFETIME EDITION",
      life_sub: "One-time payment, no renewal",
      l_1: "✓ Lifetime Unlock of all BodyRush 3D PRO content",
      l_2: "✓ All 6 Worlds, 10 Levels (FIT & Megamix), 4 Difficulties & 26 Tracks",
      l_3: "✓ 2-to-4 Player Party Tournament & 3D Photo Podium",
      l_4: "✓ All future updates and new worlds included",
      l_5: "✓ Apple Family Sharing supported",
      btn_buy_life: "🔥 Join Exclusive Early Access",
      priv_badge: "ON-DEVICE CAMERA",
      priv_title: "The camera is analyzed on your iPhone or iPad",
      priv_desc: "The 19 joints are estimated on the device with Apple Vision. No camera video, photo, or biometric data is uploaded. Pseudonymous usage statistics go to Mixpanel (EU); the IP address is not collected. Purchases go through Apple StoreKit 2, RevenueCat (a pseudonymous identifier), and Apple AdServices. The site uses anonymous, cookie-free audience measurement (GoatCounter): page views, the referring site and campaign parameters, with no personal profile and no tracking across sites.",
      price_in_app: "Amounts are shown in the app.",
      btn_offers: "🔥 Join Exclusive Early Access",
      priv_btn: "Read the Privacy Policy",
      faq_1_q: "How much space do I need in front of my iPhone or iPad?",
      faq_1_a: "Place your iPhone or iPad about 6 to 8 feet (1.8m – 2.5m) in front of you on a coffee table, TV stand or tripod. The smart framing guide turns green as soon as your full body is visible.",
      faq_2_q: "Can I play without jumping (in an apartment) or without squats?",
      faq_2_a: "Yes! Every level explicitly displays its movement rules: Levels 01 & 05 are 100% No-Jump & No-Squat (Boxing & Dodging), Levels 02 & 07 are No-Jump (Postures & Squats), and Levels 03 & 06 are No-Squat (Parkour & Jumps). Plus, FIT Levels 05 to 09 feature Unlimited Hearts (♾️) for uninterrupted 5 or 10-minute cardio workouts!",
      faq_3_q: "How does the Neon Blades style change the number of obstacles?",
      faq_3_a: "Moving from EASY (~40 events) to NORMAL (~80 + x2 Combos), HARD (~125 + x2/x3 Combos) or EXPERT+ (~175 + x3 Combo flurries) multiplies the density of obstacles and chained actions synced to musical accents!",
      footer_bio: "Designed and built in France by Xavier Larrodé. All rights reserved © 2026 BodyRush.",
      footer_menu: "Game menu",
      footer_poses: "10 Postures",
      footer_captures: "Captures",
      footer_tv: "AirPlay TV",
      footer_priv_pol: "Privacy",
      footer_terms: "Terms",
      footer_support: "Support",
      footer_bo: "Soundtrack",
      bo_kicker: "🎧 ORIGINAL SOUNDTRACK · BODYRUSH",
      bo_title: "LISTEN TO THE SOUNDTRACK",
      bo_desc: "BodyRush's synthwave tracks also play outside the arcade. Pick your platform.",
      bo_album_tag: "ALBUM",
      bo_album_meta: "BodyRush · 26 tracks · released 10/28/2026",
      bo_apple: "Apple Music",
      bo_deezer: "Deezer",
      bo_spotify: "Spotify · artist page",
      bo_youtube: "Also on YouTube ↗",
      bo_pill_sr: " — listen to the soundtrack",
      bo_cover_alt: "Spooky Mansion Synth album cover — BodyRush icon",
      hud_example: "EXAMPLE",
      hud_example_aria: "Sample telemetry, not your stats",
      nav_menu: "Menu",
      nav_menu_open: "Open menu",
      nav_menu_close: "Close menu",
      lang_aria: "Change language",
      sound_off: "🔇 SOUND OFF",
      sound_on: "🔊 SOUND ON",
      sound_aria: "Turn sound on or off",
      nav_compare: "⚔️ TV Comparison",
      hero_cmp_cta: "⚔️ BodyRush vs Switch / YouTube / VR ➔",
      cmp_kicker: "⚔️ LIVING-ROOM TV WORKOUT COMPARISON · 2026",
      cmp_title: "WHY BODYRUSH 3D BEATS YOUTUBE, NINTENDO SWITCH & VR",
      cmp_desc: "Zero console to buy, zero controllers in your hands, zero headset on your face: place your iPhone or iPad 6 feet away below your TV and get real-time 60 FPS tracking of all 19 body joints in 16:9 via AirPlay.",
      cmp_col_crit: "Feature",
      cmp_col_br: "🥇 BodyRush 3D (iPhone/iPad + 16:9 TV)",
      cmp_col_yt: "📺 YouTube Workout Videos",
      cmp_col_sw: "🎮 Nintendo Switch (Ring Fit / Boxing)",
      cmp_col_vr: "🥽 VR Headsets (Quest / Beat Saber)",
      cmp_r1_k: "Extra Hardware Required",
      cmp_r1_br: "✅ Zero extra gear (uses your iPhone or iPad + AirPlay TV)",
      cmp_r1_yt: "✅ Zero extra gear",
      cmp_r1_sw: "❌ Switch console + Joy-Con / Ring-Con accessories",
      cmp_r1_vr: "❌ Heavy VR headset + 2 controllers",
      cmp_r2_k: "Real Full-Body Tracking",
      cmp_r2_br: "✅ 19 body joints at 60 FPS (Apple Vision AI)",
      cmp_r2_yt: "❌ 0% (passive video, zero motion detection)",
      cmp_r2_sw: "⚠️ Wrist gyroscope only (easy to fake sitting down!)",
      cmp_r2_vr: "⚠️ Head + 2 hands only (no leg tracking)",
      cmp_r3_k: "Interactivity & Locomotion",
      cmp_r3_br: "✅ Running in place drives the 3D corridor + 3x Turbo Run",
      cmp_r3_yt: "❌ Passive (watching an instructor talk + ads)",
      cmp_r3_sw: "✅ Video game, but slowed down by long RPG menus",
      cmp_r3_vr: "✅ Rhythm action, but standing stationary",
      cmp_r4_k: "Apartment Mode & Non-Stop Cardio",
      cmp_r4_br: "✅ 🚫 No-Jump / 🚫 No-Squat + 5 & 10-Min FIT (♾️ Hearts)",
      cmp_r4_yt: "⚠️ No score, no combo feedback",
      cmp_r4_sw: "⚠️ Leg strap slips down when sweating",
      cmp_r4_vr: "❌ Sweaty foam on face + fogged lenses",
      cmp_r5_k: "Big-Screen TV & Party Night",
      cmp_r5_br: "✅ 16:9 AirPlay TV + 2–4 Player Pass & Play 3D Photo Podium",
      cmp_r5_yt: "❌ Solo passive watching only",
      cmp_r5_sw: "⚠️ Annoying to swap leg straps between players",
      cmp_r5_vr: "❌ 1 headset = 1 isolated player",
      cmp_d1_tag: "DUEL #1 · CAMERA INTERACTIVITY VS PASSIVE VIDEO",
      cmp_d1_title: "BodyRush 3D vs YouTube Workout Videos",
      cmp_d1_desc: "On YouTube, nobody sees your moves and it's easy to quit after 3 minutes. In BodyRush, your camera tracks 19 body joints at 60 FPS: if you stop running, the 3D world slows down! Every punch shatters a monster on the beat and 5 & 10-minute Unlimited-Hearts (♾️) FIT modes keep you hooked.",
      cmp_d2_tag: "DUEL #2 · 19 FREE JOINTS VS SWITCH CONTROLLERS",
      cmp_d2_title: "BodyRush 3D vs Nintendo Switch (Ring Fit / Fitness Boxing)",
      cmp_d2_desc: "No need to buy a dedicated console or strap a slipping band to your thigh. Unlike Joy-Cons that only sense wrist shakes, Apple Vision verifies your entire body (3-lane dodging, real squats, real jumps, Super Kicks and 10 posture gates) in 16:9 on your TV via AirPlay!",
      cmp_guides_label: "🌍 FULL COMPARISON GUIDES BY LANGUAGE:"
    },
    es: {
      brand_sub: "FITNESS · BOXEO · POSTURAS",
      hud_streak: "🔥 RACHA 7D",
      nav_console: "🕹️ Menú del Juego",
      nav_moves: "🥊 Gestos y 10 Posturas",
      nav_captures: "📸 Capturas",
      nav_tv: "📺 AirPlay TV y Salón",
      nav_compare: "⚔️ Comparativa TV",
      nav_pro: "👑 Pase PRO",
      hero_cmp_cta: "⚔️ BodyRush vs Switch / YouTube / VR ➔",
      cta_store_short: "🔥 Acceso Anticipado VIP",
      wl_badge: "🔥 ACCESO ANTICIPADO PRIVADO Y BETA TESTFLIGHT",
      wl_step_1: "INVITACIÓN PRIORITARIA",
      wl_step_2: "INVITACIÓN PRIORITARIA",
      wl_step_3: "✓ INSCRITO EN VIP",
      wl_btn_ios: "iPhone / iPad (iOS)",
      wl_tag_tf: "✓ TESTFLIGHT",
      wl_btn_other: "🤖 Android / Otro",
      wl_email_ph: "tu.email@ejemplo.com",
      wl_submit: "🔥 RESERVAR MI ACCESO VIP",
      wl_micro_priv: "🔒 Cero spam. Solo para tu invitación privada a TestFlight y aviso de lanzamiento.",
      wl_ok_title: "¡Estás en la lista VIP de BodyRush.app!",
      wl_ok_desc: "Tu cliente de correo se ha abierto automáticamente para confirmar tu prioridad en TestFlight iOS.",
      hero_pill_soon: "🔥 ACCESO ANTICIPADO · PLAZAS VIP LIMITADAS",
      hero_pill_cam: "✓ CÁMARA VISION 60 FPS",
      hero_pill_gear: "CERO MANDOS · CERO SENSORES",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "COLOCA TU iPHONE A 2 METROS. TU CUERPO ES EL MANDO.",
      hero_lead: "Corre en el sitio para avanzar por el pasillo 3D, esquiva en 3 carriles, salta trampas, haz sentadillas, boxea monstruos al ritmo de la música y atraviesa los 10 muros de postura.",
      console_header: "SELECTOR DE CARRERA · COMO EN LA APP",
      console_handsfree: "🥊 Selección táctil o lanzando un puñetazo a 2m",
      tuto_title: "¿PRIMERA VEZ? INICIA EL TUTORIAL (NIV. 00)",
      tuto_sub: "Coloca el iPhone a 2m y prueba los 8 gestos en 1 minuto",
      tuto_btn: "TUTO ➔",
      tab_1_label: "1. MUNDO 3D (6)",
      tab_2_label: "2. NIVEL Y MÚSICA (9)",
      tab_3_label: "3. DIFICULTAD Y SALÓN",
      step1_heading: "ELIGE TU MUNDO 3D:",
      step1_hint: "Toca un mundo para ver su pasillo y sus monstruos",
      badge_free: "GRATIS",
      step2_heading: "ELIGE NIVEL, DURACIÓN Y MOVIMIENTOS:",
      step2_hint: "Niveles de 3 min (Sin Salto / Sin Sentadilla / Completo), Cardio FIT 5 y 10 min (♾️ Corazones Ilimitados) o Maratón 6 Mundos.",
      step3_heading: "ELIGE LA DIFICULTAD NEON BLADES:",
      step3_hint: "¡A mayor dificultad, más obstáculos y combos encadenados (x2 / x3) al ritmo de la música!",
      party_label: "🏆 MODO TORNEO SALÓN (POR TURNOS FRENTE A LA CÁMARA):",
      p_solo: "👤 SOLO",
      recap_label: "CONFIGURACIÓN ACTIVA:",
      btn_next_step: "SIGUIENTE PASO ➔",
      btn_launch_app: "🔥 APUNTARSE AL ACCESO ANTICIPADO",
      deck_kicker: "GAMEPLAY Y COREOGRAFÍA MUSICAL",
      deck_title: "4 FAMILIAS DE ACCIONES SINCRONIZADAS CON EL BEAT",
      deck_desc: "Como los mejores juegos de ritmo en VR, pero sin casco en la cabeza: la cámara sigue tus 19 articulaciones a 60 FPS en tiempo real.",
      caps_kicker: "CAPTURAS REALES DEL JUEGO",
      caps_title: "LA INTERFAZ EXACTA EN iPHONE Y iPAD",
      caps_desc: "Descubre el renderizado 2.5D cartoon, el radar de esqueleto Apple Vision en vivo y los multiplicadores x8.",
      tv_kicker: "MODO PANTALLA GRANDE INALÁMBRICO",
      tv_title: "JUEGA EN 16:9 EN TU TV VÍA AIRPLAY",
      tv_desc: "Coloca tu iPhone o iPad bajo tu televisor a 2 metros y activa AirPlay: tu TV muestra el pasillo 3D en 16:9 pantalla completa a 60 FPS mientras tu iPhone pasa al modo '📱 Cockpit Esqueleto' de bajo consumo.",
      party_kicker: "NOCHES DE JUEGO CON AMIGOS Y FAMILIA",
      party_title: "TORNEO SALÓN DE 2 A 4 JUGADORES Y PODIO FOTO 3D",
      party_desc: "Inicia un Torneo Salón de 2 a 4 jugadores por turnos frente a la cámara. Al final, BodyRush muestra el Podio 3D con la Foto Recuerdo y el Vídeo Replay.",
      cmp_kicker: "⚔️ COMPARATIVA DEPORTE FRENTE A LA TV · 2026",
      cmp_title: "POR QUÉ BODYRUSH 3D SUPERA A YOUTUBE, NINTENDO SWITCH Y LA VR",
      cmp_desc: "Cero consolas que comprar, cero mandos en las manos, cero cascos en la cara: coloca tu iPhone o iPad a 2 metros bajo tu TV y disfruta de seguimiento real de 19 articulaciones a 60 FPS en 16:9 por AirPlay.",
      cmp_col_crit: "Criterio",
      cmp_col_br: "🥇 BodyRush 3D (iPhone/iPad + TV 16:9)",
      cmp_col_yt: "📺 Vídeos Fitness YouTube",
      cmp_col_sw: "🎮 Nintendo Switch (Ring Fit / Boxeo)",
      cmp_col_vr: "🥽 Cascos VR (Quest / Beat Saber)",
      cmp_r1_k: "Hardware extra necesario",
      cmp_r1_br: "✅ Ninguno (usa tu iPhone o iPad + AirPlay TV)",
      cmp_r1_yt: "✅ Ninguno",
      cmp_r1_sw: "❌ Consola Switch + Joy-Con / Ring-Con",
      cmp_r1_vr: "❌ Casco VR pesado + 2 mandos",
      cmp_r2_k: "Seguimiento corporal real",
      cmp_r2_br: "✅ 19 articulaciones a 60 FPS (IA Apple Vision)",
      cmp_r2_yt: "❌ 0 % (vídeo pasivo, sin detección)",
      cmp_r2_sw: "⚠️ Solo giroscopio de muñeca (¡se puede engañar sentado!)",
      cmp_r2_vr: "⚠️ Solo cabeza y 2 manos (sin piernas)",
      cmp_r3_k: "Interactividad y avance",
      cmp_r3_br: "✅ Correr en el sitio mueve el pasillo 3D + Turbo Run x3",
      cmp_r3_yt: "❌ Pasivo (mirar a un entrenador + anuncios)",
      cmp_r3_sw: "✅ Videojuego, pero cortado por menús lentos",
      cmp_r3_vr: "✅ Ritmo musical, pero de pie sin desplazarse",
      cmp_r4_k: "Modo Piso y Cardio Continuo",
      cmp_r4_br: "✅ 🚫 Sin Salto / 🚫 Sin Sentadilla + FIT 5 y 10 min (♾️ Vidas)",
      cmp_r4_yt: "⚠️ Sin puntuación ni desafíos",
      cmp_r4_sw: "⚠️ Cinta del muslo que resbala al sudar",
      cmp_r4_vr: "❌ Espuma empapada de sudor en la cara + vaho",
      cmp_r5_k: "Pantalla Grande TV y Fiesta en Casa",
      cmp_r5_br: "✅ AirPlay TV 16:9 + Torneo 2 a 4 Jugadores y Podio Foto 3D",
      cmp_r5_yt: "❌ Solo pasivo en solitario",
      cmp_r5_sw: "⚠️ Incómodo cambiar las correas entre jugadores",
      cmp_r5_vr: "❌ 1 solo casco = 1 jugador aislado",
      cmp_d1_tag: "DUELO #1 · CÁMARA INTERACTIVA VS VÍDEO PASIVO",
      cmp_d1_title: "BodyRush 3D vs Vídeos Fitness de YouTube",
      cmp_d1_desc: "En YouTube nadie evalúa tus movimientos. En BodyRush tu cámara analiza 19 articulaciones a 60 FPS: ¡si dejas de correr, el mundo 3D se frena! Cada puñetazo destruye monstruos al ritmo de la música y los modos FIT de 5 y 10 min con Vidas Ilimitadas (♾️) mantienen tu motivación al máximo.",
      cmp_d2_tag: "DUELO #2 · 19 ARTICULACIONES LIBRES VS MANDOS SWITCH",
      cmp_d2_title: "BodyRush 3D vs Nintendo Switch (Ring Fit / Fitness Boxing)",
      cmp_d2_desc: "Sin comprar consolas ni atar correas que se resbalan en la pierna. A diferencia de los Joy-Con que solo detectan la muñeca, Apple Vision valida todo tu cuerpo (3 carriles, sentadillas reales, saltos, Super Kicks y 10 muros de postura) en 16:9 en tu TV vía AirPlay.",
      cmp_guides_label: "🌍 GUÍAS COMPARATIVAS COMPLETAS POR IDIOMA:",
      pro_kicker: "ACCESO PRIVADO Y EDICIONES BODYRUSH",
      pro_title: "APÚNTATE AL ACCESO ANTICIPADO: PRUEBA GRATIS, DESBLOQUEA EL ARCADE",
      price_in_app: "Los importes se muestran en la app.",
      btn_offers: "🔥 Apuntarse al Acceso Anticipado",
      priv_badge: "CÁMARA EN EL DISPOSITIVO",
      priv_title: "La cámara se analiza en tu iPhone o iPad",
      priv_desc: "Las 19 articulaciones se estiman en el dispositivo con Apple Vision. Ningún vídeo, foto ni dato biométrico sale de tu dispositivo.",
      priv_btn: "Ver la Política de Privacidad",
      footer_bio: "Diseñado y desarrollado en Francia por Xavier Larrodé. Todos los derechos reservados © 2026 BodyRush."
    },
    de: {
      brand_sub: "FITNESS · BOXEN · POSEN",
      hud_streak: "🔥 7T SERIE",
      nav_console: "🕹️ Spielmenü",
      nav_moves: "🥊 Gesten & 10 Posen",
      nav_captures: "📸 Screenshots",
      nav_tv: "📺 AirPlay TV & Party",
      nav_compare: "⚔️ TV-Vergleich",
      nav_pro: "👑 PRO-Pass",
      hero_cmp_cta: "⚔️ BodyRush vs Switch / YouTube / VR ➔",
      cta_store_short: "🔥 Exklusiver Vorabzugang",
      wl_badge: "🔥 EXKLUSIVER VORABZUGANG & TESTFLIGHT BETA",
      wl_step_1: "PRIORITÄTS-EINLADUNG",
      wl_step_2: "PRIORITÄTS-EINLADUNG",
      wl_step_3: "✓ VIP REGISTRIERT",
      wl_btn_ios: "iPhone / iPad (iOS)",
      wl_tag_tf: "✓ TESTFLIGHT",
      wl_btn_other: "🤖 Android / Andere",
      wl_email_ph: "deine.email@beispiel.de",
      wl_submit: "🔥 VIP-ZUGANG SICHERN",
      wl_micro_priv: "🔒 Kein Spam. Nur für deine private TestFlight-Einladung und den Start-Hinweis.",
      wl_ok_title: "Du stehst auf der BodyRush.app VIP-Liste!",
      wl_ok_desc: "Dein E-Mail-Programm hat sich geöffnet, um deine iOS-TestFlight-Priorität zu bestätigen.",
      hero_pill_soon: "🔥 VORABZUGANG · LIMITIERTE VIP-PLÄTZE",
      hero_pill_cam: "✓ 60 FPS VISION-KAMERA",
      hero_pill_gear: "NULL CONTROLLER · NULL SENSOREN",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "STELL DEIN iPHONE 2 METER WEIT WEG. DEIN KÖRPER IST DER CONTROLLER.",
      hero_lead: "Laufe auf der Stelle, um durch den 3D-Korridor zu sprinten, weiche auf 3 Spuren aus, springe über Fallen, mache Kniebeugen, boxe Monster im Takt der Musik und durchquere alle 10 Neon-Posenwände.",
      tv_kicker: "KABELLOSER GROSSILD-MODUS",
      tv_title: "SPIELE IN 16:9 AUF DEINEM TV ÜBER AIRPLAY",
      tv_desc: "Stelle dein iPhone oder iPad 2 Meter entfernt unter deinen Fernseher und aktiviere AirPlay: Dein TV zeigt den 3D-Korridor in echtem 16:9 Vollbild (60 FPS), während dein iPhone in den stromsparenden '📱 Skelett-Cockpit'-Modus wechselt.",
      party_kicker: "SPIELABENDE MIT FREUNDEN & FAMILIE",
      party_title: "2-BIS-4-SPIELER WOHNZIMMER-TURNIER & 3D-FOTOPODIUM",
      party_desc: "Startet ein Wohnzimmer-Turnier für 2 bis 4 Spieler nacheinander vor der Kamera – inklusive 3D-Siegerpodium, Erinnerungsfoto und Video-Replay!",
      cmp_kicker: "⚔️ TV-FITNESS-VERGLEICH · 2026",
      cmp_title: "WARUM BODYRUSH 3D YOUTUBE, NINTENDO SWITCH & VR SCHLÄGT",
      cmp_desc: "Keine Konsole kaufen, keine Controller in der Hand, kein VR-Headset im Gesicht: Stelle dein iPhone oder iPad 2 Meter entfernt unter deinen TV und erlebe 60 FPS Ganzkörper-Tracking (19 Gelenke) in 16:9 über AirPlay.",
      cmp_col_crit: "Kriterium",
      cmp_col_br: "🥇 BodyRush 3D (iPhone/iPad + 16:9 TV)",
      cmp_col_yt: "📺 YouTube-Fitnessvideos",
      cmp_col_sw: "🎮 Nintendo Switch (Ring Fit / Boxen)",
      cmp_col_vr: "🥽 VR-Headsets (Quest / Beat Saber)",
      cmp_r1_k: "Zusätzliche Hardware nötig",
      cmp_r1_br: "✅ Keine (nutzt dein iPhone oder iPad + AirPlay TV)",
      cmp_r1_yt: "✅ Keine",
      cmp_r1_sw: "❌ Switch-Konsole + Joy-Con / Ring-Con",
      cmp_r1_vr: "❌ Schweres VR-Headset + 2 Controller",
      cmp_r2_k: "Echtes Ganzkörper-Tracking",
      cmp_r2_br: "✅ 19 Körpergelenke mit 60 FPS (Apple Vision KI)",
      cmp_r2_yt: "❌ 0 % (passives Video, keine Erkennung)",
      cmp_r2_sw: "⚠️ Nur Handgelenk-Gyroskop (Schummeln im Sitzen möglich!)",
      cmp_r2_vr: "⚠️ Nur Kopf + 2 Hände (keine Bein-Erkennung)",
      cmp_r3_k: "Interaktivität & Vortrieb",
      cmp_r3_br: "✅ Laufen auf der Stelle bewegt den 3D-Korridor + 3x Turbo Run",
      cmp_r3_yt: "❌ Passiv (Trainer zuschauen + Werbung)",
      cmp_r3_sw: "✅ Videospiel, aber durch lange Menüs unterbrochen",
      cmp_r3_vr: "✅ Musik-Rhythmus, aber stehend auf der Stelle",
      cmp_r4_k: "Wohnungs-Modus & Non-Stop-Cardio",
      cmp_r4_br: "✅ 🚫 Ohne Sprung / 🚫 Ohne Squat + 5 & 10 Min FIT (♾️ Herzen)",
      cmp_r4_yt: "⚠️ Keine Punkte, kein Feedback",
      cmp_r4_sw: "⚠️ Bein-Gurt verrutscht beim Schwitzen",
      cmp_r4_vr: "❌ Verschwitztes Polster im Gesicht + beschlagene Linsen",
      cmp_r5_k: "Großer TV-Bildschirm & Party-Modus",
      cmp_r5_br: "✅ 16:9 AirPlay TV + 2–4 Spieler Turnier & 3D-Fotopodium",
      cmp_r5_yt: "❌ Nur passiv allein",
      cmp_r5_sw: "⚠️ Mühsames Wechseln der Gurte zwischen Spielern",
      cmp_r5_vr: "❌ 1 Headset = 1 isolierter Spieler",
      cmp_d1_tag: "DUELL #1 · KAMERA-INTERAKTIVITÄT VS PASSIVES VIDEO",
      cmp_d1_title: "BodyRush 3D vs YouTube-Fitnessvideos",
      cmp_d1_desc: "Auf YouTube sieht niemand deine Bewegungen. In BodyRush verfolgt die Kamera 19 Gelenke mit 60 FPS: Hörst du auf zu laufen, wird der 3D-Korridor langsamer! Jeder Schlag trifft Monster im Takt und die 5- & 10-Minuten-FIT-Modi mit unbegrenzten Herzen (♾️) halten dich motiviert.",
      cmp_d2_tag: "DUELL #2 · 19 FREIE GELENKE VS SWITCH-CONTROLLER",
      cmp_d2_title: "BodyRush 3D vs Nintendo Switch (Ring Fit / Fitness Boxing)",
      cmp_d2_desc: "Keine zusätzliche Konsole und kein rutschender Oberschenkelgurt nötig. Im Gegensatz zu Joy-Cons prüft Apple Vision deinen gesamten Körper (3 Spuren, echte Squats, echte Sprünge, Super Kicks und 10 Posenwände) in 16:9 auf deinem TV via AirPlay!",
      cmp_guides_label: "🌍 VOLLSTÄNDIGE VERGLEICHS-GUIDES NACH SPRACHE:",
      price_in_app: "Die Preise werden in der App angezeigt.",
      btn_offers: "🔥 Exklusiven Vorabzugang sichern",
      priv_badge: "ON-DEVICE-KAMERA",
      priv_title: "Die Kamera wird direkt auf deinem iPhone oder iPad analysiert",
      priv_btn: "Datenschutzerklärung lesen"
    },
    ja: {
      brand_sub: "フィットネス・ボクシング・ポーズ",
      hud_streak: "🔥 7日連続",
      nav_console: "🕹️ ゲームメニュー",
      nav_moves: "🥊 アクション＆10ポーズ",
      nav_captures: "📸 スクリーンショット",
      nav_tv: "📺 AirPlayテレビ＆パーティー",
      nav_compare: "⚔️ テレビ運動比較",
      nav_pro: "👑 PROパス",
      hero_cmp_cta: "⚔️ BodyRush vs Switch / YouTube / VR ➔",
      cta_store_short: "🔥 先行VIPアクセス登録",
      wl_badge: "🔥 先行VIPアクセス＆TESTFLIGHTベータ招待",
      wl_step_1: "優先招待",
      wl_step_2: "優先招待",
      wl_step_3: "✓ VIP登録完了",
      wl_btn_ios: "iPhone / iPad (iOS)",
      wl_tag_tf: "✓ TESTFLIGHT",
      wl_btn_other: "🤖 Android / その他",
      wl_email_ph: "your.email@example.com",
      wl_submit: "🔥 VIP先行アクセスを予約する",
      wl_micro_priv: "🔒 スパムなし。TestFlight招待とリリース通知のみに使用されます。",
      wl_ok_title: "BodyRush.app VIPリストに登録されました！",
      wl_ok_desc: "iOS TestFlight優先招待を確定するためメールアプリが起動しました。",
      hero_pill_soon: "🔥 先行アクセス受付中・VIP枠限定",
      hero_pill_cam: "✓ 60 FPS VISIONカメラ追跡",
      hero_pill_gear: "コントローラー不要・センサー不要",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "iPhoneを2メートル先に置くだけ。あなたの全身がコントローラーになる。",
      hero_lead: "その場しのぎの足踏みで3Dコリドーを前進し、左右3レーンにステップ回避、ジャンプ、スクワット、音楽のビートに合わせた本格パンチ、そして10種類のネオンポーズウォールを突破しよう！",
      tv_kicker: "ワイヤレス大画面テレビモード",
      tv_title: "AIRPLAYでテレビの16:9大画面でプレイ",
      tv_desc: "iPhoneやiPadをテレビの下（約2m先）に置いてAirPlayをオンにするだけ。テレビにはフルスクリーン16:9（60 FPS）の3Dコースが映し出され、iPhoneは省電力の「📱 スケルトン・コックピット」画面に自動切り替え！",
      party_kicker: "家族や友達とリビングで対戦",
      party_title: "2〜4人リビングトーナメント＆3Dフォト表彰台",
      party_desc: "1台のカメラの前で2〜4人が順番にプレイ！ベストポーズの記念写真とフィニッシュ動画リプレイ付きの3D表彰台で盛り上がろう。",
      cmp_kicker: "⚔️ リビングTVフィットネス徹底比較 · 2026",
      cmp_title: "BODYRUSH 3DがYOUTUBE動画・NINTENDO SWITCH・VRに勝る理由",
      cmp_desc: "ゲーム機の購入不要、コントローラー不要、重いVRゴーグルも不要。iPhoneやiPadをテレビの前に置くだけで、Apple Vision AIが全身19関節を60 FPSでリアルタイム追跡し、AirPlayで16:9テレビ大画面に投影します。",
      cmp_col_crit: "比較項目",
      cmp_col_br: "🥇 BodyRush 3D (iPhone/iPad + 16:9 TV)",
      cmp_col_yt: "📺 YouTube筋トレ・宅トレ動画",
      cmp_col_sw: "🎮 Nintendo Switch (リングフィット / ボクシング)",
      cmp_col_vr: "🥽 VRゴーグル (Meta Quest / Beat Saber)",
      cmp_r1_k: "追加で購入する機器",
      cmp_r1_br: "✅ 追加機器なし（手持ちのiPhone/iPad + AirPlayテレビ）",
      cmp_r1_yt: "✅ 追加機器なし",
      cmp_r1_sw: "❌ Switch本体＋Joy-Con／リングコンの購入が必要",
      cmp_r1_vr: "❌ 重いVRヘッドセット＋コントローラー2個",
      cmp_r2_k: "全身トラッキング精度",
      cmp_r2_br: "✅ 全身19関節を60 FPS追跡（Apple Vision AI）",
      cmp_r2_yt: "❌ 0%（一方通行の動画・判定なし）",
      cmp_r2_sw: "⚠️ 手首のジャイロのみ（座ったまま手だけ振っても反応）",
      cmp_r2_vr: "⚠️ 頭＋両手のみ（下半身・脚の追跡なし）",
      cmp_r3_k: "ゲームの没入感と前進システム",
      cmp_r3_br: "✅ 走ると3Dコースが前進＋3倍速ターボラン",
      cmp_r3_yt: "❌ 受動的（インストラクターを見るだけ＋広告中断）",
      cmp_r3_sw: "✅ ゲーム性は高いが会話やメニュー操作で運動が止まる",
      cmp_r3_vr: "✅ リズムゲームだがその場に立ったまま",
      cmp_r4_k: "マンション静音モード＆連続有酸素",
      cmp_r4_br: "✅ 🚫ジャンプなし／🚫スクワットなし＋5分・10分FIT（♾️無敵ハート）",
      cmp_r4_yt: "⚠️ スコアもコンボ判定もなし",
      cmp_r4_sw: "⚠️ 汗をかくと太もものレッグバンドがずり落ちる",
      cmp_r4_vr: "❌ 顔面の汗蒸れ・レンズの曇り・首への負担",
      cmp_r5_k: "テレビ大画面＆パーティー対戦",
      cmp_r5_br: "✅ AirPlay 16:9大画面＋2〜4人交代トーナメント＆3D表彰台",
      cmp_r5_yt: "❌ 1人で画面を見るだけ",
      cmp_r5_sw: "⚠️ プレイヤー交代ごとにバンドの付け替えが面倒",
      cmp_r5_vr: "❌ ゴーグル1台につき1人しか遊べず周囲から孤立",
      cmp_d1_tag: "対決 #1 · カメラ双方向ゲーム VS 受動的な動画",
      cmp_d1_title: "BodyRush 3D vs YouTube宅トレ動画",
      cmp_d1_desc: "YouTube動画は自分の動きが判定されないため3分で飽きがちです。BodyRushはカメラが60 FPSで全身19関節を判定：走るのを止めると3D空間も減速！ビートに合わせたパンチや5分・10分の無敵ハート（♾️）FITモードで最後まで楽しく燃焼できます。",
      cmp_d2_tag: "対決 #2 · 手ぶら19関節トラッキング VS SWITCHコントローラー",
      cmp_d2_title: "BodyRush 3D vs Nintendo Switch（リングフィット／Fit Boxing）",
      cmp_d2_desc: "専用ゲーム機も、汗でずり落ちるレッグバンドも不要。手首しか検知しないJoy-Conと違い、Apple Visionが全身（3レーン回避、本格スクワット、ジャンプ、スーパーキック、10ポーズウォール）を正確に判定し、AirPlayでテレビに16:9投影します！",
      cmp_guides_label: "🌍 言語別の完全比較ガイド：",
      price_in_app: "価格はアプリ内で表示されます。",
      btn_offers: "🔥 先行VIPアクセスに登録する",
      priv_badge: "端末内カメラ処理",
      priv_title: "カメラ映像はiPhone / iPad端末内でのみ解析されます",
      priv_btn: "プライバシーポリシーを読む"
    },
    ko: {
      brand_sub: "피트니스 · 복싱 · 포즈",
      hud_streak: "🔥 7일 연속",
      nav_console: "🕹️ 게임 메뉴",
      nav_moves: "🥊 동작 & 10가지 포즈",
      nav_captures: "📸 캡처",
      nav_tv: "📺 AirPlay TV & 파티",
      nav_compare: "⚔️ TV 홈트 비교",
      nav_pro: "👑 PRO 패스",
      hero_cmp_cta: "⚔️ BodyRush vs Switch / YouTube / VR ➔",
      cta_store_short: "🔥 사전 VIP 액세스 신청",
      wl_badge: "🔥 사전 VIP 액세스 및 TESTFLIGHT 베타 초대",
      wl_step_1: "우선 초대",
      wl_step_2: "우선 초대",
      wl_step_3: "✓ VIP 등록 완료",
      wl_btn_ios: "iPhone / iPad (iOS)",
      wl_tag_tf: "✓ TESTFLIGHT",
      wl_btn_other: "🤖 Android / 기타",
      wl_email_ph: "your.email@example.com",
      wl_submit: "🔥 VIP 사전 액세스 예약",
      wl_micro_priv: "🔒 스팸 없음. TestFlight 비공개 초대 및 출시 알림용으로만 사용됩니다.",
      wl_ok_title: "BodyRush.app VIP 리스트에 등록되었습니다!",
      wl_ok_desc: "iOS TestFlight 우선 초대를 확인하기 위해 메일 앱이 자동으로 열렸습니다.",
      hero_pill_soon: "🔥 사전 예약 진행 중 · 한정된 VIP 좌석",
      hero_pill_cam: "✓ 60 FPS 비전 카메라 추적",
      hero_pill_gear: "컨트롤러 불필요 · 센서 불필요",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "아이폰을 2미터 앞에 두세요. 당신의 몸이 곧 컨트롤러입니다.",
      hero_lead: "제자리에서 달려 3D 복도를 전진하고, 3개 라인으로 좌우 회피하고, 장애물을 점프하거나 스쿼트로 피하고, 음악 비트에 맞춰 몬스터에게 펀치를 날리고 10가지 네온 포즈 벽을 통과하세요!",
      tv_kicker: "무선 대화면 TV 모드",
      tv_title: "AIRPLAY로 TV에서 16:9 풀스크린 플레이",
      tv_desc: "아이폰이나 아이패드를 TV 아래 2m 거리에 두고 AirPlay를 켜세요. TV에는 16:9 풀스크린(60 FPS) 3D 월드가 펼쳐지고, 아이폰은 발열 없는 저전력 '📱 스켈레톤 콕핏' 모드로 자동 전환됩니다!",
      party_kicker: "친구 및 가족과 함께하는 거실 파티",
      party_title: "2~4인 거실 토너먼트 & 3D 포토 시상대",
      party_desc: "카메라 앞에서 2~4명이 번갈아 플레이하는 거실 토너먼트! 베스트 포즈 기념 사진과 피니시 리플레이 영상이 담긴 3D 시상대를 확인하세요.",
      cmp_kicker: "⚔️ 거실 TV 홈트레이닝 완벽 비교 · 2026",
      cmp_title: "BODYRUSH 3D가 유튜브 홈트·닌텐도 스위치·VR을 압도하는 이유",
      cmp_desc: "콘솔 구매 불필요, 손에 쥐는 컨트롤러 불필요, 답답한 VR 헤드셋 불필요: 아이폰이나 아이패드를 TV 앞에 두기만 하면 Apple Vision AI가 60 FPS로 전신 19개 관절을 추적하고 AirPlay로 16:9 대화면에 미러링합니다.",
      cmp_col_crit: "비교 항목",
      cmp_col_br: "🥇 BodyRush 3D (iPhone/iPad + 16:9 TV)",
      cmp_col_yt: "📺 유튜브 홈트레이닝 영상",
      cmp_col_sw: "🎮 닌텐도 스위치 (링피트 / 피트니스 복싱)",
      cmp_col_vr: "🥽 VR 헤드셋 (메타 퀘스트 / 비트세이버)",
      cmp_r1_k: "추가 구매 장비",
      cmp_r1_br: "✅ 추가 장비 없음 (보유 중인 iPhone/iPad + AirPlay TV)",
      cmp_r1_yt: "✅ 추가 장비 없음",
      cmp_r1_sw: "❌ 스위치 콘솔 + 조이콘 / 링콘 구매 필요",
      cmp_r1_vr: "❌ 무거운 VR 헤드셋 + 컨트롤러 2개",
      cmp_r2_k: "실제 전신 모션 추적",
      cmp_r2_br: "✅ 전신 19개 관절 60 FPS 추적 (Apple Vision AI)",
      cmp_r2_yt: "❌ 0% (수동적인 영상 시청, 동작 인식 없음)",
      cmp_r2_sw: "⚠️ 손목 자이로센서만 인식 (앉아서 손만 흔들어도 통과!)",
      cmp_r2_vr: "⚠️ 머리 + 양손만 인식 (하체 및 다리 추적 불가)",
      cmp_r3_k: "상호작용 및 추진력",
      cmp_r3_br: "✅ 제자리 달리기로 3D 월드 전진 + 3배속 터보 런",
      cmp_r3_yt: "❌ 수동적 (강사 설명 시청 + 중간 광고)",
      cmp_r3_sw: "✅ 게임이지만 긴 대화와 메뉴로 운동 흐름 끊김",
      cmp_r3_vr: "✅ 리듬 액션이지만 제자리에 서서 플레이",
      cmp_r4_k: "아파트 층간소음 방지 & 연속 유산소",
      cmp_r4_br: "✅ 🚫 점프 없음 / 🚫 스쿼트 없음 + 5분·10분 FIT (♾️ 무제한 하트)",
      cmp_r4_yt: "⚠️ 점수 및 콤보 피드백 없음",
      cmp_r4_sw: "⚠️ 땀 흘리면 흘러내리는 허벅지 레그 스트랩",
      cmp_r4_vr: "❌ 얼굴에 차는 땀과 렌즈 김서림",
      cmp_r5_k: "TV 대화면 & 거실 파티 모드",
      cmp_r5_br: "✅ AirPlay 16:9 TV + 2~4인 교대 토너먼트 & 3D 포토 시상대",
      cmp_r5_yt: "❌ 혼자서 수동적으로 시청",
      cmp_r5_sw: "⚠️ 플레이어마다 스트랩을 풀고 다시 착용해야 함",
      cmp_r5_vr: "❌ 헤드셋 1대 = 1명만 고립되어 플레이",
      cmp_d1_tag: "대결 #1 · 카메라 인터랙티브 게임 VS 수동적 영상",
      cmp_d1_title: "BodyRush 3D vs 유튜브 홈트 영상",
      cmp_d1_desc: "유튜브 영상은 내 동작을 아무도 체크해주지 않아 3분 만에 포기하기 쉽습니다. BodyRush는 카메라가 60 FPS로 19개 관절을 인식해 달리기를 멈추면 3D 복도도 느려집니다! 비트에 맞춘 펀치와 5분·10분 무제한 하트(♾️) FIT 모드로 끝까지 몰입하세요.",
      cmp_d2_tag: "대결 #2 · 맨몸 19관절 추적 VS 스위치 컨트롤러",
      cmp_d2_title: "BodyRush 3D vs 닌텐도 스위치 (링피트 / 피트니스 복싱)",
      cmp_d2_desc: "콘솔을 따로 사거나 허벅지에 미끄러지는 스트랩을 묶을 필요가 없습니다. 손목만 감지하는 조이콘과 달리 Apple Vision이 전신(3라인 회피, 진짜 스쿼트, 점프, 슈퍼 킥, 10가지 포즈 벽)을 정확히 인식해 AirPlay로 TV에 16:9로 보여줍니다!",
      cmp_guides_label: "🌍 언어별 전체 비교 가이드:",
      price_in_app: "금액은 앱 내에 표시됩니다.",
      btn_offers: "🔥 사전 VIP 액세스 신청",
      priv_badge: "온디바이스 카메라 분석",
      priv_title: "카메라는 iPhone 또는 iPad 기기 내부에서만 분석됩니다",
      priv_btn: "개인정보 처리방침 보기"
    },
    pt: {
      brand_sub: "FITNESS · BOXE · POSTURAS",
      hud_streak: "🔥 OFENSIVA 7D",
      nav_console: "🕹️ Menu do Jogo",
      nav_moves: "🥊 Gestos e 10 Posturas",
      nav_captures: "📸 Capturas",
      nav_tv: "📺 AirPlay TV e Sala",
      nav_compare: "⚔️ Comparativo TV",
      nav_pro: "👑 Passe PRO",
      hero_cmp_cta: "⚔️ BodyRush vs Switch / YouTube / VR ➔",
      cta_store_short: "🔥 Acesso Antecipado VIP",
      wl_badge: "🔥 ACESSO ANTECIPADO PRIVADO E BETA TESTFLIGHT",
      wl_step_1: "CONVITE PRIORITÁRIO",
      wl_step_2: "CONVITE PRIORITÁRIO",
      wl_step_3: "✓ INSCRITO NO VIP",
      wl_btn_ios: "iPhone / iPad (iOS)",
      wl_tag_tf: "✓ TESTFLIGHT",
      wl_btn_other: "🤖 Android / Outro",
      wl_email_ph: "seu.email@exemplo.com",
      wl_submit: "🔥 GARANTIR MEU ACESSO VIP",
      wl_micro_priv: "🔒 Zero spam. Apenas para seu convite privado do TestFlight e aviso de lançamento.",
      wl_ok_title: "Você está na lista VIP do BodyRush.app!",
      wl_ok_desc: "Seu app de e-mail abriu automaticamente para confirmar sua prioridade no TestFlight iOS.",
      hero_pill_soon: "🔥 ACESSO ANTECIPADO · VAGAS VIP LIMITADAS",
      hero_pill_cam: "✓ CÂMERA VISION 60 FPS",
      hero_pill_gear: "ZERO CONTROLE · ZERO SENSOR",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "POSICIONE SEU iPHONE A 2 METROS. SEU CORPO É O CONTROLE.",
      hero_lead: "Corra sem sair do lugar para avançar pelo corredor 3D, desvie em 3 faixas, pule armadilhas, faça agachamentos, dê socos nos monstros no ritmo da música e atravesse os 10 muros de postura.",
      tv_kicker: "MODO TELA GRANDE SEM FIO",
      tv_title: "JOGUE EM 16:9 NA SUA TV VIA AIRPLAY",
      tv_desc: "Coloque seu iPhone ou iPad abaixo da TV a 2 metros e ative o AirPlay: sua TV exibe o corredor 3D em tela cheia 16:9 a 60 FPS enquanto o iPhone muda para o modo '📱 Cockpit Esqueleto' de baixo consumo.",
      party_kicker: "NOITES DE JOGO COM AMIGOS E FAMÍLIA",
      party_title: "TORNEIO NA SALA DE 2 A 4 JOGADORES E PÓDIO FOTO 3D",
      party_desc: "Inicie um Torneio na Sala de 2 a 4 jogadores revezando na frente da câmera, com Pódio 3D, Foto Lembrança e Vídeo Replay!",
      cmp_kicker: "⚔️ COMPARATIVO TREINO NA FRENTE DA TV · 2026",
      cmp_title: "POR QUE O BODYRUSH 3D SUPERA O YOUTUBE, NINTENDO SWITCH E VR",
      cmp_desc: "Zero console para comprar, zero controles nas mãos, zero óculos VR no rosto: posicione seu iPhone ou iPad a 2 metros abaixo da TV e tenha rastreamento real de 19 articulações a 60 FPS em 16:9 via AirPlay.",
      cmp_col_crit: "Critério",
      cmp_col_br: "🥇 BodyRush 3D (iPhone/iPad + TV 16:9)",
      cmp_col_yt: "📺 Vídeos de Treino no YouTube",
      cmp_col_sw: "🎮 Nintendo Switch (Ring Fit / Boxe)",
      cmp_col_vr: "🥽 Óculos VR (Quest / Beat Saber)",
      cmp_r1_k: "Equipamento extra necessário",
      cmp_r1_br: "✅ Nenhum (usa seu iPhone ou iPad + AirPlay TV)",
      cmp_r1_yt: "✅ Nenhum",
      cmp_r1_sw: "❌ Console Switch + Joy-Con / Ring-Con",
      cmp_r1_vr: "❌ Headset VR pesado + 2 controles",
      cmp_r2_k: "Rastreamento corporal real",
      cmp_r2_br: "✅ 19 articulações a 60 FPS (IA Apple Vision)",
      cmp_r2_yt: "❌ 0% (vídeo passivo, sem detecção)",
      cmp_r2_sw: "⚠️ Apenas giroscópio no pulso (dá para trapacear sentado!)",
      cmp_r2_vr: "⚠️ Apenas cabeça + 2 mãos (sem rastrear pernas)",
      cmp_r3_k: "Interatividade e Locomoção",
      cmp_r3_br: "✅ Correr no lugar move o corredor 3D + Turbo Run 3x",
      cmp_r3_yt: "❌ Passivo (assistir instrutor falar + anúncios)",
      cmp_r3_sw: "✅ Videogame, mas interrompido por menus lentos",
      cmp_r3_vr: "✅ Ritmo musical, mas parado no mesmo lugar",
      cmp_r4_k: "Modo Apartamento e Cardio Contínuo",
      cmp_r4_br: "✅ 🚫 Sem Pulo / 🚫 Sem Agachamento + FIT 5 e 10 min (♾️ Vidas)",
      cmp_r4_yt: "⚠️ Sem pontuação nem desafios",
      cmp_r4_sw: "⚠️ Cinta da coxa escorrega com o suor",
      cmp_r4_vr: "❌ Espuma suada no rosto + lentes embaçadas",
      cmp_r5_k: "Telão na TV e Festa na Sala",
      cmp_r5_br: "✅ AirPlay TV 16:9 + Torneio 2 a 4 Jogadores e Pódio Foto 3D",
      cmp_r5_yt: "❌ Apenas solo passivo",
      cmp_r5_sw: "⚠️ Ruim para trocar cintas entre jogadores",
      cmp_r5_vr: "❌ 1 óculos = 1 jogador isolado da sala",
      cmp_d1_tag: "DUELO #1 · CÂMERA INTERATIVA VS VÍDEO PASSIVO",
      cmp_d1_title: "BodyRush 3D vs Vídeos de Treino no YouTube",
      cmp_d1_desc: "No YouTube ninguém vê seus movimentos e é fácil desistir em 3 minutos. No BodyRush sua câmera rastreia 19 articulações a 60 FPS: se você parar de correr, o mundo 3D desacelera! Cada soco destrói monstros na batida da música e os modos FIT de 5 e 10 min com Vidas Ilimitadas (♾️) mantêm o foco total.",
      cmp_d2_tag: "DUELO #2 · 19 ARTICULAÇÕES LIVRES VS CONTROLES DO SWITCH",
      cmp_d2_title: "BodyRush 3D vs Nintendo Switch (Ring Fit / Fitness Boxing)",
      cmp_d2_desc: "Sem comprar console caro nem amarrar cinta escorregadia na perna. Diferente dos Joy-Cons que só leem o pulso, o Apple Vision valida seu corpo inteiro (3 faixas, agachamentos reais, pulos, Super Kicks e 10 muros de postura) em 16:9 na sua TV via AirPlay!",
      cmp_guides_label: "🌍 GUIAS COMPARATIVOS COMPLETOS POR IDIOMA:",
      price_in_app: "Os valores são exibidos no app.",
      btn_offers: "🔥 Garantir Acesso Antecipado",
      priv_badge: "CÂMERA NO DISPOSITIVO",
      priv_title: "A câmera é analisada no seu iPhone ou iPad",
      priv_btn: "Ler a Política de Privacidade"
    }
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
    if (vpWall) vpWall.src = w.wall;

    const vpMonster = document.getElementById("vp-world-monster");
    if (vpMonster) vpMonster.src = w.monster;

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

  // --- World Cards Selection ---
  const worldCards = document.querySelectorAll(".world-console-card");
  worldCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedWorld = card.dataset.world || "toyStory";
      worldCards.forEach((c) => c.classList.toggle("selected", c === card));
      refreshConsoleAndViewport();
      // Ensure video slide is visible so visitor sees the world preview update
      activateViewportSlide("vp-slide-video");
    });
  });

  // --- Tutorial Banner Click ---
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

  // --- Level Cards Selection ---
  const levelCards = document.querySelectorAll(".level-console-card");
  levelCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedLevel = card.dataset.level || "1";
      levelCards.forEach((c) => c.classList.toggle("selected", c === card));
      refreshConsoleAndViewport();
    });
  });

  // --- Difficulty Cards Selection ---
  const diffCards = document.querySelectorAll(".diff-console-card");
  diffCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedDiff = card.dataset.diff || "normal";
      diffCards.forEach((c) => c.classList.toggle("selected", c === card));
      refreshConsoleAndViewport();
    });
  });

  // --- Party Pills Selection ---
  const partyPills = document.querySelectorAll(".party-pill");
  partyPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      selectedPlayers = pill.dataset.players || "1";
      partyPills.forEach((p) => p.classList.toggle("active", p === pill));
      refreshConsoleAndViewport();
    });
  });

  // --- Viewport Media Switcher (Video + 4 Real Captures) ---
  const vpButtons = document.querySelectorAll(".vp-switch-btn");
  const vpSlides = document.querySelectorAll(".vp-media-slide");

  function activateViewportSlide(targetId) {
    vpSlides.forEach((s) => s.classList.toggle("active", s.id === targetId));
    vpButtons.forEach((b) =>
      b.classList.toggle("active", b.dataset.target === targetId)
    );
  }

  vpButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateViewportSlide(btn.dataset.target);
    });
  });

  // --- Video Audio Mute Toggle ---
  const heroVideo = document.getElementById("hero-video");
  const soundBtn = document.getElementById("btn-video-sound");
  const soundLabel = document.getElementById("sound-label");

  function refreshSoundLabel() {
    if (!heroVideo || !soundLabel) return;
    const dict = i18n[currentLang] || i18n.fr;
    soundLabel.textContent = heroVideo.muted ? dict.sound_off : dict.sound_on;
    if (soundBtn) soundBtn.setAttribute("aria-label", dict.sound_aria);
  }

  if (heroVideo && soundBtn && soundLabel) {
    soundBtn.addEventListener("click", () => {
      heroVideo.muted = !heroVideo.muted;
      refreshSoundLabel();
    });
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (!motionQuery.matches) return;
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
    };
    syncMotion();
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", syncMotion);
    }
  }

  // --- Demo video (13 Mo) : chargée seulement quand la vidéo du haut est prête
  //     et que la démo approche de l'écran, pour ne pas lui voler la bande passante ---
  if (heroVideo) {
    const demoMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const topVideo = document.getElementById("lobby-hero-video");
    let topReady = !topVideo || topVideo.readyState >= 4;
    let demoNear = false;
    let demoStarted = false;
    const startDemo = () => {
      if (demoStarted || !topReady || !demoNear || demoMotion.matches) return;
      demoStarted = true;
      heroVideo.preload = "auto";
      heroVideo.loop = true;
      heroVideo.addEventListener("ended", () => {
        heroVideo.currentTime = 0;
        if (demoNear && !demoMotion.matches) heroVideo.play().catch(() => {});
      });
      const playing = heroVideo.play();
      if (playing && typeof playing.catch === "function") playing.catch(() => {});
    };
    if (!topReady) {
      const markReady = () => { topReady = true; startDemo(); };
      topVideo.addEventListener("canplaythrough", markReady, { once: true });
      topVideo.addEventListener("error", markReady, { once: true });
      setTimeout(markReady, 6000);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          demoNear = entry.isIntersecting;
          if (!demoStarted) {
            startDemo();
          } else if (!demoNear) {
            heroVideo.pause();
          } else if (heroVideo.paused && !demoMotion.matches) {
            heroVideo.play().catch(() => {});
          }
        });
      }, { rootMargin: "300px 0px" }).observe(heroVideo);
    } else {
      demoNear = true;
      startDemo();
    }
  }

  // --- Lobby hero loop: respect prefers-reduced-motion ---
  const lobbyHeroVideo = document.getElementById("lobby-hero-video");
  if (lobbyHeroVideo) {
    const lobbyMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncLobbyMotion = () => {
      if (lobbyMotion.matches) {
        lobbyHeroVideo.removeAttribute("autoplay");
        lobbyHeroVideo.pause();
        lobbyHeroVideo.currentTime = 0;
      } else {
        const playing = lobbyHeroVideo.play();
        if (playing && typeof playing.catch === "function") playing.catch(() => {});
      }
    };
    syncLobbyMotion();
    if (typeof lobbyMotion.addEventListener === "function") {
      lobbyMotion.addEventListener("change", syncLobbyMotion);
    }

    // iOS Safari : garder la boucle vivante.
    // - filet de sécurité si "loop" est ignoré (ended → retour au début + play)
    // - relance quand la vidéo revient à l'écran, quand l'onglet redevient
    //   visible ou quand la page sort du cache retour arrière (pageshow)
    // - mode économie d'énergie : l'autoplay est bloqué, on relance au 1er toucher
    lobbyHeroVideo.loop = true;
    const keepLobbyPlaying = () => {
      if (lobbyMotion.matches || document.hidden || !lobbyHeroVideo.paused) return;
      const playing = lobbyHeroVideo.play();
      if (playing && typeof playing.catch === "function") playing.catch(() => {});
    };
    lobbyHeroVideo.addEventListener("ended", () => {
      if (lobbyMotion.matches) return;
      lobbyHeroVideo.currentTime = 0;
      keepLobbyPlaying();
    });
    document.addEventListener("visibilitychange", keepLobbyPlaying);
    window.addEventListener("pageshow", keepLobbyPlaying);

    // Garde-fou : si la vidéo est arrivée au bout ou reste bloquée sur place
    // alors qu'elle devrait jouer (bug de boucle Safari iOS), on la renvoie au début.
    let lobbyLastTime = -1;
    let lobbyStuckTicks = 0;
    window.setInterval(() => {
      if (lobbyMotion.matches || document.hidden || lobbyHeroVideo.readyState < 2) return;
      const d = lobbyHeroVideo.duration;
      const t = lobbyHeroVideo.currentTime;
      const atEnd = lobbyHeroVideo.ended || (d > 0 && t >= d - 0.05);
      lobbyStuckTicks = !lobbyHeroVideo.paused && t === lobbyLastTime ? lobbyStuckTicks + 1 : 0;
      lobbyLastTime = t;
      if (atEnd || lobbyStuckTicks >= 2) {
        lobbyStuckTicks = 0;
        lobbyHeroVideo.currentTime = 0;
        keepLobbyPlaying();
      }
    }, 700);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) keepLobbyPlaying();
      }).observe(lobbyHeroVideo);
    }
    const unlockOnTouch = () => {
      keepLobbyPlaying();
      if (heroVideo && heroVideo.paused && heroVideo.preload === "auto" && !lobbyMotion.matches) {
        heroVideo.play().catch(() => {});
      }
      if (!lobbyHeroVideo.paused || lobbyMotion.matches) {
        document.removeEventListener("touchend", unlockOnTouch);
        document.removeEventListener("click", unlockOnTouch);
      }
    };
    document.addEventListener("touchend", unlockOnTouch, { passive: true });
    document.addEventListener("click", unlockOnTouch);
  }

  // --- Multilingual Switcher (7 Languages: FR, EN, ES, DE, JA, KO, PT) ---
  const langBtn = document.getElementById("lang-toggle");
  const langFlag = document.getElementById("lang-flag");
  const langCode = document.getElementById("lang-code");
  const supportedLangs = ["fr", "en", "es", "de", "ja", "ko", "pt"];
  const langFlagsMap = {
    fr: "🇫🇷",
    en: "🇺🇸",
    es: "🇪🇸",
    de: "🇩🇪",
    ja: "🇯🇵",
    ko: "🇰🇷",
    pt: "🇧🇷"
  };

  function applyLanguage(lang) {
    const cleanLang = supportedLangs.includes(lang) ? lang : "fr";
    currentLang = cleanLang;
    document.documentElement.lang = cleanLang === "pt" ? "pt-BR" : cleanLang;
    const fallbackDict = cleanLang === "fr" ? i18n.fr : i18n.en;
    const dict = Object.assign({}, fallbackDict, i18n[cleanLang] || {});
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key]) el.setAttribute("aria-label", dict[key]);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (dict[key]) el.setAttribute("alt", dict[key]);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });
    if (langFlag) langFlag.textContent = langFlagsMap[cleanLang] || "🇫🇷";
    if (langCode) langCode.textContent = cleanLang.toUpperCase();
    document.querySelectorAll(".js-set-lang").forEach((btn) => {
      const bLang = btn.getAttribute("data-lang");
      btn.classList.toggle("is-active", bLang === cleanLang);
    });
    const heroCmpLink = document.getElementById("hero-cmp-link");
    if (heroCmpLink) {
      heroCmpLink.setAttribute("href", `compare-${cleanLang}.html`);
    }
    const telemetry = document.getElementById("hud-telemetry");
    if (telemetry && dict.hud_example_aria) {
      telemetry.setAttribute("aria-label", dict.hud_example_aria);
    }
    if (langBtn && dict.lang_aria) {
      langBtn.setAttribute("aria-label", dict.lang_aria);
    }
    const navToggle = document.getElementById("nav-toggle");
    const siteNav = document.getElementById("site-nav");
    if (navToggle && siteNav && dict.nav_menu_open && dict.nav_menu_close) {
      const open = siteNav.classList.contains("is-open");
      navToggle.setAttribute("aria-label", open ? dict.nav_menu_close : dict.nav_menu_open);
    }
    refreshSoundLabel();
    refreshConsoleAndViewport();
  }

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const idx = supportedLangs.indexOf(currentLang);
      const nextLang = supportedLangs[(idx + 1) % supportedLangs.length];
      applyLanguage(nextLang);
    });
  }

  document.querySelectorAll(".js-set-lang").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetLang = btn.getAttribute("data-lang");
      if (targetLang) applyLanguage(targetLang);
    });
  });

  // Auto-detect ?lang= query param on page load
  const urlParams = new URLSearchParams(window.location.search);
  const queryLang = (urlParams.get("lang") || "").toLowerCase().slice(0, 2);
  if (supportedLangs.includes(queryLang)) {
    applyLanguage(queryLang);
  }

  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = !siteNav.classList.contains("is-open");
      siteNav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      const dict = i18n[currentLang] || i18n.fr;
      navToggle.setAttribute("aria-label", open ? dict.nav_menu_close : dict.nav_menu_open);
    });
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        const dict = i18n[currentLang] || i18n.fr;
        navToggle.setAttribute("aria-label", dict.nav_menu_open);
      });
    });
  }

  refreshSoundLabel();
  refreshConsoleAndViewport();

  // --- 1-Step Direct VIP Waitlist & Automatic mailto ---
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
      if (vwEmailInput) {
        vwEmailInput.focus();
      }
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
        vwEmailInput.style.borderColor = "#FF2E52";
        return;
      }
      vwEmailInput.style.borderColor = "";
      const wantsTestFlight = waitlistDevice === "ios";
      const payload = {
        email,
        device: waitlistDevice === "ios" ? "Apple iOS (iPhone / iPad)" : "Android / Other",
        testflight: wantsTestFlight ? "YES (TestFlight Beta)" : "Launch Alert Only",
        lang: currentLang,
        timestamp: new Date().toISOString()
      };

      try {
        localStorage.setItem("bodyrush_vip_waitlist_v1", JSON.stringify(payload));
      } catch (_) {}

      const subject = encodeURIComponent(
        wantsTestFlight
          ? `BodyRush.app — Accès Bêta TestFlight iOS (${email})`
          : `BodyRush.app — Liste d'attente VIP (${email})`
      );
      const body = encodeURIComponent(
        `Bonjour,\n\nJe m'inscris en avant-première sur BodyRush.app :\n- Email : ${email}\n- Appareil : ${payload.device}\n- TestFlight Beta iOS : ${wantsTestFlight ? "Oui, envoyez-moi l'accès TestFlight !" : "Prévenez-moi à la sortie"}\n`
      );
      const mailtoUrl = `mailto:xlarrodeapp+bodyrush@gmail.com?subject=${subject}&body=${body}`;

      if (vwStep2 && vwStep3) {
        vwStep2.classList.remove("active");
        vwStep3.classList.add("active");
      }
      if (vwStepIndicator) {
        const dict = i18n[currentLang] || i18n.fr;
        vwStepIndicator.setAttribute("data-i18n", "wl_step_3");
        if (dict.wl_step_3) vwStepIndicator.textContent = dict.wl_step_3;
      }

      // BAM: Open mailto automatically right on submit!
      window.location.href = mailtoUrl;
    });
  }

  document.querySelectorAll(".js-scroll-waitlist, #hud-waitlist-cta").forEach((el) => {
    el.addEventListener("click", (e) => {
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

  // --- Captures slideshow (#captures-wall only) ---
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
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let index = 0;
    let timer = 0;
    let remaining = DURATION;
    let stamp = 0;
    let hovering = false;
    let touching = false;
    let focused = false;
    let reduced = motionQuery.matches;
    let swipe = null;

    function hold() {
      return reduced || hovering || touching || focused;
    }

    function clearTimer() {
      if (!timer) return;
      clearTimeout(timer);
      timer = 0;
    }

    function hydrate(i) {
      const slide = slides[(i + count) % count];
      slide.querySelectorAll("img[data-src]").forEach((img) => {
        img.loading = "eager";
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
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
      const n = index + 1;
      const dict = i18n[currentLang] || i18n.fr;
      if (titleEl) {
        titleEl.setAttribute("data-i18n", "cap" + n + "_title");
        if (dict["cap" + n + "_title"]) titleEl.textContent = dict["cap" + n + "_title"];
      }
      if (descEl) {
        descEl.setAttribute("data-i18n", "cap" + n + "_txt");
        if (dict["cap" + n + "_txt"]) descEl.textContent = dict["cap" + n + "_txt"];
      }
    }

    function restartProgress() {
      const fill = segs[index] && segs[index].querySelector(".cap-progress-fill");
      if (!fill) return;
      fill.style.animation = "none";
      void fill.offsetWidth;
      fill.style.animation = "";
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
      hydrate(index);
      hydrate(index + 1);
      hydrate(index - 1);
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
    go(0);
  }
});
