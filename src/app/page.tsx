"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, ShieldCheck, FileText, Globe,
  ChevronRight, AlertTriangle, Users, Zap, Lock,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Analyse de risque ISO 12100",
    desc: "Identification structurée des dangers selon les normes harmonisées EU en vigueur. Chaque risque est évalué, hiérarchisé et associé à des mesures correctives documentées.",
    color: "text-blue-600 bg-blue-50",
    border: "hover:border-blue-200",
  },
  {
    icon: FileText,
    title: "Dossier technique GPSR Art. 22",
    desc: "15 sections requises par l'article 22 du règlement (UE) 2023/988 : description produit, dessins, tests, normes appliquées, évaluation des risques, mesures prises.",
    color: "text-violet-600 bg-violet-50",
    border: "hover:border-violet-200",
  },
  {
    icon: Globe,
    title: "Déclaration de Conformité UE Art. 24",
    desc: "Génération de la DoC conforme à l'article 24 du GPSR. Document signable par le fabricant ou la Personne Responsable EU, en FR et EN.",
    color: "text-emerald-600 bg-emerald-50",
    border: "hover:border-emerald-200",
  },
  {
    icon: Users,
    title: "Personne Responsable EU (Art. 16)",
    desc: "Obligatoire pour tout produit vendu dans l'UE par un fabricant hors UE. Conforva vous aide à documenter et stocker les coordonnées de votre Personne Responsable.",
    color: "text-orange-600 bg-orange-50",
    border: "hover:border-orange-200",
  },
  {
    icon: AlertTriangle,
    title: "Étiquetage multilingue obligatoire",
    desc: "Avertissements de sécurité, mentions CLP et informations produit en FR, EN, DE, IT, ES, ZH et JA. Conformes aux exigences Art. 9(7) du règlement.",
    color: "text-rose-600 bg-rose-50",
    border: "hover:border-rose-200",
  },
  {
    icon: Zap,
    title: "Import Shopify & WooCommerce",
    desc: "Importez vos fiches produits directement depuis votre boutique Shopify ou WooCommerce. Les informations sont pré-remplies pour accélérer la génération du dossier.",
    color: "text-amber-600 bg-amber-50",
    border: "hover:border-amber-200",
  },
]

const STEPS = [
  {
    n: "01",
    title: "Décrivez votre produit",
    desc: "Catégorie, matériaux, marchés cibles, usage prévu. Un questionnaire guidé adapté à votre secteur. Import possible depuis Shopify ou WooCommerce.",
  },
  {
    n: "02",
    title: "L'IA génère vos documents",
    desc: "Analyse de risque, dossier technique 15 sections, déclaration de conformité et étiquettes multilingues — générés en quelques minutes selon les normes applicables.",
  },
  {
    n: "03",
    title: "Vous validez et exportez",
    desc: "Relisez, modifiez si nécessaire, puis exportez en PDF. Vous gardez le contrôle total sur le contenu final. Les documents portent votre approbation.",
  },
]

const INCLUDED = [
  "Dossier technique 15 sections (Art. 22 GPSR)",
  "Analyse de risque (méthode ISO 12100)",
  "Déclaration de Conformité UE (Art. 24)",
  "Étiquettes sécurité en 7 langues",
  "Personne Responsable EU (Art. 16)",
  "Traçabilité produit (Art. 9)",
  "Normes harmonisées applicables",
  "Export PDF prêt à soumettre",
  "Historique des versions",
  "Veille réglementaire intégrée",
]

const MARKETS = [
  "Union Européenne (GPSR 2023/988)",
  "USA (CPSC — 15 U.S.C. §2051)",
  "Royaume-Uni (UKCA / GPSR UK)",
  "Chine (CCC / GB Standards)",
  "Canada (CCPSA)",
  "Japon (PSE / METI)",
  "Australie (ACM / RCM)",
]

