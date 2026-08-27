import type { Metadata } from "next"
import HomePageEn from "./home-client-v2"

export const metadata: Metadata = {
  title: "Conforva — Know when to act",
  description: "Monitor the exact products that matter to your e-commerce business. Detect price and availability changes and turn market data into actionable decisions.",
  keywords: ["competitive price monitoring","price tracking software","e-commerce intelligence","competitor pricing"],
  alternates: { canonical: "https://conforva.com/en", languages: { "fr-FR": "https://conforva.com", "en-US": "https://conforva.com/en" } },
  openGraph: { title: "Conforva — Know when to act", description: "Product-level competitive intelligence for e-commerce.", url: "https://conforva.com/en", type: "website" },
}

export default function Page(){return <HomePageEn/>}
