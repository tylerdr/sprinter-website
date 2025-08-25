"use server";

import { z } from "zod";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";

// Journey schema
export const JourneySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  nodes: z.array(z.object({
    id: z.string(),
    type: z.enum(["start", "action", "decision", "screen", "touchpoint", "end"]),
    position: z.object({ x: z.number(), y: z.number() }),
    data: z.object({
      label: z.string(),
      description: z.string().optional(),
      metadata: z.record(z.string(), z.any()).optional(),
    }),
  })),
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    label: z.string().optional(),
    type: z.string().optional(),
  })),
});

export type Journey = z.infer<typeof JourneySchema>;

// Generate user journey from prompt
export async function generateUserJourney(prompt: string): Promise<Journey> {
  const systemPrompt = `You are a UX designer creating user journey maps.
Generate a comprehensive user journey based on the given description.
Include various node types: start, action, decision, screen, touchpoint, end.
Create realistic flows with decision points and alternative paths.`;

  const userPrompt = `Create a user journey for: ${prompt}

Return ONLY valid JSON in this format:
{
  "name": "<journey_name>",
  "description": "<brief_description>",
  "nodes": [
    {
      "id": "<unique_id>",
      "type": "start|action|decision|screen|touchpoint|end",
      "position": { "x": <number>, "y": <number> },
      "data": {
        "label": "<node_label>",
        "description": "<optional_description>"
      }
    }
  ],
  "edges": [
    {
      "id": "<unique_id>",
      "source": "<node_id>",
      "target": "<node_id>",
      "label": "<optional_label>"
    }
  ]
}

Create 5-10 nodes with appropriate connections. Space nodes nicely (x: 100-1000, y: 50-400).`;

  try {
    const response = await generateText({
      model: openai("gpt-5"),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const journey = JSON.parse(response.text);
    return JourneySchema.parse(journey);
  } catch (error) {
    console.error("Failed to generate journey:", error);
    
    // Fallback journey
    return {
      name: "Generated Journey",
      description: prompt,
      nodes: [
        { id: "1", type: "start", position: { x: 100, y: 200 }, data: { label: "Start" } },
        { id: "2", type: "action", position: { x: 300, y: 200 }, data: { label: "User Action" } },
        { id: "3", type: "decision", position: { x: 500, y: 200 }, data: { label: "Decision Point" } },
        { id: "4", type: "screen", position: { x: 700, y: 150 }, data: { label: "Success Path" } },
        { id: "5", type: "screen", position: { x: 700, y: 250 }, data: { label: "Alternative Path" } },
        { id: "6", type: "end", position: { x: 900, y: 200 }, data: { label: "Complete" } },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e3-4", source: "3", target: "4", label: "Yes" },
        { id: "e3-5", source: "3", target: "5", label: "No" },
        { id: "e4-6", source: "4", target: "6" },
        { id: "e5-6", source: "5", target: "6" },
      ],
    };
  }
}

// Analyze journey for insights
export async function analyzeJourney(journey: Journey): Promise<{
  insights: string[];
  bottlenecks: string[];
  improvements: string[];
  metrics: {
    complexity: number;
    avgPathLength: number;
    decisionPoints: number;
    touchpoints: number;
  };
}> {
  const prompt = `Analyze this user journey:
${JSON.stringify(journey, null, 2)}

Provide UX insights and recommendations. Return ONLY valid JSON:
{
  "insights": ["<insight1>", "<insight2>", "<insight3>"],
  "bottlenecks": ["<bottleneck1>", "<bottleneck2>"],
  "improvements": ["<improvement1>", "<improvement2>", "<improvement3>"],
  "metrics": {
    "complexity": <1-10>,
    "avgPathLength": <number>,
    "decisionPoints": <count>,
    "touchpoints": <count>
  }
}`;

  try {
    const response = await generateText({
      model: openai("gpt-5-mini"),
      prompt,
    });

    return JSON.parse(response.text);
  } catch {
    // Calculate metrics manually
    const decisionPoints = journey.nodes.filter(n => n.type === "decision").length;
    const touchpoints = journey.nodes.filter(n => n.type === "touchpoint").length;
    
    return {
      insights: [
        "Consider user emotions at each touchpoint",
        "Ensure clear navigation between screens",
        "Minimize cognitive load at decision points",
      ],
      bottlenecks: [
        "Multiple decision points may cause drop-off",
        "Long path from start to completion",
      ],
      improvements: [
        "Add progress indicators for multi-step processes",
        "Provide clear CTAs at each step",
        "Consider adding shortcuts for returning users",
      ],
      metrics: {
        complexity: journey.edges.length > 10 ? 8 : journey.edges.length > 5 ? 5 : 3,
        avgPathLength: journey.nodes.length,
        decisionPoints,
        touchpoints,
      },
    };
  }
}

// Generate wireframe for a screen node
export async function generateWireframe(
  screenName: string,
  context: string
): Promise<{
  elements: Array<{
    type: "header" | "nav" | "content" | "button" | "form" | "image" | "text";
    position: { x: number; y: number };
    size: { width: number; height: number };
    content: string;
    style?: Record<string, string | number>;
  }>;
  layout: string;
  interactions: string[];
}> {
  const prompt = `Design a wireframe for the screen: "${screenName}"
Context: ${context}

Return ONLY valid JSON with UI elements:
{
  "elements": [
    {
      "type": "header|nav|content|button|form|image|text",
      "position": { "x": <0-400>, "y": <0-600> },
      "size": { "width": <50-400>, "height": <20-200> },
      "content": "<element_content>",
      "style": { "background": "<color>", "border": "<style>" }
    }
  ],
  "layout": "single-column|two-column|grid|hero",
  "interactions": ["<interaction1>", "<interaction2>"]
}`;

  try {
    const response = await generateText({
      model: openai("gpt-5-mini"),
      prompt,
    });

    return JSON.parse(response.text);
  } catch {
    // Fallback wireframe
    return {
      elements: [
        {
          type: "header",
          position: { x: 0, y: 0 },
          size: { width: 400, height: 60 },
          content: screenName,
          style: { background: "#f3f4f6" },
        },
        {
          type: "content",
          position: { x: 20, y: 80 },
          size: { width: 360, height: 300 },
          content: "Main content area",
          style: { border: "1px solid #e5e7eb" },
        },
        {
          type: "button",
          position: { x: 150, y: 400 },
          size: { width: 100, height: 40 },
          content: "Continue",
          style: { background: "#3b82f6", color: "white" },
        },
      ],
      layout: "single-column",
      interactions: ["Click continue to proceed", "Scroll for more content"],
    };
  }
}

// Export journey data
export async function exportJourney(
  journey: Journey,
  email: string,
  format: "json" | "pdf" | "figma" = "json"
) {
  // Save lead
  const supabase = await createClient();
  await supabase.from("leads").insert({
    email,
    source: "storyboarding",
    metadata: { 
      journeyName: journey.name,
      nodeCount: journey.nodes.length,
      format,
    },
    created_at: new Date().toISOString(),
  });

  // Save journey to database
  const { data: savedJourney } = await supabase
    .from("user_journeys")
    .insert({
      name: journey.name,
      description: journey.description,
      nodes: journey.nodes,
      edges: journey.edges,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (format === "json") {
    return JSON.stringify(journey, null, 2);
  } else if (format === "figma") {
    // Generate Figma plugin format
    return {
      type: "JOURNEY_MAP",
      name: journey.name,
      frames: journey.nodes.map(node => ({
        id: node.id,
        name: node.data.label,
        type: node.type,
        x: node.position.x,
        y: node.position.y,
        width: 200,
        height: 100,
      })),
      connectors: journey.edges.map(edge => ({
        from: edge.source,
        to: edge.target,
        label: edge.label,
      })),
    };
  }

  // PDF generation would go here
  return "PDF export coming soon";
}

// Simulate journey execution
export async function simulateJourney(
  journey: Journey,
  persona: {
    name: string;
    goals: string[];
    painPoints: string[];
    techSavvy: number; // 1-10
  }
): Promise<{
  path: string[];
  decisions: Array<{ node: string; choice: string; reasoning: string }>;
  painPoints: Array<{ node: string; issue: string; severity: "low" | "medium" | "high" }>;
  successRate: number;
  completionTime: number; // minutes
}> {
  const prompt = `Simulate this user journey for the persona:
Journey: ${JSON.stringify(journey, null, 2)}
Persona: ${JSON.stringify(persona, null, 2)}

Trace the most likely path and identify issues. Return ONLY valid JSON:
{
  "path": ["<node_id1>", "<node_id2>"],
  "decisions": [
    {
      "node": "<decision_node_id>",
      "choice": "<chosen_path>",
      "reasoning": "<why_this_choice>"
    }
  ],
  "painPoints": [
    {
      "node": "<node_id>",
      "issue": "<description>",
      "severity": "low|medium|high"
    }
  ],
  "successRate": <0-100>,
  "completionTime": <minutes>
}`;

  try {
    const response = await generateText({
      model: openai("gpt-5"),
      prompt,
    });

    return JSON.parse(response.text);
  } catch {
    // Fallback simulation
    const path = journey.nodes
      .filter(n => n.type === "start" || n.type === "end")
      .map(n => n.id);

    return {
      path,
      decisions: journey.nodes
        .filter(n => n.type === "decision")
        .map(n => ({
          node: n.id,
          choice: "primary",
          reasoning: "Most common user choice",
        })),
      painPoints: [],
      successRate: 85,
      completionTime: 5,
    };
  }
}

// Save journey to gallery
export async function saveToGallery(
  journey: Journey,
  isPublic: boolean = false,
  userId?: string
) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("journey_gallery")
    .insert({
      name: journey.name,
      description: journey.description,
      nodes: journey.nodes,
      edges: journey.edges,
      is_public: isPublic,
      user_id: userId,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
}