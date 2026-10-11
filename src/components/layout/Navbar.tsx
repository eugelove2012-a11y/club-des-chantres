'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Tv, 
  Users, 
  Newspaper, 
  GraduationCap, 
  Radio, 
  Home, 
  Menu, 
  X, 
  Crown,
  Sparkles,
  User as UserIcon
} from 'lucide-react';
import { UserRole } from '@/types/models';

interface NavbarProps {
  userRole?: UserRole;
  userFullName?: string | null;
  userAvatar?: string | null;
  hasActiveSubscription?: boolean;
}

const NAV_LINKS = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Chantres & Fan Club', href: '/fan-club', icon: Users },
  { name: 'Web TV', href: '/web-tv', icon: Tv },
  { name: 'Actualité', href: '/actualite', icon: Newspaper },
  { name: 'Formation', href: '/formation', icon: GraduationCap },
  { name: 'Émission', href: '/emission', icon: Radio },
];

export const Navbar: React.FC<NavbarProps> = ({
  userRole = 'GUEST',
  userFullName,
  userAvatar,
  hasActiveSubscription = false,
}) => {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activePseudo, setActivePseudo] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_pseudo');
      if (saved) setActivePseudo(saved);
    }
  }, []);

  const displayName = userFullName || activePseudo;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-6 w-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
                CLUB DES <span className="text-amber-500">CHANTRES</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                Gospel Stream & Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-700 border border-amber-500/30'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Auth & Subscription Badge */}
          <div className="hidden sm:flex items-center gap-3">
            {hasActiveSubscription ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                <Crown className="h-3.5 w-3.5" />
                <span>{userRole === 'CREATOR' ? 'Créateur Pro' : 'Pass VIP'}</span>
              </div>
            ) : (
              <Link
                href="/checkout"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-105 shadow-sm shadow-amber-500/20 transition"
              >
                <Crown className="h-3.5 w-3.5 fill-current" />
                <span>S&apos;abonner dès 1 000 F</span>
              </Link>
            )}

            {displayName ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href={userRole === 'CREATOR' ? '/dashboard/creator' : '/fan-club'}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 border border-amber-500/30 text-amber-800 hover:bg-slate-200 transition text-xs font-semibold"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-700">
                    <UserIcon className="h-3.5 w-3.5" />
                  </div>
                  <span className="max-w-[120px] truncate">{displayName}</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('user_pseudo');
                    setActivePseudo(null);
                  }}
                  title="Déconnexion"
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition"
                >
                  ✕
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 shadow-xs transition"
              >
                <UserIcon className="h-3.5 w-3.5 text-amber-500" />
                <span>Se connecter</span>
              </Link>
            )}
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Menu principal"
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200"
            >
              {mobileDrawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col bg-white border-l border-slate-200 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-slate-900 text-base">Menu Navigation</span>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-700 border border-amber-500/30'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200">
              <Link
                href="/checkout"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
              >
                <Crown className="h-4 w-4" />
                Pass Abonnement FCFA
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
