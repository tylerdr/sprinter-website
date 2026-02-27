"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const items = [
  "Your competitor just automated their entire quoting process. Yours still takes 3 days.",
  "AI doesn't sleep, doesn't forget, doesn't miss follow-ups. Your team does.",
  "Every week you wait, the companies that move fast pull further ahead.",
];

export default function Problem() {
  return (
    <AnimatedSection id="problem" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
      <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[#FAFAFA] sm:text-4xl">
        The gap between what's possible and what you're doing is growing every day.
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((text, index) => (
          <article
            key={text}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#3B82F6]">0{index + 1}</p>
            <p className="text-base leading-relaxed text-[#A1A1AA]">{text}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-lg text-[#FAFAFA]">
        This isn't about replacing people. It's about giving your best people superpowers.
      </p>
    </AnimatedSection>
  );
}
