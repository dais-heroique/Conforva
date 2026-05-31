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
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import type { QuestionnaireField, ProductRow, CategoryRow } from "@/types/supabase"

interface PageProps { params: Promise<{ id: string }> }

export default function QuestionnairePage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [product, setProduct] = useState<ProductRow | null>(null)
  const [category, setCategory] = useState<CategoryRow | null>(null)
  const [fields, setFields] = useState<QuestionnaireField[]>([])
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [existingResponseId, setExistingResponseId] = useState<string | null>(null)

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
        if (tpl) setFields(tpl.fields_json as QuestionnaireField[])
      }

      const { data: existing } = await supabase
        .from("questionnaire_responses")
        .select("id, answers")
        .eq("product_id", id)
        .single()
      if (existing) {
        setExistingResponseId(existing.id)
        setAnswers(existing.answers as Record<string, unknown>)
      }

      setLoading(false)
    }
    load()
  }, [id, router])

  const steps = [...new Set(fields.map(f => f.step))].sort()
  const currentFields = fields.filter(f => f.step === currentStep)
  const maxStep = Math.max(...steps, 1)

  function setAnswer(key: string, value: unknown) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function toggleMulti(key: string, option: string) {
    const current = (answers[key] as string[]) ?? []
    setAnswer(key, current.includes(option) ? current.filter(v => v !== option) : [...current, option])
  }

  async function saveAndNext() {
    setSaving(true)
    setError("")
    const supabase = createClient()
    const isLastStep = currentStep === maxStep

    if (existingResponseId) {
      await supabase.from("questionnaire_responses")
        .update({ answers: answers as any, completed: isLastStep })
        .eq("id", existingResponseId)
    } else {
      const { data } = await supabase.from("questionnaire_responses")
        .insert({ product_id: id, answers: answers as any, completed: isLastStep })
        .select("id").single()
      if (data) setExistingResponseId(data.id)
    }

    if (isLastStep) {
      router.push(`/dashboard/products/${id}`)
    } else {
      setCurrentStep(s => s + 1)
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-full py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Questionnaire produit</h1>
        <p className="text-sm text-gray-500 mt-1">
          {category?.icon} {category?.name_fr} — {product?.name}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Étape {currentStep} sur {maxStep}</span>
          <span>{Math.round((currentStep / maxStep) * 100)}%</span>
        </div>
        <Progress value={(currentStep / maxStep) * 100} />
        <div className="flex gap-2">
          {steps.map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s < currentStep ? "bg-blue-600" : s === currentStep ? "bg-blue-400" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

      <Card>
        <CardHeader>
          <CardTitle>Étape {currentStep}</CardTitle>
          {category && (
            <CardDescription>
              Normes applicables : {category.applicable_standards?.join(", ")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {currentFields.length === 0 && (
            <p className="text-gray-500 text-sm">Aucun champ pour cette catégorie. Cliquez sur Continuer.</p>
          )}
          {currentFields.map(field => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>
                {field.label_fr}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>

              {field.type === "text" && (
                <Input
                  id={field.key}
                  value={(answers[field.key] as string) ?? ""}
                  onChange={e => setAnswer(field.key, e.target.value)}
                  placeholder={field.label_fr}
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  id={field.key}
                  value={(answers[field.key] as string) ?? ""}
                  onChange={e => setAnswer(field.key, e.target.value)}
                  placeholder={field.label_fr}
                  rows={3}
                />
              )}

              {field.type === "number" && (
                <Input
                  id={field.key}
                  type="number"
                  value={(answers[field.key] as string) ?? ""}
                  onChange={e => setAnswer(field.key, e.target.value)}
                />
              )}

              {field.type === "boolean" && (
                <div className="flex items-center gap-3">
                  {["true", "false"].map(v => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={field.key}
                        value={v}
                        checked={String(answers[field.key]) === v}
                        onChange={() => setAnswer(field.key, v === "true")}
                        className="accent-blue-600"
                      />
                      <span className="text-sm">{v === "true" ? "Oui" : "Non"}</span>
                    </label>
                  ))}
                </div>
              )}

              {field.type === "select" && field.options && (
                <Select
                  value={(answers[field.key] as string) ?? ""}
                  onValueChange={v => setAnswer(field.key, v)}
                >
                  <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
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
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleMulti(field.key, opt)}
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="flex-1 gap-2">
                <ArrowLeft className="h-4 w-4" />Retour
              </Button>
            )}
            <Button onClick={saveAndNext} disabled={saving} className="flex-1 gap-2">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                currentStep === maxStep
                  ? <><CheckCircle2 className="h-4 w-4" />Terminer</>
                  : <>Continuer <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
