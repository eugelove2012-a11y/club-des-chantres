import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  let hasActiveSubscription = false;

  if (user) {
    const [profileRes, subRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'ACTIVE')
        .gt('current_period_end', new Date().toISOString())
        .limit(1)
        .maybeSingle(),
    ]);
    profile = profileRes.data;
    hasActiveSubscription = !!subRes.data || profile?.role === 'ADMIN';
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar
        userRole={profile?.role || 'GUEST'}
        userFullName={profile?.full_name || null}
        userAvatar={profile?.avatar_url || null}
        hasActiveSubscription={hasActiveSubscription}
      />
      <main className="flex-1">{children}</main>
      <Footer isAuthenticated={!!user} />
      <BottomNav
        userRole={profile?.role || 'GUEST'}
        isAuthenticated={!!user}
      />
    </div>
  );
}
