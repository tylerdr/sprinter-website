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
    title: "Agentic AI Systems",
    description: "Multi-agent workflows that scale",
    details:
      "We build AI agents that work together to handle complex tasks—document processing, research, analysis, and decision support. Systems that augment your team, not replace them.",
  },
  {
    icon: Layers,
    title: "Portfolio Multiplier Effect™",
    description: "Every win compounds across holdings",
    details:
      "The playbook from your first implementation makes the second faster. Shared learnings, proven templates, and trained operators who can extend the work independently.",
  },
  {
    icon: Rocket,
    title: "The Sprinter Method™",
    description: "Fixed-scope sprints that ship",
    details:
      "2-4 week sprints with clear deliverables. We build, you validate, we iterate. Working systems in production—not slide decks that stall in committee.",
  },
  {
    icon: Users,
    title: "Works With Your Stack",
    description: "No rip-and-replace required",
    details:
      "Think you're not 'tech-forward' enough? We build AI that integrates with existing systems, messy data, and real-world workflows. We meet you where you are.",
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
            We&apos;re not another consulting firm selling slides. We&apos;re practitioners who build and deploy
            agentic AI systems—sprint by sprint, with working code in production.
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
