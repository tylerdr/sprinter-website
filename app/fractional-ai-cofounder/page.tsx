import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Guarantee from "@/components/sprinter-ai/Guarantee";
import TrustedBy from "@/components/sprinter-ai/TrustedBy";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/shared/book-demo-button";

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
    <main className="container mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="mb-10 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
        New Offer
      </div>

      <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
        Hire a <span className="gradient-text">Fractional AI Co-Founder</span>
      </h1>

      <p className="mb-10 max-w-3xl text-xl text-muted-foreground">
        You don&apos;t need another AI consultant. You need an embedded partner who can find leverage and ship real systems with your team.
      </p>

      <section className="mb-12 rounded-2xl border border-[color:var(--spr-border,#23314f)] bg-[color:var(--spr-surface,#0f1b33)] p-8 shadow-[var(--spr-shadow-soft,0_12px_30px_rgba(1,4,14,0.35))]">
        <h2 className="mb-3 text-2xl font-semibold text-[color:var(--spr-text,#f4f8ff)]">
          Starting at $8,000/month — 3-month minimum commitment
        </h2>
        <p className="max-w-4xl text-base leading-relaxed text-[color:var(--spr-text-muted,#9fadc8)] sm:text-lg">
          Stop hiring AI consultants who leave you with slide decks. Get an embedded operator who ships working systems — your tools, your team, your timeline.
        </p>
      </section>

      <TrustedBy />

      <div className="mb-16 mt-12 flex flex-col gap-4 sm:flex-row">
        <BookDemoButton
          size="lg"
          text="Book a 30-min AI Leverage Call"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        />
        <Button asChild size="lg" variant="outline">
          <Link href="/accelerate" className="group">
            See Sprinter Accelerate
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-semibold">Delivery model</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {phases.map((item) => (
            <div key={item} className="rounded-lg border bg-card p-5 text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-semibold">What this gets you</h2>
        <ul className="space-y-3">
          {outcomes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Guarantee />

      <section className="rounded-2xl border bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-8">
        <h2 className="mb-3 text-2xl font-semibold">Best fit</h2>
        <p className="mb-6 text-muted-foreground">
          Founder-led teams and operators who want strategy + execution in one seat and need measurable AI outcomes fast.
        </p>
        <Button asChild>
          <Link href="/contact">Talk with Sprinter</Link>
        </Button>
      </section>
    </main>
  );
}
