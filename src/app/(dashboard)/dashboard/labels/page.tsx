import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tag, Download, Eye, AlertTriangle } from "lucide-react"
import { SUPPORTED_LANGUAGES, formatDate } from "@/lib/utils"

export default async function LabelsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const productIds = (await supabase.from("products").select("id").eq("org_id", org.id)).data?.map(p => p.id) ?? []

  const { data: labels } = await supabase
    .from("labels")
    .select(`*, products(id, name, reference, product_categories(name_fr, icon))`)
    .in("product_id", productIds)
    .order("created_at", { ascending: false })

  // Group by product
  const byProduct = labels?.reduce((acc, label) => {
    const pid = label.product_id
    if (!acc[pid]) acc[pid] = { product: label.products, labels: [] }
    acc[pid].labels.push(label)
    return acc
  }, {} as Record<string, { product: any; labels: typeof labels }>) ?? {}

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Étiquettes multilingues</h1>
        <p className="text-sm text-gray-500 mt-1">Avertissements de sécurité générés en FR, EN, DE, IT, ES</p>
      </div>

      {Object.keys(byProduct).length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center space-y-3">
            <Tag className="h-16 w-16 text-gray-200 mx-auto" />
            <p className="text-lg font-medium text-gray-900">Aucune étiquette</p>
            <p className="text-sm text-gray-500">Les étiquettes sont générées automatiquement lors de la génération IA.</p>
            <Link href="/dashboard/products">
              <Button size="sm">Voir mes produits</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(byProduct).map(([productId, { product, labels: productLabels }]) => (
            <Card key={productId}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{product?.product_categories?.icon ?? "📦"}</span>
                  <div>
                    <p className="text-base font-semibold">{product?.name}</p>
                    <p className="text-xs text-gray-500 font-normal">
                      {product?.product_categories?.name_fr}
                      {product?.reference && ` · ${product.reference}`}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SUPPORTED_LANGUAGES.map(lang => {
                    const label = productLabels?.find(l => l.language === lang.code)
                    return (
                      <div key={lang.code} className={`rounded-xl border p-4 space-y-3 ${label ? "" : "opacity-40"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{lang.flag}</span>
                            <span className="font-medium text-sm">{lang.label}</span>
                          </div>
                          {label ? (
                            <Badge variant="success" className="text-xs">Généré</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">N/A</Badge>
                          )}
                        </div>

                        {label && (
                          <>
                            {(label.warnings ?? []).length > 0 && (
                              <div className="space-y-1">
                                {(label.warnings ?? []).slice(0, 3).map((w, i) => (
                                  <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                                    <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{w}</span>
                                  </div>
                                ))}
                                {(label.warnings ?? []).length > 3 && (
                                  <p className="text-xs text-gray-400">+ {(label.warnings ?? []).length - 3} autres</p>
                                )}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Link href={`/dashboard/products/${productId}`} className="flex-1">
                                <Button variant="ghost" size="sm" className="w-full gap-1">
                                  <Eye className="h-3 w-3" />Voir
                                </Button>
                              </Link>
                              <Link href={`/dashboard/products/${productId}/export`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full gap-1">
                                  <Download className="h-3 w-3" />PDF
                                </Button>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
