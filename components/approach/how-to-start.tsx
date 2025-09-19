"use client";

import { motion } from "framer-motion";
import { Presentation, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookDemoButton } from "@/components/shared/book-demo-button";

const options = [
  {
    icon: Presentation,
    title: "90-Minute People-First AI Workshop",
    price: "$1,500",
    description: "Interactive session with your team to identify high-impact wedges and build buy-in",
    deliverables: [
      "AI Opportunity Roadmap",
      "Top 3 wedge candidates",
      "Adoption playbook",
      "ROI projections",
    ],
    note: "Applied as credit to any package within 30 days",
    cta: "Book Workshop",
    href: "/contact",
  },
  {
    icon: Rocket,
    title: "2-Week Wedge Sprint",
    price: "$20,000",
    description: "Pick one document type, deliver a working solution, prove the value",
    deliverables: [
      "Production-ready automation",
      "Acceptance criteria validation",
      "Training & documentation",
      "30-day support",
    ],
    note: "If we miss acceptance criteria, remedial sprint at our cost",
    cta: "Start Your Sprint",
    href: "/contact",
  },
];

export function HowToStart() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How to Start</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Two proven paths to begin your people-first AI journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {options.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-card border rounded-lg p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-2xl font-bold gradient-text">{option.price}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                  <p className="text-muted-foreground mb-6">{option.description}</p>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      {option.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {option.note && (
                    <div className="mb-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-blue-400">{option.note}</p>
                    </div>
                  )}

                  <Button asChild className="w-full">
                    <Link href={option.href}>{option.cta}</Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Additional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6">
              Want to explore a longer partnership?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View All Packages & Pricing</Link>
              </Button>
              <BookDemoButton text="Talk to an AI Strategist" size="lg" />
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-col items-center gap-2 px-6 py-4 rounded-lg bg-muted/20 border">
              <p className="text-sm font-medium">Trusted by PE firms managing</p>
              <p className="text-2xl font-bold gradient-text">$2.3B+ in portfolio value</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}