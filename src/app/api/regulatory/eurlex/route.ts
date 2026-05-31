import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const EURLEX_SPARQL = "https://publications.europa.eu/webapi/rdf/sparql"

const RELEVANT_ACTS = [
  { title: "GPSR — Règlement UE 2023/988", celex: "32023R0988", topic: "Sécurité générale des produits" },
  { title: "REACH — Règlement CE 1907/2006", celex: "32006R1907", topic: "Substances chimiques" },
  { title: "RoHS — Directive 2011/65/UE", celex: "32011L0065", topic: "Substances dangereuses" },
  { title: "LVD — Directive 2014/35/UE", celex: "32014L0035", topic: "Matériel électrique" },
  { title: "RED — Directive 2014/53/UE", celex: "32014L0053", topic: "Équipements radio" },
  { title: "WEEE — Directive 2012/19/UE", celex: "32012L0019", topic: "Déchets électroniques" },
  { title: "CLP — Règlement CE 1272/2008", celex: "32008R1272", topic: "Classification / étiquetage" },
]

async function fetchEurLexAmendments(celex: string): Promise<{ date: string; desc: string } | null> {
  const query = `
    PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    SELECT ?date ?title WHERE {
      ?act cdm:resource_legal_id_celex "${celex}" ;
           cdm:work_date_document ?date .
      OPTIONAL { ?act cdm:expression_title ?title FILTER(lang(?title)="fr") }
    } LIMIT 1
  `
  try {
    const res = await fetch(`${EURLEX_SPARQL}?query=${encodeURIComponent(query)}&format=application/sparql-results%2Bjson`, {
      headers: { Accept: "application/sparql-results+json" },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return null
    const json = await res.json()
    const binding = json?.results?.bindings?.[0]
    if (!binding) return null
    return {
      date: binding.date?.value ?? "",
      desc: binding.title?.value ?? "",
    }
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const topic = searchParams.get("topic") ?? ""

  const filtered = topic
    ? RELEVANT_ACTS.filter(a => a.topic.toLowerCase().includes(topic.toLowerCase()) || a.title.toLowerCase().includes(topic.toLowerCase()))
    : RELEVANT_ACTS

  const results = await Promise.all(
    filtered.slice(0, 5).map(async (act) => {
      const meta = await fetchEurLexAmendments(act.celex)
      return {
        ...act,
        date: meta?.date ?? null,
        eurlex_url: `https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:${act.celex}`,
      }
    })
  )

  return NextResponse.json({ source: "EUR-Lex", acts: results, fetched_at: new Date().toISOString() })
}
