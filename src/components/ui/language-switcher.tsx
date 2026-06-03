"use client"

import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/providers/locale-provider'
import { cn } from '@/lib/utils'

const LOCALES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
  { code: 'es', label: 'ES' },
] as const

interface LanguageSwitcherProps {
  className?: string
  variant?: 'default' | 'pills'
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const router = useRouter()
  const locale = useLocale()

  function handleChange(code: string) {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  if (variant === 'pills') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {LOCALES.map(l => (
          <button
            key={l.code}
            onClick={() => handleChange(l.code)}
            className={cn(
              'px-2 py-0.5 text-xs font-medium rounded transition-colors',
              l.code === locale
                ? 'bg-gray-900 text-white'
                : 'text-gray-400 hover:text-gray-700'
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <select
      value={locale}
      onChange={e => handleChange(e.target.value)}
      className={cn(
        'text-xs font-medium text-gray-500 bg-transparent border border-gray-200 rounded px-2 py-1 hover:border-gray-300 cursor-pointer focus:outline-none',
        className
      )}
    >
      {LOCALES.map(l => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  )
}
