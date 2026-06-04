"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

// Processes auth tokens that land on any page (e.g. Supabase implicit-flow redirects
// to site root instead of /auth/callback). Redirects to /dashboard on SIGNED_IN.
export function AuthCallbackHandler() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    const search = window.location.search
    const hasTokens =
      hash.includes("access_token") ||
      new URLSearchParams(search).has("code")

    if (!hasTokens) return

    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.push("/dashboard")
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [router])

  return null
}
