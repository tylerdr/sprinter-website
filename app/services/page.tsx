import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import {
  Zap,
  Code,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Target,
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo-structured-data";
import { ExecutionPlaybook } from "@/components/home/execution-playbook";
import { WhyNow } from "@/components/home/why-now";
import { PricingComparison } from "@/components/services/pricing-comparison";
import { ExecutionTimeline } from "@/components/shared/execution-timeline";
import { IconBadge } from "@/components/ui/icon-badge";

export const metadata: Metadata = getPageMetadata("services");



const differentiators = [
  {
    title: "We Ship, Not Slide",
    description: "Working code in 10 days, not PowerPoints in 10 weeks",
    icon: Code,
  },
  {
    title: "Real Engineers",
    description: "Built by developers who've shipped AI at scale since 2018",
    icon: Users,
  },
  {
    title: "ROI Focused",
    description: "Every project tied to measurable business outcomes",
    icon: Target,
  },
];

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        type="service"
        serviceName="AI Consulting Services"
        serviceDescription="Comprehensive AI consulting, development, and transformation services including workshops, rapid prototyping, and enterprise solutions."
      />
      <StructuredData
        type="faq"
        faqs={[
          {
            question: "How long does an AI project typically take?",
            answer:
              "Our AI Sprint delivers production-ready systems in 2-4 weeks. Discovery workshops take 1 day, while enterprise transformations range from 3-6 months depending on scope.",
          },
          {
            question: "What's included in an AI Sprint?",
            answer:
              "An AI Sprint includes a working prototype in 10 days, production deployment with monitoring, integration with existing systems, team training, and 30 days of post-launch support.",
          },
          {
            question: "Do you work with small businesses or just enterprises?",
            answer:
              "We work with businesses of all sizes. Our AI Discovery Workshop is perfect for smaller companies exploring AI opportunities, while our Enterprise AI Transformation serves larger organizations.",
          },
          {
            question: "What kind of ROI can I expect?",
            answer:
              "Our average client sees 250% ROI within 60 days of deployment. Results vary by use case, but we focus on measurable business outcomes and track performance metrics closely.",
          },
        ]}
      />
      <div className="min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-12 md:space-y-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30">
                <Zap className="w-5 h-5 text-brand" />
                <span className="text-sm font-semibold text-brand">
                  How We Work
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                <Balancer>
                  Choose Your <span className="gradient-text">AI Journey</span>
                </Balancer>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed">
                <Balancer>
                  Now&apos;s the time to seize an AI advantage. We build systems that 
                  amplify what you&apos;re already great at and handle the stuff that 
                  slows you down.
                </Balancer>
              </p>
            </div>
          </div>

          <div className="mt-16">
            <PricingComparison />
          </div>

          <ExecutionTimeline />

          <div className="mt-16">
            <WhyNow />
          </div>

          <div className="mt-16">
            <ExecutionPlaybook />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-success-30 bg-success-10"
              >
                <IconBadge
                  icon={<item.icon className="w-5 h-5 text-success" />}
                  title={item.title}
                  body={item.description}
                  className="mb-0"
                />
              </div>
            ))}
          </div>

          {/* Advisory Section - Detailed for conversion */}
          <div className="mt-16">
            <div className="p-8 rounded-2xl border border-info-30 bg-info-10">
              <h2 className="text-3xl font-semibold mb-6 text-center tracking-tight leading-tight">
                <Balancer>
                  Vibe Coding, Without the Vibes Failing in Prod
                </Balancer>
              </h2>
              <p className="text-lg text-center text-muted-foreground mb-8 max-w-3xl mx-auto font-normal leading-relaxed">
                <Balancer>
                  Weekly office hours, async code reviews, test harness scaffolds, observability, productionizing checklist. $20k/mo.
                </Balancer>
              </p>
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
                >
                  Book Technical Screening
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* PE Section - keep this as it's not duplicated in pricing */}
          <div className="mt-16">
            <div className="p-8 rounded-2xl border border-brand-30 bg-brand-10">
              <h2 className="text-3xl font-semibold mb-6 text-center tracking-tight leading-tight">
                <Balancer>
                  For Private Equity & Investors
                </Balancer>
              </h2>
              <p className="text-lg text-center text-muted-foreground mb-8 max-w-3xl mx-auto font-normal leading-relaxed">
                <Balancer>
                  We act as your AI SWAT team across your portfolio: 4-8 weeks per company, 30-50% efficiency gains.
                </Balancer>
              </p>
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
                >
                  Request Portfolio Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-brand-30 bg-brand-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
                    <Balancer>
                      Not Sure Where to Start?
                    </Balancer>
                  </h3>
                  <p className="text-muted-foreground mb-4 font-normal leading-relaxed">
                    <Balancer>
                      Let&apos;s have a conversation about your AI goals.
                      We&apos;ll recommend the best path forward - honest
                      technical advice from engineers who&apos;ve been there.
                    </Balancer>
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>30-min call</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>No sales pressure</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
                  >
                    Start a 10-Day Sprint
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
