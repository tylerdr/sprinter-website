"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseIcon,
  SparklesIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { generateAIReplacement } from "./actions";

interface AIAgent {
  name: string;
  type: string;
  capabilities: string[];
  tools: string[];
  cost: string;
  implementation: string;
  pros: string[];
  cons: string[];
  humanCollaboration: string;
}

interface ReplacementAnalysis {
  jobTitle: string;
  aiAgent: AIAgent;
  savings: {
    annual: string;
    percentage: string;
    breakeven: string;
  };
  recommendation: string;
}

const exampleRoles = [
  "Data Analyst",
  "Customer Support Rep",
  "Content Writer",
  "Sales Development Rep",
  "Project Manager",
  "Financial Analyst",
  "Marketing Coordinator",
  "HR Recruiter",
  "QA Tester",
  "Executive Assistant",
];

export default function JustHireAIPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("75000");
  const [tasks, setTasks] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ReplacementAnalysis | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleAnalyze = async () => {
    if (!jobTitle.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await generateAIReplacement({
        jobTitle,
        salary: parseInt(salary),
        tasks,
      });
      setAnalysis(result);
      setShowComparison(true);
    } catch (error) {
      console.error("Error analyzing role:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 mb-6"
          >
            <BriefcaseIcon className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium">Workforce Automation Tool</span>
          </motion.div>

          <h1 className="text-5xl font-bold mb-4">
            Just Hire <span className="gradient-text">AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how AI agents can augment or replace traditional roles. 
            Get honest analysis of what AI can and can't do for any position.
          </p>
        </div>

        {/* Input Form */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-8">
              {/* Job Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Job Title / Role
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Customer Support Representative"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-orange-400 focus:outline-none transition-colors"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {exampleRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setJobTitle(role)}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Annual Salary (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:border-orange-400 focus:outline-none transition-colors"
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Include base salary, benefits, and overhead (typically 1.3-1.5x base)
                </div>
              </div>

              {/* Key Tasks */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Key Responsibilities (Optional)
                </label>
                <textarea
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  placeholder="List the main tasks and responsibilities..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-orange-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!jobTitle.trim() || isAnalyzing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Role...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Analyze AI Replacement
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                This is a thought experiment to explore AI capabilities. 
                Real implementations require careful planning and human oversight.
              </p>
            </div>
          </motion.div>
        )}

        {/* Analysis Results */}
        <AnimatePresence>
          {analysis && showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              {/* Comparison Header */}
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20 p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  {analysis.jobTitle} vs AI Agent Analysis
                </h2>
                
                {/* Savings Summary */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <CurrencyDollarIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">Annual Savings</span>
                    </div>
                    <div className="text-2xl font-bold">{analysis.savings.annual}</div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <ChartBarIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">Cost Reduction</span>
                    </div>
                    <div className="text-2xl font-bold">{analysis.savings.percentage}</div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-purple-400 mb-2">
                      <ClockIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">Break Even</span>
                    </div>
                    <div className="text-2xl font-bold">{analysis.savings.breakeven}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm leading-relaxed">{analysis.recommendation}</p>
                </div>
              </div>

              {/* Side by Side Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Human Role */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-blue-500/20">
                      <UserGroupIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Human Employee</h3>
                      <p className="text-sm text-muted-foreground">{analysis.jobTitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Cost</p>
                      <p className="text-lg font-semibold">${parseInt(salary).toLocaleString()}/year</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Advantages</p>
                      <ul className="space-y-2">
                        {["Creative problem solving", "Emotional intelligence", "Complex reasoning", "Adaptability"].map((pro) => (
                          <li key={pro} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Limitations</p>
                      <ul className="space-y-2">
                        {["Limited to 40 hours/week", "Requires benefits & overhead", "Subject to turnover", "Training required"].map((con) => (
                          <li key={con} className="flex items-start gap-2">
                            <XCircleIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* AI Agent */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-orange-500/30 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-orange-500/20">
                      <SparklesIcon className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{analysis.aiAgent.name}</h3>
                      <p className="text-sm text-muted-foreground">{analysis.aiAgent.type}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Cost</p>
                      <p className="text-lg font-semibold">{analysis.aiAgent.cost}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Capabilities</p>
                      <ul className="space-y-2">
                        {analysis.aiAgent.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Limitations</p>
                      <ul className="space-y-2">
                        {analysis.aiAgent.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2">
                            <XCircleIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Tools & Tech Stack */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <RocketLaunchIcon className="w-5 h-5 text-purple-400" />
                    Required Tools & Integrations
                  </h3>
                  <ul className="space-y-2">
                    {analysis.aiAgent.tools.map((tool, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ArrowRightIcon className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Human + AI Collaboration */}
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <UserGroupIcon className="w-5 h-5 text-blue-400" />
                    Optimal Human + AI Model
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {analysis.aiAgent.humanCollaboration}
                  </p>
                </div>
              </div>

              {/* Implementation Timeline */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Implementation Roadmap</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysis.aiAgent.implementation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setAnalysis(null);
                    setShowComparison(false);
                    setJobTitle("");
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Analyze Another Role
                </button>
                <a
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Implementation Help
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}