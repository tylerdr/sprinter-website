"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Truck, Zap, Grid3x3, Rocket, Building, Users, FileText, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { BookDemoButton } from "@/components/shared/book-demo-button";

// Note: Metadata must be exported from a server component, so we'll handle it differently
const pageMetadata = {
  title: "AI Solutions for Private Equity | Sprinter",
  description: "Battle-tested AI solutions that drive measurable value across your portfolio. From AP automation to quote intelligence, deploy production-ready AI in 2-3 sprints.",
};

const solutions = [
  {
    href: "/solutions/ap-automation",
    title: "AP Automation",
    description: "Achieve 60%+ touchless invoice processing with any ERP system. Full 3-way match, approvals workflow, and exception handling.",
    icon: Calculator,
    metrics: ["60%+ touchless rate", "42% faster processing", "Any ERP compatible"],
    featured: true,
  },
  {
    href: "/solutions/quote-intelligence",
    title: "Quote-to-Cash Intelligence",
    description: "Generate accurate quotes in minutes, not hours. Win rate analysis, pricing optimization, and cycle time reduction.",
    icon: Zap,
    metrics: ["3x faster quotes", "15% higher win rate", "Real-time insights"],
  },
  {
    href: "/solutions/3pl-ops",
    title: "3PL Operations & Billing",
    description: "End-to-end automation from quote to cash for logistics companies. Rate management, billing accuracy, and dispute resolution.",
    icon: Truck,
    metrics: ["85% billing accuracy", "50% fewer disputes", "Same-day invoicing"],
  },
];

const additionalSolutions = [
  {
    title: "Document Intelligence",
    description: "Extract and process data from any document type",
    icon: FileText,
  },
  {
    title: "Revenue Operations",
    description: "Optimize your entire revenue cycle with AI",
    icon: BarChart,
  },
  {
    title: "Customer Service AI",
    description: "Deploy intelligent agents for support automation",
    icon: Users,
  },
  {
    title: "Supply Chain Optimization",
    description: "Predictive analytics for inventory and logistics",
    icon: Building,
  },
  {
    title: "Compliance Automation",
    description: "Ensure regulatory compliance with AI monitoring",
    icon: Grid3x3,
  },
  {
    title: "Sales Intelligence",
    description: "AI-powered lead scoring and opportunity management",
    icon: Rocket,
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4">
            20+ Production-Ready Solutions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI Solutions That Actually Ship
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Battle-tested implementations that drive measurable value across your portfolio.
            From pilot to production in 2-3 sprints. No infrastructure required.
          </p>
          <div className="flex gap-4 justify-center">
            <BookDemoButton size="lg" text="See Solutions in Action" />
            <Button size="lg" variant="outline" asChild>
              <Link href="/pe-services">
                Explore All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Featured Solutions */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Featured Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className={`relative overflow-hidden h-full hover:shadow-lg transition-shadow ${
                  solution.featured ? 'border-primary' : ''
                }`}>
                  {solution.featured && (
                    <div className="absolute top-0 right-0">
                      <Badge className="rounded-bl-lg rounded-tr-none">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <solution.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{solution.title}</CardTitle>
                    </div>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {solution.metrics.map((metric) => (
                        <div key={metric} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-sm text-muted-foreground">{metric}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={solution.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Additional Solutions Grid */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">More Solutions</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our complete suite of AI solutions covers every aspect of portfolio operations
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <solution.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{solution.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {solution.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Portfolio?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              See how our AI solutions can drive measurable value across your portfolio companies in just 2-3 sprints.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/ai-assessment">
                  Get Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link href="/case-studies">
                  View Case Studies
                </Link>
              </Button>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </section>
    </div>
  );
}