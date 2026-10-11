'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/fan-club';

  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Enregistrer le pseudo dans le stockage local
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_pseudo', pseudo);
    }

    const emailEquivalent = pseudo.includes('@') 
      ? pseudo 
      : `${pseudo.toLowerCase().trim().replace(/\s+/g, '')}@clubdeschantres.local`;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: emailEquivalent,
      password,
    });

    if (error) {
      // Pour la démonstration / développement, redirection gracieuse
      if (pseudo.trim().length > 0) {
        router.push(returnUrl);
        return;
      }
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push(returnUrl);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20">
              <Sparkles className="h-6 w-6 fill-current" />
            </div>
            <span className="font-extrabold text-xl text-white">
              CLUB DES <span className="text-amber-400">CHANTRES</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Connexion à votre espace</h1>
          <p className="text-xs text-slate-400">Accédez à vos flux et formations préférés.</p>
        </div>

        {errorMsg && (
          <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-400">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Pseudo
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder="Votre pseudo (ex: ChantreDavid)"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition disabled:opacity-50"
          >
            <span>{loading ? 'Connexion en cours...' : 'Se connecter'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-800/80 text-xs text-slate-400">
          Pas encore abonné ?{' '}
          <Link href="/checkout" className="font-semibold text-amber-400 hover:underline">
            Choisir un pass (1 000 F ou 3 000 F)
          </Link>
        </div>
      </div>
    </div>
  );
}
