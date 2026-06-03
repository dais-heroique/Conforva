import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Plan } from '@/types/supabase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function getPlanLabel(plan: Plan): string {
  const labels: Record<Plan, string> = {
    free: 'Gratuit',
    starter: 'Starter',
    growth: 'Growth',
    pro: 'Pro',
    enterprise: 'Enterprise',
  }
  return labels[plan]
}

export function getComplianceColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 50) return 'text-amber-600'
  return 'text-red-600'
}

export function getComplianceBg(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800'
  if (score >= 50) return 'bg-amber-100 text-amber-800'
  return 'bg-red-100 text-red-800'
}

export const SUPPORTED_LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'es', label: 'Español' },
] as const

export type LangCode = typeof SUPPORTED_LANGUAGES[number]['code']

export const PLAN_LANGUAGES: Record<string, LangCode[]> = {
  free:       ['fr', 'en'],
  starter:    ['fr', 'en', 'de', 'it', 'es'],
  growth:     ['fr', 'en', 'de', 'it', 'es'],
  pro:        ['fr', 'en', 'de', 'it', 'es'],
  enterprise: ['fr', 'en', 'de', 'it', 'es'],
}

export const EU_COUNTRIES = [
  { code: 'FR', label: 'France' },
  { code: 'DE', label: 'Allemagne' },
  { code: 'IT', label: 'Italie' },
  { code: 'ES', label: 'Espagne' },
  { code: 'PT', label: 'Portugal' },
  { code: 'BE', label: 'Belgique' },
  { code: 'NL', label: 'Pays-Bas' },
  { code: 'AT', label: 'Autriche' },
  { code: 'SE', label: 'Suède' },
  { code: 'FI', label: 'Finlande' },
  { code: 'DK', label: 'Danemark' },
  { code: 'PL', label: 'Pologne' },
  { code: 'CZ', label: 'République tchèque' },
  { code: 'RO', label: 'Roumanie' },
  { code: 'HU', label: 'Hongrie' },
  { code: 'HR', label: 'Croatie' },
  { code: 'SK', label: 'Slovaquie' },
  { code: 'BG', label: 'Bulgarie' },
  { code: 'LT', label: 'Lituanie' },
  { code: 'LV', label: 'Lettonie' },
  { code: 'EE', label: 'Estonie' },
  { code: 'SI', label: 'Slovénie' },
  { code: 'LU', label: 'Luxembourg' },
  { code: 'CY', label: 'Chypre' },
  { code: 'MT', label: 'Malte' },
  { code: 'IE', label: 'Irlande' },
  { code: 'GR', label: 'Grèce' },
]

export const DISCLAIMER_TEXT = {
  fr: 'Conforva est un outil d\'aide à la conformité GPSR. Les documents générés ne constituent pas un avis juridique et ne garantissent pas la conformité de votre produit. Une validation par un expert juridique ou un organisme notifié reste indispensable avant toute mise sur le marché UE.',
  en: 'Conforva is a GPSR compliance assistance tool. Generated documents do not constitute legal advice and do not guarantee product compliance. Validation by a legal expert or notified body remains essential before any EU market placement.',
}
