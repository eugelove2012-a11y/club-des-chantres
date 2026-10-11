'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { 
  Mic, 
  Music, 
  Users, 
  Play, 
  ArrowRight,
  Star,
  Crown,
  Gem
} from 'lucide-react';
import { CreatorCardData, FanClubLevel } from '@/types/models';
import { togglePostLikeAction, toggleFanClubMembershipAction } from '@/actions/social.action';

interface CreatorCardProps {
  creator: CreatorCardData;
}

const LEVEL_CONFIG: Record<FanClubLevel, { label: string; bg: string; icon: React.FC<{ className?: string }> }> = {
  EMERGENT: {
    label: 'ÉMERGENT',
    bg: 'bg-emerald-600 text-white border-emerald-400/80 shadow-emerald-950/20',
    icon: Star,
  },
  BRONZE: {
    label: 'BRONZE',
    bg: 'bg-gradient-to-r from-[#b07146] to-[#8c502b] text-white border-[#d28a5c]/80 shadow-amber-950/20',
    icon: Star,
  },
  ARGENT: {
    label: 'ARGENT',
    bg: 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-900 border-white shadow-slate-900/10',
    icon: Star,
  },
  OR: {
    label: 'OR',
    bg: 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 border-amber-200 shadow-amber-500/30',
    icon: Star,
  },
  PLATINE: {
    label: 'PLATINE',
    bg: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white border-sky-200 shadow-blue-500/30',
    icon: Crown,
  },
  DIAMANT: {
    label: 'DIAMANT',
    bg: 'bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 text-white border-white shadow-violet-500/30',
    icon: Gem,
  },
};

// Détermine l'icône de l'instrument ou du rôle
const getRoleIcon = (roleTitle?: string, category?: string) => {
  const title = (roleTitle || category || '').toLowerCase();
  if (title.includes('pian')) return Music;
  if (title.includes('guit')) return Music;
  if (title.includes('batt') || title.includes('drum')) return Music;
  if (title.includes('choral') || title.includes('group')) return Users;
  return Mic;
};

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const [, startTransition] = useTransition();
  const [likesCount, setLikesCount] = useState(creator.likes_count);
  const [hasLiked, setHasLiked] = useState(creator.has_liked ?? false);
  const [fansCount, setFansCount] = useState(creator.fans_count);
  const [isFan, setIsFan] = useState(creator.is_fan ?? false);

  // Détermination automatique du niveau si non spécifié
  const levelKey: FanClubLevel = creator.level || (
    fansCount >= 250 ? 'DIAMANT' :
    fansCount >= 100 ? 'PLATINE' :
    fansCount >= 50 ? 'OR' :
    fansCount >= 25 ? 'ARGENT' :
    fansCount >= 10 ? 'BRONZE' : 'EMERGENT'
  );

  const levelInfo = LEVEL_CONFIG[levelKey] || LEVEL_CONFIG.OR;
  const LevelIcon = levelInfo.icon;
  const RoleIcon = getRoleIcon(creator.role_title, creator.creator_category);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !hasLiked;
    setHasLiked(nextState);
    setLikesCount(prev => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    startTransition(async () => {
      await togglePostLikeAction(creator.id);
    });
  };

  const handleFanClub = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isFan;
    setIsFan(nextState);
    setFansCount(prev => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    startTransition(async () => {
      await toggleFanClubMembershipAction(creator.id);
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl">
      
      {/* Media Image Preview Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {creator.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={creator.avatar_url}
            alt={creator.full_name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <Mic className="h-16 w-16" />
          </div>
        )}

        {/* Ambient Dark Gradient for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Level Badge en haut à droite (OR, ARGENT, BRONZE, etc.) */}
        <div className="absolute top-3 right-3 z-20">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide border shadow-md backdrop-blur-xs ${levelInfo.bg}`}>
            <LevelIcon className="h-3.5 w-3.5 fill-current" />
            <span>{levelInfo.label}</span>
          </div>
        </div>

        {/* Play Teaser Button sur l'image */}
        <Link
          href={`/fan-club/${creator.id}`}
          aria-label="Aperçu artiste"
          className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/90 text-slate-950 shadow-lg backdrop-blur-xs transition-all duration-300 hover:scale-110 hover:bg-amber-400 opacity-0 group-hover:opacity-100"
        >
          <Play className="h-5 w-5 fill-current ml-0.5" />
        </Link>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Nom de l'artiste */}
        <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {creator.full_name}
        </h3>
        
        {/* Rôle / Instrument */}
        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <RoleIcon className="h-3.5 w-3.5 text-slate-500" />
          <span>{creator.role_title || 'Chantre'}</span>
        </div>

        {/* Compteur de fans */}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
          <Users className="h-3.5 w-3.5 text-slate-400" />
          <span>{fansCount.toLocaleString('fr-FR')} fans</span>
        </div>

        {/* Bouton d'action arrondi pill "Voir le profil ->" (Bleu royal éclatant) */}
        <div className="mt-5 pt-2">
          <Link
            href={`/fan-club/${creator.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0066f5] py-2.5 px-5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:bg-[#0052cc] hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            <span>Voir le profil</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
