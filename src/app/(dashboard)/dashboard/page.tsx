import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner"
import {
  Package, Plus, CheckCircle2, Clock, AlertCircle,
  TrendingUp, FileText, Tag, Shield,
} from "lucide-react"
import { getComplianceBg, formatDate } from "@/lib/utils"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase
    .from("organizations").select("*").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const { data: userData } = await supabase
    .from("users").select("plan").eq("id", user.id).single()

  // Load products and compliance separately to avoid FK inference issues
  const { data: products } = await supabase
    .from("products")
    .select("*, product_categories(name_fr, icon)")
    .eq("org_id", org.id)
    .order("created_at", { ascending: false })
    .limit(20)

  const productIds = products?.map(p => p.id) ?? []

  const { data: complianceList } = productIds.length > 0
    ? await supabase.from("compliance_status").select("*").in("product_id", productIds)
    : { data: [] }

  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  const totalProducts = products?.length ?? 0
  const compliantCount = products?.filter(p => complianceMap[p.id]?.status === "compliant").length ?? 0
  const inProgressCount = products?.filter(p => complianceMap[p.id]?.status === "in_progress").length ?? 0
  const incompleteCount = totalProducts - compliantCount - inProgressCount

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue, {org.name}</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="gap-2"><Plus className="h-4 w-4" />Nouveau produit</Button>
        </Link>
      </div>

      <DisclaimerBanner />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Produits", value: totalProducts, icon: Package, color: "blue" },
          { label: "Conformes", value: compliantCount, icon: CheckCircle2, color: "green" },
          { label: "En cours", value: inProgressCount, icon: Clock, color: "amber" },
          { label: "Incomplets", value: incompleteCount, icon: AlertCircle, color: "red" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${color}-50`}>
                  <Icon className={`h-5 w-5 text-${color}-600`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/dashboard/products/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="font-semibold text-gray-900">Nouveau produit</p>
              <p className="text-xs text-gray-500">Créer ou importer un produit</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/documents">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="font-semibold text-gray-900">Mes documents</p>
              <p className="text-xs text-gray-500">Dossiers techniques générés</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/responsible-person">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="font-semibold text-gray-900">Personne Responsable</p>
              <p className="text-xs text-gray-500">Coordonnées EU obligatoires</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Products list */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />Mes produits
          </CardTitle>
          <Link href="/dashboard/products">
            <Button variant="ghost" size="sm">Voir tout</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {!products || products.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Package className="h-12 w-12 text-gray-300 mx-auto" />
              <p className="text-gray-500">Aucun produit pour l'instant.</p>
              <Link href="/dashboard/products/new">
                <Button size="sm">Créer mon premier produit</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => {
                const cs = complianceMap[product.id]
                const score = cs?.score ?? 0
                const status = cs?.status ?? "incomplete"
                const cat = product.product_categories as any
                return (
                  <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer">
                      <div className="text-2xl">{cat?.icon ?? "📦"}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {cat?.name_fr ?? "Catégorie inconnue"}
                          {product.reference && ` · Réf: ${product.reference}`}
                          {" · "}{formatDate(product.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden md:block w-24">
                          <Progress value={score} className="h-1.5" />
                          <p className="text-xs text-gray-500 mt-0.5 text-right">{score}%</p>
                        </div>
                        <Badge variant="secondary" className={getComplianceBg(score)}>
                          {status === "compliant" ? "Conforme" : status === "in_progress" ? "En cours" : "Incomplet"}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {userData?.plan === "free" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Plan gratuit — 1 référence incluse</p>
                  <p className="text-sm text-blue-700">Passez à Starter pour gérer jusqu'à 5 références sans watermark.</p>
                </div>
              </div>
              <Link href="/dashboard/billing">
                <Button size="sm">Mettre à niveau</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
