'use client';

import React, { useState } from 'react';
import { CreatorCard } from '@/components/ui/CreatorCard';
import { CreatorCardData, CreatorCategory } from '@/types/models';
import { Users, Search, Mic, Music, Filter } from 'lucide-react';

const ALL_CREATORS: CreatorCardData[] = [
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
  {
    id: 'c4',
    full_name: 'Sœur Ruth N.',
    bio: 'Vocaliste & Soliste Gospel, coach vocal spécialisée en ad libitum et chants en langues.',
    creator_category: 'VOCALIST',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    likes_count: 2340,
    fans_count: 1200,
  },
  {
    id: 'c5',
    full_name: 'Maestro Jonathan',
    bio: 'Directeur Musical & Formateur, cours d’harmonie polyphonique pour chorales.',
    creator_category: 'INSTRUCTOR',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    likes_count: 870,
    fans_count: 350,
  },
];

export default function FanClubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCreators = ALL_CREATORS.filter((c) => {
    const matchesCategory = selectedCategory === 'ALL' || c.creator_category === selectedCategory;
    const matchesSearch = c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.bio && c.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="h-7 w-7 text-amber-500" />
            Chantres & Fan Club
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Découvrez vos artistes préférés, adhérez à leurs fan clubs et soutenez leurs ministères.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un artiste..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs shadow-xs focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs font-semibold no-scrollbar">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-xl transition whitespace-nowrap shadow-xs ${
            selectedCategory === 'ALL'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Tous ({ALL_CREATORS.length})
        </button>
        <button
          onClick={() => setSelectedCategory('VOCALIST')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition whitespace-nowrap shadow-xs ${
            selectedCategory === 'VOCALIST'
              ? 'bg-rose-500 text-white font-bold'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Mic className="h-3.5 w-3.5" /> Chantres 🎤
        </button>
        <button
          onClick={() => setSelectedCategory('PIANIST')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition whitespace-nowrap shadow-xs ${
            selectedCategory === 'PIANIST'
              ? 'bg-indigo-600 text-white font-bold'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Music className="h-3.5 w-3.5" /> Pianistes 🎹
        </button>
        <button
          onClick={() => setSelectedCategory('DRUMMER')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition whitespace-nowrap shadow-xs ${
            selectedCategory === 'DRUMMER'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Batteurs 🥁
        </button>
        <button
          onClick={() => setSelectedCategory('INSTRUCTOR')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition whitespace-nowrap shadow-xs ${
            selectedCategory === 'INSTRUCTOR'
              ? 'bg-emerald-600 text-white font-bold'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Formateurs 🎓
        </button>
      </div>

      {/* Grid of Artists */}
      {filteredCreators.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-slate-200 bg-white">
          <p className="text-slate-500 text-sm">Aucun artiste ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}
