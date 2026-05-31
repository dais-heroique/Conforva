import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Package, Upload } from "lucide-react"
import { getComplianceBg, formatDate } from "@/lib/utils"

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const { data: products } = await supabase
    .from("products")
    .select("*, product_categories(name_fr, icon)")
    .eq("org_id", org.id)
    .order("created_at", { ascending: false })

  const productIds = products?.map(p => p.id) ?? []
  const { data: complianceList } = productIds.length > 0
    ? await supabase.from("compliance_status").select("*").in("product_id", productIds)
    : { data: [] }
  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes produits</h1>
          <p className="text-sm text-gray-500 mt-1">{products?.length ?? 0} produit(s)</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/products/import">
            <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" />Importer</Button>
          </Link>
          <Link href="/dashboard/products/new">
            <Button className="gap-2"><Plus className="h-4 w-4" />Nouveau produit</Button>
          </Link>
        </div>
      </div>

      {!products || products.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center space-y-4">
            <Package className="h-16 w-16 text-gray-200 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">Aucun produit</p>
              <p className="text-sm text-gray-500 mt-1">Créez votre premier produit pour commencer votre dossier GPSR.</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link href="/dashboard/products/import">
                <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" />Importer CSV</Button>
              </Link>
              <Link href="/dashboard/products/new">
                <Button className="gap-2"><Plus className="h-4 w-4" />Créer manuellement</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => {
            const cs = complianceMap[product.id]
            const score = cs?.score ?? 0
            const status = cs?.status ?? "incomplete"
            const cat = product.product_categories as any
            return (
              <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{cat?.icon ?? "📦"}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {cat?.name_fr ?? "Non catégorisé"}
                          {product.reference && <> · <span className="font-mono text-xs">{product.reference}</span></>}
                          {" · "}{formatDate(product.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end gap-1 w-28">
                          <Progress value={score} className="h-1.5 w-full" />
                          <span className="text-xs text-gray-500">{score}% complet</span>
                        </div>
                        <Badge variant="secondary" className={getComplianceBg(score)}>
                          {status === "compliant" ? "Conforme" : status === "in_progress" ? "En cours" : "Incomplet"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
