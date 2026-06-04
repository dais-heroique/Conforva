import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message trop long (5000 caractères max)." }, { status: 400 })
  }

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "Conforva Contact <noreply@conforva.com>",
      to: ["contact.conforva@gmail.com"],
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\n${message}`,
    })
  }

  return NextResponse.json({ success: true })
}
