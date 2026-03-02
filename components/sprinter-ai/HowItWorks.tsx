"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const steps = [
  {
    title: "01 - AI READINESS SPRINT ($2,500)",
    points: [
      "We map your operations in 48 hours. Every process, every bottleneck, every opportunity.",
      "You get a scored backlog of 20-60 automation opportunities with ROI estimates.",
      "Guarantee: We identify $200K+ in annual value or it's free.",
    ],
  },
  {
    title: "02 - AGENT DEPLOYMENT ($8,000/mo)",
    points: [
      "We build and deploy 3-5 custom AI agents in the first two weeks.",
      "They integrate with your tools. They learn your business. They start producing value immediately.",
      "90-day minimum. ROI guarantee or we work free until you see it.",
    ],
  },
  {
    title: "03 - CONTINUOUS ACCELERATION",
    points: [
      "Monthly strategy sessions. New capabilities. Ongoing optimization.",
      "Your AI workforce gets smarter every month.",
      "The longer we work together, the more leverage you have.",
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
