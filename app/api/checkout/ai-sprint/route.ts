import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/config";
import { createAdminClient } from "@/lib/supabase/server";
import { SYSTEM_USER_ID } from "@/lib/constants";

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
      const supabase = await createAdminClient();
      const timestamp = new Date().toISOString();

      const { data: leadRecord, error: upsertError } = await supabase
        .from("leads")
        .upsert(
          {
            email,
            source: "sprint_checkout_intent",
            source_page: "/ai-sprint",
            lifecycle_stage: "opportunity",
            metadata: {
              checkout_initiated: timestamp,
              ...metadata,
            },
          },
          {
            onConflict: "email",
          }
        )
        .select("id, lead_score")
        .single();

      if (upsertError) {
        console.error("Failed to upsert lead for sprint checkout", upsertError);
      }

      const leadId = leadRecord?.id ?? null;
      const previousScore = leadRecord?.lead_score ?? 0;
      const targetScore = Math.max(previousScore, 50);

      if (leadId && targetScore !== previousScore) {
        const { error: updateError } = await supabase
          .from("leads")
          .update({ lead_score: targetScore, updated_at: timestamp })
          .eq("id", leadId);

        if (updateError) {
          console.error("Failed to update lead score", updateError);
        }
      }

      const toolMetadata = {
        event: "sprint_checkout_initiated",
        leadEmail: email,
        leadId,
        source: "ai-sprint",
        previousScore,
        newScore: targetScore,
        timestamp,
        checkoutMetadata: metadata,
      };

      const { error: toolEventError } = await supabase
        .from("ai_tool_events")
        .insert({
          tool_slug: "lead-scoring.checkout",
          user_id: SYSTEM_USER_ID,
          input: {
            reason: "checkout_initiated",
            metadata,
          },
          output: {
            score: targetScore,
            previousScore,
            delta: targetScore - previousScore,
          },
          metadata: toolMetadata,
        });

      if (toolEventError) {
        console.error("Failed to track lead scoring tool event", toolEventError);
      }

      if (leadId) {
        const { error: activityError } = await supabase
          .from("lead_activities")
          .insert({
            lead_id: leadId,
            activity_type: "note_added",
            description: "Lead score updated after sprint checkout intent",
            metadata: {
              workflowSlug: "lead-scoring.checkout",
              previousScore,
              newScore: targetScore,
              recordedAt: timestamp,
            },
          });

        if (activityError) {
          console.error("Failed to log lead activity for scoring event", activityError);
        }
      }
    }
    
    try {
      // Create Stripe checkout session (default to 1-week sprint)
      const session = await createCheckoutSession(
        "SPRINT_1_WEEK",
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
