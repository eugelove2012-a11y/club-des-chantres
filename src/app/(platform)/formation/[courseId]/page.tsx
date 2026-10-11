'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HLSVideoPlayer } from '@/components/ui/HLSVideoPlayer';
import { ArrowLeft, PlayCircle, CheckCircle, FileText, Download } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
}

const CHAPTERS: Chapter[] = [
  { id: '1', title: 'Introduction & Posture du Corps', duration: '12:40', isCompleted: true },
  { id: '2', title: 'La Respiration Abdomino-Diaphragmatique', duration: '18:25', isCompleted: true },
  { id: '3', title: 'Attaque du Son & Gestion du Souffle', duration: '22:10', isCompleted: false },
  { id: '4', title: 'Le Placement des Voyelles & Résonateurs', duration: '25:30', isCompleted: false },
  { id: '5', title: 'Vibrato & Soutien sur les Notes Aiguës', duration: '30:00', isCompleted: false },
];

export default function CourseDetailPage() {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[2]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/formation"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue des formations
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Video & Lesson Content */}
        <div className="lg:col-span-8 space-y-6">
          <HLSVideoPlayer
            src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            poster="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80"
          />

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Chapitre : {activeChapter.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dans ce module pratique, travaillez les vocalises guidées pour ancrer le soutien diaphragmatique sans fatiguer vos cordes vocales avant vos temps de ministère.
            </p>

            {/* Téléchargements & Ressources */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Ressources Pédagogiques du Cours
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => alert('Téléchargement de la grille d\'accords PDF...')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition shadow-sm"
                >
                  <FileText className="h-4 w-4 text-amber-600" />
                  <span>Grille d&apos;accords & Partition (PDF)</span>
                  <Download className="h-3.5 w-3.5 text-amber-600 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Sidebar */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Sommaire du Cursus ({CHAPTERS.length} leçons)
            </h2>

            <div className="space-y-2">
              {CHAPTERS.map((ch, idx) => {
                const isActive = ch.id === activeChapter.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setActiveChapter(ch)}
                    className={`cursor-pointer flex items-center justify-between p-3.5 rounded-2xl border transition ${
                      isActive
                        ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-sm'
                        : 'border-slate-100 bg-slate-50/70 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {ch.isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <PlayCircle className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                      )}
                      <div>
                        <div className="text-xs font-semibold line-clamp-1">{idx + 1}. {ch.title}</div>
                        <div className="text-[10px] text-slate-500">{ch.duration}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
