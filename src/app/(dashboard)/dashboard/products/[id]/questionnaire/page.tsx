"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2, Plus, Trash2, Package2 } from "lucide-react"
import type { QuestionnaireField, ProductRow, CategoryRow } from "@/types/supabase"
import { useT } from "@/components/providers/locale-provider"

interface PageProps { params: Promise<{ id: string }> }

interface BomRow {
  component: string
  material: string
  supplier: string
  part_number: string
}

const EMPTY_BOM_ROW: BomRow = { component: "", material: "", supplier: "", part_number: "" }
const BOM_STEP = 0

export default function QuestionnairePage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const t = useT()
  const tQ = t.dashboard.questionnaire

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [product, setProduct] = useState<ProductRow | null>(null)
  const [category, setCategory] = useState<CategoryRow | null>(null)
  const [fields, setFields] = useState<QuestionnaireField[]>([])
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [currentStep, setCurrentStep] = useState<number>(BOM_STEP)
  const [existingResponseId, setExistingResponseId] = useState<string | null>(null)
  const [bomRows, setBomRows] = useState<BomRow[]>([{ ...EMPTY_BOM_ROW }])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: prod } = await supabase
        .from("products")
        .select("*, product_categories(*)")
        .eq("id", id)
        .single()
      if (!prod) { router.push("/dashboard/products"); return }
      setProduct(prod)
      const cat = (prod as any).product_categories as CategoryRow
      setCategory(cat)

      if (cat) {
        const { data: tpl } = await supabase
          .from("questionnaire_templates")
          .select("fields_json")
          .eq("category_id", cat.id)
          .order("version", { ascending: false })
          .limit(1)
          .single()
        if (tpl) setFields(tpl.fields_json as unknown as QuestionnaireField[])
      }

      const { data: existing } = await supabase
        .from("questionnaire_responses")
        .select("id, answers")
        .eq("product_id", id)
        .single()
      if (existing) {
        setExistingResponseId(existing.id)
        const ans = existing.answers as Record<string, unknown>
        setAnswers(ans)
        const savedBom = (ans as any)?.bom_components
        if (savedBom && Array.isArray(savedBom) && savedBom.length > 0) {
          setBomRows(savedBom)
        }
      }

      setLoading(false)
    }
    load()
  }, [id, router])

  const steps = [...new Set(fields.map(f => f.step))].sort()
  const allSteps = [BOM_STEP, ...steps]
  const maxStep = steps.length > 0 ? Math.max(...steps) : 1
  const totalSteps = allSteps.length
  const currentStepIndex = allSteps.indexOf(currentStep)
  const progressPct = ((currentStepIndex + 1) / totalSteps) * 100
  const currentFields = fields.filter(f => f.step === currentStep)
  const isLastStep = currentStep === maxStep || (steps.length === 0 && currentStep === BOM_STEP)

  function setAnswer(key: string, value: unknown) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function toggleMulti(key: string, option: string) {
    const current = (answers[key] as string[]) ?? []
    setAnswer(key, current.includes(option) ? current.filter(v => v !== option) : [...current, option])
  }

  function updateBomRow(index: number, field: keyof BomRow, value: string) {
    setBomRows(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row))
  }

  function addBomRow() {
    setBomRows(prev => [...prev, { ...EMPTY_BOM_ROW }])
  }

  function removeBomRow(index: number) {
    if (bomRows.length <= 1) return
    setBomRows(prev => prev.filter((_, i) => i !== index))
  }

  async function saveAndNext() {
    setSaving(true)
    setError("")
    const supabase = createClient()

    const filteredBom = bomRows.filter(r => r.component.trim() !== "")
    const toSave = { ...answers, bom_components: filteredBom }

    const isLast = isLastStep
    if (existingResponseId) {
      await supabase.from("questionnaire_responses")
        .update({ answers: toSave as any, completed: isLast })
        .eq("id", existingResponseId)
    } else {
      const { data } = await supabase.from("questionnaire_responses")
        .insert({ product_id: id, answers: toSave as any, completed: isLast })
        .select("id").single()
      if (data) setExistingResponseId(data.id)
    }

    if (isLast) {
      router.push(`/dashboard/products/${id}`)
    } else {
      const nextIdx = currentStepIndex + 1
      setCurrentStep(allSteps[nextIdx])
    }
    setSaving(false)
  }

  function goBack() {
    const prevIdx = currentStepIndex - 1
    if (prevIdx >= 0) setCurrentStep(allSteps[prevIdx])
  }

  if (loading) return (
    <div className="flex items-center justify-center h-full py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{tQ.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {category?.name_fr} — {product?.name}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{tQ.step.replace("{{step}}", String(currentStepIndex + 1)).replace("{{total}}", String(totalSteps))}</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <Progress value={progressPct} />
        <div className="flex gap-2">
          {allSteps.map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full ${
              allSteps.indexOf(s) < currentStepIndex ? "bg-blue-600"
              : allSteps.indexOf(s) === currentStepIndex ? "bg-blue-400"
              : "bg-gray-200"
            }`} />
          ))}
        </div>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

      {/* BOM Step */}
      {currentStep === BOM_STEP && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5 text-blue-600" />
              {tQ.bom.title}
            </CardTitle>
            <CardDescription>{tQ.bom.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="hidden sm:grid grid-cols-[2fr_2fr_2fr_2fr_auto] gap-2 text-xs font-medium text-gray-500 px-1">
              <span>{tQ.bom.colComponent}</span>
              <span>{tQ.bom.colMaterial}</span>
              <span>{tQ.bom.colSupplier}</span>
              <span>{tQ.bom.colPartNumber}</span>
              <span />
            </div>

            {bomRows.map((row, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_2fr_2fr_auto] gap-2 items-start p-3 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-gray-100">
                <div className="space-y-1">
                  <Label className="sm:hidden text-xs text-gray-500">{tQ.bom.colComponent}</Label>
                  <Input value={row.component} onChange={e => updateBomRow(i, "component", e.target.value)} placeholder={tQ.bom.componentPlaceholder} className="h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="sm:hidden text-xs text-gray-500">{tQ.bom.colMaterial}</Label>
                  <Input value={row.material} onChange={e => updateBomRow(i, "material", e.target.value)} placeholder={tQ.bom.materialPlaceholder} className="h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="sm:hidden text-xs text-gray-500">{tQ.bom.colSupplier}</Label>
                  <Input value={row.supplier} onChange={e => updateBomRow(i, "supplier", e.target.value)} placeholder={tQ.bom.supplierPlaceholder} className="h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="sm:hidden text-xs text-gray-500">{tQ.bom.colPartNumber}</Label>
                  <Input value={row.part_number} onChange={e => updateBomRow(i, "part_number", e.target.value)} placeholder={tQ.bom.partNumberPlaceholder} className="h-9" />
                </div>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0 self-end" onClick={() => removeBomRow(i)} disabled={bomRows.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" size="sm" onClick={addBomRow} className="gap-2 text-gray-600">
              <Plus className="h-4 w-4" />{tQ.bom.addRow}
            </Button>

            <div className="flex gap-3 pt-2">
              <Button onClick={saveAndNext} disabled={saving} className="flex-1 gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  isLastStep
                    ? <><CheckCircle2 className="h-4 w-4" />{tQ.finishBtn}</>
                    : <>{tQ.continueBtn} <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Template-driven steps */}
      {currentStep !== BOM_STEP && (
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 ? tQ.step1Title : tQ.stepGeneric.replace("{{step}}", String(currentStep))}
            </CardTitle>
            {category && (
              <CardDescription>
                {tQ.normsApplicable} {category.applicable_standards?.join(", ")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {currentFields.length === 0 && (
              <p className="text-gray-500 text-sm">{tQ.noFields}</p>
            )}
            {currentFields.map(field => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>
                  {field.label_fr}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>

                {field.type === "text" && (
                  <Input id={field.key} value={(answers[field.key] as string) ?? ""} onChange={e => setAnswer(field.key, e.target.value)} placeholder={field.label_fr} />
                )}
                {field.type === "textarea" && (
                  <Textarea id={field.key} value={(answers[field.key] as string) ?? ""} onChange={e => setAnswer(field.key, e.target.value)} placeholder={field.label_fr} rows={3} />
                )}
                {field.type === "number" && (
                  <Input id={field.key} type="number" value={(answers[field.key] as string) ?? ""} onChange={e => setAnswer(field.key, e.target.value)} />
                )}
                {field.type === "boolean" && (
                  <div className="flex items-center gap-3">
                    {["true", "false"].map(v => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={field.key} value={v} checked={String(answers[field.key]) === v} onChange={() => setAnswer(field.key, v === "true")} className="accent-blue-600" />
                        <span className="text-sm">{v === "true" ? tQ.yesNo.yes : tQ.yesNo.no}</span>
                      </label>
                    ))}
                  </div>
                )}
                {field.type === "select" && field.options && (
                  <Select value={(answers[field.key] as string) ?? ""} onValueChange={v => setAnswer(field.key, v)}>
                    <SelectTrigger><SelectValue placeholder={tQ.selectPlaceholder} /></SelectTrigger>
                    <SelectContent>
                      {field.options.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {field.type === "multiselect" && field.options && (
                  <div className="grid grid-cols-2 gap-2">
                    {field.options.map(opt => {
                      const selected = ((answers[field.key] as string[]) ?? []).includes(opt)
                      return (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox checked={selected} onCheckedChange={() => toggleMulti(field.key, opt)} />
                          <span className="text-sm">{opt}</span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={goBack} className="flex-1 gap-2">
                <ArrowLeft className="h-4 w-4" />{tQ.backBtn}
              </Button>
              <Button onClick={saveAndNext} disabled={saving} className="flex-1 gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  isLastStep
                    ? <><CheckCircle2 className="h-4 w-4" />{tQ.finishBtn}</>
                    : <>{tQ.continueBtn} <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
