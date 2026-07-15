import type { Metadata } from "next"
import HomePageEn from "./home-client"

export const metadata: Metadata = {
  title: "Conforva — AI Competitive Intelligence for E-commerce",
  description: "Conforva monitors your competitors' prices and stock 24/7 and sends you a weekly AI report with concrete actions. Shopify, Amazon, WooCommerce, PrestaShop. Free 14-day trial.",
  keywords: [
    "competitive price monitoring", "price tracking software", "competitor price tracker",
    "AI pricing intelligence", "Shopify price monitoring", "Amazon repricing tool",
  ],
  alternates: {
    canonical: "https://conforva.com/en",
    languages: {
      "fr-FR": "https://conforva.com",
      "en-US": "https://conforva.com/en",
    },
  },
  openGraph: {
    title: "Conforva — AI Competitive Intelligence for E-commerce",
    description: "Monitor your competitors' prices 24/7. Get a weekly AI report telling you exactly what to do. Free 14-day trial.",
    url: "https://conforva.com/en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conforva — AI Competitive Intelligence",
    description: "Competitor price monitoring + actionable AI recommendations for Shopify, Amazon, WooCommerce sellers.",
  },
}

export default function Page() {
  return <HomePageEn />
}
