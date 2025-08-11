import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // For now, return a simple response
    // In production, this would call OpenAI/Claude API
    const responses = [
      "That's a great question! Based on your industry, AI can help automate repetitive tasks and improve decision-making. Would you like to explore specific use cases?",
      "We typically see 30-50% efficiency improvements in the first 90 days. The key is starting with high-impact, low-complexity automations. What's your biggest time sink right now?",
      "Our 10-day sprint would be perfect for that. We'd build a working prototype that your team can test immediately. Want to see some similar case studies?",
      "AI excels at pattern recognition, data processing, and generating content. The best approach is augmenting your team's capabilities, not replacing them. What tasks take the most time for your team?",
      "Great question! We focus on practical AI that ships quickly. No lengthy consulting engagements - just working code in 10 days. What specific challenge would you want to tackle first?"
    ];

    // Simple response selection based on message count
    const responseIndex = Math.min(messages.length - 1, responses.length - 1);
    const response = responses[responseIndex];

    return NextResponse.json({ text: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}