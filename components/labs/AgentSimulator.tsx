"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RefreshCw,
  Zap,
  Database,
  Code,
  CheckCircle,
  Loader,
} from "lucide-react";

const exampleScenarios = [
  "Plan a one-day tech conference in Nashville",
  "Research and summarize the latest AI trends",
  "Create a marketing campaign for a new AI product",
  "Analyze customer feedback and generate insights",
];

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  status: "idle" | "working" | "done";
  task: string;
  result?: string;
}

export default function AgentSimulator() {
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 sm:mb-8"
      >
        <div className="p-4 sm:p-6 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm">
          <label className="block text-sm font-medium mb-3">
            Give the agents a mission:
          </label>
          <input
            type="text"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="e.g., Plan a product launch event"
            className="w-full px-4 py-3 rounded-lg bg-card/30 border border-border/20 focus:border-info focus:outline-none transition-colors text-sm sm:text-base touch-manipulation"
            disabled={isRunning}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-muted-foreground">Try:</span>
            {exampleScenarios.map((example) => (
              <button
                key={example}
                onClick={() => setScenario(example)}
                className="text-xs px-3 py-1 rounded-full bg-card/30 hover:bg-card/40 transition-colors touch-manipulation min-h-[32px]"
                disabled={isRunning}
              >
                {example}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={runSimulation}
              disabled={isRunning || !scenario.trim()}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              {isRunning ? (
                <>
                  <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Run Simulation
                </>
              )}
            </button>
            <button
              onClick={runExample}
              disabled={isRunning}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-card/30 text-foreground font-medium rounded-lg hover:bg-card/40 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Run Example
            </button>

            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-card/30 text-foreground font-medium rounded-lg hover:bg-card/40 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:mb-8"
          >
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 sm:p-4 rounded-lg border backdrop-blur-sm transition-all ${
                  agent.status === "working"
                    ? "bg-info/10 border-info/30"
                    : agent.status === "done"
                      ? "bg-success/10 border-success/30"
                      : "bg-card/20 border-border/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      agent.status === "working"
                        ? "bg-info-10"
                        : agent.status === "done"
                          ? "bg-success-10"
                          : "bg-card/30"
                    }`}
                  >
                    <agent.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base">
                        {agent.name}
                      </h3>
                      {agent.status === "working" && (
                        <Loader className="w-4 h-4 animate-spin text-info" />
                      )}
                      {agent.status === "done" && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
            className="p-4 sm:p-6 rounded-xl border border-success-30 bg-success-10"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-success">
              ✨ Mission Complete!
            </h3>
            <pre className="whitespace-pre-wrap text-xs sm:text-sm text-foreground/80 font-mono overflow-x-auto">
              {result}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
