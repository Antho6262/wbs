# W.B.S — White Block Syndicat

## 1. Firebase (nouveau projet dédié)
1. Console Firebase → nouveau projet → **Build → Realtime Database** (région Europe, mode test).
2. **Paramètres du projet → Général → Tes applications → Web (`</>`)** : copie la config.
3. Colle-la dans `js/firebase-config.js` (bloc `FIREBASE_CONFIG`).
4. Realtime Database → Règles : `{ "rules": { ".read": true, ".write": true } }`

## 2. Initialisation (une seule fois)
Ouvre `setup.html`, entre ton pseudo + mot de passe Fondateur, clique **Initialiser le site**.
Le compte Fondateur est caché (classements, stats, tracker, Admin). Les 15 membres sont créés avec le mot de passe `wbs123`.

## 3. Connexion Fondateur
Compte caché : utilise `index.html?d` (champ pseudo libre).

## Déployer (GitHub Pages)
```bash
cd wbs-site
git init && git add . && git commit -m "Init W.B.S"
git branch -M main
git remote add origin https://github.com/TON_COMPTE/wbs-site.git
git push -u origin main
```
Settings → Pages → branche `main`, dossier `/ (root)`.
