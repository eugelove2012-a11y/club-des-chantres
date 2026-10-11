'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Tv, GraduationCap, User } from 'lucide-react';
import { UserRole } from '@/types/models';

interface BottomNavProps {
  userRole?: UserRole;
  isAuthenticated?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ userRole, isAuthenticated }) => {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: 'Accueil', href: '/', icon: Home },
    { label: 'Fan Club', href: '/fan-club', icon: Users },
    { label: 'Web TV', href: '/web-tv', icon: Tv },
    { label: 'Formation', href: '/formation', icon: GraduationCap },
    {
      label: userRole === 'CREATOR' ? 'Studio' : 'Compte',
      href: isAuthenticated
        ? userRole === 'CREATOR'
          ? '/dashboard/creator'
          : '/profile'
        : '/login',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 pb-safe backdrop-blur-lg lg:hidden shadow-lg">
      <div className="grid h-16 grid-cols-5 items-center px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
                isActive
                  ? 'text-amber-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.label === 'Web TV' && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
