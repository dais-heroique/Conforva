import type { Metadata } from "next"
import HomePageFr from "./home-client-v2"

export const metadata: Metadata = {
  title: "Conforva — Surveillez les prix qui comptent",
  description: "Surveillez les produits de vos concurrents, détectez les changements de prix et recevez des alertes exploitables. Conforva transforme la veille e-commerce en décisions.",
  alternates: { canonical: "https://conforva.com", languages: { "fr-FR": "https://conforva.com", "en-US": "https://conforva.com/en" } },
  openGraph: { title: "Conforva — Sachez quand agir", description: "Surveillance produit par produit, alertes et intelligence prix pour e-commerce.", url: "https://conforva.com", type: "website" },
}

export default function Page(){return <HomePageFr/>}
