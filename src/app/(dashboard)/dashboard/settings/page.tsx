"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, CheckCircle2, Building2, Globe, Shield } from "lucide-react"
import { EU_COUNTRIES, SUPPORTED_LANGUAGES } from "@/lib/utils"
import type { OrgRow, UserRow } from "@/types/supabase"
import Link from "next/link"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState<UserRow | null>(null)
  const [org, setOrg] = useState<OrgRow | null>(null)
  const [orgForm, setOrgForm] = useState({ name: "", country: "FR", vat_number: "", website: "" })
  const [userForm, setUserForm] = useState({ locale: "fr" })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) return

      const [{ data: u }, { data: o }] = await Promise.all([
        supabase.from("users").select("*").eq("id", authUser.id).single(),
        supabase.from("organizations").select("*").eq("owner_id", authUser.id).single(),
      ])

      if (u) { setUser(u); setUserForm({ locale: u.locale }) }
      if (o) {
        setOrg(o)
        setOrgForm({ name: o.name, country: o.country, vat_number: o.vat_number ?? "", website: o.website ?? "" })
      }
      setLoading(false)
    }
    load()
  }, [])

  async function saveOrg() {
    if (!org) return
    setSaving(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.from("organizations").update({
      name: orgForm.name,
      country: orgForm.country,
      vat_number: orgForm.vat_number || null,
      website: orgForm.website || null,
    }).eq("id", org.id)
    if (error) { setError(error.message) } else { setSaved("org") }
    setSaving(false)
    setTimeout(() => setSaved(""), 3000)
  }

  async function saveUser() {
    if (!user) return
    setSaving(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.from("users").update({ locale: userForm.locale }).eq("id", user.id)
    if (error) { setError(error.message) } else { setSaved("user") }
    setSaving(false)
    setTimeout(() => setSaved(""), 3000)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez votre organisation et vos préférences</p>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

      {/* Organization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Organisation
          </CardTitle>
          <CardDescription>Informations de votre boutique / entreprise</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {saved === "org" && (
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Organisation sauvegardée.</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label>Nom de l'organisation</Label>
            <Input value={orgForm.name} onChange={e => setOrgForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Pays</Label>
            <Select value={orgForm.country} onValueChange={v => setOrgForm(f => ({ ...f, country: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {EU_COUNTRIES.map(c => <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Numéro TVA</Label>
              <Input value={orgForm.vat_number} onChange={e => setOrgForm(f => ({ ...f, vat_number: e.target.value }))} placeholder="FR12345678901" />
            </div>
            <div className="space-y-2">
              <Label>Site web</Label>
              <Input value={orgForm.website} onChange={e => setOrgForm(f => ({ ...f, website: e.target.value }))} placeholder="https://maboutique.com" />
            </div>
          </div>
          <Button onClick={saveOrg} disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />Sauvegarder
          </Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Préférences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {saved === "user" && (
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Préférences sauvegardées.</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label>Langue de l'interface</Label>
            <Select value={userForm.locale} onValueChange={v => setUserForm(f => ({ ...f, locale: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map(l => (
                  <SelectItem key={l.code} value={l.code}>{l.flag} {l.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Email du compte</Label>
            <Input value={user?.email ?? ""} disabled className="bg-gray-50" />
            <p className="text-xs text-gray-400">L'email ne peut pas être modifié ici.</p>
          </div>
          <Button onClick={saveUser} disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />Sauvegarder
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Conformité & CGU
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            Conforva est un outil d'aide à la conformité GPSR (UE 2023/988). Les documents générés ne constituent
            pas un avis juridique et ne garantissent pas la conformité réglementaire de vos produits.
          </p>
          <div className="flex gap-3">
            <Link href="/cgu">
              <Button variant="outline" size="sm">CGU</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="outline" size="sm">Politique de confidentialité</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
