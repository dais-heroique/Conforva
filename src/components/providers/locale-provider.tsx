"use client"

import { createContext, useContext } from 'react'
import type { Messages, Locale } from '@/messages/types'

interface LocaleContextValue {
  t: Messages
  locale: Locale
}

const LocaleContext = createContext<LocaleContextValue>({
  t: {} as Messages,
  locale: 'fr',
})

export function useT(): Messages {
  return useContext(LocaleContext).t
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale
}

export function LocaleProvider({
  children,
  t,
  locale,
}: {
  children: React.ReactNode
  t: Messages
  locale: Locale
}) {
  return (
    <LocaleContext.Provider value={{ t, locale }}>
      {children}
    </LocaleContext.Provider>
  )
}
