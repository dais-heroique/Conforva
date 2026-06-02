"use client"

import { useState } from "react"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Mail, Clock, MessageSquare } from "lucide-react"

const SUBJECTS = [
  "Question sur un plan / tarif",
  "Problème technique",
  "Question réglementaire GPSR",
  "Demande de remboursement",
  "Partenariat",
  "Autre",
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? "Erreur lors de l'envoi")
      }
      setSent(true)
    } catch (err) {
      setError(String(err).replace("Error: ", ""))
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="max-w-5xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Support</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-gray-500 text-base">Nous lisons et répondons à chaque message. Réponse garantie en moins de 24h les jours ouvrés.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left — infos */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">Email</p>
              </div>
              <p className="text-sm text-gray-600 mb-1">Pour toute demande :</p>
              <a href="mailto:support@conforva.com" className="text-sm font-medium text-blue-600 hover:underline">
                support@conforva.com
              </a>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">Délai de réponse</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Moins de <strong>24h</strong> les jours ouvrés (lun–ven, 9h–18h CET).
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-violet-100 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-violet-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">Chat intégré</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Si vous êtes connecté à votre compte, utilisez le chat en bas à droite pour une réponse instantanée sur les questions de conformité.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 p-5">
              <p className="text-xs text-gray-400 leading-relaxed">
                Conforva répond exclusivement en français et en anglais. Pour les questions juridiques complexes, nous vous orienterons vers des ressources ou experts qualifiés.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-emerald-100 bg-emerald-50">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
                <p className="text-sm text-gray-600 max-w-sm">
                  Nous avons bien reçu votre message et vous répondrons sous 24h les jours ouvrés.
                </p>
                <button
                  onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage("") }}
                  className="mt-6 text-sm text-blue-600 hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom <span className="text-red-500">*</span></label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="Jean Dupont" required className="h-10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com" required className="h-10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet <span className="text-red-500">*</span></label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Choisissez un sujet</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                  <Textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Décrivez votre question ou problème en détail..."
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
                )}

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    En soumettant ce formulaire, vous acceptez que vos données soient traitées pour répondre à votre demande, conformément à notre{" "}
                    <Link href="/privacy" className="underline hover:text-gray-700">politique de confidentialité</Link>.
                  </p>
                </div>

                <Button type="submit" disabled={sending} className="w-full gap-2">
                  {sending ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
