"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  Plus,
  Trash2,
  Bot,
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  aiSuggestion?: {
    type: string;
    benefit: string;
  };
}

const exampleWorkflows = [
  {
    name: "Customer Support",
    steps: [
      "Receive customer inquiry",
      "Categorize issue type",
      "Search knowledge base",
      "Draft response",
      "Review and send",
    ],
  },
  {
    name: "Content Creation",
    steps: [
      "Research topic",
      "Create outline",
      "Write draft",
      "Edit and proofread",
      "Publish and distribute",
    ],
  },
];

export default function WorkflowTool() {
  const [workflowName, setWorkflowName] = useState("");
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [newStep, setNewStep] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const addStep = () => {
    if (newStep.trim()) {
      setSteps([
        ...steps,
        {
          id: Date.now().toString(),
          title: newStep,
          description: "",
        },
      ]);
      setNewStep("");
      setAnalyzed(false);
    }
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id));
    setAnalyzed(false);
  };

  const loadExample = (example: (typeof exampleWorkflows)[0]) => {
    setWorkflowName(example.name);
    setSteps(
      example.steps.map((step, index) => ({
        id: index.toString(),
        title: step,
        description: "",
      }))
    );
    setAnalyzed(false);
  };

  const analyzeWorkflow = () => {
    const suggestions = [
      {
        keywords: ["categorize", "classify", "sort"],
        type: "Classification AI",
        benefit: "95% accuracy, instant categorization",
      },
      {
        keywords: ["search", "find", "lookup"],
        type: "Semantic Search AI",
        benefit: "Find relevant info 10x faster",
      },
      {
        keywords: ["write", "draft", "create"],
        type: "Content Generation AI",
        benefit: "Generate first drafts in seconds",
      },
      {
        keywords: ["review", "check", "verify"],
        type: "Quality Check AI",
        benefit: "Automated QA with consistent standards",
      },
      {
        keywords: ["analyze", "research", "investigate"],
        type: "Research AI Agent",
        benefit: "Comprehensive analysis in minutes",
      },
      {
        keywords: ["extract", "collect", "gather"],
        type: "Data Extraction AI",
        benefit: "Automate data collection",
      },
    ];

    const analyzedSteps = steps.map((step) => {
      const lowerTitle = step.title.toLowerCase();
      const suggestion = suggestions.find((s) =>
        s.keywords.some((keyword) => lowerTitle.includes(keyword))
      );

      return {
        ...step,
        aiSuggestion: suggestion || {
          type: "Process Automation",
          benefit: "Reduce manual effort by 50%",
        },
      };
    });

    setSteps(analyzedSteps);
    setAnalyzed(true);
  };

  const reset = () => {
    setWorkflowName("");
    setSteps([]);
    setNewStep("");
    setAnalyzed(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Workflow Name
            </label>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="e.g., Customer Onboarding Process"
              className="w-full px-4 py-2 rounded-lg bg-card/10 border border-border/20 focus:border-[color:var(--accent)] focus:outline-none transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Add Steps</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addStep()}
                placeholder="Enter a step in your workflow"
                className="flex-1 px-4 py-2 rounded-lg bg-card/10 border border-border/20 focus:border-[color:var(--accent)] focus:outline-none transition-colors"
              />
              <button
                onClick={addStep}
                className="px-4 py-2 bg-brand-gradient text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {steps.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 mb-6"
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border ${
                      step.aiSuggestion
                        ? "border-brand-30 bg-brand-10"
                        : "bg-card/5 border-border/10"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-mono text-muted-foreground/80">
                            Step {index + 1}
                          </span>
                          <h3 className="font-medium">{step.title}</h3>
                        </div>
                        {step.aiSuggestion && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-black/30"
                          >
                            <Bot className="w-4 h-4 text-info mt-0.5" />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-info">
                                AI Recommendation: {step.aiSuggestion.type}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {step.aiSuggestion.benefit}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      <button
                        onClick={() => removeStep(step.id)}
                        className="ml-4 p-1 text-muted-foreground/80 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <button
              onClick={analyzeWorkflow}
              disabled={steps.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              Analyze with AI
            </button>

            {analyzed && (
              <button
                onClick={() => {}}
                className="flex items-center gap-2 px-6 py-3 bg-card/10 text-foreground font-medium rounded-lg hover:bg-card/20 transition-colors"
              >
                <Download className="w-5 h-5" />
                Export Plan
              </button>
            )}

            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-card/10 text-foreground font-medium rounded-lg hover:bg-card/20 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Templates</h3>
          <div className="space-y-3">
            {exampleWorkflows.map((example) => (
              <button
                key={example.name}
                onClick={() => loadExample(example)}
                className="w-full p-3 text-left rounded-lg bg-card/5 hover:bg-card/10 border border-border/10 transition-colors"
              >
                <div className="font-medium mb-1">{example.name}</div>
                <div className="text-xs text-muted-foreground">
                  {example.steps.length} steps
                </div>
              </button>
            ))}
          </div>

          {analyzed && steps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg border border-success-30 bg-success-10"
            >
              <h4 className="font-semibold mb-2 text-success">
                AI Impact Summary
              </h4>
              <div className="text-sm text-foreground/80">
                <div className="mb-2">
                  🚀 {steps.filter((s) => s.aiSuggestion).length} steps can be
                  augmented with AI
                </div>
                <div className="mb-2">⏱️ Estimated time savings: 60-80%</div>
                <div>📈 ROI potential: 10x efficiency gain</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
