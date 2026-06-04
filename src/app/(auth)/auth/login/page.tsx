"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useT } from "@/components/providers/locale-provider"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export default function LoginPage() {
  const t = useT()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleGoogle() {
    setGoogleLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    })
    if (error) {
      setError(error.message)
      setGoogleLoading(false)
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
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

              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 h-11 font-medium"
                onClick={handleGoogle}
                disabled={googleLoading || loading}
              >
                {googleLoading
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <GoogleIcon />
                }
                {tLogin.continueWithGoogle}
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">{tLogin.orEmail}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

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
                <Button type="submit" className="w-full h-11" disabled={loading || googleLoading}>
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
