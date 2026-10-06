# MedCase Urgences — PWA (129 cas cliniques)

Fichiers : `index.html` (app), `styles.css` (CSS compilé), `sw.js` (service worker), `manifest.webmanifest`, `icons/`.

## Tester en local
    python3 -m http.server 8080   # puis http://localhost:8080
(Le service worker ne s'active pas en `file://`.)

## Déployer
Hébergement statique en HTTPS (GitHub Pages, Netlify, Cloudflare Pages…) : déposer tout le dossier.
À chaque mise à jour, incrémenter `VERSION` dans `sw.js`.

## Régénérer le CSS avec le vrai Tailwind CLI (recommandé)
    ./tailwindcss -c tailwind.config.js -i input.css -o styles.css --minify
Le `styles.css` fourni a été généré par un script équivalent (sous-ensemble des classes utilisées), faute d'accès réseau.

## Profil du joueur
Écran « Profil » (bouton en en-tête, ou clic sur la puce XP) : nom « Dr … », score XP, niveau, statistiques,
badges et deux graphiques en toile d'araignée (compétences cliniques, spécialités).
La progression est sauvegardée dans le navigateur (`localStorage`, clé `medcase_progress`) ; bouton de réinitialisation inclus.

## Son du moniteur cardiaque
Pendant un cas, un bip synchronisé sur la fréquence cardiaque retentit (Web Audio, aucun fichier audio) :
la hauteur baisse quand la SpO2 chute, une alarme se déclenche sur constantes critiques (SpO2 < 90 %, FC > 150 ou < 45)
et une tonalité continue signale l'arrêt cardiaque. Bouton haut-parleur dans l'en-tête pour couper le son (préférence mémorisée).
Les navigateurs exigent un clic avant de jouer un son : il démarre au lancement d'un cas.

## Médecine générale
23 cas de médecine générale (angine, cystite, lombalgie, gastro-entérite, otite, HTA, diabète, asthme, pneumonie, vertige,
migraine, entorse, zona, érysipèle, panique, goutte, conjonctivite, syncope, douleur pariétale, déshydratation du sujet âgé)
dont 3 « pièges » à orienter en urgence (queue de cheval, angor instable, appendicite).

## Décès du patient
Si le chrono s'épuise ou si les constantes s'effondrent (PA systolique ≤ 40 mmHg ou SpO2 ≤ 55 %, par exemple après un geste dangereux),
le patient décède : phase agonique (FC, PA et SpO2 chutent, bips de plus en plus lents et graves, alarme), puis asystolie
avec tonalité continue, fenêtre « Le patient est décédé » et débriefing dédié. Les décès sont comptés dans le profil.

## Moniteur en direct
Sous les constantes, un moniteur dessine l'ECG (dérivation II) et la courbe de SpO2 en temps réel. Le tracé suit le rythme
(sinusal, FA irrégulière, TV, FV, torsades, BAV complet, hyperkaliémie, sus/sous-décalage ST, onde d'Osborn, microvoltage, rythme
électro-entraîné, agonique, asystolie), la FC et la PA (amplitude de la courbe de pouls). Le bip retentit à chaque QRS : une FA
sonne donc irrégulière. Les soins changent le rythme (cardioversion → sinusal, stimulation → rythme entraîné, calcium → QRS fins).

## Examens avec délai
Les résultats n'arrivent plus instantanément : une carte « résultat dans N s » s'affiche, le chrono continue (on peut traiter
pendant l'attente) et un signal sonore + une notification annoncent le résultat. Plusieurs examens se prescrivent en parallèle.

## Arrêt cardiaque (algorithme ERC)
8 scénarios (catégorie « Réanimation ») : FV coronaire, AESP par embolie pulmonaire / tamponnade / hypovolémie / pneumothorax,
asystolie hypoxique, FV de l'hypothermie, AESP par hyperkaliémie. Onglet « Réanimation (ERC) » : massage avec métronome sonore et
artefact sur le tracé, analyse du rythme (pause ≤ 10 s), choix de l'énergie du choc, adrénaline, amiodarone, voies aériennes,
accès IV/IO, échographie pendant la pause, causes réversibles 4H/4T, cycles de 2 minutes. Temps accéléré ×4.
Évaluation : temps sans massage, délai du 1er choc, chocs sur rythme non choquable, adrénaline, cause traitée, RACS.
