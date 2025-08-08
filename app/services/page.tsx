import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Code,
  Rocket,
  Building,
  Handshake,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Brain,
  Target,
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo-structured-data";

export const metadata: Metadata = getPageMetadata("services");

const services = [
  {
    id: "workshop",
    title: "AI Discovery Workshop",
    tagline: "Find Your AI Quick Wins",
    description:
      "One-day intensive session with our engineers to identify and prioritize high-ROI AI opportunities specific to your business",
    icon: Brain,
    duration: "1 Day",
    price: "$5,000",
    features: [
      "Process mapping & bottleneck analysis",
      "AI readiness assessment of your data & systems",
      "ROI projections for top 3 opportunities",
      "Technical feasibility evaluation",
      "90-day implementation roadmap",
    ],
    deliverables: [
      "Opportunity assessment report",
      "Technical architecture sketch",
      "Budget & timeline estimates",
    ],
    ideal:
      "Perfect for executives exploring where AI can drive immediate value",
    results: "Typical outcome: 3-5 actionable AI opportunities identified",
    cta: "Book Workshop",
    popular: false,
  },
  {
    id: "sprint",
    title: "AI Sprint",
    tagline: "Ship Production AI in Weeks",
    description:
      "2-4 week rapid development sprint that takes you from concept to deployed AI system with real users",
    icon: Rocket,
    duration: "2-4 Weeks",
    price: "$25,000 - $75,000",
    features: [
      "Working prototype delivered in 10 days",
      "Production deployment with monitoring",
      "Integration with your existing systems",
      "Team training & knowledge transfer",
      "30 days of post-launch support",
    ],
    deliverables: [
      "Production-ready AI system",
      "Complete documentation",
      "Source code ownership",
      "Performance dashboard",
    ],
    ideal: "Best for teams ready to move fast and see immediate results",
    results: "Average client sees 250% ROI within 60 days",
    cta: "Start Sprint",
    popular: true,
  },
  {
    id: "transformation",
    title: "Enterprise AI Transformation",
    tagline: "Comprehensive AI Integration",
    description:
      "Full-scale AI implementation across multiple business units with ongoing optimization",
    icon: Building,
    duration: "3-6 Months",
    price: "$150,000+",
    features: [
      "Multiple AI system deployments",
      "Enterprise architecture design",
      "Custom ML model development",
      "Team upskilling program",
      "Change management support",
    ],
    deliverables: [
      "Complete AI platform",
      "API integrations",
      "Training curriculum",
      "Governance framework",
      "Success metrics tracking",
    ],
    ideal: "For organizations committed to AI-driven transformation",
    results: "Typical impact: 30-50% operational efficiency gains",
    cta: "Transform Your Business",
    popular: false,
  },
  {
    id: "venture",
    title: "Venture Partnership",
    tagline: "Your Technical Co-Founder",
    description:
      "We build and scale AI products together, sharing both the risk and the reward",
    icon: Handshake,
    duration: "6-12 Months",
    price: "Equity-based",
    features: [
      "Full product development from MVP to scale",
      "Technical leadership & architecture",
      "Engineering team building",
      "Fundraising support",
      "Go-to-market strategy execution",
    ],
    deliverables: [
      "Complete AI product",
      "Technical infrastructure",
      "Development team",
      "Investor deck support",
      "Growth playbook",
    ],
    ideal: "For founders who need a technical partner, not a vendor",
    results: "Portfolio companies have raised $50M+ collectively",
    cta: "Explore Partnership",
    popular: false,
  },
];

const process = [
  {
    step: 1,
    title: "Discovery",
    description:
      "Map your processes, identify bottlenecks, prioritize opportunities",
    icon: Target,
    duration: "1-2 days",
  },
  {
    step: 2,
    title: "Prototype",
    description: "Build working AI in days, validate approach with real data",
    icon: Code,
    duration: "5-10 days",
  },
  {
    step: 3,
    title: "Deploy",
    description: "Ship to production, integrate systems, train your team",
    icon: Rocket,
    duration: "1-2 weeks",
  },
  {
    step: 4,
    title: "Optimize",
    description: "Monitor performance, iterate based on data, maximize ROI",
    icon: TrendingUp,
    duration: "Ongoing",
  },
];

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
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30 mb-6">
              <Zap className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium text-brand">
                How We Work
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your <span className="gradient-text">AI Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From rapid prototypes to enterprise transformations, we offer
              flexible engagement models. One thing never changes: we deliver
              working AI, fast.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <div key={service.id} className="relative">
                <div
                  className={`p-8 rounded-2xl bg-card/5 border backdrop-blur-sm h-full ${
                    service.popular
                      ? "border-brand-30 shadow-lg shadow-[color:color-mix(in_oklch,_var(--brand-start)_20%,_transparent)]"
                      : "border-border/10"
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-8 px-3 py-1 bg-brand-gradient rounded-full">
                      <span className="text-xs font-semibold text-primary-foreground">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-lg border border-brand-30 bg-brand-10">
                      <service.icon className="w-8 h-8 text-brand" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {service.duration}
                      </div>
                      <div className="text-xl font-bold gradient-text">
                        {service.price}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-brand font-medium mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-foreground/80">
                      What&apos;s Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-foreground/80">
                      Deliverables:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="px-3 py-1 text-xs bg-card/10 border border-border/20 rounded-full"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-muted-foreground italic">
                      {service.ideal}
                    </p>
                    <p className="text-sm text-success font-medium">
                      {service.results}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all w-full justify-center ${
                      service.popular
                        ? "bg-brand-gradient text-primary-foreground hover:opacity-90"
                        : "bg-card/10 border border-border/20 hover:bg-card/20"
                    }`}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center">
                        <span className="text-sm font-bold">{item.step}</span>
                      </div>
                      <item.icon className="w-6 h-6 text-info" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-info">{item.duration}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-success-30 bg-success-10"
              >
                <item.icon className="w-8 h-8 text-success mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <div className="p-8 rounded-2xl border border-brand-30 bg-brand-10">
              <h2 className="text-3xl font-bold mb-6 text-center">
                For Private Equity & Investment Firms
              </h2>
              <p className="text-lg text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transform multiple portfolio companies with one strategic
                partnership. We act as your AI SWAT team to rapidly uplift
                operational efficiency and valuation across your holdings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    10x
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leverage across portfolio
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    4-8 weeks
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Per implementation
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    30-50%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Efficiency gains
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold">How We Work with PE Partners:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Portfolio-wide AI opportunity assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Rapid deployment across multiple companies
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Value creation metrics aligned with exit strategy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Knowledge transfer to operating partners
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-sm italic text-muted-foreground mb-6">
                &quot;Traditional companies in your portfolio have the most to
                gain from AI - we help them leapfrog competitors who aren&apos;t
                moving fast enough.&quot;
              </p>
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
                >
                  Discuss Portfolio Opportunities
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-brand-30 bg-brand-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">
                    Not Sure Where to Start?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Let&apos;s have a conversation about your AI goals.
                    We&apos;ll recommend the best path forward - honest
                    technical advice from engineers who&apos;ve been there.
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
                    Schedule Free Consultation
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
