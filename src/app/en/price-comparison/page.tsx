import type { Metadata } from "next"
import PriceComparisonClient from "./client"

export const metadata: Metadata = {
  title: "Free Competitor Price Comparison Tool — Conforva",
  description: "Compare your product's price to a competitor's in real time, free and with no signup. Paste two URLs and see the price gap instantly.",
  keywords: [
    "free price comparison tool", "compare competitor prices", "check competitor price",
    "price gap calculator", "free competitive pricing tool",
  ],
  alternates: {
    canonical: "https://conforva.com/en/price-comparison",
    languages: {
      "fr-FR": "https://conforva.com/comparateur-prix",
      "en-US": "https://conforva.com/en/price-comparison",
    },
  },
  openGraph: {
    title: "Free Competitor Price Comparison Tool — Conforva",
    description: "Paste your product URL and a competitor's — get the price gap instantly. Free, no signup.",
    url: "https://conforva.com/en/price-comparison",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Competitor Price Comparison Tool — Conforva",
    description: "Compare your price to a competitor's in real time, free.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Conforva Price Comparison Tool",
  "url": "https://conforva.com/en/price-comparison",
  "description": "Free tool that compares a product's price to a competitor's in real time.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "Conforva", "url": "https://conforva.com" },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PriceComparisonClient />
    </>
  )
}
