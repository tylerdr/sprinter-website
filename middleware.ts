import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Skip auth checks if Supabase is not configured
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured')
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthPath = request.nextUrl.pathname.startsWith('/auth/')
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin/')
  const isApiPath = request.nextUrl.pathname.startsWith('/api/')
  const isProposalPath = request.nextUrl.pathname.startsWith('/proposals/')

  // Redirect authenticated users away from auth pages
  if (user && isAuthPath && !request.nextUrl.pathname.includes('/callback')) {
    return NextResponse.redirect(new URL('/admin/proposals', request.url))
  }

  // Protect admin routes
  if (!user && isAdminPath) {
    const redirectUrl = new URL('/auth/signin', request.url)
    redirectUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Protected API routes (except public ones)
  const publicApiRoutes = ['/api/contact', '/api/og', '/api/proposals/chat']
  const isPublicApi = publicApiRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  
  if (!user && isApiPath && !isPublicApi && request.nextUrl.pathname !== '/api/proposals/[id]/access') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - labs/* (public demo pages)
     * - home and marketing pages
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}