import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, CheckCircle2, ArrowRight, MessageSquare, Calendar,
  FileText, TrendingUp, Users, Phone, Slack, X as XIcon,
  ChevronRight, Award, Zap
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { PRICING } from "@/lib/constants";

export const metadata: Metadata = getPageMetadata("aiAdvisor");

const useCases = [
  {
    icon: Shield,
    title: "Vendor Evaluation",
    scenario: "You're evaluating 3 AI vendors for a critical capability. Which is the right choice?",
    howWeHelp: "We assess technical architecture, pricing fairness, integration complexity, and lock-in risk. We've seen 100+ vendor implementations—we know what works."
  },
  {
    icon: TrendingUp,
    title: "Strategic Roadmap",
    scenario: "You need an AI strategy but don't have in-house AI expertise. Where do you start?",
    howWeHelp: "Monthly strategy sessions identify quick wins, build multi-year roadmap, and create board-ready presentations. We guide, you decide."
  },
  {
    icon: FileText,
    title: "Governance & Policy",
    scenario: "Your board asks about AI risk, data privacy, and responsible AI policies. You need frameworks, fast.",
    howWeHelp: "We provide templates, best practices, and guidance to develop governance policies that protect you without slowing innovation."
  },
  {
    icon: Users,
    title: "Build vs. Buy Decisions",
    scenario: "Should you build custom AI, buy off-the-shelf, or hire a vendor? Each has trade-offs.",
    howWeHelp: "We model all three scenarios with real cost/timeline projections based on practitioner experience. Independent perspective, no sales agenda."
  }
];

const whatYouGet = [
  {
    title: "Monthly 90-Minute Strategy Sessions",
    description: "Scheduled calls to discuss priorities, review vendor proposals, plan implementations, or workshop AI opportunities."
  },
  {
    title: "Unlimited Async Advisory",
    description: "Slack or email access for quick questions, contract reviews, or sanity checks. Response within 24 hours (usually same-day)."
  },
  {
    title: "Quarterly AI Landscape Briefings",
    description: "What's new in AI that matters for your business? We filter the hype and highlight what's actually ready for production."
  },
  {
    title: "Vendor Evaluation & Negotiation Support",
    description: "Review vendor proposals, assess technical claims, negotiate pricing, and identify red flags before you sign."
  },
  {
    title: "Board Presentation Preparation (2x/year)",
    description: "We help you prepare board-ready AI updates, ROI justifications, and risk assessments. Optional: We present directly."
  },
  {
    title: "Priority Implementation Access",
    description: "If you decide to move from counsel to execution, you get priority allocation of our implementation capacity."
  },
  {
    title: "AI Governance Templates",
    description: "Access to our library of governance policies, vendor evaluation rubrics, and best practice frameworks."
  }
];

const whatYouDontGet = [
  "Hands-on implementation or engineering work",
  "Dedicated project management resources",
  "Custom software development",
  "On-site presence (all remote unless separately negotiated)",
  "24/7 availability (business hours only)"
];

const idealFor = [
  {
    profile: "Family Offices",
    description: "5-15 portfolio companies, need strategic AI counsel but not full-time CAIO overhead",
    metrics: "AUM: $250M-$1B"
  },
  {
    profile: "Strategic Buyers",
    description: "Corporate development teams evaluating AI capabilities for M&A or partnership decisions",
    metrics: "Annual deal volume: 2-5"
  },
  {
    profile: "Holding Companies",
    description: "Multi-business operators needing AI guidance across diverse sectors",
    metrics: "Holdings: 3-8 companies"
  },
  {
    profile: "PE Firms (Smaller Funds)",
    description: "Funds without dedicated AI operating partners needing on-demand AI expertise",
    metrics: "AUM: $100-500M"
  }
];

const pricing = PRICING.aiAdvisor;
const annualRetainer = PRICING.addOns.annualRetainer;

const comparisonTable = [
  { feature: "Monthly strategy sessions", advisor: "90 minutes", caio: "3-4 hours", implementation: "Included in PMO" },
  { feature: "Async advisory access", advisor: "Unlimited (24hr response)", caio: "Unlimited (same-day)", implementation: "Project-specific" },
  { feature: "Board presentation support", advisor: "2x/year (optional)", caio: "Quarterly (attended)", implementation: "As needed" },
  { feature: "Hands-on implementation", advisor: false, caio: "1 sprint/quarter", implementation: "Primary focus" },
  { feature: "Governance framework", advisor: "Templates provided", caio: "Custom development", implementation: "N/A" },
  { feature: "Vendor negotiations", advisor: "Support & review", caio: "Lead negotiations", implementation: "Technical validation" },
  { feature: "Pricing", advisor: "$8-15K/mo", caio: "$35-60K/mo", implementation: "$12-125K/mo" }
];

