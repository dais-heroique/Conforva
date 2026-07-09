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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08090C] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 justify-center">
            <ConforvaLogo size={32} />
            <span className="font-black text-xl tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-white">Créer un compte</h1>
          <p className="mt-2 text-sm text-gray-400">Essai gratuit 14 jours — aucune CB requise</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/60 transition-colors"
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
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/60 transition-colors"
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
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/60 transition-colors"
                placeholder="8 caractères minimum"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-60"
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
          <Link href="/auth/login" className="text-[#A78BFA] hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
