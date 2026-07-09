"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Save, Loader2, LogOut } from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="p-6 max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Paramètres</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gérez votre compte et vos préférences</p>
      </div>

      <div className="bg-white/5 border border-white/8 rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-white text-sm">Notifications</h2>
        <div className="space-y-3">
          {[
            { id: "price_alerts", label: "Alertes de prix par email", desc: "Recevez un email dès qu'un prix change" },
            { id: "weekly_report", label: "Rapport hebdomadaire IA", desc: "Résumé IA chaque lundi matin" },
            { id: "new_product", label: "Nouveaux produits concurrents", desc: "Alerte quand un concurrent lance un produit" },
          ].map((item) => (
            <label key={item.id} className="flex items-start justify-between gap-4 cursor-pointer">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <div className="relative mt-0.5">
                <input type="checkbox" defaultChecked className="sr-only peer" id={item.id} />
                <label htmlFor={item.id} className="w-9 h-5 bg-white/10 peer-checked:bg-[#8B5CF6] rounded-full cursor-pointer block transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
        <h2 className="font-semibold text-white text-sm mb-4">Compte</h2>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
