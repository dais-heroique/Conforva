"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, ChevronRight,
  ShieldCheck, FileText, Globe, Users, AlertTriangle,
  BarChart3, X,
  Ban, Plane, ClipboardX, Scale,
  Package, ShoppingBag, Tag,
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
    sub: "1 référence / mois",
    highlight: false,
    features: [
      "1 dossier technique complet",
      "Export PDF (watermarké)",
      "Étiquettes FR + EN uniquement",
      "Analyse de risque IA",
      "Déclaration de Conformité",
    ],
    cta: "Commencer gratuitement",
    href: "/auth/login",
  },
  {
    name: "Starter",
    price: "29",
    sub: "jusqu'à 5 références / mois",
    highlight: false,
    features: [
      "5 dossiers techniques",
      "PDF sans watermark",
      "Étiquettes FR, EN, DE, IT, ES",
      "Déclaration de Conformité",
      "Support email",
    ],
    cta: "Démarrer",
    href: "/auth/login",
  },
  {
    name: "Growth",
    price: "79",
    sub: "jusqu'à 30 références / mois",
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
    href: "/auth/login",
  },
  {
    name: "Pro",
    price: "199",
    sub: "jusqu'à 150 références / mois",
    highlight: false,
    features: [
      "150 dossiers techniques",
      "Étiquettes 7 langues (choix libre)",
      "Import Shopify & WooCommerce",
      "Import CSV",
      "Alertes normes",
      "Personne Responsable EU",
      "Rapports personnalisés",
      "Support dédié",
    ],
    cta: "Choisir Pro",
    href: "/auth/login",
  },
]

const STEPS = [
  { n: "01", title: "Décrivez ou importez votre produit", desc: "Remplissez le questionnaire guidé, ou importez directement depuis votre boutique Shopify ou WooCommerce (plans Growth et Pro)." },
  { n: "02", title: "Choisissez vos marchés et langues", desc: "Sélectionnez les marchés cibles et les langues d'étiquetage souhaitées. Conforva adapte le contenu réglementaire à chaque marché." },
  { n: "03", title: "Validation et export PDF", desc: "Relisez, ajustez, puis exportez. Dossier technique, déclaration de conformité et étiquettes multilingues en un clic." },
]

const CATEGORIES = [
  "Bougies & parfums", "Jouets", "Textiles & vêtements", "Cosmétiques",
  "Électronique grand public", "Puériculture", "Décoration intérieure", "Mobilier",
  "Sport & loisirs", "Contact alimentaire", "Éclairage", "Outillage & bricolage",
  "Bijoux & montres", "Maroquinerie & sacs", "Chaussures", "Jardin & outdoor",
  "Cuisine & ustensiles", "Literie & linge de maison", "Animalerie", "Auto & moto (accessoires)",
  "Santé & bien-être", "Optique & lunettes", "Hygiène & soins", "Jeux de société",
  "Gaming & high-tech", "Camping & randonnée", "Piscine & spa", "Instruments de musique",
  "Artisanat & loisirs créatifs", "Photographie", "Papeterie & fournitures",
]

