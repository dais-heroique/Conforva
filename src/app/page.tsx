"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Globe, ChevronRight } from "lucide-react"

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay } } as const,
})

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── data ─── */
const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Analyse de risque structurée",
    desc: "Identification des dangers par catégorie de produit, basée sur les normes européennes en vigueur (EN 71, EN 15493, GPSR 2023/988…).",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FileText,
    title: "Dossier technique complet",
    desc: "Description produit, risques identifiés, mesures correctives, normes applicables — structuré pour être présenté à un organisme notifié.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Globe,
    title: "Étiquetage multilingue",
    desc: "Avertissements de sécurité en FR, EN, DE, IT et ES. Pictogrammes et mentions CLP inclus dans chaque export.",
    color: "bg-emerald-50 text-emerald-600",
  },
]

const STEPS = [
  { n: "01", title: "Décrivez votre produit", desc: "Catégorie, matériaux, usage, marchés cibles. Un questionnaire guidé, adapté à votre secteur." },
  { n: "02", title: "Recevez votre dossier", desc: "Analyse de risque, dossier technique et étiquettes générés automatiquement à partir des normes EU applicables." },
  { n: "03", title: "Relisez et exportez", desc: "Vous validez le contenu, exportez en PDF. Le document porte votre approbation." },
]

const PLANS = [
  { name: "Gratuit", price: "0", products: "1 référence", features: ["1 dossier complet", "Export PDF", "Étiquettes multilingues"], cta: "Créer un compte", primary: false },
  { name: "Starter", price: "29", products: "5 références", features: ["5 dossiers complets", "PDF sans watermark", "Support email"], cta: "Démarrer", primary: false },
  { name: "Growth", price: "79", products: "30 références", features: ["30 dossiers", "Import CSV", "Connecteur Shopify", "Support prioritaire"], cta: "Choisir Growth", primary: true },
  { name: "Pro", price: "199", products: "150 références", features: ["150 dossiers", "WooCommerce", "Accès API", "Support dédié"], cta: "Choisir Pro", primary: false },
]

const INCLUDED = [
  "Description détaillée du produit",
  "Identification des dangers",
  "Mesures de prévention et mitigation",
  "Normes européennes référencées",
  "Étiquettes en 5 langues",
  "Personne Responsable UE",
  "Export PDF prêt à l'emploi",
  "Historique des versions",
]

