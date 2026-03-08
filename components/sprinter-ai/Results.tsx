"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const outcomes = [
  "Cab-O-Matic: 250,000+ cabinet prices generated across 12 months — eliminating hours of manual cross-referencing per plan",
  "MortgageQ: AI-powered guideline search across 50+ lenders in seconds — down from 4+ hours of manual research per loan",
  "Oak Chips Inc: Full operations audit completed with 60+ scored automation opportunities and ROI projections",
];

const metrics = [
  { value: "250K+", label: "Prices generated for Cab-O-Matic" },
  { value: "20\u00D7", label: "Measured ROI on deployed systems" },
  { value: "4+ hrs", label: "Saved per task with AI agents" },
  { value: "2\u20134 wks", label: "From kickoff to production" },
];

export default function Results() {
  return (
    <AnimatedSection id="results" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>Real Impact</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center">Real businesses. Measured results.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Production systems running today across manufacturing, fintech, and healthcare.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="spr-card spr-card-accent spr-card-tight p-5 text-center">
            <div className="text-3xl font-bold text-[color:var(--spr-primary)] mb-1">{metric.value}</div>
            <div className="text-sm text-[color:var(--spr-text-muted)]">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {outcomes.map((outcome) => (
          <div key={outcome} className="spr-card p-5 text-sm leading-relaxed text-[color:var(--spr-text-soft)]">
            {outcome}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
