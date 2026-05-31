import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Globe, ChevronRight } from "lucide-react"

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Analyse de risque structurée",
    desc: "Identification des dangers par catégorie de produit, basée sur les normes européennes en vigueur (EN 71, EN 15493, GPSR 2023/988…).",
  },
  {
    icon: FileText,
    title: "Dossier technique complet",
    desc: "Description produit, risques identifiés, mesures correctives, normes applicables — prêt à soumettre ou à présenter à un organisme notifié.",
  },
  {
    icon: Globe,
    title: "Étiquetage multilingue",
    desc: "Avertissements de sécurité en français, anglais, allemand, italien et espagnol. Pictogrammes et mentions CLP inclus.",
  },
]

const STEPS = [
  { n: "01", title: "Renseignez votre produit", desc: "Catégorie, matériaux, usage prévu, marchés cibles. Un formulaire guidé, adapté à votre secteur." },
  { n: "02", title: "Recevez le dossier généré", desc: "Analyse de risque, dossier technique et étiquettes produits générés automatiquement." },
  { n: "03", title: "Validez et exportez", desc: "Relisez, approuvez, et exportez en PDF. Le watermark disparaît à la validation." },
]

const PLANS = [
  {
    name: "Gratuit",
    price: "0",
    products: "1 référence",
    features: ["1 dossier complet", "Export PDF (watermarké)", "Étiquettes multilingues"],
    cta: "Créer un compte",
    primary: false,
  },
  {
    name: "Starter",
    price: "29",
    products: "5 références",
    features: ["5 dossiers complets", "Export PDF sans watermark", "Validation humaine", "Support email"],
    cta: "Démarrer",
    primary: false,
  },
  {
    name: "Growth",
    price: "79",
    products: "30 références",
    features: ["30 dossiers complets", "Import CSV", "Connecteur Shopify", "Support prioritaire"],
    cta: "Choisir Growth",
    primary: true,
  },
  {
    name: "Pro",
    price: "199",
    products: "150 références",
    features: ["150 dossiers", "WooCommerce", "Accès API", "Support dédié"],
    cta: "Choisir Pro",
    primary: false,
  },
]

const CATEGORIES = [
  "Bougies & parfums", "Jouets", "Textiles & vêtements", "Cosmétiques",
  "Électronique", "Puériculture", "Décoration", "Mobilier",
  "Articles de sport", "Contact alimentaire",
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm select-none">C</div>
            <span className="font-semibold text-gray-900 tracking-tight">Conforva</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#comment" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="gap-1.5">
                Commencer <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-28 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            Règlement GPSR (UE) 2023/988 — En vigueur depuis décembre 2024
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-gray-900 max-w-3xl">
            La conformité GPSR pour les e-commerçants européens
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl leading-relaxed">
            Conforva vous aide à constituer votre dossier technique, votre analyse de risque
            et vos étiquettes multilingues pour tout produit physique vendu dans l'Union Européenne.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Créer un compte gratuit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#comment">
              <Button size="lg" variant="outline">
                Voir comment ça marche
              </Button>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Gratuit pour 1 référence · Aucune carte bancaire requise
          </p>
        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="bg-amber-50 border-b border-amber-100 px-6 py-3">
        <p className="max-w-6xl mx-auto text-xs text-amber-700 text-center">
          Conforva est un outil d'aide à la constitution de dossiers de conformité.
          Il ne se substitue pas à l'avis d'un expert juridique ou d'un organisme notifié.
          Chaque dossier doit être relu et approuvé par un responsable qualifié avant mise sur le marché.
        </p>
      </div>

      {/* Categories */}
      <section className="py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Catégories couvertes
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <span
                key={cat}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-600"
              >
                {cat}
              </span>
            ))}
            <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-400">
              & autres produits physiques
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Ce que génère Conforva</h2>
            <p className="mt-2 text-gray-500">Trois documents indispensables pour la conformité GPSR.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="space-y-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                    <Icon className="h-4 w-4 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment" className="py-20 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Comment ça marche</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map(s => (
              <div key={s.n} className="space-y-3">
                <span className="text-3xl font-bold text-gray-200">{s.n}</span>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Inclus dans chaque dossier :</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {[
                "Description détaillée du produit",
                "Identification des dangers par catégorie",
                "Mesures de prévention et mitigation",
                "Normes européennes référencées",
                "Étiquettes en 5 langues (FR / EN / DE / IT / ES)",
                "Coordonnées Personne Responsable UE",
                "Export PDF prêt à l'emploi",
                "Journal d'audit et historique des versions",
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Tarifs</h2>
            <p className="mt-2 text-gray-500">Par nombre de références actives. Sans engagement.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col gap-5 ${
                  plan.primary
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white"
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
                      <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.primary ? "text-blue-200" : "text-green-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/login">
                  <Button
                    className="w-full"
                    variant={plan.primary ? "secondary" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-400 text-center">
            Besoin de plus de 150 références ? <Link href="/auth/login" className="text-gray-600 underline underline-offset-2">Contactez-nous</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xs">C</div>
            <span className="font-medium text-gray-600">Conforva</span>
            <span>— Aide à la conformité GPSR</span>
          </div>
          <div className="flex gap-5">
            <Link href="/cgu" className="hover:text-gray-600 transition-colors">CGU</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
