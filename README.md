# 🎶 Club des Chantres - Gospel Stream & Academy

Plateforme SaaS de musique chrétienne, streaming Web TV, masterclasses et gestion des fan clubs pour artistes gospel (chantres, pianistes, batteurs, formateurs).

---

## 🚀 Stack Technique
- **Framework :** Next.js 15 (App Router, Server Actions, React Server Components)
- **Styling :** Tailwind CSS + Lucide Icons (Thème sombre Bleu Nuit & Or)
- **Backend & Auth :** Supabase (PostgreSQL, Row Level Security, Storage Buckets)
- **Streaming :** HLS Streaming adaptatif
- **Paiements :** Tunnel récurrent FCFA (Mobile Money : Wave, OM, Moov, MTN & Cartes)

---

## 🛠️ Installation & Démarrage

1. **Cloner le projet :**
   ```bash
   git clone <URL_DU_REPO>
   cd club-des-chantres
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Variables d'environnement :**
   Copiez `.env.example` vers `.env.local` et renseignez vos clés :
   ```bash
   cp .env.example .env.local
   ```

4. **Base de données Supabase :**
   Exécutez le script SQL `supabase/schema.sql` dans l'éditeur SQL de votre dashboard Supabase.

5. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   Rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## 📂 Architecture du Projet
- `src/app/(marketing)/` : Page d'accueil Hero, Live Banner, et tunnel de paiement checkout
- `src/app/(platform)/` : Fan Club, Web TV en direct avec Chat, Actualités, Formations & Émissions
- `src/app/(dashboard)/` : Studio de gestion et téléversement pour les créateurs certifiés
- `src/components/` : Composants réutilisables, Navbar sticky, BottomNav mobile, HLS Player
- `src/actions/` : Server Actions sécurisées pour les uploads et interactions sociales
- `supabase/schema.sql` : Schéma de données avec RLS et triggers de compteurs
