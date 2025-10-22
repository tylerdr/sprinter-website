"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Users, Building, Cpu, DollarSign, Shield } from "lucide-react";
import Link from "next/link";

const accelerators = [
  {
    title: "Finance & Operations",
    icon: DollarSign,
    description: "Touchless AP/AR, intelligent forecasting, working capital optimization",
    metrics: ["64% touchless invoices", "31% working capital improvement", "85% forecast accuracy"],
    link: "/use-cases/finance-transformation"
  },
  {
    title: "Sales & Marketing",
    icon: Users,
    description: "Lead scoring, quote intelligence, personalized campaigns at scale",
    metrics: ["42% faster quotes", "3.2X lead conversion", "28% revenue lift"],
    link: "/use-cases/revenue-acceleration"
  },
  {
    title: "Supply Chain",
    icon: Building,
    description: "Demand planning, inventory optimization, 3PL automation",
    metrics: ["18% cost reduction", "92% order accuracy", "45% faster fulfillment"],
    link: "/use-cases/supply-chain"
  },
  {
    title: "IT Modernization",
    icon: Cpu,
    description: "Legacy system bridges, API-less integrations, data infrastructure",
    metrics: ["No API? No problem", "70% faster deployments", "Zero downtime migrations"],
    link: "/use-cases/it-transformation"
  },
  {
    title: "Risk & Compliance",
    icon: Shield,
    description: "AI governance, audit automation, regulatory compliance",
    metrics: ["100% audit trail", "SOC 2 eligible providers", "Private data stays private"],
    link: "/governance"
  },
  {
    title: "Custom Solutions",
    icon: FileText,
    description: "Industry-specific AI applications tailored to portfolio needs",
    metrics: ["Healthcare, Manufacturing, SaaS", "Professional Services", "Distribution"],
    link: "/industries"
  }
];

export function PortfolioAccelerators() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Portfolio-Wide AI Accelerators
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pre-built solutions that drive immediate value across your entire portfolio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accelerators.map((accelerator, index) => {
            const Icon = accelerator.icon;
            return (
              <motion.div
                key={accelerator.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-all group">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{accelerator.title}</h3>
                    <p className="text-muted-foreground mb-4">{accelerator.description}</p>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-2 mb-6">
                      {accelerator.metrics.map((metric, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild variant="ghost" className="w-full group">
                    <Link href={accelerator.link}>
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}