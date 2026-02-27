"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const outcomes = [
  "63 automation opportunities identified in 48 hours",
  "Custom AI sales assistant deployed to a new hire - researching prospects, building territory plans, drafting outreach",
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
    <AnimatedSection id="results" className="spr-container spr-section-divider" delay={0.05}>
      <h2 className="spr-heading-lg">Real businesses. Real results.</h2>
      <p className="spr-kicker mt-5">OCI Case Study</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {outcomes.map((outcome) => (
          <blockquote key={outcome} className="spr-card p-5 text-sm leading-relaxed text-[color:var(--spr-text-soft)]">
            &quot;{outcome}&quot;
          </blockquote>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric} className="spr-card spr-card-accent spr-card-tight p-4 text-sm text-[color:var(--spr-text)]">
            {metric}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
