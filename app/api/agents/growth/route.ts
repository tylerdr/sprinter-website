import { NextRequest, NextResponse } from "next/server"
import { runGrowthAgent } from "@/lib/agents/growth-marketing-agent"
import { withRateLimit } from '@/lib/rate-limit'

// This route can be called by a cron job (e.g., Vercel Cron, GitHub Actions, or external service)
async function handlePOST(request: NextRequest) {
  try {
    // Verify the request is authorized (simple token check)
    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.AGENT_SECRET_TOKEN
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Run the growth agent
    console.log("🚀 Starting Growth Marketing Agent...")
    await runGrowthAgent()
    
    return NextResponse.json({
      success: true,
      message: "Growth Marketing Agent completed successfully",
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error("Growth Agent API error:", error)
    return NextResponse.json(
      { 
        error: "Failed to run growth agent",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

// Apply rate limiting with stricter limits for AI endpoints (5 requests per minute)
export const POST = withRateLimit(handlePOST, {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: "ready",
    agent: "growth-marketing",
    version: "1.0.0"
  })
}