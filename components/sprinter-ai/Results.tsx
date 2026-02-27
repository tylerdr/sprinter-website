"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const outcomes = [
  "63 automation opportunities identified in 48 hours",
  "Custom AI sales assistant deployed to a new hire — researching prospects, building territory plans, drafting outreach",
  "AI agent managing 6,388 prospect records across California",
];

const metrics = [
  "63 opportunities identified per engagement",
  "48-hour assessment turnaround",
  "24/7 agent uptime",
  "3-5 agents deployed in 2 weeks",
];

export default function Results() {
  return (
    <AnimatedSection
      id="results"
      className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      delay={0.05}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">
        Real businesses. Real results.
      </h2>
      <p className="mt-5 text-sm uppercase tracking-[0.16em] text-[#3B82F6]">OCI Case Study</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {outcomes.map((outcome) => (
          <blockquote
            key={outcome}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-[#FAFAFA]"
          >
            &quot;{outcome}&quot;
          </blockquote>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric} className="rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/10 p-4 text-sm text-[#FAFAFA]">
            {metric}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
