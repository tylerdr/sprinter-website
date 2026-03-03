"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

export default function CTA() {
  return (
    <AnimatedSection id="cta" className="spr-container spr-section-divider" delay={0.05}>
      <h2 className="spr-heading-lg">Ready to move?</h2>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a href="/sprint" className="spr-button spr-button-primary">
          Start with an AI Readiness Sprint - $2,500
        </a>
        <a
          href="https://cal.com/tyler-dreher"
          target="_blank"
          rel="noopener noreferrer"
          className="spr-button spr-button-secondary"
        >
          Book a Strategy Call - Free, 30 min
        </a>
      </div>
      <p className="spr-body-lg mt-7">Every day you wait is a day your competition gets further ahead.</p>
    </AnimatedSection>
  );
}
