'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Clock, BookOpen, Mic, Music, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  discipline: 'CHANT' | 'PIANO' | 'BATTERIE';
  instructor: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  chaptersCount: number;
  thumbnail: string;
}

const COURSES_CATALOG: Course[] = [
  {
    id: 'cours-vocal-1',
    title: 'Fondations Vocales : Respiration & Puissance sans Forcer',
    discipline: 'CHANT',
    instructor: 'Pasteur David K.',
    difficulty: 'Débutant',
    duration: '2h 45m',
    chaptersCount: 8,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cours-piano-1',
    title: 'Harmonie Gospel : Les Voicings 2-5-1 et Enchaînements Modernes',
    discipline: 'PIANO',
    instructor: 'Emmanuel B. (Mano)',
    difficulty: 'Intermédiaire',
    duration: '3h 30m',
    chaptersCount: 12,
    thumbnail: 'https://images.unsplash.com/photo-1520523839898-507128ef5b7e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cours-batterie-1',
    title: 'Batterie d’Église : Rythmes Afro-Gospel, Seben et Dynamique',
    discipline: 'BATTERIE',
    instructor: 'Samuel Groove',
    difficulty: 'Avancé',
    duration: '3h 10m',
    chaptersCount: 10,
    thumbnail: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&auto=format&fit=crop&q=80',
  },
];

export default function FormationPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');

  const filteredCourses = COURSES_CATALOG.filter((course) => {
    return selectedDiscipline === 'ALL' || course.discipline === selectedDiscipline;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-amber-400" />
          Académie & Formations Gospel
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Perfectionnez votre jeu et votre technique avec nos cursus vidéo structurés et téléchargez les partitions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs font-semibold no-scrollbar">
        <button
          onClick={() => setSelectedDiscipline('ALL')}
          className={`px-4 py-2 rounded-xl transition ${
            selectedDiscipline === 'ALL'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Tous les cursus ({COURSES_CATALOG.length})
        </button>
        <button
          onClick={() => setSelectedDiscipline('CHANT')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
            selectedDiscipline === 'CHANT'
              ? 'bg-rose-500 text-white font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Mic className="h-3.5 w-3.5" /> Chant & Voix
        </button>
        <button
          onClick={() => setSelectedDiscipline('PIANO')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
            selectedDiscipline === 'PIANO'
              ? 'bg-indigo-500 text-white font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Music className="h-3.5 w-3.5" /> Piano & Harmonie
        </button>
        <button
          onClick={() => setSelectedDiscipline('BATTERIE')}
          className={`px-4 py-2 rounded-xl transition ${
            selectedDiscipline === 'BATTERIE'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Batterie & Rythmes
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-amber-500/40 transition-all shadow-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                {course.difficulty}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                {course.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">Formateur : {course.instructor}</p>

              <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 border-t border-slate-800/80 pt-3">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.chaptersCount} chapitres</span>
              </div>

              <div className="mt-4 pt-2">
                <Link
                  href={`/formation/${course.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-white hover:bg-amber-500 hover:text-slate-950 transition"
                >
                  <span>Suivre le cours</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
