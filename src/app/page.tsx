import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield, FileText, Tag, Users,
  CheckCircle2, ArrowRight, Zap, Globe,
} from "lucide-react"
import { getLocale, getDictionary } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

const CATEGORY_KEYS = [
  "candles", "toys", "textiles", "cosmetics", "electronics",
  "baby", "decor", "furniture", "food_contact", "sports", "more",
] as const

const FEATURE_KEYS = [
  { icon: Shield,   key: "risk_analysis" },
  { icon: FileText, key: "technical_file" },
  { icon: Tag,      key: "multilingual_labels" },
  { icon: Users,    key: "responsible_person" },
  { icon: Zap,      key: "catalog_import" },
  { icon: Globe,    key: "dynamic_questionnaire" },
] as const

const PLANS = [
  { key: "free"    as const, price: "0€",   highlight: false },
  { key: "starter" as const, price: "29€",  highlight: false },
  { key: "growth"  as const, price: "79€",  highlight: true  },
  { key: "pro"     as const, price: "199€", highlight: false },
]

const HOW_STEPS = [
  { step: "01", key: "step1" as const },
  { step: "02", key: "step2" as const },
  { step: "03", key: "step3" as const },
  { step: "04", key: "step4" as const },
]

export default async function LandingPage() {
  const locale = await getLocale()
  const t = await getDictionary(locale)
  const land = t.landing

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-gray-900 tracking-tight">
            Conforva
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">{t.nav.features}</a>
            <a href="#pricing"  className="hover:text-gray-900 transition-colors">{t.nav.pricing}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-gray-600">{t.nav.login}</Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">{t.nav.freeTrial}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-20">
        <div className="mx-auto max-w-3xl text-center space-y-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            {land.hero.badge}
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight">
            {land.hero.title1}
            <br />
            <span className="text-blue-600">{land.hero.title2}</span>
          </h1>
          <p
            className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: land.hero.subtitle }}
          />
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2 px-8">
                {land.hero.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-400">{land.hero.noCard}</p>
        </div>
      </section>

      {/* ── Enforcement notice ─────────────────────────────────────── */}
      <div className="px-6 max-w-3xl mx-auto mb-16">
        <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 px-5 py-3.5 text-sm text-amber-900">
          <p dangerouslySetInnerHTML={{ __html: land.disclaimer.text }} />
        </div>
      </div>

      {/* ── Categories ─────────────────────────────────────────────── */}
      <section id="categories" className="px-6 py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{land.categories.title}</h2>
            <p className="text-gray-500 text-sm">{land.categories.subtitle}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_KEYS.map(key => (
              <span
                key={key}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 font-medium"
              >
                {land.categories.items[key]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{land.features.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
            {FEATURE_KEYS.map(f => {
              const Icon = f.icon
              const item = land.features.items[f.key]
              return (
                <div key={f.key} className="bg-white p-7 space-y-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                    <Icon className="h-4 w-4 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl space-y-12">
          <h2 className="text-2xl font-bold text-center">{land.how_it_works.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_STEPS.map(item => {
              const stepData = land.how_it_works.steps[item.key]
              return (
                <div key={item.key} className="space-y-3">
                  <p className="text-3xl font-bold text-gray-100 select-none">{item.step}</p>
                  <h3 className="font-semibold text-gray-900 text-sm">{stepData.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{stepData.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────── */}
      <section id="pricing" className="px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{land.pricing.title}</h2>
            <p className="text-gray-500 text-sm">{land.pricing.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map(plan => {
              const planData = land.pricing.plans[plan.key]
              return (
                <div
                  key={plan.key}
                  className={`rounded-xl border p-6 space-y-5 ${
                    plan.highlight
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {plan.highlight && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      {land.pricing.mostPopular}
                    </p>
                  )}
                  <div>
                    <p className={`font-semibold text-sm ${plan.highlight ? "text-gray-300" : "text-gray-500"}`}>
                      {planData.name}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className={`text-xs ${plan.highlight ? "text-gray-400" : "text-gray-400"}`}>/mois</span>
                    </div>
                    <p className={`text-xs mt-1 ${plan.highlight ? "text-blue-400" : "text-blue-600"}`}>
                      {planData.products}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {planData.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${plan.highlight ? "text-blue-400" : "text-blue-600"}`} />
                        <span className={plan.highlight ? "text-gray-300" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/login">
                    <Button
                      className="w-full"
                      variant={plan.highlight ? "secondary" : "outline"}
                      size="sm"
                    >
                      {planData.cta}
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-gray-950 text-white">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold">{land.cta.title}</h2>
          <p className="text-gray-400">{land.cta.subtitle}</p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
              {land.cta.button} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <span className="font-semibold text-gray-600">Conforva</span>
          <span>{land.footer.disclaimer}</span>
          <div className="flex gap-5">
            <Link href="/cgu"     className="hover:text-gray-600 transition-colors">{land.footer.cgu}</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">{land.footer.privacy}</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
