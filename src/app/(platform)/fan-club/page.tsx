'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CreatorCard } from '@/components/ui/CreatorCard';
import { CreatorCardData, FanClubLevel } from '@/types/models';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Sparkles, 
  Mic, 
  Music, 
  Users, 
  Star, 
  Crown, 
  Gem, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  X,
  TrendingUp,
  Gift,
  Tv,
  Award
} from 'lucide-react';
import { CREATORS_DATA } from '@/lib/data/creators';

export default function FanClubPage() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'CHANTRE' | 'INSTRUMENTISTE' | 'CHORALE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [sortBy, setSortBy] = useState<'POPULAR' | 'FANS' | 'NAME'>('POPULAR');
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');
  const [showLevelsModal, setShowLevelsModal] = useState(false);

  // Filtrage combiné
  const filteredCreators = CREATORS_DATA.filter((creator) => {
    const matchesCategory = selectedCategory === 'ALL' || creator.group_type === selectedCategory;
    const matchesCountry = selectedCountry === 'ALL' || creator.country === selectedCountry;
    const matchesLevel = selectedLevel === 'ALL' || creator.level === selectedLevel;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      creator.full_name.toLowerCase().includes(query) ||
      (creator.role_title && creator.role_title.toLowerCase().includes(query)) ||
      (creator.bio && creator.bio.toLowerCase().includes(query)) ||
      (creator.country && creator.country.toLowerCase().includes(query));

    return matchesCategory && matchesCountry && matchesLevel && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'FANS') return b.fans_count - a.fans_count;
    if (sortBy === 'NAME') return a.full_name.localeCompare(b.full_name);
    return b.likes_count - a.likes_count;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. EN-TÊTE IMMERSIF BORD À BORD (MÊME STRUCTURE QUE L'AFFICHE) */}
      <section className="relative w-full overflow-hidden bg-slate-950 text-white shadow-xl">
        {/* Image de fond de concert avec ambiance lumineuse */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/slide-2.jpg"
            alt="Concert Gospel Ambiance"
            fill
            priority
            className="object-cover object-center opacity-45 mix-blend-luminosity scale-105"
          />
          {/* Gradients cinématiques bleu nuit & halo or */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/90" />
          <div className="absolute inset-0 bg-radial-gradient from-blue-600/15 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo d'or Club des Chantres */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 text-slate-950 shadow-xl shadow-amber-500/20 border-2 border-amber-300/40">
                <Sparkles className="h-9 w-9 fill-current" />
                <div className="absolute -bottom-1 -right-1 bg-slate-950 text-amber-400 p-1 rounded-full border border-amber-400">
                  <Mic className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* Titre central et sous-titre */}
            <div className="text-center flex-1 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
                Chantres, Instrumentistes <br className="hidden sm:inline" />
                <span className="text-white">et leurs Fan Clubs</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-medium text-slate-200 tracking-wide drop-shadow-sm">
                Découvrez des talents <span className="text-amber-400">•</span> Suivez vos artistes <span className="text-amber-400">•</span> Rejoignez leurs Fan Clubs
              </p>
            </div>

            {/* Calligraphie "Unis pour servir !" */}
            <div className="hidden lg:flex flex-col items-end">
              <span className="font-serif italic text-2xl xl:text-3xl font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-md rotate-[-3deg]">
                Unis pour servir !
              </span>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-transparent rounded-full mt-1" />
            </div>

          </div>
        </div>

        {/* Liseré fin doré au bas du bandeau */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20 shadow-xs" />
      </section>

      {/* 2. BARRE DE RECHERCHE, FILTRES ET ONGLET NIVEAUX */}
      <section className="mx-auto max-w-7xl px-4 -mt-4 sm:-mt-5 sm:px-6 lg:px-8 relative z-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Input de recherche */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un artiste, un instrument, une église..."
                className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Filtre Pays */}
            <div className="lg:col-span-2 relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-none transition cursor-pointer"
              >
                <option value="ALL">📍 Tous les pays</option>
                <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                <option value="France">France</option>
                <option value="Cameroun">Cameroun</option>
                <option value="RDC">RDC</option>
                <option value="Bénin">Bénin</option>
                <option value="Togo">Togo</option>
                <option value="Gabon">Gabon</option>
              </select>
            </div>

            {/* Filtre Niveaux */}
            <div className="lg:col-span-2 relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-none transition cursor-pointer"
              >
                <option value="ALL">⭐ Tous les niveaux</option>
                <option value="OR">Or (50-99 fans)</option>
                <option value="ARGENT">Argent (25-49 fans)</option>
                <option value="BRONZE">Bronze (10-24 fans)</option>
                <option value="PLATINE">Platine (100-249 fans)</option>
                <option value="DIAMANT">Diamant (250+ fans)</option>
                <option value="EMERGENT">Émergent (0-9 fans)</option>
              </select>
            </div>

            {/* Tri par */}
            <div className="lg:col-span-3 flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'POPULAR' | 'FANS' | 'NAME')}
                className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-none transition cursor-pointer"
              >
                <option value="POPULAR">⚡ Trier par : Populaire</option>
                <option value="FANS">👥 Trier par : Plus de fans</option>
                <option value="NAME">🔤 Trier par : Nom A-Z</option>
              </select>

              {/* Bouton guide des niveaux & avantages */}
              <button
                onClick={() => setShowLevelsModal(true)}
                title="Comprendre le système des niveaux et avantages"
                className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition shadow-xs"
              >
                <Award className="h-4 w-4 text-amber-600" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ONGLET DE CATÉGORIES (PILLS EXACTS COMME L'AFFICHE) */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          
          {/* Pills Catégories */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all shadow-xs ${
                selectedCategory === 'ALL'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tous
            </button>

            <button
              onClick={() => setSelectedCategory('CHANTRE')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all shadow-xs ${
                selectedCategory === 'CHANTRE'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Chantres
            </button>

            <button
              onClick={() => setSelectedCategory('INSTRUMENTISTE')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all shadow-xs ${
                selectedCategory === 'INSTRUMENTISTE'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Instrumentistes
            </button>

            <button
              onClick={() => setSelectedCategory('CHORALE')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all shadow-xs ${
                selectedCategory === 'CHORALE'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Chorales / Groupes
            </button>
          </div>

          {/* Nombre de résultats & Bascule Affichage */}
          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
            <span className="font-semibold text-slate-600">
              Résultats : <strong className="text-slate-900">{filteredCreators.length} talents</strong>
            </span>

            <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setViewMode('GRID')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'GRID' ? 'bg-[#0066f5] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vue en grille"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('LIST')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'LIST' ? 'bg-[#0066f5] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vue en liste"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. GRILLE / LISTE DES ARTISTES (CONFORME À L'IMAGE 1) */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredCreators.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-slate-200 bg-white p-8">
            <Mic className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">Aucun artiste trouvé</h3>
            <p className="text-xs text-slate-500 mt-1">
              Essayez de modifier votre recherche ou de réinitialiser vos filtres.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedCountry('ALL');
                setSelectedLevel('ALL');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        )}
      </section>

      {/* 5. BANDEAU DÉCOUVRIR LE SYSTÈME DE PROGRESSION DES NIVEAUX (IMAGE 2) */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
                <Crown className="h-3.5 w-3.5" /> Programme d&apos;Élévation & Valorisation des Chantres
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Fan Clubs – Niveaux & Avantages pour chaque artiste
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Un parcours de progression clair : plus vous rassemblez de fans actifs, plus vous débloquez d&apos;émissions sur la Web TV, de visibilité et d&apos;opportunités de production !
              </p>
            </div>

            <button
              onClick={() => setShowLevelsModal(true)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs px-6 py-3.5 shadow-lg shadow-amber-500/20 hover:brightness-105 active:scale-95 transition"
            >
              <Award className="h-4 w-4" />
              <span>Voir le barème complet (Émergent à Diamant)</span>
            </button>
          </div>
        </div>
      </section>

      {/* MODALE INTERACTIVE DES NIVEAUX ET AVANTAGES (IMAGE 2) */}
      {showLevelsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Award className="h-6 w-6 text-amber-500" />
                  Fan Clubs – Niveaux et avantages
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Plus de fans, plus de visibilité, plus d&apos;opportunités pour les chantres et instrumentistes !
                </p>
              </div>

              <button
                onClick={() => setShowLevelsModal(false)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* 6 Paliers de Niveaux */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              
              {/* Émergent */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <div className="font-extrabold text-xs text-slate-900">ÉMERGENT</div>
                <div className="text-[11px] text-slate-500 font-semibold">0 – 9<br />fans actifs</div>
              </div>

              {/* Bronze */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#b07146] to-[#8c502b] text-white shadow-sm">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <div className="font-extrabold text-xs text-slate-900">BRONZE</div>
                <div className="text-[11px] text-slate-500 font-semibold">10 – 24<br />fans actifs</div>
              </div>

              {/* Argent */}
              <div className="rounded-2xl border border-slate-300 bg-slate-100/70 p-4 text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900 shadow-sm">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <div className="font-extrabold text-xs text-slate-900">ARGENT</div>
                <div className="text-[11px] text-slate-500 font-semibold">25 – 49<br />fans actifs</div>
              </div>

              {/* Or */}
              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-center space-y-2 shadow-xs ring-2 ring-amber-400/30">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <div className="font-extrabold text-xs text-amber-900">OR</div>
                <div className="text-[11px] text-amber-700 font-bold">50 – 99<br />fans actifs</div>
              </div>

              {/* Platine */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-sm">
                    <Crown className="h-5 w-5" />
                  </div>
                </div>
                <div className="font-extrabold text-xs text-blue-900">PLATINE</div>
                <div className="text-[11px] text-blue-700 font-semibold">100 – 249<br />fans actifs</div>
              </div>

              {/* Diamant */}
              <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 text-white shadow-sm">
                    <Gem className="h-5 w-5" />
                  </div>
                </div>
                <div className="font-extrabold text-xs text-purple-900">DIAMANT</div>
                <div className="text-[11px] text-purple-700 font-semibold">250+<br />fans actifs</div>
              </div>

            </div>

            {/* Tableau des Avantages par niveau */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Détail des privilèges et opportunités par palier
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Niveau Émergent (0 - 9 fans)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Profil répertorié dans le catalogue public</li>
                    <li>Espace de base pour présenter ses compositions</li>
                    <li>Badge officiel Émergent</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-600" /> Niveau Bronze (10 - 24 fans)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Profil mis en avant dans son espace</li>
                    <li>1 vidéo mise en vedette</li>
                    <li>Accès prioritaire aux audios et photos</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-300 bg-slate-100/50 space-y-2">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-slate-700" /> Niveau Argent (25 - 49 fans)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Mise en avant sur la page d&apos;accueil du module</li>
                    <li>Hébergement de vidéos HD & audios illimités</li>
                    <li>Éligible aux challenges du Club des Chantres</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50 space-y-2">
                  <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <Tv className="h-4 w-4 text-amber-600" /> Niveau Or (50 - 99 fans)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Émission spéciale &quot;Découverte&quot;</strong> sur la Web TV</li>
                    <li>Mise en avant dans la section recommandée</li>
                    <li>Annonce officielle dans le flux d&apos;actualité du Club</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-2">
                  <div className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                    <Crown className="h-4 w-4 text-blue-600" /> Niveau Platine (100 - 249 fans)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Émission spéciale dédiée en direct Web TV</li>
                    <li>Visibilité prioritaire sur toute la plateforme</li>
                    <li>Suivi et mentorat privilégié par l&apos;équipe</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 space-y-2">
                  <div className="font-bold text-xs text-purple-900 flex items-center gap-1.5">
                    <Gem className="h-4 w-4 text-purple-600" /> Niveau Diamant (250+ fans)
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Émission spéciale grand format sur les réseaux</li>
                    <li>Visibilité maximale et badges VIP</li>
                    <li><strong>Mise en relation avec des producteurs</strong> et appui à la production musicale</li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowLevelsModal(false)}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
