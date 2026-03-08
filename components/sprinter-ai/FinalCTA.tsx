"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function FinalCTA() {
  return (
    <AnimatedSection id="final-cta" className="spr-container" delay={0.05}>
      <div className="mx-auto max-w-3xl rounded-[var(--spr-radius-md)] border [border-color:var(--spr-border)] bg-[linear-gradient(140deg,rgba(106,167,255,0.16),rgba(255,171,102,0.12))] p-10 text-center shadow-[var(--spr-shadow-soft)]">
        <h2 className="spr-heading-lg mb-4">Find out what AI can do for your business.</h2>
        <p className="spr-body-lg mb-8">
          We&apos;ll audit your operations, identify the highest-value automation opportunities,
          and show you exactly where AI agents can save your team time. No commitment required.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link href="/contact" className="spr-button spr-button-primary">
            Get Your Free AI Assessment
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <p className="text-sm text-[color:var(--spr-text-muted)]">
            Or reach out directly: <a href="mailto:hello@sprinter.ai" className="text-[color:var(--spr-primary)] hover:underline">hello@sprinter.ai</a>
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
