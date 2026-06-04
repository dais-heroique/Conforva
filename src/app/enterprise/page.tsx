import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, Zap, Shield, Globe, Users, FileText,
  Code2, Headphones, BarChart3, Lock, Building2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Enterprise | Conforva — Conformité GPSR pour grands comptes",
  description: "Solution Enterprise Conforva : tarification au volume, API RESTful, intégrations ERP/PIM, SLA garantis et gestionnaire de compte dédié pour les grands e-commerçants.",
}

const VOLUME_TIERS = [
  { range: "Jusqu'à 150", price: "199", plan: "Pro" },
  { range: "150 – 500", price: "490", plan: "Enterprise S" },
  { range: "500 – 2 000", price: "990", plan: "Enterprise M" },
  { range: "2 000 – 10 000", price: "1 990", plan: "Enterprise L" },
  { range: "10 000+", price: "Sur devis", plan: "Enterprise XL" },
]

const ENTERPRISE_FEATURES = [
  {
    icon: Code2,
    color: "bg-blue-600",
    title: "API RESTful complète",
    desc: "Accès programmatique à l'ensemble de la plateforme : création de produits, déclenchement de génération, téléchargement de PDFs. Clés API avec scopes, webhooks et documentation OpenAPI.",
  },
  {
    icon: Zap,
    color: "bg-amber-500",
    title: "Connecteurs ERP / PIM",
    desc: "Synchronisation bidirectionnelle avec vos systèmes existants. Connecteurs natifs pour Akeneo, Salsify et Magento en roadmap. Intégrations custom disponibles via l'API.",
  },
  {
    icon: Shield,
    color: "bg-emerald-600",
    title: "SLA garantis",
    desc: "Disponibilité 99,9 % garantie contractuellement. Temps de réponse support < 4h en heures ouvrées (< 1h pour incidents critiques). Rapport mensuel de disponibilité.",
  },
  {
    icon: Headphones,
    color: "bg-violet-600",
    title: "Gestionnaire de compte dédié",
    desc: "Un interlocuteur unique qui connaît votre catalogue, vos marchés et vos contraintes métier. Sessions de revue trimestrielles et onboarding personnalisé pour vos équipes.",
  },
  {
    icon: BarChart3,
    color: "bg-indigo-600",
    title: "Rapports & analytics avancés",
    desc: "Tableau de bord consolidé sur l'ensemble du catalogue : taux de conformité, documents manquants, alertes par marché. Export CSV/Excel pour vos outils internes.",
  },
  {
    icon: Lock,
    color: "bg-rose-500",
    title: "Sécurité renforcée",
    desc: "SSO / SAML pour l'authentification des équipes, gestion des rôles granulaire (lecture, édition, validation, export), journaux d'audit complets exportables.",
  },
  {
    icon: Globe,
    color: "bg-teal-600",
    title: "Couverture internationale étendue",
    desc: "Documents adaptés aux exigences de 7 marchés (EU, US, GB, CN, CA, JP, AU). Étiquetage dans les 7 langues sans restriction. Veille réglementaire active sur chaque marché.",
  },
  {
    icon: Users,
    color: "bg-orange-500",
    title: "Multi-utilisateurs & workspaces",
    desc: "Nombre de sièges illimité. Organisation en équipes (qualité, export, juridique). Permissions par produit ou par catégorie pour les grands comptes avec plusieurs marques.",
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
            Pour les e-commerçants gérant des centaines ou milliers de références,
            Conforva Enterprise offre une tarification dégroissive, une API complète,
            des intégrations ERP/PIM et un accompagnement dédié.
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
          <p className="mt-3 text-xs text-gray-400">Réponse sous 24h · Démonstration disponible sur demande</p>
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
              Tous les paliers incluent l'ensemble des fonctionnalités Enterprise.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Nombre de références</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Prix indicatif / mois</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {VOLUME_TIERS.map((tier, i) => (
                  <tr key={tier.plan} className={`hover:bg-gray-50/50 ${i === 0 ? "opacity-60" : ""}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{tier.range}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        i === 0 ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-700"
                      }`}>{tier.plan}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {tier.price.includes("devis") ? tier.price : `${tier.price} €`}
                    </td>
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <Link href="/auth/login" className="text-xs text-blue-600 hover:underline">Accéder au plan Pro →</Link>
                      ) : (
                        <a href="mailto:enterprise@conforva.com?subject=Devis Enterprise" className="text-xs text-blue-600 hover:underline">Demander un devis →</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            * Prix indicatifs HT. Tarifs définitifs établis après échange sur votre volume et vos besoins spécifiques.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Fonctionnalités Enterprise</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Tout ce dont les grands comptes ont besoin</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {ENTERPRISE_FEATURES.map((f, i) => {
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

      {/* SLA Details */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">SLA & Support</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Engagements de niveau de service</h2>
            <p className="text-sm text-gray-500 max-w-xl">
              Un SLA contractuel, pas une promesse marketing.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { metric: "99,9 %", label: "Disponibilité garantie", sub: "Uptime mensuel contractuel. Compensation en crédits si non atteint." },
              { metric: "< 4h", label: "Temps de réponse support", sub: "En heures ouvrées (9h-18h CET). Moins d'1h pour incidents critiques." },
              { metric: "24h", label: "Réponse commerciale", sub: "Devis et questions Enterprise traitées le jour ouvré suivant." },
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

      {/* What's included */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Inclus dans tous les plans Enterprise</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Tout ce qui est inclus</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Références illimitées (selon palier)",
              "API RESTful avec clés et webhooks",
              "Étiquetage en 7 langues sans restriction",
              "Couverture 7 marchés (EU, US, GB, CN, CA, JP, AU)",
              "Export PDF sans watermark",
              "Dossier technique 15 sections (Art. 22)",
              "Déclaration de Conformité (Art. 24)",
              "Personne Responsable EU (Art. 16)",
              "Analyse de risque ISO 12100 complète",
              "Veille réglementaire EUR-Lex / Légifrance / UK / US",
              "Import Shopify, WooCommerce et CSV",
              "Multi-utilisateurs avec rôles et permissions",
              "SSO / SAML (Enterprise M et +)",
              "Journaux d'audit complets exportables",
              "Rapports de conformité consolidés",
              "Onboarding et formation pour vos équipes",
              "Gestionnaire de compte dédié",
              "SLA contractuel",
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
          <div className="rounded-2xl bg-blue-600 p-12 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white, transparent 50%)" }} />
            <h2 className="relative text-2xl sm:text-3xl font-bold mb-3">Prêt à mettre votre catalogue en conformité ?</h2>
            <p className="relative text-blue-100 mb-8 text-sm max-w-lg mx-auto">
              Décrivez-nous votre volume de références, vos marchés et votre stack technique.
              On vous prépare une proposition adaptée sous 24h.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:enterprise@conforva.com?subject=Demande devis Enterprise">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-md gap-2">
                  Contacter l'équipe Enterprise <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="border-blue-400 text-white hover:bg-blue-500">
                  Essayer gratuitement
                </Button>
              </Link>
            </div>
            <p className="relative mt-4 text-xs text-blue-200">
              enterprise@conforva.com · Réponse sous 24h ouvrées
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
