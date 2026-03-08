"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const steps = [
  {
    title: "01 — ASSESS",
    points: [
      "We audit your operations and identify the highest-value automation opportunities.",
      "You get a scored backlog with ROI estimates — not a slide deck, but a concrete plan.",
      "Free for qualifying businesses. See the opportunities before you commit.",
    ],
  },
  {
    title: "02 — DEPLOY",
    points: [
      "We build and deploy AI agents on the OpenClaw platform — our AI operations system.",
      "They integrate with your existing tools and start producing value in weeks, not months.",
      "Your team stays focused on high-value work while agents handle the operational load.",
    ],
  },
  {
    title: "03 — SCALE",
    points: [
      "Monthly optimization. New capabilities. Your AI workforce grows smarter every month.",
      "Once proven in one area, we replicate and expand across your operations.",
      "The longer we work together, the more leverage you unlock.",
    ],
  },
];

export default function HowItWorks() {
  return (
    <AnimatedSection id="how-it-works" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Our Process</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center">How It Works</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Three phases to transform your operations. Start with zero risk, prove value, then scale.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {steps.map((step) => (
          <article key={step.title} className="spr-card p-6">
            <h3 className="text-lg font-semibold text-[color:var(--spr-text)]">{step.title}</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[color:var(--spr-text-muted)]">
              {step.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="spr-list-dot mt-1.5" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
