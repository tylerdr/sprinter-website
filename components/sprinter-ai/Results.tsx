"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const outcomes = [
  "250,000+ prices generated across 12 months — eliminating hours of manual cross-referencing per plan",
  "AI-powered guideline intelligence searching 50+ lenders in seconds — down from 4+ hours of manual research",
  "Full operations audit completed in 48 hours with 60+ scored automation opportunities and ROI projections",
];

const metrics = [
  { value: "250K+", label: "Data points processed in production" },
  { value: "20×", label: "ROI measured on deployed system" },
  { value: "2+ hrs", label: "Saved per task with AI agents" },
  { value: "2-4 wks", label: "From kickoff to production" },
];

export default function Results() {
  return (
    <AnimatedSection id="results" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>Real Impact</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center">Real businesses. Real results.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Production systems running today across manufacturing, fintech, healthcare, and more.
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
          <blockquote key={outcome} className="spr-card p-5 text-sm leading-relaxed text-[color:var(--spr-text-soft)]">
            &quot;{outcome}&quot;
          </blockquote>
        ))}
      </div>
    </AnimatedSection>
  );
}
