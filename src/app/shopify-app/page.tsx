"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Package, ArrowRight, Loader2, AlertTriangle, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type AuthState = "loading" | "authenticated" | "unauthenticated"

export default function ShopifyAppPage() {
  const params = useSearchParams()
  const shop = params.get("shop") ?? ""
  const [authState, setAuthState] = useState<AuthState>("loading")
  const [syncing, setSyncing] = useState(false)
  const [result, setResult] = useState<{ total: number; imported: number } | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => setAuthState(r.ok ? "authenticated" : "unauthenticated"))
      .catch(() => setAuthState("unauthenticated"))
  }, [])

  async function handleSync() {
    setSyncing(true)
    setError("")
    try {
      const res = await fetch("/api/shopify/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shop_domain: shop }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401) {
          setAuthState("unauthenticated")
        } else {
          setError(data.error ?? "Erreur lors de la synchronisation.")
        }
      } else {
        setResult(data)
      }
    } catch {
      setError("Erreur réseau. Réessayez.")
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-2xl">C</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Conforva</h1>
          <p className="text-sm text-gray-500 mt-1">Conformité GPSR automatisée</p>
        </div>

        {authState === "loading" ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : result ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Synchronisation réussie</p>
              <p className="text-sm text-gray-500 mt-1">
                {result.imported} nouveau{result.imported > 1 ? "x" : ""} produit{result.imported > 1 ? "s" : ""} importé{result.imported > 1 ? "s" : ""} sur {result.total} au total
              </p>
            </div>
            <Link href="/dashboard/products" target="_blank">
              <Button className="w-full gap-2">
                Gérer ma conformité GPSR <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : authState === "unauthenticated" ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <LogIn className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm">Connexion requise</p>
                <p className="text-sm text-amber-700 mt-0.5">Connectez-vous à Conforva pour synchroniser vos produits Shopify.</p>
              </div>
            </div>
            <div className="space-y-3">
              <Link href={`/auth/login?redirect=/shopify-app?shop=${encodeURIComponent(shop)}`} target="_blank">
                <Button className="w-full gap-2">
                  <LogIn className="h-4 w-4" /> Se connecter à Conforva
                </Button>
              </Link>
              <Link href="/auth/signup" target="_blank">
                <Button variant="outline" className="w-full text-sm">
                  Créer un compte gratuit
                </Button>
              </Link>
            </div>
            <p className="text-xs text-gray-400 text-center">Starter dès 29€/mois · Sans engagement</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <div>
              <p className="font-semibold text-gray-900">Boutique connectée</p>
              <p className="text-sm text-blue-600 font-mono mt-0.5">{shop || "—"}</p>
            </div>

            <div className="space-y-3">
              {[
                "Dossier technique par produit",
                "Analyse de risques IA",
                "Étiquettes conformes EU",
                "Personne responsable EU",
              ].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <p className="text-sm text-gray-700">{f}</p>
                </div>
              ))}
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button onClick={handleSync} disabled={syncing || !shop} className="w-full gap-2">
              {syncing ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Synchronisation...</>
              ) : (
                <><Package className="h-4 w-4" /> Importer mes produits Shopify</>
              )}
            </Button>
            <p className="text-xs text-gray-400 text-center">Starter dès 29€/mois · Sans engagement</p>
          </div>
        )}
      </div>
    </div>
  )
}
