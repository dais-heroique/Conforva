"use client"

import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/providers/locale-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LANGUAGE_OPTIONS = [
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'it', label: 'IT', flag: '🇮🇹', name: 'Italiano' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
] as const

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter()
  const locale = useLocale()

  function handleChange(value: string) {
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  const current = LANGUAGE_OPTIONS.find(l => l.code === locale) ?? LANGUAGE_OPTIONS[0]

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className={className ?? 'w-28 text-sm'}>
        <SelectValue>
          <span className="flex items-center gap-1.5">
            <span>{current.flag}</span>
            <span>{current.label}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGE_OPTIONS.map(lang => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
