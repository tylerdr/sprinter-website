"use server";

import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { 
  initializeGame, 
  monthTick, 
  buyCompany, 
  sellCompany,
  fireCEO,
  launchOpsProgram,
  addDebtFacility,
  type FundState,
  type GameAction
} from "@/lib/pe-tycoon/engine";

// Game state stored in memory (in production, use database)
const gameStates = new Map<string, FundState>();

export async function startNewGame(sessionId: string): Promise<FundState> {
  const gameState = initializeGame();
  gameStates.set(sessionId, gameState);
  return gameState;
}

export async function getGameState(sessionId: string): Promise<FundState | null> {
  return gameStates.get(sessionId) || null;
}

export async function processGameAction(
  sessionId: string,
  action: GameAction
): Promise<{ success: boolean; state?: FundState; error?: string }> {
  const state = gameStates.get(sessionId);
  if (!state) {
    return { success: false, error: "Game not found" };
  }

  try {
    switch (action.type) {
      case "buy_company":
        buyCompany(state, action.payload);
        break;
      case "sell_company":
        sellCompany(state, action.payload);
        break;
      case "fire_ceo":
        fireCEO(state, action.payload);
        break;
      case "launch_ops_program":
        launchOpsProgram(state, action.payload);
        break;
      case "add_debt":
        addDebtFacility(state, action.payload);
        break;
      case "month_tick":
        monthTick(state);
        break;
      default:
        return { success: false, error: "Unknown action type" };
    }

    gameStates.set(sessionId, state);
    return { success: true, state };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Action failed" 
    };
  }
}

export async function interpretUserIntent(
  userMessage: string,
  gameState: FundState
): Promise<{ 
  intent: string;
  actions: GameAction[];
  response: string;
}> {
  const systemPrompt = `You are the AI assistant for PE Tycoon, a private equity portfolio simulation game.
  
Current game state:
- Fund: ${gameState.fundName}
- AUM: $${gameState.aum.toFixed(1)}B
- Dry Powder: $${gameState.dryPowder.toFixed(1)}B
- Portfolio: ${gameState.portfolio.length} companies
- Month: ${gameState.month}
- Focus Points: ${gameState.focusPoints}/${gameState.maxFocusPoints}
- Macro: ${gameState.macroRegime}

Portfolio companies:
${gameState.portfolio.map(c => 
  `- ${c.name}: ${c.industry}, Rev $${c.revenue.toFixed(1)}M, EBITDA $${(c.ebitda || 0).toFixed(1)}M, Multiple ${c.entryMultiple}x`
).join('\n')}

Available companies to buy:
${gameState.availableCompanies.slice(0, 5).map(c =>
  `- ${c.name}: ${c.industry}, Rev $${c.revenue.toFixed(1)}M, EBITDA $${c.ebitda.toFixed(1)}M, Price $${c.price.toFixed(1)}M`
).join('\n')}

Based on the user's message, determine what game actions they want to take. Be conversational and engaging.
Translate their intent into specific game actions from these options:
- buy_company: Acquire a company (costs focus points)
- sell_company: Exit a portfolio company
- fire_ceo: Replace management (costs focus points)
- launch_ops_program: Start value creation initiative (costs focus points)
- add_debt: Add leverage to a company
- month_tick: Advance time by one month

Return a JSON object with:
- intent: Brief description of what the user wants
- actions: Array of game actions to execute
- response: Engaging narrative response about what's happening`;

  try {
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: systemPrompt,
      prompt: `User message: "${userMessage}"
      
Respond with a JSON object containing intent, actions array, and response.
Example:
{
  "intent": "acquire software company",
  "actions": [
    {
      "type": "buy_company",
      "payload": {
        "companyId": "abc123",
        "leverage": 2.5
      }
    }
  ],
  "response": "Excellent choice! TechCo looks like a strong acquisition..."
}`,
      temperature: 0.7,
    });

    // Parse the response
    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.error("Error interpreting intent:", error);
    return {
      intent: "error",
      actions: [],
      response: "I couldn't understand that request. Try asking about buying companies, selling portfolio holdings, or advancing time."
    };
  }
}

export async function generateMarketCommentary(state: FundState): Promise<string> {
  const prompt = `Generate a brief, exciting market commentary for month ${state.month} of a PE simulation.
  Macro regime: ${state.macroRegime}
  Recent events: ${state.events.slice(-3).map(e => e.description).join(', ')}
  
  Make it 1-2 sentences, dramatic and engaging like a financial news headline.`;

  try {
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      prompt,
      temperature: 0.8,
    });
    return text;
  } catch (error) {
    return `Month ${state.month}: Markets remain ${state.macroRegime}.`;
  }
}