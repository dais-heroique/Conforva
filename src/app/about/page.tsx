import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShieldCheck, Globe, FileText, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "À propos — Conforva",
  description: "Conforva simplifie la conformité GPSR pour les e-commerçants européens. Découvrez notre mission, notre technologie et nos engagements.",
}

const VALUES = [
  {
    icon: ShieldCheck,
    color: "bg-blue-100 text-blue-600",
    title: "Précision avant tout",
    desc: "Chaque document généré s'appuie sur le texte réglementaire officiel (Règlement (UE) 2023/988), les normes harmonisées CEN/CENELEC et la méthodologie ISO 12100:2010. Nous ne fabriquons pas de conformité — nous la structurons.",
  },
  {
    icon: Globe,
    color: "bg-emerald-100 text-emerald-600",
    title: "Transparence sur les limites",
    desc: "Conforva est un outil d'aide à la décision, pas un organisme notifié. Nos documents constituent une base solide, mais la responsabilité finale de conformité reste celle de l'opérateur économique. Nous le rappelons clairement à chaque étape.",
  },
  {
    icon: FileText,
    color: "bg-violet-100 text-violet-600",
    title: "Données protégées",
    desc: "Vos données produits ne sont jamais utilisées pour entraîner des modèles d'IA. Elles sont chiffrées en transit et au repos, hébergées en Union Européenne, et vous restent exclusivement accessibles.",
  },
]

const TIMELINE = [
  { date: "Déc. 2024", event: "Entrée en vigueur du Règlement GPSR (UE) 2023/988. Des milliers d'e-commerçants européens découvrent leurs nouvelles obligations sans accompagnement adapté." },
  { date: "Janv. 2025", event: "Lancement des premières versions de Conforva : génération automatique d'analyses de risque et de dossiers techniques pour les catégories produits les plus courantes." },
  { date: "Mars 2025", event: "Ajout du support multi-marchés (US, UK, Chine, Canada, Japon, Australie) et des connecteurs Shopify et WooCommerce." },
  { date: "2026", event: "Conforva accompagne des centaines de marchands dans leur mise en conformité, couvrant plus de 7 marchés et 7 langues d'étiquetage." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main>
        {/* Hero */}
        <section className="py-20 px-5 text-center bg-gradient-to-b from-blue-50/60 to-white">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">À propos</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              La conformité GPSR ne devrait pas être un obstacle pour les bons produits.
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Conforva a été conçu pour que les e-commerçants sérieux puissent se concentrer sur leur produit —
              pas sur 300 pages de réglementation. Nous transformons les exigences complexes du Règlement GPSR
              en documents clairs, structurés et exportables.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-5 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi Conforva ?</h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Le 13 décembre 2024, le Règlement GPSR est entré en vigueur dans l'Union Européenne.
                  Pour la première fois, <strong className="text-gray-800">tous les vendeurs en ligne</strong> vendant des produits
                  aux consommateurs européens — y compris ceux basés hors de l'UE — doivent constituer un dossier
                  technique complet, réaliser une analyse de risque, rédiger une déclaration de conformité
                  et désigner une Personne Responsable.
                </p>
                <p>
                  Ces obligations, initialement conçues pour les grandes entreprises avec des équipes dédiées,
                  s'appliquent désormais aux boutiques indépendantes, aux marques DTC et aux importateurs
                  qui n'ont ni l'expertise ni les ressources pour s'y conformer seuls.
                </p>
                <p>
                  Conforva comble ce gap. Nous automatisons ce qui peut l'être, guidons ce qui ne peut pas l'être,
                  et laissons toujours l'utilisateur final valider avant d'exporter.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-gray-950 text-white p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Ce que Conforva fait</p>
              {[
                "Génère les 15 sections du dossier technique (Art. 22)",
                "Produit une analyse de risque ISO 12100:2010",
                "Rédige la déclaration UE de conformité (Art. 24)",
                "Crée des étiquettes multilingues (7 langues)",
                "Importe vos produits depuis Shopify / WooCommerce",
                "Suit la veille réglementaire EUR-Lex, Légifrance, UK, US",
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-5 bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Nos engagements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map(v => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                    <div className={`h-10 w-10 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-5 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Notre parcours</h2>
          <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[1.65rem] top-1 h-4 w-4 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                <p className="text-xs font-bold text-blue-600 mb-1">{t.date}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{t.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency box */}
        <section className="py-6 px-5 mb-10">
          <div className="max-w-3xl mx-auto rounded-2xl border border-amber-200 bg-amber-50 p-7">
            <h3 className="font-bold text-gray-900 mb-3">Ce que Conforva ne fait pas</h3>
            <ul className="space-y-2">
              {[
                "Conforva n'est pas un organisme notifié et ne délivre pas de certifications.",
                "Les documents générés ne remplacent pas l'avis d'un expert en conformité ou d'un juriste spécialisé.",
                "Conforva ne garantit pas qu'un dossier généré sera accepté par une autorité de surveillance du marché.",
                "L'analyse de risque générée par l'IA doit être relue et validée par un responsable produit avant utilisation.",
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-amber-800">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-5 text-center border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Prêt à commencer ?</h2>
          <p className="text-gray-500 text-sm mb-6">Créez votre compte gratuitement — premier dossier en moins de 5 minutes.</p>
          <Link href="/auth/login">
            <Button size="lg" className="gap-2">
              Créer un compte gratuit <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-3 text-xs text-gray-400">Aucune carte bancaire · Sans engagement</p>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
