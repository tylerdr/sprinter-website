"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Zap,
  Users,
  Rocket,
  Layers
} from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Independent Counsel",
    description: "No vendor lock-in. Ever.",
    details:
      "Unlike Big 4 consultants with vendor partnerships, we have no conflicts of interest. We recommend what works, not what pays us commissions. Your interests are the only ones we serve.",
  },
  {
    icon: Layers,
    title: "Portfolio Multiplier Effect™",
    description: "Every win compounds across holdings",
    details:
      "The playbook from your first portco accelerates the second by 50%. The third by 70%. Your entire portfolio benefits from shared learnings. That's why funds choose us over point solutions.",
  },
  {
    icon: Rocket,
    title: "Production in 10 Days",
    description: "Guaranteed delivery, or we work free",
    details:
      "No 6-month timelines. No stalled pilots. Working AI in production within 10 days—we stake our fee on it. If we miss, we continue at no charge until we deliver.",
  },
  {
    icon: Users,
    title: "Practitioners, Not Consultants",
    description: "We've built 50+ production systems",
    details:
      "Our team has shipped AI at scale across 50+ portfolio companies. We don't just advise—we build, deploy, and ensure adoption. Real operators, not PowerPoint jockeys.",
  },
];

export function ValuePillars() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Sprinter</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re not another consulting firm selling slides. We&apos;re operators who ship production AI—
            and we guarantee results or work free until you see them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full hover:border-primary/50 transition-all duration-300 group relative flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <pillar.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {pillar.title}
                  </CardTitle>

                  <CardDescription className="text-primary/70 font-medium">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    {pillar.details}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
