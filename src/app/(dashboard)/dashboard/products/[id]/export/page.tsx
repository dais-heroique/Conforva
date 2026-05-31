"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowLeft, Download, FileText, Tag, Shield, AlertTriangle } from "lucide-react"
import { SUPPORTED_LANGUAGES, formatDate } from "@/lib/utils"
import type { ProductRow, CategoryRow, RiskAssessmentRow, TechnicalFileRow, LabelRow } from "@/types/supabase"

interface PageProps { params: Promise<{ id: string }> }

export default function ExportPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState<string | null>(null)
  const [product, setProduct] = useState<ProductRow & { product_categories: CategoryRow | null } | null>(null)
  const [ra, setRa] = useState<RiskAssessmentRow | null>(null)
  const [tf, setTf] = useState<TechnicalFileRow | null>(null)
  const [labels, setLabels] = useState<LabelRow[]>([])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [{ data: prod }, { data: raData }, { data: tfData }, { data: lbls }] = await Promise.all([
        supabase.from("products").select("*, product_categories(*)").eq("id", id).single(),
        supabase.from("risk_assessments").select("*").eq("product_id", id).order("version", { ascending: false }).limit(1).single(),
        supabase.from("technical_files").select("*").eq("product_id", id).order("version", { ascending: false }).limit(1).single(),
        supabase.from("labels").select("*").eq("product_id", id),
      ])
      if (!prod) { router.push("/dashboard/products"); return }
      setProduct(prod as any)
      setRa(raData)
      setTf(tfData)
      setLabels(lbls ?? [])
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleExportPDF(type: "technical" | "label", lang?: string) {
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
      alert("Erreur lors de l'export : " + String(err))
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
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/dashboard/products/${id}`}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exporter les documents</h1>
          <p className="text-sm text-gray-500">{product?.name}</p>
        </div>
      </div>

      {!isValidated && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Ce produit n'est pas encore validé. Les PDFs exportés porteront un <strong>watermark "PROJET — non validé"</strong>.
            Validez le dossier dans l'onglet Analyse de risque pour supprimer le watermark.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
        <Shield className="h-4 w-4 shrink-0" />
        <span>Ces documents sont générés à titre d'aide. Ils ne constituent pas un avis juridique et ne garantissent pas la conformité de votre produit.</span>
      </div>

      {/* Technical file */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Dossier technique GPSR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!tf ? (
            <p className="text-sm text-gray-500">Aucun dossier technique généré. Générez d'abord l'analyse de risque.</p>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Badge variant={tf.watermarked ? "warning" : "success"}>
                  {tf.watermarked ? "Non validé (watermark)" : "Validé"}
                </Badge>
                <span className="text-sm text-gray-500">Version {tf.version} · {formatDate(tf.created_at)}</span>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">Dossier technique complet (FR)</p>
                    <p className="text-xs text-gray-500">Analyse de risque + dossier + mentions légales</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleExportPDF("technical", "fr")}
                    disabled={generating !== null}
                    className="gap-1"
                  >
                    {generating === "technicalfr" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                    PDF FR
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">Technical file (EN)</p>
                    <p className="text-xs text-gray-500">Risk assessment + technical dossier (English)</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleExportPDF("technical", "en")}
                    disabled={generating !== null}
                    className="gap-1"
                  >
                    {generating === "technicalen" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                    PDF EN
                  </Button>
                </div>
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
            Étiquettes multilingues
          </CardTitle>
        </CardHeader>
        <CardContent>
          {labels.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune étiquette générée.</p>
          ) : (
            <div className="grid gap-3">
              {SUPPORTED_LANGUAGES.map(lang => {
                const label = labels.find(l => l.language === lang.code)
                return (
                  <div key={lang.code} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <div>
                        <p className="font-medium text-sm">{lang.label}</p>
                        <p className="text-xs text-gray-500">
                          {label ? `${(label.warnings ?? []).length} avertissements` : "Non généré"}
                        </p>
                      </div>
                    </div>
                    {label && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExportPDF("label", lang.code)}
                        disabled={generating !== null}
                        className="gap-1"
                      >
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
