import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/sprinter-ai/Footer";
import Header from "@/components/sprinter-ai/Header";
import StickyCTA from "@/components/sprinter-ai/StickyCTA";

export const metadata: Metadata = {
  title: "Fractional AI Co-Founder | Sprinter AI",
  description:
    "Embedded AI strategy and execution partner. Assess, Build, and Scale working AI systems in weeks.",
};

const phases = [
  "Assess (Week 1): identify the highest-leverage AI opportunities.",
  "Build (Weeks 2-4): ship one production use case with your team.",
  "Scale (Ongoing): train the team and roll out a repeatable AI playbook.",
];

const outcomes = [
  "Embedded execution partner, not just strategy advice",
  "Working systems shipped in weeks, not months",
  "Hands-on implementation with your existing tools and workflows",
  "Clear roadmap to scale what works across the business",
];

export default function FractionalAICoFounderPage() {
  return (
    <div className="spr-theme spr-page">
      <Header />
      <main className="spr-container py-20 pb-32 sm:px-2">
        <div className="mb-10 inline-flex items-center rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)] px-4 py-2 text-sm font-medium text-[color:var(--spr-primary)]">
          New Offer
        </div>

        <h1 className="spr-heading-xl mb-6 max-w-4xl">
          Hire a <span className="gradient-text">Fractional AI Co-Founder</span>
        </h1>

        <p className="spr-body-lg mb-10 max-w-3xl">
          You don&apos;t need another AI consultant. You need an embedded partner who can find leverage and ship real systems with your team.
        </p>

        <div className="mb-16 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://cal.com/tyler-dreher"
            target="_blank"
            rel="noopener noreferrer"
            className="spr-button spr-button-primary"
          >
            Book a 30-min AI Leverage Call
          </a>
          <Link href="/accelerate" className="spr-button spr-button-secondary group">
            See Sprinter Accelerate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <section className="mb-14">
          <h2 className="spr-heading-lg mb-5">Delivery model</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {phases.map((item) => (
              <div key={item} className="spr-card p-5 text-[color:var(--spr-text-muted)]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="spr-heading-lg mb-5">What this gets you</h2>
          <ul className="space-y-3">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[color:var(--spr-text-muted)]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[color:var(--spr-primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="spr-card spr-card-accent rounded-[var(--spr-radius-md)] p-8">
          <h2 className="spr-heading-lg mb-3">Best fit</h2>
          <p className="spr-body mb-6">
            Founder-led teams and operators who want strategy + execution in one seat and need measurable AI outcomes fast.
          </p>
          <Link href="/contact" className="spr-button spr-button-primary">
            Talk with Sprinter
          </Link>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
