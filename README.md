# Coffre-Fort Garanties 🔐

Application React + Vite pour gérer et suivre vos garanties produits.

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173)

## Compte démo

- **Email :** `demo@coffre.fr`
- **Mot de passe :** `demo123`

## Stack technique

- React 18 + TypeScript
- Vite 5
- React Router v6
- Tailwind CSS 3
- date-fns
- localStorage (persistance locale)

## Structure

```
src/
├── components/     # Composants réutilisables
├── context/        # AuthContext + WarrantyContext
├── data/           # Données mockées
├── pages/          # Pages de l'application
├── router/         # Configuration des routes
├── types/          # Types TypeScript
└── utils/          # Fonctions utilitaires
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Connexion |
| `/register` | Inscription |
| `/dashboard` | Liste des garanties (protégée) |
| `/warranty/:id` | Détail d'un objet (protégée) |
| `/add` | Ajouter un objet (protégée) |

## Build production

```bash
npm run build
npm run preview
```
