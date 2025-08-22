import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Get form data if any
    const contentType = request.headers.get("content-type");
    let email: string | undefined;
    let metadata: Record<string, string> = {};
    
    if (contentType?.includes("application/json")) {
      const body = await request.json();
      email = body.email;
      metadata = body.metadata || {};
    } else if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      email = formData.get("email") as string | undefined;
      // Collect any metadata from form
      formData.forEach((value, key) => {
        if (key !== "email" && typeof value === "string") {
          metadata[key] = value;
        }
      });
    }

    // Track intent in Supabase before redirect
    if (email) {
      const supabase = await createClient();
      await supabase.from("leads").upsert({
        email,
        source: "sprint_checkout_intent",
        source_page: "/ai-sprint",
        lifecycle_stage: "opportunity",
        metadata: {
          checkout_initiated: new Date().toISOString(),
          ...metadata,
        },
      }, {
        onConflict: "email",
      });

      // Add high-value lead scoring event
      await supabase.from("lead_scoring_events").insert({
        lead_id: (await supabase.from("leads").select("id").eq("email", email).single()).data?.id,
        event_type: "checkout_initiated",
        event_value: 50, // High score for checkout intent
        event_data: {
          product: "ai_sprint",
          value: 50000,
        },
      });
    }
    
    try {
      // Create Stripe checkout session
      const session = await createCheckoutSession(
        "AI_SPRINT",
        {
          ...metadata,
          utm_source: request.headers.get("referer") || "direct",
        },
        email
      );

      // Redirect to Stripe checkout
      return NextResponse.redirect(session.url!, { status: 303 });
      
    } catch (stripeError) {
      console.error("Stripe checkout error:", stripeError);
      
      // If Stripe is not configured or fails, redirect to contact form
      const contactUrl = new URL("/contact", request.url);
      contactUrl.searchParams.set("product", "ai-sprint");
      contactUrl.searchParams.set("intent", "purchase");
      if (email) contactUrl.searchParams.set("email", email);
      
      return NextResponse.redirect(contactUrl, { status: 303 });
    }
    
  } catch (error) {
    console.error("Checkout error:", error);
    
    // Redirect back with error
    const errorUrl = new URL("/ai-sprint", request.url);
    errorUrl.searchParams.set("error", "checkout_failed");
    
    return NextResponse.redirect(errorUrl, { status: 303 });
  }
}