const PLANS = [
  {
    name: "Gratuit",
    price: "0",
    products: "1 référence",
    features: [
      "1 dossier technique complet",
      "Export PDF (watermark)",
      "Étiquettes multilingues",
      "Analyse de risque IA",
    ],
    cta: "Commencer gratuitement",
    primary: false,
    highlight: false,
  },
  {
    name: "Starter",
    price: "29",
    products: "5 références",
    features: [
      "5 dossiers techniques",
      "PDF sans watermark",
      "Déclaration de Conformité",
      "Étiquettes 7 langues",
      "Support email",
    ],
    cta: "Démarrer",
    primary: false,
    highlight: false,
  },
  {
    name: "Growth",
    price: "79",
    products: "30 références",
    features: [
      "30 dossiers techniques",
      "Import CSV",
      "Connecteur Shopify",
      "Alertes changements normes",
      "Personne Responsable EU",
      "Support prioritaire",
    ],
    cta: "Choisir Growth",
    primary: true,
    highlight: true,
  },
  {
    name: "Pro",
    price: "199",
    products: "150 références",
    features: [
      "150 dossiers techniques",
      "Connecteur WooCommerce",
      "Accès API",
      "Rapports personnalisés",
      "Support dédié",
    ],
    cta: "Choisir Pro",
    primary: false,
    highlight: false,
  },
]

