"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

export default function Manifesto() {
  return (
    <AnimatedSection id="manifesto" className="spr-container" delay={0.05}>
      <h2 className="spr-heading-lg">We believe in acceleration.</h2>
      <div className="mt-7 max-w-4xl space-y-5 text-base leading-relaxed text-[color:var(--spr-text-muted)] sm:text-lg">
        <p>The future belongs to the fast.</p>
        <p>Not the biggest. Not the richest. The fastest to adapt.</p>
        <p>
          AI isn&apos;t coming. It&apos;s here. It&apos;s in your competitor&apos;s inbox, your rival&apos;s CRM, your
          industry&apos;s next disruptor.
        </p>
        <p>The companies that thrive won&apos;t be the ones who &quot;looked into AI.&quot;</p>
        <p>They&apos;ll be the ones who deployed it while everyone else was still scheduling evaluation meetings.</p>
        <p className="font-medium text-[color:var(--spr-text)]">We build for people who move.</p>
      </div>
    </AnimatedSection>
  );
}
