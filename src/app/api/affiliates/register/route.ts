import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

function generateCode(company: string, name: string): string {
  const base = (company || name)
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 20)
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}

export async function POST(req: NextRequest) {
  const { name, email, company, payment_method, payment_details } = await req.json()

  if (!name || !email || !payment_method || !payment_details) {
    return NextResponse.json({ error: "name, email and payment info required" }, { status: 400 })
  }

  const supabase = await createServiceClient()
  const code = generateCode(company || "", name)

  const { data, error } = await supabase
    .from("affiliates")
    .insert({ name, email, company: company || null, code, payment_method, payment_details })
    .select("id, code, token")
    .single()

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "email_already_registered" }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://conforva.com"
  return NextResponse.json({
    code: data.code,
    referral_url: `${baseUrl}?ref=${data.code}`,
    stats_url: `${baseUrl}/partenaires/${data.token}`,
    token: data.token,
  })
}
