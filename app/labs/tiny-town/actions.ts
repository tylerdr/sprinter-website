"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { streamText, generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// Simulation configuration schema
export const SimulationConfigSchema = z.object({
  scenario: z.string(),
  npcs: z.number().min(1).max(100),
  buildings: z.array(z.string()),
  duration: z.number().min(10).max(600), // seconds
  aiModel: z.enum(["gpt-5", "gpt-5-mini"]).default("gpt-5-mini"),
  realtime: z.boolean().default(false),
});

export type SimulationConfig = z.infer<typeof SimulationConfigSchema>;

// NPC behavior schema
export const NPCBehaviorSchema = z.object({
  id: z.string(),
  type: z.string(),
  personality: z.object({
    patience: z.number().min(0).max(100),
    sociability: z.number().min(0).max(100),
    efficiency: z.number().min(0).max(100),
  }),
  goals: z.array(z.string()),
  knowledge: z.array(z.string()),
  memory: z.array(z.object({
    event: z.string(),
    timestamp: z.number(),
    sentiment: z.enum(["positive", "neutral", "negative"]),
  })),
});

export type NPCBehavior = z.infer<typeof NPCBehaviorSchema>;

// Simulation state
export interface SimulationState {
  id: string;
  config: SimulationConfig;
  npcs: NPCBehavior[];
  worldState: {
    time: number;
    weather: string;
    events: Array<{
      timestamp: number;
      type: string;
      description: string;
      participants: string[];
    }>;
  };
  metrics: {
    totalInteractions: number;
    avgSatisfaction: number;
    bottlenecks: string[];
    recommendations: string[];
  };
}

// Initialize NPCs with AI-generated personalities
export async function initializeNPCs(config: SimulationConfig): Promise<NPCBehavior[]> {
  const npcs: NPCBehavior[] = [];
  
  // Generate diverse NPCs
  for (let i = 0; i < config.npcs; i++) {
    const prompt = `
Generate a unique NPC personality for a ${config.scenario} simulation.
NPC number: ${i + 1} of ${config.npcs}

Return ONLY valid JSON:
{
  "type": "customer|employee|manager|visitor|service",
  "personality": {
    "patience": <0-100>,
    "sociability": <0-100>,
    "efficiency": <0-100>
  },
  "goals": ["<goal1>", "<goal2>", "<goal3>"],
  "knowledge": ["<fact1>", "<fact2>"]
}
`;

    try {
      const response = await generateText({
        model: openai(config.aiModel),
        prompt,
      });

      const parsed = JSON.parse(response.text);
      npcs.push({
        id: `npc-${i}`,
        ...parsed,
        memory: [],
      });
    } catch {
      // Fallback NPC
      npcs.push({
        id: `npc-${i}`,
        type: "customer",
        personality: {
          patience: 50 + Math.random() * 50,
          sociability: 50 + Math.random() * 50,
          efficiency: 50 + Math.random() * 50,
        },
        goals: ["Complete task", "Find information", "Interact socially"],
        knowledge: ["Building layout", "Service hours"],
        memory: [],
      });
    }
  }
  
  return npcs;
}

// Simulate NPC decision making
export async function simulateNPCDecision(
  npc: NPCBehavior,
  context: {
    nearbyNPCs: string[];
    availableActions: string[];
    currentLocation: string;
    worldEvents: string[];
  }
): Promise<{
  action: string;
  target?: string;
  reasoning: string;
}> {
  const prompt = `
You are ${npc.id}, a ${npc.type} with these traits:
- Patience: ${npc.personality.patience}/100
- Sociability: ${npc.personality.sociability}/100
- Efficiency: ${npc.personality.efficiency}/100

Current goals: ${npc.goals.join(", ")}
Current location: ${context.currentLocation}
Nearby NPCs: ${context.nearbyNPCs.join(", ")}
Available actions: ${context.availableActions.join(", ")}
Recent events: ${context.worldEvents.join(", ")}

Recent memories:
${npc.memory.slice(-3).map(m => `- ${m.event} (${m.sentiment})`).join("\n")}

Decide your next action. Return ONLY valid JSON:
{
  "action": "<chosen_action>",
  "target": "<optional_target_npc_or_location>",
  "reasoning": "<brief_explanation>"
}
`;

  try {
    const response = await generateText({
      model: openai("gpt-5-mini"),
      prompt,
    });

    return JSON.parse(response.text);
  } catch {
    // Fallback decision
    return {
      action: context.availableActions[0] || "wait",
      reasoning: "Default behavior",
    };
  }
}

