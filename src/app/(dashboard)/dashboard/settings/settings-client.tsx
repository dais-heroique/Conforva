"use client"

import { signOut } from "next-auth/react"
import { LogOut, Bell, User } from "lucide-react"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: {
    title: "Paramètres",
    subtitle: "Gérez votre compte et vos préférences",
    notifications: "Notifications",
    items: [
      { id: "price_alerts", label: "Alertes de prix par email", desc: "Recevez un email dès qu'un prix change" },
      { id: "weekly_report", label: "Rapport hebdomadaire IA", desc: "Résumé IA chaque lundi matin" },
      { id: "new_product", label: "Nouveaux produits concurrents", desc: "Alerte quand un concurrent lance un produit" },
    ],
    account: "Compte",
    logout: "Se déconnecter",
  },
  en: {
    title: "Settings",
    subtitle: "Manage your account and preferences",
    notifications: "Notifications",
    items: [
      { id: "price_alerts", label: "Email price alerts", desc: "Get an email as soon as a price changes" },
      { id: "weekly_report", label: "Weekly AI report", desc: "AI summary every Monday morning" },
      { id: "new_product", label: "New competitor products", desc: "Alert when a competitor launches a product" },
    ],
    account: "Account",
    logout: "Log out",
  },
}

export default function SettingsClient({ locale }: { locale: Locale }) {
  const t = DICT[locale]

  return (
    <div className="min-h-full bg-[#08090C] px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t.subtitle}</p>
        </div>

        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/8">
            <Bell className="h-4 w-4 text-[#A78BFA]" />
            <h2 className="font-semibold text-white text-sm">{t.notifications}</h2>
          </div>
          <div className="p-6 space-y-5">
            {t.items.map((item) => (
              <label key={item.id} className="flex items-start justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" defaultChecked className="sr-only peer" id={item.id} />
                  <label htmlFor={item.id} className="w-9 h-5 bg-white/10 peer-checked:bg-[#8B5CF6] rounded-full cursor-pointer block transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/8">
            <User className="h-4 w-4 text-[#A78BFA]" />
            <h2 className="font-semibold text-white text-sm">{t.account}</h2>
          </div>
          <div className="p-6">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 bg-red-500/8 hover:bg-red-500/12 border border-red-500/20 px-4 py-2.5 rounded-xl transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {t.logout}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
