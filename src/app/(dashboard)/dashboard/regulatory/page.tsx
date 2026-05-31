"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Globe, BookOpen, AlertTriangle, RefreshCw, ExternalLink,
  ChevronRight, FlaskConical, FileSearch, Landmark, Building2,
} from "lucide-react"

interface RegulatoryItem {
  title: string
  date?: string | null
  url: string
  description?: string
  summary?: string
  topic?: string
}

interface RecallItem {
  id: string
  date: string
  title: string
  hazard: string
  url: string
  manufacturer: string
}

function SourceCard({
  title,
  icon: Icon,
  color,
  items,
  loading,
  error,
}: {
  title: string
  icon: React.ElementType
  color: string
  items: RegulatoryItem[]
  loading: boolean
  error?: string
}) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 text-sm font-semibold ${color}`}>
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 rounded-lg bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-xs text-gray-400">Aucun résultat.</p>
        ) : (
          <div className="space-y-2">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 group-hover:text-blue-700 leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  {(item.summary || item.description || item.topic) && (
                    <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                      {item.summary || item.description || item.topic}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.date.slice(0, 10)}</p>
                  )}
                </div>
                <ExternalLink className="h-3 w-3 text-gray-300 group-hover:text-blue-500 shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RecallsCard({ items, loading }: { items: RecallItem[]; loading: boolean }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-600">
          <AlertTriangle className="h-4 w-4" />
          Rappels CPSC récents (USA)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="h-14 rounded-lg bg-gray-100 animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <p className="text-xs text-gray-400">Aucun rappel récent disponible.</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-red-50 transition-colors group border border-transparent hover:border-red-100"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 group-hover:text-red-700 leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  {item.hazard && (
                    <Badge variant="secondary" className="mt-1 text-[10px] bg-red-50 text-red-600 border-red-100">
                      {item.hazard}
                    </Badge>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">{item.date?.slice(0, 10)} · {item.manufacturer}</p>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-300 group-hover:text-red-400 shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function RegulatoryPage() {
  const [eurlex, setEurlex] = useState<{ acts: RegulatoryItem[] } | null>(null)
  const [legifrance, setLegifrance] = useState<{ texts: RegulatoryItem[]; live: boolean; note?: string } | null>(null)
  const [uk, setUk] = useState<{ items: RegulatoryItem[] } | null>(null)
  const [usData, setUsData] = useState<{ regulations: RegulatoryItem[]; recent_recalls: RecallItem[] } | null>(null)

  const [loading, setLoading] = useState({ eurlex: true, legifrance: true, uk: true, us: true })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading({ eurlex: true, legifrance: true, uk: true, us: true })
    setErrors({})

    const [euRes, frRes, ukRes, usRes] = await Promise.allSettled([
      fetch("/api/regulatory/eurlex"),
      fetch("/api/regulatory/legifrance"),
      fetch("/api/regulatory/uk"),
      fetch("/api/regulatory/us-ecfr"),
    ])

    if (euRes.status === "fulfilled" && euRes.value.ok) {
      setEurlex(await euRes.value.json())
    } else {
      setErrors(e => ({ ...e, eurlex: "Erreur lors de la récupération EUR-Lex." }))
    }
    setLoading(l => ({ ...l, eurlex: false }))

    if (frRes.status === "fulfilled" && frRes.value.ok) {
      setLegifrance(await frRes.value.json())
    } else {
      setErrors(e => ({ ...e, legifrance: "Erreur Légifrance." }))
    }
    setLoading(l => ({ ...l, legifrance: false }))

    if (ukRes.status === "fulfilled" && ukRes.value.ok) {
      setUk(await ukRes.value.json())
    } else {
      setErrors(e => ({ ...e, uk: "Erreur legislation.gov.uk." }))
    }
    setLoading(l => ({ ...l, uk: false }))

    if (usRes.status === "fulfilled" && usRes.value.ok) {
      setUsData(await usRes.value.json())
    } else {
      setErrors(e => ({ ...e, us: "Erreur eCFR/CPSC." }))
    }
    setLoading(l => ({ ...l, us: false }))

    setLastRefresh(new Date())
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const eurlexItems: RegulatoryItem[] = (eurlex?.acts ?? []).map(a => ({
    title: a.title,
    date: a.date ?? null,
    url: (a as any).eurlex_url ?? "#",
    topic: a.topic,
  }))

  const legItems: RegulatoryItem[] = (legifrance?.texts ?? []).map(t => ({
    title: t.title,
    date: (t as any).date ?? null,
    url: (t as any).url ?? "#",
    summary: (t as any).summary,
  }))

  const ukItems: RegulatoryItem[] = (uk?.items ?? []).map(i => ({
    title: i.title,
    date: i.date,
    url: i.url,
    description: i.description,
  }))

  const usRegItems: RegulatoryItem[] = (usData?.regulations ?? []).map(r => ({
    title: r.title,
    date: (r as any).updated,
    url: (r as any).ecfr_url ?? "#",
    description: (r as any).description,
  }))

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Veille Réglementaire</h1>
          <p className="text-sm text-gray-500 mt-1">Textes officiels en temps réel — EUR-Lex · Légifrance · UK · CPSC</p>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <p className="text-xs text-gray-400 hidden md:block">
              Mis à jour {lastRefresh.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
          <Button variant="outline" size="sm" onClick={fetchAll} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Banner: LegiFrance setup note */}
      {legifrance && !legifrance.live && legifrance.note && (
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
          <BookOpen className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-medium">Légifrance — mode statique : </span>
            {legifrance.note}{" "}
            <a href="https://piste.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline font-medium">
              S'inscrire sur PISTE
            </a>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "EUR-Lex GPSR", href: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32023R0988", color: "bg-blue-50 text-blue-700 hover:bg-blue-100", icon: Globe },
          { label: "Légifrance", href: "https://www.legifrance.gouv.fr", color: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100", icon: Landmark },
          { label: "CPSC Recalls", href: "https://www.cpsc.gov/Recalls", color: "bg-red-50 text-red-700 hover:bg-red-100", icon: AlertTriangle },
          { label: "ECHA SVHC", href: "https://echa.europa.eu/candidate-list-table", color: "bg-green-50 text-green-700 hover:bg-green-100", icon: FlaskConical },
        ].map(({ label, href, color, icon: Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${color}`}>
            <Icon className="h-4 w-4" />
            {label}
            <ChevronRight className="h-3.5 w-3.5 ml-auto" />
          </a>
        ))}
      </div>

      {/* EU + FR */}
      <div className="grid md:grid-cols-2 gap-6">
        <SourceCard
          title="EUR-Lex — Droit européen"
          icon={Globe}
          color="text-blue-700"
          items={eurlexItems}
          loading={loading.eurlex}
          error={errors.eurlex}
        />
        <SourceCard
          title="Légifrance — Droit français"
          icon={Landmark}
          color="text-indigo-700"
          items={legItems}
          loading={loading.legifrance}
          error={errors.legifrance}
        />
      </div>

      {/* UK + US */}
      <div className="grid md:grid-cols-3 gap-6">
        <SourceCard
          title="legislation.gov.uk — Droit britannique"
          icon={Building2}
          color="text-rose-700"
          items={ukItems}
          loading={loading.uk}
          error={errors.uk}
        />
        <SourceCard
          title="eCFR — Réglementations fédérales US"
          icon={FileSearch}
          color="text-orange-700"
          items={usRegItems}
          loading={loading.us}
          error={errors.us}
        />
        <RecallsCard
          items={usData?.recent_recalls ?? []}
          loading={loading.us}
        />
      </div>

      <p className="text-[11px] text-gray-400 text-center pb-4">
        Les données sont récupérées depuis les APIs officielles publiques. Pour Légifrance, activez l'accès en temps réel via{" "}
        <a href="https://piste.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline">piste.gouv.fr</a>.
        Ces informations ne constituent pas un avis juridique.
      </p>
    </div>
  )
}
