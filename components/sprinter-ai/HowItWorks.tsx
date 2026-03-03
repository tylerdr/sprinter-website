"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const steps = [
  {
    title: "01 — DISCOVER",
    points: [
      "We map your operations in 48 hours. Every process, every bottleneck, every opportunity.",
      "You get a scored backlog of automation opportunities with ROI estimates.",
      "The AI Readiness Sprint ($2,500) — see exactly what AI can do for your business.",
    ],
  },
  {
    title: "02 — DEPLOY",
    points: [
      "We build and deploy custom AI agents in the first two weeks.",
      "They integrate with your tools. They learn your business. They start producing value immediately.",
      "Your people are empowered to focus on the work that matters while AI handles the rest.",
    ],
  },
  {
    title: "03 — SCALE",
    points: [
      "Monthly optimization. New capabilities. Your AI workforce grows smarter every month.",
      "Once proven in one area, we templatize and expand across your operations.",
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
        Three phases to transform your operations. Start small, prove value, then scale.
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
