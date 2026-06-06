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
    default: "Conforva — Dossier technique GPSR en 10 minutes",
    template: "%s — Conforva",
  },
  description: "Conforva génère votre dossier technique GPSR (UE 2023/988) en moins de 10 minutes : analyse de risque ISO 12100, 15 sections obligatoires, déclaration de conformité et étiquetage multilingue. Gratuit pour votre première référence.",
  keywords: [
    "Conforva", "GPSR", "conformité GPSR", "dossier technique GPSR", "règlement UE 2023/988",
    "analyse de risque ISO 12100", "déclaration de conformité UE", "étiquetage sécurité",
    "conformité produit UE", "personne responsable EU", "e-commerce conformité Europe",
    "sécurité produit", "Amazon FBA conformité GPSR", "dossier technique Article 22",
    "logiciel conformité GPSR", "SaaS conformité produit",
  ],
  authors: [{ name: "Conforva", url: BASE_URL }],
  creator: "Conforva",
  publisher: "Conforva",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon-96.png", sizes: "96x96", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Conforva",
    title: "Conforva — Dossier technique GPSR en 10 minutes",
    description: "Conforva génère votre dossier technique GPSR (UE 2023/988) en moins de 10 minutes : analyse de risque ISO 12100, déclaration de conformité et étiquetage multilingue. Gratuit pour votre première référence.",
    url: BASE_URL,
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conforva — Dossier technique GPSR en 10 minutes",
    description: "Analyse de risque ISO 12100, dossier 15 sections, déclaration de conformité et étiquetage multilingue. Gratuit pour votre première référence.",
  },
  alternates: { canonical: BASE_URL },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
