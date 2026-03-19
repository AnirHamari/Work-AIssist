# Work AIssist - Plateforme d'Élite pour la Carrière

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7+-white?style=for-the-badge&logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

Work AIssist est une application web premium conçue pour transformer la recherche d'emploi en une stratégie de conquête. Alliant Intelligence Artificielle (GPT-4o) et psychologie du recrutement, elle offre un arsenal complet pour les candidats exigeants.

## 🚀 Fonctionnalités Clés

- **Générateur de Lettre de Motivation "Ultra-Humaine"** : Création de lettres indétectables par les IA, adaptées psychologiquement au recruteur.
- **CV Builder Haute-Précision** : Templates Executive, Creative et Academic optimisés pour les systèmes ATS.
- **Simulateur d'Entretien IA** : Entraînement immersif avec feedback instantané et scoring de performance.
- **Audit de Profil LinkedIn** : Analyse SEO et structurelle pour dominer les résultats de recherche.
- **Psychologie du Recruteur** : Décodage des biais cognitifs et optimisation de l'impact émotionnel selon le profil du décideur.
- **Marché Caché & Base VIP** : Accès exclusif à des offres non publiées et contacts directs (Airbus, BNP, RTE, etc.).

## 🛠 Tech Stack

- **Framework** : Next.js 15+ (App Router)
- **Langage** : TypeScript
- **Style** : Tailwind CSS (Glassmorphism & Mesh Gradients)
- **Base de données** : Prisma ORM & SQLite
- **Authentification** : NextAuth.js
- **IA** : OpenAI API (GPT-4o)
- **Paiements** : Stripe (Mode Test)

## 📦 Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/AnirHamari/Work-AIssist.git
   cd Work-AIssist
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` basé sur `.env.example` et remplissez vos clés :
   - `OPENAI_API_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXTAUTH_SECRET`

4. Initialisez la base de données :
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## 📄 Licence

Ce projet est sous licence MIT.
