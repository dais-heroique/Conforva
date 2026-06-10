import { NextResponse, NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const LOCALES = ['fr', 'en', 'de', 'it', 'es'] as const
type Locale = typeof LOCALES[number]
const DEFAULT_LOCALE: Locale = 'fr'

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }
  return DEFAULT_LOCALE
}

export async function proxy(request: NextRequest) {
  const locale = detectLocale(request)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  const modifiedRequest = new NextRequest(request.url, {
    method: request.method,
    headers: requestHeaders,
    body: request.body,
    // @ts-ignore
    duplex: 'half',
  })

  request.cookies.getAll().forEach(({ name, value }) => {
    modifiedRequest.cookies.set(name, value)
  })

  const supabaseResponse = await updateSession(modifiedRequest)

  if (supabaseResponse.status === 307 || supabaseResponse.status === 302 || supabaseResponse.status === 308) {
    return supabaseResponse
  }

  const finalResponse = NextResponse.next({
    request: { headers: requestHeaders },
  })

  supabaseResponse.cookies.getAll().forEach(cookie => {
    finalResponse.cookies.set(cookie)
  })

  const existingCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (!existingCookie || !LOCALES.includes(existingCookie as Locale)) {
    finalResponse.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  }

  // Affiliate referral tracking — set cookie 30 days, track click
  const url = new URL(request.url)
  const ref = url.searchParams.get('ref')
  if (ref && /^[a-zA-Z0-9_-]{2,40}$/.test(ref)) {
    const existing = request.cookies.get('conforva_ref')?.value
    finalResponse.cookies.set('conforva_ref', ref, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
      httpOnly: true,
    })
    // Track click only when a new ref is being set (not refresh with same ref)
    if (existing !== ref) {
      const base = url.origin
      fetch(`${base}/api/affiliates/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: ref }),
      }).catch(() => {})
    }
  }

  return finalResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
