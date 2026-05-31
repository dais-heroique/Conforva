"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner"
import { useToast } from "@/hooks/use-toast"
import {
  Loader2, AlertTriangle, CheckCircle2, ShieldCheck, FileText,
  Tag, ArrowLeft, RefreshCw, Download, Edit, Package, ExternalLink,
} from "lucide-react"
import type {
  ProductRow, CategoryRow, RiskAssessmentRow, TechnicalFileRow,
  LabelRow, ComplianceStatusRow, QuestionnaireResponseRow
} from "@/types/supabase"
import { getComplianceBg, getComplianceColor, SUPPORTED_LANGUAGES } from "@/lib/utils"

interface PageProps { params: Promise<{ id: string }> }

type FullProduct = ProductRow & {
  product_categories: CategoryRow | null
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [validating, setValidating] = useState(false)
  const [product, setProduct] = useState<FullProduct | null>(null)
  const [qr, setQr] = useState<QuestionnaireResponseRow | null>(null)
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentRow | null>(null)
  const [technicalFile, setTechnicalFile] = useState<TechnicalFileRow | null>(null)
  const [labels, setLabels] = useState<LabelRow[]>([])
  const [compliance, setCompliance] = useState<ComplianceStatusRow | null>(null)
  const [validationChecked, setValidationChecked] = useState(false)

  async function loadData() {
    const supabase = createClient()
    const [
      { data: prod },
      { data: qrData },
      { data: ra },
      { data: tf },
      { data: lbls },
      { data: cs },
    ] = await Promise.all([
      supabase.from("products").select("*, product_categories(*)").eq("id", id).single(),
      supabase.from("questionnaire_responses").select("*").eq("product_id", id).single(),
      supabase.from("risk_assessments").select("*").eq("product_id", id).order("version", { ascending: false }).limit(1).single(),
      supabase.from("technical_files").select("*").eq("product_id", id).order("version", { ascending: false }).limit(1).single(),
      supabase.from("labels").select("*").eq("product_id", id),
      supabase.from("compliance_status").select("*").eq("product_id", id).single(),
    ])
    if (!prod) { router.push("/dashboard/products"); return }
    setProduct(prod as unknown as FullProduct)
    setQr(qrData)
    setRiskAssessment(ra)
    setTechnicalFile(tf)
    setLabels(lbls ?? [])
    setCompliance(cs)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [id])

  async function handleGenerate() {
    setGenerating(true)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Erreur inconnue")
      toast({ title: "Analyse générée", description: "Le dossier technique a été créé avec succès.", variant: "success" as any })
      await loadData()
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" })
    } finally {
      setGenerating(false)
    }
  }

  async function handleValidate() {
    if (!validationChecked || !riskAssessment) return
    setValidating(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from("risk_assessments").update({
      validated_by_human: true,
      validated_by: user.id,
      validated_at: new Date().toISOString(),
      status: "validated",
    }).eq("id", riskAssessment.id)

    if (technicalFile) {
      await supabase.from("technical_files").update({
        status: "validated",
        watermarked: false,
      }).eq("id", technicalFile.id)
    }

    const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
    if (org) {
      await supabase.from("audit_log").insert({
        org_id: org.id,
        user_id: user.id,
        action: "validate_risk_assessment",
        entity_type: "risk_assessment",
        entity_id: riskAssessment.id,
        details: { product_id: id, validated_at: new Date().toISOString() },
      })
    }

    await supabase.rpc("update_compliance_score", { p_product_id: id })

    toast({ title: "Validé !", description: "Le dossier est maintenant validé et exportable sans watermark." })
    await loadData()
    setValidating(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  if (!product) return null

  const category = product.product_categories
  const score = compliance?.score ?? 0
  const analysisData = riskAssessment?.content_json as any

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <Package className="h-5 w-5 text-gray-500" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{product.name}</h1>
              <p className="text-sm text-gray-500">
                {category?.name_fr}{product.reference && ` · Réf: ${product.reference}`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="secondary" className={getComplianceBg(score)}>
            {score}%
          </Badge>
          <Link href={`/verify/${id}`} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-4 w-4" />Vérifier
            </Button>
          </Link>
          <Link href={`/dashboard/products/${id}/questionnaire`} className="hidden sm:block">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />Questionnaire
            </Button>
          </Link>
        </div>
      </div>

      {/* Compliance progress */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Score de conformité</span>
                <span className={`font-bold ${getComplianceColor(score)}`}>{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
            {compliance?.missing && compliance.missing.length > 0 && (
              <div className="text-xs text-gray-500">
                Manquants : {compliance.missing.map(m =>
                  ({ questionnaire: "Questionnaire", risk_assessment: "Analyse de risque", technical_file: "Dossier", labels: "Étiquettes" }[m] ?? m)
                ).join(", ")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <DisclaimerBanner />

      <Tabs defaultValue="analysis">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="analysis" className="gap-1.5 text-xs sm:text-sm">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Analyse de risque</span>
            <span className="sm:hidden">Analyse</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="gap-1.5 text-xs sm:text-sm">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Dossier technique</span>
            <span className="sm:hidden">Dossier</span>
          </TabsTrigger>
          <TabsTrigger value="labels" className="gap-1.5 text-xs sm:text-sm">
            <Tag className="h-3.5 w-3.5 shrink-0" />Étiquettes
          </TabsTrigger>
        </TabsList>

        {/* Analysis tab */}
        <TabsContent value="analysis" className="space-y-4">
          {!qr?.completed && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Questionnaire incomplet</AlertTitle>
              <AlertDescription>
                Complétez le questionnaire produit avant de générer l'analyse.{" "}
                <Link href={`/dashboard/products/${id}/questionnaire`} className="underline font-medium">
                  Remplir maintenant
                </Link>
              </AlertDescription>
            </Alert>
          )}

          {!riskAssessment ? (
            <Card>
              <CardContent className="py-12 text-center space-y-4">
                <ShieldCheck className="h-16 w-16 text-gray-200 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Aucune analyse générée</p>
                  <p className="text-sm text-gray-500 mt-1">
                    L'IA va analyser votre produit et générer une analyse de risque GPSR complète.
                  </p>
                </div>
                <Button onClick={handleGenerate} disabled={generating || !qr?.completed} className="gap-2">
                  {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  {generating ? "Génération en cours..." : "Générer l'analyse de risque"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Status & actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={riskAssessment.validated_by_human ? "success" : "warning"}>
                    {riskAssessment.validated_by_human ? "Validé" : "En attente de validation"}
                  </Badge>
                  <span className="text-sm text-gray-500">Version {riskAssessment.version}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={generating}
                    className="gap-1"
                  >
                    {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                    Regénérer
                  </Button>
                  <Link href={`/dashboard/products/${id}/export`}>
                    <Button size="sm" className="gap-1">
                      <Download className="h-3 w-3" />Exporter PDF
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Summary */}
              {analysisData?.summary && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Résumé exécutif</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{analysisData.summary}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Sévérité globale :</span>
                      <Badge variant={
                        analysisData.overall_severity === "critical" ? "destructive" :
                        analysisData.overall_severity === "high" ? "destructive" :
                        analysisData.overall_severity === "medium" ? "warning" : "success"
                      }>
                        {analysisData.overall_severity ?? riskAssessment.severity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Hazards */}
              {analysisData?.hazards && analysisData.hazards.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dangers identifiés ({analysisData.hazards.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysisData.hazards.map((h: any, i: number) => (
                      <div key={i} className="rounded-lg border border-gray-100 p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-mono text-gray-400 mr-2">{h.id}</span>
                            <span className="font-medium text-gray-900">{h.title}</span>
                          </div>
                          <Badge variant={
                            h.severity === "critical" || h.severity === "high" ? "destructive" :
                            h.severity === "medium" ? "warning" : "success"
                          }>
                            {h.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{h.description}</p>
                        {h.referenced_standards?.length > 0 && (
                          <p className="text-xs text-blue-600">{h.referenced_standards.join(", ")}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Mitigation */}
              {analysisData?.mitigation_measures && analysisData.mitigation_measures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Mesures de mitigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysisData.mitigation_measures.map((m: any, i: number) => (
                      <div key={i} className="flex gap-3 rounded-lg bg-green-50 border border-green-100 p-3">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-800">{m.measure}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{m.type} · {m.priority} · {m.norm_reference}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Human validation */}
              {!riskAssessment.validated_by_human && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-base text-amber-900">Validation humaine obligatoire</CardTitle>
                    <CardDescription className="text-amber-700">
                      Conformément au GPSR, vous devez valider ce dossier avant toute utilisation officielle.
                      Cette validation est horodatée et tracée dans le journal d'audit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={validationChecked}
                        onCheckedChange={(v) => setValidationChecked(v === true)}
                      />
                      <span className="text-sm text-amber-800">
                        Je certifie avoir lu et examiné cette analyse de risque. Je comprends qu'il s'agit d'une aide
                        à la conformité et non d'un avis juridique. Je valide ce dossier sous ma responsabilité
                        et m'engage à obtenir une validation supplémentaire d'un expert si nécessaire.
                      </span>
                    </label>
                    <Button
                      onClick={handleValidate}
                      disabled={!validationChecked || validating}
                      className="gap-2"
                    >
                      {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                      Valider le dossier
                    </Button>
                  </CardContent>
                </Card>
              )}

              {riskAssessment.validated_by_human && (
                <Alert variant="success">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Dossier validé</AlertTitle>
                  <AlertDescription>
                    Ce dossier a été validé le {riskAssessment.validated_at ? new Date(riskAssessment.validated_at).toLocaleDateString("fr-FR") : "date inconnue"}.
                    L'export PDF sera généré sans watermark.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </TabsContent>

        {/* Technical file tab */}
        <TabsContent value="technical" className="space-y-4">
          {!technicalFile ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Générez d'abord l'analyse de risque pour créer le dossier technique.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={technicalFile.watermarked ? "warning" : "success"}>
                  {technicalFile.watermarked ? "Non validé — watermark actif" : "Document validé"}
                </Badge>
                <Link href={`/dashboard/products/${id}/export`}>
                  <Button size="sm" className="gap-1">
                    <Download className="h-3 w-3" />Exporter PDF
                  </Button>
                </Link>
              </div>

              {(technicalFile.content_json as any)?.sections?.map((section: any, i: number) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base">{section.section}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{section.content}</p>
                  </CardContent>
                </Card>
              ))}

              {(technicalFile.content_json as any)?.analysis?.required_tests?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tests requis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(technicalFile.content_json as any).analysis.required_tests.map((t: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />{t}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Labels tab */}
        <TabsContent value="labels" className="space-y-4">
          {labels.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Tag className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Les étiquettes sont générées automatiquement avec l'analyse de risque.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {labels.map((label) => {
                const lang = SUPPORTED_LANGUAGES.find(l => l.code === label.language)
                return (
                  <Card key={label.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-xs font-mono bg-gray-100 rounded px-1.5 py-0.5">{lang?.short}</span>
                        {lang?.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {(label.warnings ?? []).length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Avertissements</p>
                          <ul className="space-y-1">
                            {(label.warnings ?? []).map((w, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />{w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {(label.pictograms ?? []).length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Pictogrammes</p>
                          <div className="flex flex-wrap gap-1">
                            {(label.pictograms ?? []).map((p, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
