"use client";

import Link from "next/link";
import {
  Brain,
  ClipboardList,
  Target,
  ListChecks,
  Gauge,
  Repeat,
  ArrowRight,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const steps: Step[] = [
  {
    title: "Hunt Down Workflows",
    description:
      "Dive deep into real processes, decode the chaos, and extract every trigger, input, and output that drives results.",
    icon: ClipboardList,
  },
  {
    title: "Challenge Everything",
    description:
      "Crush false assumptions and ruthlessly prioritize. Define what demands perfection vs. good-enough, then architect for speed and impact.",
    icon: Target,
  },
  {
    title: "Target Quick Wins",
    description:
      "Rank opportunities by explosive ROI, feasibility, and data readiness. Cherry-pick 1–3 game-changers to launch immediately.",
    icon: ListChecks,
  },
  {
    title: "Engineer Precision",
    description:
      "Craft laser-focused agent actions: read, transform, retrieve, decide, update, notify—with bulletproof guardrails that ensure success.",
    icon: Brain,
  },
  {
    title: "Build & Deploy",
    description:
      "Craft focused agents that dominate specific tasks. Integrate seamlessly with existing systems and instrument every interaction for maximum insight.",
    icon: Gauge,
  },
  {
    title: "Optimize & Scale",
    description:
      "Ship fast, learn faster, compound relentlessly: track accuracy, slash cycle times, minimize costs, and amplify user outcomes exponentially.",
    icon: Repeat,
  },
];

export function ExecutionPlaybook({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-12" : "py-20"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Execution <span className="gradient-text">Playbook</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Zero theory—pure execution. A battle-tested roadmap to build momentum,
            ship results, and compound your competitive edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={s.title}
              className="p-6 rounded-xl bg-card/20 border border-border/30 hover:bg-card/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="inline-flex p-3 rounded-lg border border-brand-30 bg-brand-10"
                  aria-hidden="true"
                >
                  <s.icon className="w-5 h-5 text-brand" />
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-all"
          >
            Run This Playbook
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
