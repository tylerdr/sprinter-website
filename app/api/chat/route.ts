/**
 * Chat API endpoint - AI Sprinter Foundation
 * Supports agents with tools, streaming, and persistence
 */

import { NextRequest } from "next/server";
import { 
  streamText,
  convertToModelMessages, 
  stepCountIs,
  UIMessage 
} from "ai";
import { rateLimit, rateLimitResponse } from '@/lib/middleware/rate-limit';
import { AgentManager } from '@/lib/agents/manager';
import { nanoid } from 'nanoid';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

type Body = {
  id?: string;            // chatId (threadId)
  messages: UIMessage[];  // UI messages from useChat
  agentId?: string;       // Selected agent (optional, defaults to customer-support)
  context?: {
    isAdmin?: boolean;
    pageContext?: {
      url: string;
      title: string;
      section?: string;
    };
    userProfile?: {
      email?: string;
      role?: string;
    };
  };
};

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const { success, reset } = await rateLimit(req, 'chat')
  if (!success) {
    return rateLimitResponse(reset)
  }

  try {
    const body = (await req.json()) as Body;
    const { messages, agentId = "customer-support", context = {} } = body;

    // Create agent context
    const agentContext = {
      threadId: body.id || nanoid(),
      agentId,
      isAdmin: context.isAdmin || false,
      pageContext: context.pageContext,
      userProfile: context.userProfile,
      userId: context.userProfile?.email,
    };

    // Initialize agent manager
    const agentManager = new AgentManager(agentContext);

    // Stream the response using the agent manager
    const result = await agentManager.streamResponse(messages);

    // Return UI message stream response
    return result.toTextStreamResponse();
    
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response for errors
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}