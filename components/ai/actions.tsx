"use server";

import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText, CoreMessage } from "ai";

export async function continueConversation(messages: CoreMessage[]) {
  const result = await generateText({
    model: openai("gpt-4-turbo"),
    messages,
    system: `You are a helpful AI assistant for Sprinter AI. 
    Focus on practical AI solutions that can be implemented quickly.
    Be concise and action-oriented.`,
    temperature: 0.7,
    maxTokens: 500,
  });

  return {
    messages: [
      ...messages,
      {
        role: "assistant" as const,
        content: result.text,
      },
    ],
    newMessage: result.text,
  };
}

export async function generateUIComponent({
  prompt,
  framework = "react",
  style = "minimal",
  responsive = true,
  typescript = false,
  creativity = 0.5,
}: {
  prompt: string;
  framework?: string;
  style?: string;
  responsive?: boolean;
  typescript?: boolean;
  creativity?: number;
}) {
  const systemPrompt = `You are an expert UI developer specializing in ${framework} components.
Generate production-ready, accessible, and performant code.
Style preference: ${style}
${responsive ? "Make it fully responsive." : ""}
${typescript ? "Use TypeScript." : ""}
Creativity level: ${creativity * 100}%`;

  const userPrompt = `Create a ${framework} component based on this description:
${prompt}

Requirements:
1. Use modern best practices
2. Include proper accessibility attributes
3. Add hover states and transitions
4. Use semantic HTML
5. Include inline styles or CSS-in-JS (no external CSS files)
6. Make it visually appealing with the ${style} aesthetic

Return ONLY the component code, no explanations.`;

  try {
    const model = creativity > 0.7 
      ? anthropic("claude-3-opus-20240229") 
      : openai("gpt-4");
    
    const response = await generateText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3 + (creativity * 0.7),
    });

    return {
      code: response.text,
      framework,
      style,
      v0Url: `https://v0.dev/t/${encodeURIComponent(prompt.slice(0, 100))}-${framework}`,
      metadata: {
        model: creativity > 0.7 ? "claude-3-opus" : "gpt-4",
        temperature: 0.3 + (creativity * 0.7),
        timestamp: Date.now(),
      },
    };
  } catch (error) {
    console.error("Component generation failed:", error);
    throw error;
  }
}