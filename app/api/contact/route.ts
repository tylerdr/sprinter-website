import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, company, message, projectType, phone, source } = data || {}

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Save to database
    const supabase = await createClient()
    const { data: lead, error: dbError } = await supabase
      .from("contact_leads")
      .insert({
        name,
        email,
        company: company || null,
        phone: phone || null,
        message,
        project_type: projectType || "General Inquiry",
        source: source || "contact_form",
        status: "new",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      // Continue anyway - we don't want to lose the lead
    }

    const resendKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL || "hello@sprinter.ai"
    const from = process.env.CONTACT_FROM_EMAIL || "hello@sprinter.ai"

    if (resendKey) {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)
      
      // Send notification to team
      await resend.emails.send({ 
        to, 
        from, 
        subject: `New contact: ${name} from ${company || "N/A"} - ${projectType || "General Inquiry"}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <h2>New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${email}">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Company:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${company || "Not provided"}</td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Project Type:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${projectType || "General Inquiry"}</td>
              </tr>
            </table>
            <h3>Message:</h3>
            <p style="padding: 12px; background: #f9fafb; border-radius: 4px; white-space: pre-wrap;">${message}</p>
            ${lead?.id ? `<p style="color: #6b7280; font-size: 14px;">Lead ID: ${lead.id}</p>` : ''}
          </div>
        `
      })
      
      // Send confirmation to user
      await resend.emails.send({
        from,
        to: email,
        subject: "Thank you for contacting Sprinter AI",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af; margin-bottom: 24px;">Thank You for Reaching Out!</h1>
            
            <p style="color: #374151; line-height: 1.6;">Hi ${name},</p>
            
            <p style="color: #374151; line-height: 1.6;">
              We've received your message and appreciate your interest in Sprinter AI. 
              Our team will review your inquiry and get back to you within one business day.
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <h3 style="color: #111827; margin-bottom: 12px;">While You Wait...</h3>
              <p style="color: #374151; line-height: 1.6;">
                Explore how we're helping PE firms and enterprises leverage AI:
              </p>
              <ul style="color: #374151; line-height: 1.8;">
                <li><a href="https://sprinter.ai/ai-assessment" style="color: #2563eb;">Take our free AI Readiness Assessment</a></li>
                <li><a href="https://sprinter.ai/case-studies" style="color: #2563eb;">View our case studies</a></li>
                <li><a href="https://sprinter.ai/ai-sprint" style="color: #2563eb;">Learn about our 5-day AI Sprint</a></li>
              </ul>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              If you have any urgent questions, feel free to call us directly at 
              <a href="tel:+16156010782" style="color: #2563eb;">+1 (615) 601-0782</a>.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
            
            <p style="color: #6b7280; font-size: 14px;">
              Best regards,<br>
              The Sprinter AI Team<br>
              <a href="https://sprinter.ai" style="color: #2563eb;">sprinter.ai</a>
            </p>
          </div>
        `
      })
      
      return NextResponse.json({ ok: true, leadId: lead?.id })
    }

    console.log("Contact submission (no Resend key):", { name, email, company, message })
    return NextResponse.json({ ok: true, queued: true })
  } catch (err) {
    console.error("Contact form error:", err)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
