"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Building2, Globe, ShoppingBag, ChevronRight } from "lucide-react"
import { EU_COUNTRIES } from "@/lib/utils"

const SELLING_PLATFORMS = [
  "Shopify", "WooCommerce", "Prestashop", "Amazon", "Etsy",
  "eBay", "Site propre", "Marketplace", "Autre"
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    orgName: "",
    country: "FR",
    locale: "fr",
    sector: "",
    platform: "",
    vatNumber: "",
  })

  function update(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/auth/login"); return }

    // Update user locale
    await supabase.from("users").update({ locale: form.locale }).eq("id", user.id)

    // Create organization
    const { error: orgError } = await supabase.from("organizations").insert({
      owner_id: user.id,
      name: form.orgName,
      country: form.country,
      sector: form.platform,
      vat_number: form.vatNumber || null,
    })

    if (orgError) {
      setError(orgError.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold text-2xl mb-4">C</div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenue sur Conforva</h1>
          <p className="text-gray-500 mt-1">Configurons votre espace en 2 étapes</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {[1, 2].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-blue-600" : "bg-gray-200"}`} />
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-blue-600" />Votre organisation</CardTitle>
              <CardDescription>Informations sur votre boutique / entreprise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
              <div className="space-y-2">
                <Label htmlFor="orgName">Nom de votre boutique / entreprise *</Label>
                <Input
                  id="orgName"
                  placeholder="Ma Boutique SARL"
                  value={form.orgName}
                  onChange={e => update("orgName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Pays de votre entreprise *</Label>
                <Select value={form.country} onValueChange={v => update("country", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {EU_COUNTRIES.map(c => (
                      <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vatNumber">Numéro TVA intracommunautaire (optionnel)</Label>
                <Input
                  id="vatNumber"
                  placeholder="FR12345678901"
                  value={form.vatNumber}
                  onChange={e => update("vatNumber", e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!form.orgName || !form.country}
              >
                Continuer <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-blue-600" />Votre activité e-commerce</CardTitle>
              <CardDescription>Votre plateforme de vente et préférences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
              <div className="space-y-2">
                <Label>Plateforme de vente principale</Label>
                <Select value={form.platform} onValueChange={v => update("platform", v)}>
                  <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                  <SelectContent>
                    {SELLING_PLATFORMS.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label><Globe className="inline h-4 w-4 mr-1" />Langue de l'interface</Label>
                <Select value={form.locale} onValueChange={v => update("locale", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Retour</Button>
                <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accéder au dashboard"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
