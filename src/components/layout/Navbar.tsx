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

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-6 w-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                CLUB DES <span className="text-amber-400">CHANTRES</span>
              </span>
              <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
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
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Crown className="h-3.5 w-3.5" />
                <span>{userRole === 'CREATOR' ? 'Créateur Pro' : 'Pass VIP'}</span>
              </div>
            ) : (
              <Link
                href="/checkout"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/10 transition"
              >
                <Crown className="h-3.5 w-3.5 fill-current" />
                <span>S&apos;abonner dès 1 000 F</span>
              </Link>
            )}

            {userFullName ? (
              <Link
                href={userRole === 'CREATOR' ? '/dashboard/creator' : '/profile'}
                className="flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-80 transition"
              >
                {userAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userAvatar}
                    alt={userFullName}
                    className="h-8 w-8 rounded-full object-cover border border-amber-500/40"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-200">
                    <UserIcon className="h-4 w-4" />
                  </div>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/50 transition"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Menu principal"
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col bg-slate-950 border-l border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-white text-base">Menu Navigation</span>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-900">
              <Link
                href="/checkout"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20"
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
