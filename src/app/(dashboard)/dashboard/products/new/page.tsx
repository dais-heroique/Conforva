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
import { Loader2, Package, ArrowRight, ArrowLeft, Link2, Download, CheckCircle2, X } from "lucide-react"
import type { CategoryRow } from "@/types/supabase"
import { WORLD_MARKETS, WORLD_MARKET_REGIONS } from "@/lib/utils"

type ImporterType = "shopify" | "woocommerce" | null

interface ImportedData {
  name?: string
  description?: string
  reference?: string
  price?: string | null
  imageUrl?: string | null
  category_hint?: string | null
  materials_hint?: string | null
}

export default function NewProductPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<CategoryRow[]>([])

  // Importer state
  const [activeImporter, setActiveImporter] = useState<ImporterType>(null)
  const [importLoading, setImportLoading] = useState(false)
  const [importError, setImportError] = useState("")
  const [importSuccess, setImportSuccess] = useState(false)

  // Shopify importer fields
  const [shopifyUrl, setShopifyUrl] = useState("")

  // WooCommerce importer fields
  const [wooSiteUrl, setWooSiteUrl] = useState("")
  const [wooKey, setWooKey] = useState("")
  const [wooSecret, setWooSecret] = useState("")
  const [wooProductId, setWooProductId] = useState("")
  const [wooProducts, setWooProducts] = useState<ImportedData[]>([])
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
    createClient().from("product_categories").select("*").order("sort_order")
      .then(({ data }) => { if (data) setCategories(data) })
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

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nouveau produit</h1>
        <p className="text-sm text-gray-500 mt-1">Étape {step} sur 2</p>
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
              <Label htmlFor="product_url" className="flex items-center gap-1.5">
                <Link2 className="h-3.5 w-3.5" />
                URL de la page produit
                <span className="text-xs text-gray-400 font-normal ml-1">— l'IA ira lire la page pour enrichir l'analyse</span>
              </Label>
              <Input
                id="product_url"
                type="url"
                placeholder="https://votreboutique.com/produit/..."
                value={form.product_url}
                onChange={e => update("product_url", e.target.value)}
              />
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
              <Label className="mb-2 block">Marchés cibles</Label>
              <div className="space-y-3">
                {WORLD_MARKET_REGIONS.map(region => {
                  const regionLabels: Record<string, string> = { EU: 'Union Européenne', Europe: 'Europe (hors UE)', Americas: 'Amériques', 'Asia-Pacific': 'Asie-Pacifique', MEA: 'Moyen-Orient & Afrique' }
                  const countries = WORLD_MARKETS.filter(c => c.region === region)
                  return (
                    <div key={region}>
                      <p className="text-xs font-medium text-gray-500 mb-1.5">{regionLabels[region]}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {countries.map(country => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => toggleMarket(country.code)}
                            className={`rounded-full px-2.5 py-1 text-xs font-medium border transition-colors ${
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
                  )
                })}
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
