"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, ChevronRight,
  ShieldCheck, FileText, Globe, Users, AlertTriangle,
  BarChart3, Lock, Clock,
} from "lucide-react"

function FadeIn({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, ease: "easeOut", delay }}
      className={className}>
      {children}
    </motion.div>
  )
}

const FEATURES = [
  { icon: ShieldCheck, color: "bg-blue-600", title: "Analyse de risque ISO 12100", desc: "Identification structurée des dangers et niveaux de criticité, mesures correctives selon les normes harmonisées de votre catégorie produit." },
  { icon: FileText, color: "bg-indigo-600", title: "Dossier technique — Art. 22 GPSR", desc: "15 sections requises : description produit, dessins, tests, normes appliquées, évaluation des risques. Prêt pour un organisme notifié." },
  { icon: Globe, color: "bg-emerald-600", title: "Déclaration de Conformité — Art. 24", desc: "Génération automatique de la DoC. Document prêt à signer par le fabricant ou la Personne Responsable EU, en FR et EN." },
  { icon: Users, color: "bg-violet-600", title: "Personne Responsable EU — Art. 16", desc: "Obligatoire pour tout fabricant hors UE. Stockage et documentation complète des coordonnées de votre représentant EU." },
  { icon: AlertTriangle, color: "bg-rose-500", title: "Étiquetage sécurité multilingue", desc: "Avertissements de sécurité et mentions réglementaires dans votre sélection de langues. Générés au moment du dossier, selon votre plan." },
  { icon: BarChart3, color: "bg-amber-500", title: "Veille réglementaire intégrée", desc: "Textes officiels EUR-Lex, Légifrance, legislation.gov.uk et eCFR en temps réel. Restez informé des évolutions normatives." },
]

const MARKETS = [
  { code: "EU", label: "Union Européenne", law: "GPSR 2023/988" },
  { code: "US", label: "États-Unis", law: "CPSC 15 U.S.C §2051" },
  { code: "GB", label: "Royaume-Uni", law: "UKCA / GPSR UK" },
  { code: "CN", label: "Chine", law: "CCC / GB Standards" },
  { code: "CA", label: "Canada", law: "CCPSA" },
  { code: "JP", label: "Japon", law: "PSE / METI" },
  { code: "AU", label: "Australie", law: "ACM / RCM" },
]

const LANGUAGES = [
  { code: "FR", label: "Français", base: true },
  { code: "EN", label: "English", base: true },
  { code: "DE", label: "Deutsch", base: false },
  { code: "IT", label: "Italiano", base: false },
  { code: "ES", label: "Español", base: false },
  { code: "ZH", label: "中文", base: false },
  { code: "JA", label: "日本語", base: false },
]

const PLANS = [
  {
    name: "Gratuit",
    price: "0",
    sub: "1 référence",
    highlight: false,
    features: [
      "1 dossier technique complet",
      "Export PDF (watermarké)",
      "Étiquettes FR + EN uniquement",
      "Analyse de risque IA",
      "Déclaration de Conformité",
    ],
    cta: "Commencer gratuitement",
  },
  {
    name: "Starter",
    price: "29",
    sub: "5 références",
    highlight: false,
    features: [
      "5 dossiers techniques",
      "PDF sans watermark",
      "Étiquettes FR, EN, DE, IT, ES",
      "Déclaration de Conformité",
      "Support email",
    ],
    cta: "Démarrer",
  },
  {
    name: "Growth",
    price: "79",
    sub: "30 références",
    highlight: true,
    features: [
      "30 dossiers techniques",
      "Étiquettes 7 langues (choix libre)",
      "Import Shopify",
      "Import CSV",
      "Alertes normes",
      "Personne Responsable EU",
      "Support prioritaire",
    ],
    cta: "Choisir Growth",
  },
  {
    name: "Pro",
    price: "199",
    sub: "150 références",
    highlight: false,
    features: [
      "150 dossiers techniques",
      "Étiquettes 7 langues (choix libre)",
      "Import Shopify & WooCommerce",
      "Import CSV",
      "Alertes normes",
      "Personne Responsable EU",
      "Accès API",
      "Rapports personnalisés",
      "Support dédié",
    ],
    cta: "Choisir Pro",
  },
]

const STEPS = [
  { n: "01", title: "Décrivez ou importez votre produit", desc: "Remplissez le questionnaire guidé, ou importez directement depuis votre boutique Shopify ou WooCommerce (plans Growth et Pro)." },
  { n: "02", title: "Choisissez vos marchés et langues", desc: "Sélectionnez les marchés cibles et les langues d'étiquetage souhaitées. Conforva adapte le contenu réglementaire à chaque marché." },
  { n: "03", title: "Validation et export PDF", desc: "Relisez, ajustez, puis exportez. Dossier technique, déclaration de conformité et étiquettes multilingues en un clic." },
]

