'use client';

import React, { useState } from 'react';
import { useActionState } from 'react';
import Link from 'next/link';
import { uploadCreatorMediaAction, ActionState } from '@/actions/media.action';
import { UploadCloud, CheckCircle2, AlertCircle, FileAudio, FileVideo, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const initialState: ActionState = { success: false };

export default function CreatorUploadPage() {
  const [state, formAction, isPending] = useActionState(uploadCreatorMediaAction, initialState);
  const [mediaType, setMediaType] = useState<'VIDEO' | 'AUDIO' | 'STREAM_URL'>('VIDEO');

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar userRole="CREATOR" userFullName="Pasteur David K." hasActiveSubscription={true} />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          
          <Link
            href="/dashboard/creator"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au Studio Créateur
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Publier un Nouveau Média</h1>
            <p className="text-sm text-slate-600 mt-1">
              Téléversez vos compositions, masterclasses ou enregistrements pour vos abonnés et fans.
            </p>
          </div>

          {state.success && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
              <p className="text-sm font-medium">{state.message}</p>
            </div>
          )}

          {state.error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-rose-800">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-600" />
              <p className="text-sm font-medium">{state.error}</p>
            </div>
          )}

          <form action={formAction} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            
            {/* Titre */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Titre de la publication *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Ex: Masterclass Harmonies Gospel - Les substitutions d'accords"
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
              />
            </div>

            {/* Catégorie & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Section de destination *
                </label>
                <select
                  name="pageCategory"
                  required
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
                >
                  <option value="FAN_CLUB">Chantres & Fan Club</option>
                  <option value="COURSE">Académie / Formation</option>
                  <option value="WEB_TV">Web TV & Replay</option>
                  <option value="SHOW">Émission & Podcast</option>
                  <option value="NEWS">Actualité Gospel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Format du média *
                </label>
                <select
                  name="mediaType"
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value as 'VIDEO' | 'AUDIO' | 'STREAM_URL')}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
                >
                  <option value="VIDEO">Vidéo MP4 / HLS</option>
                  <option value="AUDIO">Audio MP3 / WAV</option>
                  <option value="STREAM_URL">Lien de Flux Live Externe</option>
                </select>
              </div>
            </div>

            {/* Fichier Média ou URL */}
            {mediaType === 'STREAM_URL' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  URL du Stream HLS / m3u8 *
                </label>
                <input
                  type="url"
                  name="streamUrl"
                  required
                  placeholder="https://stream.cloudflare.com/.../manifest.m3u8"
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Fichier Média ({mediaType === 'VIDEO' ? 'Vidéo HD' : 'Audio Haute Qualité'}) *
                </label>
                <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center hover:border-amber-500/50 hover:bg-amber-50/20 transition">
                  {mediaType === 'VIDEO' ? (
                    <FileVideo className="h-10 w-10 text-amber-500 mb-2" />
                  ) : (
                    <FileAudio className="h-10 w-10 text-amber-500 mb-2" />
                  )}
                  <span className="text-xs text-slate-700 font-medium">Glissez votre fichier ici ou cliquez pour parcourir</span>
                  <span className="text-[10px] text-slate-500 mt-1">MP4, WebM, MP3 jusqu&apos;à 500 Mo</span>
                  <input
                    type="file"
                    name="mediaFile"
                    accept={mediaType === 'VIDEO' ? 'video/*' : 'audio/*'}
                    required
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Miniature / Thumbnail */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Image de couverture (Miniature 16:9)
              </label>
              <div className="relative flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100/60 transition">
                <ImageIcon className="h-6 w-6 text-slate-500" />
                <span className="text-xs text-slate-600">Choisir une image JPG / PNG</span>
                <input
                  type="file"
                  name="thumbnailFile"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Description & Notes pédagogiques
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Détails du morceau, grille d'accords, passages bibliques..."
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 font-bold text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 transition disabled:opacity-50"
            >
              <UploadCloud className="h-5 w-5" />
              {isPending ? 'Téléversement et indexation...' : 'Publier le contenu'}
            </button>
          </form>
        </div>
      </main>

      <Footer isAuthenticated={true} />
    </div>
  );
}
