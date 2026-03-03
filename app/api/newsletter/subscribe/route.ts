import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Schema for newsletter subscription
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  leadMagnet: z.string().optional(),
  source: z.string().optional(),
})

// Simulated lead magnet URLs (in production, these would be actual files)
const LEAD_MAGNETS = {
  "AI-Operations-Opportunity-Scorecard.pdf": {
    url: "/downloads/pe-ai-readiness-checklist.html",
    title: "AI Operations Opportunity Scorecard",
    description: "A practical checklist to prioritize AI agent opportunities"
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, leadMagnet, source } = subscribeSchema.parse(body)

    // Check if email service is configured
    if (!resend) {
      console.log("Newsletter subscription (demo mode):", { email, leadMagnet, source })

      // In demo mode, just return success
      return NextResponse.json({
        success: true,
        message: "Subscribed successfully (demo mode)",
        downloadUrl: leadMagnet ? LEAD_MAGNETS[leadMagnet as keyof typeof LEAD_MAGNETS]?.url : null
      })
    }

    // Add to newsletter list (using Resend Contacts API)
    try {
      // Send welcome email with lead magnet
      await resend.emails.send({
        from: "Sprinter AI <noreply@sprinterai.com>",
        to: email,
        subject: "Your AI Operations Opportunity Scorecard is here!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(to right, #3b82f6, #9333ea); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: linear-gradient(to right, #3b82f6, #9333ea); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                .benefits { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to AI Ops Insights!</h1>
                  <p>Your AI Operations Opportunity Scorecard is ready</p>
                </div>

                <div class="content">
                  <h2>Hello there,</h2>

                  <p>Thanks for joining operators and founders getting practical AI implementation insights each week.</p>

                  <p><strong>Your AI Operations Opportunity Scorecard is attached to this email.</strong></p>

                  <div class="benefits">
                    <h3>What you'll find inside:</h3>
                    <ul>
                      <li>A practical framework to score high-leverage operational workflows</li>
                      <li>A method to prioritize quick wins and longer-term automation</li>
                      <li>Examples of measurable outcomes from real deployments</li>
                      <li>A 30-day action template to move from idea to implementation</li>
                    </ul>
                  </div>

                  <p><strong>What happens next:</strong></p>
                  <ul>
                    <li>Use the scorecard to assess your current workflows</li>
                    <li>Identify your highest-impact AI opportunity</li>
                    <li>Every Thursday, you'll receive our AI Ops Weekly newsletter with:</li>
                    <ul>
                      <li>One actionable AI implementation breakdown</li>
                      <li>ROI lessons and rollout timelines from real teams</li>
                      <li>Templates and frameworks you can apply immediately</li>
                    </ul>
                  </ul>

                  <center>
                    <a href="https://sprinter.ai/services" class="button">Learn About Our Approach</a>
                  </center>

                  <p>Have a specific AI challenge in your portfolio? Simply reply to this email – I personally read every response.</p>

                  <p>To your AI transformation,<br>
                  <strong>The Sprinter AI Team</strong></p>
                </div>

                <div class="footer">
                  <p>You're receiving this because you requested the AI Operations Opportunity Scorecard.</p>
                  <p>Sprinter AI | AI Agents That Run Your Operations</p>
                  <p><a href="{unsubscribe_url}">Unsubscribe</a> | <a href="https://sprinterai.com/privacy">Privacy Policy</a></p>
                </div>
              </div>
            </body>
          </html>
        `,
        tags: [
          { name: "category", value: "newsletter" },
          { name: "lead_magnet", value: leadMagnet || "none" },
          { name: "source", value: source || "website" }
        ]
      })

      // Log subscription for analytics
      console.log("Newsletter subscription successful:", { email, leadMagnet, source })

    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully! Check your email for the scorecard.",
      downloadUrl: leadMagnet ? LEAD_MAGNETS[leadMagnet as keyof typeof LEAD_MAGNETS]?.url : null
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    )
  }
}