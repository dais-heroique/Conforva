import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
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
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.svg` },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact.conforva@gmail.com",
        "contactType": "customer support",
        "availableLanguage": ["French"],
      },
    },
    {
      "@type": "SoftwareApplication",
      "name": "Conforva",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": BASE_URL,
      "description": "Agent IA de veille concurrentielle pour e-commerçants. Surveillance des prix, stocks et nouveaux produits de vos concurrents avec analyse par intelligence artificielle.",
      "offers": [
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
    default: "Conforva — Veille concurrentielle IA pour e-commerçants",
    template: "%s | Conforva",
  },
  description: "Conforva surveille les prix et stocks de vos concurrents 24h/24 et génère des recommandations IA actionnables. Shopify, Amazon, WooCommerce. Essai gratuit 14 jours.",
  keywords: [
    "veille concurrentielle", "surveillance prix concurrents", "repricing automatique",
    "intelligence concurrentielle e-commerce", "suivi prix concurrent Shopify",
    "comparateur prix concurrent Amazon", "alerte prix concurrent", "Conforva",
  ],
  authors: [{ name: "Conforva", url: BASE_URL }],
  creator: "Conforva",
  publisher: "Conforva",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Conforva",
    title: "Conforva — Veille concurrentielle IA pour e-commerçants",
    description: "Surveillez les prix et stocks de vos concurrents 24h/24. L'IA analyse chaque mouvement et vous dit quoi faire. Essai gratuit.",
    url: BASE_URL,
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conforva — Veille concurrentielle IA",
    description: "Surveillance des prix concurrents + recommandations IA actionnables. Shopify, Amazon, WooCommerce.",
  },
  alternates: { canonical: BASE_URL },
}

export const viewport: Viewport = {
  themeColor: "#060D09",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className={`${dmSans.variable} font-[family-name:var(--font-sans)]`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
