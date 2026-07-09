import { auth } from "@/auth"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_PREFIXES = [
  "/",
  "/auth/",
  "/blog",
  "/conformite-gpsr",
  "/partenaires",
  "/about",
  "/contact",
  "/faq",
  "/status",
  "/security",
  "/cgu",
  "/cgv",
  "/privacy",
  "/cookies",
  "/mentions-legales",
  "/enterprise",
  "/audit-gratuit",
  "/api/auth",
  "/api/audit",
  "/api/webhooks",
  "/api/affiliates",
  "/api/competitors", // allow public read for now
]

function isPublic(pathname: string): boolean {
  if (pathname === "/") return true
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p))
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Affiliate referral tracking
  const ref = request.nextUrl.searchParams.get("ref")
  let response: NextResponse

  if (!isPublic(pathname)) {
    const session = await auth()
    if (!session?.user?.id) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  response = NextResponse.next()

  if (ref && /^[a-zA-Z0-9_-]{2,40}$/.test(ref)) {
    const existing = request.cookies.get("conforva_ref")?.value
    response.cookies.set("conforva_ref", ref, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: true,
    })
    if (existing !== ref) {
      const base = request.nextUrl.origin
      fetch(`${base}/api/affiliates/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: ref }),
      }).catch(() => {})
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
