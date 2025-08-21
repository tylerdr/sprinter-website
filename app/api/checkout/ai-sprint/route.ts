import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const priceId = formData.get("priceId") as string
    
    if (!process.env.STRIPE_SECRET_KEY) {
      // If Stripe is not configured, redirect to contact form
      return NextResponse.redirect(new URL("/contact?product=ai-sprint", request.url))
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI Opportunity Sprint",
              description: "5-day AI implementation sprint for Private Equity firms. Includes custom AI strategy, working prototype, and implementation roadmap.",
              images: ["https://sprinter.ai/images/ai-sprint-product.png"],
            },
            unit_amount: 250000, // $2,500 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/ai-sprint/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/ai-sprint`,
      metadata: {
        product: "ai-sprint",
        source: "website",
      },
      customer_email: undefined, // Will be collected in checkout
      allow_promotion_codes: true,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR"],
      },
      custom_fields: [
        {
          key: "company_name",
          label: {
            type: "custom",
            custom: "Company Name",
          },
          type: "text",
        },
        {
          key: "preferred_focus",
          label: {
            type: "custom",
            custom: "Preferred Sprint Focus",
          },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: "Deal Sourcing & Market Analysis",
                value: "deal_sourcing",
              },
              {
                label: "Due Diligence Automation",
                value: "due_diligence",
              },
              {
                label: "Portfolio Operations",
                value: "portfolio_ops",
              },
              {
                label: "Value Creation Strategy",
                value: "value_creation",
              },
              {
                label: "Other (we'll discuss)",
                value: "other",
              },
            ],
          },
        },
      ],
    })

    // Redirect to Stripe checkout
    return NextResponse.redirect(session.url!, { status: 303 })
    
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.redirect(
      new URL("/ai-sprint?error=checkout_failed", request.url),
      { status: 303 }
    )
  }
}