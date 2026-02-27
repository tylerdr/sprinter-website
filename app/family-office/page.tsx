import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, TrendingUp, Users, Building2, CheckCircle2,
  ArrowRight, Award, Target, Brain, Lock, Zap,
  ChevronRight, BookOpen, UserCheck
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { PRICING } from "@/lib/constants";

export const metadata: Metadata = getPageMetadata("familyOffice");

const challenges = [
  {
    icon: Shield,
    title: "Conflicting Advice",
    description: "Three consultants gave you three different AI strategies. You need independent counsel you can trust."
  },
  {
    icon: Lock,
    title: "Governance Gaps",
    description: "Your board asks tough questions about AI risk, vendor lock-in, and data privacy. You need frameworks, not vague reassurances."
  },
  {
    icon: TrendingUp,
    title: "Competitive Pressure",
    description: "Competitors are deploying AI. Your portfolio companies risk falling behind—or rushing into expensive mistakes."
  },
  {
    icon: Building2,
    title: "Complex Structures",
    description: "8 holdings across 4 industries. Which gets AI first? How do you share learnings? Who owns the strategy?"
  }
];

const engagementModels = [
  {
    tier: "AI Advisor",
    ...PRICING.aiAdvisor,
    ideal: "Family offices seeking strategic counsel without implementation commitments",
    featured: false,
    cta: "Learn More",
    href: "/ai-advisor-retainer"
  },
  {
    tier: "Fractional CAIO",
    ...PRICING.fractionalCAIO,
    ideal: "Multi-holding structures requiring C-suite AI leadership and board-level counsel",
    featured: true,
    cta: "Schedule Consultation",
    href: "/fractional-caio"
  },
  {
    tier: "Advisory + Implementation",
    ...PRICING.bundles.caioGovernance,
    ideal: "Family offices ready for both strategic guidance and hands-on portfolio transformation",
    featured: false,
    cta: "View Package Details",
    href: "/contact?type=caio-package"
  }
];

const caseStudy = {
  client: "Mid-Atlantic Family Office",
  aum: "$2.3B AUM",
  holdings: "8 companies (manufacturing, distribution, real estate tech)",
  challenge: "Principal received conflicting advice from 3 consultants. Concerned about both falling behind competitors and making reckless AI investments.",
  engagement: "6-month Fractional CAIO retainer",
  results: [
    "AI governance framework ratified by family board",
    "3 portfolio companies piloted AI automation ($1.2M annual savings)",
    "Investment committee trained on AI diligence criteria",
    "Avoided $4M investment in AI vendor (strategic mismatch)",
    "18% EBITDA improvement across 3 portcos"
  ],
  testimonial: "We needed someone who understood both AI and how family businesses actually work. Sprinter gave us confidence to move strategically, not reactively.",
  author: "Managing Principal"
};

const addOnServices = [
  {
    icon: Target,
    ...PRICING.addOns.portfolioAudit,
    href: "/portfolio-diligence"
  },
  {
    icon: Award,
    ...PRICING.education.boardEducation,
    href: "/governance/family-office#board-education"
  },
  {
    icon: Shield,
    ...PRICING.addOns.governanceFramework,
    href: "/governance/family-office"
  },
  {
    icon: Zap,
    ...PRICING.addOns.diligenceOnDemand,
    href: "/strategic-buyer-diligence"
  }
];

