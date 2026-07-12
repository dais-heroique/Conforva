// Thin wrapper around Resend — silently no-ops if RESEND_API_KEY isn't set,
// matching the existing pattern used by the contact form (src/app/api/contact/route.ts).
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping send:", subject)
    return
  }

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "Conforva <noreply@conforva.com>",
      to: [to],
      subject,
      html,
      text,
    })
  } catch (err) {
    console.error("[email] send failed:", err)
  }
}
