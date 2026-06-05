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
import { Loader2, Save, CheckCircle2, Building2, Globe, Shield, CreditCard, Zap } from "lucide-react"
import { EU_COUNTRIES, SUPPORTED_LANGUAGES, getPlanLabel } from "@/lib/utils"
import type { OrgRow, UserRow } from "@/types/supabase"
import type { Plan } from "@/types/supabase"
import Link from "next/link"
import { useT } from "@/components/providers/locale-provider"

export default function SettingsPage() {
  const t = useT()
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
        supabase.from("users").select("id, email, plan, locale, created_at, stripe_customer_id, stripe_subscription_id, subscription_status, subscription_period_end, updated_at").eq("id", authUser.id).single(),
        supabase.from("organizations").select("id, name, owner_id, country, vat_number, website, sector, created_at, updated_at").eq("owner_id", authUser.id).single(),
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

  const tSettings = t.dashboard.settings

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{tSettings.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{tSettings.subtitle}</p>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

      {/* Organization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            {tSettings.org.title}
          </CardTitle>
          <CardDescription>{tSettings.org.desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {saved === "org" && (
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{tSettings.org.saved}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label>{tSettings.org.name}</Label>
            <Input value={orgForm.name} onChange={e => setOrgForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>{tSettings.org.country}</Label>
            <Select value={orgForm.country} onValueChange={v => setOrgForm(f => ({ ...f, country: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {EU_COUNTRIES.map(c => <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{tSettings.org.vatNumber}</Label>
              <Input value={orgForm.vat_number} onChange={e => setOrgForm(f => ({ ...f, vat_number: e.target.value }))} placeholder="FR12345678901" />
            </div>
            <div className="space-y-2">
              <Label>{tSettings.org.website}</Label>
              <Input value={orgForm.website} onChange={e => setOrgForm(f => ({ ...f, website: e.target.value }))} placeholder={tSettings.org.websitePlaceholder} />
            </div>
          </div>
          <Button onClick={saveOrg} disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />{tSettings.org.save}
          </Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            {tSettings.preferences.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {saved === "user" && (
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{tSettings.preferences.saved}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label>{tSettings.preferences.language}</Label>
            <Select value={userForm.locale} onValueChange={v => setUserForm(f => ({ ...f, locale: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map(l => (
                  <SelectItem key={l.code} value={l.code}>{l.code.toUpperCase()} — {l.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>{tSettings.preferences.email}</Label>
            <Input value={user?.email ?? ""} disabled className="bg-gray-50" />
            <p className="text-xs text-gray-400">{tSettings.preferences.emailNote}</p>
          </div>
          <Button onClick={saveUser} disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />{tSettings.preferences.save}
          </Button>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            {tSettings.subscription.billingCardTitle}
          </CardTitle>
          <CardDescription>{tSettings.subscription.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-blue-900">{tSettings.subscription.planLabel.replace("{{name}}", getPlanLabel((user?.plan ?? "free") as Plan))}</p>
              <p className="text-xs text-blue-600 mt-0.5">
                {user?.subscription_status === "active" ? tSettings.subscription.active : tSettings.subscription.free}
              </p>
            </div>
            {user?.stripe_subscription_id && (
              <form action="/api/billing/portal" method="POST">
                <Button type="submit" size="sm" variant="outline" className="shrink-0">
                  {tSettings.subscription.manage}
                </Button>
              </form>
            )}
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/billing">
              <Button variant="outline" size="sm">{tSettings.subscription.upgrade}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Legal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            {tSettings.compliance.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">{tSettings.compliance.desc}</p>
          <div className="flex gap-3">
            <Link href="/cgu">
              <Button variant="outline" size="sm">{tSettings.compliance.cgu}</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="outline" size="sm">{tSettings.compliance.privacy}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
