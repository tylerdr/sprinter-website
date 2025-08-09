import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Database, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Products - Live AI Systems in Production | Sprinter AI",
  description: "Real products used in the wild. MortgageQ, Cab-O-Matic, and Amble Ideation. See them in action, then build your own.",
  keywords: "AI products, MortgageQ, Cab-O-Matic, Amble Ideation, AI systems, production AI",
};

const products = [
  {
    name: "MortgageQ",
    tagline: "AI-Driven Non-QM Guideline Intelligence",
    description: "Transform complex mortgage guidelines into instant, accurate answers. Powers loan officers to close deals 5x faster.",
    metrics: {
      queries: "50K+ queries/month",
      accuracy: "98% accuracy",
      time: "90% time saved",
    },
    features: [
      "Natural language Q&A across 1,000+ pages",
      "Scenario-based eligibility checking",
      "Real-time guideline updates",
      "Audit trail and compliance tracking",
    ],
    caseStudyUrl: "/case-studies/ai-mortgage-assistant",
    icon: Database,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "Cab-O-Matic",
    tagline: "AI-Powered SKU Mapping Platform",
    description: "Automate cabinet hardware SKU mapping with 99% accuracy. Transform weeks of manual work into minutes.",
    metrics: {
      skus: "100K+ SKUs mapped",
      accuracy: "99% accuracy",
      reduction: "95% effort reduction",
    },
    features: [
      "Intelligent SKU matching across vendors",
      "Automated data normalization",
      "Real-time inventory sync",
      "Custom mapping rules engine",
    ],
    caseStudyUrl: "/case-studies/ai-cabinet-automation",
    icon: Zap,
    gradient: "from-green-500 to-blue-500",
  },
  {
    name: "Amble Ideation",
    tagline: "AI Innovation Workshop Platform",
    description: "Generate, evaluate, and prioritize AI use cases for your business. From ideation to implementation roadmap in hours.",
    metrics: {
      ideas: "500+ ideas generated",
      workshops: "50+ workshops",
      implementation: "85% implementation rate",
    },
    features: [
      "AI opportunity discovery",
      "ROI estimation engine",
      "Implementation roadmapping",
      "Team collaboration tools",
    ],
    caseStudyUrl: "/case-studies/amble-ideation",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/30 mb-6">
              <Zap className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium text-brand">Live in Production</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Real Products. Real Results.
            </h1>
            <p className="text-xl text-muted-foreground">
              Live products used in the wild. See them in action, then build your own.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="group relative rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm overflow-hidden hover:bg-card/10 hover:border-brand/30 transition-all duration-300"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${product.gradient}`} />
                
                <div className="p-8">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${product.gradient} bg-opacity-10`}>
                      <product.icon className="w-8 h-8 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {product.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border/10">
                    {Object.entries(product.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-brand">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={product.caseStudyUrl}
                    className="inline-flex items-center gap-2 text-brand hover:text-brand/80 font-medium transition-colors group"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-brand/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Product?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ship your first AI system in 10 days. We handle the complexity, you own the outcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gradient" size="lg">
              <Link href="/contact">
                Start Your 10-Day Sprint
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href="/services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}