/**
 * BodyRush Official Website — Core Interactive Logic
 * Features:
 * - Bilingual Switcher (FR / EN) with persistent storage
 * - 6 Worlds Interactive 3D Explorer
 * - Video Sound Controls & Live HUD Simulation
 * - Mobile Navigation Drawer
 * - Telemetry Stat Counter Animations
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. BILINGUAL TRANSLATION DICTIONARY (FR / EN)
  // =========================================================================
  const i18n = {
    fr: {
      nav_gameplay: "Le Jeu",
      nav_worlds: "6 Mondes",
      nav_how: "Comment Jouer",
      nav_airplay: "AirPlay TV",
      nav_pricing: "Pass VIP",
      cta_dl_top: "Télécharger sur",

      hero_chip: "100% VISION CAMERA TRACKING • SANS MANETTE NI CASQUE",
      hero_title_1: "TON CORPS EST LA MANETTE.",
      hero_title_2: "COURS, ESQUIVE & BOXE EN 3D.",
      hero_desc: "Pose ton iPhone ou ton iPad à 2 mètres, lance le jeu et transpire ! BodyRush transforme instantanément tes mouvements réels en jeu d'arcade 3D survitaminé grâce à l'intelligence artificielle Apple Vision.",
      hero_btn_sub: "Téléchargement Gratuit",
      hero_btn_main: "Obtenir BodyRush",
      hero_btn_demo: "Voir Comment Jouer",

      pill_1: "Boxe & Esquive Réelle",
      pill_2: "Mode Turbo Run (x3 PTS)",
      pill_3: "AirPlay TV 16:9 4K",

      hud_pose: "POSE OK ✓",

      stat_1_title: "Vision Caméra",
      stat_1_sub: "Zéro manette, zéro capteur",
      stat_2_title: "Articulations 3D",
      stat_2_sub: "Tracking squelette en temps réel",
      stat_3_title: "Mondes 3D & 8 Niveaux",
      stat_3_sub: "Du tutoriel aux boss épiques",
      stat_4_title: "Latence On-Device",
      stat_4_sub: "60 FPS sans passer par le cloud",

      pillar_badge: "MÉCANIQUES D'ARCADE SURVITAMINÉES",
      pillar_title: "POURQUOI BODYRUSH TE FAIT TRANSPIRER",
      pillar_desc: "Pas de répétitions ennuyeuses. Ici, chaque mouvement physique déclenche un impact explosif en 3D dans le jeu.",

      card_1_title: "🥊 Boxe Poings & Pieds + Ralenti Matrix",
      card_1_desc: "Frappe les boss en 3D et pulvérise les murs de cristal fissuré avec tes vrais poings 👊 ou tes pieds 🦵 ! À l'approche d'un boss, le temps ralentit façon Matrix pour préparer ton coup décisif.",
      card_2_title: "⚡ Mode Turbo Run (Vitesse +50% & PTS x3)",
      card_2_desc: "Sprinte vite sur place en bougeant bras et jambes simultanément pour déclencher le badge BD TURBO RUN ! : +50% de vitesse, points de course x3 et Bonus Temps à l'arrivée.",
      card_3_title: "✨ 10 Murs de Postures Néon",
      card_3_desc: "Prends la pose exacte avant l'impact : Mains en l'air (V), T-Pose, Double Biceps Gym, Garde de Boxe, Squat Bouclier, Disco 🕺, Pharaon Croisé 🙅 ou Superman 🦸 !",
      card_4_title: "🔥 Esquive 3 Voies, Squats, Sauts & Étages 3D",
      card_4_desc: "Décale-toi à gauche ou à droite sur les 3 voies, baisse-toi sous les poutres hautes (BAISSE-TOI ↓), saute les barrières basses (SAUTE ↑) et grimpe les marches d'étages en 3D !",

      captures_badge: "CAPTURES 100% IN-GAME",
      captures_title: "L'ACTION EN DIRECT SUR TON ÉCRAN",
      cap_1_title: "Course 3D & Squelette Vision",
      cap_1_sub: "Tracking temps réel 19 articulations sans capteur",
      cap_2_title: "Murs de Postures Néon",
      cap_2_sub: "Double Biceps Gym • Validation +50% Vitesse",
      cap_3_title: "Mode Turbo Run & Boss 3D",
      cap_3_sub: "Sprint bras + jambes (PTS x3) & Ralenti Matrix",
      cap_4_title: "Impact Cristal (Poings 👊 / Pieds 🦵)",
      cap_4_sub: "Pulvérise les murs fissurés d'un coup direct",

      worlds_badge: "6 UNIVERS DÉJANTÉS",
      worlds_title: "EXPLORE LES 6 MONDES 3D & LES BOSS",
      worlds_desc: "Chaque monde possède son propre univers 3D, sa difficulté, ses musiques rythmées et son boss unique à terrasser.",
      feat_boss: "Boss :",
      feat_music: "Style Musical :",
      feat_obstacles: "Obstacles :",
      world_btn: "Débloquer Tous les Mondes",

      how_badge: "SIMPLE & INSTANTANÉ",
      how_title: "PRÊT EN 30 SECONDES CHRONO",
      how_desc: "Aucun capteur à charger, aucun casque lourd qui donne la nausée. Ton salon devient ta salle d'arcade en 3 étapes.",
      step_1_title: "Pose ton Appareil",
      step_1_desc: "Pose ton iPhone ou ton iPad sur une table basse, un meuble TV ou un support à environ 1,80m à 2,50m de toi, orienté vers toi.",
      step_2_title: "Recule dans le Cadre",
      step_2_desc: "Le guide de calibrage intelligent à l'écran valide ta position en vert en moins d'une seconde. Pas de calibration fastidieuse.",
      step_3_title: "Bouge, Esquive & Boxe !",
      step_3_desc: "Lance la course ! Cours, saute, baisse-toi et tape sur les cibles 3D. Regarde tes calories brûlées s'accumuler en direct.",

      airplay_badge: "EXPÉRIENCE SALON 4K",
      airplay_title: "JOUE EN 16:9 SUR TA TV SANS AUCUN FIL",
      airplay_desc: "En un clic sur le bouton AirPlay, projette BodyRush sur ta TV en vrai 16:9 (1080p / 4K à 60 FPS avec anticrénelage 4× MSAA). Pendant que la TV affiche le couloir 3D grand spectacle, ton iPhone bascule automatiquement en mode « 📱 Cockpit Squelette » basse consommation !",
      airplay_p1_strong: "Double Écran Intelligent :",
      airplay_p1_sub: "Rendu 3D 16:9 plein écran sur la TV et Cockpit Squelette ultra-fluide sur l'iPhone ou l'iPad.",
      airplay_p2_strong: "Zéro Matériel Coûteux :",
      airplay_p2_sub: "Économise 500 € par rapport à un casque VR ou une console avec caméra dédiée.",
      airplay_p3_strong: "Parfait pour Jouer en Groupe :",
      airplay_p3_sub: "Toute la famille profite du spectacle sur grand écran et s'affronte en Tournoi Salon de 2 à 4 joueurs.",
      airplay_note: "Compatible Apple TV, Smart TV AirPlay 2 & Mac",

      multi_badge: "JOUER ENSEMBLE",
      multi_title: "TOURNOI SALON 2 À 4 JOUEURS & PODIUM PHOTO 3D",
      multi_desc: "Transforme tes soirées entre amis et tes dimanches en famille en véritables olympiades du cardio et du fou rire dans le salon.",
      mode_1_title: "Solo Cardio, 4 Difficultés & Records",
      mode_1_desc: "Entraîne-toi sur les 8 niveaux spécialisés (Boxe, Postures, Parkour, Mix) avec 4 niveaux de difficulté (EASY ~38 obs, NORMAL ~65 obs, HARD ~100 obs, EXPERT+ ~145 obs synchronisés sur la musique).",
      mode_1_badge: "1 Joueur • Quotidien",
      mode_2_title: "Tournoi Salon 2 à 4 Joueurs",
      mode_2_desc: "Affrontez-vous de 2 à 4 joueurs chacun son tour devant la caméra ! Le jeu compare vos scores, vos combos et votre vitesse en direct jusqu'à la manche finale.",
      mode_2_badge: "2 à 4 Joueurs • Chacun son Tour",
      mode_3_title: "Podium Photo 3D & Replay Vidéo",
      mode_3_desc: "Une photo souvenir est prise automatiquement sur ta meilleure posture ! Découvre le Podium 3D des vainqueurs, ta Carte Souvenir et le Replay Vidéo du sprint final.",
      mode_3_badge: "Photo & Vidéo • Partage",

      music_badge: "RYTHME & ENTRAÎNEMENT",
      music_title: "26 MUSIQUES ORIGINALES & DÉTECTEUR DE DROP MUSICAL",
      music_desc: "Chaque monde possède ses propres pistes énergisantes composées sur mesure pour caler tes pas et tes coups sur le beat : Cyber Electro, Japanese Trap, Epic Orchestral, Synthwave rétro et Holiday Beats.",
      mp3_strong: "Chorégraphie sur le Beat Musical & 4 Niveaux de Difficulté !",
      mp3_desc: "L'analyseur rythmique cale chaque cible, saut, squat et mur de posture sur les temps forts et les drops de la musique ! Choisis parmi 4 difficultés : EASY (~38 obs), NORMAL (~65 obs), HARD (~100 obs) ou EXPERT+ (~145 obs).",

      pricing_badge: "MODÈLE FREEMIUM TRANSPARENT",
      pricing_title: "COMMENCE GRATUITEMENT, DÉBLOQUE TOUT SANS ENGAGEMENT",
      pricing_desc: "Télécharge l'application gratuitement, teste le tracking chez toi pendant le tutoriel et choisis l'offre adaptée à tes entraînements.",

      plan_free_name: "DÉCOUVERTE GRATUITE",
      plan_free_sub: "Pour toujours",
      plan_free_desc: "Idéal pour tester le tracking de ta caméra et faire tes premiers pas dans le salon.",
      pfree_1: "Tutoriel Interactif Complet (LVL 00)",
      pfree_2: "Monde 3D Toy Kingdom (LVL 01 + Teaser PRO 20s)",
      pfree_3: "3 Musiques Originales Gratuites",
      pfree_4: "Mode Solo, Photo Souvenir & Replay Finish",
      pfree_5: "Tous les 6 Mondes 3D & 8 Niveaux Complets",
      pfree_6: "Tournoi Salon 2 à 4 Joueurs & 26 Musiques",
      btn_dl_free: "Télécharger Gratuitement",

      plan_vip_ribbon: "ESSAI GRATUIT 7 JOURS • ÉCONOMISE 50%",
      plan_vip_name: "PASS ANNUEL VIP PRO",
      plan_vip_desc: "Seulement 2,49 €/mois (ou Pass Mensuel Flex à 4,99 €/mois). La routine cardio et fun idéale pour toute la famille.",
      pvip_1: "Accès Intégral aux 6 Mondes 3D",
      pvip_2: "Tous les 8 Niveaux & 4 Difficultés (jusqu'à EXPERT+ ~145 obstacles)",
      pvip_3: "26 Musiques Originales & Sync Drop Musical",
      pvip_4: "Mode Tournoi Salon 2 à 4 Joueurs",
      pvip_5: "Podium Photo 3D, Carte Souvenir & Replay Vidéo",
      pvip_6: "Mode TV AirPlay 16:9 Haute Définition",
      btn_start_vip: "Essayer 7 Jours Gratuitement",

      plan_life_name: "DÉBLOCAGE À VIE",
      plan_life_sub: "Paiement unique",
      plan_life_desc: "Achat définitif en une seule fois. Possède le jeu à vie sans aucun abonnement récurrent.",
      plife_1: "Déblocage À Vie de Tout le Contenu",
      plife_2: "Toutes les Mises à Jour Futures Incluses",
      plife_3: "Tous les 6 Mondes, 8 Niveaux & 26 Musiques",
      plife_4: "Tournoi Salon 2 à 4 Joueurs & Podium Photo 3D",
      plife_5: "Partage Familial Apple Inclus",
      btn_buy_life: "Débloquer À Vie",

      priv_title: "100% On-Device Neural Engine : Ta Vie Privée est Protégée",
      priv_desc: "BodyRush utilise exclusivement les capacités de calcul local de la puce Apple de ton iPhone ou iPad. Aucune vidéo, aucune photo ni aucune donnée corporelle n'est jamais enregistrée, transmise ou analysée sur des serveurs distants. Tu peux même jouer en mode Avion.",
      priv_btn: "Lire la Politique de Confidentialité →",

      faq_badge: "QUESTIONS FRÉQUENTES",
      faq_title: "TOUT CE QUE TU VEUX SAVOIR",
      faq_1_q: "Ai-je besoin d'une manette ou d'un casque VR ?",
      faq_1_a: "Non, absolument aucun ! C'est la force de BodyRush : la caméra grand-angle avant de ton iPhone ou iPad capture l'intégralité de tes mouvements en temps réel grâce au framework Apple Vision Body Tracking. Tu as seulement besoin de ton appareil et d'un peu d'espace.",
      faq_2_q: "Quelle distance est recommandée entre moi et l'écran ?",
      faq_2_a: "Une distance d'environ 1,80 mètre à 2,50 mètres est idéale pour que la caméra puisse voir ton corps de la tête aux genoux. Si tu projettes sur ta TV via AirPlay, tu peux poser ton iPhone sur ton meuble TV face à toi et regarder ton grand écran.",
      faq_3_q: "Quels sont les appareils iPhone et iPad compatibles ?",
      faq_3_a: "BodyRush fonctionne sur tous les iPhone compatibles iOS 17 ou iOS 18 (à partir de l'iPhone 11, optimisé pour iPhone 12, 13, 14, 15, 16) ainsi que sur les iPad sous iPadOS 17+ (équipés de puces A12Z, A14 Bionic ou Apple Silicon M1, M2, M4).",
      faq_4_q: "Est-ce adapté aux enfants et à la famille ?",
      faq_4_a: "Oui, à 100 % ! L'univers cartoon 3D (Toy Kingdom, Sakura Zen, Noël Express) est ultra convivial, sans violence réaliste. Le mode Tournoi Salon de 2 à 4 Joueurs (chacun son tour) avec son Podium Photo 3D et son Replay Vidéo Finish est spécialement pensé pour les défis en famille.",
      faq_5_q: "Comment fonctionne le mode AirPlay sur la TV ?",
      faq_5_a: "Il te suffit de toucher l'icône AirPlay directement dans l'application et de sélectionner ton Apple TV ou ta Smart TV compatible AirPlay 2. La TV affiche le couloir 3D en 16:9 1080p/4K à 60 FPS tandis que ton iPhone passe automatiquement en mode « Cockpit Squelette » basse consommation.",

      final_title: "PRÊT À TRANSFORMER TON SALON EN SALLE D'ARCADE ?",
      final_desc: "Rejoins des milliers de joueurs qui s'amusent et transpirent chaque jour sans aucun accessoire.",
      final_btn_sub: "Disponible sur iPhone & iPad",
      final_btn_main: "Télécharger Gratuitement sur l'App Store",

      footer_bio: "Jeu d'arcade, de fitness et de boxe en 3D piloté à 100% par la caméra de l'iPhone et l'iPad. Conçu et développé en France par Xavier Larrodé.",
      footer_game: "Le Jeu",
      footer_legal: "Légal & Confidentialité",
      footer_privacy: "Politique de Confidentialité",
      footer_terms: "Conditions Générales d'Utilisation",
      footer_support: "Support & Presse"
    },

    en: {
      nav_gameplay: "Gameplay",
      nav_worlds: "6 Worlds",
      nav_how: "How to Play",
      nav_airplay: "AirPlay TV",
      nav_pricing: "VIP Pass",
      cta_dl_top: "Download on",

      hero_chip: "100% VISION CAMERA TRACKING • ZERO CONTROLLER OR VR HEADSET",
      hero_title_1: "YOUR BODY IS THE CONTROLLER.",
      hero_title_2: "RUN, DODGE & BOX IN 3D.",
      hero_desc: "Place your iPhone or iPad 6 feet away, jump in and sweat! BodyRush transforms your real body movements into a high-energy 3D arcade workout powered by Apple Vision AI.",
      hero_btn_sub: "Free Download",
      hero_btn_main: "Get BodyRush",
      hero_btn_demo: "See How to Play",

      pill_1: "Real Boxing & Dodging",
      pill_2: "Turbo Run Mode (x3 PTS)",
      pill_3: "AirPlay TV 16:9 4K",

      hud_pose: "POSE OK ✓",

      stat_1_title: "Camera Vision",
      stat_1_sub: "Zero controller, zero wearable",
      stat_2_title: "3D Body Joints",
      stat_2_sub: "Real-time skeleton tracking",
      stat_3_title: "6 3D Worlds & 8 Levels",
      stat_3_sub: "From tutorial to epic bosses",
      stat_4_title: "On-Device Latency",
      stat_4_sub: "60 FPS with zero cloud lag",

      pillar_badge: "HIGH-ENERGY ARCADE MECHANICS",
      pillar_title: "WHY BODYRUSH MAKES FITNESS ADDICTIVE",
      pillar_desc: "No boring workout repetitions. Every real physical movement triggers an explosive 3D reaction in the game.",

      card_1_title: "🥊 Fists & Kicks + Bullet-Time Slow-Mo",
      card_1_desc: "Smash 3D bosses and shatter cracked crystal walls with your real fists 👊 or kicks 🦵! When a boss gets close, Bullet-Time slow-motion kicks in so you can land the decisive strike.",
      card_2_title: "⚡ Turbo Run Mode (+50% Speed & x3 PTS)",
      card_2_desc: "Sprint fast in place moving both arms and legs simultaneously to trigger the comic-book TURBO RUN! badge: +50% speed, x3 running points, and a Finish Time Bonus.",
      card_3_title: "✨ 10 Neon Posture Gates",
      card_3_desc: "Strike the exact pose before impact: Hands Up (V), T-Pose, Double Biceps Gym, Boxing Guard, Shield Squat, Disco 🕺, Pharaoh Cross 🙅, or Superman 🦸!",
      card_4_title: "🔥 3-Lane Dodge, Squats, Jumps & 3D Stairs",
      card_4_desc: "Sidestep left or right across 3 lanes, squat under high beams (DUCK ↓), leap over low hurdles (JUMP ↑), and jump up 3D floor stairs!",

      captures_badge: "100% IN-GAME CAPTURES",
      captures_title: "LIVE ARCADE ACTION ON YOUR SCREEN",
      cap_1_title: "3D Run & Vision Skeleton",
      cap_1_sub: "Real-time 19-joint tracking with zero sensors",
      cap_2_title: "Neon Posture Gates",
      cap_2_sub: "Double Biceps Gym • Instant +50% Speed boost",
      cap_3_title: "Turbo Run Mode & 3D Bosses",
      cap_3_sub: "Arms + legs sprint (PTS x3) & Bullet-Time",
      cap_4_title: "Crystal Impact (Fists 👊 / Kicks 🦵)",
      cap_4_sub: "Shatter brittle crystal walls with one strike",

      worlds_badge: "6 IMMERSIVE WORLDS",
      worlds_title: "EXPLORE THE 6 3D WORLDS & BOSSES",
      worlds_desc: "Each world features its own vibrant 3D aesthetic, difficulty curve, soundtrack beat and unique villain to beat.",
      feat_boss: "Boss Target:",
      feat_music: "Soundtrack Style:",
      feat_obstacles: "Obstacles:",
      world_btn: "Unlock All 6 Worlds",

      how_badge: "INSTANT & SIMPLE",
      how_title: "READY IN UNDER 30 SECONDS",
      how_desc: "No bulky VR headsets causing motion sickness, no accessories to charge. Your living room becomes your arcade in 3 steps.",
      step_1_title: "Set Down Your Device",
      step_1_desc: "Place your iPhone or iPad on a coffee table, TV console or stand about 6 to 8 feet away, angled towards you.",
      step_2_title: "Step Into the Frame",
      step_2_desc: "The smart calibration guide on screen validates your stance in green in under one second. Zero calibration hassle.",
      step_3_title: "Move, Duck & Punch!",
      step_3_desc: "Start your run! Sprint, jump, squat and smash 3D targets. Watch your burned calories accumulate live on screen.",

      airplay_badge: "4K LIVING ROOM ARCADE",
      airplay_title: "PLAY IN 16:9 ON YOUR TV WIRELESSLY",
      airplay_desc: "With a single tap on the AirPlay button, beam BodyRush to your Apple TV or AirPlay 2 Smart TV in true 16:9 (1080p / 4K at 60 FPS with 4× MSAA). While your TV displays the full 3D corridor, your iPhone automatically switches to the low-power '📱 Skeleton Cockpit' view!",
      airplay_p1_strong: "Smart Dual-Screen:",
      airplay_p1_sub: "Full-screen 16:9 3D rendering on your TV and an ultra-responsive Skeleton Cockpit on your iPhone or iPad.",
      airplay_p2_strong: "Zero Expensive Gear:",
      airplay_p2_sub: "Save $500 compared to a VR headset or camera-based home console.",
      airplay_p3_strong: "Built for Family & Friends:",
      airplay_p3_sub: "Everyone in the room enjoys the big-screen spectacle and competes in 2-to-4 player Party Tournaments.",
      airplay_note: "Compatible with Apple TV, Smart TV AirPlay 2 & Mac",

      multi_badge: "PLAY TOGETHER",
      multi_title: "2-TO-4 PLAYER PARTY TOURNAMENT & 3D PHOTO PODIUM",
      multi_desc: "Turn game nights with friends and family weekends into exhilarating tournaments full of laughs and calorie burning.",
      mode_1_title: "Solo Cardio, 4 Difficulties & High Scores",
      mode_1_desc: "Work out across 8 specialized levels (Boxing, Postures, Parkour, Full Mix) with 4 difficulty tiers (EASY ~38 obs, NORMAL ~65 obs, HARD ~100 obs, EXPERT+ ~145 obs synced to the beat).",
      mode_1_badge: "1 Player • Daily Cardio",
      mode_2_title: "2 to 4 Player Party Tournament",
      mode_2_desc: "Compete with 2 to 4 players taking turns in front of the camera! The game tracks scores, combos and speed live up to the final round.",
      mode_2_badge: "2-4 Players • Pass & Play",
      mode_3_title: "3D Photo Podium & Finish Video Replay",
      mode_3_desc: "A souvenir photo is snapped automatically on your best posture gate! Enjoy the 3D Winners Podium, Souvenir Card and Finish Line Video Replay.",
      mode_3_badge: "Photo & Video • Share",

      music_badge: "BEAT & RHYTHM",
      music_title: "26 ORIGINAL TRACKS & LIVE BEAT-DROP DETECTOR",
      music_desc: "Every world features high-tempo music custom composed to match your pace and strikes: Cyber Electro, Japanese Trap, Epic Orchestral, Retro Synthwave and Holiday Beats.",
      mp3_strong: "Musical Beat-Grid Choreography & 4 Difficulty Tiers!",
      mp3_desc: "Our rhythm analyzer aligns every target, jump, squat and posture gate right onto musical beats and bass drops! Choose from 4 difficulties: EASY (~38 obs), NORMAL (~65 obs), HARD (~100 obs) or EXPERT+ (~145 obs).",

      pricing_badge: "TRANSPARENT FREEMIUM",
      pricing_title: "START FREE, UNLOCK EVERYTHING WITH ZERO RISK",
      pricing_desc: "Download the app for free, test camera tracking in your living room during the tutorial and choose the option that fits your routine.",

      plan_free_name: "FREE STARTER",
      plan_free_sub: "Forever Free",
      plan_free_desc: "Ideal for testing your camera tracking and getting your first workouts in the living room.",
      pfree_1: "Complete Interactive Tutorial (LVL 00)",
      pfree_2: "Toy Kingdom 3D World (LVL 01 + 20s PRO Teaser)",
      pfree_3: "3 Original Free Soundtracks",
      pfree_4: "Solo Mode, Souvenir Photo & Finish Replay",
      pfree_5: "All 6 3D Worlds & 8 Complete Levels",
      pfree_6: "2-to-4 Player Party Tournament & 26 Tracks",
      btn_dl_free: "Download for Free",

      plan_vip_ribbon: "7-DAY FREE TRIAL • SAVE 50%",
      plan_vip_name: "VIP PRO ANNUAL PASS",
      plan_vip_desc: "Only €2.49/month (or Monthly Flex Pass at €4.99/month). The ultimate year-round home cardio routine for the whole family.",
      pvip_1: "Full Access to All 6 3D Worlds",
      pvip_2: "All 8 Complete Levels & 4 Difficulties (up to EXPERT+ ~145 obstacles)",
      pvip_3: "26 Original Soundtracks & Beat-Drop Sync",
      pvip_4: "2 to 4 Player Party Tournament Mode",
      pvip_5: "3D Photo Podium, Souvenir Card & Finish Replay",
      pvip_6: "High-Definition 16:9 AirPlay TV Mode",
      btn_start_vip: "Start 7-Day Free Trial",

      plan_life_name: "LIFETIME UNLOCK",
      plan_life_sub: "One-Time Payment",
      plan_life_desc: "Definitive one-time purchase. Own the game forever with zero recurring subscriptions.",
      plife_1: "Lifetime Unlock for All Content",
      plife_2: "All Future Updates Included",
      plife_3: "All 6 Worlds, 8 Levels & 26 Soundtracks",
      plife_4: "2-to-4 Player Party Tournament & 3D Podium",
      plife_5: "Apple Family Sharing Included",
      btn_buy_life: "Unlock Lifetime",

      priv_title: "100% On-Device Neural Engine: Your Privacy is Guaranteed",
      priv_desc: "BodyRush runs purely on your device's local Apple Neural Engine chip. No video, no photos and no body telemetry are ever recorded, uploaded or analyzed on remote servers. You can even play in Airplane mode.",
      priv_btn: "Read Full Privacy Policy →",

      faq_badge: "FAQ",
      faq_title: "FREQUENTLY ASKED QUESTIONS",
      faq_1_q: "Do I need a controller or a VR headset?",
      faq_1_a: "No, absolutely none! That is the revolution of BodyRush: the front ultra-wide camera of your iPhone or iPad tracks all your movements in real-time using Apple Vision Body Tracking. You only need your device and a little room to move.",
      faq_2_q: "What distance is recommended between me and the screen?",
      faq_2_a: "A distance of roughly 6 to 8 feet (1.8m to 2.5m) is ideal so the camera can see your full body from head to knees. If you play on TV via AirPlay, you can place your iPhone on your TV console facing you.",
      faq_3_q: "Which iPhone and iPad devices are supported?",
      faq_3_a: "BodyRush runs smoothly on all iPhones supporting iOS 17 or iOS 18 (iPhone 11 and above, optimized for iPhone 12, 13, 14, 15, 16) and iPads running iPadOS 17+ (A12Z, A14 Bionic or Apple Silicon M1, M2, M4).",
      faq_4_q: "Is it suitable for children and families?",
      faq_4_a: "Yes, 100%! The cartoon 3D art style (Toy Kingdom, Sakura Zen, Christmas Express) is family-friendly with zero graphic violence. The 2-to-4 Player Party Tournament mode (Pass & Play) with its 3D Photo Podium and Finish Video Replay is built for family fun.",
      faq_5_q: "How does AirPlay TV mode work?",
      faq_5_a: "Simply tap the AirPlay icon inside the app and choose your Apple TV or AirPlay 2 Smart TV. Your TV displays the 3D corridor in 16:9 1080p/4K at 60 FPS while your iPhone automatically switches to the low-power 'Skeleton Cockpit' screen.",

      final_title: "READY TO TURN YOUR LIVING ROOM INTO AN ARCADE?",
      final_desc: "Join thousands of players who sweat and have fun every day without any bulky gear.",
      final_btn_sub: "Available on iPhone & iPad",
      final_btn_main: "Download Free on the App Store",

      footer_bio: "3D arcade, fitness and boxing game driven 100% by camera tracking on iPhone & iPad. Designed & built in France by Xavier Larrodé.",
      footer_game: "The Game",
      footer_legal: "Legal & Privacy",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_support: "Support & Press"
    }
  };

  // =========================================================================
  // 2. 6 WORLDS DATABASE
  // =========================================================================
  const worldsData = {
    toy: {
      title_fr: "🧸 TOY KINGDOM",
      title_en: "🧸 TOY KINGDOM",
      desc_fr: "Le monde féérique des jouets d'enfance ! Évite les cubes en bois géants, grimpe les étages 3D et affronte le Chat Maine Coon, le Robot Géant et l'Ours en Peluche.",
      desc_en: "The whimsical realm of childhood toys! Dodge giant wooden ABC blocks, leap up 3D floor stairs and take on the Maine Coon Cat, Giant Toy Robot and Teddy Bear.",
      boss_fr: "Chat Maine Coon, Robot Géant & Ours",
      boss_en: "Maine Coon Cat, Giant Robot & Bear",
      music_fr: "Chiptune Arcade & Electro Beat",
      music_en: "Arcade Chiptune & Electro Beat",
      obstacles_fr: "Blocs ABC, Piliers Jouets, Étages 3D & Murs Cristal",
      obstacles_en: "ABC Blocks, Toy Pillars, 3D Stairs & Crystal Walls",
      status_fr: "DÉBLOCAGE GRATUIT (LVL 00-01 + TEASER PRO)",
      status_en: "FREE UNLOCK (LVL 00-01 + PRO TEASER)",
      diff_fr: "DIFFICULTÉ : ACCESSIBLE",
      diff_en: "DIFFICULTY: CASUAL",
      sticker: "assets/stickers/villain_toystory_mainecoon.png",
      glowColor: "rgba(0, 240, 255, 0.3)"
    },
    sakura: {
      title_fr: "🌸 SAKURA ZEN",
      title_en: "🌸 SAKURA ZEN",
      desc_fr: "Plonge au cœur d'un sanctuaire japonais sous les cerisiers en fleurs. Esquive les cerisiers en pot, saute les bolsters roses et défie la Kitsune Rose et le Panda Rose !",
      desc_en: "Step into an aesthetic Japanese sanctuary lined with cherry blossoms. Dodge potted sakura trees, leap over floral hurdles and challenge the Kitsune Boxer and Pink Panda!",
      boss_fr: "Kitsune Boxeuse & Panda Rose Géant",
      boss_en: "Kitsune Boxer & Giant Pink Panda",
      music_fr: "Japanese Trap & Shamisen Bass",
      music_en: "Japanese Trap & Shamisen Bass",
      obstacles_fr: "Cerisiers en Fleurs, Arches Sakura, Haies Roses",
      obstacles_en: "Blooming Cherry Trees, Sakura Arches, Pink Hurdles",
      status_fr: "PASS VIP PRO",
      status_en: "VIP PRO PASS",
      diff_fr: "DIFFICULTÉ : MOYENNE",
      diff_en: "DIFFICULTY: MEDIUM",
      sticker: "assets/stickers/villain_sakura_kitsune.png",
      glowColor: "rgba(255, 102, 178, 0.35)"
    },
    indiana: {
      title_fr: "🏺 INDIANA TEMPLE",
      title_en: "🏺 INDIANA TEMPLE",
      desc_fr: "Explore les catacombes aztèques pleines de pièges millénaires ! Esquive les rochers géants qui dévalent la piste, baisse-toi sous les piques antiques et combats l'Idole Dorée.",
      desc_en: "Explore ancient Aztec ruins loaded with booby traps! Dodge giant rolling boulders, duck under antique ceiling spikes and strike down the Golden Idol boss.",
      boss_fr: "Idole Dorée Aztèque des Ruines",
      boss_en: "Golden Ancient Aztec Idol",
      music_fr: "Percussions Tribales & Orchestre Épique",
      music_en: "Tribal Percussion & Epic Orchestral",
      obstacles_fr: "Rochers Géants, Plafonds à Piques, Pièges de Pierre",
      obstacles_en: "Rolling Boulders, Ceiling Spikes, Stone Traps",
      status_fr: "PASS VIP PRO",
      status_en: "VIP PRO PASS",
      diff_fr: "DIFFICULTÉ : DIFFICILE",
      diff_en: "DIFFICULTY: HARD",
      sticker: "assets/stickers/villain_temple_idol.png",
      glowColor: "rgba(245, 158, 11, 0.35)"
    },
    crystal: {
      title_fr: "💎 RED CRYSTAL",
      title_en: "💎 RED CRYSTAL",
      desc_fr: "L'arène cyberpunk ultime ! La piste s'enflamme sous tes pas. Pulvérise les murs de cristal fissuré avec tes poings ou tes pieds et affronte le Boxeur de Cristal Rubis.",
      desc_en: "The ultimate cyberpunk arena! The corridor glows with crystal shards. Shatter cracked glass walls with real punches or kicks and battle the Red Crystal Boxer.",
      boss_fr: "Boxeur Cyber Rubis de Cristal",
      boss_en: "Cyber Ruby Crystal Heavyweight",
      music_fr: "Synthwave Dark & Industrial Beats",
      music_en: "Dark Synthwave & Industrial Beats",
      obstacles_fr: "Murs Cristal Fissurés, Piliers Rubis & Poutres Basses",
      obstacles_en: "Cracked Crystal Walls, Ruby Pillars & Low Beams",
      status_fr: "PASS VIP PRO",
      status_en: "VIP PRO PASS",
      diff_fr: "DIFFICULTÉ : EXPERT",
      diff_en: "DIFFICULTY: EXPERT",
      sticker: "assets/stickers/villain_red_crystal_boxer.png",
      glowColor: "rgba(255, 23, 68, 0.4)"
    },
    halloween: {
      title_fr: "🎃 HALLOWEEN SPOOKY",
      title_en: "🎃 HALLOWEEN SPOOKY",
      desc_fr: "Frissons et cardio garantis ! Traverse le manoir hanté, saute par-dessus les citrouilles et chaudrons magiques et affronte le Fantôme Farceur et le Golem Gargouille de Pierre.",
      desc_en: "Spooky thrills and intense sweat! Dash through the haunted mansion, jump over glowing pumpkins and witch cauldrons, and battle the Poltergeist Ghost and Gargoyle Stone Golem.",
      boss_fr: "Fantôme Farceur & Golem Gargouille",
      boss_en: "Poltergeist Ghost & Gargoyle Stone Golem",
      music_fr: "Electro Gothique & Chœurs Mystiques",
      music_en: "Gothic Electro & Haunting Choirs",
      obstacles_fr: "Golem Gargouille de Pierre, Citrouilles & Chaudrons",
      obstacles_en: "Gargoyle Stone Golem, Pumpkins & Witch Cauldrons",
      status_fr: "PASS VIP PRO",
      status_en: "VIP PRO PASS",
      diff_fr: "DIFFICULTÉ : DIFFICILE",
      diff_en: "DIFFICULTY: HARD",
      sticker: "assets/stickers/villain_halloween_ghost.png",
      glowColor: "rgba(147, 51, 234, 0.4)"
    },
    christmas: {
      title_fr: "🎄 NOËL EXPRESS",
      title_en: "🎄 CHRISTMAS EXPRESS",
      desc_fr: "La magie des fêtes dans ton salon ! Cours sur la piste enneigée sous les guirlandes scintillantes, saute les traîneaux de cadeaux et affronte le Bonhomme de Neige Boxer et Casse-Noisette.",
      desc_en: "Holiday excitement right in your living room! Sprint along snow-covered tracks beneath fairy lights, leap over gift sleighs and duel the Boxing Snowman and Nutcracker.",
      boss_fr: "Bonhomme de Neige Boxer & Casse-Noisette",
      boss_en: "Boxing Snowman & Giant Nutcracker",
      music_fr: "Holiday Electro Dance & Jingle Remix",
      music_en: "Holiday Electro Dance & Jingle Remix",
      obstacles_fr: "Traîneaux de Cadeaux, Guirlandes Hautes & Sapins",
      obstacles_en: "Gift Sleighs, High Pine Garlands & Snow Pillars",
      status_fr: "PASS VIP PRO",
      status_en: "VIP PRO PASS",
      diff_fr: "DIFFICULTÉ : MOYENNE",
      diff_en: "DIFFICULTY: MEDIUM",
      sticker: "assets/stickers/villain_christmas_snowman.png",
      glowColor: "rgba(16, 185, 129, 0.35)"
    }
  };

  // State
  let currentLang = 'fr';
  let currentWorld = 'toy';

  // =========================================================================
  // 3. LANGUAGE SWITCHER HANDLER
  // =========================================================================
  function initLanguage() {
    const saved = localStorage.getItem('bodyrush_lang');
    if (saved && (saved === 'fr' || saved === 'en')) {
      currentLang = saved;
    } else {
      // Auto-detect browser language
      const browserLang = (navigator.language || 'fr').toLowerCase();
      currentLang = browserLang.startsWith('en') ? 'en' : 'fr';
    }
    applyLanguage(currentLang);

    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('bodyrush_lang', currentLang);
        applyLanguage(currentLang);
        renderCurrentWorld();
      });
    }
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    const flagEl = document.getElementById('lang-flag');
    const codeEl = document.getElementById('lang-code');
    
    if (flagEl) flagEl.textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
    if (codeEl) codeEl.textContent = lang.toUpperCase();

    const dict = i18n[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    renderCurrentWorld();
  }

  // =========================================================================
  // 4. 6 WORLDS CAROUSEL / EXPLORER
  // =========================================================================
  function initWorlds() {
    const tabs = document.querySelectorAll('.world-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        
        currentWorld = tab.getAttribute('data-world') || 'toy';
        renderCurrentWorld();
      });
    });
  }

  function renderCurrentWorld() {
    const w = worldsData[currentWorld];
    if (!w) return;

    const titleEl = document.getElementById('world-title');
    const descEl = document.getElementById('world-desc');
    const bossEl = document.getElementById('world-boss');
    const musicEl = document.getElementById('world-music');
    const obstaclesEl = document.getElementById('world-obstacles');
    const statusEl = document.getElementById('world-access-tag');
    const diffEl = document.getElementById('world-diff-tag');
    const imgEl = document.getElementById('world-villain-img');
    const glowEl = document.getElementById('world-glow');

    if (titleEl) titleEl.textContent = currentLang === 'fr' ? w.title_fr : w.title_en;
    if (descEl) descEl.textContent = currentLang === 'fr' ? w.desc_fr : w.desc_en;
    if (bossEl) bossEl.textContent = currentLang === 'fr' ? w.boss_fr : w.boss_en;
    if (musicEl) musicEl.textContent = currentLang === 'fr' ? w.music_fr : w.music_en;
    if (obstaclesEl) obstaclesEl.textContent = currentLang === 'fr' ? w.obstacles_fr : w.obstacles_en;
    if (statusEl) statusEl.textContent = currentLang === 'fr' ? w.status_fr : w.status_en;
    if (diffEl) diffEl.textContent = currentLang === 'fr' ? w.diff_fr : w.diff_en;

    if (imgEl && imgEl.src !== w.sticker) {
      imgEl.style.opacity = '0';
      imgEl.style.transform = 'scale(0.85) rotate(-6deg)';
      setTimeout(() => {
        imgEl.src = w.sticker;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1) rotate(0deg)';
      }, 150);
    }

    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle, ${w.glowColor} 0%, transparent 70%)`;
    }
  }

  // =========================================================================
  // 5. LIVE HUD AUDIO & SCORE TICKER SIMULATION
  // =========================================================================
  function initHeroVideo() {
    const video = document.getElementById('hero-video');
    const soundBtn = document.getElementById('btn-video-sound');
    const iconMuted = document.getElementById('sound-icon-muted');
    const iconUnmuted = document.getElementById('sound-icon-unmuted');

    if (video && soundBtn) {
      soundBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
          iconMuted.classList.remove('hidden');
          iconUnmuted.classList.add('hidden');
        } else {
          iconMuted.classList.add('hidden');
          iconUnmuted.classList.remove('hidden');
        }
      });
    }

    // Ticking Score Simulation in HUD
    const scoreVal = document.getElementById('hud-score-val');
    if (scoreVal) {
      let currentScore = 142850;
      setInterval(() => {
        currentScore += Math.floor(Math.random() * 450) + 120;
        scoreVal.textContent = currentScore.toLocaleString();
      }, 1800);
    }
  }

  // =========================================================================
  // 6. MOBILE DRAWER NAVIGATION
  // =========================================================================
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
          drawer.classList.remove('open');
          drawer.setAttribute('aria-hidden', 'true');
        } else {
          drawer.classList.add('open');
          drawer.setAttribute('aria-hidden', 'false');
        }
      });

      // Close drawer on link click
      drawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          drawer.setAttribute('aria-hidden', 'true');
        });
      });
    }
  }

  // =========================================================================
  // 7. DYNAMIC COPYRIGHT YEAR
  // =========================================================================
  function initYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // =========================================================================
  // DOM READY ENTRY POINT
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initWorlds();
    initHeroVideo();
    initMobileMenu();
    initYear();
  });

})();
