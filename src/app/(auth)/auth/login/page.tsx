"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, Shield } from "lucide-react"
import Link from "next/link"
import { useT } from "@/components/providers/locale-provider"

export default function LoginPage() {
  const t = useT()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: true,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  const tLogin = t.auth.login

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold text-2xl mb-4">C</div>
          <h1 className="text-2xl font-bold text-gray-900">Conforva</h1>
          <p className="text-gray-500 text-sm mt-1">{tLogin.subtitle}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{tLogin.cardTitle}</CardTitle>
            <CardDescription>{tLogin.cardDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-center py-4 space-y-3">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="font-medium text-gray-900">{tLogin.successTitle}</p>
                <p
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: tLogin.successDesc.replace('{{email}}', `<strong>${email}</strong>`),
                  }}
                />
                <Button variant="outline" size="sm" onClick={() => setSent(false)}>
                  {tLogin.changeEmail}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">{tLogin.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={tLogin.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />{tLogin.sending}</>
                  ) : (
                    <><Mail className="h-4 w-4" />{tLogin.submitButton}</>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <Shield className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{tLogin.disclaimer}</p>
        </div>

        <p className="text-center text-xs text-gray-400">
          {tLogin.termsText}{" "}
          <Link href="/cgu" className="underline hover:text-gray-600">{tLogin.termsLink}</Link>{" "}
          {tLogin.andText}{" "}
          <Link href="/privacy" className="underline hover:text-gray-600">{tLogin.privacyLink}</Link>.
        </p>
      </div>
    </div>
  )
}
