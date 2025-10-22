import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateAIAssessmentReport } from "@/lib/services/ai-assessment"
import { withRateLimit } from '@/lib/rate-limit'

async function handlePOST(request: NextRequest) {

  try {
    const formData = await request.formData()

    const getValue = (key: string) => {
      const raw = formData.get(key)
      return typeof raw === "string" ? raw.trim() : ""
    }

    const parseName = (input: string) => {
      if (!input) {
        return { firstName: "", lastName: "" }
      }

      const parts = input.trim().split(/\s+/)
      if (parts.length === 0) {
        return { firstName: "", lastName: "" }
      }

      const [first, ...rest] = parts
      const last = rest.join(" ")
      return {
        firstName: first,
        lastName: last || "Unknown",
      }
    }

    // Extract form fields
    const assessmentData = {
      firstName: getValue("firstName") || parseName(getValue("name")).firstName,
      lastName: getValue("lastName") || parseName(getValue("name")).lastName,
      email: getValue("email"),
      company: getValue("company"),
      role: getValue("role") || "Not specified",
      aum: getValue("aum") || "Not provided",
      portfolio_size: getValue("portfolio_size") || "Not provided",
      ai_adoption: getValue("ai_adoption") || "Unknown",
      biggest_challenge: getValue("biggest_challenge") || getValue("challenge"),
      primary_interest: getValue("primary_interest") || "general",
    }

    // Validate required fields
    if (!assessmentData.email || !assessmentData.firstName || !assessmentData.lastName || !assessmentData.company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Save to database
    const supabase = await createClient()
    const { data: lead, error: dbError } = await supabase
      .from("ai_assessment_leads")
      .insert({
        ...assessmentData,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      // Continue anyway - we don't want to lose the lead
    }

    // Generate AI assessment report (async - will be sent via email)
    generateAIAssessmentReport(assessmentData)
      .then(async (reportUrl) => {
        // Send email with report
        const resendKey = process.env.RESEND_API_KEY
        if (resendKey) {
          const { Resend } = await import("resend")
          const resend = new Resend(resendKey)
          await resend.emails.send({
          from: "Sprinter AI <hello@sprinter.ai>",
          to: assessmentData.email,
          subject: `Your AI Readiness Assessment for ${assessmentData.company}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #1e40af; margin-bottom: 24px;">Your AI Opportunity Report is Ready!</h1>
              
              <p style="color: #374151; line-height: 1.6;">Dear ${assessmentData.firstName},</p>
              
              <p style="color: #374151; line-height: 1.6;">
                Thank you for completing the AI Readiness Assessment. We've analyzed your responses and prepared a personalized report for ${assessmentData.company}.
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <h2 style="color: #111827; margin-bottom: 16px;">Your Report Highlights:</h2>
                <ul style="color: #374151; line-height: 1.8;">
                  <li>Your AI Readiness Score and industry comparison</li>
                  <li>3 quick-win AI opportunities specific to your firm</li>
                  <li>Potential ROI estimates and time savings</li>
                  <li>Recommended next steps and implementation roadmap</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${reportUrl}" style="display: inline-block; background: linear-gradient(to right, #2563eb, #7c3aed); color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  View Your AI Assessment Report
                </a>
              </div>
              
              <p style="color: #374151; line-height: 1.6;">
                Based on your assessment, we believe there's significant opportunity for AI to accelerate your deal flow and portfolio value creation.
              </p>
              
              <p style="color: #374151; line-height: 1.6;">
                <strong>Want to dive deeper?</strong> Our AI Opportunity Sprint can help you implement your first high-impact AI solution in just 5 days.
              </p>
              
              <div style="text-align: center; margin: 24px 0;">
                <a href="https://sprinter.ai/ai-sprint" style="color: #2563eb; text-decoration: underline;">
                  Learn about the AI Sprint Workshop →
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
              
              <p style="color: #6b7280; font-size: 14px;">
                Best regards,<br>
                The Sprinter AI Team<br>
                <a href="mailto:hello@sprinter.ai" style="color: #2563eb;">hello@sprinter.ai</a> | 
                <a href="tel:+16156010782" style="color: #2563eb;">+1 (615) 601-0782</a>
              </p>
            </div>
          `,
          })
        }

        // Update lead status
        if (lead?.id) {
          await supabase
            .from("ai_assessment_leads")
            .update({ 
              status: "report_sent",
              report_url: reportUrl,
              report_sent_at: new Date().toISOString()
            })
            .eq("id", lead.id)
        }
      })
      .catch(console.error)

    // Send immediate confirmation email
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)
      await resend.emails.send({
      from: "Sprinter AI <hello@sprinter.ai>",
      to: assessmentData.email,
      subject: "We've received your AI Assessment request",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af; margin-bottom: 24px;">Thank You, ${assessmentData.firstName}!</h1>
          
          <p style="color: #374151; line-height: 1.6;">
            We've received your AI Readiness Assessment for ${assessmentData.company} and our AI experts are analyzing your responses.
          </p>
          
          <p style="color: #374151; line-height: 1.6;">
            You'll receive your personalized AI Opportunity Report within 24 hours. This report will include:
          </p>
          
          <ul style="color: #374151; line-height: 1.8;">
            <li>Your AI Readiness Score (0-100)</li>
            <li>Top 3 AI opportunities for your firm</li>
            <li>Estimated ROI and implementation timelines</li>
            <li>Industry benchmarks and competitor insights</li>
          </ul>
          
          <p style="color: #374151; line-height: 1.6;">
            In the meantime, here's a quick stat: <strong>Firms using AI for deal analysis can evaluate targets in hours instead of days.</strong> 
            Your report will show exactly how to achieve similar results.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Questions? Reply to this email or call us at <a href="tel:+16156010782" style="color: #2563eb;">+1 (615) 601-0782</a>
          </p>
        </div>
      `,
      })
    }

    // Notify internal team
    if (resendKey) {
      const { Resend } = await import("resend")
      const resend = new Resend(resendKey)
      await resend.emails.send({
      from: "Sprinter AI <hello@sprinter.ai>",
      to: "hello@sprinter.ai", // Or use a dedicated sales email
      subject: `New AI Assessment Lead: ${assessmentData.company}`,
      html: `
        <h2>New AI Assessment Submission</h2>
        <p><strong>Name:</strong> ${assessmentData.firstName} ${assessmentData.lastName}</p>
        <p><strong>Email:</strong> ${assessmentData.email}</p>
        <p><strong>Company:</strong> ${assessmentData.company}</p>
        <p><strong>Role:</strong> ${assessmentData.role}</p>
        <p><strong>AUM:</strong> ${assessmentData.aum}</p>
        <p><strong>Portfolio Size:</strong> ${assessmentData.portfolio_size}</p>
        <p><strong>AI Adoption:</strong> ${assessmentData.ai_adoption}</p>
        <p><strong>Biggest Challenge:</strong> ${assessmentData.biggest_challenge}</p>
        <p><strong>Primary Interest:</strong> ${assessmentData.primary_interest}</p>
        <hr>
        <p>The AI assessment report is being generated and will be sent automatically.</p>
      `,
      })
    }

    // Redirect to thank you page
    return NextResponse.redirect(new URL("/ai-assessment/thank-you", request.url))

  } catch (error) {
    console.error("AI Assessment submission error:", error)
    return NextResponse.json(
      { error: "Failed to process assessment. Please try again." },
      { status: 500 }
    )
  }
}

// Apply rate limiting with stricter limits for AI endpoints (5 requests per minute)
export const POST = withRateLimit(handlePOST, {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})
