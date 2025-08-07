"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Play,
  RefreshCw,
  Zap,
  Database,
  Code,
  CheckCircle,
  Loader,
} from "lucide-react";

const exampleScenarios = [
  "Plan a one-day tech conference in San Francisco",
  "Research and summarize the latest AI trends",
  "Create a marketing campaign for a new AI product",
  "Analyze customer feedback and generate insights",
];

interface Agent {
  id: string;
  name: string;
  icon: any;
  status: "idle" | "working" | "done";
  task: string;
  result?: string;
}

export default function AgentSimulatorPage() {
  const [scenario, setScenario] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [result, setResult] = useState("");

  const runSimulation = async () => {
    if (!scenario.trim()) return;

    setIsRunning(true);
    setResult("");

    const simulatedAgents: Agent[] = [
      {
        id: "1",
        name: "Research Agent",
        icon: Database,
        status: "working",
        task: "Gathering information...",
      },
      {
        id: "2",
        name: "Analysis Agent",
        icon: Code,
        status: "idle",
        task: "Waiting for data...",
      },
      {
        id: "3",
        name: "Planning Agent",
        icon: Zap,
        status: "idle",
        task: "Standing by...",
      },
      {
        id: "4",
        name: "Quality Check Agent",
        icon: CheckCircle,
        status: "idle",
        task: "Ready to verify...",
      },
    ];

    setAgents(simulatedAgents);

    for (let i = 0; i < simulatedAgents.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAgents((prev) =>
        prev.map((agent, index) => {
          if (index === i) {
            return {
              ...agent,
              status: "done",
              result: `Completed: ${agent.task}`,
            };
          } else if (index === i + 1) {
            return { ...agent, status: "working", task: "Processing..." };
          }
          return agent;
        })
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResult(`Mission accomplished! 4 AI agents collaborated to: ${scenario}

Results:
✅ Research completed with 15+ data sources analyzed
✅ Strategic plan created with timeline and milestones  
✅ Resource allocation optimized by 35%
✅ Quality verified with 98% confidence

Total execution time: 6.2 seconds`);

    setIsRunning(false);
  };

  const reset = () => {
    setScenario("");
    setAgents([]);
    setResult("");
    setIsRunning(false);
  };

  const runExample = () => {
    if (isRunning) return;
    const preset = exampleScenarios[0];
    setScenario(preset);
    setTimeout(() => {
      void runSimulation();
    }, 0);
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Bot className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Agent <span className="gradient-text">Simulator</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch multiple AI agents work together in parallel to solve complex
            tasks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <label className="block text-sm font-medium mb-3">
              Give the agents a mission:
            </label>
            <input
              type="text"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="e.g., Plan a product launch event"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors"
              disabled={isRunning}
            />

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs text-gray-400">Try:</span>
              {exampleScenarios.map((example) => (
                <button
                  key={example}
                  onClick={() => setScenario(example)}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  disabled={isRunning}
                >
                  {example}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={runSimulation}
                disabled={isRunning || !scenario.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Simulation
                  </>
                )}
              </button>
              <button
                onClick={runExample}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                <Play className="w-5 h-5" />
                Run Example
              </button>

              <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {agents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border backdrop-blur-sm transition-all ${
                    agent.status === "working"
                      ? "bg-blue-500/10 border-blue-500/30"
                      : agent.status === "done"
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        agent.status === "working"
                          ? "bg-blue-500/20"
                          : agent.status === "done"
                            ? "bg-green-500/20"
                            : "bg-white/10"
                      }`}
                    >
                      <agent.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{agent.name}</h3>
                        {agent.status === "working" && (
                          <Loader className="w-4 h-4 animate-spin text-blue-400" />
                        )}
                        {agent.status === "done" && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {agent.status === "done" ? agent.result : agent.task}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30"
            >
              <h3 className="text-xl font-bold mb-3 text-green-400">
                ✨ Mission Complete!
              </h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                {result}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <h3 className="text-lg font-semibold mb-3">How it works</h3>
          <p className="text-gray-400 mb-4">
            This simulation demonstrates how multiple specialized AI agents
            collaborate to solve complex tasks. Each agent has specific
            capabilities and they work in parallel, sharing information and
            coordinating to achieve the goal efficiently.
          </p>
          <p className="text-gray-400">
            In real-world applications, SprinterHQ&apos;s agentic workflows can
            orchestrate dozens of agents, each handling specific subtasks,
            calling APIs, processing data, and making decisions autonomously.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