export default function AIAdvisorRetainerPage() {
  return (
    <div className="min-h-screen py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <Shield className="w-3 h-3 mr-1" />
            Strategic AI Counsel Without Implementation Overhead
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            AI Advisor <span className="gradient-text">Retainer</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monthly strategic counsel for principals who need independent perspective on AI strategy,
            vendor selection, and governance—without committing to full implementation partnerships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact?type=ai-advisor">
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
              <p className="text-3xl font-bold text-primary">90 min</p>
              <p className="text-sm text-muted-foreground">Monthly sessions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24hr</p>
              <p className="text-sm text-muted-foreground">Async response time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">3 months</p>
              <p className="text-sm text-muted-foreground">Minimum commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            When You Need an AI Advisor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Common scenarios where independent AI counsel delivers immediate value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "{useCase.scenario}"
                    </p>
                  </div>
                </div>
                <div className="pl-16">
                  <p className="text-sm font-semibold text-primary mb-1">HOW WE HELP:</p>
                  <p className="text-sm text-muted-foreground">{useCase.howWeHelp}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What's Included
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive strategic AI counsel on a monthly retainer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {whatYouGet.map((item, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <XIcon className="w-5 h-5" />
                  What's NOT Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {whatYouDontGet.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <XIcon className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Need hands-on implementation?</strong> You can upgrade to{" "}
                    <Link href="/fractional-caio" className="text-primary hover:underline">
                      Fractional CAIO
                    </Link>
                    {" "}or add{" "}
                    <Link href="/operating-partner" className="text-primary hover:underline">
                      implementation services
                    </Link>
                    {" "}at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
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
            Best fit for organizations needing strategic counsel without implementation commitments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {idealFor.map((client, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">{client.profile}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{client.description}</p>
                <Badge variant="outline" className="text-xs">
                  {client.metrics}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How AI Advisor Compares to Other Engagements
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the right level of involvement for your needs
            </p>
          </div>

          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold bg-primary/5">AI Advisor</th>
                      <th className="text-center p-4 font-semibold">Fractional CAIO</th>
                      <th className="text-center p-4 font-semibold">Implementation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="text-center p-4 bg-primary/5">
                          {typeof row.advisor === 'boolean' ? (
                            row.advisor ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XIcon className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.advisor}</span>
                          )}
                        </td>
                        <td className="text-center p-4">
                          {typeof row.caio === 'boolean' ? (
                            row.caio ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XIcon className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.caio}</span>
                          )}
                        </td>
                        <td className="text-center p-4">
                          {typeof row.implementation === 'boolean' ? (
                            row.implementation ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XIcon className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.implementation}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Month-to-month or save 25% with annual commitment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly */}
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Monthly Retainer</CardTitle>
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
                {pricing.includes.slice(0, 5).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact?type=ai-advisor">
                <Button className="w-full" variant="outline">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Annual */}
          <Card className="border-primary shadow-xl shadow-primary/20 relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600">
              Save 25%
            </Badge>
            <CardHeader>
              <CardTitle>Annual Retainer</CardTitle>
              <div className="space-y-1">
                <p className="text-3xl font-bold">{annualRetainer.price}</p>
                <p className="text-sm text-muted-foreground">{annualRetainer.duration}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                {annualRetainer.description}
              </p>
              <p className="text-xs font-semibold mb-3">INCLUDES:</p>
              <ul className="space-y-2 mb-6">
                {annualRetainer.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact?type=annual-advisor">
                <Button className="w-full">
                  Get Started (Save $30K)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All retainers include 30-day cancellation notice. No lock-in after minimum commitment.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-primary/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Independent AI Counsel You Can Trust
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              First consultation is complimentary. We'll discuss your AI challenges and
              determine if the AI Advisor retainer is the right fit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?type=ai-advisor">
                <Button size="lg" className="gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/family-office">
                <Button size="lg" variant="outline" className="gap-2">
                  <Shield className="w-5 h-5" />
                  Explore All Advisory Services
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              No vendor pitches. No sales pressure. Just honest strategic perspective.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