export default function FamilyOfficePage() {
  return (
    <div className="min-h-screen py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <Building2 className="w-3 h-3 mr-1" />
            For Family Offices & Multi-Generational Wealth
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Your Trusted AI Counsel for <span className="gradient-text">Multi-Generational Wealth</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Independent AI advisory for family offices managing permanent capital. Navigate AI complexity
            with strategic counsel who've built production systems across 100+ companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/fractional-caio">
              <Button size="lg" className="gap-2">
                <UserCheck className="w-5 h-5" />
                Explore Fractional CAIO
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact?type=family-office">
              <Button size="lg" variant="outline" className="gap-2">
                Schedule Consultation
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Independent Counsel</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No Vendor Bias</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Practitioner Credibility</span>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            The AI Challenge for Family Offices
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You're responsible for protecting multi-generational wealth while capturing
            competitive opportunity. AI represents both risk and reward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <challenge.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Independent Counsel */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Family Offices Need Independent AI Counsel
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">No Vendor Incentives</p>
                    <p className="text-sm text-muted-foreground">
                      We don't sell software or take referral fees. Our only incentive is your success.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Practitioner Credibility</p>
                    <p className="text-sm text-muted-foreground">
                      We've built production AI systems, not just studied them. We know what works.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Permanent Capital Mindset</p>
                    <p className="text-sm text-muted-foreground">
                      We understand generational timelines, legacy preservation, and governance structures.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Board-Level Communication</p>
                    <p className="text-sm text-muted-foreground">
                      We speak the language of fiduciary responsibility, not just technical jargon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  The Full-Time CAIO Problem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">Full-Time Hire: $550K+ annually</p>
                  <p className="text-sm text-muted-foreground">
                    $400K salary + benefits + equity + recruiting costs
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">The Reality:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>12-18 month search for qualified candidates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>May not have experience across your diverse holdings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Needs team, budget, and political capital</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Single perspective, limited network</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-primary mb-1">
                    Fractional CAIO: $35-60K/month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Strategic value of C-suite AI leadership. 20% of the overhead.
                    Start in 2 weeks, not 18 months.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Choose Your Engagement Model
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From monthly advisory calls to full C-suite AI leadership.
            Flexible models that fit your governance structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementModels.map((model, index) => (
            <Card
              key={index}
              className={`relative flex flex-col ${
                model.featured
                  ? "border-primary shadow-xl shadow-primary/20"
                  : "border-border bg-card/50 backdrop-blur"
              }`}
            >
              {model.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Recommended
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-xl">{model.tier}</CardTitle>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{model.price}</p>
                  <p className="text-sm text-muted-foreground">{model.duration}</p>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">
                  {model.description}
                </p>

                <p className="text-xs font-semibold text-primary mb-3">
                  IDEAL FOR:
                </p>
                <p className="text-sm mb-6">
                  {model.ideal}
                </p>

                <div className="mt-auto">
                  <Link href={model.href} className="w-full">
                    <Button
                      className="w-full"
                      variant={model.featured ? "default" : "outline"}
                    >
                      {model.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent py-16 mb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="outline">
              <Award className="w-3 h-3 mr-1" />
              Client Success Story
            </Badge>
            <h2 className="text-3xl font-bold">
              How a $2.3B Family Office Navigated AI Complexity
            </h2>
          </div>

          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">CLIENT</p>
                  <p className="font-semibold">{caseStudy.client}</p>
                  <p className="text-sm text-primary">{caseStudy.aum}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">HOLDINGS</p>
                  <p className="font-semibold text-sm">{caseStudy.holdings}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ENGAGEMENT</p>
                  <p className="font-semibold">{caseStudy.engagement}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-destructive mb-2">THE CHALLENGE</p>
                <p className="text-muted-foreground">{caseStudy.challenge}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-green-500 mb-3">RESULTS</p>
                <ul className="space-y-2">
                  {caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-border">
                <blockquote className="italic text-lg mb-3">
                  "{caseStudy.testimonial}"
                </blockquote>
                <cite className="text-sm text-muted-foreground not-italic">
                  — {caseStudy.author}, {caseStudy.client}
                </cite>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Add-On Services (À La Carte)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complement your advisory engagement with specialized services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addOnServices.map((service, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <span className="text-sm font-bold text-primary shrink-0 ml-2">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Link href={service.href} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                      Learn more
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-primary/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Navigate AI Complexity with Confidence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join family offices managing $12B+ in permanent capital who trust Sprinter
              as their independent AI counsel.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?type=family-office">
                <Button size="lg" className="gap-2">
                  <UserCheck className="w-5 h-5" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/governance/family-office">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Download Governance Resources
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              First consultation is complimentary. No vendor pitches, just strategic perspective.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
