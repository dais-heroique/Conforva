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
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'zh', label: '中文', short: 'ZH' },
  { code: 'ja', label: '日本語', short: 'JA' },
] as const

export type LangCode = typeof SUPPORTED_LANGUAGES[number]['code']

export const PLAN_LANGUAGES: Record<string, LangCode[]> = {
  free:       ['fr', 'en'],
  starter:    ['fr', 'en', 'de', 'it', 'es'],
  growth:     ['fr', 'en', 'de', 'it', 'es', 'zh', 'ja'],
  pro:        ['fr', 'en', 'de', 'it', 'es', 'zh', 'ja'],
  enterprise: ['fr', 'en', 'de', 'it', 'es', 'zh', 'ja'],
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

export const WORLD_MARKETS: { code: string; label: string; region: string }[] = [
  // Union Européenne
  { code: 'FR', label: 'France', region: 'EU' },
  { code: 'DE', label: 'Allemagne', region: 'EU' },
  { code: 'IT', label: 'Italie', region: 'EU' },
  { code: 'ES', label: 'Espagne', region: 'EU' },
  { code: 'PT', label: 'Portugal', region: 'EU' },
  { code: 'BE', label: 'Belgique', region: 'EU' },
  { code: 'NL', label: 'Pays-Bas', region: 'EU' },
  { code: 'AT', label: 'Autriche', region: 'EU' },
  { code: 'SE', label: 'Suède', region: 'EU' },
  { code: 'FI', label: 'Finlande', region: 'EU' },
  { code: 'DK', label: 'Danemark', region: 'EU' },
  { code: 'PL', label: 'Pologne', region: 'EU' },
  { code: 'CZ', label: 'Rép. tchèque', region: 'EU' },
  { code: 'RO', label: 'Roumanie', region: 'EU' },
  { code: 'HU', label: 'Hongrie', region: 'EU' },
  { code: 'IE', label: 'Irlande', region: 'EU' },
  { code: 'GR', label: 'Grèce', region: 'EU' },
  { code: 'HR', label: 'Croatie', region: 'EU' },
  { code: 'SK', label: 'Slovaquie', region: 'EU' },
  { code: 'BG', label: 'Bulgarie', region: 'EU' },
  { code: 'LU', label: 'Luxembourg', region: 'EU' },
  { code: 'LT', label: 'Lituanie', region: 'EU' },
  { code: 'LV', label: 'Lettonie', region: 'EU' },
  { code: 'EE', label: 'Estonie', region: 'EU' },
  { code: 'SI', label: 'Slovénie', region: 'EU' },
  { code: 'CY', label: 'Chypre', region: 'EU' },
  { code: 'MT', label: 'Malte', region: 'EU' },
  // Europe hors UE
  { code: 'GB', label: 'Royaume-Uni', region: 'Europe' },
  { code: 'CH', label: 'Suisse', region: 'Europe' },
  { code: 'NO', label: 'Norvège', region: 'Europe' },
  // Amériques
  { code: 'US', label: 'États-Unis', region: 'Americas' },
  { code: 'CA', label: 'Canada', region: 'Americas' },
  { code: 'MX', label: 'Mexique', region: 'Americas' },
  { code: 'BR', label: 'Brésil', region: 'Americas' },
  // Asie-Pacifique
  { code: 'CN', label: 'Chine', region: 'Asia-Pacific' },
  { code: 'JP', label: 'Japon', region: 'Asia-Pacific' },
  { code: 'KR', label: 'Corée du Sud', region: 'Asia-Pacific' },
  { code: 'AU', label: 'Australie', region: 'Asia-Pacific' },
  { code: 'NZ', label: 'Nouvelle-Zélande', region: 'Asia-Pacific' },
  { code: 'SG', label: 'Singapour', region: 'Asia-Pacific' },
  { code: 'HK', label: 'Hong Kong', region: 'Asia-Pacific' },
  { code: 'IN', label: 'Inde', region: 'Asia-Pacific' },
  // Moyen-Orient & Afrique
  { code: 'AE', label: 'Émirats Arabes Unis', region: 'MEA' },
  { code: 'SA', label: 'Arabie Saoudite', region: 'MEA' },
  { code: 'ZA', label: 'Afrique du Sud', region: 'MEA' },
]

export const WORLD_MARKET_REGIONS = ['EU', 'Europe', 'Americas', 'Asia-Pacific', 'MEA'] as const

export const DISCLAIMER_TEXT = {
  fr: 'Conforva est un outil d\'aide à la conformité GPSR. Les documents générés ne constituent pas un avis juridique et ne garantissent pas la conformité de votre produit. Une validation par un expert juridique ou un organisme notifié reste indispensable avant toute mise sur le marché UE.',
  en: 'Conforva is a GPSR compliance assistance tool. Generated documents do not constitute legal advice and do not guarantee product compliance. Validation by a legal expert or notified body remains essential before any EU market placement.',
}
