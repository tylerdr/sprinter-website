"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

export default function Manifesto() {
  return (
    <AnimatedSection id="manifesto" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
      <h2 className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">We believe in acceleration.</h2>
      <div className="mt-7 max-w-4xl space-y-5 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
        <p>The future belongs to the fast.</p>
        <p>Not the biggest. Not the richest. The fastest to adapt.</p>
        <p>AI isn't coming. It's here. It's in your competitor's inbox, your rival's CRM, your industry's next disruptor.</p>
        <p>The companies that thrive won't be the ones who &quot;looked into AI.&quot;</p>
        <p>They'll be the ones who deployed it while everyone else was still scheduling evaluation meetings.</p>
        <p className="font-medium text-[#FAFAFA]">We build for people who move.</p>
      </div>
    </AnimatedSection>
  );
}
