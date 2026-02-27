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
      <h2 className="spr-heading-lg max-w-4xl">
        The gap between what&apos;s possible and what you&apos;re doing is growing every day.
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((text, index) => (
          <article key={text} className="spr-card p-6">
            <p className="spr-kicker mb-3">0{index + 1}</p>
            <p className="spr-body">{text}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-lg text-[color:var(--spr-text-soft)]">
        This isn&apos;t about replacing people. It&apos;s about giving your best people superpowers.
      </p>
    </AnimatedSection>
  );
}
