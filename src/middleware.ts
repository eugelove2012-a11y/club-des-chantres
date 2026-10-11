import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES: string[] = [];
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
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const isCreatorRoute = CREATOR_ONLY_ROUTES.some((route) => pathname.startsWith(route));

  // Toutes les sections de consultation (Fan Club, Web TV, Actualités, Formations, Émissions) sont 100% publiques et accessibles librement
  if (!isCreatorRoute) {
    return response;
  }

  // Pour le Studio Créateur, vérifier si l'utilisateur est authentifié ou a un pseudo démo
  const { data: { user } } = await supabase.auth.getUser();
  const demoCookie = request.cookies.get('user_pseudo')?.value;

  if (!user && !demoCookie) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
