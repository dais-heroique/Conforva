import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Audit GPSR gratuit — Analyse conformité produit par IA",
  description: "Testez gratuitement la conformité GPSR de votre produit. L'IA génère votre dossier technique, analyse de risques ISO 12100 et déclaration de conformité UE en moins de 30 secondes. Sans inscription.",
  keywords: [
    "audit GPSR gratuit", "test conformité GPSR", "analyse conformité produit gratuite",
    "dossier technique GPSR gratuit", "vérifier conformité GPSR", "outil conformité GPSR",
    "analyse risques produit gratuit", "déclaration conformité UE gratuite",
  ],
  alternates: { canonical: "https://conforva.com/audit-gratuit" },
  openGraph: {
    title: "Audit GPSR gratuit — Analyse conformité par IA",
    description: "Testez gratuitement la conformité GPSR de votre produit. Dossier technique, analyse de risques et déclaration UE générés par IA en 30 secondes.",
    url: "https://conforva.com/audit-gratuit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit GPSR gratuit — Analyse conformité par IA",
    description: "Testez gratuitement la conformité GPSR de votre produit. Dossier technique, analyse de risques et déclaration UE générés par IA en 30 secondes.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Audit GPSR gratuit — Conforva",
  "url": "https://conforva.com/audit-gratuit",
  "description": "Outil gratuit d'analyse de conformité GPSR. Générez en 30 secondes votre dossier technique, analyse de risques ISO 12100 et déclaration de conformité UE grâce à l'intelligence artificielle.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "publisher": { "@type": "Organization", "name": "Conforva", "url": "https://conforva.com" },
}

export default function AuditGratuitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
