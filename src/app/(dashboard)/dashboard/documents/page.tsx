import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, ShieldCheck, Package } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function DocumentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const { data: files } = await supabase
    .from("technical_files")
    .select(`*, products(name, reference, product_categories(name_fr, icon))`)
    .in("product_id", (await supabase.from("products").select("id").eq("org_id", org.id)).data?.map(p => p.id) ?? [])
    .order("created_at", { ascending: false })

  const { data: riskAssessments } = await supabase
    .from("risk_assessments")
    .select(`*, products(name, reference, product_categories(name_fr, icon))`)
    .in("product_id", (await supabase.from("products").select("id").eq("org_id", org.id)).data?.map(p => p.id) ?? [])
    .order("created_at", { ascending: false })

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="text-sm text-gray-500 mt-1">Tous vos dossiers techniques et analyses de risque</p>
      </div>

      {/* Technical files */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Dossiers techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!files || files.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500">Aucun dossier technique généré.</p>
              <Link href="/dashboard/products/new" className="mt-3 inline-block">
                <Button size="sm">Créer un produit</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => {
                const product = file.products as any
                return (
                  <div key={file.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200">
                    <div className="text-2xl">{product?.product_categories?.icon ?? "📦"}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{product?.name ?? "Produit inconnu"}</p>
                      <p className="text-xs text-gray-500">
                        {product?.product_categories?.name_fr} · V{file.version} · {formatDate(file.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={file.watermarked ? "warning" : "success"}>
                        {file.watermarked ? "Non validé" : "Validé"}
                      </Badge>
                      <Link href={`/dashboard/products/${file.product_id}`}>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      </Link>
                      <Link href={`/dashboard/products/${file.product_id}/export`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />PDF
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Risk assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            Analyses de risque
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!riskAssessments || riskAssessments.length === 0 ? (
            <div className="text-center py-10">
              <ShieldCheck className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500">Aucune analyse de risque générée.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {riskAssessments.map((ra) => {
                const product = ra.products as any
                return (
                  <div key={ra.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
                    <div className="text-2xl">{product?.product_categories?.icon ?? "📦"}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{product?.name ?? "Produit inconnu"}</p>
                      <p className="text-xs text-gray-500">
                        V{ra.version} · {formatDate(ra.created_at)} · Modèle : {ra.ai_model ?? "IA"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        ra.severity === "high" || ra.severity === "critical" ? "destructive" :
                        ra.severity === "medium" ? "warning" : "success"
                      }>
                        {ra.severity ?? "—"}
                      </Badge>
                      <Badge variant={ra.validated_by_human ? "success" : "secondary"}>
                        {ra.validated_by_human ? "Validé" : "Non validé"}
                      </Badge>
                      <Link href={`/dashboard/products/${ra.product_id}`}>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
