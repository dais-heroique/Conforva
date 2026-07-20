import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Check, Zap, CreditCard, ExternalLink } from "lucide-react"
import { getLocale } from "@/lib/i18n/locale"
import { withUnlimitedAccess } from "@/lib/admin"

const PLANS = {
  fr: [
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
  ],
  en: [
    {
      key: "starter",
      name: "Starter",
      price: "€29/mo",
      features: ["2 competitors", "20 tracked products", "5 alerts", "Weekly AI report", "Daily updates"],
      priceId: process.env.STRIPE_PRICE_STARTER!,
    },
    {
      key: "growth",
      name: "Growth",
      price: "€79/mo",
      features: ["10 competitors", "150 tracked products", "Unlimited alerts", "Daily AI report", "Updates 2x/day", "CSV export"],
      priceId: process.env.STRIPE_PRICE_GROWTH!,
      highlight: true,
    },
    {
      key: "pro",
      name: "Pro",
      price: "€199/mo",
      features: ["Unlimited competitors", "Unlimited products", "Unlimited alerts", "Real-time AI report", "Hourly updates", "Full API", "Multi-user"],
      priceId: process.env.STRIPE_PRICE_PRO!,
    },
  ],
}

const DICT = {
  fr: {
    planLabels: { free: "Gratuit", starter: "Starter", growth: "Growth", pro: "Pro", enterprise: "Enterprise" } as Record<string, string>,
    title: "Facturation",
    currentPlan: (name: string) => <>Plan actuel : <span className="text-[#A78BFA] font-semibold">{name}</span></>,
    activeSubscription: (name: string) => `Abonnement actif — ${name}`,
    manageSubDesc: "Gérez votre abonnement, vos factures et votre mode de paiement",
    manage: "Gérer",
    choosePlan: "Choisir un plan",
    mostPopular: "Le plus populaire",
    currentPlanBadge: "Plan actuel",
    upgradeTo: "Passer à ",
    switchTo: "Changer pour ",
    needEnterprise: "Besoin d'un plan Enterprise ?",
    contactUs: "Contactez-nous",
  },
  en: {
    planLabels: { free: "Free", starter: "Starter", growth: "Growth", pro: "Pro", enterprise: "Enterprise" } as Record<string, string>,
    title: "Billing",
    currentPlan: (name: string) => <>Current plan: <span className="text-[#A78BFA] font-semibold">{name}</span></>,
    activeSubscription: (name: string) => `Active subscription — ${name}`,
    manageSubDesc: "Manage your subscription, invoices and payment method",
    manage: "Manage",
    choosePlan: "Choose a plan",
    mostPopular: "Most popular",
    currentPlanBadge: "Current plan",
    upgradeTo: "Upgrade to ",
    switchTo: "Switch to ",
    needEnterprise: "Need an Enterprise plan?",
    contactUs: "Contact us",
  },
}

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const locale = await getLocale()
  const t = DICT[locale]
  const plans = PLANS[locale]

  const db = getDb()

  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership) redirect("/onboarding")
  const org = withUnlimitedAccess(membership.org, session.user.email)

  return (
    <div className="p-6 space-y-6 bg-[#08090C] min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {t.currentPlan(t.planLabels[org.plan] ?? org.plan)}
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
              <p className="text-sm font-semibold text-white">{t.activeSubscription(t.planLabels[org.plan])}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t.manageSubDesc}</p>
            </div>
          </div>
          <form action="/api/billing/portal" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 text-sm text-[#A78BFA] border border-[#8B5CF6]/30 px-4 py-2 rounded-xl hover:bg-[#8B5CF6]/10 transition-colors"
            >
              {t.manage} <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Plans */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-4">{t.choosePlan}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => {
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
                    {t.mostPopular}
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
                    {t.currentPlanBadge}
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
                      {org.plan === "free" ? t.upgradeTo : t.switchTo}{plan.name}
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
          {t.needEnterprise}{" "}
          <Link href="/contact" className="text-[#A78BFA] hover:underline">{t.contactUs}</Link>
        </p>
      </div>
    </div>
  )
}
