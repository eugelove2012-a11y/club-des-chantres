'use client';

import React, { useState } from 'react';
import { HLSVideoPlayer } from '@/components/ui/HLSVideoPlayer';
import { Tv, Send, MessageCircle, Clock, Calendar, Play } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  isCreator?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', user: 'Frère David', text: 'Gloire à Dieu pour ce temps de célébration ! 🙏', time: '10:24' },
  { id: '2', user: 'Sœur Marie-Claire', text: 'Quelle onction sur ce cantique...', time: '10:25' },
  { id: '3', user: 'Pasteur David K.', text: 'Que la grâce du Seigneur repose sur chacun de vous !', time: '10:26', isCreator: true },
];

export default function WebTVPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'Moi (Membre VIP)',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <Tv className="h-7 w-7 text-amber-500" />
          Web TV Gospel Live 24/7
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Diffusez en direct, participez au chat communautaire et accédez aux rediffusions de concerts.
        </p>
      </div>

      {/* Main Streaming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* HLS Video Player */}
        <div className="lg:col-span-8 space-y-4">
          <HLSVideoPlayer
            src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            poster="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80"
            isLive={true}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">Direct Célébration & Louange Internationale</h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              En direct depuis la grande convention de louange francophone. Restez connectés pour le ministère de la parole et les temps d&apos;intercession.
            </p>
          </div>
        </div>

        {/* Live Chat Box */}
        <div className="lg:col-span-4 flex flex-col h-[480px] lg:h-auto rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-200 p-4 bg-slate-50">
            <MessageCircle className="h-4 w-4 text-amber-500" />
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Chat en direct (Abonnés)</h3>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {messages.map((m) => (
              <div key={m.id} className="text-xs space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${m.isCreator ? 'text-amber-700' : 'text-slate-800'}`}>
                    {m.user}
                  </span>
                  {m.isCreator && (
                    <span className="rounded bg-amber-500/10 px-1 py-0.2 text-[9px] font-bold text-amber-700 border border-amber-500/30">
                      Chantre
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <p className="text-slate-600 break-words">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-slate-50 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition shadow-xs"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Replays Library */}
      <div className="mt-12 space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900">Replays & Grands Concerts</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 group shadow-xs hover:border-amber-400 hover:shadow-md transition">
            <div className="relative aspect-video rounded-xl bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80"
                alt="Soirée d'adoration"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-[10px] text-white">1:45:20</div>
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
              Nuit de la Louange & Gloire
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 12 Oct 2026</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Replay HD</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 group shadow-xs hover:border-amber-400 hover:shadow-md transition">
            <div className="relative aspect-video rounded-xl bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
                alt="Festival Gospel"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-[10px] text-white">2:10:00</div>
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
              Festival Gospel Afrique Vivante
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 05 Oct 2026</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Replay HD</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 group shadow-xs hover:border-amber-400 hover:shadow-md transition">
            <div className="relative aspect-video rounded-xl bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
                alt="Culte d'actions de grâces"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-[10px] text-white">1:15:30</div>
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
              Culte d&apos;Actions de Grâces & Chœur Polyphonique
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 28 Sept 2026</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Replay HD</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
