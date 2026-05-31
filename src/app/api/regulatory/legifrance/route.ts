import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const PISTE_TOKEN_URL = "https://oauth.piste.gouv.fr/api/oauth/token"
const PISTE_API_BASE = "https://api.piste.gouv.fr/dila/legifrance/lf-engine-app"

const STATIC_TEXTS = [
  {
    id: "LEGIARTI000048358654",
    title: "Code de la consommation — Art. L. 423-1 (sécurité générale)",
    date: "2024-01-01",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048358654",
    summary: "Obligation de sécurité générale pour tout produit mis sur le marché français.",
  },
  {
    id: "LEGIARTI000044139095",
    title: "Décret 2023-1202 — Transposition GPSR",
    date: "2023-12-15",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048568654",
    summary: "Transposition française du règlement UE 2023/988 sur la sécurité générale des produits.",
  },
  {
    id: "LEGIARTI000032228647",
    title: "Code de la consommation — Art. L. 411-1 (conformité)",
    date: "2023-04-01",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032228647",
    summary: "Obligation de conformité des produits à leur description et aux attentes légitimes du consommateur.",
  },
  {
    id: "LEGIARTI000006226619",
    title: "Code de la consommation — Art. L. 221-1 (sécurité des produits)",
    date: "2022-09-01",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006226619",
    summary: "Définition des obligations de sécurité et des responsabilités des professionnels.",
  },
  {
    id: "LEGIARTI000044624878",
    title: "Décret 2022-748 — Étiquetage et informations produits",
    date: "2022-04-28",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000045777310",
    summary: "Renforcement des obligations d'information et d'étiquetage pour les produits de consommation.",
  },
]

async function getPisteToken(): Promise<string | null> {
  const clientId = process.env.LEGIFRANCE_CLIENT_ID
  const clientSecret = process.env.LEGIFRANCE_CLIENT_SECRET
  if (!clientId || !clientSecret) return null

  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "openid",
    })
    const res = await fetch(PISTE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.access_token ?? null
  } catch {
    return null
  }
}

async function searchLegifrance(token: string, query: string) {
  try {
    const res = await fetch(`${PISTE_API_BASE}/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        recherche: {
          champs: [{ typeChamp: "ALL", criteres: [{ typeRecherche: "TOUS_LES_MOTS", valeur: query }] }],
          filtres: [{ facette: "DATE_VERSION", singleDate: new Date().toISOString().slice(0, 10) }],
          pageNumber: 1,
          pageSize: 5,
          sort: "PERTINENCE",
          typePagination: "DEFAUT",
        },
        fond: "CODE_DATE",
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") ?? "sécurité produits consommation"

  const token = await getPisteToken()

  if (!token) {
    return NextResponse.json({
      source: "Légifrance",
      live: false,
      note: "Configurez LEGIFRANCE_CLIENT_ID et LEGIFRANCE_CLIENT_SECRET sur piste.gouv.fr pour accéder aux textes en temps réel.",
      texts: STATIC_TEXTS,
      fetched_at: new Date().toISOString(),
    })
  }

  const liveData = await searchLegifrance(token, query)
  const texts = liveData?.results?.slice(0, 5).map((r: any) => ({
    id: r.id ?? "",
    title: r.titles?.[0]?.title ?? r.title ?? "Sans titre",
    date: r.lastUpdate ?? r.dateVersion ?? "",
    url: `https://www.legifrance.gouv.fr/codes/article_lc/${r.id}`,
    summary: r.extract ?? "",
  })) ?? STATIC_TEXTS

  return NextResponse.json({
    source: "Légifrance (PISTE)",
    live: true,
    query,
    texts,
    fetched_at: new Date().toISOString(),
  })
}
