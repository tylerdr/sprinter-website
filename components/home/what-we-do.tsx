"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Rocket,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "AI Due Diligence",
    description: "Technical assessment of AI capabilities in acquisition targets. Understand what's real, what's vaporware, and what the integration effort looks like.",
    features: ["5-10 day turnaround", "Technical risk assessment", "100-day integration plan"],
    href: "/ai-due-diligence-consulting",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Rocket,
    title: "Portfolio Acceleration",
    description: "Sprint-based AI implementations for portfolio companies. Document intelligence, workflow automation, and process redesign that ships in weeks.",
    features: ["2-4 week sprints", "Production-ready systems", "Knowledge transfer included"],
    href: "/operating-partner",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: TrendingUp,
    title: "Value Creation Platforms",
    description: "Repeatable AI playbooks that scale across your portfolio. The win at one company becomes the template for the next.",
    features: ["Proven playbooks", "Cross-portfolio leverage", "Trained operators"],
    href: "/ai-implementation-partner",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
];

export function WhatWeDo() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How We <span className="gradient-text">Create Value</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Three ways we help PE firms and portfolio companies capture AI opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={service.href} className="block h-full group">
                <div className={`h-full p-8 rounded-xl border ${service.borderColor} bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.bgColor} mb-6`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full ${service.bgColor} ${service.color}`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/contact" className="group">
              Book a Strategy Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
