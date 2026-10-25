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
      badge: "🐱 TOY KINGDOM · 128 BPM",
      short: "🐱 TOY KINGDOM",
      wall: "assets/worlds/world_toystory_wall.jpg",
      monster: "assets/stickers/villain_toystory_mainecoon.png",
      titleFr: "Toy Kingdom — Chambre des jouets (128 BPM)",
      titleEn: "Toy Kingdom — Playroom Hallway (128 BPM)",
      subFr: "Chat Maine Coon, Robot jouet, train en bois & cubes rythmés",
      subEn: "Maine Coon Cat, Toy Robot, wooden train & rhythm cubes"
    },
    sakuraZen: {
      badge: "🌸 SAKURA ZEN · 130 BPM",
      short: "🌸 SAKURA ZEN",
      wall: "assets/worlds/pm_sakura_wall.jpg",
      monster: "assets/stickers/villain_sakura_pink_panda.png",
      titleFr: "Sakura Zen — Studio Fitness & Cerisiers (130 BPM)",
      titleEn: "Sakura Zen — Pink Cherry Blossom Studio (130 BPM)",
      subFr: "Panda Rose, Kitsune, arches de fleurs de cerisier & postures zen",
      subEn: "Pink Panda, Kitsune, cherry blossom arches & zen postures"
    },
    indianaTemple: {
      badge: "🏺 TEMPLE INDIANA · 136 BPM",
      short: "🏺 TEMPLE INDIANA",
      wall: "assets/worlds/pm_temple_wall.jpg",
      monster: "assets/stickers/villain_temple_idol.png",
      titleFr: "Temple Indiana — Ruines Aztèques (136 BPM)",
      titleEn: "Indiana Temple — Aztec Jungle Ruins (136 BPM)",
      subFr: "Idole Tiki dorée, boule géante de pierre & pieux suspendus",
      subEn: "Golden Tiki Idol, giant rolling boulder & ceiling spikes"
    },
    superHot: {
      badge: "💎 RED CRISTAL · 134 BPM",
      short: "💎 RED CRISTAL",
      wall: "assets/worlds/pm_superhot_wall.jpg",
      monster: "assets/stickers/villain_red_crystal_boxer.png",
      titleFr: "Red Cristal — Bunker de Cristal (134 BPM)",
      titleEn: "Red Crystal — Tactical Crystal Bunker (134 BPM)",
      subFr: "Boxeurs de cristal rubis, lasers bas & murs de verre fissurés",
      subEn: "Ruby crystal boxers, low lasers & cracked glass walls"
    },
    halloween: {
      badge: "🎃 HALLOWEEN · 132 BPM",
      short: "🎃 HALLOWEEN",
      wall: "assets/worlds/pm_halloween_wall.jpg",
      monster: "assets/stickers/villain_halloween_golem.png",
      titleFr: "Halloween — Manoir Hanté (132 BPM)",
      titleEn: "Halloween — Haunted Mansion Sprint (132 BPM)",
      subFr: "Golem Gargouille, fantômes farceurs & barrières de citrouilles",
      subEn: "Gargoyle Golem, spooky ghosts & pumpkin hurdles"
    },
    christmas: {
      badge: "🎄 NOËL EXPRESS · 135 BPM",
      short: "🎄 NOËL EXPRESS",
      wall: "assets/worlds/pm_christmas_wall.png",
      monster: "assets/stickers/villain_christmas_snowman.png",
      titleFr: "Noël Express — Village Enneigé (135 BPM)",
      titleEn: "Santa Village — Snowy Holiday Express (135 BPM)",
      subFr: "Bonhomme de neige boxeur, Casse-Noisette & traîneau de cadeaux",
      subEn: "Snowman boxer, Nutcracker soldier & holiday gift sleigh"
    }
  };

  const levelCatalog = {
    "0": {
      shortFr: "NIV. 00 TUTORIEL",
      shortEn: "LVL 00 TUTORIAL",
      tagFr: "🎓 TUTORIEL INTERACTIF DES 8 GESTES",
      tagEn: "🎓 INTERACTIVE 8-MOVE TUTORIAL"
    },
    "1": {
      shortFr: "NIV. 01 BOXE",
      shortEn: "LVL 01 BOXING",
      tagFr: "🥊 SPÉCIALITÉ : BOXE & CIBLES RYTHMÉES",
      tagEn: "🥊 SPECIALTY: BOXING & RHYTHM TARGETS"
    },
    "2": {
      shortFr: "NIV. 02 POSTURES",
      shortEn: "LVL 02 POSTURES",
      tagFr: "🧘 SPÉCIALITÉ : GYM & MURS DE POSTURE",
      tagEn: "🧘 SPECIALTY: GYM & POSTURE GATES"
    },
    "3": {
      shortFr: "NIV. 03 PARKOUR",
      shortEn: "LVL 03 PARKOUR",
      tagFr: "⚡️ SPÉCIALITÉ : PARKOUR, SAUTS & ÉTAGES",
      tagEn: "⚡️ SPECIALTY: PARKOUR, JUMPS & STAIRS"
    },
    "4": {
      shortFr: "NIV. 04 HYPER-MIX",
      shortEn: "LVL 04 HYPER-MIX",
      tagFr: "🔥 SPÉCIALITÉ : HYPER-MIX COMPLET",
      tagEn: "🔥 SPECIALTY: FULL HYPER-MIX"
    },
    "5": {
      shortFr: "NIV. 05 CLOCKWORK (140 BPM)",
      shortEn: "LVL 05 CLOCKWORK (140 BPM)",
      tagFr: "⚙️ BEATFIT 140 BPM : BOXE HAUTE CADENCE",
      tagEn: "⚙️ BEATFIT 140 BPM: HIGH-TEMPO BOXING"
    },
    "6": {
      shortFr: "NIV. 06 BLACK ICE (133 BPM)",
      shortEn: "LVL 06 BLACK ICE (133 BPM)",
      tagFr: "🧊 BEATFIT 133 BPM : SLALOM & ESQUIVES",
      tagEn: "🧊 BEATFIT 133 BPM: SLALOM & DODGES"
    },
    "7": {
      shortFr: "NIV. 07 SHORELINE (121 BPM)",
      shortEn: "LVL 07 SHORELINE (121 BPM)",
      tagFr: "☀️ BEATFIT 121 BPM : POSTURES & GROOVE",
      tagEn: "☀️ BEATFIT 121 BPM: POSTURES & GROOVE"
    },
    "8": {
      shortFr: "NIV. 08 CROWN ARENA (142 BPM)",
      shortEn: "LVL 08 CROWN ARENA (142 BPM)",
      tagFr: "👑 FIT INTENSE 142 BPM : ARÈNE ULTIME",
      tagEn: "👑 FIT INTENSE 142 BPM: ULTIMATE ARENA"
    }
  };

  const diffCatalog = {
    chill: { label: "EASY (~38 OBS)", obs: 38 },
    normal: { label: "NORMAL (~65 OBS)", obs: 65 },
    fast: { label: "HARD (~100 OBS)", obs: 100 },
    turbo: { label: "EXPERT+ (~145 OBS)", obs: 145 }
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
      console_header: "SÉLECTEUR DE COURSE · COMME DANS L'APP",
      console_handsfree: "🥊 Sélection au doigt ou au coup de poing à 2m",
      tuto_title: "PREMIÈRE FOIS ? LANCE LE TUTORIEL (NIV. 00)",
      tuto_sub: "Pose l'iPhone à 2m et valide les 8 gestes en 1 minute",
      tuto_btn: "TUTO ➔",
      tab_1_label: "1. MONDE 3D (6)",
      tab_2_label: "2. NIVEAU & MUSIQUE (8)",
      tab_3_label: "3. DIFFICULTÉ & SALON",
      step1_heading: "CHOISIS TON UNIVERS 3D :",
      step1_hint: "Clique sur un monde pour voir son couloir et ses monstres",
      badge_free: "GRATUIT",
      w_toy_sub: "Chambre des jouets · Chat Maine Coon & Robot",
      w_sakura_sub: "Studio rose & cerisiers · Kitsune & Panda",
      w_temple_title: "TEMPLE INDIANA",
      w_temple_sub: "Boule géante, pieux & Gardien Tiki",
      w_red_sub: "Bunker de cristal · Boxeurs Rubis & Lasers",
      w_hal_sub: "Manoir hanté · Fantômes & Golem de pierre",
      w_xmas_title: "NOËL EXPRESS",
      w_xmas_sub: "Village enneigé · Bonhomme & Casse-Noisette",
      step2_heading: "CHOISIS TON NIVEAU & SA SPÉCIALITÉ :",
      step2_hint: "Chaque niveau oriente la chorégraphie (Boxe, Postures, Parkour ou Mix)",
      lvl_1_name: "RYTHME & BOXE",
      lvl_1_desc: "Vilains G/C/D, Cubes Rythmés & Murs Fissurés",
      lvl_2_name: "GYM & POSTURES",
      lvl_2_desc: "Murs de Posture Néon, Squats & Auto-Avance",
      lvl_3_name: "PARKOUR MULTI-ÉTAGES",
      lvl_3_desc: "Piliers 3 voies, Sauts, Squats & Étages +1/+2/+3",
      lvl_4_name: "HYPER-MIX FINAL",
      lvl_4_desc: "Combinaison totale Boxe + Postures + Parkour",
      lvl_5_desc: "Boxe industrielle haute cadence & rafales 2 mains",
      lvl_6_desc: "Slalom latéral rapide, murs de glace & esquives",
      lvl_7_desc: "Groove cardio fluide, 10 postures & sauts rythmés",
      lvl_8_desc: "Le défi ultime : 142 BPM, drops & combos complets",
      step3_heading: "CHOISIS LA DIFFICULTÉ (DENSITÉ D'OBSTACLES SUR LA MUSIQUE) :",
      step3_hint: "La vitesse reste confortable : c'est la densité de monstres, sauts et postures sur le beat qui augmente !",
      diff_1_desc: "1 obstacle tous les 4 temps · 4 postures faciles · Idéal débutant & enfants",
      diff_2_desc: "Cadence arcade rythmée · 7 postures · Alternance gauche/droite sur le beat",
      diff_3_desc: "Combos 2 actions enchaînées · Les 10 postures · Plus de sauts, squats & monstres",
      diff_4_desc: "Rafales 3 actions sur chaque temps fort & bass drop · Score & cardio maximum",
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
      spec3_tag: "NIVEAUX 03 & 06 · PARKOUR & ÉVITEMENT",
      spec3_title: "Esquive sur 3 Voies, Saute & Grimpe les Étages",
      spec3_desc: "Décale ton corps à gauche, au centre ou à droite pour éviter les piliers, plie les genoux en vrai squat pour passer sous les poutres hautes, et saute pour franchir les barrières basses ou grimper aux étages supérieurs (+1, +2, +3).",
      spec4_tag: "SPRINT INTENSE & MODE FANTÔME",
      spec4_title: "Active le Turbo Run & Bats ton Fantôme 3D",
      spec4_desc: "Si tu t'arrêtes, le couloir ralentit. Mais si tu sprintes à fond en faisant travailler tes bras ET tes jambes très vite en même temps, tu déclenches le 🔥 TURBO RUN (+50% vitesse, points de distance x3) pour dépasser le Fantôme 3D de ton record !",
      poses_label: "LES 10 POSTURES DU JEU DÉTECTÉES PAR LA CAMÉRA :",
      poses_sub: "En difficulté EASY tu commences avec les 4 postures les plus simples, puis tu débloques les 7 et 10 postures en NORMAL, HARD et EXPERT+.",
      poses_autoglide: "⚡ POSTURE MAINTENUE ≥ 52% = AUTO-AVANCE ACTIVE !",
      caps_kicker: "CAPTURES D'ÉCRAN AUTHENTIQUES",
      caps_title: "L'INTERFACE EXACTE SUR iPHONE & iPAD",
      caps_desc: "Découvre le rendu 2.5D cartoon, le radar squelette Apple Vision en direct en bas de l'écran et les retours de score instantanés.",
      cap1_txt: "Cours pour faire avancer le monde et dépasse le Fantôme 3D de ton meilleur score.",
      cap2_txt: "Aligne tes bras dans la découpe néon pour faire exploser le mur et capturer ta photo.",
      cap3_txt: "Enchaîne les obstacles sans faute pour monter à x8 et brûler un maximum de calories.",
      cap4_txt: "Pulvérise les boss et les murs fissurés d'un direct du poing sur les drops de la musique.",
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
      f_1: "✓ Tutoriel Interactif des 8 Gestes (Niv. 00)",
      f_2: "✓ Monde Toy Kingdom (Niv. 01 + Teaser PRO 20s)",
      f_3: "✓ Difficultés EASY (~38 obs) & NORMAL (~65 obs)",
      f_4: "✓ Mode Solo, Photo Souvenir & Replay Finish",
      f_5: "🔒 Les 5 autres Mondes 3D & Niveaux 02 à 08",
      f_6: "🔒 Difficultés HARD (~100 obs) & EXPERT+ (~145 obs)",
      btn_dl_free: "⏳ Bientôt sur l'App Store",
      vip_ribbon: "👑 OFFRE LA PLUS POPULAIRE · ÉCONOMISE 50%",
      vip_name: "PASS ANNUEL PRO",
      vip_flex: "ou Pass Mensuel sans engagement à 4,99 €/mois",
      v_1: "✓ Les 6 Mondes 3D Complets (Toy, Sakura, Temple, Cristal, Halloween, Noël)",
      v_2: "✓ Tous les 8 Niveaux Spécialisés (Boxe, Postures, Parkour, BeatFit)",
      v_3: "✓ Les 4 Difficultés jusqu'à EXPERT+ (~145 obstacles sur le beat)",
      v_4: "✓ 26 Musiques Originales avec Détecteur de Drop Musical",
      v_5: "✓ Mode Tournoi Salon 2 à 4 Joueurs & Podium Photo 3D",
      v_6: "✓ Mode TV AirPlay 16:9 Haute Définition",
      btn_start_vip: "⏳ Bientôt disponible",
      life_badge: "PAIEMENT UNIQUE · ZÉRO ABONNEMENT",
      life_name: "ÉDITION INFINITY À VIE",
      life_sub: "une seule fois",
      l_1: "✓ Déblocage À Vie de tout BodyRush 3D PRO",
      l_2: "✓ Tous les 6 Mondes, 8 Niveaux, 4 Difficultés & 26 Musiques",
      l_3: "✓ Tournoi Salon 2 à 4 Joueurs & Podium Photo 3D",
      l_4: "✓ Toutes les futures mises à jour et nouveaux mondes inclus",
      l_5: "✓ Compatible Partage Familial Apple",
      btn_buy_life: "⏳ Bientôt disponible",
      priv_title: "Aucune image ne quitte jamais ton iPhone ou ton iPad",
      priv_desc: "La détection des 19 articulations du corps s'exécute intégralement en local sur la puce Apple de ton appareil. Aucune vidéo, aucune photo et aucune donnée biométrique n'est envoyée sur un serveur externe. Le jeu fonctionne même en mode Avion.",
      priv_btn: "Consulter la Politique de Confidentialité",
      faq_1_q: "Quelle distance faut-il prévoir devant l'iPhone ou l'iPad ?",
      faq_1_a: "Pose ton iPhone ou ton iPad à environ 1,80 m – 2,50 m face à toi (sur une table basse, un meuble TV ou un support). Le guide de cadrage intelligent passe au vert dès que ta silhouette est bien visible.",
      faq_2_q: "Quels appareils sont compatibles ?",
      faq_2_a: "Tous les iPhone sous iOS 17+ (iPhone 11, 12, 13, 14, 15, 16) et tous les iPad sous iPadOS 17+ équipés d'une puce A12Z, A14 Bionic ou Apple Silicon (M1, M2, M4).",
      faq_3_q: "Comment fonctionne la difficulté façon Beat Saber ?",
      faq_3_a: "La vitesse d'approche reste toujours naturelle et lisible : passer de EASY (~38 obstacles) à NORMAL (~65), HARD (~100) ou EXPERT+ (~145) augmente le nombre de monstres, de sauts, de squats et de postures synchronisés sur les temps forts de la musique.",
      footer_bio: "Conçu et développé en France par Xavier Larrodé. Tous droits réservés © 2026 BodyRush.",
      footer_priv_pol: "Confidentialité"
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
      console_header: "COURSE SELECTOR · JUST LIKE IN THE APP",
      console_handsfree: "🥊 Select by touch or throw a punch from 2m away",
      tuto_title: "FIRST TIME? START THE TUTORIAL (LVL 00)",
      tuto_sub: "Place iPhone 2m away & test all 8 moves in 1 minute",
      tuto_btn: "TUTO ➔",
      tab_1_label: "1. 3D WORLD (6)",
      tab_2_label: "2. LEVEL & MUSIC (8)",
      tab_3_label: "3. DIFFICULTY & PARTY",
      step1_heading: "CHOOSE YOUR 3D WORLD:",
      step1_hint: "Click any world to preview its corridor and monsters",
      badge_free: "FREE",
      w_toy_sub: "Toy room hallway · Maine Coon Cat & Robot",
      w_sakura_sub: "Pink zen studio · Kitsune & Pink Panda",
      w_temple_title: "INDIANA TEMPLE",
      w_temple_sub: "Giant boulder, spikes & Tiki Guardian",
      w_red_sub: "Crystal bunker · Ruby Boxers & Lasers",
      w_hal_sub: "Haunted mansion · Ghosts & Gargoyle Golem",
      w_xmas_title: "SANTA VILLAGE",
      w_xmas_sub: "Snowy village · Snowman & Nutcracker",
      step2_heading: "CHOOSE YOUR LEVEL & SPECIALTY:",
      step2_hint: "Each level tailors the choreography (Boxing, Postures, Parkour or Mix)",
      lvl_1_name: "RHYTHM & BOXING",
      lvl_1_desc: "L/C/R Villains, Rhythm Cubes & Cracked Walls",
      lvl_2_name: "GYM & POSTURES",
      lvl_2_desc: "Neon Posture Gates, Squats & Auto-Glide",
      lvl_3_name: "MULTI-FLOOR PARKOUR",
      lvl_3_desc: "3-Lane Pillars, Jumps, Squats & +1/+2/+3 Stairs",
      lvl_4_name: "FINAL HYPER-MIX",
      lvl_4_desc: "Complete combination of Boxing + Poses + Parkour",
      lvl_5_desc: "High-tempo industrial boxing & 2-hand flurries",
      lvl_6_desc: "Fast lateral slalom, ice walls & dodges",
      lvl_7_desc: "Smooth cardio groove, 10 poses & rhythmic jumps",
      lvl_8_desc: "The ultimate challenge: 142 BPM, drops & full combos",
      step3_heading: "CHOOSE DIFFICULTY (MUSICAL OBSTACLE DENSITY):",
      step3_hint: "Approach speed stays comfortable: difficulty scales the density of monsters, jumps and poses on the beat!",
      diff_1_desc: "1 obstacle every 4 beats · 4 easy poses · Best for beginners & kids",
      diff_2_desc: "Balanced arcade cadence · 7 poses · Left/right beat alternation",
      diff_3_desc: "2-step chained combos · All 10 poses · More jumps, squats & monsters",
      diff_4_desc: "3-step flurries on every accent & bass drop · Maximum score & cardio",
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
      spec3_tag: "LEVELS 03 & 06 · PARKOUR & DODGING",
      spec3_title: "Dodge Across 3 Lanes, Jump & Climb Floors",
      spec3_desc: "Step left, center or right to dodge side pillars, drop into a real squat to duck under overhead beams, and jump to clear low hurdles or climb 3D stairs (+1, +2, +3).",
      spec4_tag: "FAST SPRINT & GHOST MODE",
      spec4_title: "Trigger Turbo Run & Beat Your 3D Ghost",
      spec4_desc: "Stop moving and the corridor slows down. Pump BOTH arms and BOTH legs fast simultaneously to trigger 🔥 TURBO RUN (+50% speed, 3x distance points) and overtake your personal best 3D Ghost!",
      poses_label: "ALL 10 CAMERA-TRACKED BODY POSTURES:",
      poses_sub: "Start with 4 intuitive postures in EASY, then unlock 7 and all 10 postures in NORMAL, HARD and EXPERT+.",
      poses_autoglide: "⚡ POSE HELD ≥ 52% = AUTO-GLIDE ACTIVE!",
      caps_kicker: "AUTHENTIC IN-GAME CAPTURES",
      caps_title: "THE EXACT INTERFACE ON iPHONE & iPAD",
      caps_desc: "See the 2.5D cartoon rendering, the live Apple Vision skeleton radar at the bottom of the screen and instant score callouts.",
      cap1_txt: "Run to drive the corridor forward and overtake the 3D Ghost of your best score.",
      cap2_txt: "Align your arms inside the neon cutout to shatter the gate and snap your souvenir photo.",
      cap3_txt: "Chain obstacles flawlessly to reach the x8 multiplier and burn maximum calories.",
      cap4_txt: "Smash bosses and cracked crystal walls with a straight punch right on musical bass drops.",
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
      f_1: "✓ Interactive 8-Move Gesture Tutorial (Lvl 00)",
      f_2: "✓ Toy Kingdom World (Lvl 01 + 20s PRO Teaser)",
      f_3: "✓ EASY (~38 obs) & NORMAL (~65 obs) Difficulties",
      f_4: "✓ Solo Mode, Souvenir Photo & Finish Replay",
      f_5: "🔒 Remaining 5 3D Worlds & Levels 02 to 08",
      f_6: "🔒 HARD (~100 obs) & EXPERT+ (~145 obs) Difficulties",
      btn_dl_free: "⏳ Coming Soon on App Store",
      vip_ribbon: "👑 MOST POPULAR · SAVE 50%",
      vip_name: "ANNUAL PRO PASS",
      vip_flex: "or Monthly Flex Pass at €4.99/month",
      v_1: "✓ All 6 Complete 3D Worlds (Toy, Sakura, Temple, Crystal, Halloween, Santa)",
      v_2: "✓ All 8 Specialized Levels (Boxing, Postures, Parkour, BeatFit)",
      v_3: "✓ All 4 Difficulties up to EXPERT+ (~145 obstacles on the beat)",
      v_4: "✓ 26 Original Tracks with Live Bass-Drop Detector",
      v_5: "✓ 2-to-4 Player Party Tournament & 3D Photo Podium",
      v_6: "✓ High-Definition 16:9 AirPlay TV Mode",
      btn_start_vip: "⏳ Coming Soon",
      life_badge: "ONE-TIME PAYMENT · ZERO SUBSCRIPTION",
      life_name: "INFINITY LIFETIME EDITION",
      life_sub: "one time",
      l_1: "✓ Lifetime Unlock of all BodyRush 3D PRO content",
      l_2: "✓ All 6 Worlds, 8 Levels, 4 Difficulties & 26 Tracks",
      l_3: "✓ 2-to-4 Player Party Tournament & 3D Photo Podium",
      l_4: "✓ All future updates and new worlds included",
      l_5: "✓ Apple Family Sharing supported",
      btn_buy_life: "⏳ Coming Soon",
      priv_title: "Zero images ever leave your iPhone or iPad",
      priv_desc: "19-joint body pose tracking runs 100% locally on your device's Apple Neural Engine. No video, no photos and no biometric data are ever uploaded to external servers. Works even in Airplane Mode.",
      priv_btn: "Read the Privacy Policy",
      faq_1_q: "How much space do I need in front of my iPhone or iPad?",
      faq_1_a: "Place your iPhone or iPad about 6 to 8 feet (1.8m – 2.5m) in front of you on a coffee table, TV stand or tripod. The smart framing guide turns green as soon as your full body is visible.",
      faq_2_q: "Which devices are supported?",
      faq_2_a: "All iPhones running iOS 17+ (iPhone 11, 12, 13, 14, 15, 16) and all iPads running iPadOS 17+ with A12Z, A14 Bionic or Apple Silicon (M1, M2, M4).",
      faq_3_q: "How does the Beat Saber-style difficulty work?",
      faq_3_a: "Approach speed stays natural and readable: moving from EASY (~38 obstacles) to NORMAL (~65), HARD (~100) or EXPERT+ (~145) increases the density of monsters, jumps, squats and posture gates synced to the musical beat.",
      footer_bio: "Designed and built in France by Xavier Larrodé. All rights reserved © 2026 BodyRush.",
      footer_priv_pol: "Privacy"
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
    tutoBanner.addEventListener("click", () => {
      selectedLevel = "0";
      selectedDiff = "normal";
      refreshConsoleAndViewport();
      setStep(3);
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

  if (heroVideo && soundBtn && soundLabel) {
    soundBtn.addEventListener("click", () => {
      heroVideo.muted = !heroVideo.muted;
      soundLabel.textContent = heroVideo.muted ? "🔇 SON OFF" : "🔊 SON ON";
    });
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
    if (langFlag) langFlag.textContent = lang === "fr" ? "🇫🇷" : "🇬🇧";
    if (langCode) langCode.textContent = lang.toUpperCase();
    refreshConsoleAndViewport();
  }

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyLanguage(currentLang === "fr" ? "en" : "fr");
    });
  }

  refreshConsoleAndViewport();
});
