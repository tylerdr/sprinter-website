"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const items = [
  "Your competitor just automated their entire quoting process. Yours still takes 3 days.",
  "AI doesn't sleep, doesn't forget, doesn't miss follow-ups. Your team does.",
  "Every week you wait, the companies that move fast pull further ahead.",
];

export default function Problem() {
  return (
    <AnimatedSection id="problem" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>The Problem</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center max-w-4xl mx-auto">
        The gap between what&apos;s possible and what you&apos;re doing is growing every day.
      </h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Most mid-market operators know AI matters. Few are capturing the value. Here&apos;s why that&apos;s costing you.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((text, index) => (
          <article key={text} className="spr-card p-6">
            <p className="spr-kicker mb-3">0{index + 1}</p>
            <p className="spr-body">{text}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-lg text-center text-[color:var(--spr-text-soft)]">
        This isn&apos;t about replacing people. It&apos;s about giving your best people superpowers.
      </p>
    </AnimatedSection>
  );
}