const CATEGORIES = [
  "Bougies & parfums", "Jouets", "Textiles", "Cosmétiques",
  "Électronique", "Puériculture", "Décoration", "Mobilier",
  "Sport & loisirs", "Contact alimentaire", "Éclairage", "Outillage",
]

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9"
  const img = size === "sm" ? "h-6 w-6" : "h-8 w-8"
  return (
    <div className={`${dim} rounded-xl overflow-hidden bg-white ring-1 ring-gray-100 shadow-sm flex-shrink-0 flex items-center justify-center`}>
      <img src="/favicon.png" alt="Conforva" className={`${img} object-contain`} />
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── Nav ── */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo size="md" />
            <span className="font-bold text-gray-900 text-lg tracking-tight">Conforva</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <a href="#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</a>
            <a href="#comment" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="gap-1.5 shadow-sm">
                Créer un compte <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section className="relative px-5 pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-b from-blue-50 via-violet-50/40 to-transparent blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Règlement GPSR (UE) 2023/988 — en vigueur depuis décembre 2024
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-[1.1] tracking-tight"
          >
            Dossiers GPSR conformes,<br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              générés en quelques minutes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Analyse de risque, dossier technique 15 sections, déclaration de conformité UE
            et étiquetage multilingue — conformes au règlement (UE) 2023/988.
            Pour tout vendeur ou fabricant commercialisant des produits physiques dans l'UE.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/auth/login">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-[15px] shadow-md shadow-blue-600/15 hover:-translate-y-0.5 transition-all">
                Créer un compte gratuit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#comment">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-[15px] hover:-translate-y-0.5 transition-all">
                Voir comment ça marche
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-4 text-sm text-gray-400"
          >
            Gratuit pour 1 référence · Aucune carte bancaire requise
          </motion.p>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-14 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: ShieldCheck, label: "Conforme Art. 22 & 24", sub: "GPSR 2023/988" },
              { icon: Lock, label: "Données sécurisées", sub: "Hébergement EU" },
              { icon: Globe, label: "7 marchés couverts", sub: "EU · USA · UK · CN · CA · JP · AU" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-center">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm ring-1 ring-gray-100">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-xs font-semibold text-gray-800 leading-snug">{label}</p>
                <p className="text-[10px] text-gray-400 leading-tight">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Categories ── */}
      <div className="border-y border-gray-100 py-4 bg-gray-50/60 overflow-hidden">
        <div className="flex gap-2 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <span key={cat} className="shrink-0 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-500 whitespace-nowrap shadow-sm">
              {cat}
            </span>
          ))}
          <span className="shrink-0 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-400 whitespace-nowrap">& bien d'autres…</span>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="fonctionnalites" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Fonctionnalités</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Tout ce qu'exige le règlement GPSR</h2>
            <p className="mt-2 text-gray-500 max-w-xl text-sm leading-relaxed">
              Chaque document généré est structuré selon les articles du règlement (UE) 2023/988 et les normes harmonisées applicables.
            </p>
          </Section>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <Section key={f.title}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18 }}
                    className={`h-full rounded-2xl border border-gray-100 bg-white p-6 space-y-4 shadow-sm cursor-default transition-colors ${f.border}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </motion.div>
                </Section>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Markets ── */}
      <section className="py-16 px-5 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <Section>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Couverture internationale</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">7 marchés, un seul outil</h2>
          </Section>
          <div className="flex flex-wrap justify-center gap-2.5">
            {MARKETS.map(m => (
              <span key={m} className="rounded-full bg-white/10 border border-white/20 text-white text-sm px-4 py-2 backdrop-blur-sm">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="comment" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <Section>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Processus</p>
            <h2 className="text-2xl sm:text-3xl font-bold">De la fiche produit au dossier conforme</h2>
          </Section>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <Section key={s.n}>
                <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-3 h-full">
                  <span className="text-5xl font-black text-gray-100 select-none leading-none">{s.n}</span>
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </Section>
            ))}
          </div>

          <Section className="mt-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-5">Inclus dans chaque dossier</p>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {INCLUDED.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
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
      <section id="tarifs" className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Tarifs</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Simple et transparent</h2>
            <p className="mt-2 text-gray-500 text-sm">Par nombre de références produit. Sans engagement.</p>
          </Section>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan) => (
              <Section key={plan.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.18 }}
                  className={`rounded-2xl border p-6 flex flex-col gap-5 h-full transition-shadow ${
                    plan.highlight
                      ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/25"
                      : "border-gray-200 bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {plan.highlight && (
                    <div className="inline-flex items-center self-start rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      Populaire
                    </div>
                  )}
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl font-bold">{plan.price}€</span>
                      <span className={`text-sm ml-1 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>/mois</span>
                    </div>
                    <p className={`text-sm mt-1 font-medium ${plan.highlight ? "text-blue-100" : "text-blue-600"}`}>
                      {plan.products}
                    </p>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>
                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.highlight ? "text-blue-200" : "text-emerald-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/login">
                    <Button className="w-full text-sm" variant={plan.highlight ? "secondary" : "outline"}>
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

      {/* ── CTA ── */}
      <Section>
        <section className="mx-4 sm:mx-6 my-14 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 px-8 py-14 text-center text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 20%, white 0%, transparent 55%)" }} />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative text-2xl sm:text-3xl font-bold mb-3"
          >
            Commencez avec 1 produit, gratuitement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="relative text-blue-100 mb-8 text-sm sm:text-base"
          >
            Aucune carte bancaire · Compte créé en 30 secondes · Conformité GPSR immédiate
          </motion.p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-[1.02] transition-all shadow-lg gap-2">
              Créer mon compte gratuit <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 px-5">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" />
              <span className="font-semibold text-gray-700">Conforva</span>
              <span className="hidden sm:inline text-gray-300">·</span>
              <span className="hidden sm:inline text-gray-400">Conformité GPSR pour e-commerçants</span>
            </div>
            <div className="flex gap-5 text-xs">
              <Link href="/cgu" className="hover:text-gray-700 transition-colors">CGU</Link>
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">Confidentialité</Link>
              <Link href="/mentions-legales" className="hover:text-gray-700 transition-colors">Mentions légales</Link>
            </div>
          </div>
          <p className="text-[11px] text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
            Les documents générés par Conforva constituent une base de travail structurée selon le règlement (UE) 2023/988.
            Ils ne remplacent pas l'avis d'un expert en conformité et ne garantissent pas la conformité juridique de votre produit.
          </p>
        </div>
      </footer>

    </div>
  )
}
