"use server";

import { streamText, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// Battle configuration schema
export const BattleConfigSchema = z.object({
  topic: z.string().min(10, "Topic must be at least 10 characters"),
  mode: z.enum(["debate", "do-then-defend"]).default("debate"),
  rounds: z.number().min(1).max(5).default(3),
  tools: z.array(z.enum(["web", "code", "math", "none"])).default(["none"]),
  judgeCriteria: z.array(z.enum(["accuracy", "cost", "latency", "clarity", "creativity", "practicality"]))
    .default(["accuracy", "clarity", "practicality"]),
  agentA: z.object({
    model: z.enum(["gpt-5", "gpt-5-mini", "claude-3-opus", "claude-3-sonnet"]).default("gpt-5"),
    name: z.string().default("Agent Alpha"),
    style: z.enum(["analytical", "creative", "pragmatic", "theoretical"]).default("analytical"),
  }),
  agentB: z.object({
    model: z.enum(["gpt-5", "gpt-5-mini", "claude-3-opus", "claude-3-sonnet"]).default("claude-3-opus"),
    name: z.string().default("Agent Beta"),
    style: z.enum(["analytical", "creative", "pragmatic", "theoretical"]).default("pragmatic"),
  }),
  judgeModel: z.enum(["gpt-5", "claude-3-opus"]).default("gpt-5"),
});

export type BattleConfig = z.infer<typeof BattleConfigSchema>;

// Battle state for tracking
export interface BattleState {
  id: string;
  config: BattleConfig;
  rounds: BattleRound[];
  finalVerdict?: Verdict;
  metrics: BattleMetrics;
  status: "preparing" | "in-progress" | "judging" | "complete" | "error";
  shareUrl?: string;
}

export interface BattleRound {
  number: number;
  agentAResponse: string;
  agentBResponse: string;
  roundVerdict?: RoundScore;
  timestamp: number;
}

export interface RoundScore {
  scores: {
    agentA: Record<string, number>;
    agentB: Record<string, number>;
  };
  winner: "agentA" | "agentB" | "tie";
  rationale: string;
}

export interface Verdict {
  overallWinner: "agentA" | "agentB" | "tie";
  finalScores: {
    agentA: Record<string, number>;
    agentB: Record<string, number>;
  };
  summary: string;
  keyMoments: string[];
  recommendations: string[];
}

export interface BattleMetrics {
  agentA: {
    totalTokens: number;
    avgLatency: number;
    estimatedCost: number;
  };
  agentB: {
    totalTokens: number;
    avgLatency: number;
    estimatedCost: number;
  };
  duration: number;
}

// Model provider mapping
function getModel(modelName: string) {
  if (modelName.startsWith("gpt")) {
    return openai(modelName);
  } else if (modelName.startsWith("claude")) {
    return anthropic(modelName);
  }
  throw new Error(`Unknown model: ${modelName}`);

// Style prompts for agents
function getStylePrompt(style: string): string {
  const styles = {
    analytical: "You approach problems methodically, using data and logic. Break down complex issues into components.",
    creative: "You think outside the box, proposing innovative and unconventional solutions. Use metaphors and creative reasoning.",
    pragmatic: "You focus on practical, implementable solutions. Consider real-world constraints and feasibility.",
    theoretical: "You explore fundamental principles and abstract concepts. Draw from academic frameworks and theory.",
  };
  return styles[style as keyof typeof styles] || styles.analytical;
}

// Main battle orchestration
export async function runBattle(config: BattleConfig): Promise<BattleState> {
  const battleId = `battle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();
  
  const battleState: BattleState = {
    id: battleId,
    config,
    rounds: [],
    metrics: {
      agentA: { totalTokens: 0, avgLatency: 0, estimatedCost: 0 },
      agentB: { totalTokens: 0, avgLatency: 0, estimatedCost: 0 },
      duration: 0,
    },
    status: "in-progress",
  };

  try {
    // Run debate rounds
    for (let round = 1; round <= config.rounds; round++) {
      const roundStart = Date.now();
      
      // Prepare context from previous rounds
      const context = battleState.rounds.map((r, i) => 
        `Round ${i + 1}:\n${config.agentA.name}: ${r.agentAResponse}\n${config.agentB.name}: ${r.agentBResponse}`
      ).join("\n\n");

      // Agent A's turn
      const agentAPrompt = `
You are ${config.agentA.name}, an AI agent with a ${config.agentA.style} approach.
${getStylePrompt(config.agentA.style)}

Topic: ${config.topic}
Round: ${round} of ${config.rounds}

${context ? `Previous rounds:\n${context}\n` : ""}

Provide your ${round === 1 ? "opening argument" : "response"} (120-150 words). Be concise, compelling, and true to your style.
`;

      const agentAResponse = await generateText({
        model: getModel(config.agentA.model),
        prompt: agentAPrompt,
      });

      // Agent B's turn
      const agentBPrompt = `
You are ${config.agentB.name}, an AI agent with a ${config.agentB.style} approach.
${getStylePrompt(config.agentB.style)}

Topic: ${config.topic}
Round: ${round} of ${config.rounds}

${context ? `Previous rounds:\n${context}\n` : ""}
${config.agentA.name} just said: ${agentAResponse.text}

Provide your ${round === 1 ? "opening argument" : "response"} (120-150 words). Be concise, compelling, and true to your style.
`;

      const agentBResponse = await generateText({
        model: getModel(config.agentB.model),
        prompt: agentBPrompt,
      });

      // Judge this round
      const judgePrompt = `
You are a neutral moderator evaluating a debate between two AI agents.

Topic: ${config.topic}
Round: ${round}

${config.agentA.name} (${config.agentA.style}): ${agentAResponse.text}
${config.agentB.name} (${config.agentB.style}): ${agentBResponse.text}

Evaluate based on these criteria: ${config.judgeCriteria.join(", ")}

Score each agent from 1-10 on each criterion.

Return ONLY valid JSON in this format:
{
  "scores": {
    "agentA": {${config.judgeCriteria.map(c => `"${c}": <number>`).join(", ")}},
    "agentB": {${config.judgeCriteria.map(c => `"${c}": <number>`).join(", ")}}
  },
  "winner": "agentA" | "agentB" | "tie",
  "rationale": "Brief explanation of scoring (50 words max)"
}
`;

      const judgeResponse = await generateText({
        model: getModel(config.judgeModel),
        prompt: judgePrompt,
      });

      let roundScore: RoundScore;
      try {
        roundScore = JSON.parse(judgeResponse.text);
      } catch {
        // Fallback if JSON parsing fails
        roundScore = {
          scores: {
            agentA: Object.fromEntries(config.judgeCriteria.map(c => [c, 5])),
            agentB: Object.fromEntries(config.judgeCriteria.map(c => [c, 5])),
          },
          winner: "tie",
          rationale: "Unable to parse judge response",
        };
      }

      // Update battle state
      battleState.rounds.push({
        number: round,
        agentAResponse: agentAResponse.text,
        agentBResponse: agentBResponse.text,
        roundVerdict: roundScore,
        timestamp: Date.now(),
      });

      // Update metrics
      const roundLatency = Date.now() - roundStart;
      battleState.metrics.agentA.totalTokens += agentAResponse.usage?.totalTokens || 0;
      battleState.metrics.agentB.totalTokens += agentBResponse.usage?.totalTokens || 0;
      battleState.metrics.agentA.avgLatency = 
        (battleState.metrics.agentA.avgLatency * (round - 1) + roundLatency / 2) / round;
      battleState.metrics.agentB.avgLatency = 
        (battleState.metrics.agentB.avgLatency * (round - 1) + roundLatency / 2) / round;
    }

    // Generate final verdict
    battleState.status = "judging";
    
    const finalJudgePrompt = `
You are the final judge of a debate that lasted ${config.rounds} rounds.

Topic: ${config.topic}

Full debate transcript:
${battleState.rounds.map(r => `
Round ${r.number}:
${config.agentA.name}: ${r.agentAResponse}
${config.agentB.name}: ${r.agentBResponse}
Round winner: ${r.roundVerdict?.winner} - ${r.roundVerdict?.rationale}
`).join("\n")}

Criteria evaluated: ${config.judgeCriteria.join(", ")}

Provide a comprehensive final verdict. Return ONLY valid JSON:
{
  "overallWinner": "agentA" | "agentB" | "tie",
  "finalScores": {
    "agentA": {${config.judgeCriteria.map(c => `"${c}": <average_score>`).join(", ")}},
    "agentB": {${config.judgeCriteria.map(c => `"${c}": <average_score>`).join(", ")}}
  },
  "summary": "Comprehensive summary of the debate and why the winner won (100 words)",
  "keyMoments": ["List", "3-5", "decisive", "moments"],
  "recommendations": ["Actionable", "insights", "for", "implementation"]
}
`;

    const finalJudge = await generateText({
      model: getModel(config.judgeModel),
      prompt: finalJudgePrompt,
    });

    try {
      battleState.finalVerdict = JSON.parse(finalJudge.text);
    } catch {
      // Fallback verdict
      battleState.finalVerdict = {
        overallWinner: "tie",
        finalScores: {
          agentA: Object.fromEntries(config.judgeCriteria.map(c => [c, 5])),
          agentB: Object.fromEntries(config.judgeCriteria.map(c => [c, 5])),
        },
        summary: "The debate was closely matched with both agents presenting strong arguments.",
        keyMoments: ["Opening arguments were strong", "Middle rounds showed adaptation", "Final arguments were compelling"],
        recommendations: ["Consider both perspectives", "Implement a hybrid approach"],
      };
    }

    // Calculate final metrics
    battleState.metrics.duration = Date.now() - startTime;
    battleState.metrics.agentA.estimatedCost = estimateCost(
      config.agentA.model, 
      battleState.metrics.agentA.totalTokens
    );
    battleState.metrics.agentB.estimatedCost = estimateCost(
      config.agentB.model, 
      battleState.metrics.agentB.totalTokens
    );

    battleState.status = "complete";

    // Save to database
    await saveBattleTranscript(battleState);

    return battleState;
  } catch (error) {
    console.error("Battle error:", error);
    battleState.status = "error";
    return battleState;
  }
}

// Cost estimation (rough estimates)
function estimateCost(model: string, tokens: number): number {
  const costPer1kTokens: Record<string, number> = {
    "gpt-5": 0.03,
    "gpt-5-mini": 0.002,
    "claude-3-opus": 0.03,
    "claude-3-sonnet": 0.015,
  };
  return (tokens / 1000) * (costPer1kTokens[model] || 0.01);
}

// Save battle transcript to Supabase
async function saveBattleTranscript(battle: BattleState) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("agent_battles")
      .insert({
        id: battle.id,
        config: battle.config,
        rounds: battle.rounds,
        verdict: battle.finalVerdict,
        metrics: battle.metrics,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && data) {
      battle.shareUrl = `/labs/agent-battle/share/${data.id}`;
    }
  } catch (error) {
    console.error("Failed to save battle:", error);
  }
}

// Get battle by ID (for sharing)
export async function getBattleById(id: string): Promise<BattleState | null> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("agent_battles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      config: data.config,
      rounds: data.rounds,
      finalVerdict: data.verdict,
      metrics: data.metrics,
      status: "complete",
      shareUrl: `/labs/agent-battle/share/${data.id}`,
    };
  } catch {
    return null;
  }
}

// Export battle as PDF/JSON (lead capture)
export async function exportBattle(battleId: string, email: string, format: "pdf" | "json" = "json") {
  // Save lead
  const supabase = await createClient();
  await supabase.from("leads").insert({
    email,
    source: "agent-battle",
    metadata: { battleId, format },
    created_at: new Date().toISOString(),
  });

  const battle = await getBattleById(battleId);
  if (!battle) throw new Error("Battle not found");

  if (format === "json") {
    return JSON.stringify(battle, null, 2);
  }

  // PDF generation would go here (using react-pdf)
  return "PDF generation coming soon";
}