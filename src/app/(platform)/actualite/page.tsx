'use client';

import React from 'react';
import { Newspaper, Share2, Calendar, User, MessageSquare } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}

const NEWS_LIST: NewsItem[] = [
  {
    id: '1',
    title: 'Sortie Officielle : Le Nouvel Album du Collectif des Chantres d’Abidjan',
    category: 'Sortie Album',
    excerpt: 'Un projet de 12 titres alliant rythmes traditionnels africains, gospel contemporain et louange prophétique.',
    author: 'Rédaction Gospel',
    date: '04 Octobre 2026',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Masterclass Internationale de Batterie Gospel : 3 jours d’immersion à Lomé',
    category: 'Événement',
    excerpt: 'Les plus grands batteurs gospel se réunissent pour former la relève des musiciens d’église francophones.',
    author: 'Samuel Groove',
    date: '01 Octobre 2026',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Guide Pratique : Comment structurer une répétition d’équipe de louange efficace',
    category: 'Pédagogie',
    excerpt: 'Méthodes, astuces d’arrangement et gestion du timing pour des dimanches réussis.',
    author: 'Maestro Jonathan',
    date: '28 Septembre 2026',
    image: 'https://images.unsplash.com/photo-1520523839898-507128ef5b7e?w=600&auto=format&fit=crop&q=80',
  },
];

export default function ActualitePage() {
  const handleShare = (news: NewsItem) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Newspaper className="h-7 w-7 text-amber-400" />
          Actualité & Mag Gospel
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Suivez les dernières sorties, les annonces de concerts et les chroniques de nos mentors.
        </p>
      </div>

      {/* News Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS_LIST.map((news) => (
          <article
            key={news.id}
            className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-lg"
          >
            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={news.image}
                alt={news.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-amber-400 border border-amber-500/20">
                {news.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                {news.title}
              </h2>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {news.excerpt}
              </p>

              {/* Meta & Share */}
              <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span>{news.author}</span>
                </div>
                <button
                  onClick={() => handleShare(news)}
                  className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Partager</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
