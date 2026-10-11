'use client';

import React from 'react';
import { Radio, Headphones, Play, Clock, Sparkles } from 'lucide-react';

interface Show {
  id: string;
  title: string;
  host: string;
  type: 'PODCAST' | 'TALK_SHOW';
  duration: string;
  thumbnail: string;
}

const SHOWS: Show[] = [
  {
    id: 's1',
    title: 'Gospel Talk : Les coulisses de la composition chrétienne',
    host: 'Pasteur David K. & Invités',
    type: 'TALK_SHOW',
    duration: '45 min',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 's2',
    title: 'Podcast Adorateurs : Méditations et parcours de chantres',
    host: 'Sœur Ruth N.',
    type: 'PODCAST',
    duration: '30 min',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 's3',
    title: 'Focus Musiciens : Équipements de studio & Sono d’église',
    host: 'Emmanuel Mano & Samuel Groove',
    type: 'TALK_SHOW',
    duration: '50 min',
    thumbnail: 'https://images.unsplash.com/photo-1520523839898-507128ef5b7e?w=600&auto=format&fit=crop&q=80',
  },
];

export default function EmissionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Radio className="h-7 w-7 text-amber-400" />
          Émissions, Podcasts & Talk-Shows
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Écoutez nos tables rondes, interviews exclusives et podcasts d&apos;édification spirituelle et musicale.
        </p>
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SHOWS.map((show) => (
          <div
            key={show.id}
            className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-amber-500/40 transition-all shadow-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={show.thumbnail}
                alt={show.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-amber-400 border border-amber-500/20 flex items-center gap-1">
                {show.type === 'PODCAST' ? <Headphones className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                {show.type === 'PODCAST' ? 'Podcast Audio' : 'Talk Show Plateau'}
              </span>

              <button className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-lg hover:scale-110 transition">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                {show.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">Avec {show.host}</p>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-800/80 pt-3">
                <Clock className="h-3.5 w-3.5" />
                <span>Durée : {show.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
