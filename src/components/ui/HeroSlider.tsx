'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Radio, 
  GraduationCap, 
  Heart, 
  Tv, 
  Sparkles,
  ArrowRight,
  Pause,
  Volume2
} from 'lucide-react';

export interface SlideData {
  id: string;
  image: string;
  tag: string;
  tagIcon: React.ReactNode;
  badgeClass: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    image: '/images/hero/slide-1.jpg',
    tag: 'DIFFUSION EN DIRECT',
    tagIcon: <Radio className="h-3.5 w-3.5 text-rose-400 animate-pulse" />,
    badgeClass: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
    title: 'Concerts de Louange &',
    highlight: 'Web TV 24/7',
    description: 'Vivez la puissance de l’adoration en streaming adaptatif HLS multi-caméras. Retransmissions de cultes géants, concerts live et moments prophétiques.',
    primaryCta: { label: 'Rejoindre le Direct Web TV', href: '/web-tv' },
    secondaryCta: { label: 'Accès Illimité (1 000 F)', href: '/checkout?plan=MEMBER_1000' },
  },
  {
    id: 'slide-2',
    image: '/images/hero/slide-2.jpg',
    tag: 'CHORALES & DIRECTION',
    tagIcon: <Sparkles className="h-3.5 w-3.5 text-amber-400" />,
    badgeClass: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    title: 'Harmonie Vocale &',
    highlight: 'Conduite de Culte',
    description: 'Équipez votre chorale et vos chantres avec les techniques des maîtres de choeur réputés : polyphonie, projection et sensibilité spirituelle.',
    primaryCta: { label: 'Explorer l’Académie', href: '/formation' },
    secondaryCta: { label: 'Espace Responsables de Louange', href: '/checkout?plan=CREATOR_3000' },
  },
  {
    id: 'slide-3',
    image: '/images/hero/slide-3.jpg',
    tag: 'ACADÉMIE DE MUSIQUE GOSPEL',
    tagIcon: <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />,
    badgeClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    title: 'Masterclasses Chant, Piano &',
    highlight: 'Partitions Inédites',
    description: 'Apprenez les accords gospel avancés (2-5-1, passing chords), le jeu de batterie dynamique et les secrets de voix avec support téléchargeable.',
    primaryCta: { label: 'Voir les Formations', href: '/formation' },
    secondaryCta: { label: 'S’inscrire aux Cours', href: '/checkout?plan=MEMBER_1000' },
  },
  {
    id: 'slide-4',
    image: '/images/hero/slide-4.jpg',
    tag: 'COMMUNAUTÉ DES CHANTRES',
    tagIcon: <Heart className="h-3.5 w-3.5 text-purple-400" />,
    badgeClass: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
    title: 'Soutenez vos Chantres au',
    highlight: 'Fan Club Officiel',
    description: 'Créez un lien privilégié avec vos ministères de louange préférés : coulisses d’enregistrements d’albums, dédicaces et bénédictions partagées.',
    primaryCta: { label: 'Découvrir les Chantres', href: '/fan-club' },
    secondaryCta: { label: 'Créer son Espace Artiste', href: '/checkout?plan=CREATOR_3000' },
  },
  {
    id: 'slide-5',
    image: '/images/hero/slide-5.jpg',
    tag: 'STUDIO & PRODUCTION TV',
    tagIcon: <Tv className="h-3.5 w-3.5 text-sky-400" />,
    badgeClass: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    title: 'Émissions, Débats &',
    highlight: 'Coulisses de la Foi',
    description: 'Plongez dans des entretiens inspirants avec des pionniers de la louange en Afrique francophone, décryptages musicaux et documentaires spirituels.',
    primaryCta: { label: 'Voir les Émissions', href: '/emission' },
    secondaryCta: { label: 'Grille des Programmes', href: '/web-tv' },
  },
];

const SLIDE_DURATION = 5500; // 5.5s per slide

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Progression fluide du slider
  useEffect(() => {
    if (isPaused) return;

    const stepMs = 50;
    const increment = (stepMs / SLIDE_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, nextSlide]);

  // Touch handlers pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div 
      className="relative w-full overflow-hidden bg-slate-950 group select-none shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container d'images avec effet crossfade fluide - Pleine Largeur Écran */}
      <div className="relative h-[580px] sm:h-[640px] lg:h-[720px] w-full overflow-hidden">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              {/* Image d'arrière-plan avec zoom progressif subtil */}
              <div className={`relative h-full w-full overflow-hidden transition-transform duration-7000 ease-out ${isActive ? 'scale-105' : 'scale-100'}`}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>

              {/* Superpositions de gradients cinématiques pour lisibilité parfaite */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent sm:w-3/4" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" />

              {/* Contenu textuel ajusté et animé - Aligné proprement au centre de l'écran */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-16 z-20">
                <div className="mx-auto max-w-7xl w-full">
                  <div className="max-w-2xl transform transition-all duration-700 delay-100">
                    
                    {/* Badge thématique */}
                    <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold tracking-wide backdrop-blur-md mb-4 shadow-lg ${slide.badgeClass}`}>
                      {slide.tagIcon}
                      <span>{slide.tag}</span>
                    </div>

                    {/* Titre avec dégradé d'or */}
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-3">
                      {slide.title}{' '}
                      <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                        {slide.highlight}
                      </span>
                    </h2>

                    {/* Description descriptive */}
                    <p className="text-sm sm:text-base text-slate-200 line-clamp-3 sm:line-clamp-none max-w-xl leading-relaxed mb-6 text-shadow-sm">
                      {slide.description}
                    </p>

                    {/* Boutons d'actions CTA */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                      <Link
                        href={slide.primaryCta.href}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        {slide.primaryCta.label}
                      </Link>

                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition"
                      >
                        {slide.secondaryCta.label}
                        <ArrowRight className="h-4 w-4 text-amber-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flèches de navigation (précédent / suivant) avec style glassmorphism */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Image précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-white backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all shadow-xl active:scale-90"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Image suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-white backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all shadow-xl active:scale-90"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Barre de navigation inférieure avec miniatures et barres de progression */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 hidden sm:flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className={`group/thumb relative h-12 w-16 overflow-hidden rounded-xl border transition-all ${
                isActive
                  ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
              title={slide.title}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="64px"
              />
              {/* Overlay de survol */}
              <div className={`absolute inset-0 transition-opacity ${isActive ? 'bg-amber-500/10' : 'bg-black/40 group-hover/thumb:bg-transparent'}`} />

              {/* Barre de progression sur la vignette active */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Indicateurs à puces pour mobile */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex sm:hidden items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
        {SLIDES.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                isActive ? 'w-6 bg-amber-400' : 'w-1.5 bg-slate-600'
              }`}
              aria-label={`Aller à la diapositive ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
