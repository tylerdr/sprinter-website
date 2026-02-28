"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const principles = [
  {
    title: "Agent-Accessible by Design",
    description: "Every process, system, and data source is built to be readable and actionable by AI agents — not retrofitted later.",
    examples: ["APIs over manual uploads", "Structured data flows", "Clear validation rules"],
  },
  {
    title: "Human-AI Collaboration",
    description: "Agents handle repetitive work. Humans focus on judgment, relationships, and strategic decisions.",
    examples: ["AI extracts → Human reviews", "AI drafts → Human refines", "AI routes → Human decides"],
  },
  {
    title: "Built for Iteration",
    description: "Systems designed to learn and improve from feedback, not locked into rigid rules.",
    examples: ["Continuous model updates", "User feedback loops", "Performance monitoring"],
  },
];

const comparison = {
  legacy: [
    "Bolt AI onto existing process",
    "Manual workarounds for AI gaps",
    "Brittle integrations that break",
    "\"We'll make it work\" mentality",
  ],
  native: [
    "Design process with AI from scratch",
    "Agents as first-class participants",
    "Clean interfaces and data flows",
    "Built to scale and evolve",
  ],
};

export function AINative() {
  return (
    <AnimatedSection id="ai-native" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>Core Philosophy</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">AI-Native</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        Not &quot;AI-added&quot; to legacy processes. Built for AI from day one — where agents and people work together from the start.
      </p>

      <div className="space-y-4 mb-12">
        {principles.map((principle) => (
          <article key={principle.title} className="spr-card p-6">
            <h3 className="text-lg font-semibold text-[color:var(--spr-text)] mb-2">{principle.title}</h3>
            <p className="text-[color:var(--spr-text-muted)] mb-4">{principle.description}</p>
            <div className="flex flex-wrap gap-2">
              {principle.examples.map((example) => (
                <span key={example} className="spr-chip">{example}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="spr-card p-6 border-[color:rgba(255,100,100,0.3)]">
          <h3 className="text-lg font-semibold text-[color:rgba(255,120,120,0.9)] mb-3">AI-Added (Legacy Approach)</h3>
          <ul className="space-y-2">
            {comparison.legacy.map((item) => (
              <li key={item} className="text-sm flex items-start gap-2 text-[color:var(--spr-text-muted)]">
                <XMarkIcon className="h-4 w-4 flex-shrink-0 text-[color:rgba(255,100,100,0.7)] mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="spr-card spr-card-accent p-6">
          <h3 className="text-lg font-semibold text-[color:var(--spr-primary)] mb-3">AI-Native (Our Approach)</h3>
          <ul className="space-y-2">
            {comparison.native.map((item) => (
              <li key={item} className="text-sm flex items-start gap-2 text-[color:var(--spr-text-soft)]">
                <CheckIcon className="h-4 w-4 flex-shrink-0 text-[color:var(--spr-primary)] mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
