import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, Shield, Globe, Users,
  Headphones, BarChart3, Building2, TrendingDown, Bell, Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Conforva Enterprise — Veille concurrentielle pour grandes équipes",
  description: "Solution Enterprise Conforva : surveillance illimitée de concurrents, rapports IA avancés, SLA 99,9 %, gestionnaire de compte dédié et API access. Pour les équipes e-commerce exigeantes.",
  keywords: [
    "Conforva Enterprise", "veille concurrentielle grands comptes", "repricing entreprise",
    "surveillance prix API", "intelligence concurrentielle SaaS", "veille e-commerce enterprise",
  ],
  openGraph: {
    title: "Conforva Enterprise — Veille concurrentielle pour grandes équipes",
    description: "Surveillance illimitée, SLA 99,9 %, API access et gestionnaire dédié. Pour les équipes e-commerce qui jouent dans la cour des grands.",
    url: "https://conforva.com/enterprise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conforva Enterprise — Veille concurrentielle illimitée",
    description: "SLA 99,9 %, API access, gestionnaire dédié. Solution Enterprise pour e-commerce.",
  },
  alternates: { canonical: "https://conforva.com/enterprise" },
}

const VOLUME_TIERS = [
  { range: "Jusqu'à 150 concurrents", price: "199 €", plan: "Pro", note: "Plan standard" },
  { range: "150 – 500 concurrents", price: "490 €", plan: "Enterprise S", note: "" },
  { range: "500 – 2 000 concurrents", price: "990 €", plan: "Enterprise M", note: "" },
  { range: "2 000 – 10 000 concurrents", price: "1 990 €", plan: "Enterprise L", note: "" },
  { range: "10 000+ concurrents", price: "Sur devis", plan: "Enterprise XL", note: "" },
]

