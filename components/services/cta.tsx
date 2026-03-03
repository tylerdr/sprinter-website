"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export function ServicesCTA() {
  return (
    <AnimatedSection id="services-cta" className="spr-container" delay={0.05}>
      <div className="mx-auto max-w-3xl rounded-[var(--spr-radius-md)] border [border-color:var(--spr-border)] bg-[linear-gradient(140deg,rgba(106,167,255,0.16),rgba(255,171,102,0.12))] p-10 text-center shadow-[var(--spr-shadow-soft)]">
        <ShieldCheckIcon className="h-10 w-10 text-[color:var(--spr-primary)] mx-auto mb-4" />
        <h2 className="spr-heading-lg mb-4">Ready to Start Your AI Journey?</h2>
        <p className="spr-body-lg mb-8">
          Pick the engagement that fits. All with transparent pricing and clear deliverables.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/contact" className="spr-button spr-button-primary">
            Start a Conversation
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link href="/ai-sprint" className="spr-button spr-button-secondary">
            See the AI Sprint — $2,500
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 text-sm text-[color:var(--spr-text-muted)]">
          <div>30-45 day delivery</div>
          <div>Fixed pricing, no surprises</div>
          <div>Your team, empowered</div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Link href="/approach" className="group">
          <div className="spr-card p-6">
            <h3 className="font-semibold text-[color:var(--spr-text)] mb-2 group-hover:text-[color:var(--spr-primary)] transition-colors">
              Our Approach →
            </h3>
            <p className="text-sm text-[color:var(--spr-text-muted)]">
              Learn about our people-first methodology
            </p>
          </div>
        </Link>

        <Link href="/case-studies" className="group">
          <div className="spr-card p-6">
            <h3 className="font-semibold text-[color:var(--spr-text)] mb-2 group-hover:text-[color:var(--spr-primary)] transition-colors">
              Case Studies →
            </h3>
            <p className="text-sm text-[color:var(--spr-text-muted)]">
              See real results from portfolio companies
            </p>
          </div>
        </Link>

        <Link href="/contact" className="group">
          <div className="spr-card p-6">
            <h3 className="font-semibold text-[color:var(--spr-text)] mb-2 group-hover:text-[color:var(--spr-primary)] transition-colors">
              Contact Us →
            </h3>
            <p className="text-sm text-[color:var(--spr-text-muted)]">
              Get started with a free discovery call
            </p>
          </div>
        </Link>
      </div>
    </AnimatedSection>
  );
}
