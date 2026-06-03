import { headers, cookies } from 'next/headers'
import type { Locale } from '@/messages/types'
import type { Messages } from '@/messages/types'

export type { Locale, Messages }

export const LOCALES: Locale[] = ['fr', 'en', 'de', 'it', 'es']
export const DEFAULT_LOCALE: Locale = 'fr'

export async function getLocale(): Promise<Locale> {
  // Try cookie first
  const cookieStore = await cookies()
  const cookie = cookieStore.get('NEXT_LOCALE')?.value
  if (cookie && LOCALES.includes(cookie as Locale)) return cookie as Locale

  // Fall back to x-locale header set by middleware
  const h = await headers()
  const fromHeader = h.get('x-locale')
  if (fromHeader && LOCALES.includes(fromHeader as Locale)) return fromHeader as Locale

  return DEFAULT_LOCALE
}

export async function getDictionary(locale: Locale): Promise<Messages> {
  const messages = await import(`../../messages/${locale}.json`)
  return messages.default as Messages
}
