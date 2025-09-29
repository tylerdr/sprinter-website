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
    title: "Your AI Advantage",
    description: "Deep expertise at your service",
    details:
      "You get world-class agentic AI expertise to identify your highest-ROI opportunities. Your competitive advantage comes from solutions that actually work in your environment.",
  },
  {
    icon: Layers,
    title: "Your Choice, Your Way",
    description: "Build or buy on your terms",
    details:
      "You decide: proven tools or custom builds. Your playbooks accelerate every deployment. Your 2nd portco is 50% faster, your 3rd is 70% faster. You compound your advantages.",
  },
  {
    icon: Rocket,
    title: "Your Wins in 10 Days",
    description: "Real systems, real fast",
    details:
      "You get production systems, not PowerPoints. Your real users, your real data, your measurable ROI—all within 10 days. That's how you make AI work.",
  },
  {
    icon: Users,
    title: "Your Team, Empowered",
    description: "Own your AI future",
    details:
      "You build lasting capability. Your operators learn to sustain and expand AI independently. You own the knowledge, not just the system.",
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
            Why <span className="gradient-text">Your Portfolio</span> Needs This
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your competitive edge comes from AI that ships fast and works immediately. Here's what you get.
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
