"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, ShieldCheck, FileText, Globe,
  ChevronRight, AlertTriangle, Users, Zap, Lock, Package,
} from "lucide-react"

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FEATURES = [
  { icon: ShieldCheck, title: "Analyse de risque ISO 12100", desc: "Identification structurée des dangers, niveaux de risque et mesures correctives selon les normes harmonisées applicables à votre catégorie produit.", color: "bg-blue-600" },
  { icon: FileText, title: "Dossier technique Art. 22 GPSR", desc: "15 sections requises par le règlement (UE) 2023/988 : description, dessins, tests, normes, évaluation des risques, mesures prises.", color: "bg-violet-600" },
  { icon: Globe, title: "Déclaration de Conformité Art. 24", desc: "Génération de la DoC conforme à l'article 24. Document prêt à signer par le fabricant ou la Personne Responsable EU, en FR et EN.", color: "bg-emerald-600" },
  { icon: Users, title: "Personne Responsable EU Art. 16", desc: "Obligatoire pour tout produit hors UE vendu dans l'UE. Documentation et stockage des coordonnées de votre Personne Responsable.", color: "bg-orange-500" },
  { icon: AlertTriangle, title: "Étiquetage multilingue Art. 9(7)", desc: "Avertissements de sécurité en FR, EN, DE, IT, ES, ZH et JA. Mentions CLP et informations produit conformes aux exigences réglementaires.", color: "bg-rose-500" },
]

const STEPS = [
  { n: "1", title: "Décrivez votre produit", desc: "Catégorie, matériaux, marchés cibles, usage prévu. Questionnaire guidé ou import direct depuis Shopify / WooCommerce." },
  { n: "2", title: "Génération automatique", desc: "Analyse de risque, dossier technique 15 sections, déclaration de conformité et étiquettes multilingues en quelques minutes." },
  { n: "3", title: "Validation et export", desc: "Relisez, ajustez si nécessaire, puis exportez en PDF. Vous gardez le contrôle total sur le contenu final." },
]

const INCLUDED = [
  "Dossier technique 15 sections (Art. 22)",
  "Analyse de risque (ISO 12100)",
  "Déclaration de Conformité UE (Art. 24)",
  "Étiquettes sécurité en 7 langues",
  "Personne Responsable EU (Art. 16)",
  "Traçabilité produit (Art. 9)",
  "Normes harmonisées applicables",
  "Export PDF prêt à soumettre",
  "Historique des versions",
  "Veille réglementaire intégrée",
]

const PLANS = [
  { name: "Gratuit", price: "0", sub: "1 référence", features: ["1 dossier complet", "Export PDF watermarké", "Import Shopify & WooCommerce", "Étiquettes multilingues", "Analyse de risque IA"], cta: "Commencer gratuitement", accent: false, popular: false },
  { name: "Starter", price: "29", sub: "5 références", features: ["5 dossiers complets", "PDF sans watermark", "Import Shopify & WooCommerce", "Déclaration de Conformité", "Étiquettes 7 langues", "Support email"], cta: "Démarrer", accent: false, popular: false },
  { name: "Growth", price: "79", sub: "30 références", features: ["30 dossiers complets", "Import CSV", "Import Shopify & WooCommerce", "Alertes normes", "Personne Responsable EU", "Support prioritaire"], cta: "Choisir Growth", accent: true, popular: true },
  { name: "Pro", price: "199", sub: "150 références", features: ["150 dossiers complets", "Import Shopify & WooCommerce", "Accès API", "Rapports personnalisés", "Support dédié"], cta: "Choisir Pro", accent: false, popular: false },
]

