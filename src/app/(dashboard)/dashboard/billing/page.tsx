import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Check, Zap, CreditCard, ExternalLink } from "lucide-react"

const PLANS = [
  {
    key: "starter",
    name: "Starter",
    price: "29€/mois",
    features: ["2 concurrents", "20 produits suivis", "5 alertes", "Rapport hebdo IA", "Mises à jour journalières"],
    priceId: process.env.STRIPE_PRICE_STARTER!,
  },
  {
    key: "growth",
    name: "Growth",
    price: "79€/mois",
    features: ["10 concurrents", "150 produits suivis", "Alertes illimitées", "Rapport IA quotidien", "Mises à jour 2x/jour", "Export CSV"],
    priceId: process.env.STRIPE_PRICE_GROWTH!,
    highlight: true,
  },
  {
    key: "pro",
    name: "Pro",
    price: "199€/mois",
    features: ["Concurrents illimités", "Produits illimités", "Alertes illimitées", "Rapport IA temps réel", "Mises à jour horaires", "API complète", "Multi-utilisateurs"],
    priceId: process.env.STRIPE_PRICE_PRO!,
  },
]

const PLAN_LABELS: Record<string, string> = {
  free: "Gratuit",
  starter: "Starter",
  growth: "Growth",
  pro: "Pro",
  enterprise: "Enterprise",
}

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const db = getDb()

  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership) redirect("/onboarding")
  const org = membership.org

  return (
    <div className="p-6 space-y-6 bg-[#08090C] min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Facturation</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Plan actuel : <span className="text-[#A78BFA] font-semibold">{PLAN_LABELS[org.plan] ?? org.plan}</span>
        </p>
      </div>

      {/* Current plan info */}
      {org.subscriptionStatus === "active" && org.stripeCustomerId && (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/12 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
              <CreditCard className="h-4.5 w-4.5 text-[#A78BFA]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Abonnement actif — {PLAN_LABELS[org.plan]}</p>
              <p className="text-xs text-gray-500 mt-0.5">Gérez votre abonnement, vos factures et votre mode de paiement</p>
            </div>
          </div>
          <form action="/api/billing/portal" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 text-sm text-[#A78BFA] border border-[#8B5CF6]/30 px-4 py-2 rounded-xl hover:bg-[#8B5CF6]/10 transition-colors"
            >
              Gérer <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Plans */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-4">Choisir un plan</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = org.plan === plan.key
            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl p-6 flex flex-col border transition-colors ${
                  plan.highlight ? "border-[#8B5CF6]/40 bg-[#8B5CF6]/6" :
                  isCurrent ? "border-white/20 bg-white/5" :
                  "border-white/8 bg-white/3"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg shadow-violet-900/30">
                    Le plus populaire
                  </span>
                )}
                <div className="mb-5">
                  <p className="font-bold text-white">{plan.name}</p>
                  <p className="text-2xl font-black text-white mt-1">{plan.price}</p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="h-3.5 w-3.5 text-[#A78BFA] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <div className="w-full text-center py-2.5 text-xs font-semibold text-[#A78BFA] border border-[#8B5CF6]/30 rounded-xl">
                    Plan actuel
                  </div>
                ) : (
                  <form action="/api/billing/checkout" method="POST">
                    <input type="hidden" name="priceId" value={plan.priceId} />
                    <button
                      type="submit"
                      className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors ${
                        plan.highlight
                          ? "bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {org.plan === "free" ? "Passer à " : "Changer pour "}{plan.name}
                    </button>
                  </form>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Besoin d'un plan Enterprise ?{" "}
          <Link href="/contact" className="text-[#A78BFA] hover:underline">Contactez-nous</Link>
        </p>
      </div>
    </div>
  )
}
