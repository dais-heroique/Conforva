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
import { Loader2, Package, ArrowRight, ArrowLeft, Lock, Zap } from "lucide-react"
import Link from "next/link"
import type { CategoryRow } from "@/types/supabase"
import { PLAN_LIMITS, type Plan } from "@/types/supabase"
import { EU_COUNTRIES } from "@/lib/utils"

const PLAN_LABELS: Record<Plan, string> = {
  free: "Gratuit",
  starter: "Starter",
  growth: "Growth",
  pro: "Pro",
  enterprise: "Enterprise",
}

export default function NewProductPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<CategoryRow[]>([])

  // Plan limit state
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [limitReached, setLimitReached] = useState(false)
  const [userPlan, setUserPlan] = useState<Plan>("free")
  const [productCount, setProductCount] = useState(0)

  const [form, setForm] = useState({
    name: "",
    reference: "",
    category_id: "",
    intended_use: "",
    weight_g: "",
    length_mm: "",
    width_mm: "",
    height_mm: "",
    target_markets: ["FR"] as string[],
    materials: "",
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

        const { count } = await supabase
          .from("products")
          .select("id", { count: "exact", head: true })
          .eq("org_id", org.id)

        const current = count ?? 0
        setProductCount(current)

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

    const { data: product, error: err } = await supabase.from("products").insert({
      org_id: org.id,
      name: form.name,
      reference: form.reference || null,
      category_id: form.category_id || null,
      intended_use: form.intended_use || null,
      weight_g: form.weight_g ? parseFloat(form.weight_g) : null,
      dimensions: form.length_mm ? {
        length_mm: parseFloat(form.length_mm),
        width_mm: parseFloat(form.width_mm),
        height_mm: parseFloat(form.height_mm),
      } : null,
      target_markets: form.target_markets,
      materials: form.materials ? form.materials.split(",").map(m => m.trim()).filter(Boolean) : [],
    }).select().single()

    if (err) { setError(err.message); setLoading(false); return }

    router.push(`/dashboard/products/${product.id}/questionnaire`)
  }

  const selectedCategory = categories.find(c => c.id === form.category_id)

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
          <h1 className="text-2xl font-bold text-gray-900">Nouveau produit</h1>
        </div>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="py-10 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 mx-auto">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="space-y-1.5">
              <p className="text-lg font-semibold text-gray-900">Limite atteinte</p>
              <p className="text-sm text-gray-600">
                Votre plan <strong>{PLAN_LABELS[userPlan]}</strong> inclut {limit === 1 ? "1 produit" : `${limit} produits`}.
                Vous avez déjà {productCount} produit{productCount > 1 ? "s" : ""}.
              </p>
              <p className="text-sm text-gray-500">
                Passez au plan <strong>{nextPlan}</strong> pour ajouter davantage de produits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/dashboard/billing">
                <Button className="gap-2">
                  <Zap className="h-4 w-4" />
                  Passer au plan supérieur
                </Button>
              </Link>
              <Link href="/dashboard/products">
                <Button variant="outline">Voir mes produits</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nouveau produit</h1>
        <p className="text-sm text-gray-500 mt-1">Étape {step} sur 2</p>
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
              Informations générales
            </CardTitle>
            <CardDescription>Identifiez votre produit et sélectionnez sa catégorie GPSR.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input id="name" placeholder="ex: Bougie parfumée Vanille 200g" value={form.name} onChange={e => update("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Référence / SKU</Label>
              <Input id="reference" placeholder="ex: BOU-VANI-200" value={form.reference} onChange={e => update("reference", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Catégorie de produit *</Label>
              <Select value={form.category_id} onValueChange={v => update("category_id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name_fr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCategory && (
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-sm space-y-1">
                  <p className="font-medium text-blue-900">{selectedCategory.icon} {selectedCategory.name_fr}</p>
                  <p className="text-blue-700">{selectedCategory.description}</p>
                  <p className="text-xs text-blue-600">
                    Normes : {selectedCategory.applicable_standards?.join(", ")}
                  </p>
                </div>
              )}
            </div>
            <Button
              className="w-full gap-2"
              onClick={() => setStep(2)}
              disabled={!form.name || !form.category_id}
            >
              Continuer <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Caractéristiques physiques</CardTitle>
            <CardDescription>Ces informations enrichissent l'analyse de risque.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="intended_use">Usage prévu</Label>
              <Textarea id="intended_use" placeholder="ex: Bougie décorative pour usage intérieur en espace adulte" value={form.intended_use} onChange={e => update("intended_use", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="materials">Matériaux principaux (séparés par des virgules)</Label>
              <Input id="materials" placeholder="ex: cire de soja, mèche coton, verre" value={form.materials} onChange={e => update("materials", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight_g">Poids (g)</Label>
                <Input id="weight_g" type="number" placeholder="200" value={form.weight_g} onChange={e => update("weight_g", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length_mm">Longueur (mm)</Label>
                <Input id="length_mm" type="number" placeholder="80" value={form.length_mm} onChange={e => update("length_mm", e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Marchés cibles UE</Label>
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
                <ArrowLeft className="h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="flex-1 gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Créer et remplir le questionnaire <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
