import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import type { Metadata } from "next"
import {
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  Globe,
  Package,
  ExternalLink,
} from "lucide-react"
import { CopyButton } from "@/components/verify/CopyButton"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("technical_files")
    .select("content_json, products(name)")
    .eq("id", id)
    .single()

  const productName = (data?.products as any)?.name ?? "Produit"
  const title = `Vérification GPSR — ${productName}`
  const description = `Dossier de conformité GPSR vérifié pour ${productName}. Analyse de risque, normes applicables et déclaration de conformité.`

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}


function severityLabel(s: string | null | undefined): { label: string; cls: string } {
  switch (s?.toLowerCase()) {
    case "low":
    case "faible":
      return { label: "Faible", cls: "bg-green-100 text-green-700 border-green-200" }
    case "medium":
    case "moyen":
      return { label: "Moyen", cls: "bg-amber-100 text-amber-700 border-amber-200" }
    case "high":
    case "élevé":
    case "eleve":
    case "critical":
      return { label: "Élevé", cls: "bg-red-100 text-red-700 border-red-200" }
    default:
      return { label: "N/A", cls: "bg-gray-100 text-gray-500 border-gray-200" }
  }
}

export default async function VerifyPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select("*, product_categories(*)")
    .eq("id", id)
    .single()

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Produit non trouvé</h1>
            <p className="mt-2 text-gray-500">
              Ce lien de vérification est invalide ou le produit a été supprimé.
            </p>
          </div>
          <Link
            href="https://conforva.com"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Shield className="h-4 w-4" />
            Conforva — Conformité GPSR
          </Link>
        </div>
      </div>
    )
  }

  const [{ data: org }, { data: cs }, { data: ra }] = await Promise.all([
    supabase
      .from("organizations")
      .select("name, country")
      .eq("id", product.org_id)
      .single(),
    supabase
      .from("compliance_status")
      .select("*")
      .eq("product_id", id)
      .single(),
    supabase
      .from("risk_assessments")
      .select("validated_by_human, validated_at, severity, referenced_standards, version")
      .eq("product_id", id)
      .order("version", { ascending: false })
      .limit(1)
      .single(),
  ])

  const score = cs?.score ?? 0
  const isValidated = ra?.validated_by_human === true
  const isInProgress = !isValidated && score >= 50
  const category = (product as any).product_categories
  const markets: string[] = product.target_markets ?? []
  const sev = severityLabel(ra?.severity)
  const year = ra?.validated_at ? new Date(ra.validated_at).getFullYear() : new Date().getFullYear()
  const shortRef = id.slice(-8).toUpperCase()
  const verifyUrl = `https://conforva.com/verify/${id}`

  const validatedDate = ra?.validated_at
    ? new Date(ra.validated_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header bar */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Conforva</span>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Attestation de conformité
            </p>
          </div>
          <p className="text-xs text-gray-400">{today}</p>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-4 py-10 space-y-6">

        {/* Certificate card */}
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 overflow-hidden">

          {/* Status hero */}
          <div
            className={
              isValidated
                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-b border-green-100 px-8 py-10 text-center"
                : isInProgress
                ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-b border-amber-100 px-8 py-10 text-center"
                : "bg-gradient-to-br from-gray-50 to-slate-50 border-b border-gray-100 px-8 py-10 text-center"
            }
          >
            {isValidated ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  {/* Gradient ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-20 blur-md scale-110" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-200">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black tracking-tight text-green-700">DOSSIER VALIDÉ</p>
                  <p className="mt-1 text-sm text-green-600">
                    Ce produit a été validé par un responsable humain
                  </p>
                </div>
              </div>
            ) : isInProgress ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 ring-4 ring-amber-200">
                  <Clock className="h-10 w-10 text-amber-600" />
                </div>
                <div>
                  <p className="text-3xl font-black tracking-tight text-amber-700">EN COURS DE CONFORMITÉ</p>
                  <p className="mt-1 text-sm text-amber-600">
                    La démarche de conformité est engagée
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 ring-4 ring-gray-200">
                  <AlertCircle className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <p className="text-3xl font-black tracking-tight text-gray-500">DOSSIER INCOMPLET</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Le dossier de conformité est en cours de constitution
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Package className="h-6 w-6 text-gray-500" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                  {product.reference && (
                    <span className="flex items-center gap-1">
                      <span className="font-mono text-xs bg-gray-100 rounded px-1.5 py-0.5 text-gray-600">
                        Réf: {product.reference}
                      </span>
                    </span>
                  )}
                  {category?.name_fr && (
                    <span className="text-gray-400">·</span>
                  )}
                  {category?.name_fr && (
                    <span>{category.name_fr}</span>
                  )}
                </div>
                {org && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm">
                    <Globe className="h-3.5 w-3.5 text-gray-400" />
                    <span className="font-medium text-gray-700">{org.name}</span>
                    {org.country && (
                      <span className="text-gray-400">· {org.country}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Compliance metrics */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              {/* Score */}
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Score</p>
                <p
                  className={`text-4xl font-black tabular-nums ${
                    score >= 80
                      ? "text-green-600"
                      : score >= 50
                      ? "text-amber-600"
                      : "text-gray-400"
                  }`}
                >
                  {score}
                  <span className="text-lg font-semibold">%</span>
                </p>
              </div>

              {/* Markets */}
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Marchés</p>
                {markets.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-1 mt-1">
                    {markets.slice(0, 6).map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-700"
                      >
                        {m}
                      </span>
                    ))}
                    {markets.length > 6 && (
                      <span className="text-xs text-gray-400">+{markets.length - 6}</span>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mt-1">—</p>
                )}
              </div>

              {/* Severity */}
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Sévérité</p>
                <div className="flex justify-center mt-1">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${sev.cls}`}
                  >
                    {sev.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Standards — only if validated */}
          {isValidated && ra?.referenced_standards && ra.referenced_standards.length > 0 && (
            <div className="px-8 py-6 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Normes applicables
              </p>
              <div className="flex flex-wrap gap-2">
                {ra.referenced_standards.map((std) => (
                  <span
                    key={std}
                    className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Validation seal — only if validated */}
          {isValidated && validatedDate && (
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="rounded-xl border-2 border-dashed border-green-200 bg-green-50/50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Dossier technique validé le {validatedDate} via Conforva
                    </p>
                    <p className="mt-1 font-mono text-xs text-green-600">
                      Référence: TF-{shortRef}-{year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="px-8 py-5 bg-gray-50/50">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Ce document est généré par Conforva à titre d'aide à la conformité.<br />
              Il ne constitue pas une certification officielle au sens du règlement UE 2023/988 (GPSR).
            </p>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <CopyButton url={verifyUrl} />
          <Link
            href="https://conforva.com"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            Accéder à Conforva
          </Link>
        </div>

        {/* Bottom credit */}
        <p className="text-center text-xs text-gray-400 pb-4">
          Vérification publique · Conforva © {new Date().getFullYear()}
        </p>
      </main>
    </div>
  )
}
