import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
  '/fan-club',
  '/web-tv',
  '/actualite',
  '/formation',
  '/emission',
];

const CREATOR_ONLY_ROUTES = ['/dashboard/creator'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Si Supabase n'est pas encore configuré dans .env.local, laisser passer en dev
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value, ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isCreatorRoute = CREATOR_ONLY_ROUTES.some((route) => pathname.startsWith(route));

  // 1. Visiteur non connecté tentant d'accéder à une page protégée
  if ((isProtectedRoute || isCreatorRoute) && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 2. Utilisateur connecté : Vérification de l'abonnement et du rôle
  if (user && (isProtectedRoute || isCreatorRoute)) {
    const [profileRes, subscriptionRes] = await Promise.all([
      supabase.from('profiles').select('role').eq('id', user.id).single(),
      supabase
        .from('subscriptions')
        .select('plan_type, status, current_period_end')
        .eq('user_id', user.id)
        .eq('status', 'ACTIVE')
        .gt('current_period_end', new Date().toISOString())
        .order('current_period_end', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    const profile = profileRes.data;
    const activeSubscription = subscriptionRes.data;

    // Administrateur = bypass total
    if (profile?.role === 'ADMIN') {
      return response;
    }

    // Aucun abonnement actif valide -> Redirection vers Paywall Checkout
    if (!activeSubscription) {
      const checkoutUrl = new URL('/checkout', request.url);
      checkoutUrl.searchParams.set('returnUrl', pathname);
      checkoutUrl.searchParams.set('reason', 'subscription_required');
      return NextResponse.redirect(checkoutUrl);
    }

    // Accès Studio Créateur réservé aux créateurs avec plan CREATOR_3000
    if (isCreatorRoute) {
      if (profile?.role !== 'CREATOR' || activeSubscription.plan_type !== 'CREATOR_3000') {
        const upgradeUrl = new URL('/checkout', request.url);
        upgradeUrl.searchParams.set('plan', 'CREATOR_3000');
        upgradeUrl.searchParams.set('error', 'creator_role_required');
        return NextResponse.redirect(upgradeUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
