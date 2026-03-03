"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";

const sprintBenefits = [
  {
    title: "Pilot in 2-3 Sprints",
    description: "See measurable ROI in 20-30 days, not months. Validate value before scaling.",
    metric: "20-30 days",
  },
  {
    title: "Each Sprint Compounds",
    description: "Quick wins build toward full AI-native operations. No throwaway work.",
    metric: "Compounding value",
  },
  {
    title: "De-Risk Transformation",
    description: "Prove the model works with one process before rolling out fund-wide.",
    metric: "Validate, then scale",
  },
];

const progression = [
  { sprint: "Sprint 1 (10 days)", title: "Prototype & Validate", description: "Test with 10-20 documents. Prove feasibility." },
  { sprint: "Sprint 2 (10 days)", title: "Production-Ready", description: "Scale to live data. Integrate with systems." },
  { sprint: "Sprint 3 (10 days)", title: "Optimize & Expand", description: "Hit target accuracy. Add related use cases." },
];

export function WorkInSprints() {
  return (
    <AnimatedSection id="sprints" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Our Delivery Model</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">Work in Sprints</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        1 sprint = 10 days = 2 weeks. Rapid iteration. Measurable progress. No endless consulting engagements.
      </p>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {sprintBenefits.map((benefit) => (
          <article key={benefit.title} className="spr-card p-6">
            <h3 className="text-lg font-semibold text-[color:var(--spr-text)] mb-2">{benefit.title}</h3>
            <p className="text-sm text-[color:var(--spr-text-muted)] mb-3">{benefit.description}</p>
            <span className="spr-chip">{benefit.metric}</span>
          </article>
        ))}
      </div>

      <div className="spr-card spr-card-accent p-8">
        <h3 className="text-xl font-bold text-[color:var(--spr-text)] mb-6 text-center">Typical Sprint Progression</h3>
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {progression.map((item) => (
            <div key={item.sprint} className="rounded border-l-2 border-[color:var(--spr-primary)] bg-[color:rgba(106,167,255,0.08)] p-4">
              <div className="text-sm font-medium text-[color:var(--spr-text-muted)] mb-1">{item.sprint}</div>
              <div className="font-semibold text-[color:var(--spr-text)] mb-2">{item.title}</div>
              <div className="text-sm text-[color:var(--spr-text-muted)]">{item.description}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/contact" className="spr-button spr-button-primary">
            Start Your 2-3 Sprint Pilot
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
