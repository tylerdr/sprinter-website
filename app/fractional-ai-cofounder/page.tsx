import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Guarantee from "@/components/sprinter-ai/Guarantee";
import TrustedBy from "@/components/sprinter-ai/TrustedBy";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/shared/book-demo-button";
import StickyCTA from "@/components/sprinter-ai/StickyCTA";
import { generateServiceStructuredData, getStructuredDataScript } from "@/lib/seo";

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

const serviceData = generateServiceStructuredData(
  "Fractional AI Co-Founder",
  "An embedded AI execution partner that helps operators identify high-leverage use cases and ship production AI systems in weeks.",
  "8000"
);

export default function FractionalAICoFounderPage() {
  return (
    <div className="spr-theme spr-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={getStructuredDataScript(serviceData)}
      />
      <main className="container mx-auto max-w-5xl overflow-x-hidden px-4 py-20 pb-36 sm:px-6">
        <div className="mb-10 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          Embedded Offer
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Hire a <span className="gradient-text">Fractional AI Co-Founder</span>
        </h1>

        <p className="mb-10 max-w-3xl text-xl text-muted-foreground">
          Turn AI into daily operating leverage. We embed with your team, deploy agents into real workflows, and tie each release to time saved, revenue gained, or margin protected.
        </p>

        <section className="mb-12 rounded-2xl border border-[color:var(--spr-border,#23314f)] bg-[color:var(--spr-surface,#0f1b33)] p-8 shadow-[var(--spr-shadow-soft,0_12px_30px_rgba(1,4,14,0.35))]">
          <h2 className="mb-3 text-2xl font-semibold text-[color:var(--spr-text,#f4f8ff)]">
            Starting at $8,000/month - 3-month minimum commitment
          </h2>
          <p className="max-w-4xl text-base leading-relaxed text-[color:var(--spr-text-muted,#9fadc8)] sm:text-lg">
            No slide decks. No hand-offs. One embedded operator who ships working AI systems inside your stack, with your team, on your timeline.
          </p>
        </section>

        <TrustedBy />

        <div className="mb-16 mt-12">
          <BookDemoButton
            size="lg"
            text="Book a 30-min AI Leverage Call"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Need a lighter engagement first? Start with the <Link href="/ai-sprint" className="text-primary hover:underline">AI Readiness Sprint</Link>.
          </p>
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
            Mid-market operators who need strategy and shipping in one seat, and want measurable AI outcomes inside the next 30-90 days.
          </p>
          <Button asChild>
            <Link href="/contact">Talk with Sprinter</Link>
          </Button>
        </section>
      </main>
      <StickyCTA href="https://cal.com/tyler-dreher" label="Book AI Leverage Call" />
    </div>
  );
}
