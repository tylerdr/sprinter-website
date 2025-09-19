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
import { ProgressBar, AIProcessingSteps, LoadingSpinner } from "@/components/ui/loading-states";

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
  status: "idle" | "working" | "done" | "error";
  task: string;
  result?: string;
  progress?: number;
}

export default function AgentSimulator() {
  const [scenario, setScenario] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [result, setResult] = useState("");
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("");

  const runSimulation = async () => {
    if (!scenario.trim()) return;

    setIsRunning(true);
    setResult("");
    setOverallProgress(0);
    setCurrentPhase("Initializing agents...");

    const simulatedAgents: Agent[] = [
      {
        id: "1",
        name: "Research Agent",
        icon: Database,
        status: "working",
        task: "Gathering information...",
        progress: 0,
      },
      {
        id: "2",
        name: "Analysis Agent",
        icon: Code,
        status: "idle",
        task: "Waiting for data...",
        progress: 0,
      },
      {
        id: "3",
        name: "Planning Agent",
        icon: Zap,
        status: "idle",
        task: "Standing by...",
        progress: 0,
      },
      {
        id: "4",
        name: "Quality Check Agent",
        icon: CheckCircle,
        status: "idle",
        task: "Ready to verify...",
        progress: 0,
      },
    ];

    setAgents(simulatedAgents);

    // Initial delay to show setup
    await new Promise((resolve) => setTimeout(resolve, 800));
    setOverallProgress(10);

    const phases = [
      "Research & Data Collection",
      "Analysis & Processing",
      "Strategic Planning",
      "Quality Assurance"
    ];

    for (let i = 0; i < simulatedAgents.length; i++) {
      setCurrentPhase(phases[i]);

      // Simulate agent work with progress updates
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        setAgents((prev) =>
          prev.map((agent, index) => {
            if (index === i) {
              return {
                ...agent,
                progress,
                task: progress === 100 ? "Completed!" : `${agent.task} (${progress}%)`
              };
            }
            return agent;
          })
        );

        // Update overall progress
        const baseProgress = (i / simulatedAgents.length) * 100;
        const agentProgress = (progress / 100) * (100 / simulatedAgents.length);
        setOverallProgress(Math.round(baseProgress + agentProgress));
      }

      // Mark agent as done and start next one
      setAgents((prev) =>
        prev.map((agent, index) => {
          if (index === i) {
            return {
              ...agent,
              status: "done",
              result: `Completed: ${agent.task}`,
              progress: 100,
            };
          } else if (index === i + 1) {
            return { ...agent, status: "working", task: "Processing..." };
          }
          return agent;
        })
      );
    }

    setCurrentPhase("Finalizing results...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOverallProgress(100);

    setResult(`🎯 Mission accomplished! 4 AI agents collaborated to: ${scenario}

📊 Results:
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

      {/* Overall Progress */}
      <AnimatePresence>
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 rounded-lg bg-card/20 border border-border/30 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Mission Progress</h3>
              <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <ProgressBar
              progress={overallProgress}
              variant="gradient"
              showPercentage={false}
            />
            {currentPhase && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <LoadingSpinner size="sm" variant="minimal" />
                {currentPhase}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
                      : agent.status === "error"
                      ? "bg-destructive/10 border-destructive/30"
                      : "bg-card/20 border-border/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {agent.status === "working" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="p-2 rounded-lg bg-info/20"
                      >
                        <agent.icon className="w-4 h-4 text-info" />
                      </motion.div>
                    ) : agent.status === "done" ? (
                      <div className="p-2 rounded-lg bg-success/20">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-muted/20">
                        <agent.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm sm:text-base">
                      {agent.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {agent.task}
                    </p>

                    {/* Individual Agent Progress */}
                    {agent.status === "working" && typeof agent.progress === "number" && (
                      <div className="mt-3">
                        <ProgressBar
                          progress={agent.progress}
                          size="sm"
                          showPercentage={false}
                          variant="default"
                        />
                      </div>
                    )}

                    {agent.result && (
                      <p className="text-xs text-success mt-2">
                        {agent.result}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Processing Steps Summary */}
      <AnimatePresence>
        {isRunning && agents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 rounded-lg bg-card/20 border border-border/30 backdrop-blur-sm"
          >
            <h3 className="font-medium mb-4">Agent Collaboration Pipeline</h3>
            <AIProcessingSteps
              steps={agents.map(agent => ({
                id: agent.id,
                title: agent.name,
                description: agent.task,
                status: agent.status === "working" ? "processing" :
                        agent.status === "done" ? "completed" :
                        agent.status === "error" ? "error" : "pending"
              }))}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {agents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:mb-8"
            style={{ display: "none" }} // Hide the old agent cards since we're showing them above
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
                      : agent.status === "error"
                      ? "bg-destructive/10 border-destructive/30"
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
