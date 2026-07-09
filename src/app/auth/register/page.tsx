"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ConforvaLogo } from "@/components/logo"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères")
      setLoading(false)
      return
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error === "EMAIL_EXISTS" ? "Un compte existe déjà avec cet email" : "Une erreur est survenue")
      setLoading(false)
      return
    }

    await signIn("credentials", { email, password, redirect: false })
    router.push("/onboarding")
  }

  async function handleGoogle() {
    await signIn("google", { callbackUrl: "/onboarding" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060D09] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 justify-center">
            <ConforvaLogo size={32} />
            <span className="font-black text-xl tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-white">Créer un compte</h1>
          <p className="mt-2 text-sm text-gray-400">Essai gratuit — aucune CB requise</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            <GoogleIcon />
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/60 transition-colors"
                placeholder="Marie Dupont"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/60 transition-colors"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/60 transition-colors"
                placeholder="8 caractères minimum"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? "Création…" : "Créer mon compte gratuit"}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            En créant un compte, vous acceptez nos{" "}
            <Link href="/cgu" className="underline hover:text-gray-400">CGU</Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="underline hover:text-gray-400">politique de confidentialité</Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="text-[#00E676] hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
