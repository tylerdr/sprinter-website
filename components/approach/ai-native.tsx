"use client";

import { motion } from "framer-motion";
import { Cpu, Users, Workflow, Zap, CheckCircle } from "lucide-react";

const principles = [
  {
    icon: Workflow,
    title: "Agent-Accessible by Design",
    description: "Every process, system, and data source is built to be readable and actionable by AI agents—not retrofitted later.",
    examples: ["APIs over manual uploads", "Structured data flows", "Clear validation rules"],
  },
  {
    icon: Users,
    title: "Human-AI Collaboration",
    description: "Agents handle repetitive work. Humans focus on judgment, relationships, and strategic decisions.",
    examples: ["AI extracts → Human reviews", "AI drafts → Human refines", "AI routes → Human decides"],
  },
  {
    icon: Zap,
    title: "Built for Iteration",
    description: "Systems designed to learn and improve from feedback, not locked into rigid rules.",
    examples: ["Continuous model updates", "User feedback loops", "Performance monitoring"],
  },
];

export function AINative() {
  return (
    <section id="ai-native" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Cpu className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-500">Core Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI-Native</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Not "AI-added" to legacy processes. Built for AI from day one—where agents and people work together from the start.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-purple-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                      <p className="text-muted-foreground mb-4">{principle.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {principle.examples.map((example, i) => (
                          <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                            <CheckCircle className="w-3 h-3 text-purple-500" />
                            <span className="text-xs font-medium">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Comparison */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">AI-Added (Legacy Approach)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✗ Bolt AI onto existing process</li>
                <li>✗ Manual workarounds for AI gaps</li>
                <li>✗ Brittle integrations that break</li>
                <li>✗ "We'll make it work" mentality</li>
              </ul>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">AI-Native (Our Approach)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Design process with AI from scratch</li>
                <li>✓ Agents as first-class participants</li>
                <li>✓ Clean interfaces and data flows</li>
                <li>✓ Built to scale and evolve</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}