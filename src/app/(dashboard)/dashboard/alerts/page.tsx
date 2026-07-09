import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, alerts, trackedCompetitors } from "@/lib/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { Bell, Plus, Zap, TrendingDown, Package, ShoppingCart, TrendingUp, Trash2 } from "lucide-react"
import { AddAlertButton } from "./add-alert-button"

const ALERT_TYPE_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  price_drop: { label: "Baisse de prix", icon: <TrendingDown className="h-3.5 w-3.5" />, color: "text-[#8B5CF6]" },
  price_increase: { label: "Hausse de prix", icon: <TrendingUp className="h-3.5 w-3.5" />, color: "text-red-400" },
  out_of_stock: { label: "Rupture de stock", icon: <Package className="h-3.5 w-3.5" />, color: "text-orange-400" },
  back_in_stock: { label: "Retour en stock", icon: <ShoppingCart className="h-3.5 w-3.5" />, color: "text-blue-400" },
  new_product: { label: "Nouveau produit", icon: <Zap className="h-3.5 w-3.5" />, color: "text-purple-400" },
}

export default async function AlertsPage() {
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

  const [alertList, competitors] = await Promise.all([
    db.select().from(alerts).where(eq(alerts.organizationId, org.id)).orderBy(desc(alerts.createdAt)),
    db.select().from(trackedCompetitors).where(and(eq(trackedCompetitors.organizationId, org.id), eq(trackedCompetitors.isActive, true))),
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Alertes</h1>
          <p className="text-sm text-gray-500 mt-0.5">{alertList.length} / {org.alertLimit} alertes configurées</p>
        </div>
        <AddAlertButton
          orgId={org.id}
          competitors={competitors.map(c => ({ id: c.id, name: c.name }))}
          canAdd={alertList.length < org.alertLimit}
        />
      </div>

      {alertList.length === 0 ? (
        <div className="bg-white/5 border border-white/8 rounded-2xl p-12 text-center">
          <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Aucune alerte configurée</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Créez des alertes pour être notifié par email dès qu'un concurrent change un prix, rompt un stock ou lance un nouveau produit.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alertList.map((alert) => {
            const type = ALERT_TYPE_LABELS[alert.type] ?? { label: alert.type, icon: <Bell className="h-3.5 w-3.5" />, color: "text-gray-400" }
            return (
              <div key={alert.id} className="bg-white/5 border border-white/8 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${type.color}`}>{type.icon}</div>
                  <div>
                    <p className="font-medium text-white text-sm">{alert.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs ${type.color}`}>{type.label}</span>
                      {alert.threshold && (
                        <span className="text-xs text-gray-500">· seuil {alert.threshold}%</span>
                      )}
                      {alert.lastTriggeredAt && (
                        <span className="text-xs text-gray-500">
                          · dernier déclenchement {new Date(alert.lastTriggeredAt).toLocaleDateString("fr-FR")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${alert.isActive ? "bg-[#8B5CF6]" : "bg-gray-600"}`} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
