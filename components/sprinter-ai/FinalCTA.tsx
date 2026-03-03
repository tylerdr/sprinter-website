"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function FinalCTA() {
  return (
    <AnimatedSection id="final-cta" className="spr-container" delay={0.05}>
      <div className="mx-auto max-w-3xl rounded-[var(--spr-radius-md)] border [border-color:var(--spr-border)] bg-[linear-gradient(140deg,rgba(106,167,255,0.16),rgba(255,171,102,0.12))] p-10 text-center shadow-[var(--spr-shadow-soft)]">
        <h2 className="spr-heading-lg mb-4">Ready to unlock your team&apos;s potential?</h2>
        <p className="spr-body-lg mb-8">
          Your people have better things to do than data entry, manual follow-ups, and repetitive reporting.
          Let AI agents handle the grind while your team does the work that matters.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link href="/contact" className="spr-button spr-button-primary">
            Start a Conversation
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <a
            href="https://cal.com/tyler-dreher"
            target="_blank"
            rel="noopener noreferrer"
            className="spr-button spr-button-secondary"
          >
            Book a Strategy Call — Free, 30 min
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
