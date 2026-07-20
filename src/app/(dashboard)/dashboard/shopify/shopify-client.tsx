"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Loader2, Package, ArrowLeft, ExternalLink, AlertTriangle, Store } from "lucide-react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: {
    title: "Connecter Shopify",
    subtitle: "Importez vos produits Shopify dans Conforva",
    connectionError: "Erreur de connexion",
    syncError: "Erreur de synchronisation",
    imported: (n: number, total: number) => `${n} nouveau${n > 1 ? "x" : ""} produit${n > 1 ? "s" : ""} importé${n > 1 ? "s" : ""} sur ${total} au total.`,
    seeProducts: "Voir mes produits",
    shopConnected: "Boutique connectée",
    syncDesc: "Cliquez sur Synchroniser pour importer tous vos produits Shopify dans Conforva. Les produits déjà importés ne seront pas dupliqués.",
    syncing: "Synchronisation...",
    syncProducts: "Synchroniser les produits",
    changeShop: "Changer de boutique",
    howToGetToken: "Comment obtenir votre token Shopify",
    steps: [
      <>Dans votre admin Shopify, allez dans <strong>Apps</strong> → <strong>Développer des apps</strong></>,
      <>Cliquez sur <strong>Créer une app</strong>, donnez-lui le nom &quot;Conforva&quot;</>,
      <>Dans <strong>Configuration de l&apos;API Admin</strong>, cochez <strong>read_products</strong></>,
      <>Cliquez <strong>Enregistrer</strong> puis <strong>Installer l&apos;app</strong>, puis <strong>Révéler le token</strong></>,
      <>Copiez le token et collez-le ci-dessous</>,
    ],
    openShopifyAdmin: "Ouvrir Shopify Admin",
    connectShop: "Connecter votre boutique",
    shopDomain: "Domaine de votre boutique",
    shopDomainHint: "Trouvez-le dans Shopify Admin → Paramètres → Général",
    apiToken: "Token API Admin",
    apiTokenHint: "Token confidentiel — stocké de façon sécurisée",
    connecting: "Connexion...",
    connectMyShop: "Connecter ma boutique",
  },
  en: {
    title: "Connect Shopify",
    subtitle: "Import your Shopify products into Conforva",
    connectionError: "Connection error",
    syncError: "Sync error",
    imported: (n: number, total: number) => `${n} new product${n > 1 ? "s" : ""} imported out of ${total} total.`,
    seeProducts: "See my products",
    shopConnected: "Store connected",
    syncDesc: "Click Sync to import all your Shopify products into Conforva. Already imported products won't be duplicated.",
    syncing: "Syncing...",
    syncProducts: "Sync products",
    changeShop: "Change store",
    howToGetToken: "How to get your Shopify token",
    steps: [
      <>In your Shopify admin, go to <strong>Apps</strong> → <strong>Develop apps</strong></>,
      <>Click <strong>Create an app</strong>, name it &quot;Conforva&quot;</>,
      <>In <strong>Admin API configuration</strong>, check <strong>read_products</strong></>,
      <>Click <strong>Save</strong> then <strong>Install app</strong>, then <strong>Reveal token</strong></>,
      <>Copy the token and paste it below</>,
    ],
    openShopifyAdmin: "Open Shopify Admin",
    connectShop: "Connect your store",
    shopDomain: "Your store domain",
    shopDomainHint: "Find it in Shopify Admin → Settings → General",
    apiToken: "Admin API token",
    apiTokenHint: "Confidential token — stored securely",
    connecting: "Connecting...",
    connectMyShop: "Connect my store",
  },
}

type Step = "connect" | "connected"

export default function ShopifyClient({ locale }: { locale: Locale }) {
  const t = DICT[locale]
  const [step, setStep] = useState<Step>("connect")
  const [shopDomain, setShopDomain] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [connecting, setConnecting] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState("")
  const [connectedShop, setConnectedShop] = useState<string | null>(null)
  const [syncResult, setSyncResult] = useState<{ total: number; imported: number } | null>(null)

  useEffect(() => {
    async function checkExisting() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      // Check if user already has a Shopify connection via user_id
      const res = await fetch("/api/shopify/connection")
      if (res.ok) {
        const data = await res.json()
        if (data.shop_domain) {
          setConnectedShop(data.shop_domain)
          setStep("connected")
        }
      }
    }
    checkExisting()
  }, [])

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    setConnecting(true)
    setError("")

    const res = await fetch("/api/shopify/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shop_domain: shopDomain, access_token: accessToken }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? t.connectionError)
    } else {
      setConnectedShop(data.shop_domain)
      setStep("connected")
    }
    setConnecting(false)
  }

  async function handleSync() {
    if (!connectedShop) return
    setSyncing(true)
    setError("")

    const res = await fetch("/api/shopify/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shop_domain: connectedShop }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? t.syncError)
    } else {
      setSyncResult(data)
    }
    setSyncing(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-sm text-gray-500">{t.subtitle}</p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {syncResult && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            {t.imported(syncResult.imported, syncResult.total)}{" "}
            <Link href="/dashboard/products" className="underline font-medium">{t.seeProducts}</Link>
          </AlertDescription>
        </Alert>
      )}

      {step === "connected" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              {t.shopConnected}
            </CardTitle>
            <CardDescription>
              <span className="font-mono text-blue-600">{connectedShop}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              {t.syncDesc}
            </p>
            <div className="flex gap-3">
              <Button onClick={handleSync} disabled={syncing} className="gap-2">
                {syncing ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> {t.syncing}</>
                ) : (
                  <><Package className="h-4 w-4" /> {t.syncProducts}</>
                )}
              </Button>
              <Button variant="outline" onClick={() => { setStep("connect"); setConnectedShop(null); setSyncResult(null) }}>
                {t.changeShop}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Store className="h-5 w-5 text-blue-600" />
                {t.howToGetToken}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm text-gray-700">
                {t.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-none h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <a
                href="https://admin.shopify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
              >
                {t.openShopifyAdmin} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>

          {/* Connection form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.connectShop}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConnect} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="shop">{t.shopDomain}</Label>
                  <Input
                    id="shop"
                    placeholder="ma-boutique.myshopify.com"
                    value={shopDomain}
                    onChange={e => setShopDomain(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-400">{t.shopDomainHint}</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="token">{t.apiToken}</Label>
                  <Input
                    id="token"
                    type="password"
                    placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={accessToken}
                    onChange={e => setAccessToken(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-400">{t.apiTokenHint}</p>
                </div>
                <Button type="submit" disabled={connecting} className="w-full gap-2">
                  {connecting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> {t.connecting}</>
                  ) : (
                    <><Store className="h-4 w-4" /> {t.connectMyShop}</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
