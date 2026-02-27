import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
    <main className="container mx-auto px-4 sm:px-6 py-20 max-w-5xl">
      <div className="mb-10 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
        New Offer
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        Hire a <span className="gradient-text">Fractional AI Co-Founder</span>
      </h1>

      <p className="text-xl text-muted-foreground max-w-3xl mb-10">
        You don&apos;t need another AI consultant. You need an embedded partner who can find leverage and ship real systems with your team.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <BookDemoButton size="lg" text="Book a 30-min AI Leverage Call" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" />
        <Button asChild size="lg" variant="outline">
          <Link href="/accelerate" className="group">
            See Sprinter Accelerate
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5">Delivery model</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {phases.map((item) => (
            <div key={item} className="rounded-lg border bg-card p-5 text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5">What this gets you</h2>
        <ul className="space-y-3">
          {outcomes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-8">
        <h2 className="text-2xl font-semibold mb-3">Best fit</h2>
        <p className="text-muted-foreground mb-6">
          Founder-led teams and operators who want strategy + execution in one seat and need measurable AI outcomes fast.
        </p>
        <Button asChild>
          <Link href="/contact">Talk with Sprinter</Link>
        </Button>
      </section>
    </main>
  );
}
