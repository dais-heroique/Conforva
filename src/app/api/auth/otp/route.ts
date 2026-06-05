import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Simple in-process rate limiter: max 3 OTP requests per IP per 10 minutes
const ipBucket = new Map<string, { count: number; resetAt: number }>()
const MAX_REQUESTS = 3
const WINDOW_MS = 10 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipBucket.get(ip)
  if (!entry || now > entry.resetAt) {
    ipBucket.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_REQUESTS) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

  // Always return 200 to prevent email enumeration — even when rate limited or invalid
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: true })
  }

  let email: string
  try {
    const body = await req.json()
    email = body?.email
  } catch {
    return NextResponse.json({ success: true })
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: true })
  }

  const supabase = await createClient()

  // Fire-and-forget — never reveal success/failure to prevent email enumeration
  await supabase.auth.signInWithOtp({
    email: email.toLowerCase().trim(),
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://conforva.com"}/auth/callback`,
      shouldCreateUser: true,
    },
  })

  return NextResponse.json({ success: true })
}
