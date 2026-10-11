'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Crown, 
  CheckCircle, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  ArrowLeft,
  Sparkles,
  Zap
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') === 'CREATOR_3000' ? 'CREATOR_3000' : 'MEMBER_1000';
  const [selectedPlan, setSelectedPlan] = useState<'MEMBER_1000' | 'CREATOR_3000'>(initialPlan);
  const [paymentMethod, setPaymentMethod] = useState<'MOBILE_MONEY' | 'CARD'>('MOBILE_MONEY');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isCreator = selectedPlan === 'CREATOR_3000';
  const price = isCreator ? 3000 : 1000;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de validation de souscription en ligne
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à l&apos;accueil
          </Link>

          {success ? (
            <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-lg">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Abonnement Activé avec Succès !</h2>
              <p className="text-sm text-slate-300">
                Votre transaction de {price} FCFA a été validée. Vous avez maintenant un accès illimité au Club des Chantres.
              </p>
              <div className="pt-4">
                <Link
                  href={isCreator ? '/dashboard/creator' : '/fan-club'}
                  className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  {isCreator ? 'Accéder à mon Studio Créateur' : 'Découvrir les contenus VIP'}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Choix de Plan */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Sélectionnez votre formule</h1>
                  <p className="text-xs text-slate-400 mt-1">Paiement récurrent sans engagement, annulable à tout moment.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Plan Membre */}
                  <div
                    onClick={() => setSelectedPlan('MEMBER_1000')}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                      selectedPlan === 'MEMBER_1000'
                        ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-300 uppercase">Pass Visiteur</span>
                      <Sparkles className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-white">1 000 <span className="text-xs font-normal text-slate-400">FCFA/mois</span></div>
                    <p className="text-xs text-slate-400 mt-3">Accès complet Web TV, Formations & Fan Club.</p>
                  </div>

                  {/* Plan Créateur */}
                  <div
                    onClick={() => setSelectedPlan('CREATOR_3000')}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                      selectedPlan === 'CREATOR_3000'
                        ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400 uppercase">Espace Créateur</span>
                      <Crown className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-white">3 000 <span className="text-xs font-normal text-slate-400">FCFA/mois</span></div>
                    <p className="text-xs text-slate-400 mt-3">Tout le Pass + Upload vidéo/audio + Badge Officiel.</p>
                  </div>
                </div>

                {/* Formulaire de paiement */}
                <form onSubmit={handlePay} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Mode de règlement</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('MOBILE_MONEY')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition ${
                        paymentMethod === 'MOBILE_MONEY'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      Mobile Money
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition ${
                        paymentMethod === 'CARD'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      Carte Bancaire
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Votre Adresse Email</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {paymentMethod === 'MOBILE_MONEY' ? (
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Numéro Mobile Money (Wave, Orange Money, Moov, MTN)
                      </label>
                      <input
                        required
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+225 07 00 00 00 00"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Numéro de Carte (16 chiffres)</label>
                      <input
                        required
                        type="text"
                        placeholder="4000 1234 5678 9010"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition disabled:opacity-50 mt-4"
                  >
                    <Zap className="h-4 w-4 fill-current" />
                    {loading ? 'Traitement en cours...' : `Valider l'abonnement (${price} FCFA)`}
                  </button>
                </form>
              </div>

              {/* Récapitulatif commande */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
                  <h3 className="font-bold text-white text-base border-b border-slate-800 pb-4">
                    Récapitulatif de votre pass
                  </h3>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Formule choisie</span>
                      <span className="font-bold text-white">
                        {isCreator ? 'Espace Créateur Pro' : 'Pass Visiteur VIP'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Périodicité</span>
                      <span className="text-amber-400">Mensuelle (Reconduction auto)</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-3 text-sm font-extrabold text-white">
                      <span>Total à payer aujourd&apos;hui</span>
                      <span className="text-amber-400">{price} FCFA</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-950 p-4 space-y-2 border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <ShieldCheck className="h-4 w-4" /> Sécurité maximale
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Vos données bancaires et Mobile Money sont chiffrées selon les normes bancaires PCI-DSS de niveau 1.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
