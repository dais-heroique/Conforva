import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, Shield, Globe, Users, FileText,
  Headphones, BarChart3, Building2, Package, AlertTriangle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Enterprise | Conforva — Conformité GPSR pour grands comptes",
  description: "Solution Enterprise Conforva : tarification au volume, gestionnaire dédié, SLA garantis pour les grands e-commerçants gérant plus de 150 références.",
}

const VOLUME_TIERS = [
  { range: "Jusqu'à 150 / mois", price: "199 €", plan: "Pro", note: "Plan standard" },
  { range: "150 – 500 / mois", price: "490 €", plan: "Enterprise S", note: "" },
  { range: "500 – 2 000 / mois", price: "990 €", plan: "Enterprise M", note: "" },
  { range: "2 000 – 10 000 / mois", price: "1 990 €", plan: "Enterprise L", note: "" },
  { range: "10 000+ / mois", price: "Sur devis", plan: "Enterprise XL", note: "" },
]

const ENTERPRISE_FEATURES = [
  {
    icon: Package,
    color: "bg-blue-600",
    title: "Références illimitées selon palier",
    desc: "Gérez des centaines ou milliers de références produit depuis un tableau de bord unique. Chaque référence dispose de son dossier technique complet, son analyse de risque et ses étiquettes multilingues.",
  },
  {
    icon: Globe,
    color: "bg-emerald-600",
    title: "7 marchés, 7 langues, sans restriction",
    desc: "Tous les marchés (EU, US, GB, CN, CA, JP, AU) et toutes les langues d'étiquetage (FR, EN, DE, IT, ES, ZH, JA) disponibles pour chaque référence, sans limitation.",
  },
  {
    icon: FileText,
    color: "bg-indigo-600",
    title: "Export & import complets",
    desc: "Import Shopify, WooCommerce et CSV pour alimenter rapidement votre catalogue. Export PDF de tous les documents (dossier technique, déclaration de conformité, étiquettes) sans watermark.",
  },
  {
    icon: BarChart3,
    color: "bg-amber-500",
    title: "Rapports de conformité consolidés",
    desc: "Vue d'ensemble de l'état de conformité de tout votre catalogue : taux de conformité global, documents manquants, alertes par marché, export CSV pour vos outils internes.",
  },
  {
    icon: AlertTriangle,
    color: "bg-rose-500",
    title: "Veille réglementaire active",
    desc: "Surveillance automatique des évolutions réglementaires sur EUR-Lex, Légifrance, legislation.gov.uk et eCFR. Alertes ciblées selon les marchés et catégories de vos produits.",
  },
  {
    icon: Users,
    color: "bg-violet-600",
    title: "Multi-utilisateurs & organisation",
    desc: "Plusieurs membres de votre équipe (qualité, export, juridique) peuvent accéder au même espace de travail et collaborer sur les dossiers produits.",
  },
  {
    icon: Headphones,
    color: "bg-teal-600",
    title: "Gestionnaire de compte dédié",
    desc: "Un interlocuteur unique qui connaît votre catalogue et vos contraintes. Onboarding personnalisé pour votre équipe et suivi régulier.",
  },
  {
    icon: Shield,
    color: "bg-orange-500",
    title: "SLA & support prioritaire",
    desc: "Temps de réponse support garanti contractuellement. Disponibilité 99,9 % avec engagement mensuel. Incidents critiques traités en priorité.",
  },
]

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="py-20 px-5 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-medium text-blue-700 mb-6">
            <Building2 className="h-3.5 w-3.5" />
            Conforva Enterprise
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            La conformité GPSR à l'échelle<br className="hidden sm:block" />
            <span className="text-blue-600"> de votre catalogue</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
            Pour les e-commerçants gérant plus de 150 références par mois,
            Conforva Enterprise offre une tarification dégroissive, un accès complet
            à toutes les fonctionnalités et un accompagnement dédié.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:enterprise@conforva.com">
              <Button size="lg" className="gap-2">
                Demander un devis <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Essayer gratuitement
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            enterprise@conforva.com · Réponse sous 24h ouvrées
          </p>
        </div>
      </section>

      {/* Volume Pricing */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Tarification</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Prix dégressifs selon le volume</h2>
            <p className="text-sm text-gray-500 max-w-xl">
              Plus votre catalogue est grand, plus le coût par référence baisse.
              Chaque palier Enterprise inclut l'ensemble des fonctionnalités.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Références / mois</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Prix indicatif / mois</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {VOLUME_TIERS.map((tier, i) => (
                  <tr key={tier.plan} className={`hover:bg-gray-50/50 ${i === 0 ? "opacity-50" : ""}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{tier.range}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        i === 0 ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-700"
                      }`}>{tier.plan}</span>
                      {tier.note && <span className="ml-2 text-xs text-gray-400">{tier.note}</span>}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{tier.price}</td>
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <Link href="/auth/login" className="text-xs text-blue-600 hover:underline">Accéder au plan Pro →</Link>
                      ) : (
                        <a href={`mailto:enterprise@conforva.com?subject=Devis ${tier.plan}`} className="text-xs text-blue-600 hover:underline">Demander un devis →</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Prix indicatifs HT. Tarifs définitifs établis après échange sur votre volume et vos besoins.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Fonctionnalités</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {ENTERPRISE_FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className={`h-10 w-10 rounded-xl ${f.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SLA */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">SLA & Support</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Engagements de service</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { metric: "99,9 %", label: "Disponibilité mensuelle", sub: "Garantie contractuelle. Compensation en crédits si non atteinte." },
              { metric: "< 4h", label: "Temps de réponse support", sub: "En heures ouvrées (9h-18h CET). Traitement prioritaire pour les clients Enterprise." },
              { metric: "24h", label: "Réponse commerciale", sub: "Devis et questions Enterprise traités le jour ouvré suivant la demande." },
            ].map(s => (
              <div key={s.metric} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-black text-blue-600 mb-1">{s.metric}</p>
                <p className="text-sm font-semibold text-gray-900 mb-1">{s.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All included */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Inclus dans tous les plans Enterprise</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Sans supplément, sans surprise</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Références selon palier (voir tableau ci-dessus)",
              "Étiquetage en 7 langues sans restriction",
              "Couverture 7 marchés (EU, US, GB, CN, CA, JP, AU)",
              "Export PDF sans watermark",
              "Dossier technique 15 sections (Art. 22 GPSR)",
              "Déclaration de Conformité (Art. 24 GPSR)",
              "Personne Responsable EU (Art. 16 GPSR)",
              "Analyse de risque ISO 12100 complète",
              "Veille réglementaire (EUR-Lex, Légifrance, UK, US)",
              "Import Shopify, WooCommerce et CSV",
              "Multi-utilisateurs avec accès partagé",
              "Journaux d'audit complets horodatés",
              "Rapports de conformité exportables",
              "Onboarding et formation de votre équipe",
              "Gestionnaire de compte dédié",
              "SLA contractuel avec engagement de disponibilité",
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 rounded-xl bg-white border border-gray-100 px-4 py-3 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl bg-gray-950 p-12 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white, transparent 50%)" }} />
            <h2 className="relative text-2xl sm:text-3xl font-bold mb-3">
              Prêt à mettre votre catalogue en conformité ?
            </h2>
            <p className="relative text-gray-400 mb-8 text-sm max-w-lg mx-auto">
              Indiquez-nous votre volume de références et vos marchés cibles.
              Nous vous préparons une proposition sous 24h.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:enterprise@conforva.com?subject=Demande devis Enterprise">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
                  Contacter l'équipe Enterprise <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Essayer gratuitement
                </Button>
              </Link>
            </div>
            <p className="relative mt-4 text-xs text-gray-500">
              enterprise@conforva.com
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
