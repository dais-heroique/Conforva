"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowLeft, Download, FileText, Tag, Shield, AlertTriangle, ScrollText } from "lucide-react"
import { SUPPORTED_LANGUAGES, formatDate } from "@/lib/utils"
import type { ProductRow, CategoryRow, RiskAssessmentRow, TechnicalFileRow, LabelRow } from "@/types/supabase"
import { useT } from "@/components/providers/locale-provider"

interface PageProps { params: Promise<{ id: string }> }

export default function ExportPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const t = useT()
  const tExport = t.dashboard.export

  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState<string | null>(null)
  const [product, setProduct] = useState<ProductRow & { product_categories: CategoryRow | null } | null>(null)
  const [ra, setRa] = useState<RiskAssessmentRow | null>(null)
  const [tf, setTf] = useState<TechnicalFileRow | null>(null)
  const [labels, setLabels] = useState<LabelRow[]>([])
  const [userPlan, setUserPlan] = useState<string>("free")

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const [{ data: prod }, { data: raData }, { data: tfData }, { data: lbls }, { data: userData }] = await Promise.all([
        supabase.from("products").select("*, product_categories(*)").eq("id", id).single(),
        supabase.from("risk_assessments").select("*").eq("product_id", id).order("version", { ascending: false }).limit(1).single(),
        supabase.from("technical_files").select("*").eq("product_id", id).order("version", { ascending: false }).limit(1).single(),
        supabase.from("labels").select("*").eq("product_id", id),
        user ? supabase.from("users").select("plan").eq("id", user.id).single() : Promise.resolve({ data: null }),
      ])
      if (!prod) { router.push("/dashboard/products"); return }
      setProduct(prod as any)
      setRa(raData)
      setTf(tfData)
      setLabels(lbls ?? [])
      setUserPlan((userData as any)?.plan ?? "free")
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleExportPDF(type: "technical" | "label" | "declaration", lang?: string) {
    setGenerating(type + (lang ?? ""))
    try {
      const res = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, type, language: lang }),
      })
      if (!res.ok) throw new Error("Export failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `conforva-${type}-${product?.name?.replace(/\s+/g, "-").toLowerCase()}-${lang ?? ""}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert(tExport.exportError + String(err))
    } finally {
      setGenerating(null)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  const isValidated = ra?.validated_by_human && tf?.status === "validated"

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/dashboard/products/${id}`}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{tExport.title}</h1>
          <p className="text-sm text-gray-500">{product?.name}</p>
        </div>
      </div>

      {userPlan === "free" && (
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{tExport.freePlanWarning.title}</p>
            <p className="text-xs mt-0.5 text-amber-700">{tExport.freePlanWarning.desc}</p>
          </div>
        </div>
      )}

      {!isValidated && userPlan !== "free" && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{tExport.notValidatedWarning}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
        <Shield className="h-4 w-4 shrink-0" />
        <span>{tExport.disclaimer}</span>
      </div>

      {/* Technical file */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            {tExport.technicalFile.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!tf ? (
            <p className="text-sm text-gray-500">{tExport.technicalFile.noFile}</p>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Badge variant={tf.watermarked ? "warning" : "success"}>
                  {tf.watermarked ? tExport.technicalFile.notValidated : tExport.technicalFile.validated}
                </Badge>
                <span className="text-sm text-gray-500">Version {tf.version} · {formatDate(tf.created_at)}</span>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">{tExport.technicalFile.frTitle}</p>
                    <p className="text-xs text-gray-500">{tExport.technicalFile.frDesc}</p>
                  </div>
                  <Button size="sm" onClick={() => handleExportPDF("technical", "fr")} disabled={generating !== null} className="gap-1">
                    {generating === "technicalfr" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                    PDF FR
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">{tExport.technicalFile.enTitle}</p>
                    <p className="text-xs text-gray-500">{tExport.technicalFile.enDesc}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleExportPDF("technical", "en")} disabled={generating !== null} className="gap-1">
                    {generating === "technicalen" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                    PDF EN
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Declaration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-blue-600" />
            {tExport.declaration.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!tf ? (
            <p className="text-sm text-gray-500">{tExport.declaration.noFile}</p>
          ) : (
            <>
              <p className="text-sm text-gray-600">{tExport.declaration.desc}</p>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium text-sm">{tExport.declaration.title2}</p>
                  <p className="text-xs text-gray-500">{tExport.declaration.art24}</p>
                </div>
                <Button size="sm" onClick={() => handleExportPDF("declaration")} disabled={generating !== null} className="gap-1">
                  {generating === "declaration" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                  PDF
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Labels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-blue-600" />
            {tExport.labels.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {labels.length === 0 ? (
            <p className="text-sm text-gray-500">{tExport.labels.noLabels}</p>
          ) : (
            <div className="grid gap-3">
              {SUPPORTED_LANGUAGES.map(lang => {
                const label = labels.find(l => l.language === lang.code)
                return (
                  <div key={lang.code} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-gray-100 rounded px-1.5 py-0.5 text-gray-600">{lang.code.toUpperCase()}</span>
                      <div>
                        <p className="font-medium text-sm">{lang.label}</p>
                        <p className="text-xs text-gray-500">
                          {label ? tExport.labels.warnings.replace("{{count}}", String((label.warnings ?? []).length)) : tExport.labels.notGenerated}
                        </p>
                      </div>
                    </div>
                    {label && (
                      <Button size="sm" variant="outline" onClick={() => handleExportPDF("label", lang.code)} disabled={generating !== null} className="gap-1">
                        {generating === `label${lang.code}` ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                        PDF
                      </Button>
                    )}
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
