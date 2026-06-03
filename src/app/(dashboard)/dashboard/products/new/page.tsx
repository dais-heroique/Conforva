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

  // Plan limit state
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [limitReached, setLimitReached] = useState(false)
  const [userPlan, setUserPlan] = useState<Plan>("free")
  const [productCount, setProductCount] = useState(0)


  const [form, setForm] = useState({
    name: "",
    reference: "",
    category_id: "",
    product_url: "",
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

  function applyImport(data: ImportedData) {
    if (data.name) update("name", data.name)
    if (data.description) update("intended_use", data.description)
    if (data.reference) update("reference", data.reference)
    if (data.materials_hint) update("materials", data.materials_hint)
    setImportSuccess(true)
  }

  function toggleImporter(type: ImporterType) {
    if (activeImporter === type) {
      setActiveImporter(null)
    } else {
      setActiveImporter(type)
    }
    setImportError("")
    setImportSuccess(false)
    setWooProducts([])
  }

  async function handleShopifyImport() {
    if (!shopifyUrl.trim()) return
    setImportLoading(true)
    setImportError("")
    setImportSuccess(false)
    try {
      const res = await fetch("/api/integrations/shopify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopifyUrl: shopifyUrl.trim() }),
      })
      const json = await res.json()
      if (!res.ok) {
        setImportError(json.error ?? "Erreur lors de l'import Shopify.")
        return
      }
      applyImport(json)
    } catch {
      setImportError("Impossible de contacter l'API d'import. Vérifiez votre connexion.")
    } finally {
      setImportLoading(false)
    }
  }

  async function handleWooImport() {
    if (!wooSiteUrl.trim() || !wooKey.trim() || !wooSecret.trim()) return
    setImportLoading(true)
    setImportError("")
    setImportSuccess(false)
    setWooProducts([])
    try {
      const res = await fetch("/api/integrations/woocommerce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteUrl: wooSiteUrl.trim(),
          consumerKey: wooKey.trim(),
          consumerSecret: wooSecret.trim(),
          productId: wooProductId ? parseInt(wooProductId, 10) : undefined,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setImportError(json.error ?? "Erreur lors de l'import WooCommerce.")
        return
      }
      if (json.product) {
        // Single product — apply directly
        applyImport(json.product)
      } else if (json.products?.length > 0) {
        // List — let user pick
        setWooProducts(json.products)
      } else {
        setImportError("Aucun produit trouvé.")
      }
    } catch {
      setImportError("Impossible de contacter l'API d'import. Vérifiez votre connexion.")
    } finally {
      setImportLoading(false)
    }
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
    }).select().single()

    if (err) { setError(err.message); setLoading(false); return }

    router.push(`/dashboard/products/${product.id}/questionnaire`)
  }

  const selectedCategory = categories.find(c => c.id === form.category_id)
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

      {/* Importer */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Download className="h-4 w-4 text-gray-400" />
            Importer depuis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={activeImporter === "shopify" ? "default" : "outline"}
              onClick={() => toggleImporter("shopify")}
              className="gap-1.5"
            >
              Shopify
              {activeImporter === "shopify" && <X className="h-3.5 w-3.5" />}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={activeImporter === "woocommerce" ? "default" : "outline"}
              onClick={() => toggleImporter("woocommerce")}
              className="gap-1.5"
            >
              WooCommerce
              {activeImporter === "woocommerce" && <X className="h-3.5 w-3.5" />}
            </Button>
          </div>

          {/* Shopify inline form */}
          {activeImporter === "shopify" && (
            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="shopify-url" className="text-xs">URL du produit Shopify</Label>
                <Input
                  id="shopify-url"
                  placeholder="https://store.myshopify.com/products/handle"
                  value={shopifyUrl}
                  onChange={e => { setShopifyUrl(e.target.value); setImportError(""); setImportSuccess(false) }}
                  disabled={importLoading}
                />
              </div>
              <Button
                type="button"
                size="sm"
                onClick={handleShopifyImport}
                disabled={importLoading || !shopifyUrl.trim()}
                className="gap-2"
              >
                {importLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                Importer
              </Button>
            </div>
          )}

          {/* WooCommerce inline form */}
          {activeImporter === "woocommerce" && (
            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="woo-site" className="text-xs">URL du site WooCommerce</Label>
                <Input
                  id="woo-site"
                  placeholder="https://monsite.com"
                  value={wooSiteUrl}
                  onChange={e => { setWooSiteUrl(e.target.value); setImportError(""); setImportSuccess(false) }}
                  disabled={importLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label htmlFor="woo-key" className="text-xs">Consumer Key</Label>
                  <Input
                    id="woo-key"
                    placeholder="ck_xxxxxxxxxxxx"
                    value={wooKey}
                    onChange={e => { setWooKey(e.target.value); setImportError("") }}
                    disabled={importLoading}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="woo-secret" className="text-xs">Consumer Secret</Label>
                  <Input
                    id="woo-secret"
                    type="password"
                    placeholder="cs_xxxxxxxxxxxx"
                    value={wooSecret}
                    onChange={e => { setWooSecret(e.target.value); setImportError("") }}
                    disabled={importLoading}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="woo-product-id" className="text-xs">ID produit <span className="text-gray-400 font-normal">(optionnel — laissez vide pour lister les 20 premiers)</span></Label>
                <Input
                  id="woo-product-id"
                  type="number"
                  placeholder="ex: 42"
                  value={wooProductId}
                  onChange={e => { setWooProductId(e.target.value); setImportError(""); setWooProducts([]) }}
                  disabled={importLoading}
                />
              </div>
              <Button
                type="button"
                size="sm"
                onClick={handleWooImport}
                disabled={importLoading || !wooSiteUrl.trim() || !wooKey.trim() || !wooSecret.trim()}
                className="gap-2"
              >
                {importLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                Importer
              </Button>

              {/* Product list picker when no productId was specified */}
              {wooProducts.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-500">Sélectionnez un produit à importer :</p>
                  <div className="max-h-48 overflow-y-auto rounded-md border border-gray-200 divide-y divide-gray-100">
                    {wooProducts.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { applyImport(p); setWooProducts([]) }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800">{p.name || "—"}</span>
                        {p.reference && <span className="ml-2 text-xs text-gray-400">#{p.reference}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          {importError && (
            <Alert variant="destructive" className="py-2">
              <AlertDescription className="text-xs">{importError}</AlertDescription>
            </Alert>
          )}
          {importSuccess && (
            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              Données importées — vérifiez et complétez les champs ci-dessous.
            </div>
          )}
        </CardContent>
      </Card>

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
              <Select value={form.category_id} onValueChange={v => update("category_id", v)}>
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
              {selectedCategory && (
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-sm space-y-1">
                  <p className="font-medium text-blue-900">{selectedCategory.name_fr}</p>
                  <p className="text-blue-700">{selectedCategory.description}</p>
                  <p className="text-xs text-blue-600">
                    {tNp.step1.standards} : {selectedCategory.applicable_standards?.join(", ")}
                  </p>
                </div>
              )}
            </div>
            <Button
              className="w-full gap-2"
              onClick={() => setStep(2)}
              disabled={!form.name || !form.category_id}
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