const CATEGORIES = [
  "Bougies & parfums", "Jouets", "Textiles & vêtements", "Cosmétiques",
  "Électronique", "Puériculture", "Décoration intérieure",
  "Mobilier", "Sport & loisirs", "Contact alimentaire",
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── Nav ── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-5 h-15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm select-none">C</div>
            <span className="font-semibold text-gray-900 tracking-tight">Conforva</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <a href="#comment" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors px-2 py-1">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="gap-1 text-sm">
                Commencer <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section className="relative px-5 pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* background orb */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/60 via-violet-100/40 to-transparent blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            variants={stagger(0.05)}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1.5 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
            Règlement GPSR (UE) 2023/988 · En vigueur depuis décembre 2024
          </motion.div>

          <motion.h1
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
          >
            Conformité GPSR,<br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent animate-gradient">
              accessible à tous
            </span>
          </motion.h1>

          <motion.p
            variants={stagger(0.22)}
            initial="hidden"
            animate="show"
            className="mt-6 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
          >
            Constituez votre dossier technique, analyse de risque et étiquettes multilingues
            pour tout produit physique vendu dans l'Union Européenne.
            Pour les vendeurs indépendants, boutiques, et marques — sans expertise technique requise.
          </motion.p>

          <motion.div
            variants={stagger(0.32)}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/auth/login">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all">
                Créer un compte gratuit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#comment">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base hover:-translate-y-0.5 transition-all">
                Voir comment ça marche
              </Button>
            </a>
          </motion.div>

          <motion.p
            variants={stagger(0.4)}
            initial="hidden"
            animate="show"
            className="mt-4 text-sm text-gray-400"
          >
            Gratuit pour 1 référence · Aucune carte bancaire requise
          </motion.p>
        </div>
      </section>

      {/* ── Categories scroll strip ── */}
      <Section className="border-y border-gray-100 py-5 bg-gray-50/60 overflow-hidden">
        <div className="flex gap-2.5 px-5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <span
              key={cat}
              className="shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 whitespace-nowrap shadow-sm"
            >
              {cat}
            </span>
          ))}
          <span className="shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-400 whitespace-nowrap">
            & bien d'autres…
          </span>
        </div>
      </Section>

      {/* ── Features ── */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Ce que vous obtenez</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trois documents, un seul outil</h2>
          </Section>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <Section key={f.title} className="h-full">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="h-full rounded-2xl border border-gray-100 bg-white p-6 space-y-4 shadow-sm cursor-default"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </motion.div>
                </Section>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="comment" className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <Section>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Processus</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Comment ça marche</h2>
          </Section>

          <div className="mt-10 grid sm:grid-cols-3 gap-6 sm:gap-8">
            {STEPS.map((s, i) => (
              <Section key={s.n} className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-3 h-full"
                >
                  <span className="text-4xl font-bold text-gray-100 select-none">{s.n}</span>
                  <h3 className="font-semibold text-gray-900 text-base">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              </Section>
            ))}
          </div>

          <Section className="mt-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-4">Inclus dans chaque dossier</p>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {INCLUDED.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="tarifs" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Tarifs</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Simple et transparent</h2>
            <p className="mt-2 text-gray-500 text-sm">Par nombre de références. Sans engagement.</p>
          </Section>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan, i) => (
              <Section key={plan.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl border p-6 flex flex-col gap-5 h-full ${
                    plan.primary
                      ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                      : "border-gray-200 bg-white shadow-sm"
                  }`}
                >
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${plan.primary ? "text-blue-200" : "text-gray-400"}`}>
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}€</span>
                      <span className={`text-sm ${plan.primary ? "text-blue-200" : "text-gray-400"}`}>/mois</span>
                    </div>
                    <p className={`text-sm mt-1 font-medium ${plan.primary ? "text-blue-100" : "text-blue-600"}`}>
                      {plan.products}
                    </p>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.primary ? "text-blue-100" : "text-gray-500"}`}>
                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.primary ? "text-blue-200" : "text-emerald-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/login">
                    <Button className="w-full" variant={plan.primary ? "secondary" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                </motion.div>
              </Section>
            ))}
          </div>

          <Section>
            <p className="mt-6 text-sm text-gray-400 text-center">
              Plus de 150 références ?{" "}
              <Link href="/auth/login" className="text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors">
                Contactez-nous
              </Link>
            </p>
          </Section>
        </div>
      </section>

      {/* ── CTA band ── */}
      <Section>
        <section className="mx-4 sm:mx-6 mb-12 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 animate-gradient px-8 py-14 text-center text-white overflow-hidden relative">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)" }} />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative text-2xl sm:text-3xl font-bold mb-3"
          >
            Commencez avec 1 produit, gratuitement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative text-blue-100 mb-7 text-sm sm:text-base"
          >
            Aucune carte bancaire · Compte créé en 30 secondes
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Link href="/auth/login">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 hover:scale-[1.03] transition-all shadow-lg gap-2">
                Créer mon compte <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 px-5">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xs">C</div>
              <span className="font-medium text-gray-600">Conforva</span>
              <span className="hidden sm:inline">— Dossiers de conformité GPSR</span>
            </div>
            <div className="flex gap-5">
              <Link href="/cgu" className="hover:text-gray-600 transition-colors">CGU</Link>
              <Link href="/privacy" className="hover:text-gray-600 transition-colors">Confidentialité</Link>
            </div>
          </div>
          {/* Disclaimer discret */}
          <p className="text-xs text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
            Les documents générés par Conforva ont vocation à être complétés avec l'aide de votre conseiller en conformité.
            Ils constituent une base de travail structurée, pas un avis juridique définitif.
          </p>
        </div>
      </footer>

    </div>
  )
}
