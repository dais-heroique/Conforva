import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Save affiliate ref from cookie to user record (first signup only)
        const cookieStore = await cookies()
        const affiliateRef = cookieStore.get("conforva_ref")?.value
        if (affiliateRef) {
          await supabase.from("users")
            .update({ affiliate_ref: affiliateRef })
            .eq("id", user.id)
            .is("affiliate_ref", null)
        }

        const { data: org } = await supabase
          .from("organizations")
          .select("id")
          .eq("owner_id", user.id)
          .single()

        if (!org) {
          return NextResponse.redirect(`${origin}/onboarding`)
        }
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
}
