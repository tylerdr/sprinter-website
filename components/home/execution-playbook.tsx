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
    title: "Explore Workflows",
    description:
      "Shadow real processes, map the messy middle, and capture triggers, inputs, and outputs.",
    icon: ClipboardList,
  },
  {
    title: "Question Requirements",
    description:
      "Pressure-test assumptions. What must be perfect vs. good-enough? Where can latency or cost flex?",
    icon: Target,
  },
  {
    title: "Identify Use Cases",
    description:
      "Rank by ROI, feasibility, data readiness, and integration complexity. Pick 1–3 to ship now.",
    icon: ListChecks,
  },
  {
    title: "Clarify Actions",
    description:
      "Define precise agent actions: read, transform, retrieve, decide, update, notify—plus guardrails.",
    icon: Brain,
  },
  {
    title: "Develop Agents",
    description:
      "Build narrow agents first. Integrate with your systems. Instrument everything.",
    icon: Gauge,
  },
  {
    title: "Measure & Iterate",
    description:
      "Ship, observe, and compound: track accuracy, cycle time, cost per action, and user outcomes.",
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
            Not theory—systems in production. A practical path to compounding
            leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={s.title}
              className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all"
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
