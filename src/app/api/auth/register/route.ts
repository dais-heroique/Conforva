import { NextResponse } from "next/server"
import { registerUser } from "@/lib/auth/register"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  orgName: z.string().min(1).max(100).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, orgName } = schema.parse(body)

    const result = await registerUser({ name, email, password, orgName })
    return NextResponse.json({ success: true, ...result })
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "EMAIL_EXISTS") {
      return NextResponse.json({ error: "EMAIL_EXISTS" }, { status: 409 })
    }
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 })
    }
    console.error("[register]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}