const CATEGORIES = [
  "Bougies & parfums", "Jouets", "Textiles & vêtements", "Cosmétiques",
  "Électronique", "Puériculture", "Décoration intérieure", "Mobilier",
  "Sport & loisirs", "Contact alimentaire", "Éclairage", "Outillage",
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ─── NAV ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="Conforva" className="h-8 w-8 object-contain" />
            <span className="font-bold text-gray-900">Conforva</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <a href="#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</a>
            <a href="#comment" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
            <Link href="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="gap-1.5">Créer un compte <ChevronRight className="h-3.5 w-3.5" /></Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-5 pt-20 pb-16 sm:pt-32 sm:pb-24 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[560px] w-[900px] bg-gradient-to-b from-blue-50/80 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-medium text-blue-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            GPSR (UE) 2023/988 — en vigueur depuis décembre 2024
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.07 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-gray-900">
            Dossiers de conformité GPSR,<br />
            <span className="text-blue-600">générés en quelques minutes</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.18 }}
            className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Analyse de risque, dossier technique 15 sections et déclaration de conformité UE —
            structurés selon le règlement (UE) 2023/988, pour tout vendeur ou fabricant dans l'UE.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.28 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2 shadow-md shadow-blue-100 hover:-translate-y-0.5 transition-all">
                Créer un compte gratuit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#comment">
              <Button size="lg" variant="outline" className="hover:-translate-y-0.5 transition-all">
                Voir comment ça marche
              </Button>
            </a>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
            className="mt-3 text-xs text-gray-400">
            Gratuit pour 1 référence · Aucune carte bancaire requise
          </motion.p>
        </div>
      </section>

      {/* ─── CATEGORIES STRIP ─── */}
      <div className="border-y border-gray-100 bg-gray-50/70 py-3.5 overflow-hidden">
        <div className="flex gap-2 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <span key={cat} className="shrink-0 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-500 whitespace-nowrap shadow-sm">{cat}</span>
          ))}
          <span className="shrink-0 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-400 whitespace-nowrap">& bien d'autres…</span>
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section id="fonctionnalites" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Ce que vous obtenez</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Tout ce qu'exige le règlement GPSR</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl">Chaque document est structuré selon les articles du règlement (UE) 2023/988 et les normes harmonisées applicables à votre catégorie.</p>
          </FadeIn>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <FadeIn key={f.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                    <div className={`h-10 w-10 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-1.5">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── MARKETS + LANGUAGES ─── */}
      <section className="py-20 px-5 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Markets */}
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">Couverture internationale</p>
              <h2 className="text-2xl font-bold mb-2">7 marchés, une seule plateforme</h2>
              <p className="text-sm text-gray-400 mb-8">Conforva génère les documents conformes aux exigences réglementaires de chaque marché cible sélectionné.</p>
              <div className="space-y-2.5">
                {MARKETS.map((m, i) => (
                  <motion.div key={m.code}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xs font-bold text-blue-400 w-8 shrink-0">{m.code}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{m.label}</p>
                      <p className="text-xs text-gray-500 truncate">{m.law}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Languages */}
            <FadeIn delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">Étiquetage multilingue</p>
              <h2 className="text-2xl font-bold mb-2">Choisissez vos langues au moment du dossier</h2>
              <p className="text-sm text-gray-400 mb-8">Sélectionnez les langues d'étiquetage lors de la génération. Les langues disponibles dépendent de votre plan.</p>
              <div className="space-y-4">
                {/* Base languages */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-300">Langues de base</p>
                  </div>
                  <div className="flex gap-2">
                    {LANGUAGES.filter(l => l.base).map(l => (
                      <div key={l.code} className="flex items-center gap-1.5 rounded-lg bg-blue-600/30 border border-blue-500/40 px-3 py-2">
                        <span className="text-xs font-bold text-blue-300">{l.code}</span>
                        <span className="text-xs text-blue-200">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* All languages */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-emerald-300">Toutes les langues</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map(l => (
                      <div key={l.code} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 border ${l.base ? "bg-emerald-600/20 border-emerald-500/30" : "bg-white/5 border-white/10"}`}>
                        <span className="text-xs font-bold text-white">{l.code}</span>
                        <span className="text-xs text-gray-300">{l.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-emerald-400/70">Sélectionnez les langues souhaitées au moment de la génération de chaque dossier.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CONNECTORS ─── */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Importez vos produits en un clic depuis votre boutique</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Toutes les informations dont vous avez besoin sont déjà dans votre catalogue en ligne.
                Conforva les récupère directement — nom, description, SKU, matériaux — et pré-remplit votre dossier de conformité instantanément.
                Zéro ressaisie, zéro erreur de copier-coller.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "URL produit Shopify → données importées en 2 secondes",
                  "WooCommerce : connexion via clés API, sélection du produit depuis Conforva",
                  "Nom, description, SKU, matériaux détectés automatiquement",
                  "Pré-remplissage du questionnaire · Gain de temps garanti",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/login">
                <Button className="gap-2">Voir les plans <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </FadeIn>

            <FadeIn delay={0.1} className="space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-xl bg-[#95BF47] flex items-center justify-center font-bold text-white text-sm shrink-0">S</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">Connecteur Shopify</p>
                    <p className="text-xs text-gray-400">Boutiques publiques — sans clé API</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-0.5 shrink-0">Actif</span>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 text-xs text-gray-400 font-mono truncate">
                  https://votre-boutique.myshopify.com/products/nom-produit
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {["Nom", "Description", "SKU", "Matériaux"].map(f => (
                    <div key={f} className="rounded-lg bg-blue-50 border border-blue-100 py-1.5 text-center">
                      <CheckCircle2 className="h-3 w-3 text-blue-400 mx-auto mb-0.5" />
                      <p className="text-[9px] text-blue-600 font-medium">{f}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-xl bg-[#7F54B3] flex items-center justify-center font-bold text-white text-sm shrink-0">W</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">Connecteur WooCommerce</p>
                    <p className="text-xs text-gray-400">Via REST API WooCommerce</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-0.5 shrink-0">Actif</span>
                </div>
                <div className="space-y-1.5">
                  {[{ l: "Site", v: "https://monsite.com" }, { l: "Consumer Key", v: "ck_•••••••••••••••••" }, { l: "Produit", v: "Choisir dans la liste…" }].map(r => (
                    <div key={r.l} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <span className="text-[10px] text-gray-400 w-24 shrink-0">{r.l}</span>
                      <span className="text-xs text-gray-600 truncate">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="comment" className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Processus</p>
            <h2 className="text-2xl sm:text-3xl font-bold">De la fiche produit au dossier conforme</h2>
          </FadeIn>
          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                  <span className="text-5xl font-black text-gray-100 leading-none select-none">{s.n}</span>
                  <h3 className="font-semibold text-gray-900 mt-2 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-800 mb-5">Inclus dans chaque dossier</p>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {[
                  "Dossier technique 15 sections (Art. 22 GPSR)",
                  "Analyse de risque complète (ISO 12100)",
                  "Déclaration de Conformité UE (Art. 24)",
                  "Personne Responsable EU (Art. 16)",
                  "Étiquettes sécurité multilingues (Art. 9)",
                  "Normes harmonisées applicables",
                  "Traçabilité produit conforme",
                  "Export PDF prêt à soumettre",
                  "Historique des versions",
                  "Veille réglementaire intégrée",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="tarifs" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Tarifs</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Simple et transparent</h2>
            <p className="mt-1.5 text-sm text-gray-500">Par nombre de références. Sans engagement. Résiliable à tout moment.</p>
          </FadeIn>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.07}>
                <div className={`relative flex flex-col rounded-2xl border p-6 gap-5 transition-all hover:-translate-y-1 duration-200 ${
                  plan.highlight ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200" : "border-gray-200 bg-white shadow-sm hover:shadow-md"
                }`}>
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 border-2 border-white px-3 py-0.5 text-[11px] font-bold text-white">
                      Le plus populaire
                    </span>
                  )}
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>{plan.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}€</span>
                      <span className={`text-sm ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>/mois</span>
                    </div>
                    <p className={`text-sm font-medium mt-0.5 ${plan.highlight ? "text-blue-100" : "text-blue-600"}`}>{plan.sub}</p>
                  </div>

                  <ul className="flex-1 space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-blue-100" : "text-gray-600"}`}>
                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.highlight ? "text-blue-200" : "text-emerald-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/auth/login">
                    <Button className="w-full text-sm" variant={plan.highlight ? "secondary" : "outline"}>{plan.cta}</Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-5 text-sm text-center text-gray-400">
              Plus de 150 références ?{" "}
              <Link href="/auth/login" className="underline underline-offset-2 text-gray-600 hover:text-gray-900 transition-colors">Contactez-nous</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <FadeIn>
        <section className="mx-4 sm:mx-6 mb-14 rounded-2xl bg-blue-600 px-8 py-14 text-center text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white, transparent 50%)" }} />
          <h2 className="relative text-2xl sm:text-3xl font-bold mb-3">Commencez avec 1 produit, gratuitement</h2>
          <p className="relative text-blue-100 mb-8 text-sm">Aucune carte bancaire · Compte créé en 30 secondes · Premier dossier immédiat</p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-[1.02] transition-all shadow-md gap-2">
              Créer mon compte gratuit <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </FadeIn>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-100 py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
                <span className="font-bold text-gray-900">Conforva</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Conformité GPSR simplifiée pour les e-commerçants vendant dans l'Union Européenne.
              </p>
              <p className="mt-3 text-xs text-gray-400">support@conforva.com</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Produit</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</a></li>
                <li><a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a></li>
                <li><Link href="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link></li>
                <li><Link href="/status" className="hover:text-gray-900 transition-colors">Statut</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Entreprise</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/about" className="hover:text-gray-900 transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
                <li><Link href="/security" className="hover:text-gray-900 transition-colors">Sécurité</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Légal</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/cgu" className="hover:text-gray-900 transition-colors">CGU</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Confidentialité</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-gray-900 transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Conforva. Tous droits réservés.</p>
            <p className="text-[11px] text-gray-400 text-center max-w-md leading-relaxed">
              Les documents générés constituent une aide structurée. Ils ne remplacent pas l'avis d'un expert en conformité.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