export default function LandingPage() {
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const current = window.scrollY
        if (current < 80) {
          setNavVisible(true)
        } else if (current > lastScrollY.current + 4) {
          setNavVisible(false)
        } else if (current < lastScrollY.current - 4) {
          setNavVisible(true)
        }
        lastScrollY.current = current
        ticking.current = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden w-full">

      {/* ─── NAV ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm transition-transform duration-300 ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="Conforva" className="h-8 w-8 object-contain" />
            <span className="font-bold text-gray-900">Conforva</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <a href="#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</a>
            <a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="/enterprise" className="hover:text-gray-900 transition-colors">Enterprise</Link>
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
      <section className="relative overflow-hidden px-5 pt-36 pb-16 sm:pt-44 sm:pb-24 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[560px] w-[900px] bg-gradient-to-b from-blue-50/80 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-medium text-red-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            GPSR (UE) 2023/988 — obligatoire depuis décembre 2024
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.07 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
            Dossiers de conformité GPSR, <span className="text-blue-600">générés en quelques minutes</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.18 }}
            className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Analyse de risque, dossier technique 15 sections et déclaration de conformité UE —
            structurés selon le règlement (UE) 2023/988. Pour tout vendeur ou fabricant dont les produits arrivent chez des consommateurs européens.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.24 }}
            className="mt-3 text-sm text-gray-400 max-w-lg mx-auto">
            Sans dossier conforme : annonce suspendue, blocage douanier, responsabilité engagée.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.28 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2 shadow-sm">
                Créer un compte gratuit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#comment">
              <Button size="lg" variant="outline">
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
        <motion.div
          className="flex gap-2"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...CATEGORIES, "& bien d'autres…", ...CATEGORIES, "& bien d'autres…"].map((cat, i) => (
            <span key={i} className="shrink-0 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-500 whitespace-nowrap shadow-sm">{cat}</span>
          ))}
        </motion.div>
      </div>

      {/* ─── GPSR STAKES ─── */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-1">Pourquoi maintenant ?</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Le GPSR est en vigueur. Êtes-vous en conformité ?</h2>
            <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">Depuis le 13 décembre 2024, tout produit de consommation vendu dans l'Union Européenne doit respecter le règlement (UE) 2023/988 — sans exception, même si vous vendez depuis hors de l'UE.</p>
          </FadeIn>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { n: "13 déc. 2024", label: "Date d'entrée en vigueur", sub: "Aucune période de grâce — le règlement s'applique immédiatement.", color: "border-red-200 bg-red-50" },
              { n: "10 ans", label: "Conservation du dossier technique", sub: "L'Art. 22 impose de conserver le dossier technique 10 ans à compter de la mise sur le marché.", color: "border-amber-200 bg-amber-50" },
              { n: "Toute vente EU", label: "Sans dérogation géographique", sub: "Vendeur américain, chinois, français — peu importe : si le consommateur est en UE, le GPSR s'applique.", color: "border-blue-200 bg-blue-50" },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.07}>
                <div className={`rounded-2xl border ${s.color} p-5 h-full`}>
                  <p className="text-2xl font-black text-gray-900 mb-1">{s.n}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{s.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <p className="text-sm font-semibold text-gray-900 mb-4">Ce que risquent les vendeurs non conformes</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { Icon: Ban, color: "bg-red-50 border-red-100 text-red-600", title: "Retrait du marché", desc: "Les autorités de surveillance peuvent imposer le rappel ou le retrait immédiat des produits non conformes." },
                  { Icon: Plane, color: "bg-orange-50 border-orange-100 text-orange-600", title: "Blocage douanier", desc: "Les douanes EU peuvent bloquer vos marchandises à l'importation si la documentation est absente ou incomplète." },
                  { Icon: ClipboardX, color: "bg-amber-50 border-amber-100 text-amber-600", title: "Suspension d'annonces", desc: "Amazon EU suspend les annonces sans Personne Responsable EU documentée (Art. 16)." },
                  { Icon: Scale, color: "bg-rose-50 border-rose-100 text-rose-600", title: "Responsabilité aggravée", desc: "En cas d'accident, l'absence de dossier technique constitue une preuve d'imprudence en droit civil et pénal." },
                ].map(r => (
                  <div key={r.title} className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4">
                    <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${r.color}`}>
                      <r.Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

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
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-blue-100 hover:bg-blue-50/20 transition-colors duration-150">
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

      {/* ─── USE CASES ─── */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Pour qui ?</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Votre profil de vendeur, vos obligations</h2>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">Fabricant, importateur, distributeur ou revendeur — si un consommateur EU peut acheter votre produit, vous êtes concerné par le GPSR.</p>
          </FadeIn>
          <div className="mt-10 divide-y divide-gray-200">
            {[
              {
                Icon: Package,
                color: "bg-blue-600",
                title: "Seller Amazon FBA (hors UE)",
                desc: "Vous sourcez depuis la Chine ou l'Asie du Sud-Est et vendez sur Amazon EU. Amazon exige une Personne Responsable EU et un dossier technique pour chaque ASIN. Sans eux, votre annonce est suspendue.",
                tags: ["Art. 16 obligatoire", "Dossier par ASIN", "Représentant EU requis"],
              },
              {
                Icon: ShoppingBag,
                color: "bg-indigo-600",
                title: "Dropshipper / Revendeur en ligne",
                desc: "Même si vous ne fabriquez pas le produit, dès que vous le mettez sur le marché EU, vous devenez légalement distributeur ou importateur — et donc responsable de sa conformité.",
                tags: ["Responsabilité distributeur", "Documentation obligatoire"],
              },
              {
                Icon: Tag,
                color: "bg-violet-600",
                title: "Marque indépendante",
                desc: "Votre propre marque, vos propres produits. Un dossier technique complet pour chaque référence, conservé 10 ans. Gérez tout votre catalogue depuis un seul tableau de bord.",
                tags: ["Multi-références", "Export PDF signable", "10 ans de traçabilité"],
              },
              {
                Icon: Globe,
                color: "bg-emerald-600",
                title: "E-commerçant multi-canal",
                desc: "Shopify, Amazon, BtoB, boutique physique — peu importe le canal. Si le produit arrive chez un consommateur EU, le GPSR s'applique. Importez vos fiches produits directement depuis Shopify.",
                tags: ["Import Shopify", "Tous canaux de vente"],
              },
            ].map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 0.07}>
                <div className="py-8 flex flex-col sm:flex-row gap-5 sm:gap-12">
                  <div className="sm:w-52 shrink-0 flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-lg ${uc.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <uc.Icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 leading-snug">{uc.title}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{uc.desc}</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1">
                      {uc.tags.map(t => (
                        <span key={t} className="text-xs font-semibold text-blue-600">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
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

      {/* ─── DOCUMENT PROOF ─── */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Ce que vous obtenez</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Un vrai dossier, pas un template</h2>
            <p className="text-sm text-gray-500 mb-10">Voici un exemple réel de ce que Conforva génère — dossier technique complet, analyse de risque structurée, étiquetage multilingue et déclaration de conformité.</p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Technical file sections */}
            <FadeIn>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                  <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900">Dossier Technique — Art. 22 GPSR</p>
                    <p className="text-[10px] text-gray-400">Bougie parfumée en cire de soja — ref. BG-SOY-200</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5 shrink-0">15 sections</span>
                </div>
                <ul className="divide-y divide-gray-50">
                  {[
                    ["1. Description générale du produit", true],
                    ["2. Identification du fabricant", true],
                    ["3. Usage prévu et population cible", true],
                    ["4. Réglementation et normes applicables", true],
                    ["5. Analyse de risque (ISO 12100:2010)", true],
                    ["6. Mesures de réduction des risques", true],
                    ["7. Résultats d'essais et tests", true],
                    ["8. Normes harmonisées appliquées", true],
                    ["9. Étiquetage et avertissements", true],
                    ["10. Instructions d'utilisation", true],
                    ["11. Traçabilité et identification", true],
                    ["12. Personne Responsable EU (Art. 16)", true],
                    ["13. Déclaration UE de conformité", true],
                    ["14. Procédures de surveillance", true],
                    ["15. Historique des révisions", true],
                  ].map(([label, done]) => (
                    <li key={label as string} className="flex items-center gap-3 px-5 py-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="text-xs text-gray-700">{label as string}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <div className="space-y-5">
              {/* Risk assessment table */}
              <FadeIn delay={0.08}>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                    <p className="text-xs font-semibold text-gray-900">Analyse de risque — Extrait</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          {["Réf.", "Danger", "Gravité", "Probabilité", "NR", "Mesure"].map(h => (
                            <th key={h} className="px-3 py-2 text-left font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { ref: "H1", danger: "Incendie / flamme nue", g: "4", p: "3", nr: "12", mesure: "Étiquette avertissement" },
                          { ref: "H2", danger: "Brûlure par cire chaude", g: "3", p: "2", nr: "6", mesure: "Instructions d'usage" },
                          { ref: "H3", danger: "Ingestion (enfant < 3 ans)", g: "4", p: "1", nr: "4", mesure: "Mise en garde CE" },
                          { ref: "H4", danger: "Fumée / composés VOC", g: "2", p: "3", nr: "6", mesure: "Ventilation requise" },
                        ].map(row => (
                          <tr key={row.ref} className="hover:bg-gray-50/50">
                            <td className="px-3 py-2 font-mono text-gray-500">{row.ref}</td>
                            <td className="px-3 py-2 text-gray-700 max-w-[110px]">{row.danger}</td>
                            <td className="px-3 py-2 text-center font-semibold text-red-600">{row.g}</td>
                            <td className="px-3 py-2 text-center font-semibold text-amber-600">{row.p}</td>
                            <td className="px-3 py-2 text-center font-bold text-gray-900">{row.nr}</td>
                            <td className="px-3 py-2 text-gray-500">{row.mesure}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </FadeIn>

              {/* Multilingual labels */}
              <FadeIn delay={0.14}>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Globe className="h-4 w-4 text-emerald-600 shrink-0" />
                    <p className="text-xs font-semibold text-gray-900">Étiquetage sécurité — Art. 9 GPSR</p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { lang: "FR", text: "AVERT. Ne jamais laisser sans surveillance. Tenir hors de portée des enfants. Brûler sur surface résistante à la chaleur." },
                      { lang: "EN", text: "WARN. Never leave unattended. Keep away from children. Burn on heat-resistant surface only." },
                      { lang: "DE", text: "ACHTG. Niemals unbeaufsichtigt lassen. Von Kindern fernhalten. Nur auf hitzebeständiger Unterlage verwenden." },
                    ].map(row => (
                      <div key={row.lang} className="px-5 py-3 flex items-start gap-3">
                        <span className="text-[10px] font-bold text-white bg-gray-700 rounded px-1.5 py-0.5 shrink-0 mt-0.5 tracking-wider">{row.lang}</span>
                        <span className="text-[10px] text-gray-600 leading-relaxed flex-1 min-w-0">{row.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">+ IT, ES, ZH, JA selon votre plan · Sélection à la génération</p>
                  </div>
                </div>
              </FadeIn>

              {/* DoC header */}
              <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                    <p className="text-xs font-semibold text-gray-900">Déclaration UE de Conformité — Art. 24</p>
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    {[
                      ["Produit", "Bougie parfumée — BG-SOY-200"],
                      ["Fabricant", "Maison Lumière SAS · Lyon, France"],
                      ["Réglementation", "Règlement (UE) 2023/988 (GPSR)"],
                      ["Norme", "EN 15493:2019 · EN 15426:2019"],
                      ["Déclarée conforme le", "02/06/2026"],
                    ].map(([k, v]) => (
                      <div key={k as string} className="flex gap-3 text-[10px]">
                        <span className="text-gray-400 w-32 shrink-0">{k as string}</span>
                        <span className="text-gray-800 font-medium">{v as string}</span>
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[9px] text-gray-400 italic">Signature du représentant légal</span>
                      <span className="text-[9px] font-mono text-gray-300 select-none">DOC-BG-SOY-200-v1.pdf</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Import hint */}
          <FadeIn delay={0.1}>
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-0.5">Importez depuis Shopify ou WooCommerce</p>
                <p className="text-xs text-gray-500">Collez l'URL de votre fiche produit Shopify — Conforva récupère automatiquement le nom, la description et les matériaux pour pré-remplir votre dossier.</p>
              </div>
              <div className="shrink-0 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-auto">
                <span className="text-[10px] font-mono text-gray-400 truncate max-w-[220px]">https://votre-boutique.myshopify.com/products/…</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ARTICLE BREAKDOWN ─── */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Conformité article par article</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ce que le GPSR exige — ce que Conforva génère</h2>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">Chaque document produit par Conforva correspond à un article précis du règlement (UE) 2023/988.</p>
          </FadeIn>
          <div className="mt-10 divide-y divide-gray-100">
            {[
              {
                art: "Art. 9",
                title: "Étiquetage et informations produit",
                required: "Avertissements de sécurité dans la langue de chaque pays de vente. Identification du fabricant ou de son représentant EU. Numéro de modèle, référence ou lot permettant l'identification du produit.",
                coverage: "Génération des étiquettes de sécurité adaptées à votre catégorie produit, dans jusqu'à 7 langues (FR, EN, DE, IT, ES, ZH, JA). Langues sélectionnées au moment de la génération selon votre plan.",
              },
              {
                art: "Art. 16",
                title: "Personne Responsable EU",
                required: "Obligatoire pour tout fabricant établi hors de l'Union Européenne. Doit être un opérateur économique établi dans l'UE, pouvant être contacté par les autorités de surveillance du marché.",
                coverage: "Section dédiée pour renseigner et documenter les coordonnées complètes de votre Personne Responsable EU. Documentation exportable pour les marketplaces et les autorités douanières.",
              },
              {
                art: "Art. 22",
                title: "Dossier technique",
                required: "Document obligatoire regroupant : description du produit, dessins techniques, liste des normes appliquées, évaluation des risques, résultats de tests ou justifications alternatives, instructions d'utilisation. Conservation obligatoire pendant 10 ans.",
                coverage: "15 sections générées automatiquement à partir de vos données produit. Analyse de risque structurée selon la méthodologie ISO 12100:2010. Export PDF complet, prêt pour un organisme notifié.",
              },
              {
                art: "Art. 24",
                title: "Déclaration UE de Conformité",
                required: "Document officiel signé par le fabricant ou son représentant légal EU, attestant formellement que le produit satisfait à toutes les exigences applicables du règlement GPSR et des normes harmonisées retenues.",
                coverage: "Génération de la Déclaration de Conformité pré-remplie : identification précise du produit, fabricant, réglementation applicable, normes harmonisées utilisées, date et signature prêtes à apposer.",
              },
            ].map((item, i) => (
              <FadeIn key={item.art} delay={i * 0.06}>
                <div className="py-8 grid sm:grid-cols-[100px_1fr_1fr] gap-6 sm:gap-10">
                  <div>
                    <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-700 mb-2">{item.art}</span>
                    <p className="text-xs font-bold text-gray-900 leading-snug">{item.title}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Ce qu'exige le règlement</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.required}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-2">Ce que Conforva génère</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.coverage}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
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

      {/* ─── COMPARISON ─── */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Pourquoi Conforva ?</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Comparé aux alternatives</h2>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">Toutes les voies mènent (ou ne mènent pas) à la conformité — pas au même coût ni dans le même délai.</p>
          </FadeIn>
          <FadeIn>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm min-w-[620px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 bg-gray-50 w-44">Critère</th>
                    <th className="px-5 py-4 text-left text-xs font-bold text-blue-700 bg-blue-50">Conforva</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 bg-gray-50">Template Word/Excel</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 bg-gray-50">Expert conformité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Temps par dossier", "< 10 minutes", "2 à 5 jours", "1 à 4 semaines"],
                    ["Coût par référence", "dès 5,80 €/mois", "Gratuit", "500 à 2 000 €"],
                    ["Dossier technique Art. 22", true, "Partiel", true],
                    ["Analyse risque ISO 12100", true, false, true],
                    ["Déclaration de Conformité", true, false, true],
                    ["Étiquetage multilingue 7 langues", true, false, "Selon contrat"],
                    ["Personne Responsable EU (Art. 16)", true, false, "Selon contrat"],
                    ["Mise à jour des normes", "Automatique", "Manuelle", "Facturable"],
                    ["Export PDF prêt à signer", true, "Manuel", true],
                    ["En cas de contrôle douanier", "Dossier complet", "Incomplet", "Dossier complet"],
                  ].map(([criterion, ...values]) => (
                    <tr key={criterion as string} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3.5 text-xs font-medium text-gray-700">{criterion as string}</td>
                      {values.map((v, i) => (
                        <td key={i} className={`px-5 py-3.5 text-xs ${i === 0 ? "bg-blue-50/40 font-semibold text-blue-800" : ""}`}>
                          {v === true ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            : v === false ? <X className="h-4 w-4 text-gray-300" />
                            : <span className="text-gray-500">{v as string}</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <div className={`relative flex flex-col rounded-2xl border p-6 gap-5 transition-colors duration-150 ${
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

                  <Link href={plan.href}>
                    <Button className="w-full text-sm" variant={plan.highlight ? "secondary" : "outline"}>{plan.cta}</Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-5 rounded-2xl border-2 border-gray-900 bg-gray-950 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Enterprise</span>
                  <span className="rounded-full bg-white/10 text-gray-200 text-[10px] font-semibold px-2 py-0.5">Sur devis</span>
                </div>
                <p className="text-2xl font-bold mb-0.5">Plan Enterprise — Sur mesure</p>
                <p className="text-sm text-gray-400 mb-4">Plus de 150 références / mois · Tarif dégressif selon volume</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {[
                    "Références illimitées (selon palier)",
                    "Étiquettes 7 langues sans restriction",
                    "7 marchés couverts (EU, US, GB, CN…)",
                    "Import Shopify, WooCommerce & CSV",
                    "Veille réglementaire complète",
                    "Rapports de conformité consolidés",
                    "Gestionnaire de compte dédié",
                    "Support prioritaire avec SLA",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 flex flex-col gap-2 min-w-[160px]">
                <Link href="/enterprise">
                  <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">Voir l'offre</Button>
                </Link>
                <Link href="/contact" className="block w-full">
                  <button className="w-full rounded-md border border-white/25 bg-transparent px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                    Nous contacter
                  </button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FAQ PREVIEW ─── */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Questions fréquentes</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Ce que tout le monde demande</h2>
          </FadeIn>
          <div className="space-y-2.5">
            {[
              {
                q: "Les documents générés sont-ils légalement valides ?",
                a: "Conforva génère une base documentaire structurée et conforme au format requis par le GPSR. Ces documents doivent être relus, complétés avec vos données réelles (résultats de tests si requis, certificats) et signés. Ils ne constituent pas un avis juridique mais forment un dossier solide, prêt à être soumis ou présenté à des autorités.",
              },
              {
                q: "Le GPSR s'applique-t-il si je vends depuis hors de l'UE ?",
                a: "Oui. Dès que le consommateur final se trouve dans l'Union Européenne, le GPSR s'applique, quelle que soit l'origine géographique du vendeur. Les plateformes comme Amazon EU appliquent déjà ce règlement à toutes les annonces destinées aux marchés européens.",
              },
              {
                q: "Faut-il obligatoirement des tests en laboratoire ?",
                a: "Les tests ne sont pas systématiquement obligatoires pour tous les produits. L'analyse de risque peut s'appuyer sur les données techniques existantes et les normes harmonisées. Pour les produits à risque élevé (puériculture, jouets, électronique haute tension), les tests restent fortement recommandés et parfois requis par les normes applicables.",
              },
              {
                q: "L'essai gratuit nécessite-t-il une carte bancaire ?",
                a: "Non. Vous créez votre compte avec votre email ou votre compte Google, et vous pouvez générer un premier dossier complet — analyse de risque, dossier technique, déclaration de conformité — sans renseigner aucune information de paiement.",
              },
              {
                q: "Combien de temps faut-il pour générer un dossier ?",
                a: "En moyenne 5 à 10 minutes pour remplir le questionnaire produit. La génération IA prend ensuite 1 à 2 minutes. Le dossier est disponible en PDF immédiatement après validation.",
              },
            ].map(item => (
              <FadeIn key={item.q}>
                <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-sm text-gray-900">{item.q}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {item.a}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="mt-8 text-center">
              <Link href="/faq" className="text-sm text-blue-600 font-medium hover:underline">
                Voir toutes les questions fréquentes →
              </Link>
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
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-md gap-2">
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
                <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
                <li><Link href="/enterprise" className="hover:text-gray-900 transition-colors">Enterprise</Link></li>
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
                <li><Link href="/cgv" className="hover:text-gray-900 transition-colors">CGV</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Confidentialité</Link></li>
                <li><Link href="/cookies" className="hover:text-gray-900 transition-colors">Cookies</Link></li>
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
