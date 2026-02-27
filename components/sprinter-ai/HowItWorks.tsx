"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const steps = [
  {
    title: "01 — AI READINESS SPRINT ($2,500)",
    points: [
      "We map your operations in 48 hours. Every process, every bottleneck, every opportunity.",
      "You get a scored backlog of 20-60 automation opportunities with ROI estimates.",
      "Guarantee: We identify $200K+ in annual value or it's free.",
    ],
  },
  {
    title: "02 — AGENT DEPLOYMENT ($8,000/mo)",
    points: [
      "We build and deploy 3-5 custom AI agents in the first two weeks.",
      "They integrate with your tools. They learn your business. They start producing value immediately.",
      "90-day minimum. ROI guarantee or we work free until you see it.",
    ],
  },
  {
    title: "03 — CONTINUOUS ACCELERATION",
    points: [
      "Monthly strategy sessions. New capabilities. Ongoing optimization.",
      "Your AI workforce gets smarter every month.",
      "The longer we work together, the more leverage you have.",
    ],
  },
];

export default function HowItWorks() {
  return (
    <AnimatedSection id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
      <h2 className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">How It Works</h2>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {steps.map((step) => (
          <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-lg font-semibold text-[#FAFAFA]">{step.title}</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#A1A1AA]">
              {step.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
