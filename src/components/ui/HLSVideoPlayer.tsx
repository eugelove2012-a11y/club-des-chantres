'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Volume2, VolumeX, Maximize, Play, Pause, Radio } from 'lucide-react';

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  isLive?: boolean;
}

export const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({
  src,
  poster,
  isLive = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewerCount] = useState(148);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl"
    >
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        className="h-full w-full object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Badges En Direct & Audimat */}
      {isLive && (
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
            <Radio className="h-3.5 w-3.5" />
            <span>DIRECT</span>
          </div>
          <div className="rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-slate-300 border border-slate-700/60 backdrop-blur-md">
            {viewerCount} spectateurs
          </div>
        </div>
      )}

      {/* Barre de contrôles Custom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold transition"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
          </button>

          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="p-2 text-white hover:text-amber-400 transition"
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-rose-400" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-2 text-white hover:text-amber-400 transition"
        >
          <Maximize className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
