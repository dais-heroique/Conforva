import type { Metadata, Viewport } from "next"
import { DM_Sans, Fraunces } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { getLocale, getDictionary } from "@/lib/i18n"
import { LocaleProvider } from "@/components/providers/locale-provider"
import { AuthCallbackHandler } from "@/components/providers/auth-callback-handler"
import { Analytics } from "@vercel/analytics/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
})

const BASE_URL = "https://conforva.com"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Conforva",
      "url": BASE_URL,
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.png` },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact.conforva@gmail.com",
        "contactType": "customer support",
        "availableLanguage": ["French", "English"],
      },
    },
    {
      "@type": "SoftwareApplication",
      "name": "Conforva",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": BASE_URL,
      "description": "SaaS de conformité GPSR (Règlement UE 2023/988) pour e-commerçants. Génération automatique de dossiers techniques, analyses de risque ISO 12100 et étiquetage multilingue.",
      "offers": [
        { "@type": "Offer", "name": "Gratuit", "price": "0", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Starter", "price": "29", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Growth", "price": "79", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Pro", "price": "199", "priceCurrency": "EUR" },
      ],
      "publisher": { "@id": `${BASE_URL}/#organization` },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Conforva — Dossier GPSR en 10 min | IA | 1 produit gratuit",
    template: "%s | Conforva",
  },
  description: "Générez votre dossier technique GPSR complet en moins de 10 minutes par IA. Analyse de risques ISO 12100, déclaration de conformité UE, étiquetage multilingue. 1 produit gratuit, sans carte bancaire.",
  keywords: [
    "GPSR conformité", "dossier technique GPSR", "conformité GPSR gratuit",
    "règlement UE 2023/988", "analyse de risque ISO 12100", "déclaration de conformité UE",
    "GPSR Amazon FBA", "GPSR Shopify", "personne responsable EU", "dossier technique Article 22",
    "logiciel conformité GPSR", "Conforva",
  ],
  authors: [{ name: "Conforva", url: BASE_URL }],
  creator: "Conforva",
  publisher: "Conforva",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Conforva",
    title: "Conforva — Dossier GPSR en 10 min | IA | 1 produit gratuit",
    description: "Générez votre dossier technique GPSR complet en 10 min par IA. Analyse de risques ISO 12100, déclaration UE. 1 produit gratuit, sans carte bancaire.",
    url: BASE_URL,
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conforva — Dossier GPSR en 10 min | IA | Gratuit",
    description: "Dossier technique GPSR complet par IA en 10 minutes. Analyse de risques + Déclaration UE. 1 produit gratuit.",
  },
  alternates: { canonical: BASE_URL },
}

export const viewport: Viewport = {
  themeColor: "#060D09",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const t = await getDictionary(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className={`${dmSans.variable} ${fraunces.variable} font-[family-name:var(--font-sans)]`}>
        <LocaleProvider t={t} locale={locale}>
          {children}
        </LocaleProvider>
        <AuthCallbackHandler />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
