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
        {/* 1. HERO SECTION AVEC SLIDER CINÉMATIQUE */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
          {/* Background Gradient & Ambient Aura */}
          <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-slate-950/80 to-slate-950 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header Text & Badges */}
            <div className="text-center max-w-4xl mx-auto mb-10">
              {/* Live Banner Notification */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-400 backdrop-blur-md animate-pulse">
                <Radio className="h-4 w-4" />
                <span>EN DIRECT SUR WEB TV : Concert de Louange Live Abidjan</span>
                <Link href="/web-tv" className="underline ml-1 hover:text-white">
                  Rejoindre
                </Link>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
                La Puissance du <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">Gospel</span> en Streaming & Académie
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
                Découvrez les masterclasses des plus grands chantres et instrumentistes chrétiens d’Afrique.
                Web TV 24/7, partitions exclusives et adhésion aux fan clubs officiels.
              </p>
            </div>

            {/* Slider Visuel Cinématique Principal */}
            <div className="mb-10">
              <HeroSlider />
            </div>

            {/* Quick Actions & Reassurance */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkout?plan=MEMBER_1000"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
              >
                <Play className="h-4 w-4 fill-current" />
                Accès Membre Illimité (1 000 FCFA/mois)
              </Link>

              <Link
                href="/checkout?plan=CREATOR_3000"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition"
              >
                <Crown className="h-4 w-4 text-amber-400" />
                Espace Chantres & Musiciens (3 000 FCFA/mois)
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Paiement Mobile Money instantané (Wave, OM, Moov, MTN & Cartes)
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
