import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req) {
  console.log('[Middleware] Running for path:', req.nextUrl.pathname);
  
  const res = NextResponse.next()
  let supabase; // Define outside try block
  try {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value
          },
          set(name, value, options) {
            // If the cookie is set, log it
            console.log('[Middleware] Setting cookie:', name);
            res.cookies.set({ name, value, ...options })
          },
          remove(name, options) {
            console.log('[Middleware] Removing cookie:', name);
            res.cookies.delete({ name, ...options })
          },
        },
      }
    )
  } catch (error) {
    console.error('[Middleware] Error creating Supabase client:', error);
    return res; // Allow request to pass if client creation fails
  }

  let session = null;
  try {
    const { data } = await supabase.auth.getSession()
    session = data.session; // Assign session from data
    console.log('[Middleware] Session data:', session ? `User ID: ${session.user.id}` : 'null');
  } catch (error) {
     console.error('[Middleware] Error getting session:', error);
     // Don't redirect on error, just log and let pass
     return res;
  }

  const { pathname } = req.nextUrl

  // Define protected routes
  const protectedRoutes = ['/dashboard'] // Add more dashboard routes later
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Define auth routes
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.includes(pathname)

  // Redirect logged-out users from protected routes
  if (!session && isProtectedRoute) {
    console.log('[Middleware] No session, redirecting from protected route to /login');
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect logged-in users from auth routes to a generic dashboard for now
  if (session && isAuthRoute) {
    console.log('[Middleware] Session found, redirecting from auth route to /dashboard');
    // TODO: Implement role-based redirect later (/dashboard/admin or /dashboard/agent)
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  console.log('[Middleware] Allowing request to proceed.');
  return res
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more exceptions.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Apply middleware specifically to these key routes for now
    // '/login',
    // '/register',
    // '/dashboard/:path*',
  ],
} 