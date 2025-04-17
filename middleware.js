import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req) {
  // We need to create a response and hand it to the supabase client to be able
  // to read the cookies.
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          res.cookies.delete({ name, ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // Define protected routes
  const protectedRoutes = ['/dashboard'] // Add more dashboard routes later
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Define auth routes
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.includes(pathname)

  // Redirect logged-out users from protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect logged-in users from auth routes to a generic dashboard for now
  if (session && isAuthRoute) {
    // TODO: Implement role-based redirect later (/dashboard/admin or /dashboard/agent)
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Allow the request to proceed
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