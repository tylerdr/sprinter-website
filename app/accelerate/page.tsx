import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/shared/book-demo-button";

export const metadata: Metadata = {
  title: "Sprinter Accelerate | Sprinter AI",
  description:
    "A monthly implementation retainer to deploy AI systems fast, track ROI weekly, and compound wins across your portfolio.",
};

const timeline = [
  "Week 1: Prioritize highest-value workflow and lock acceptance criteria.",
  "Week 2: Deploy first production workflow with operator handoff.",
  "Weeks 3-4: Optimize performance, add guardrails, and document playbooks.",
  "Month 2+: Replicate wins across teams and portfolio companies.",
];

const outcomes = [
  "Production-ready automations (not slide decks)",
  "Operator-ready SOPs and training",
  "Weekly ROI scorecard with leading indicators",
  "Reusable implementation playbooks for repeatability",
];

export default function AcceleratePage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-20 max-w-5xl">
      <div className="mb-10 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
        Sprinter Accelerate
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        Keep the momentum: <span className="gradient-text">ship AI every month</span>
      </h1>

      <p className="text-xl text-muted-foreground max-w-3xl mb-10">
        Accelerate is our implementation retainer for teams that want consistent AI delivery,
        measurable outcomes, and portfolio-wide repeatability.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <BookDemoButton size="lg" text="Book Accelerate Call" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" />
        <Button asChild size="lg" variant="outline">
          <Link href="/pricing" className="group">
            See Pricing
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5">How it runs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {timeline.map((item) => (
            <div key={item} className="rounded-lg border bg-card p-5 text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5">What you get</h2>
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
          PE firms, operating teams, and growth-stage companies that are done experimenting and ready
          to operationalize AI with weekly execution cadence.
        </p>
        <Button asChild>
          <Link href="/contact">Talk with Sprinter</Link>
        </Button>
      </section>
    </main>
  );
}
