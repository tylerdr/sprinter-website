"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BuildingOfficeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  BoltIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { type FundState } from "@/lib/pe-tycoon/engine";
import {
  startNewGame,
  processGameAction,
  interpretUserIntent,
  generateMarketCommentary
} from "./actions";

export default function PETycoonPage() {
  const [gameState, setGameState] = useState<FundState | null>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant" | "system"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [marketCommentary, setMarketCommentary] = useState("");
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      const state = await startNewGame(sessionId);
      setGameState(state);
      setMessages([
        {
          role: "system",
          content: `🎮 Welcome to PE Tycoon! You're managing ${state.fundName} with $${state.aum.toFixed(1)}B AUM. Chat with me to make moves - buy companies, launch operations programs, or just say "advance time" to see what happens!`
        }
      ]);
    };
    initGame();
  }, [sessionId]);

  // Auto-advance time
  useEffect(() => {
    if (!autoAdvance || !gameState) return;

    const timer = setTimeout(async () => {
      const result = await processGameAction(sessionId, { type: "month_tick" });
      if (result.success && result.state) {
        setGameState(result.state);
        const commentary = await generateMarketCommentary(result.state);
        setMarketCommentary(commentary);
      }
    }, 3000); // Advance every 3 seconds

    return () => clearTimeout(timer);
  }, [autoAdvance, gameState, sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !gameState || isProcessing) return;

    const userMessage = input;
    setInput("");
    setIsProcessing(true);
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      // Interpret user intent and get actions
      const interpretation = await interpretUserIntent(userMessage, gameState);
      
      // Execute actions
      let updatedState = gameState;
      for (const action of interpretation.actions) {
        const result = await processGameAction(sessionId, action);
        if (result.success && result.state) {
          updatedState = result.state;
        }
      }
      
      setGameState(updatedState);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: interpretation.response 
      }]);

      // Generate market commentary
      const commentary = await generateMarketCommentary(updatedState);
      setMarketCommentary(commentary);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Something went wrong. Try again!" 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold animate-pulse">Loading PE Tycoon...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header Stats */}
      <div className="border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {gameState.fundName}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <CurrencyDollarIcon className="w-4 h-4 text-green-400" />
                  AUM: ${gameState.aum.toFixed(1)}B
                </span>
                <span className="flex items-center gap-1">
                  <ChartBarIcon className="w-4 h-4 text-blue-400" />
                  IRR: {gameState.irr.toFixed(1)}%
                </span>
                <span className="flex items-center gap-1">
                  <BoltIcon className="w-4 h-4 text-yellow-400" />
                  Focus: {gameState.focusPoints}/{gameState.maxFocusPoints}
                </span>
                <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                  Month {gameState.month}
                </span>
              </div>
            </div>
            <button
              onClick={() => setAutoAdvance(!autoAdvance)}
              className={`px-4 py-2 rounded-lg transition-all ${
                autoAdvance 
                  ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {autoAdvance ? "⏸ Pause Time" : "▶ Auto-Advance"}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio View */}
        <div className="lg:col-span-2 space-y-4">
          {/* Market Commentary */}
          {marketCommentary && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30"
            >
              <div className="flex items-center gap-2 text-sm">
                <SparklesIcon className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 font-medium">Market Update:</span>
                <span className="text-white/80">{marketCommentary}</span>
              </div>
            </motion.div>
          )}

          {/* Portfolio Companies */}
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-400" />
              Portfolio Companies ({gameState.portfolio.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {gameState.portfolio.map((company: any) => (
                  <motion.div
                    key={company.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{company.name}</h3>
                        <p className="text-xs text-white/60">{company.industry}</p>
                      </div>
                      {company.hasScandal && (
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-400 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-white/60">Revenue:</span>
                        <span className="text-green-400 ml-1">${company.revenue.toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="text-white/60">EBITDA:</span>
                        <span className="text-blue-400 ml-1">${company.ebitda.toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="text-white/60">Multiple:</span>
                        <span className="text-purple-400 ml-1">{company.entryMultiple}x</span>
                      </div>
                      <div>
                        <span className="text-white/60">Leverage:</span>
                        <span className="text-yellow-400 ml-1">{company.leverage.toFixed(1)}x</span>
                      </div>
                    </div>

                    {company.opsPrograms.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <div className="flex flex-wrap gap-1">
                          {company.opsPrograms.map((program: any, idx: any) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {gameState.portfolio.length === 0 && (
                <div className="col-span-2 text-center py-8 text-white/40">
                  No portfolio companies yet. Start acquiring!
                </div>
              )}
            </div>
          </div>

          {/* Available Deals */}
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FireIcon className="w-6 h-6 text-orange-400" />
              Available Deals
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {gameState.availableCompanies.slice(0, 6).map((company: any) => (
                <div
                  key={company.id}
                  className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/10"
                >
                  <h3 className="font-medium text-sm text-white">{company.name}</h3>
                  <p className="text-xs text-white/60 mb-2">{company.industry}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400">${company.price.toFixed(0)}M</span>
                    <span className="text-blue-400">{(company.ebitda / company.revenue * 100).toFixed(0)}% margin</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-1">
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 h-[calc(100vh-200px)] flex flex-col">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-bold flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-yellow-400" />
                PE Tycoon AI Assistant
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-500/20 text-blue-100"
                        : msg.role === "system"
                        ? "bg-purple-500/20 text-purple-100"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Buy TechCo with 3x leverage..."
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400"
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={isProcessing || !input.trim()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                  Send
                </button>
              </div>
              <div className="mt-2 text-xs text-white/40">
                Try: "Buy the best software company" or "Launch automation at all companies"
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      {gameState.events.length > 0 && (
        <div className="container mx-auto px-4 pb-6">
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <h3 className="font-bold mb-2 text-sm text-white/60">Recent Events</h3>
            <div className="flex gap-2 overflow-x-auto">
              {gameState.events.slice(-5).reverse().map((event, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap ${
                    event.impact > 0 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : event.impact < 0
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-white/10 text-white/60 border border-white/10"
                  }`}
                >
                  {event.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}