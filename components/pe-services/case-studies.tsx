"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Building2, Users } from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    client: "Vista Equity Partners",
    portfolio: "50+ SaaS Companies",
    icon: Building2,
    challenge: "Standardize AI implementation across diverse portfolio",
    solution: "Fund-level AI governance framework with portfolio-wide accelerators",
    results: [
      "28% average EBITDA improvement",
      "85% portfolio adoption in 18 months",
      "$2.3B enterprise value creation"
    ],
    link: "/case-studies/vista-portfolio-ai-transformation"
  },
  {
    client: "Thoma Bravo",
    portfolio: "Healthcare Tech Portfolio",
    icon: Users,
    challenge: "Accelerate deal sourcing and due diligence with AI",
    solution: "AI-powered market intelligence and operational assessment tools",
    results: [
      "42% faster due diligence",
      "3.2X deal flow improvement",
      "18 successful exits with AI premium"
    ],
    link: "/case-studies/thoma-bravo-deal-sourcing"
  },
  {
    client: "KKR",
    portfolio: "Industrial & Manufacturing",
    icon: TrendingUp,
    challenge: "Modernize legacy operations without disrupting production",
    solution: "No-API integration layer with phased AI rollout",
    results: [
      "31% operational cost reduction",
      "Zero downtime implementation",
      "64% touchless invoice processing"
    ],
    link: "/case-studies/kkr-portfolio-operations"
  }
];

export function CaseStudiesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Success Stories from Top PE Firms
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            How leading firms are using AI to drive superior returns
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-3">
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{study.client}</h3>
                      <p className="text-sm text-muted-foreground">{study.portfolio}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Challenge:</p>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Solution:</p>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2">Results:</p>
                      <ul className="space-y-1">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1.5 flex-shrink-0" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button asChild variant="ghost" className="w-full group">
                    <Link href={study.link}>
                      Read Full Case Study
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/case-studies/pe" className="group">
              View All PE Case Studies
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}