# MedCase Urgences — PWA (99 cas cliniques)

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
