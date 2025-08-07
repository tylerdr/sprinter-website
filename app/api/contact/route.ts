import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, company, message, projectType } = data || {}

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const payload = {
      subject: `New contact form submission – ${projectType || "General Inquiry"}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\nProject: ${projectType || "-"}\n\nMessage:\n${message}`,
    }

    const resendKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL || "hello@sprinter.ai"
    const from = process.env.CONTACT_FROM_EMAIL || "no-reply@sprinter.ai"

    if (resendKey) {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)
      await resend.emails.send({ to, from, subject: payload.subject, text: payload.text })
      return NextResponse.json({ ok: true })
    }

    console.log("Contact submission:", payload)
    return NextResponse.json({ ok: true, queued: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
