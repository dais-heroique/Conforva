import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programme Partenaires & Affiliés — Gagnez 30% de commission",
  description: "Rejoignez le programme d'affiliation Conforva. Recommandez notre solution GPSR à vos clients e-commerçants et gagnez 30% de commission récurrente sur chaque abonnement. Paiement mensuel par virement.",
  keywords: [
    "programme affilié Conforva", "affiliation conformité GPSR", "partenaire Conforva",
    "commission conformité produit", "programme partenaires ecommerce", "affiliation SaaS conformité",
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