const MARKETS = ["UE (GPSR 2023/988)", "USA (CPSC)", "Royaume-Uni (UKCA)", "Chine (CCC)", "Canada (CCPSA)", "Japon (PSE)", "Australie (RCM)"]
const CATEGORIES = ["Bougies & parfums", "Jouets", "Textiles", "Cosmétiques", "Électronique", "Puériculture", "Décoration", "Mobilier", "Sport & loisirs", "Contact alimentaire", "Éclairage", "Outillage"]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "inherit" }}>

      {/* Nav */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="Conforva" className="h-8 w-8 object-contain" />
            <span className="font-semibold text-gray-900 text-[15px]">Conforva</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</a>
            <a href="#comment" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="gap-1.5 text-sm">
                Créer un compte <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
          <div className="absolute top-32 right-0 h-72 w-72 rounded-full bg-violet-50 opacity-50 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700 mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Règlement GPSR (UE) 2023/988 — en vigueur depuis décembre 2024
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold leading-[1.12] tracking-tight text-gray-900"
          >
            Dossiers GPSR conformes,
            <br />
            <span className="text-blue-600">générés en quelques minutes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Analyse de risque, dossier technique 15 sections et déclaration de conformité
            conformes au règlement (UE) 2023/988 — pour tout vendeur ou fabricant dans l'UE.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/auth/login">
              <Button size="lg" className="gap-2 px-6 shadow-md shadow-blue-100 hover:-translate-y-0.5 transition-all">
                Créer un compte gratuit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#comment">
              <Button size="lg" variant="outline" className="gap-2 px-6 hover:-translate-y-0.5 transition-all">
                Voir comment ça marche
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="mt-3 text-sm text-gray-400"
          >
            Gratuit pour 1 référence · Aucune carte bancaire requise
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 }}
            className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { value: "7", label: "Marchés couverts" },
              { value: "15", label: "Sections Art. 22" },
              { value: "7", label: "Langues d'étiquetage" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-blue-600">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories strip */}
      <div className="border-y border-gray-100 bg-gray-50 py-4 overflow-hidden">
        <div className="flex gap-2 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <span key={cat} className="shrink-0 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-500 whitespace-nowrap shadow-sm">
              {cat}
            </span>
          ))}
          <span className="shrink-0 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-400 whitespace-nowrap">& bien d'autres…</span>
        </div>
      </div>

      {/* Features */}
      <section id="fonctionnalites" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Fonctionnalités</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Tout ce qu'exige le règlement GPSR</h2>
            <p className="mt-2 text-gray-500 text-sm max-w-xl">Chaque document est structuré selon les articles du règlement (UE) 2023/988 et les normes harmonisées applicables.</p>
          </FadeIn>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <FadeIn key={f.title} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-1 transition-all duration-200 cursor-default">
                    <div className={`h-10 w-10 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Connectors highlight */}
      <section className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="inline-block rounded-full bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 mb-4">Inclus dans tous les plans</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Importez vos produits en un clic depuis Shopify ou WooCommerce
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Vous avez déjà toutes les informations dans votre boutique. Conforva les récupère directement —
                nom, description, référence SKU, images — et pré-remplit votre dossier de conformité instantanément.
                Zéro ressaisie, aucune erreur de copier-coller.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Collez l'URL de votre produit Shopify → données importées automatiquement",
                  "Connectez votre WooCommerce avec vos clés API → choisissez parmi vos produits",
                  "Nom, description, SKU, matériaux détectés et pré-remplis dans le formulaire",
                  "Disponible dès le plan gratuit — sans restriction",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/login">
                <Button className="gap-2">
                  Essayer gratuitement <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 gap-4">
                {/* Shopify card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-xl bg-[#96BF48] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Connecteur Shopify</p>
                      <p className="text-xs text-gray-400">Boutiques publiques — sans clé API</p>
                    </div>
                    <span className="ml-auto text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-0.5">Actif</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                    <span className="text-xs text-gray-400 truncate">https://monshop.myshopify.com/products/nom-du-produit</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {["Nom produit", "Description", "SKU · Prix"].map(f => (
                      <div key={f} className="rounded-lg bg-blue-50 border border-blue-100 px-2 py-1.5 text-center">
                        <p className="text-[10px] text-blue-700 font-medium">{f}</p>
                        <p className="text-[10px] text-blue-400">importé</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WooCommerce card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-xl bg-[#7F54B3] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">W</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Connecteur WooCommerce</p>
                      <p className="text-xs text-gray-400">Via clés API WooCommerce REST</p>
                    </div>
                    <span className="ml-auto text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-0.5">Actif</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <span className="text-[10px] text-gray-400 font-medium w-24 shrink-0">Site URL</span>
                      <span className="text-xs text-gray-500 truncate">https://monsite.com</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <span className="text-[10px] text-gray-400 font-medium w-24 shrink-0">Consumer Key</span>
                      <span className="text-xs text-gray-400">ck_••••••••••</span>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-gray-400">Listez et sélectionnez vos produits directement depuis Conforva.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Markets band */}
      <section className="py-14 px-5 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="shrink-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Couverture</p>
                <h2 className="text-xl font-bold">7 marchés internationaux</h2>
              </div>
              <div className="h-px sm:h-10 w-full sm:w-px bg-gray-700 shrink-0" />
              <div className="flex flex-wrap gap-2">
                {MARKETS.map(m => (
                  <span key={m} className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-300">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section id="comment" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Processus</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">De la fiche produit au dossier conforme</h2>
          </FadeIn>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-4">
                    {s.n}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-6">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <p className="text-sm font-semibold text-gray-700 mb-4">Inclus dans chaque dossier</p>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {INCLUDED.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Tarifs</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Simple et transparent</h2>
            <p className="mt-1.5 text-gray-500 text-sm">Par nombre de références. Sans engagement.</p>
          </FadeIn>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.07}>
                <div className={`relative flex flex-col h-full rounded-2xl border p-6 gap-5 transition-all duration-200 hover:-translate-y-1 ${
                  plan.accent
                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "border-gray-200 bg-white shadow-sm hover:shadow-md"
                }`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 border-2 border-white px-3 py-0.5 text-[11px] font-semibold text-white whitespace-nowrap">
                      Le plus populaire
                    </span>
                  )}
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${plan.accent ? "text-blue-200" : "text-gray-400"}`}>{plan.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}€</span>
                      <span className={`text-sm ${plan.accent ? "text-blue-200" : "text-gray-400"}`}>/mois</span>
                    </div>
                    <p className={`text-sm font-medium mt-1 ${plan.accent ? "text-blue-100" : "text-blue-600"}`}>{plan.sub}</p>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.accent ? "text-blue-100" : "text-gray-500"}`}>
                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.accent ? "text-blue-200" : "text-emerald-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/login">
                    <Button className="w-full text-sm" variant={plan.accent ? "secondary" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-5 text-sm text-gray-400 text-center">
              Plus de 150 références ?{" "}
              <Link href="/auth/login" className="text-gray-600 underline underline-offset-2 hover:text-gray-900">
                Contactez-nous
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <FadeIn>
        <section className="mx-4 sm:mx-6 my-14 rounded-2xl bg-blue-600 px-8 py-14 text-center text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 75% 25%, white, transparent 55%)" }} />
          <h2 className="relative text-2xl sm:text-3xl font-bold mb-3">Commencez avec 1 produit, gratuitement</h2>
          <p className="relative text-blue-100 mb-8 text-sm">Aucune carte bancaire · Compte créé en 30 secondes</p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-[1.02] transition-all shadow-md gap-2">
              Créer mon compte gratuit <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </FadeIn>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
              <span className="font-semibold text-gray-700">Conforva</span>
              <span className="hidden sm:inline text-gray-300">—</span>
              <span className="hidden sm:inline">Conformité GPSR pour e-commerçants</span>
            </div>
            <div className="flex gap-5 text-xs">
              <Link href="/cgu" className="hover:text-gray-700 transition-colors">CGU</Link>
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">Confidentialité</Link>
              <Link href="/mentions-legales" className="hover:text-gray-700 transition-colors">Mentions légales</Link>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
            Les documents générés par Conforva constituent une base de travail structurée selon le règlement (UE) 2023/988.
            Ils ne remplacent pas l'avis d'un expert en conformité et ne garantissent pas la conformité juridique de votre produit.
          </p>
        </div>
      </footer>

    </div>
  )
}
