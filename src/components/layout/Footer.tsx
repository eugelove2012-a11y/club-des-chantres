'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, LogOut, ShieldCheck, Heart } from 'lucide-react';
import { ContactModal } from './ContactModal';
import { logoutAction } from '@/actions/auth.action';

interface FooterProps {
  isAuthenticated?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isAuthenticated = false }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 pb-24 lg:pb-8 pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            {/* Info & Vision */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                <span className="text-amber-400">CLUB DES CHANTRES</span> STREAM & ACADEMY
              </h3>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                La 1ère plateforme streaming et académie de musique chrétienne en Afrique francophone.
                Formations vocales, masterclasses d&apos;instruments et Web TV 24/7 en haute définition.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 w-fit">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Paiements récurrents sécurisés Mobile Money (OM, Wave, Moov) & Cartes</span>
              </div>
            </div>

            {/* Support & Contact */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Support & Écoute</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="flex items-center gap-2 hover:text-amber-400 transition text-left text-slate-300"
                  >
                    <MessageSquare className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    Nous contacter (Support direct)
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:contact@clubdeschantres.com"
                    className="flex items-center gap-2 hover:text-amber-400 transition text-slate-300"
                  >
                    <Mail className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    contact@clubdeschantres.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Currency */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Paramètres & Légal</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Devise active :</span>
                <span className="text-xs font-bold text-amber-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded shadow-xs">
                  FCFA (XOF / XAF)
                </span>
              </div>
              <div className="flex flex-col gap-1 text-xs text-slate-400 pt-2">
                <Link href="/terms" className="hover:text-slate-200">Conditions Générales d&apos;Abonnement</Link>
                <Link href="/privacy" className="hover:text-slate-200">Politique de Confidentialité</Link>
              </div>

              {/* Dynamic Logout Button */}
              {isAuthenticated && (
                <form action={logoutAction} className="pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition px-3 py-1.5 rounded-md bg-rose-500/10 border border-rose-500/20"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Se déconnecter
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Club des Chantres. Tous droits réservés.</p>
            <p className="flex items-center gap-1">
              Conçu pour l&apos;édification et l&apos;excellence musicale <Heart className="h-3 w-3 text-rose-500 fill-current" />
            </p>
          </div>
        </div>
      </footer>

      {/* Support Interactive Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};
