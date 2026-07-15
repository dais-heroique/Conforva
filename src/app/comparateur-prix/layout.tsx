import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comparateur de prix concurrent gratuit — Conforva",
  description: "Comparez gratuitement le prix d'un de vos produits à celui d'un concurrent, sans inscription. Collez deux URLs, obtenez l'écart de prix en temps réel.",
  keywords: [
    "comparateur prix gratuit", "comparer prix concurrent", "vérifier prix concurrent",
    "écart de prix e-commerce", "outil gratuit veille prix", "comparateur prix Shopify",
  ],
  alternates: {
    canonical: "https://conforva.com/comparateur-prix",
    languages: {
      "fr-FR": "https://conforva.com/comparateur-prix",
      "en-US": "https://conforva.com/en/price-comparison",
    },
  },
  openGraph: {
    title: "Comparateur de prix concurrent gratuit — Conforva",
    description: "Collez l'URL de votre produit et celle d'un concurrent, obtenez l'écart de prix en temps réel. Gratuit, sans inscription.",
    url: "https://conforva.com/comparateur-prix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparateur de prix concurrent gratuit — Conforva",
    description: "Comparez vos prix à ceux d'un concurrent, gratuitement.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Comparateur de prix gratuit — Conforva",
  "url": "https://conforva.com/comparateur-prix",
  "description": "Outil gratuit qui compare en temps réel le prix d'un produit à celui d'un concurrent.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "publisher": { "@type": "Organization", "name": "Conforva", "url": "https://conforva.com" },
}

export default function ComparateurPrixLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