const ENTERPRISE_FEATURES = [
  {
    icon: TrendingDown,
    title: "Surveillance illimitée",
    desc: "Trackez autant de concurrents et de produits que vous le souhaitez. Aucune limite sur le nombre d'URLs ou de marchés surveillés.",
  },
  {
    icon: Globe,
    title: "Multi-marchés & multi-plateformes",
    desc: "Couvrez tous vos marchés : Shopify, Amazon FR/DE/UK/US/IT/ES, WooCommerce, et toute URL publique. Sans restriction géographique.",
  },
  {
    icon: BarChart3,
    title: "Rapports IA avancés",
    desc: "Rapports hebdomadaires personnalisés par catégorie, par marché, par concurrent. Exports CSV/PDF pour vos outils internes.",
  },
  {
    icon: Bell,
    title: "Alertes temps réel illimitées",
    desc: "Configurez autant de règles d'alerte que nécessaire : seuils de prix, ruptures de stock, nouveaux produits — pour chaque concurrent.",
  },
  {
    icon: Zap,
    title: "API access complet",
    desc: "Intégrez les données de veille directement dans vos outils internes (PIM, ERP, repricing) via notre API REST documentée.",
  },
  {
    icon: Users,
    title: "Multi-utilisateurs & rôles",
    desc: "Gérez toute votre équipe (acheteurs, category managers, direction) depuis un espace de travail partagé avec contrôle des accès.",
  },
  {
    icon: Headphones,
    title: "Gestionnaire de compte dédié",
    desc: "Un interlocuteur unique qui connaît votre marché et vos concurrents. Onboarding personnalisé et suivi mensuel inclus.",
  },
  {
    icon: Shield,
    title: "SLA & support prioritaire",
    desc: "Temps de réponse garanti contractuellement. Disponibilité 99,9 % avec engagement mensuel. Incidents critiques en priorité.",
  },
]

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNav />

      {/* Hero */}
      <section className="py-20 px-5 border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-1.5 text-xs font-medium text-[#A78BFA] mb-6">
            <Building2 className="h-3.5 w-3.5" />
            Conforva Enterprise
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            La veille concurrentielle à l'échelle<br className="hidden sm:block" />
            <span className="text-[#A78BFA]"> de votre catalogue</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-8">
            Pour les équipes e-commerce gérant plus de 150 concurrents ou produits surveillés,
            Conforva Enterprise offre une tarification dégressive, un accès complet
            à toutes les fonctionnalités et un accompagnement dédié.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact">
              <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white gap-2">
                Demander un devis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Essayer gratuitement
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Réponse sous 24h ouvrées
          </p>
        </div>
      </section>

      {/* Volume Pricing */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-1">Tarification</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Prix dégressifs selon le volume</h2>
            <p className="text-sm text-gray-400 max-w-xl">
              Plus votre périmètre de surveillance est large, plus le coût unitaire baisse.
              Chaque palier Enterprise inclut l'ensemble des fonctionnalités.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400">Concurrents / produits surveillés</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400">Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400">Prix indicatif / mois</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {VOLUME_TIERS.map((tier, i) => (
                  <tr key={tier.plan} className={`hover:bg-white/5 ${i === 0 ? "opacity-50" : ""}`}>
                    <td className="px-6 py-4 font-medium text-white">{tier.range}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        i === 0 ? "bg-white/10 text-gray-400" : "bg-[#8B5CF6]/20 text-[#A78BFA]"
                      }`}>{tier.plan}</span>
                      {tier.note && <span className="ml-2 text-xs text-gray-500">{tier.note}</span>}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{tier.price}</td>
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <Link href="/auth/register" className="text-xs text-[#8B5CF6] hover:underline">Accéder au plan Pro →</Link>
                      ) : (
                        <Link href="/contact" className="text-xs text-[#8B5CF6] hover:underline">Demander un devis →</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Prix indicatifs HT. Tarifs définitifs établis après échange sur votre volume et vos besoins.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5 border-y border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-1">Fonctionnalités</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {ENTERPRISE_FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-[#A78BFA]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-1">SLA & Support</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Engagements de service</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { metric: "99,9 %", label: "Disponibilité mensuelle", sub: "Garantie contractuelle. Compensation en crédits si non atteinte." },
              { metric: "< 4h", label: "Temps de réponse support", sub: "En heures ouvrées (9h-18h CET). Traitement prioritaire pour les clients Enterprise." },
              { metric: "24h", label: "Réponse commerciale", sub: "Devis et questions Enterprise traités le jour ouvré suivant la demande." },
            ].map(s => (
              <div key={s.metric} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-3xl font-black text-[#8B5CF6] mb-1">{s.metric}</p>
                <p className="text-sm font-semibold text-white mb-1">{s.label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All included */}
      <section className="py-20 px-5 border-y border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-1">Inclus dans tous les plans Enterprise</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Sans supplément, sans surprise</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Surveillance concurrents selon palier (voir tableau ci-dessus)",
              "Détection des changements de prix en temps réel",
              "Alertes stock et nouveaux produits illimitées",
              "Rapports IA hebdomadaires personnalisés",
              "Historique des prix sur 12 mois glissants",
              "Export CSV / PDF sans limitation",
              "Intégration Shopify, Amazon, WooCommerce",
              "API REST complète avec documentation",
              "Multi-utilisateurs avec contrôle des accès",
              "Journaux d'activité complets horodatés",
              "Rapports de performance par concurrent/catégorie",
              "Onboarding et formation de votre équipe",
              "Gestionnaire de compte dédié",
              "SLA contractuel avec engagement de disponibilité",
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-[#8B5CF6] shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-12 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #8B5CF6, transparent 50%)" }} />
            <h2 className="relative text-2xl sm:text-3xl font-bold text-white mb-3">
              Prêt à surveiller vos concurrents sans limites ?
            </h2>
            <p className="relative text-gray-400 mb-8 text-sm max-w-lg mx-auto">
              Indiquez-nous votre volume de surveillance et vos marchés cibles.
              Nous vous préparons une proposition sous 24h.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white gap-2">
                  Contacter l'équipe Enterprise <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Essayer gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
