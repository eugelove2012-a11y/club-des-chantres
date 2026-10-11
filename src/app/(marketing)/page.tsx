import React from 'react';
import Link from 'next/link';
import { 
  Play, 
  Crown, 
  Radio, 
  Sparkles, 
  GraduationCap, 
  Tv, 
  Mic, 
  Music, 
  Lock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CreatorCard } from '@/components/ui/CreatorCard';
import { CreatorCardData } from '@/types/models';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';

import { HeroSlider } from '@/components/ui/HeroSlider';

// Données démo pour l'affichage initial
const FEATURED_CREATORS: CreatorCardData[] = [
  {
    id: 'c1',
    full_name: 'Pasteur David K.',
    bio: 'Chantre & Conducteur de louange, auteur de l’album "Gloire Éternelle".',
    creator_category: 'VOCALIST',
    avatar_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    likes_count: 1420,
    fans_count: 580,
  },
  {
    id: 'c2',
    full_name: 'Emmanuel B. (Mano Piano)',
    bio: 'Pianiste Gospel & Formateur en harmonie jazz/gospel avancée.',
    creator_category: 'PIANIST',
    avatar_url: 'https://images.unsplash.com/photo-1520523839898-507128ef5b7e?w=600&auto=format&fit=crop&q=80',
    likes_count: 980,
    fans_count: 410,
  },
  {
    id: 'c3',
    full_name: 'Samuel Groove',
    bio: 'Batteur d’église professionnel, expert en rythmiques Afro-Gospel et Shuffle.',
    creator_category: 'DRUMMER',
    avatar_url: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&auto=format&fit=crop&q=80',
    likes_count: 1150,
    fans_count: 620,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO HEADER IMMERSIF — LE SLIDER OCCUPE TOUT L'ESPACE HEADER SOUS LE MENU */}
        <section className="relative overflow-hidden pt-3 pb-12 sm:pt-5 sm:pb-16">
          {/* Background Gradient & Ambient Aura */}
          <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-slate-950/80 to-slate-950 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            {/* Slider Visuel Cinématique Principal qui prend tout le haut sous le menu */}
            <HeroSlider />

            {/* Réassurance & Paiement Mobile Money sous le Header */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Paiement sécurisé Mobile Money instantané (Wave, Orange Money, Moov, MTN & Cartes)
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Sparkles className="h-4 w-4" /> Accès illimité aux replays, streaming 24/7 et formations
              </span>
            </div>
          </div>
        </section>

        {/* 2. CARROUSEL DES CRÉATEURS À L'AFFICHE */}
        <section className="py-12 border-t border-slate-900 bg-slate-950/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="h-4 w-4" /> Talents à l&apos;honneur
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Chantres & Instrumentistes Populaires</h2>
              </div>
              <Link
                href="/fan-club"
                className="flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
              >
                Explorer tout le Fan Club <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_CREATORS.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. TEASER MULTIMÉDIA & FORMATIONS */}
        <section className="py-16 border-t border-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">L&apos;Académie d&apos;Excellence Musicale</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
                Des cours complets structurés par des mentors d&apos;expérience pour équiper les équipes de louange.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Teaser 1: Chant */}
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Mic className="h-6 w-6" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Lock className="h-3 w-3" /> Abonnement requis
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">Technique Vocale & Respiration Diaphragmatique</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Maîtrisez la projection de voix, le vibrato et l&apos;endurance pour les cultes et concerts.
                </p>
                <div className="mt-6">
                  <Link
                    href="/formation"
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Voir le cursus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Teaser 2: Piano */}
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Music className="h-6 w-6" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Lock className="h-3 w-3" /> Abonnement requis
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">Accords Gospel & Accompagnement d&apos;Adoration</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Substitutions 2-5-1, mouvements chromatiques et jeu en nappe subtil.
                </p>
                <div className="mt-6">
                  <Link
                    href="/formation"
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Voir le cursus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Teaser 3: Web TV Replays */}
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Tv className="h-6 w-6" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Lock className="h-3 w-3" /> Abonnement requis
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">Grandes Soirées de Célébration & Replays</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Revivez en 1080p les plus grands moments de louange et d&apos;exhortation spirituelle.
                </p>
                <div className="mt-6">
                  <Link
                    href="/web-tv"
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Accéder à la Web TV <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
