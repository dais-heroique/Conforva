import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield, FileText, Tag, Users, CheckCircle2, ArrowRight,
  Zap, Globe, Lock, AlertTriangle,
} from "lucide-react"
import { getLocale, getDictionary } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import type { Messages } from "@/messages/types"

const CATEGORY_KEYS = [
  { icon: "🕯️", key: "candles" },
  { icon: "🧸", key: "toys" },
  { icon: "👕", key: "textiles" },
  { icon: "💄", key: "cosmetics" },
  { icon: "🔌", key: "electronics" },
  { icon: "🍼", key: "baby" },
  { icon: "🏡", key: "decor" },
  { icon: "🛋️", key: "furniture" },
  { icon: "🍽️", key: "food_contact" },
  { icon: "⚽", key: "sports" },
  { icon: "📦", key: "more" },
] as const

const FEATURE_KEYS = [
  { icon: Shield, key: "risk_analysis" },
  { icon: FileText, key: "technical_file" },
  { icon: Tag, key: "multilingual_labels" },
  { icon: Users, key: "responsible_person" },
  { icon: Zap, key: "catalog_import" },
  { icon: Globe, key: "dynamic_questionnaire" },
] as const

export default async function LandingPage() {
  const locale = await getLocale()
  const t = await getDictionary(locale)
  const land = t.landing

  const PLANS = [
    {
      key: "free" as const,
      price: "0€",
      period: "/mois",
      highlight: false,
    },
    {
      key: "starter" as const,
      price: "29€",
      period: "/mois",
      highlight: false,
    },
    {
      key: "growth" as const,
      price: "79€",
      period: "/mois",
      highlight: true,
    },
    {
      key: "pro" as const,
      price: "199€",
      period: "/mois",
      highlight: false,
    },
  ]

  const HOW_STEPS = [
    { step: "1", key: "step1" as const },
    { step: "2", key: "step2" as const },
    { step: "3", key: "step3" as const },
    { step: "4", key: "step4" as const },
  ]

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
            <a href="#features" className="hover:text-gray-900">{t.nav.features}</a>
            <a href="#categories" className="hover:text-gray-900">{t.nav.categories}</a>
            <a href="#pricing" className="hover:text-gray-900">{t.nav.pricing}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher className="w-24 text-sm" />
            <Link href="/auth/login"><Button variant="outline" size="sm">{t.nav.login}</Button></Link>
            <Link href="/auth/login"><Button size="sm">{t.nav.freeTrial}</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="text-blue-700 bg-blue-50 border-blue-100">
            {land.hero.badge}
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            {land.hero.title1}<br />
            <span className="text-blue-600">{land.hero.title2}</span>
          </h1>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: land.hero.subtitle }}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                {land.hero.cta} <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-400">{land.hero.noCard}</p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 max-w-4xl mx-auto mb-10">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <p dangerouslySetInnerHTML={{ __html: land.disclaimer.text }} />
        </div>
      </div>

      {/* Categories */}
      <section id="categories" className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">{land.categories.title}</h2>
          <p className="text-gray-500">{land.categories.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORY_KEYS.map((cat) => (
              <div key={cat.key} className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <span>{cat.icon}</span> {land.categories.items[cat.key]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">{land.features.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_KEYS.map((f) => {
              const Icon = f.icon
              const item = land.features.items[f.key]
              return (
                <Card key={f.key} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center">{land.how_it_works.title}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_STEPS.map((item) => {
              const stepData = land.how_it_works.steps[item.key]
              return (
                <div key={item.key} className="text-center space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">{item.step}</div>
                  <h3 className="font-semibold text-gray-900">{stepData.title}</h3>
                  <p className="text-sm text-gray-500">{stepData.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">{land.pricing.title}</h2>
            <p className="text-gray-500">{land.pricing.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => {
              const planData = land.pricing.plans[plan.key]
              return (
                <Card key={plan.key} className={plan.highlight ? "border-blue-500 shadow-lg ring-1 ring-blue-500" : ""}>
                  <CardContent className="pt-6 space-y-4">
                    {plan.highlight && <Badge className="bg-blue-600 text-white">{land.pricing.mostPopular}</Badge>}
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{planData.name}</h3>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500 text-sm">{plan.period}</span>
                      </div>
                      <p className="text-sm text-blue-600 font-medium mt-1">{planData.products}</p>
                    </div>
                    <ul className="space-y-2">
                      {planData.features.map((f: string) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/auth/login">
                      <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>{planData.cta}</Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">{land.cta.title}</h2>
          <p className="text-blue-100">{land.cta.subtitle}</p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {land.cta.button} <ArrowRight className="h-5 w-5 ml-2" />
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
            <span>{land.footer.disclaimer}</span>
          </div>
          <div className="flex gap-4">
            <Link href="/cgu" className="hover:text-gray-600">{land.footer.cgu}</Link>
            <Link href="/privacy" className="hover:text-gray-600">{land.footer.privacy}</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
