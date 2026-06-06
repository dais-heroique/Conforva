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
import { Loader2, Shield, Save, CheckCircle2, Info, Plus, Pencil, Trash2, X } from "lucide-react"
import { EU_COUNTRIES } from "@/lib/utils"
import type { ResponsiblePersonRow } from "@/types/supabase"
import { useT } from "@/components/providers/locale-provider"

const TYPE_LABELS: Record<string, string> = {
  manufacturer: "Fabricant",
  importer: "Importateur",
  authorized_rep: "Représentant autorisé",
}

const EMPTY_FORM = {
  type: "manufacturer" as const,
  company_name: "",
  address_line: "",
  city: "",
  postal_code: "",
  country_eu: "FR",
  email: "",
  phone: "",
}

export default function ResponsiblePersonPage() {
  const t = useT()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)
  const [rps, setRps] = useState<ResponsiblePersonRow[]>([])
  const [orgId, setOrgId] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

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
        .order("created_at")

      if (existing) setRps(existing)
      setLoading(false)
    }
    load()
  }, [])

  function update(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function startAdd() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
    setError("")
  }

  function startEdit(rp: ResponsiblePersonRow) {
    setEditingId(rp.id)
    setForm({
      type: rp.type as any,
      company_name: rp.company_name,
      address_line: rp.address_line,
      city: rp.city,
      postal_code: rp.postal_code,
      country_eu: rp.country_eu,
      email: rp.email,
      phone: rp.phone ?? "",
    })
    setShowForm(true)
    setError("")
  }

  function cancelForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
    setError("")
  }

  async function handleSave() {
    setSaving(true)
    setError("")
    const supabase = createClient()
    const data = { ...form, org_id: orgId, status: "active" as const }

    if (editingId) {
      const { error: err } = await supabase.from("responsible_persons").update(data).eq("id", editingId)
      if (err) { setError(err.message); setSaving(false); return }
      setRps(prev => prev.map(r => r.id === editingId ? { ...r, ...data } as ResponsiblePersonRow : r))
    } else {
      const { data: newRp, error: err } = await supabase.from("responsible_persons").insert(data).select().single()
      if (err) { setError(err.message); setSaving(false); return }
      setRps(prev => [...prev, newRp])
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    setSaving(false)
    cancelForm()
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette personne responsable ?")) return
    setDeleting(id)
    const supabase = createClient()
    const { error: err } = await supabase.from("responsible_persons").delete().eq("id", id)
    if (err) { setError(err.message); setDeleting(null); return }
    setRps(prev => prev.filter(r => r.id !== id))
    setDeleting(null)
  }

  const tRp = t.dashboard.responsiblePerson

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{tRp.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{tRp.subtitle}</p>
        </div>
        {!showForm && (
          <Button onClick={startAdd} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-800">
        <Info className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
        <div>
          <p className="font-medium">{tRp.infoTitle}</p>
          <p className="mt-1">{tRp.infoDesc}</p>
        </div>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {saved && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{tRp.savedSuccess}</AlertDescription>
        </Alert>
      )}

      {/* List of existing RPs */}
      {rps.length > 0 && (
        <div className="space-y-3">
          {rps.map(rp => (
            <Card key={rp.id} className="border-gray-200">
              <CardContent className="py-4 px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900 truncate">{rp.company_name}</p>
                        <Badge variant={rp.status === "active" ? "success" : "warning"} className="text-xs shrink-0">
                          {rp.status === "active" ? tRp.statusActive : tRp.statusInactive}
                        </Badge>
                        <span className="text-xs text-gray-400 bg-gray-100 rounded px-1.5 py-0.5 shrink-0">
                          {TYPE_LABELS[rp.type] ?? rp.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {rp.address_line}, {rp.postal_code} {rp.city} — {rp.country_eu}
                      </p>
                      <p className="text-sm text-gray-400">{rp.email}{rp.phone ? ` · ${rp.phone}` : ""}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(rp)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(rp.id)}
                      disabled={deleting === rp.id}
                    >
                      {deleting === rp.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />
                      }
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {rps.length === 0 && !showForm && (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-12 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mx-auto">
            <Shield className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-700">Aucune personne responsable configurée</p>
            <p className="text-sm text-gray-400 mt-1">Ajoutez-en une pour compléter vos dossiers techniques.</p>
          </div>
          <Button onClick={startAdd} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter une personne responsable
          </Button>
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                {editingId ? "Modifier la personne responsable" : tRp.cardTitle}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={cancelForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>{tRp.cardDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>{tRp.type}</Label>
              <Select value={form.type} onValueChange={v => update("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturer">{tRp.types.manufacturer}</SelectItem>
                  <SelectItem value="importer">{tRp.types.importer}</SelectItem>
                  <SelectItem value="authorized_rep">{tRp.types.authorized_rep}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">{tRp.companyName}</Label>
              <Input id="company_name" value={form.company_name} onChange={e => update("company_name", e.target.value)} placeholder={tRp.companyNamePlaceholder} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line">{tRp.addressLine}</Label>
              <Input id="address_line" value={form.address_line} onChange={e => update("address_line", e.target.value)} placeholder={tRp.addressLinePlaceholder} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal_code">{tRp.postalCode}</Label>
                <Input id="postal_code" value={form.postal_code} onChange={e => update("postal_code", e.target.value)} placeholder={tRp.postalCodePlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">{tRp.city}</Label>
                <Input id="city" value={form.city} onChange={e => update("city", e.target.value)} placeholder={tRp.cityPlaceholder} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{tRp.country}</Label>
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
                <Label htmlFor="email">{tRp.email}</Label>
                <Input id="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder={tRp.emailPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{tRp.phone}</Label>
                <Input id="phone" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder={tRp.phonePlaceholder} />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={cancelForm} className="flex-1">
                Annuler
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !form.company_name || !form.address_line || !form.email}
                className="flex-1 gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {tRp.save}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