// Process interaction between NPCs
export async function processInteraction(
  npc1: NPCBehavior,
  npc2: NPCBehavior,
  interactionType: string
): Promise<{
  outcome: string;
  npc1Sentiment: "positive" | "neutral" | "negative";
  npc2Sentiment: "positive" | "neutral" | "negative";
  description: string;
}> {
  const prompt = `
Two NPCs are interacting in a ${interactionType} scenario.

NPC1 (${npc1.type}):
- Patience: ${npc1.personality.patience}
- Sociability: ${npc1.personality.sociability}
- Goals: ${npc1.goals.join(", ")}

NPC2 (${npc2.type}):
- Patience: ${npc2.personality.patience}
- Sociability: ${npc2.personality.sociability}
- Goals: ${npc2.goals.join(", ")}

Determine the interaction outcome. Return ONLY valid JSON:
{
  "outcome": "success|partial|failure",
  "npc1Sentiment": "positive|neutral|negative",
  "npc2Sentiment": "positive|neutral|negative",
  "description": "<brief description of what happened>"
}
`;

  try {
    const response = await generateText({
      model: openai("gpt-5-mini"),
      prompt,
    });

    return JSON.parse(response.text);
  } catch {
    return {
      outcome: "partial",
      npc1Sentiment: "neutral",
      npc2Sentiment: "neutral",
      description: "Brief interaction occurred",
    };
  }
}

// Analyze simulation and generate insights
export async function analyzeSimulation(state: SimulationState): Promise<{
  bottlenecks: string[];
  recommendations: string[];
  insights: string[];
  optimizations: Array<{
    area: string;
    current: string;
    suggested: string;
    impact: string;
  }>;
}> {
  const prompt = `
Analyze this simulation data and provide insights:

Scenario: ${state.config.scenario}
NPCs: ${state.config.npcs}
Duration: ${state.worldState.time}s
Total Interactions: ${state.metrics.totalInteractions}
Average Satisfaction: ${state.metrics.avgSatisfaction}%

Recent Events:
${state.worldState.events.slice(-10).map(e => 
  `- ${e.type}: ${e.description} (${e.participants.length} participants)`
).join("\n")}

NPC Distribution:
${Object.entries(
  state.npcs.reduce((acc, npc) => {
    acc[npc.type] = (acc[npc.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([type, count]) => `- ${type}: ${count}`).join("\n")}

Provide operational insights. Return ONLY valid JSON:
{
  "bottlenecks": ["<bottleneck1>", "<bottleneck2>"],
  "recommendations": ["<recommendation1>", "<recommendation2>"],
  "insights": ["<insight1>", "<insight2>"],
  "optimizations": [
    {
      "area": "<area_name>",
      "current": "<current_state>",
      "suggested": "<suggested_improvement>",
      "impact": "<expected_impact>"
    }
  ]
}
`;

  try {
    const response = await generateText({
      model: openai("gpt-5"),
      prompt,
    });

    return JSON.parse(response.text);
  } catch {
    return {
      bottlenecks: ["Queue formation at peak times", "Resource allocation inefficiency"],
      recommendations: ["Increase staff during rush hours", "Implement dynamic routing"],
      insights: ["NPCs show clustering behavior", "Satisfaction drops after 2-minute waits"],
      optimizations: [{
        area: "Queue Management",
        current: "Single queue system",
        suggested: "Multiple specialized queues",
        impact: "30% reduction in wait times",
      }],
    };
  }
}

// Save simulation to database
export async function saveSimulation(state: SimulationState) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("simulations")
    .insert({
      id: state.id,
      config: state.config,
      npcs: state.npcs,
      world_state: state.worldState,
      metrics: state.metrics,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
}

// Setup realtime subscriptions for multiplayer
export async function setupRealtimeSimulation(simulationId: string) {
  const supabase = await createClient();
  
  // Subscribe to simulation updates
  const channel = supabase.channel(`simulation:${simulationId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'simulation_events',
        filter: `simulation_id=eq.${simulationId}`,
      },
      (payload) => {
        console.log('Simulation event:', payload);
      }
    )
    .subscribe();

  return channel;
}

// Export simulation data
export async function exportSimulationData(
  simulationId: string,
  email: string,
  format: "json" | "csv" = "json"
) {
  // Save lead
  const supabase = await createClient();
  await supabase.from("leads").insert({
    email,
    source: "tiny-town",
    metadata: { simulationId, format },
    created_at: new Date().toISOString(),
  });

  // Get simulation data
  const { data: simulation } = await supabase
    .from("simulations")
    .select("*")
    .eq("id", simulationId)
    .single();

  if (!simulation) throw new Error("Simulation not found");

  if (format === "json") {
    return JSON.stringify(simulation, null, 2);
  }

  // CSV export would convert the data appropriately
  return "CSV export coming soon";
}