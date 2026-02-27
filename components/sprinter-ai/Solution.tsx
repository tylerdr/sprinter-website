"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const bullets = [
  "They read your emails, triage your inbox, draft responses",
  "They research prospects, enrich your CRM, prep your sales calls",
  "They monitor your operations, flag issues, generate reports",
  "They work nights, weekends, and holidays — on your processes, with your data",
];

export default function Solution() {
  return (
    <AnimatedSection
      id="solution"
      className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      delay={0.05}
    >
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#FAFAFA] sm:text-4xl">
        We don't sell software. We deploy intelligence.
      </h2>
      <p className="mt-6 text-lg text-[#A1A1AA]">Custom AI agents that live inside your business:</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[#FAFAFA]"
          >
            {bullet}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xl font-medium text-[#FAFAFA]">Grounded. Practical. Running while you sleep.</p>
    </AnimatedSection>
  );
}
