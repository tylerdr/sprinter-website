"use client";

import ScrollStack from "@/components/ScrollStack";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sprinter delivered a working AI prototype in just 10 days that now saves our team 30+ hours per week on quote processing.",
    author: "Sarah Chen",
    role: "COO, TechVentures Portfolio Company",
    company: "Series B SaaS",
    impact: "30+ hours/week saved",
  },
  {
    quote: "The ROI was immediate. Within 45 days, we had automated 60% of our AP processing with zero API integrations needed.",
    author: "Michael Rodriguez",
    role: "CFO, Industrial Co",
    company: "PE-backed Manufacturing",
    impact: "60% automation rate",
  },
  {
    quote: "What sets Sprinter apart is their operator-first approach. They built WITH our team, not for them.",
    author: "Jessica Park",
    role: "Managing Partner",
    company: "Growth Equity Fund",
    impact: "5 portfolio deployments",
  },
  {
    quote: "We've worked with big consultancies before. Sprinter ships in days what others take months to scope.",
    author: "David Thompson",
    role: "Operating Partner",
    company: "Mid-Market PE",
    impact: "10x faster deployment",
  },
  {
    quote: "The team enablement was fantastic. Our operators are now identifying and implementing AI opportunities independently.",
    author: "Lisa Wang",
    role: "VP Operations",
    company: "Healthcare Platform",
    impact: "Team fully enabled",
  },
];

export function TestimonialsStack() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Trusted by Operating Partners
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from portfolio companies across industries.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <ScrollStack offset={40} scaleFactor={0.02}>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl"
              >
                <div className="flex flex-col space-y-4">
                  <Quote className="w-8 h-8 text-primary/20" />

                  <blockquote className="text-lg md:text-xl leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">
                        {testimonial.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}