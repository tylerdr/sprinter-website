/**
 * Chat API endpoint - AI Sprinter Foundation
 * Supports agents with tools, streaming, and persistence
 */

import { NextRequest } from "next/server";
import { openai } from '@ai-sdk/openai';
import { 
  streamText,
  convertToModelMessages, 
  stepCountIs,
  UIMessage 
} from "ai";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

type Body = {
  id?: string;            // chatId (threadId)
  messages: UIMessage[];  // UI messages from useChat
  agentId?: string;       // Selected agent (optional, defaults to basic)
  workspaceId?: string;   // Optional workspace scope
  tenantId?: string;      // Tenant ID for multi-tenancy
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const { messages, agentId = "default" } = body;

    // For now, use a simple default agent configuration
    // In production, load from database based on agentId
    const agentConfig = {
      model: openai('gpt-4o-mini'),
      system: `You are a helpful AI assistant for Sprinter AI, specializing in AI Operating Partner services for Private Equity.
      Focus on practical, 30-45 day implementations with clear acceptance criteria.
      Emphasize AP automation, Quote Intelligence, and 3PL operations.
      Be concise, action-oriented, and governance-focused.`,
      temperature: 0.7,
      maxRetries: 2,
      // Add tools here when implemented
      // tools: await buildToolsetForAgent(agentId),
    };

    // Stream the response
    const result = streamText({
      ...agentConfig,
      messages: convertToModelMessages(messages),
      // Control multi-step loops
      stopWhen: stepCountIs(4),
    });

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