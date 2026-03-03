"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function ApproachCTA() {
  return (
    <AnimatedSection id="approach-cta" className="spr-container" delay={0.05}>
      <div className="mx-auto max-w-3xl rounded-[var(--spr-radius-md)] border [border-color:var(--spr-border)] bg-[linear-gradient(140deg,rgba(106,167,255,0.16),rgba(255,171,102,0.12))] p-10 text-center shadow-[var(--spr-shadow-soft)]">
        <h2 className="spr-heading-lg mb-4">Ready to Build People-First AI?</h2>
        <p className="spr-body-lg mb-8">
          Start with a workshop or sprint. See measurable results in weeks, not months.
          Your team will thank you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="spr-button spr-button-primary">
            Start a Conversation
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link href="/case-studies" className="spr-button spr-button-secondary">
            See Client Results
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
