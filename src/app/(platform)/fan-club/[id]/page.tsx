'use client';

import React, { useState, useTransition, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mic, 
  Heart, 
  Users, 
  Play, 
  Pause,
  Music, 
  Share2,
  CheckCircle2,
  Star,
  Crown,
  Gem,
  Sparkles,
  Award,
  Tv,
  Calendar,
  Eye,
  Headphones,
  Disc3,
  ExternalLink,
  Volume2,
  VolumeX,
  Youtube,
  Instagram,
  Facebook,
  Radio
} from 'lucide-react';
import { toggleFanClubMembershipAction, togglePostLikeAction } from '@/actions/social.action';
import { getCreatorById } from '@/lib/data/creators';
import { FanClubLevel } from '@/types/models';

// Custom crisp TikTok SVG icon
const TikTokIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.95-4.57V8.75a8.16 8.16 0 0 0 4.82 1.56V6.86a4.85 4.85 0 0 1-1-.17z"/>
  </svg>
);

const LEVEL_CONFIG: Record<FanClubLevel, {
  label: string;
  badgeText: string;
  badgeStyle: string;
  cardStyle: string;
  icon: React.ComponentType<{ className?: string }>;
  fanRange: string;
  advantageHighlight: string;
}> = {
  EMERGENT: {
    label: 'ÉMERGENT',
    badgeText: 'Niveau Émergent',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    cardStyle: 'bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 border-emerald-500/30 text-emerald-200',
    icon: Sparkles,
    fanRange: '0 – 9 fans actifs',
    advantageHighlight: 'Profil visible dans le catalogue • Espace de base pour ses contenus',
  },
  BRONZE: {
    label: 'BRONZE',
    badgeText: 'Niveau Bronze',
    badgeStyle: 'bg-amber-800/40 text-amber-200 border-amber-600/50',
    cardStyle: 'bg-gradient-to-r from-amber-950/60 to-amber-900/30 border-amber-600/30 text-amber-200',
    icon: Star,
    fanRange: '10 – 24 fans actifs',
    advantageHighlight: 'Profil mis en avant dans son espace • 1 vidéo mise en avant • Plus de contenus',
  },
  ARGENT: {
    label: 'ARGENT',
    badgeText: 'Niveau Argent',
    badgeStyle: 'bg-slate-300/30 text-slate-100 border-slate-300/50',
    cardStyle: 'bg-gradient-to-r from-slate-900/70 to-slate-800/40 border-slate-400/30 text-slate-200',
    icon: Award,
    fanRange: '25 – 49 fans actifs',
    advantageHighlight: 'Mise en avant sur la page du module • Plus de vidéos et audios • Éligible aux concours',
  },
  OR: {
    label: 'OR',
    badgeText: 'Niveau Or',
    badgeStyle: 'bg-amber-400/30 text-amber-300 border-amber-400/60 shadow-amber-500/20',
    cardStyle: 'bg-gradient-to-r from-amber-950/80 via-yellow-950/40 to-amber-900/40 border-amber-400/40 text-amber-100',
    icon: Star,
    fanRange: '50 – 99 fans actifs',
    advantageHighlight: 'Émission spéciale "Découverte" sur la Web TV & réseaux • Mise en avant dans les flux',
  },
  PLATINE: {
    label: 'PLATINE',
    badgeText: 'Niveau Platine',
    badgeStyle: 'bg-cyan-500/30 text-cyan-200 border-cyan-400/60 shadow-cyan-500/20',
    cardStyle: 'bg-gradient-to-r from-cyan-950/70 to-blue-950/50 border-cyan-400/40 text-cyan-100',
    icon: Crown,
    fanRange: '100 – 249 fans actifs',
    advantageHighlight: 'Émission spéciale dédiée • Visibilité renforcée prioritaire • Suivi privilégié par l’équipe',
  },
  DIAMANT: {
    label: 'DIAMANT',
    badgeText: 'Niveau Diamant',
    badgeStyle: 'bg-fuchsia-500/30 text-fuchsia-200 border-fuchsia-400/60 shadow-fuchsia-500/30',
    cardStyle: 'bg-gradient-to-r from-purple-950/80 via-fuchsia-950/50 to-indigo-950/60 border-fuchsia-400/40 text-fuchsia-100',
    icon: Gem,
    fanRange: '250+ fans actifs',
    advantageHighlight: 'Émission dédiée VIP • Visibilité maximale sur tout le module • Mise en relation avec producteurs',
  },
};

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const creator = getCreatorById(resolvedParams.id);
  const levelData = LEVEL_CONFIG[creator.level || 'OR'];
  const LevelIcon = levelData.icon;

  const [, startTransition] = useTransition();
  const [isFan, setIsFan] = useState(false);
  const [fansCount, setFansCount] = useState(creator.fans_count);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(creator.likes_count);
  const [activeTab, setActiveTab] = useState<'videos' | 'audios' | 'about'>('videos');
  
  // Audio preview state
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<string | null>(null);
  const [playingVideoModal, setPlayingVideoModal] = useState<{ id: string; title: string } | null>(null);

  const handleJoinFanClub = () => {
    const nextState = !isFan;
    setIsFan(nextState);
    setFansCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    startTransition(async () => {
      await toggleFanClubMembershipAction(creator.id);
    });
  };

  const handleLike = () => {
    const nextState = !hasLiked;
    setHasLiked(nextState);
    setLikesCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    startTransition(async () => {
      await togglePostLikeAction(creator.id);
    });
  };

  const toggleAudio = (id: string) => {
    if (currentlyPlayingAudio === id) {
      setCurrentlyPlayingAudio(null);
    } else {
      setCurrentlyPlayingAudio(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Breadcrumb Header */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <Link
            href="/fan-club"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la liste des artistes
          </Link>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider ${levelData.badgeStyle}`}>
              <LevelIcon className="h-3 w-3 fill-current" />
              {levelData.label}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">

        {/* Hero Profile Banner Card (Dark Glossy Finish) */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 p-6 sm:p-10 shadow-2xl">
          
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar with Glow & Level Ribbon */}
            <div className="relative shrink-0">
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl ring-4 ring-amber-500/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={creator.avatar_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80'}
                  alt={creator.full_name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Category Floating Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1 text-[11px] font-black text-slate-950 shadow-lg whitespace-nowrap">
                <Mic className="h-3 w-3" />
                <span>{creator.role_title || 'Chantre'}</span>
              </div>
            </div>

            {/* Info & Core Description */}
            <div className="flex-1 text-center md:text-left space-y-4">
              
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {creator.full_name}
                  </h1>
                  <span className="inline-flex items-center text-blue-400" title="Artiste certifié Club des Chantres">
                    <CheckCircle2 className="h-6 w-6 fill-blue-500/20" />
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-400">
                  <span className="font-semibold text-amber-400">{creator.country || 'Côte d’Ivoire'}</span>
                  <span>•</span>
                  <span>{creator.group_type === 'CHANTRE' ? 'Ministère du Chant' : creator.group_type === 'INSTRUMENTISTE' ? 'Instrumentiste du culte' : 'Groupe Polyphonique'}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                {creator.bio}
              </p>

              {/* Stats Counters Grid (as displayed in the mockup: fans actifs, vidéos, audios, albums) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-white">{fansCount.toLocaleString('fr-FR')}</span>
                  <span className="text-[11px] font-medium text-slate-400">Fans actifs</span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-amber-400">{creator.videos_count || 15}</span>
                  <span className="text-[11px] font-medium text-slate-400">Vidéos</span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-cyan-400">{creator.audios_count || 8}</span>
                  <span className="text-[11px] font-medium text-slate-400">Audios</span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-purple-400">{creator.albums_count || 3}</span>
                  <span className="text-[11px] font-medium text-slate-400">Albums</span>
                </div>
              </div>

              {/* Main Actions Row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                
                {/* Rejoindre le Fan Club button */}
                <button
                  onClick={handleJoinFanClub}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-extrabold text-xs transition-all shadow-lg duration-200 active:scale-95 ${
                    isFan
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/25'
                  }`}
                >
                  {isFan ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Membre officiel ({fansCount})</span>
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4" />
                      <span>Suivre / Rejoindre Fan Club</span>
                    </>
                  )}
                </button>

                {/* Écouter Button */}
                <button
                  onClick={() => {
                    const firstAudio = creator.audios?.[0]?.id || 'a1';
                    toggleAudio(firstAudio);
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold border border-slate-700 transition active:scale-95 shadow-md"
                >
                  {currentlyPlayingAudio ? (
                    <>
                      <Pause className="h-4 w-4 text-amber-400 fill-current" />
                      <span>En écoute</span>
                    </>
                  ) : (
                    <>
                      <Headphones className="h-4 w-4 text-amber-400" />
                      <span>Écouter un extrait</span>
                    </>
                  )}
                </button>

                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition"
                >
                  <Heart className={`h-4 w-4 ${hasLiked ? 'text-rose-500 fill-current' : 'text-slate-400'}`} />
                  <span>{likesCount}</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `${creator.full_name} – Fan Club des Chantres`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Lien du profil copié dans le presse-papier !');
                    }
                  }}
                  aria-label="Partager"
                  className="p-3 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Social Media Links Bar (Crucial User Requirement: YouTube, TikTok, Instagram, Facebook) */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-amber-400" />
                    Réseaux sociaux officiels :
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* YouTube */}
                    <a
                      href={creator.social_links?.youtube || 'https://youtube.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000] border border-[#ff0000]/30 hover:border-[#ff0000] text-slate-200 hover:text-white transition duration-200 text-xs font-bold shadow-xs"
                    >
                      <Youtube className="h-4 w-4 text-[#ff0000] group-hover:text-white transition" />
                      <span>YouTube</span>
                    </a>

                    {/* TikTok */}
                    <a
                      href={creator.social_links?.tiktok || 'https://tiktok.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white border border-white/20 hover:border-white text-slate-200 hover:text-slate-950 transition duration-200 text-xs font-bold shadow-xs"
                    >
                      <TikTokIcon className="h-3.5 w-3.5 text-pink-500 group-hover:text-slate-950 transition" />
                      <span>TikTok</span>
                    </a>

                    {/* Instagram */}
                    <a
                      href={creator.social_links?.instagram || 'https://instagram.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 hover:from-pink-600 hover:via-purple-600 hover:to-amber-500 border border-pink-500/30 text-slate-200 hover:text-white transition duration-200 text-xs font-bold shadow-xs"
                    >
                      <Instagram className="h-4 w-4 text-pink-400 group-hover:text-white transition" />
                      <span>Instagram</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href={creator.social_links?.facebook || 'https://facebook.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1877f2]/10 hover:bg-[#1877f2] border border-[#1877f2]/30 hover:border-[#1877f2] text-slate-200 hover:text-white transition duration-200 text-xs font-bold shadow-xs"
                    >
                      <Facebook className="h-4 w-4 text-[#1877f2] group-hover:text-white transition" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Level Advantage Spotlight Card (From Mockup 2: "Éligible à une émission spéciale...") */}
        <div className={`rounded-3xl border p-5 sm:p-6 shadow-xl ${levelData.cardStyle}`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              <Tv className="h-6 w-6" />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  Statut & Avantages : {levelData.badgeText} ({levelData.fanRange})
                </span>
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-black text-amber-300 border border-amber-400/30 uppercase">
                  Actif
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {levelData.advantageHighlight}
              </p>
            </div>
            <Link
              href="/fan-club"
              className="shrink-0 text-xs font-bold text-amber-300 hover:text-white underline underline-offset-4"
            >
              Voir la grille des 6 paliers
            </Link>
          </div>
        </div>

        {/* Multimedia Tabs Navigation (Vidéos & Lives / Audios & Cantiques / À propos) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition ${
                activeTab === 'videos'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Vidéos & Clips ({creator.videos?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('audios')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition ${
                activeTab === 'audios'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Music className="h-3.5 w-3.5" />
              <span>Audios & Cantiques ({creator.audios?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition ${
                activeTab === 'about'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>À propos & Ministère</span>
            </button>
          </div>

          {/* TAB 1: VIDEOS */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(creator.videos || []).map((video) => (
                  <div
                    key={video.id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/5"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

                      {/* Play Button Overlay */}
                      <button
                        onClick={() => setPlayingVideoModal(video)}
                        className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-bold shadow-lg transition-transform duration-300 group-hover:scale-110"
                      >
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </button>

                      {/* Duration Tag */}
                      <div className="absolute bottom-2.5 right-2.5 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono font-bold text-white backdrop-blur-xs">
                        {video.duration}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {video.views} vues
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {video.date}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setPlayingVideoModal(video)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 py-2 text-xs font-bold text-white transition border border-slate-700"
                      >
                        <Play className="h-3.5 w-3.5 fill-current text-amber-400" />
                        <span>Regarder la vidéo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AUDIOS & CANTIQUES */}
          {activeTab === 'audios' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Titre & Album</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Écoutes & Durée</span>
              </div>

              <div className="space-y-2">
                {(creator.audios || []).map((track) => {
                  const isPlaying = currentlyPlayingAudio === track.id;
                  return (
                    <div
                      key={track.id}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                        isPlaying
                          ? 'border-amber-400/60 bg-amber-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleAudio(track.id)}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold transition shadow-md ${
                            isPlaying
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-800 text-white hover:bg-amber-400 hover:text-slate-950'
                          }`}
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4 fill-current" />
                          ) : (
                            <Play className="h-4 w-4 fill-current ml-0.5" />
                          )}
                        </button>

                        <div>
                          <h4 className="font-bold text-sm text-white flex items-center gap-2">
                            {track.title}
                            {isPlaying && (
                              <span className="flex gap-0.5 items-end h-3">
                                <span className="w-1 bg-amber-400 h-2 animate-bounce" />
                                <span className="w-1 bg-amber-400 h-3 animate-bounce [animation-delay:0.15s]" />
                                <span className="w-1 bg-amber-400 h-1.5 animate-bounce [animation-delay:0.3s]" />
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Disc3 className="h-3 w-3 text-amber-500" />
                            {track.album}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-xs text-slate-400">
                        <span className="hidden sm:inline font-mono">{track.plays} écoutes</span>
                        <span className="font-mono font-bold text-slate-300">{track.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentlyPlayingAudio && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Headphones className="h-5 w-5 text-amber-400 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-white">Lecture en cours : extrait spirituel</p>
                      <p className="text-[11px] text-amber-200/80">Cantique d&apos;onction et de bénédiction</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentlyPlayingAudio(null)}
                    className="text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Arrêter
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Mission & Ministère</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {creator.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-1">Origine & Localisation</h4>
                  <p className="text-sm text-white font-semibold">{creator.country || 'Côte d’Ivoire'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-1">Palier Fan Club Actuel</h4>
                  <p className="text-sm text-white font-semibold">{levelData.badgeText} ({creator.fans_count} fidèles)</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Video Modal Preview */}
      {playingVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">{playingVideoModal.title}</h3>
              <button
                onClick={() => setPlayingVideoModal(null)}
                className="rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl bg-black flex items-center justify-center overflow-hidden">
              <div className="text-center space-y-3">
                <Tv className="h-12 w-12 text-amber-400 mx-auto animate-pulse" />
                <p className="text-sm font-bold text-white">Lecture de la vidéo exclusive</p>
                <p className="text-xs text-slate-400">Flux Web TV sécurisé Club des Chantres</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
