import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programme Partenaires & Affiliés — Gagnez 30% de commission",
  description: "Rejoignez le programme d'affiliation Conforva. Recommandez notre solution de veille concurrentielle IA à vos clients e-commerçants et gagnez 30% de commission récurrente sur chaque abonnement. Paiement mensuel par virement.",
  keywords: [
    "programme affilié Conforva", "affiliation veille concurrentielle", "partenaire Conforva",
    "commission SaaS e-commerce", "programme partenaires ecommerce", "affiliation SaaS prix",
  ],
  alternates: { canonical: "https://conforva.com/partenaires" },
  openGraph: {
    title: "Programme Partenaires & Affiliés Conforva — 30% de commission",
    description: "Recommandez Conforva et gagnez 30% de commission récurrente. Idéal pour les consultants, agences et experts en e-commerce.",
    url: "https://conforva.com/partenaires",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programme Partenaires & Affiliés Conforva — 30% de commission",
    description: "Recommandez Conforva et gagnez 30% de commission récurrente sur chaque abonnement.",
  },
}

export default function PartenairesLayout({ children }: { children: React.ReactNode }) {
  return children
}
