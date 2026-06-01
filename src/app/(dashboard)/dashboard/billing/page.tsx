import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Zap, TrendingUp } from "lucide-react"
import { getPlanLabel } from "@/lib/utils"
import type { Plan } from "@/types/supabase"

const PLANS = [
  {
    key: "free" as Plan,
    name: "Gratuit",
    price: "0€",
    period: "/mois",
    products: 1,
    features: ["1 référence produit", "Analyse de risque IA", "Dossier PDF watermarké", "Questionnaire dynamique"],
    priceId: null,
  },
  {
    key: "starter" as Plan,
    name: "Starter",
    price: "29€",
    period: "/mois",
    products: 5,
    features: ["5 références produits", "Dossiers sans watermark", "Étiquettes multilingues (5 langues)", "Validation humaine tracée", "Export PDF", "Support email"],
    priceId: process.env.STRIPE_PRICE_STARTER,
  },
  {
    key: "growth" as Plan,
    name: "Growth",
    price: "79€",
    period: "/mois",
    products: 30,
    features: ["30 références produits", "Import CSV", "Connecteur Shopify", "Alertes changements de normes", "Personne Responsable EU", "Support prioritaire"],
    priceId: process.env.STRIPE_PRICE_GROWTH,
    popular: true,
  },
  {
    key: "pro" as Plan,
    name: "Pro",
    price: "199€",
    period: "/mois",
    products: 150,
    features: ["150 références produits", "Connecteur WooCommerce", "API access", "Rapports personnalisés", "Account manager dédié"],
    priceId: process.env.STRIPE_PRICE_PRO,
  },
]

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: userData } = await supabase.from("users").select("id, plan, stripe_subscription_id").eq("id", user.id).single()
  const currentPlan = userData?.plan as Plan ?? "free"

  const { data: products } = await supabase
    .from("products")
    .select("id", { count: "exact" })
    .limit(0)
  // We use the count approach
  const { count: productCount } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("org_id", (await supabase.from("organizations").select("id").eq("owner_id", user.id).single()).data?.id ?? "")

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Facturation</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez votre abonnement Conforva</p>
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
                <p className="text-sm text-blue-600 font-medium">Plan actuel</p>
                <p className="text-xl font-bold text-blue-900">{getPlanLabel(currentPlan)}</p>
                <p className="text-sm text-blue-700">
                  {productCount ?? 0} / {PLANS.find(p => p.key === currentPlan)?.products ?? 1} références utilisées
                </p>
              </div>
            </div>
            {userData?.stripe_subscription_id && (
              <form action="/api/billing/portal" method="POST">
                <Button type="submit" variant="outline">Gérer mon abonnement</Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plans grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Choisir un plan</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.key === currentPlan
            return (
              <Card key={plan.key} className={plan.popular ? "border-blue-500 ring-1 ring-blue-500 shadow-lg" : ""}>
                <CardHeader className="pb-3">
                  {plan.popular && <Badge className="w-fit bg-blue-600 text-white mb-1">Plus populaire</Badge>}
                  {isCurrent && <Badge className="w-fit bg-green-100 text-green-700 mb-1">Plan actuel</Badge>}
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">{plan.products} référence{plan.products > 1 ? "s" : ""}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                  {isCurrent ? (
                    <Button variant="secondary" className="w-full" disabled>Plan actuel</Button>
                  ) : plan.key === "free" ? (
                    <Button variant="outline" className="w-full" disabled>Gratuit</Button>
                  ) : (
                    <form action="/api/billing/checkout" method="POST">
                      <input type="hidden" name="priceId" value={plan.priceId ?? ""} />
                      <input type="hidden" name="plan" value={plan.key} />
                      <Button type="submit" className="w-full" variant={plan.popular ? "default" : "outline"}>
                        Choisir {plan.name}
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
                <p className="font-semibold text-gray-900">Enterprise — 150+ références</p>
                <p className="text-sm text-gray-500">Sur devis · API access · SLA · Compte manager dédié</p>
              </div>
            </div>
            <a href="mailto:contact@conforva.com">
              <Button variant="outline">Nous contacter</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
