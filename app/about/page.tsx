import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Brain, Users, Target, ArrowRight, Zap } from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { CompanyTimeline } from "@/components/about/company-timeline";
import { ImpactMetrics } from "@/components/shared/impact-metrics";

export const metadata: Metadata = getPageMetadata("about");

const values = [
  {
    icon: Rocket,
    title: "Ship in Weeks",
    description:
      "Working AI systems in production in 2-4 weeks. Sprint-based delivery that proves value before you commit to scale.",
  },
  {
    icon: Brain,
    title: "Empower Your People",
    description:
      "AI that augments human capability, not replaces it. Your team does their best work while AI handles the operational grind.",
  },
  {
    icon: Users,
    title: "Unlimited AI Workforce",
    description:
      "AI agents that work 24/7 on your processes. Scale your operations without scaling headcount.",
  },
  {
    icon: Target,
    title: "Value You Can Measure",
    description:
      "Every implementation tied to real outcomes — hours saved, revenue gained, errors eliminated. No slide decks.",
  },
];

export default function AboutPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30 mb-6">
            <Zap className="w-5 h-5 text-brand" />
            <span className="text-sm font-medium text-brand">Our Story</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Empowering People with{" "}
            <span className="gradient-text">AI Agents</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI is the ultimate leverage for individuals and businesses. We deploy
            AI agent systems that empower your people to do their best work —
            while an unlimited AI workforce handles the operational grind.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="p-8 rounded-2xl bg-card/20 border border-border/30 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">A Note from Our Founder</h2>
            <p className="text-lg text-foreground/80 mb-4">
              I started my career as a mechanical engineer at Exxon. Every day I saw brilliant people slowed by spreadsheets, manual planning, and systems that wouldn&apos;t talk to each other. Later, running a construction business, I ran into the same thing — critical workflows, no software built for how the work actually gets done. Smart people wasting time on tasks that were monotonous for humans and trivial for computers.
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              That frustration became my mission. In 2018 I started Sprinter to bridge the gap between what technology could do and what businesses were actually doing with it. We began with consulting — process optimization, custom software, helping companies modernize. Along the way we built products: Amble Ideation for innovation workshops, Cab-O-Matic for cabinet quoting automation, MortgageQ for lending intelligence.
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              Then AI changed everything. Not the chatbot hype — the real thing. AI agents that can read your emails, manage your CRM, process your invoices, draft your follow-ups, and run your reporting. An unlimited workforce that works 24/7 on your processes, with your data, in your tools. I dedicated myself to this because it&apos;s the ultimate form of technology leverage to empower individuals and businesses.
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              Today, Sprinter deploys AI agent systems across manufacturing, fintech, healthcare, wine &amp; spirits, and more. Our sprint-based approach means you see results in weeks, not quarters. We empower your people to do their best work by taking the operational grind off their plates — not replacing them, but unlocking their potential.
            </p>
            <p className="text-lg text-foreground/80">
              <strong className="text-foreground">Sprinter exists to empower agency — in people and in AI.</strong> Bring us your problem or your dataset. We&apos;ll build the system that turns it into leverage.
            </p>
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-base font-semibold text-foreground">
                — Tyler Dreher
              </p>
              <p className="text-sm text-muted-foreground">
                Founder, Sprinter AI
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group relative p-6 rounded-xl bg-gradient-to-b from-card/5 to-card/10 hover:from-card/10 hover:to-card/15 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-brand/10 to-brand-end/10 mb-5 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
                <div className="absolute inset-0 rounded-xl border border-border/30 group-hover:border-brand/30 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <CompanyTimeline />

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <ImpactMetrics 
            variant="inline" 
            showAnimation={true}
            metrics={[
              {
                value: "250",
                suffix: "K+",
                label: "Data Points Processed",
                color: "gradient-text"
              },
              {
                value: "8",
                suffix: "+",
                label: "Years Building Software",
                color: "gradient-text"
              },
              {
                value: "20",
                suffix: "×",
                label: "ROI on Deployed Systems",
                color: "gradient-text"
              }
            ]}
          />
        </div>

        <div className="text-center p-8 rounded-2xl border border-border/30 bg-brand-10">
          <h3 className="text-3xl font-bold mb-4">
            Ready to{" "}
            <span className="gradient-text">Empower Your Team</span> with AI?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your people have better things to do than data entry and manual follow-ups.
            Let&apos;s deploy AI agents that handle the grind so your team can thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-3 bg-card/30 text-foreground font-medium rounded-lg hover:bg-card/40 transition-colors"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
