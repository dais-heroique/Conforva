import { NextResponse, NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const LOCALES = ['fr', 'en', 'de', 'it', 'es'] as const
type Locale = typeof LOCALES[number]
const DEFAULT_LOCALE: Locale = 'fr'

function detectLocale(request: NextRequest): Locale {
  // 1. Check the NEXT_LOCALE cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }

  // 2. Parse the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    // Parse "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6"
    const langs = acceptLanguage
      .split(',')
      .map(part => {
        const [lang, q] = part.trim().split(';q=')
        return {
          lang: lang.trim().toLowerCase().split('-')[0], // get base language code
          q: q ? parseFloat(q) : 1.0,
        }
      })
      .sort((a, b) => b.q - a.q)

    for (const { lang } of langs) {
      if (LOCALES.includes(lang as Locale)) {
        return lang as Locale
      }
    }
  }

  return DEFAULT_LOCALE
}

export async function middleware(request: NextRequest) {
  const locale = detectLocale(request)

  // Build a new Headers object that forwards the locale to server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  // We need to inject the header into the request before passing to updateSession.
  // We create a modified request with the new header.
  const modifiedRequest = new NextRequest(request.url, {
    method: request.method,
    headers: requestHeaders,
    body: request.body,
    // @ts-ignore - duplex is needed for streaming bodies
    duplex: 'half',
  })

  // Copy cookies to the modified request
  request.cookies.getAll().forEach(({ name, value }) => {
    modifiedRequest.cookies.set(name, value)
  })

  // Run the Supabase session update with the modified request
  const supabaseResponse = await updateSession(modifiedRequest)

  // If updateSession returned a redirect, honor it
  if (supabaseResponse.status === 307 || supabaseResponse.status === 302 || supabaseResponse.status === 308) {
    return supabaseResponse
  }

  // Set the NEXT_LOCALE cookie if not already set (or if it was just detected from Accept-Language)
  const existingCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (!existingCookie || !LOCALES.includes(existingCookie as Locale)) {
    supabaseResponse.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
  }

  // Forward the x-locale header on the response so it can be read in server components
  // We rebuild the response to include the x-locale request header
  const finalResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Copy all cookies from the supabase response
  supabaseResponse.cookies.getAll().forEach(cookie => {
    finalResponse.cookies.set(cookie)
  })

  // Also set the NEXT_LOCALE cookie on the final response if needed
  if (!existingCookie || !LOCALES.includes(existingCookie as Locale)) {
    finalResponse.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
  }

  return finalResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
