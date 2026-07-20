"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Loader2 } from "lucide-react"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: { confirm: "Supprimer cette alerte ?", title: "Supprimer" },
  en: { confirm: "Delete this alert?", title: "Delete" },
}

export function DeleteAlertButton({ alertId, locale = "fr" }: { alertId: string; locale?: Locale }) {
  const t = DICT[locale]
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(t.confirm)) return
    setLoading(true)
    await fetch(`/api/alerts?id=${alertId}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
      title={t.title}
    >
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
    </button>
  )
}
