'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Crown, 
  UploadCloud, 
  Heart, 
  Users, 
  Eye, 
  TrendingUp, 
  Play, 
  PlusCircle,
  Video,
  Music
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';

export default function CreatorDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar userRole="CREATOR" userFullName="Pasteur David K." hasActiveSubscription={true} />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Studio Créateur Pro</h1>
                <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-400">
                  <Crown className="h-3.5 w-3.5" /> Artiste Certifié
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Gérez vos vidéos, formations, lives et suivez la croissance de votre communauté de fans.
              </p>
            </div>

            <Link
              href="/dashboard/creator/upload"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-bold text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition"
            >
              <UploadCloud className="h-4 w-4" />
              Nouveau Téléversement
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Vues Totales</span>
                <Eye className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white">24 580</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +18% ce mois
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Membres Fan Club</span>
                <Users className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white">580</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +34 nouveaux fans
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Likes Reçus</span>
                <Heart className="h-4 w-4 text-rose-500" />
              </div>
              <div className="text-2xl font-black text-white">1 420</div>
              <div className="text-[10px] text-slate-400">Sur l&apos;ensemble de vos contenus</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Revenus Estimés (Partage)</span>
                <Crown className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">145 000 FCFA</div>
              <div className="text-[10px] text-slate-400">Virement automatique le 05</div>
            </div>
          </div>

          {/* Mes Contenus Récents */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Mes Publications Récentes</h2>
              <Link
                href="/dashboard/creator/upload"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Ajouter
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                    <Video className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Session Acoustique : &quot;Plus Près de Toi&quot;</h3>
                    <p className="text-[10px] text-slate-400">Publié le 02 Oct 2026 • Fan Club</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-400">1 240 vues</span>
                  <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold">
                    En Ligne
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Music className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Masterclass Respiration Diaphragmatique (Partie 1)</h3>
                    <p className="text-[10px] text-slate-400">Publié le 25 Sept 2026 • Formation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-400">3 420 vues</span>
                  <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold">
                    En Ligne
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer isAuthenticated={true} />
      <BottomNav userRole="CREATOR" isAuthenticated={true} />
    </div>
  );
}
