import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, CheckCircle2, ArrowRight, Shield, TrendingUp,
  Building2, Calendar, PhoneCall, FileText, Award,
  Target, Briefcase, Brain, ChevronRight, UserCheck, Zap
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { PRICING } from "@/lib/constants";

export const metadata: Metadata = getPageMetadata("fractionalCAIO");

const responsibilities = [
  {
    icon: Brain,
    category: "Strategic Leadership",
    items: [
      "Board meeting attendance & presentation rights",
      "Cross-portfolio AI strategy alignment",
      "Competitive intelligence & market positioning",
      "Long-term AI roadmap development"
    ]
  },
  {
    icon: Shield,
    category: "Governance & Risk",
    items: [
      "AI governance framework development & oversight",
      "Vendor evaluation & contract negotiation",
      "Data privacy & security policy",
      "Regulatory compliance monitoring"
    ]
  },
  {
    icon: Building2,
    category: "Portfolio Orchestration",
    items: [
      "AI maturity assessment across holdings",
      "Opportunity identification & prioritization",
      "Best practice sharing between portcos",
      "Implementation roadmap & resource allocation"
    ]
  },
  {
    icon: FileText,
    category: "Communication & Reporting",
    items: [
      "LP/investor AI updates & reporting",
      "Family principal education & enablement",
      "Investment committee presentations",
      "Quarterly competitive briefings"
    ]
  }
];

const deliverables = [
  {
    timeline: "First 30 Days",
    items: [
      "AI maturity assessment across all holdings",
      "Top 10 opportunities with ROI projections",
      "Governance framework (draft)",
      "First board presentation",
      "90-day execution roadmap"
    ]
  },
  {
    timeline: "Months 2-3",
    items: [
      "Governance policies ratified by board",
      "Vendor landscape analysis & recommendations",
      "Pilot implementation kickoff (1-2 portcos)",
      "Investment committee AI training",
      "Competitive intelligence report"
    ]
  },
  {
    timeline: "Months 4-6",
    items: [
      "Pilot results measurement & board update",
      "Portfolio-wide implementation roadmap",
      "Cross-portco best practice playbook",
      "Annual AI strategy refresh",
      "LP reporting framework"
    ]
  },
  {
    timeline: "Ongoing (Months 7+)",
    items: [
      "Quarterly board presentations",
      "Monthly strategy sessions (3-4 hours)",
      "Continuous vendor & technology monitoring",
      "Portfolio AI health dashboard",
      "On-demand counsel via phone/Slack"
    ]
  }
];

const differentiators = [
  {
    title: "Practitioner Credibility",
    description: "We've built production AI systems for 100+ companies. We advise at the board level and execute at the portfolio level."
  },
  {
    title: "Independent Perspective",
    description: "No vendor incentives, no software to sell, no referral fees. Our only incentive is your success and renewal."
  },
  {
    title: "Permanent Capital Mindset",
    description: "We understand generational timelines, family governance, and the unique dynamics of multi-generational wealth."
  },
  {
    title: "Flexible Engagement",
    description: "20-30 hours/month executive availability. Scale up for major initiatives, scale down during quieter periods."
  }
];

const idealClients = [
  {
    profile: "Family Offices ($1B+ AUM)",
    needs: [
      "5+ portfolio companies across multiple industries",
      "Board-level AI counsel & governance",
      "Strategic vendor negotiations",
      "Multi-year AI roadmap"
    ]
  },
  {
    profile: "Multi-Holding Structures",
    needs: [
      "Complex ownership structures",
      "Cross-portfolio AI strategy",
      "Independent principal counsel",
      "Legacy business protection"
    ]
  },
  {
    profile: "PE Firms ($500M+ AUM)",
    needs: [
      "Portfolio-wide AI value creation",
      "LP reporting & communication",
      "Deal diligence support",
      "Operating partner augmentation"
    ]
  }
];

const pricing = PRICING.fractionalCAIO;
const bundle = PRICING.bundles.caioGovernance;

