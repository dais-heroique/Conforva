import type { Metadata } from "next"
import MarginCalculatorClient from "./client"

export const metadata: Metadata = {
  title: "Free E-commerce Margin Calculator — Conforva",
  description: "Calculate your margin, markup, and ideal sell price for free — accounting for Shopify, Amazon, or WooCommerce fees. No signup required.",
  keywords: [
    "e-commerce margin calculator", "calculate product margin", "markup calculator",
    "sell price calculator", "Amazon FBA margin calculator", "Shopify margin calculator",
  ],
  alternates: {
    canonical: "https://conforva.com/en/margin-calculator",
    languages: {
      "fr-FR": "https://conforva.com/calculateur-marge-ecommerce",
      "en-US": "https://conforva.com/en/margin-calculator",
    },
  },
  openGraph: {
    title: "Free E-commerce Margin Calculator — Conforva",
    description: "Calculate your margin, markup, and ideal sell price accounting for platform fees. Free, no signup.",
    url: "https://conforva.com/en/margin-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free E-commerce Margin Calculator — Conforva",
    description: "Calculate your margin and ideal sell price in seconds, for free.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Conforva Margin Calculator",
  "url": "https://conforva.com/en/margin-calculator",
  "description": "Free margin, markup and sell price calculator for e-commerce sellers.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "Conforva", "url": "https://conforva.com" },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarginCalculatorClient />
    </>
  )
}
