"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle2, Loader2, AlertTriangle } from "lucide-react"
import Papa from "papaparse"
import type { CategoryRow } from "@/types/supabase"

const CSV_TEMPLATE = `name,reference,category_code,intended_use,materials,weight_g
Bougie Vanille 200g,BOU-VANI-200,candle,Bougie décorative intérieur,"cire de soja,mèche coton",200
Jouet bois 3+,JOU-BOIS-001,toy,Jouet en bois pour enfants 3 ans et plus,"bois,peinture non-toxique",150`

export default function ImportPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<any[]>([])
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [imported, setImported] = useState(0)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const supabase = createClient()
    const { data: cats } = await supabase.from("product_categories").select("*")
    setCategories(cats ?? [])

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPreview(results.data as any[])
      },
      error: (err) => setError(err.message),
    })
  }

  async function handleImport() {
    if (preview.length === 0) return
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
    if (!org) return

    let count = 0
    for (const row of preview) {
      const category = categories.find(c => c.code === row.category_code)
      const { error } = await supabase.from("products").insert({
        org_id: org.id,
        name: row.name,
        reference: row.reference || null,
        category_id: category?.id ?? null,
        intended_use: row.intended_use || null,
        weight_g: row.weight_g ? parseFloat(row.weight_g) : null,
        materials: row.materials ? row.materials.split(",").map((m: string) => m.trim()) : [],
        source: "csv",
      })
      if (!error) count++
    }

    setImported(count)
    setLoading(false)
    if (count > 0) {
      setTimeout(() => router.push("/dashboard/products"), 2000)
    }
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "conforva-import-template.csv"
    a.click()
  }

  const CATEGORY_CODES = ["candle", "toy", "textile", "cosmetic", "electronics", "puericulture", "decoration", "furniture", "food_contact", "sport", "other"]

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Importer des produits</h1>
          <p className="text-sm text-gray-500">Importez votre catalogue via CSV</p>
        </div>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {imported > 0 && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{imported} produit(s) importé(s) avec succès. Redirection...</AlertDescription>
        </Alert>
      )}

      {/* Template download */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
            Modèle CSV
          </CardTitle>
          <CardDescription>Téléchargez le modèle CSV et remplissez-le avec vos produits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs font-mono overflow-x-auto">
            <p className="text-gray-500 mb-1"># Colonnes disponibles :</p>
            <p>name, reference, category_code, intended_use, materials, weight_g</p>
            <p className="text-gray-500 mt-2"># Codes catégorie valides :</p>
            <p>{CATEGORY_CODES.join(", ")}</p>
          </div>
          <Button variant="outline" onClick={downloadTemplate} className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />Télécharger le modèle CSV
          </Button>
        </CardContent>
      </Card>

      {/* Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Importer votre fichier
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-3" />
            <p className="font-medium text-gray-700">Cliquez pour sélectionner un fichier CSV</p>
            <p className="text-sm text-gray-400 mt-1">Format: .csv, UTF-8</p>
          </div>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />

          {preview.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium">{preview.length} produit(s) détecté(s)</p>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {Object.keys(preview[0]).map(k => (
                        <th key={k} className="px-3 py-2 text-left text-gray-600 font-medium">{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(0, 5).map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        {Object.values(row).map((v: any, j) => (
                          <td key={j} className="px-3 py-2 text-gray-700">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.length > 5 && (
                  <p className="text-xs text-gray-400 text-center py-2">+ {preview.length - 5} lignes supplémentaires</p>
                )}
              </div>
              <Alert variant="info">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Après l'import, vous devrez remplir le questionnaire pour chaque produit afin de générer l'analyse de risque.
                </AlertDescription>
              </Alert>
              <Button onClick={handleImport} disabled={loading} className="w-full gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {loading ? "Import en cours..." : `Importer ${preview.length} produit(s)`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
