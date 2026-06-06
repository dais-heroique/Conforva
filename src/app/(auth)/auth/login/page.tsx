"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useT } from "@/components/providers/locale-provider"

export default function LoginPage() {
  const t = useT()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError(t.auth.login.genericError ?? "Une erreur est survenue. Réessayez.")
    }
    setLoading(false)
  }

  const tLogin = t.auth.login

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm space-y-6">

        <div className="text-center">
          <Link href="/">
            <img src="/favicon.png" alt="Conforva" className="h-12 w-12 object-contain rounded-2xl mx-auto mb-4" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Conforva</h1>
          <p className="text-gray-500 text-sm mt-1">{tLogin.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">

          {sent ? (
            <div className="text-center py-2 space-y-4">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{tLogin.successTitle}</p>
                <p
                  className="text-sm text-gray-500 mt-1"
                  dangerouslySetInnerHTML={{
                    __html: tLogin.successDesc.replace('{{email}}', `<strong>${email}</strong>`),
                  }}
                />
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setSent(false)}>
                {tLogin.changeEmail}
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleMagicLink} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm">{tLogin.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={tLogin.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    className="h-11"
                  />
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading
                    ? <><Loader2 className="h-4 w-4 animate-spin" />{tLogin.sending}</>
                    : <><Mail className="h-4 w-4" />{tLogin.submitButton}</>
                  }
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 leading-relaxed">
          {tLogin.termsText}{" "}
          <Link href="/cgu" className="underline hover:text-gray-600">{tLogin.termsLink}</Link>{" "}
          {tLogin.andText}{" "}
          <Link href="/privacy" className="underline hover:text-gray-600">{tLogin.privacyLink}</Link>.
        </p>

      </div>
    </div>
  )
}
