'use client';

import React from 'react';
import Image from 'next/image';

interface PlatformHeaderBannerProps {
  title?: string;
  subtitle?: string;
  badge?: string;
}

export const PlatformHeaderBanner: React.FC<PlatformHeaderBannerProps> = ({
  title = 'Chantres, Instrumentistes et leurs Fan Clubs',
  subtitle = 'Découvrez des talents • Suivez vos artistes • Rejoignez leurs Fan Clubs',
  badge,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 border-b border-amber-500/30 shadow-2xl">
      {/* Background Image Scénique pleine largeur avec reflets de scène */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/slide-2.jpg"
          alt="Concert & Célébration Club des Chantres"
          fill
          priority
          className="object-cover object-center opacity-45 mix-blend-luminosity scale-105"
        />
        {/* Gradients cinématiques bleu nuit & halo doré */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-radial-gradient from-blue-600/15 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-11 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo d'or officiel Club des Chantres */}
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden shadow-2xl ring-2 ring-amber-400/60 shrink-0 drop-shadow-[0_10px_20px_rgba(245,158,11,0.25)] transition-transform hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Club des Chantres Logo Officiel"
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Titre central et sous-titre */}
          <div className="text-center flex-1 max-w-2xl space-y-1">
            {badge && (
              <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-amber-300 border border-amber-400/30 mb-1">
                {badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-200 tracking-wide drop-shadow-sm pt-1">
              {subtitle}
            </p>
          </div>

          {/* Calligraphie "Unis pour servir !" */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="font-serif italic text-2xl xl:text-3xl font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-md rotate-[-3deg]">
              Unis pour servir !
            </span>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-transparent rounded-full mt-1" />
          </div>

        </div>
      </div>

      {/* Liseré fin doré au bas du bandeau */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20 shadow-xs" />
    </section>
  );
};
