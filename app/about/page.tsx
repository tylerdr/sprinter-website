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
    title: "Prototype in 10 Days",
    description:
      "First prototype in 10 days. We ship AI solutions at the speed of innovation, not bureaucracy.",
  },
  {
    icon: Brain,
    title: "Human-Centered by Default",
    description:
      "We build AI that augments human capability, not replaces it. Technology should enable people to do work they love.",
  },
  {
    icon: Users,
    title: "Create Abundance",
    description:
      "AI doesn't destroy jobs—it creates opportunities. We've helped create 50+ new roles by automating the mundane.",
  },
  {
    icon: Target,
    title: "Build with Purpose",
    description:
      "Every AI system we build frees humans from repetitive tasks so they can pursue meaningful, creative work.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30 mb-6">
            <Zap className="w-5 h-5 text-brand" />
            <span className="text-sm font-medium text-brand">Our Story</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Build an Unfair Advantage with{" "}
            <span className="gradient-text">Agentic AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI is a generational shift—akin to the industrial revolution. We
            ship production systems that accelerate what you already do well,
            fill operational gaps, and create durable competitive advantage.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="p-8 rounded-2xl bg-card/20 border border-border/30 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">A Note from Our Founder</h2>
            <p className="text-lg text-foreground/80 mb-4">
              I started my career as an engineer at Exxon. Every day I saw brilliant people slowed by spreadsheets, manual planning, and systems that wouldn&apos;t talk to each other. Later, running a construction/roofing company, I ran into the same thing—critical workflows, no software built for how the work actually gets done. Curiosity and frustration pushed me to build the tools I needed in both worlds: software to plan maintenance, systems to run field ops, and automation that freed my team to focus on real work.
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              I can&apos;t stand the idea of smart people burning hours on tasks that are monotonous for humans and trivial for computers. In 2018 I left Exxon and started Sprinter to fix that. We began with predictive maintenance, analytics and AI, learned fast by building (and breaking) internal SaaS experiments, and ran our first AI workshop in 2019 to help clients find practical use cases. By 2020, a first API call to GPT-3 blew the doors off what was possible. In 2021 we leaned into agentic patterns—if a model can write, it can decide; if it can decide, it can act. In 2022 we formalized our workshops and built Amble Ideation to scale them.
            </p>
            <p className="text-lg text-foreground/80">
              <strong className="text-foreground">Sprinter exists to empower agency—in people and in AI.</strong> Bring us your problem or your dataset. We&apos;ll build the system that turns it into leverage.
            </p>
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-base font-semibold text-foreground">
                — Tyler Dreher
              </p>
              <p className="text-sm text-muted-foreground">
                Founder & CEO, Sprinter AI
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
                value: "10",
                suffix: "M+",
                label: "Revenue Generated",
                color: "gradient-text"
              },
              {
                value: "50",
                suffix: "+",
                label: "AI Products Deployed",
                color: "gradient-text"
              },
              {
                value: "100",
                suffix: "%",
                label: "Client Satisfaction",
                color: "gradient-text"
              }
            ]}
          />
        </div>

        <div className="text-center p-8 rounded-2xl border border-border/30 bg-brand-10">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Build AI That{" "}
            <span className="gradient-text">Empowers People</span>?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the companies creating abundance through human-centered AI.
            Let&apos;s build technology that helps people thrive.
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
