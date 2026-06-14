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

type Step = "connect" | "connected"

export default function ShopifyPage() {
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
      setError(data.error ?? "Erreur de connexion")
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
      setError(data.error ?? "Erreur de synchronisation")
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
          <h1 className="text-2xl font-bold text-gray-900">Connecter Shopify</h1>
          <p className="text-sm text-gray-500">Importez vos produits Shopify dans Conforva</p>
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
            {syncResult.imported} nouveau{syncResult.imported > 1 ? "x" : ""} produit{syncResult.imported > 1 ? "s" : ""} importé{syncResult.imported > 1 ? "s" : ""} sur {syncResult.total} au total.{" "}
            <Link href="/dashboard/products" className="underline font-medium">Voir mes produits</Link>
          </AlertDescription>
        </Alert>
      )}

      {step === "connected" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Boutique connectée
            </CardTitle>
            <CardDescription>
              <span className="font-mono text-blue-600">{connectedShop}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Cliquez sur Synchroniser pour importer tous vos produits Shopify dans Conforva. Les produits déjà importés ne seront pas dupliqués.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleSync} disabled={syncing} className="gap-2">
                {syncing ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Synchronisation...</>
                ) : (
                  <><Package className="h-4 w-4" /> Synchroniser les produits</>
                )}
              </Button>
              <Button variant="outline" onClick={() => { setStep("connect"); setConnectedShop(null); setSyncResult(null) }}>
                Changer de boutique
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
                Comment obtenir votre token Shopify
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-none h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
                  <span>Dans votre admin Shopify, allez dans <strong>Apps</strong> → <strong>Développer des apps</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-none h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">2</span>
                  <span>Cliquez sur <strong>Créer une app</strong>, donnez-lui le nom "Conforva"</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-none h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">3</span>
                  <span>Dans <strong>Configuration de l&apos;API Admin</strong>, cochez <strong>read_products</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-none h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">4</span>
                  <span>Cliquez <strong>Enregistrer</strong> puis <strong>Installer l&apos;app</strong>, puis <strong>Révéler le token</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-none h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">5</span>
                  <span>Copiez le token et collez-le ci-dessous</span>
                </li>
              </ol>
              <a
                href="https://admin.shopify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
              >
                Ouvrir Shopify Admin <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>

          {/* Connection form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Connecter votre boutique</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConnect} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="shop">Domaine de votre boutique</Label>
                  <Input
                    id="shop"
                    placeholder="ma-boutique.myshopify.com"
                    value={shopDomain}
                    onChange={e => setShopDomain(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-400">Trouvez-le dans Shopify Admin → Paramètres → Général</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="token">Token API Admin</Label>
                  <Input
                    id="token"
                    type="password"
                    placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={accessToken}
                    onChange={e => setAccessToken(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-400">Token confidentiel — stocké de façon sécurisée</p>
                </div>
                <Button type="submit" disabled={connecting} className="w-full gap-2">
                  {connecting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Connexion...</>
                  ) : (
                    <><Store className="h-4 w-4" /> Connecter ma boutique</>
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
