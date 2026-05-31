import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield, FileText, Tag, Users, CheckCircle2, ArrowRight,
  Zap, Globe, Lock, AlertTriangle,
} from "lucide-react"

const CATEGORIES = [
  { icon: "🕯️", name: "Bougies" }, { icon: "🧸", name: "Jouets" },
  { icon: "👕", name: "Textiles" }, { icon: "💄", name: "Cosmétiques" },
  { icon: "🔌", name: "Électronique" }, { icon: "🍼", name: "Puériculture" },
  { icon: "🏡", name: "Décoration" }, { icon: "🛋️", name: "Mobilier" },
  { icon: "🍽️", name: "Contact alimentaire" }, { icon: "⚽", name: "Sport & loisirs" },
  { icon: "📦", name: "& bien plus..." },
]

const FEATURES = [
  {
    icon: Shield,
    title: "Analyse de risque IA",
    desc: "Analyse de risque GPSR personnalisée par catégorie, générée par IA et basée sur les normes EU applicables (EN 71, EN 15493, ISO, etc.).",
  },
  {
    icon: FileText,
    title: "Dossier technique PDF",
    desc: "Génération automatique du dossier technique complet : description produit, risques identifiés, mesures de mitigation, normes référencées.",
  },
  {
    icon: Tag,
    title: "Étiquetage multilingue",
    desc: "Avertissements de sécurité traduits en FR, EN, DE, IT, ES. Mentions CLP pour les allergènes, pictogrammes EN applicables.",
  },
  {
    icon: Users,
    title: "Personne Responsable UE",
    desc: "Gestion de vos coordonnées Personne Responsable EU, obligatoires pour tous les produits vendus dans l'Union Européenne.",
  },
  {
    icon: Zap,
    title: "Import catalogue",
    desc: "Import CSV ou connecteur Shopify/WooCommerce pour traiter plusieurs références en masse.",
  },
  {
    icon: Globe,
    title: "Questionnaire dynamique",
    desc: "Questions adaptées à votre catégorie de produit : bougies, jouets et cosmétiques n'ont pas les mêmes exigences.",
  },
]

const PLANS = [
  {
    name: "Gratuit",
    price: "0€",
    period: "/mois",
    products: "1 référence",
    features: ["1 analyse de risque", "Dossier technique watermarké", "Export PDF"],
    cta: "Commencer gratuitement",
    highlight: false,
  },
  {
    name: "Starter",
    price: "29€",
    period: "/mois",
    products: "5 références",
    features: ["5 dossiers complets", "Étiquettes multilingues", "Validation humaine", "Support email"],
    cta: "Démarrer",
    highlight: false,
  },
  {
    name: "Growth",
    price: "79€",
    period: "/mois",
    products: "30 références",
    features: ["30 dossiers complets", "Import CSV", "Connecteur Shopify", "Alertes normes", "Support prioritaire"],
    cta: "Choisir Growth",
    highlight: true,
  },
  {
    name: "Pro",
    price: "199€",
    period: "/mois",
    products: "150 références",
    features: ["150 dossiers", "WooCommerce", "Personne Responsable EU", "API access", "Support dédié"],
    cta: "Choisir Pro",
    highlight: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">C</div>
            <span className="font-bold text-gray-900 text-lg">Conforva</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Fonctionnalités</a>
            <a href="#categories" className="hover:text-gray-900">Catégories</a>
            <a href="#pricing" className="hover:text-gray-900">Tarifs</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login"><Button variant="outline" size="sm">Connexion</Button></Link>
            <Link href="/auth/login"><Button size="sm">Essai gratuit</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="text-blue-700 bg-blue-50 border-blue-100">
            Règlement GPSR UE 2023/988 — En vigueur depuis décembre 2024
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Votre conformité GPSR<br />
            <span className="text-blue-600">en quelques minutes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Générez votre dossier technique, analyse de risque et étiquetage multilingue
            pour <strong>n'importe quel produit physique</strong> vendu dans l'UE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Commencer gratuitement <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-400">Aucune carte bancaire requise · 1 produit gratuit pour toujours</p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 max-w-4xl mx-auto mb-10">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <p>
            <strong>Important :</strong> Conforva est un outil d'aide à la conformité, jamais une garantie juridique.
            Chaque dossier généré doit être validé par un expert avant mise sur le marché UE.
          </p>
        </div>
      </div>

      {/* Categories */}
      <section id="categories" className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Pour tous vos produits physiques</h2>
          <p className="text-gray-500">Quel que soit votre secteur, Conforva adapte l'analyse aux normes applicables.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <span>{cat.icon}</span> {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Tout ce qu'il vous faut pour la conformité GPSR</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <Card key={f.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Choisissez la catégorie", desc: "Bougies, jouets, cosmétiques, électronique… 10+ catégories couvertes." },
              { step: "2", title: "Remplissez le questionnaire", desc: "Questions adaptées à votre catégorie. 5 à 10 minutes maximum." },
              { step: "3", title: "L'IA génère le dossier", desc: "Analyse de risque + dossier technique basés sur les normes EU." },
              { step: "4", title: "Validez et exportez", desc: "Validation humaine obligatoire, export PDF multilingue." },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">{item.step}</div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Tarifs simples et transparents</h2>
            <p className="text-gray-500">Payez selon le nombre de références que vous gérez.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <Card key={plan.name} className={plan.highlight ? "border-blue-500 shadow-lg ring-1 ring-blue-500" : ""}>
                <CardContent className="pt-6 space-y-4">
                  {plan.highlight && <Badge className="bg-blue-600 text-white">Plus populaire</Badge>}
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 text-sm">{plan.period}</span>
                    </div>
                    <p className="text-sm text-blue-600 font-medium mt-1">{plan.products}</p>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/login">
                    <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>{plan.cta}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Commencez votre premier dossier GPSR</h2>
          <p className="text-blue-100">Gratuit pour 1 produit. Aucune carte bancaire requise.</p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Créer mon compte gratuit <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-6 text-sm text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xs">C</div>
            <span className="font-semibold text-gray-600">Conforva</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600">
            <Lock className="h-4 w-4" />
            <span>Aide à la conformité — pas un avis juridique</span>
          </div>
          <div className="flex gap-4">
            <Link href="/cgu" className="hover:text-gray-600">CGU</Link>
            <Link href="/privacy" className="hover:text-gray-600">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
