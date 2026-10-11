'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mic, 
  Heart, 
  Users, 
  Play, 
  Music, 
  Share2,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { toggleFanClubMembershipAction, togglePostLikeAction } from '@/actions/social.action';

export default function CreatorProfilePage() {
  const [, startTransition] = useTransition();
  const [isFan, setIsFan] = useState(false);
  const [fansCount, setFansCount] = useState(580);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1420);

  const handleJoinFanClub = () => {
    const nextState = !isFan;
    setIsFan(nextState);
    setFansCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    startTransition(async () => {
      await toggleFanClubMembershipAction('c1');
    });
  };

  const handleLike = () => {
    const nextState = !hasLiked;
    setHasLiked(nextState);
    setLikesCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    startTransition(async () => {
      await togglePostLikeAction('c1');
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/fan-club"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au Fan Club
      </Link>

      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
              alt="Pasteur David K."
              className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
              <Mic className="h-3 w-3" /> Chantre
            </div>
          </div>

          {/* Info & Stats */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Pasteur David K.</h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Conducteur de louange et auteur-compositeur. Ministre de l’Évangile dédié à susciter une génération d’adorateurs en esprit et en vérité à travers toute la francophonie.
            </p>

            {/* Metrics */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Heart className="h-4 w-4 text-rose-500 fill-current" />
                <span className="font-bold text-slate-900">{likesCount}</span> appréciations
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Users className="h-4 w-4 text-amber-500" />
                <span className="font-bold text-slate-900">{fansCount}</span> membres du fan club
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4">
              <button
                onClick={handleJoinFanClub}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-md ${
                  isFan
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-105 shadow-amber-500/20'
                }`}
              >
                {isFan ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Membre du Fan Club
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4" /> Rejoindre le Fan Club
                  </>
                )}
              </button>

              <button
                onClick={handleLike}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold border border-slate-200"
              >
                <Heart className={`h-4 w-4 ${hasLiked ? 'text-rose-500 fill-current' : ''}`} />
                {hasLiked ? 'Aimé' : 'J’aime'}
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Pasteur David K. sur Club des Chantres',
                      url: window.location.href,
                    });
                  }
                }}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Publications / Media Feed */}
      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900">Publications & Cantiques Exclusifs</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
            <div className="relative aspect-video rounded-xl bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
                alt="Session acoustique"
                className="h-full w-full object-cover"
              />
              <button className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-md">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Session Acoustique : &quot;Plus Près de Toi&quot;</h3>
              <p className="text-xs text-slate-500 mt-1">Enregistrement live intimiste au piano-voix.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
            <div className="relative aspect-video rounded-xl bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80"
                alt="Concert Live"
                className="h-full w-full object-cover"
              />
              <button className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-md">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Extrait Concert d&apos;Adoration Abidjan</h3>
              <p className="text-xs text-slate-500 mt-1">Moment d&apos;élévation spirituelle avec 3 000 fidèles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
