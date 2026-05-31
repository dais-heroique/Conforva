"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, Save, CheckCircle2, Info } from "lucide-react"
import { EU_COUNTRIES } from "@/lib/utils"
import type { ResponsiblePersonRow } from "@/types/supabase"

export default function ResponsiblePersonPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [rp, setRp] = useState<ResponsiblePersonRow | null>(null)
  const [orgId, setOrgId] = useState("")
  const [form, setForm] = useState({
    type: "manufacturer" as const,
    company_name: "",
    address_line: "",
    city: "",
    postal_code: "",
    country_eu: "FR",
    email: "",
    phone: "",
  })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
      if (!org) return
      setOrgId(org.id)

      const { data: existing } = await supabase
        .from("responsible_persons")
        .select("*")
        .eq("org_id", org.id)
        .single()

      if (existing) {
        setRp(existing)
        setForm({
          type: existing.type as any,
          company_name: existing.company_name,
          address_line: existing.address_line,
          city: existing.city,
          postal_code: existing.postal_code,
          country_eu: existing.country_eu,
          email: existing.email,
          phone: existing.phone ?? "",
        })
      }
      setLoading(false)
    }
    load()
  }, [])

  function update(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    setError("")
    const supabase = createClient()

    const data = { ...form, org_id: orgId, status: "active" as const }

    if (rp) {
      const { error } = await supabase.from("responsible_persons").update(data).eq("id", rp.id)
      if (error) { setError(error.message); setSaving(false); return }
    } else {
      const { data: newRp, error } = await supabase.from("responsible_persons").insert(data).select().single()
      if (error) { setError(error.message); setSaving(false); return }
      setRp(newRp)
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    setSaving(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Personne Responsable UE</h1>
        <p className="text-sm text-gray-500 mt-1">
          Obligatoire pour tous les produits mis sur le marché européen (GPSR Art. 4)
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-800">
        <Info className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
        <div>
          <p className="font-medium">Qu'est-ce que la Personne Responsable ?</p>
          <p className="mt-1">
            Le GPSR exige qu'un fabricant, importateur ou représentant autorisé établi dans l'UE soit
            désigné pour chaque produit mis sur le marché. Cette personne est responsable des obligations
            de conformité et de la communication avec les autorités.
          </p>
        </div>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {saved && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Informations sauvegardées avec succès.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Coordonnées de la personne responsable
            </CardTitle>
            {rp && (
              <Badge variant={rp.status === "active" ? "success" : "warning"}>
                {rp.status === "active" ? "Active" : "Inactive"}
              </Badge>
            )}
          </div>
          <CardDescription>
            Ces informations apparaîtront sur tous vos dossiers techniques et étiquettes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Type de responsable *</Label>
            <Select value={form.type} onValueChange={v => update("type", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturer">Fabricant (établi dans l'UE)</SelectItem>
                <SelectItem value="importer">Importateur UE</SelectItem>
                <SelectItem value="authorized_rep">Représentant autorisé UE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name">Nom de la société *</Label>
            <Input id="company_name" value={form.company_name} onChange={e => update("company_name", e.target.value)} placeholder="Ma Société SAS" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_line">Adresse *</Label>
            <Input id="address_line" value={form.address_line} onChange={e => update("address_line", e.target.value)} placeholder="123 Rue de la République" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postal_code">Code postal *</Label>
              <Input id="postal_code" value={form.postal_code} onChange={e => update("postal_code", e.target.value)} placeholder="75001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville *</Label>
              <Input id="city" value={form.city} onChange={e => update("city", e.target.value)} placeholder="Paris" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pays (UE) *</Label>
            <Select value={form.country_eu} onValueChange={v => update("country_eu", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {EU_COUNTRIES.map(c => (
                  <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email de contact *</Label>
              <Input id="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="contact@masociete.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+33 1 23 45 67 89" />
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving || !form.company_name || !form.address_line || !form.email} className="w-full gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Sauvegarder
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
