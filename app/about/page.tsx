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
    title: "Move at the Pace of AI",
    description:
      "First prototype in 10 days. We ship AI solutions at the speed of innovation, not bureaucracy.",
  },
  {
    icon: Brain,
    title: "Human-Centered Design",
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
    title: "Purposeful Innovation",
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
          <div className="p-8 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">A Note from Our Founder</h2>
            <p className="text-lg text-foreground/80 mb-4 italic">
              &quot;In 2018, I was watching companies spend millions on AI
              consultants who delivered PowerPoints instead of products. I knew
              there had to be a better way.&quot;
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              After building AI systems at scale for enterprises, I founded
              Sprinter AI to prove a simple idea: momentum beats slideware. Ship
              useful AI fast, measure impact, and compound advantage.
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              We specialize in applying AI where it moves the needle most—often
              in overlooked industries with rich workflows and data:
              manufacturing, healthcare, financial services, logistics. These
              sectors have the most to gain and the fewest fast movers.
            </p>
            <p className="text-lg text-foreground/80 mb-4">
              Six years and 50+ deployments later, the playbook is battle-
              tested: automate the repetitive, operationalize unstructured data,
              augment teams with agents, and integrate into the systems you
              already use. Not in theory—live in production.
            </p>
            <p className="text-lg text-foreground/80">
              <strong className="text-foreground">Our philosophy:</strong>
              Move quickly, build real systems, and compound advantage. Great AI
              gives teams back time and amplifies what they&apos;re already
              world‑class at.
            </p>
            <div className="mt-8 pt-6 border-t border-border/10">
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
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all"
              >
                <div className="p-3 rounded-lg border border-brand-30 bg-brand-10 w-fit mb-4">
                  <value.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
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

        <div className="text-center p-8 rounded-2xl border border-border/10 bg-brand-10">
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
              className="inline-flex items-center gap-2 px-8 py-3 bg-card/10 text-foreground font-medium rounded-lg hover:bg-card/20 transition-colors"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
