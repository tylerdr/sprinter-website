"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/shared/book-demo-button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const models = [
  {
    title: "Fund-Level AI Operating Partner",
    description: "Strategic partnership across your entire portfolio",
    duration: "12-36 months",
    ideal: "PE firms with 5+ portfolio companies",
    features: [
      "Dedicated AI leadership team",
      "Portfolio-wide strategy and roadmap",
      "Cross-portfolio synergy identification",
      "LP reporting and governance framework",
      "Continuous innovation pipeline",
      "Exit preparation support"
    ],
    cta: "Schedule LP Briefing"
  },
  {
    title: "Portfolio Company Transformation",
    description: "Deep engagement with individual portfolio companies",
    duration: "6-12 months",
    ideal: "High-priority value creation targets",
    features: [
      "Company-specific AI assessment",
      "Custom implementation roadmap",
      "Hands-on execution team",
      "Change management support",
      "ROI tracking and optimization",
      "Knowledge transfer to management"
    ],
    cta: "Get Company Assessment"
  },
  {
    title: "AI Sprint Programs",
    description: "Rapid implementation of specific use cases",
    duration: "2-3 sprints",
    ideal: "Quick wins and proof of concepts",
    features: [
      "Pre-built accelerators deployment",
      "Focused use case implementation",
      "Clear acceptance criteria",
      "Measurable ROI in weeks",
      "Minimal disruption to operations",
      "Foundation for scaling"
    ],
    cta: "Start 30-Day Sprint"
  }
];

export function EngagementModels() {
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
            Flexible Engagement Models
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored to your fund size, portfolio composition, and value creation timeline
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">{model.title}</h3>
                  <p className="text-muted-foreground mb-4">{model.description}</p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration: </span>
                      <span className="font-medium">{model.duration}</span>
                    </div>
                  </div>
                  <div className="text-sm mt-2">
                    <span className="text-muted-foreground">Ideal for: </span>
                    <span className="font-medium">{model.ideal}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {model.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <BookDemoButton
                  text={model.cta}
                  className="w-full"
                  variant="outline"
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-muted-foreground mb-4">
            Not sure which model fits best?
          </p>
          <Button asChild size="lg">
            <a href="/contact" className="group">
              Discuss Your Portfolio
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}