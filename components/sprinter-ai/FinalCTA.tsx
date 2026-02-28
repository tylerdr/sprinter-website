"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function FinalCTA() {
  return (
    <AnimatedSection id="final-cta" className="spr-container" delay={0.05}>
      <div className="mx-auto max-w-3xl rounded-[var(--spr-radius-md)] border [border-color:var(--spr-border)] bg-[linear-gradient(140deg,rgba(106,167,255,0.16),rgba(255,171,102,0.12))] p-10 text-center shadow-[var(--spr-shadow-soft)]">
        <h2 className="spr-heading-lg mb-4">Stop Watching. Start Winning.</h2>
        <p className="spr-body-lg mb-8">
          While competitors debate AI strategy, you could have a working solution in 48 hours.
          Every day you wait is a day your competition gets further ahead.
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
