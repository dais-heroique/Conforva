import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingDown, Zap, Shield, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "À propos de Conforva — Notre mission",
  description: "Conforva est un agent IA de veille concurrentielle pour e-commerçants. Surveillance des prix en temps réel, alertes intelligentes et recommandations IA pour Shopify, Amazon et WooCommerce.",
  keywords: ["Conforva", "à propos Conforva", "veille concurrentielle IA", "suivi prix concurrents", "repricing e-commerce", "intelligence concurrentielle"],
  openGraph: {
    title: "À propos de Conforva — Agent IA de veille concurrentielle",
    description: "Conforva surveille vos concurrents 24h/24, détecte chaque changement de prix et génère des recommandations IA actionnables. Notre mission : donner aux e-commerçants les mêmes outils que les grandes marques.",
    url: "https://conforva.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de Conforva — Agent IA de veille concurrentielle",
    description: "Surveillance des prix en temps réel + recommandations IA pour e-commerçants.",
  },
  alternates: { canonical: "https://conforva.com/about" },
}

const VALUES = [
  {
    icon: TrendingDown,
    color: "bg-[#8B5CF6]/15 text-[#8B5CF6]",
    title: "Données fraîches, décisions rapides",
    desc: "Nos scrapers surveillent vos concurrents en continu. Chaque mouvement de prix est capturé, horodaté et analysé — pas de données périmées, pas de surprises.",
  },
  {
    icon: Zap,
    color: "bg-amber-500/15 text-amber-400",
    title: "IA actionnable, pas théorique",
    desc: "Les rapports IA de Conforva ne décrivent pas — ils prescrivent. Chaque insight vient avec une action concrète : ajuster ce prix, pousser ce produit, surveiller ce concurrent.",
  },
  {
    icon: Shield,
    color: "bg-[#8B5CF6]/15 text-[#A78BFA]",
    title: "Données protégées",
    desc: "Vos données stratégiques ne quittent jamais notre infrastructure sécurisée. Aucune revente, aucun entraînement de modèles tiers — vos informations concurrentielles restent vôtres.",
  },
]

const TIMELINE = [
  { date: "2024", event: "Constat : les outils de veille concurrentielle coûtent des milliers d'euros par mois — inaccessibles pour 99% des e-commerçants indépendants." },
  { date: "Jan. 2026", event: "Lancement de Conforva : surveillance automatique des prix concurrents avec alertes en temps réel pour Shopify, Amazon et WooCommerce." },
  { date: "Avr. 2026", event: "Intégration de l'IA pour les rapports hebdomadaires d'intelligence concurrentielle — insights actionnables, en français, chaque lundi matin." },
  { date: "2026+", event: "Conforva accompagne des centaines de marchands dans leur stratégie tarifaire, couvrant les principaux marchés européens et Nord-Américains." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNav />

      <main>
        {/* Hero */}
        <section className="py-20 px-5 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-4">À propos</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              La veille concurrentielle ne devrait pas être réservée aux grandes marques.
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Conforva a été conçu pour que les e-commerçants indépendants puissent se battre à armes égales —
              sans équipe dédiée, sans budget astronomique. Nous automatisons la surveillance des prix
              et transformons les données en décisions actionnables grâce à l'IA.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-5 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Pourquoi Conforva ?</h2>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                <p>
                  Les outils de veille concurrentielle existants (Prisync, Minderest, Price2Spy) coûtent
                  entre 400€ et 4 000€ par mois. Inaccessibles pour une boutique Shopify qui génère
                  100k€ par an.
                </p>
                <p>
                  Pourtant, <strong className="text-white">les prix sont la variable la plus impactante sur les conversions</strong> —
                  et vos concurrents les ajustent en temps réel. Chaque heure sans surveillance est
                  une heure où vous naviguez à l'aveugle.
                </p>
                <p>
                  Conforva comble ce gap. Surveillance continue, alertes intelligentes, et chaque lundi
                  matin, un rapport IA vous dit exactement quoi faire cette semaine.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Ce que Conforva fait</p>
              {[
                "Surveille vos concurrents 24h/24 en continu",
                "Détecte chaque changement de prix et de stock",
                "Alerte instantanément par email sur vos seuils",
                "Génère des rapports IA hebdomadaires",
                "Identifie les nouvelles références de vos concurrents",
                "S'intègre à Shopify, Amazon et WooCommerce",
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-5 border-y border-white/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-10 text-center">Nos engagements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map(v => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <div className={`h-10 w-10 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-5 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">Notre parcours</h2>
          <div className="relative pl-6 border-l-2 border-white/10 space-y-8">
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[1.65rem] top-1 h-4 w-4 rounded-full bg-[#8B5CF6] border-2 border-[#08090C]" />
                <p className="text-xs font-bold text-[#8B5CF6] mb-1">{t.date}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{t.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-5 text-center border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-3">Prêt à surveiller vos concurrents ?</h2>
          <p className="text-gray-400 text-sm mb-6">14 jours d'essai gratuit — aucune carte bancaire requise.</p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-[#8B5CF6] text-white hover:bg-[#7C3AED] gap-2 font-semibold">
              Commencer gratuitement <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-3 text-xs text-gray-500">Sans engagement · Annulation en 1 clic</p>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
