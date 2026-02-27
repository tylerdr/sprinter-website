"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

export default function CTA() {
  return (
    <AnimatedSection
      id="cta"
      className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      delay={0.05}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">Ready to move?</h2>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href="/sprint"
          className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#fb923c]"
        >
          Start with an AI Readiness Sprint — $2,500
        </a>
        <a
          href="https://cal.com/tyler-dreher"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-[#3B82F6]/60 px-6 py-3 text-sm font-semibold text-[#FAFAFA] transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
        >
          Book a Strategy Call — Free, 30 min
        </a>
      </div>
      <p className="mt-7 text-lg text-[#A1A1AA]">
        Every day you wait is a day your competition gets further ahead.
      </p>
    </AnimatedSection>
  );
}
