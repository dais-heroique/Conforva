"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Package, ArrowRight, ArrowLeft, Lock, Zap, Shield } from "lucide-react"
import Link from "next/link"
import type { CategoryRow, ResponsiblePersonRow } from "@/types/supabase"
import { PLAN_LIMITS, type Plan } from "@/types/supabase"
import { EU_COUNTRIES } from "@/lib/utils"
import { useT } from "@/components/providers/locale-provider"

const PLAN_LABELS: Record<Plan, string> = {
  free: "Gratuit",
  starter: "Starter",
  growth: "Growth",
  pro: "Pro",
  enterprise: "Enterprise",
}

export default function NewProductPage() {
  const t = useT()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [responsiblePersons, setResponsiblePersons] = useState<ResponsiblePersonRow[]>([])

  // Plan limit state
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [limitReached, setLimitReached] = useState(false)
  const [userPlan, setUserPlan] = useState<Plan>("free")
  const [productCount, setProductCount] = useState(0)

  const [form, setForm] = useState({
    name: "",
    reference: "",
    category_id: "",
    category_description: "",
    product_url: "",
    intended_use: "",
    weight_g: "",
    length_mm: "",
    width_mm: "",
    height_mm: "",
    target_markets: ["FR"] as string[],
    materials: "",
    responsible_person_id: "",
  })

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: userData }, { data: org }, { data: cats }] = await Promise.all([
        supabase.from("users").select("plan").eq("id", user.id).single() as any,
        supabase.from("organizations").select("id").eq("owner_id", user.id).single() as any,
        supabase.from("product_categories").select("*").order("sort_order"),
      ])

      if (cats) setCategories(cats)

      if (userData && org) {
        const plan = (userData.plan ?? "free") as Plan
        setUserPlan(plan)

        const [{ count }, { data: rps }] = await Promise.all([
          supabase.from("products").select("id", { count: "exact", head: true }).eq("org_id", org.id),
          supabase.from("responsible_persons").select("*").eq("org_id", org.id).eq("status", "active"),
        ])

        const current = count ?? 0
        setProductCount(current)
        if (rps) setResponsiblePersons(rps)

        if (current >= PLAN_LIMITS[plan]) {
          setLimitReached(true)
        }
      }

      setCheckingAccess(false)
    }
    init()
  }, [])

  function update(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function toggleMarket(code: string) {
    setForm(f => ({
      ...f,
      target_markets: f.target_markets.includes(code)
        ? f.target_markets.filter(m => m !== code)
        : [...f.target_markets, code],
    }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
    if (!org) return

    const selectedCat = categories.find(c => c.id === form.category_id)
    const isOther = selectedCat?.code === "other"

    const { data: product, error: err } = await supabase.from("products").insert({
      org_id: org.id,
      name: form.name,
      reference: form.reference || null,
      category_id: form.category_id || null,
      product_url: form.product_url || null,
      intended_use: form.intended_use || null,
      weight_g: form.weight_g ? parseFloat(form.weight_g) : null,
      dimensions: form.length_mm ? {
        length_mm: parseFloat(form.length_mm),
        width_mm: parseFloat(form.width_mm),
        height_mm: parseFloat(form.height_mm),
      } : null,
      target_markets: form.target_markets,
      materials: form.materials ? form.materials.split(",").map(m => m.trim()).filter(Boolean) : [],
      responsible_person_id: form.responsible_person_id || null,
      metadata_json: isOther && form.category_description
        ? { category_description: form.category_description }
        : null,
    }).select().single()

    if (err) { setError(err.message); setLoading(false); return }

    router.push(`/dashboard/products/${product.id}/questionnaire`)
  }

  const selectedCategory = categories.find(c => c.id === form.category_id)
  const isOtherCategory = selectedCategory?.code === "other"
  const tNp = t.dashboard.newProduct

  if (checkingAccess) {
    return (
      <div className="p-8 max-w-2xl mx-auto flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (limitReached) {
    const limit = PLAN_LIMITS[userPlan]
    const nextPlan = userPlan === "free" ? "Starter" : userPlan === "starter" ? "Growth" : "Pro"
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{tNp.title}</h1>
        </div>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="py-10 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 mx-auto">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="space-y-1.5">
              <p className="text-lg font-semibold text-gray-900">{tNp.limitReached.title}</p>
              <p
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: tNp.limitReached.desc
                    .replace('{{plan}}', PLAN_LABELS[userPlan])
                    .replace('{{limit}}', limit === 1 ? '1 produit' : `${limit} produits`)
                    .replace('{{count}}', String(productCount)),
                }}
              />
              <p
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: tNp.limitReached.nextPlan.replace('{{plan}}', nextPlan),
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/dashboard/billing">
                <Button className="gap-2">
                  <Zap className="h-4 w-4" />
                  {tNp.limitReached.upgrade}
                </Button>
              </Link>
              <Link href="/dashboard/products">
                <Button variant="outline">{tNp.limitReached.viewProducts}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{tNp.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{tNp.stepOf.replace('{{step}}', String(step))}</p>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {[1, 2].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-blue-600" : "bg-gray-200"}`} />
        ))}
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              {tNp.step1.title}
            </CardTitle>
            <CardDescription>{tNp.step1.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">{tNp.step1.productName}</Label>
              <Input id="name" placeholder={tNp.step1.productNamePlaceholder} value={form.name} onChange={e => update("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">{tNp.step1.reference}</Label>
              <Input id="reference" placeholder={tNp.step1.referencePlaceholder} value={form.reference} onChange={e => update("reference", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{tNp.step1.category}</Label>
              <Select value={form.category_id} onValueChange={v => { update("category_id", v); update("category_description", "") }}>
                <SelectTrigger>
                  <SelectValue placeholder={tNp.step1.categoryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name_fr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCategory && !isOtherCategory && (
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-sm space-y-1">
                  <p className="font-medium text-blue-900">{selectedCategory.name_fr}</p>
                  <p className="text-blue-700">{selectedCategory.description}</p>
                  <p className="text-xs text-blue-600">
                    {tNp.step1.standards} : {selectedCategory.applicable_standards?.join(", ")}
                  </p>
                </div>
              )}
              {isOtherCategory && (
                <div className="space-y-2">
                  <Label htmlFor="category_description" className="text-sm font-medium">
                    Décrivez votre produit <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="category_description"
                    placeholder="Ex : Lampe de bureau LED rechargeable, plastique ABS, usage intérieur adultes..."
                    value={form.category_description}
                    onChange={e => update("category_description", e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-400">
                    Cette description aide l'IA à identifier les normes et risques applicables à votre produit.
                  </p>
                </div>
              )}
            </div>

            {responsiblePersons.length > 0 && (
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-600" />
                  Personne Responsable UE
                  <span className="text-xs text-gray-400 font-normal">(optionnel)</span>
                </Label>
                <Select value={form.responsible_person_id} onValueChange={v => update("responsible_person_id", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une personne responsable..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Aucune</SelectItem>
                    {responsiblePersons.map(rp => (
                      <SelectItem key={rp.id} value={rp.id}>
                        {rp.company_name} — {rp.city}, {rp.country_eu}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400">
                  Requis pour les importateurs hors UE (GPSR Art. 16).{" "}
                  <Link href="/dashboard/responsible-person" className="underline hover:text-gray-600">Gérer mes personnes responsables →</Link>
                </p>
              </div>
            )}

            {responsiblePersons.length === 0 && (
              <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <p className="font-medium">Personne Responsable UE non configurée</p>
                <p className="text-xs mt-0.5">
                  Si vous importez depuis hors UE, vous devez désigner une Personne Responsable (GPSR Art. 16).{" "}
                  <Link href="/dashboard/responsible-person" className="underline hover:text-amber-900">Configurer maintenant →</Link>
                </p>
              </div>
            )}

            <Button
              className="w-full gap-2"
              onClick={() => setStep(2)}
              disabled={!form.name || !form.category_id || (isOtherCategory && !form.category_description)}
            >
              {tNp.step1.continue} <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>{tNp.step2.title}</CardTitle>
            <CardDescription>{tNp.step2.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="intended_use">{tNp.step2.intendedUse}</Label>
              <Textarea id="intended_use" placeholder={tNp.step2.intendedUsePlaceholder} value={form.intended_use} onChange={e => update("intended_use", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="materials">{tNp.step2.materials}</Label>
              <Input id="materials" placeholder={tNp.step2.materialsPlaceholder} value={form.materials} onChange={e => update("materials", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight_g">{tNp.step2.weight}</Label>
                <Input id="weight_g" type="number" placeholder="200" value={form.weight_g} onChange={e => update("weight_g", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length_mm">{tNp.step2.length}</Label>
                <Input id="length_mm" type="number" placeholder="80" value={form.length_mm} onChange={e => update("length_mm", e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">{tNp.step2.targetMarkets}</Label>
              <div className="flex flex-wrap gap-2">
                {EU_COUNTRIES.slice(0, 12).map(country => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => toggleMarket(country.code)}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                      form.target_markets.includes(country.code)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {country.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 gap-2">
                <ArrowLeft className="h-4 w-4" /> {tNp.step2.back}
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="flex-1 gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{tNp.step2.submit} <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
