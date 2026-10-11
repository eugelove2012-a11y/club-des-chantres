'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { 
  Mic, 
  Music, 
  GraduationCap, 
  Heart, 
  Users, 
  Play, 
  ArrowRight 
} from 'lucide-react';
import { CreatorCardData, CreatorCategory } from '@/types/models';
import { togglePostLikeAction, toggleFanClubMembershipAction } from '@/actions/social.action';

interface CreatorCardProps {
  creator: CreatorCardData;
}

const CATEGORY_BADGES: Record<CreatorCategory, { label: string; icon: React.FC<{ className?: string }>; color: string }> = {
  VOCALIST: { label: 'Chantre', icon: Mic, color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
  PIANIST: { label: 'Pianiste', icon: Music, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
  DRUMMER: { 
    label: 'Batteur', 
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="8" rx="8" ry="4" />
        <path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" />
        <path d="M7 19.5 4 22" />
        <path d="M17 19.5 20 22" />
      </svg>
    ), 
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
  },
  INSTRUCTOR: { label: 'Formateur', icon: GraduationCap, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
};

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const [, startTransition] = useTransition();
  const [likesCount, setLikesCount] = useState(creator.likes_count);
  const [hasLiked, setHasLiked] = useState(creator.has_liked ?? false);
  const [fansCount, setFansCount] = useState(creator.fans_count);
  const [isFan, setIsFan] = useState(creator.is_fan ?? false);

  const badge = CATEGORY_BADGES[creator.creator_category] || CATEGORY_BADGES.VOCALIST;
  const BadgeIcon = badge.icon;

  const handleLike = () => {
    const nextState = !hasLiked;
    setHasLiked(nextState);
    setLikesCount(prev => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    startTransition(async () => {
      await togglePostLikeAction(creator.id);
    });
  };

  const handleFanClub = () => {
    const nextState = !isFan;
    setIsFan(nextState);
    setFansCount(prev => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    startTransition(async () => {
      await toggleFanClubMembershipAction(creator.id);
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg">
      
      {/* Media Video/Audio Preview Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {creator.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={creator.avatar_url}
            alt={creator.full_name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <Music className="h-16 w-16" />
          </div>
        )}

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Category Official Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur-md ${badge.color}`}>
            <BadgeIcon className="h-3.5 w-3.5" />
            <span>{badge.label}</span>
          </div>
        </div>

        {/* Play Teaser Button */}
        <Link
          href={`/fan-club/${creator.id}`}
          aria-label="Aperçu artiste"
          className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/95 text-slate-950 shadow-md backdrop-blur-xs transition-all duration-300 hover:scale-110 hover:bg-amber-400"
        >
          <Play className="h-5 w-5 fill-current ml-0.5" />
        </Link>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
          {creator.full_name}
        </h3>
        
        {creator.bio && (
          <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {creator.bio}
          </p>
        )}

        {/* Social Counters */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-medium transition ${
              hasLiked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{likesCount} likes</span>
          </button>

          <button
            onClick={handleFanClub}
            className={`flex items-center gap-1.5 text-xs font-medium transition ${
              isFan ? 'text-amber-600 font-semibold' : 'text-slate-500 hover:text-amber-600'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>{fansCount} fans</span>
          </button>
        </div>

        {/* Action: Voir plus */}
        <div className="mt-4 pt-2">
          <Link
            href={`/fan-club/${creator.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-md"
          >
            <span>Voir plus</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};
