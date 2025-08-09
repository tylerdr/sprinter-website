import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { ArrowRight, Zap, Database, Users, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stat } from "@/components/ui/stat";

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
      queries: { value: "50K+", label: "queries/month" },
      accuracy: { value: "98%", label: "accuracy" },
      time: { value: "90%", label: "time saved" },
    },
    features: [
      "Natural language Q&A across 1,000+ pages",
      "Real-time guideline updates",
    ],
    caseStudyUrl: "/case-studies/ai-mortgage-assistant",
    demoUrl: "/labs/document-intelligence",
    icon: Database,
    gradient: "from-blue-500 to-purple-500",
    screenshot: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
  {
    name: "Cab-O-Matic",
    tagline: "AI-Powered SKU Mapping Platform",
    description: "Automate cabinet hardware SKU mapping with 99% accuracy. Transform weeks of manual work into minutes.",
    metrics: {
      skus: { value: "100K+", label: "SKUs mapped" },
      accuracy: { value: "99%", label: "accuracy" },
      reduction: { value: "95%", label: "effort reduction" },
    },
    features: [
      "Intelligent SKU matching across vendors",
      "Automated data normalization",
    ],
    caseStudyUrl: "/case-studies/ai-cabinet-automation",
    demoUrl: "/labs/data-analyzer",
    icon: Zap,
    gradient: "from-green-500 to-blue-500",
    screenshot: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
  },
  {
    name: "Amble Ideation",
    tagline: "AI Innovation Workshop Platform",
    description: "Generate, evaluate, and prioritize AI use cases for your business. From ideation to implementation roadmap in hours.",
    metrics: {
      ideas: { value: "500+", label: "ideas generated" },
      workshops: { value: "50+", label: "workshops" },
      implementation: { value: "85%", label: "implementation rate" },
    },
    features: [
      "AI opportunity discovery",
      "ROI estimation engine",
    ],
    caseStudyUrl: "/case-studies/amble-ideation",
    demoUrl: "/labs/ideation",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
    screenshot: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-12 md:space-y-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/30">
                <Zap className="w-5 h-5 text-brand" />
                <span className="text-sm font-semibold text-brand">Live in Production</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <Balancer>
                  Real Products. Real Results.
                </Balancer>
              </h1>
              <p className="text-xl text-muted-foreground font-normal leading-relaxed">
                <Balancer>
                  Live products used in the wild. See them in action, then build your own.
                </Balancer>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="group relative rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm overflow-hidden hover:bg-card/10 hover:border-brand/30 transition-all duration-300"
              >
                {/* Screenshot */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.screenshot}
                    alt={`${product.name} screenshot`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient}`} />
                  
                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4">
                    <div className={`p-2 rounded-lg bg-background/20 backdrop-blur-sm border border-white/10`}>
                      <product.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-1 tracking-tight leading-tight">{product.name}</h3>
                    <p className="text-sm text-muted-foreground font-normal">{product.tagline}</p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-sm font-normal leading-relaxed">
                    {product.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-border/10">
                    {Object.entries(product.metrics).map(([key, metric]) => (
                      <Stat
                        key={key}
                        value={metric.value}
                        label={metric.label}
                        className="p-2 text-center bg-transparent border-none"
                      />
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href={product.demoUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand/10 hover:bg-brand/20 border border-brand/30 hover:border-brand/50 text-brand hover:text-brand transition-all duration-200 group"
                    >
                      <Play className="w-4 h-4" />
                      See Live Demos
                    </Link>
                    <Link
                      href={product.caseStudyUrl}
                      className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors group"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-brand/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight leading-tight">
            <Balancer>
              Ready to Build Your Product?
            </Balancer>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            <Balancer>
              Ship your first AI system in 10 days. We handle the complexity, you own the outcome.
            </Balancer>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gradient" size="lg">
              <Link href="/contact">
                Start a 10-Day Sprint
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