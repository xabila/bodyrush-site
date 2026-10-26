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
      cta_store_short: "⏳ Bientôt sur l'App Store",
      hero_pill_soon: "⏳ BIENTÔT DISPONIBLE SUR L'APP STORE",
      hero_pill_cam: "✓ CAMÉRA VISION 60 FPS",
      hero_pill_gear: "ZÉRO MANETTE · ZÉRO CAPTEUR",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "POSE TON iPHONE À 2 MÈTRES. TON CORPS EST LA MANETTE.",
      hero_lead: "Cours sur place pour faire défiler le couloir 3D, décale-toi à gauche ou à droite, saute par-dessus les pièges, baisse-toi en squat, boxe les monstres en rythme sur la musique et traverse les 10 murs de posture.",
      hero_photo_alt: "Une femme en posture double biceps devant une télé qui affiche BodyRush, avec un iPhone sous la télé montrant l'interface de l'app.",
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
      btn_launch_app: "⏳ BIENTÔT SUR iPHONE & iPAD",
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
      pro_kicker: "DÉBLOCAGE BODYRUSH PRO",
      pro_title: "BIENTÔT DISPONIBLE : TESTE GRATUITEMENT, DÉBLOQUE TOUTE L'ARCADE",
      pro_desc: "Dès sa sortie imminente sur l'App Store, télécharge gratuitement BodyRush pour jouer au Tutoriel complet (Niv. 00) et au Niveau 01 de Toy Kingdom (avec un aperçu en direct des mondes PRO dans les 20 dernières secondes !).",
      free_badge: "INCLUS AU TÉLÉCHARGEMENT",
      free_name: "VERSION GRATUITE",
      free_sub: "pour toujours",
      f_1: "✓ Tutoriel Interactif des 8 Gestes (Niv. 00 · ♾️ Cœurs)",
      f_2: "✓ Monde Toy Kingdom (Niv. 01 Sans Saut/Squat + Teaser PRO 20s)",
      f_3: "✓ Difficultés EASY (~40 obs) & NORMAL (~80 obs + Combos x2)",
      f_4: "✓ Mode Solo, Photo Souvenir & Replay Finish",
      f_5: "🔒 Les 5 autres Mondes 3D & Niveaux 02 à 09 (FIT 5/10 min & Méli-Mélo)",
      f_6: "🔒 Difficultés HARD (~125 obs) & EXPERT+ (~175 obs + Combos x3)",
      btn_dl_free: "⏳ Bientôt sur l'App Store",
      vip_ribbon: "👑 OFFRE LA PLUS POPULAIRE",
      vip_name: "PASS ANNUEL PRO",
      vip_flex: "ou Pass Mensuel, sans engagement",
      v_1: "✓ Les 6 Mondes 3D Complets (Toy, Sakura, Temple, Cristal, Halloween, Noël)",
      v_2: "✓ Les 10 Niveaux (Modes Sans Saut/Squat, FIT 5/10 min ♾️ Cœurs & Méli-Mélo 6 Mondes)",
      v_3: "✓ Les 4 Difficultés jusqu'à EXPERT+ (~175 événements + Combos x3 sur le beat)",
      v_4: "✓ 26 Musiques Originales avec Détecteur de Drop Musical",
      v_5: "✓ Mode Tournoi Salon 2 à 4 Joueurs & Podium Photo 3D",
      v_6: "✓ Mode TV AirPlay 16:9 Haute Définition",
      btn_start_vip: "⏳ Bientôt disponible",
      life_badge: "PAIEMENT UNIQUE · ZÉRO ABONNEMENT",
      life_name: "ÉDITION INFINITY À VIE",
      life_sub: "Paiement unique, sans renouvellement",
      l_1: "✓ Déblocage À Vie de tout BodyRush 3D PRO",
      l_2: "✓ Tous les 6 Mondes, 10 Niveaux (FIT & Méli-Mélo), 4 Difficultés & 26 Musiques",
      l_3: "✓ Tournoi Salon 2 à 4 Joueurs & Podium Photo 3D",
      l_4: "✓ Toutes les futures mises à jour et nouveaux mondes inclus",
      l_5: "✓ Compatible Partage Familial Apple",
      btn_buy_life: "⏳ Bientôt disponible",
      priv_badge: "CAMÉRA SUR L'APPAREIL",
      priv_title: "La caméra est analysée sur ton iPhone ou ton iPad",
      priv_desc: "Les 19 articulations sont estimées sur l'appareil avec Apple Vision. Aucune vidéo, photo ou donnée biométrique issue de la caméra n'est envoyée. Des statistiques d'usage anonymes partent vers Mixpanel (UE), et RevenueCat vérifie l'abonnement PRO avec un identifiant de transaction anonyme.",
      price_in_app: "Les montants sont affichés dans l'app.",
      btn_offers: "Voir les offres dans l'app",
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
      hud_example: "EXEMPLE",
      hud_example_aria: "Exemple de télémétrie, pas vos statistiques",
      nav_menu: "Menu",
      nav_menu_open: "Ouvrir le menu",
      nav_menu_close: "Fermer le menu",
      lang_aria: "Changer la langue",
      sound_off: "🔇 SON OFF",
      sound_on: "🔊 SON ON",
      sound_aria: "Activer ou couper le son"
    },
    en: {
      brand_sub: "FITNESS · BOXING · POSES",
      hud_streak: "🔥 7D STREAK",
      nav_console: "🕹️ Game Menu",
      nav_moves: "🥊 Moves & 10 Poses",
      nav_captures: "📸 Captures",
      nav_tv: "📺 AirPlay TV & Party",
      nav_pro: "👑 PRO Pass",
      cta_store_short: "⏳ Coming Soon on App Store",
      hero_pill_soon: "⏳ COMING SOON ON THE APP STORE",
      hero_pill_cam: "✓ 60 FPS VISION CAMERA",
      hero_pill_gear: "ZERO CONTROLLER · ZERO SENSOR",
      hero_pill_devices: "iPHONE · iPAD · AIRPLAY TV 16:9",
      hero_h1: "PLACE YOUR iPHONE 6 FEET AWAY. YOUR BODY IS THE CONTROLLER.",
      hero_lead: "Run in place to drive the 3D corridor forward, dodge across 3 lanes, jump over traps, squat under beams, punch monsters to the beat of the music and clear all 10 neon posture gates.",
      hero_photo_alt: "A woman in a double-biceps pose in front of a TV running BodyRush, with an iPhone under the TV showing the real app interface.",
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
      btn_launch_app: "⏳ COMING SOON ON iPHONE & iPAD",
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
      pro_kicker: "BODYRUSH PRO UNLOCK",
      pro_title: "COMING SOON: TRY FOR FREE, UNLOCK THE FULL ARCADE",
      pro_desc: "At launch on the App Store, download BodyRush for free to play the full 8-Move Tutorial (Lvl 00) and Toy Kingdom Level 01 (including a live 20-second PRO world teaser at the end of the song!).",
      free_badge: "INCLUDED FOR FREE",
      free_name: "FREE EDITION",
      free_sub: "forever",
      f_1: "✓ Interactive 8-Move Gesture Tutorial (Lvl 00 · ♾️ Hearts)",
      f_2: "✓ Toy Kingdom World (Lvl 01 No-Jump/Squat + 20s PRO Teaser)",
      f_3: "✓ EASY (~40 obs) & NORMAL (~80 obs + x2 Combos) Difficulties",
      f_4: "✓ Solo Mode, Souvenir Photo & Finish Replay",
      f_5: "🔒 Remaining 5 3D Worlds & Levels 02 to 09 (5/10-Min FIT & Megamix)",
      f_6: "🔒 HARD (~125 obs) & EXPERT+ (~175 obs + x3 Combos) Difficulties",
      btn_dl_free: "⏳ Coming Soon on App Store",
      vip_ribbon: "👑 MOST POPULAR",
      vip_name: "ANNUAL PRO PASS",
      vip_flex: "or a monthly pass, no commitment",
      v_1: "✓ All 6 Complete 3D Worlds (Toy, Sakura, Temple, Crystal, Halloween, Santa)",
      v_2: "✓ All 10 Custom Levels (No-Jump/Squat, 5/10-Min FIT ♾️ Hearts & 6-World Megamix)",
      v_3: "✓ All 4 Difficulties up to EXPERT+ (~175 events + x3 Combos on the beat)",
      v_4: "✓ 26 Original Tracks with Live Bass-Drop Detector",
      v_5: "✓ 2-to-4 Player Party Tournament & 3D Photo Podium",
      v_6: "✓ High-Definition 16:9 AirPlay TV Mode",
      btn_start_vip: "⏳ Coming Soon",
      life_badge: "ONE-TIME PAYMENT · ZERO SUBSCRIPTION",
      life_name: "INFINITY LIFETIME EDITION",
      life_sub: "One-time payment, no renewal",
      l_1: "✓ Lifetime Unlock of all BodyRush 3D PRO content",
      l_2: "✓ All 6 Worlds, 10 Levels (FIT & Megamix), 4 Difficulties & 26 Tracks",
      l_3: "✓ 2-to-4 Player Party Tournament & 3D Photo Podium",
      l_4: "✓ All future updates and new worlds included",
      l_5: "✓ Apple Family Sharing supported",
      btn_buy_life: "⏳ Coming Soon",
      priv_badge: "ON-DEVICE CAMERA",
      priv_title: "The camera is analyzed on your iPhone or iPad",
      priv_desc: "The 19 joints are estimated on the device with Apple Vision. No camera video, photo, or biometric data is uploaded. Anonymous usage stats go to Mixpanel (EU), and RevenueCat checks the PRO subscription with an anonymous transaction id.",
      price_in_app: "Amounts are shown in the app.",
      btn_offers: "See the offers in the app",
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
      hud_example: "EXAMPLE",
      hud_example_aria: "Sample telemetry, not your stats",
      nav_menu: "Menu",
      nav_menu_open: "Open menu",
      nav_menu_close: "Close menu",
      lang_aria: "Change language",
      sound_off: "🔇 SOUND OFF",
      sound_on: "🔊 SOUND ON",
      sound_aria: "Turn sound on or off"
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

  // --- Language Switcher (FR / EN) ---
  const langBtn = document.getElementById("lang-toggle");
  const langFlag = document.getElementById("lang-flag");
  const langCode = document.getElementById("lang-code");

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const dict = i18n[lang] || i18n.fr;
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
    if (langFlag) langFlag.textContent = lang === "fr" ? "🇫🇷" : "🇬🇧";
    if (langCode) langCode.textContent = lang.toUpperCase();
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
      applyLanguage(currentLang === "fr" ? "en" : "fr");
    });
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
