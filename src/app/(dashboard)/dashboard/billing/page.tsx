import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Zap, TrendingUp } from "lucide-react"
import { getPlanLabel } from "@/lib/utils"
import type { Plan } from "@/types/supabase"
import { getLocale, getDictionary } from "@/lib/i18n"

const PLAN_KEYS: Plan[] = ["free", "starter", "growth", "pro"]
const PLAN_PRICES: Record<Plan, string> = {
  free: "0€",
  starter: "29€",
  growth: "79€",
  pro: "199€",
  enterprise: "Sur devis",
}
const PLAN_PRODUCTS: Record<Plan, number> = {
  free: 1,
  starter: 5,
  growth: 30,
  pro: 150,
  enterprise: 0,
}
const PLAN_POPULAR: Partial<Record<Plan, boolean>> = {
  growth: true,
}
const PLAN_PRICE_IDS: Partial<Record<Plan, string | undefined>> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  pro: process.env.STRIPE_PRICE_PRO,
}

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: userData } = await supabase.from("users").select("id, plan, stripe_subscription_id").eq("id", user.id).single()
  const currentPlan = userData?.plan as Plan ?? "free"

  const { count: productCount } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("org_id", (await supabase.from("organizations").select("id").eq("owner_id", user.id).single()).data?.id ?? "")

  const locale = await getLocale()
  const dict = await getDictionary(locale)
  const t = dict.dashboard.billing

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
      </div>

      {/* Current plan */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">{t.currentPlan}</p>
                <p className="text-xl font-bold text-blue-900">{getPlanLabel(currentPlan)}</p>
                <p className="text-sm text-blue-700">
                  {t.referencesUsed
                    .replace('{{used}}', String(productCount ?? 0))
                    .replace('{{max}}', String(PLAN_PRODUCTS[currentPlan] ?? 1))}
                </p>
              </div>
            </div>
            {userData?.stripe_subscription_id && (
              <form action="/api/billing/portal" method="POST">
                <Button type="submit" variant="outline">{t.manageSubscription}</Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plans grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.choosePlan}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLAN_KEYS.map((planKey) => {
            const isCurrent = planKey === currentPlan
            const isPopular = !!PLAN_POPULAR[planKey]
            const planFeatures = t.plans[planKey as keyof typeof t.plans]?.features ?? []
            const products = PLAN_PRODUCTS[planKey]
            const priceId = PLAN_PRICE_IDS[planKey]
            return (
              <Card key={planKey} className={isPopular ? "border-blue-500 ring-1 ring-blue-500 shadow-lg" : ""}>
                <CardHeader className="pb-3">
                  {isPopular && <Badge className="w-fit bg-blue-600 text-white mb-1">{t.mostPopular}</Badge>}
                  {isCurrent && <Badge className="w-fit bg-green-100 text-green-700 mb-1">{t.currentPlanBadge}</Badge>}
                  <CardTitle className="text-base">{getPlanLabel(planKey)}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{PLAN_PRICES[planKey]}</span>
                    <span className="text-gray-400 text-sm">/mois</span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">
                    {products} {products > 1 ? t.references : t.reference}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {(planFeatures as string[]).map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                  {isCurrent ? (
                    <Button variant="secondary" className="w-full" disabled>{t.currentPlanButton}</Button>
                  ) : planKey === "free" ? (
                    <Button variant="outline" className="w-full" disabled>{t.freeButton}</Button>
                  ) : (
                    <form action="/api/billing/checkout" method="POST">
                      <input type="hidden" name="priceId" value={priceId ?? ""} />
                      <input type="hidden" name="plan" value={planKey} />
                      <Button type="submit" className="w-full" variant={isPopular ? "default" : "outline"}>
                        {t.choosePlanButton.replace('{{name}}', getPlanLabel(planKey))}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Enterprise */}
      <Card>
        <CardContent className="py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t.enterprise.title}</p>
                <p className="text-sm text-gray-500">{t.enterprise.desc}</p>
              </div>
            </div>
            <a href="mailto:contact@conforva.com">
              <Button variant="outline">{t.enterprise.contact}</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
