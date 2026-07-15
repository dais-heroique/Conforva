import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculateur de marge e-commerce gratuit — Conforva",
  description: "Calculez gratuitement votre marge, votre taux de marque et votre prix de vente idéal en tenant compte des frais Shopify, Amazon ou WooCommerce. Outil gratuit, sans inscription.",
  keywords: [
    "calculateur marge e-commerce", "calculer marge produit", "taux de marge e-commerce",
    "calculateur prix de vente", "marge Amazon FBA calcul", "calculateur marge Shopify",
  ],
  alternates: {
    canonical: "https://conforva.com/calculateur-marge-ecommerce",
    languages: {
      "fr-FR": "https://conforva.com/calculateur-marge-ecommerce",
      "en-US": "https://conforva.com/en/margin-calculator",
    },
  },
  openGraph: {
    title: "Calculateur de marge e-commerce gratuit — Conforva",
    description: "Calculez votre marge, taux de marque et prix de vente idéal en tenant compte des frais de plateforme. Gratuit, sans inscription.",
    url: "https://conforva.com/calculateur-marge-ecommerce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur de marge e-commerce gratuit — Conforva",
    description: "Calculez votre marge et votre prix de vente idéal, gratuitement.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculateur de marge e-commerce — Conforva",
  "url": "https://conforva.com/calculateur-marge-ecommerce",
  "description": "Outil gratuit de calcul de marge, taux de marque et prix de vente pour e-commerçants.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "publisher": { "@type": "Organization", "name": "Conforva", "url": "https://conforva.com" },
}

export default function CalculateurMargeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