export default function FractionalCAIOPage() {
  return (
    <div className="min-h-screen py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <Users className="w-3 h-3 mr-1" />
            C-Suite AI Leadership for Family Offices & Holding Companies
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Fractional <span className="gradient-text">Chief AI Officer</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic AI leadership for complex permanent capital structures. Board-level counsel,
            cross-portfolio orchestration, and governance oversight—without full-time overhead.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact?type=fractional-caio">
              <Button size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="gap-2">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div>
              <p className="text-3xl font-bold text-primary">{pricing.price}</p>
              <p className="text-sm text-muted-foreground">Monthly investment</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">20-30hrs</p>
              <p className="text-sm text-muted-foreground">Executive availability</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">2 Weeks</p>
              <p className="text-sm text-muted-foreground">To start</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">$12B+</p>
              <p className="text-sm text-muted-foreground">AUM advised</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Full-Time CAIO Problem */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                The Full-Time CAIO Problem
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="font-semibold mb-2">Full-Time Hire: $550K+ annually</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• $400K base salary + $150K benefits/equity</li>
                    <li>• 12-18 month search & onboarding</li>
                    <li>• Needs team, budget, political capital</li>
                    <li>• May lack experience across your sectors</li>
                    <li>• Single perspective, limited network</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-semibold mb-2">Fractional CAIO: ${pricing.price}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• C-suite strategic value, 20% of overhead</li>
                    <li>• Start in 2 weeks, not 18 months</li>
                    <li>• Battle-tested across 100+ companies</li>
                    <li>• Practitioner + advisor credibility</li>
                    <li>• No politics, pure strategic counsel</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">
                What You Get: C-Suite Leadership Without the Overhead
              </h3>
              <div className="space-y-3">
                {[
                  "Board meeting attendance with presentation rights",
                  "Direct access via phone/text for urgent decisions",
                  "Strategic vendor negotiations & contract review",
                  "Cross-portfolio AI strategy & governance",
                  "LP/investor reporting & communication",
                  "Quarterly competitive intelligence briefings",
                  "Reserved implementation capacity when needed"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Your Fractional CAIO Responsibilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Full C-suite AI leadership across strategy, governance, execution, and communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {responsibilities.map((resp, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <resp.icon className="w-5 h-5 text-primary" />
                  {resp.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resp.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Deliverables Timeline */}
      <section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What to Expect: 12-Month Deliverables Timeline
            </h2>
            <p className="text-lg text-muted-foreground">
              Clear milestones and deliverables from day one
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((phase, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {phase.timeline}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Clients */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Who This Is For
          </h2>
          <p className="text-lg text-muted-foreground">
            Best fit for complex structures requiring C-suite AI leadership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {idealClients.map((client, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">{client.profile}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold mb-3 text-primary">TYPICAL NEEDS:</p>
                <ul className="space-y-2">
                  {client.needs.map((need, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{need}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Sprinter */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Sprinter as Your Fractional CAIO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((diff, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{diff.title}</h3>
                  <p className="text-muted-foreground">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple, predictable monthly retainer. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base Package */}
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Fractional CAIO</CardTitle>
              <div className="space-y-1">
                <p className="text-3xl font-bold">{pricing.price}</p>
                <p className="text-sm text-muted-foreground">{pricing.duration}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                {pricing.description}
              </p>
              <p className="text-xs font-semibold mb-3">INCLUDES:</p>
              <ul className="space-y-2 mb-6">
                {pricing.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact?type=fractional-caio">
                <Button className="w-full" variant="outline">
                  Schedule Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Bundle Package */}
          <Card className="border-primary shadow-xl shadow-primary/20 relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle>{bundle.name}</CardTitle>
              <div className="space-y-1">
                <p className="text-3xl font-bold">{bundle.price}</p>
                <p className="text-sm text-muted-foreground">{bundle.duration}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                {bundle.description}
              </p>
              <p className="text-xs font-semibold mb-3">INCLUDES:</p>
              <ul className="space-y-2 mb-6">
                {bundle.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact?type=caio-package">
                <Button className="w-full">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Custom packages available for larger portfolios or unique governance structures.
            <Link href="/contact" className="text-primary hover:underline ml-1">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-primary/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for C-Suite AI Leadership?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join family offices managing $12B+ who trust Sprinter for strategic AI counsel.
              First consultation is complimentary—no vendor pitches, just strategic perspective.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?type=fractional-caio">
                <Button size="lg" className="gap-2">
                  <UserCheck className="w-5 h-5" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/family-office">
                <Button size="lg" variant="outline" className="gap-2">
                  <Building2 className="w-5 h-5" />
                  Explore Family Office Services
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
