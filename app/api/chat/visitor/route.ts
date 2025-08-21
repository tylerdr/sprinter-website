import { NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { createClient } from "@/lib/supabase/server"

// System prompt for the PE-focused chat assistant
const SYSTEM_PROMPT = `You are an AI assistant for Sprinter AI, specializing in helping private equity firms leverage AI for competitive advantage.

Key Information:
- We offer a FREE AI Readiness Assessment that takes 10 minutes and delivers a report in 24 hours
- Our 5-Day AI Sprint delivers a working AI prototype with 100% satisfaction guarantee
- Our AI Partnership Program provides ongoing AI innovation for $5-10K/month
- 40% of PE firms already have AI strategies - we help firms not get left behind
- AI can reduce due diligence time by 80% and find 3x more deals

Your role:
1. Be helpful, concise, and focused on value
2. Understand their PE/investment challenges
3. Guide them toward our funnel: Assessment → Sprint → Partnership
4. If they ask about pricing: Assessment is FREE, Sprint pricing available on request, Partnership starts at $5K/month
5. If they want to talk to someone: Offer to schedule a call or provide contact (hello@sprinter.ai, +1 615-601-0782)
6. Focus on ROI and quick wins - PE firms care about returns
7. Use stats and examples when relevant

Never:
- Be pushy or salesy
- Make up information
- Promise specific results without context
- Discuss competitors negatively

Always end with a clear next step or question to keep engagement.`

export async function POST(request: NextRequest) {
  try {
    const { messages, email, metadata } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    // Track conversation in database if email provided
    if (email) {
      const supabase = await createClient()
      await supabase.from("chat_conversations").insert({
        email,
        messages: messages,
        metadata,
        created_at: new Date().toISOString(),
      })
    }

    // Prepare conversation history
    const conversationHistory = messages.map((msg: any) => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n')

    // Get AI response
    const { text: aiResponse } = await generateText({
      model: openai("gpt-5"),
      temperature: 0.7,
      maxRetries: 2,
      system: SYSTEM_PROMPT,
      prompt: conversationHistory + "\nAssistant:",
    })

    // Detect intent for lead scoring
    const lastUserMessage = messages[messages.length - 1]?.content || ""
    const intent = detectIntent(lastUserMessage, aiResponse)

    // Save lead activity if high intent
    if (email && intent.score > 0.7) {
      const supabase = await createClient()
      await supabase.from("lead_activities").insert({
        email,
        activity_type: "chat_high_intent",
        intent_score: intent.score,
        intent_type: intent.type,
        message: lastUserMessage,
        created_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      message: aiResponse,
      intent,
      suggestedActions: getSuggestedActions(intent),
    })

  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    )
  }
}

function detectIntent(userMessage: string, aiResponse: string): {
  score: number
  type: string
} {
  const message = userMessage.toLowerCase()
  
  // High intent keywords
  const highIntentPatterns = [
    { pattern: /pricing|cost|how much|price/i, type: "pricing_inquiry", score: 0.9 },
    { pattern: /schedule|meeting|call|talk|speak|demo/i, type: "meeting_request", score: 0.95 },
    { pattern: /sprint|assessment|partnership|program/i, type: "product_interest", score: 0.85 },
    { pattern: /portfolio|deal|due diligence|sourcing/i, type: "pe_specific", score: 0.8 },
    { pattern: /implement|start|begin|ready|how do/i, type: "ready_to_start", score: 0.9 },
    { pattern: /roi|return|value|save|cost saving/i, type: "roi_focused", score: 0.75 },
  ]

  for (const { pattern, type, score } of highIntentPatterns) {
    if (pattern.test(message)) {
      return { score, type }
    }
  }

  // Medium intent
  if (/ai|artificial intelligence|automation|ml|machine learning/i.test(message)) {
    return { score: 0.5, type: "ai_curious" }
  }

  // Low intent
  return { score: 0.3, type: "general_inquiry" }
}

function getSuggestedActions(intent: { score: number; type: string }): string[] {
  const actions = []

  if (intent.score > 0.8) {
    actions.push("Offer to schedule a call immediately")
    actions.push("Send AI Sprint information")
  }

  if (intent.type === "pricing_inquiry") {
    actions.push("Share pricing transparently")
    actions.push("Emphasize ROI and guarantees")
  }

  if (intent.type === "meeting_request") {
    actions.push("Provide calendar link")
    actions.push("Offer immediate phone call")
  }

  if (intent.type === "pe_specific") {
    actions.push("Share PE case studies")
    actions.push("Mention specific PE use cases")
  }

  if (intent.score > 0.5) {
    actions.push("Suggest free AI assessment")
  }

  return actions
}