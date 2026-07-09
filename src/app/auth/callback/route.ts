import { NextResponse, type NextRequest } from "next/server"

// Auth.js v5 handles OAuth callbacks via /api/auth/callback/[provider]
// This route is kept as a fallback redirect
export async function GET(request: NextRequest) {
  const next = new URL(request.url).searchParams.get("next") ?? "/dashboard"
  return NextResponse.redirect(new URL(next, request.url))
}
