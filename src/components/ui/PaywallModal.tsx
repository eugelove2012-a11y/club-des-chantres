'use client';

import React from 'react';
import Link from 'next/link';
import { X, Lock, CheckCircle, Crown, Sparkles, Zap } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredRole?: 'SUBSCRIBER' | 'CREATOR';
  returnUrl?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  returnUrl = '/',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl shadow-amber-500/10">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner mb-4">
          <Lock className="h-8 w-8" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Accès Réservé aux Abonnés
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Rejoignez la communauté du Club des Chantres pour débloquer les masterclasses, la Web TV live et les contenus exclusifs.
          </p>
        </div>

        {/* Plan Comparisons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Member 1000 FCFA */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pass Visiteur</span>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-white">1 000</span>
                <span className="text-xs text-slate-400">FCFA / mois</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  Accès illimité Web TV & Replays
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  Toutes les Formations & Partitions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  Adhésion Fan Clubs des chantres
                </li>
              </ul>
            </div>
            <Link
              href={`/checkout?plan=MEMBER_1000&returnUrl=${encodeURIComponent(returnUrl)}`}
              className="mt-6 flex w-full items-center justify-center py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
            >
              Choisir Pass Membre
            </Link>
          </div>

          {/* Creator 3000 FCFA */}
          <div className="relative rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-slate-900 p-5 flex flex-col justify-between shadow-lg shadow-amber-500/5">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-[10px] font-extrabold text-slate-950 uppercase tracking-wider">
              Populaire Artistes
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Espace Créateur</span>
                <Crown className="h-4 w-4 text-amber-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-white">3 000</span>
                <span className="text-xs text-slate-400">FCFA / mois</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  Tous les avantages Membre
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  Dashboard & Upload Vidéo / Audio
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  Badge Officiel 🎤 / 🎹 / 🥁
                </li>
              </ul>
            </div>
            <Link
              href={`/checkout?plan=CREATOR_3000&returnUrl=${encodeURIComponent(returnUrl)}`}
              className="mt-6 flex w-full items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 shadow-md transition"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              Devenir Créateur Pro
            </Link>
          </div>

        </div>

        <p className="mt-6 text-center text-[11px] text-slate-500">
          Sans engagement. Renouvellement mensuel via Mobile Money (Wave, Orange Money, Moov, MTN) & Carte.
        </p>
      </div>
    </div>
  );
};
