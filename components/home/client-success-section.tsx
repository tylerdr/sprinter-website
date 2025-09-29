"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  ArrowRight,
  Building2,
  Quote
} from "lucide-react";

const successStories = [
  {
    icon: DollarSign,
    client: "MortgageQ (FinTech)",
    result: "95% time reduction",
    timeframe: "in research time",
    description: "AI-driven Non-QM guideline intelligence platform",
  },
  {
    icon: Clock,
    client: "Cab-O-Matic (B2B SaaS)",
    result: "≥2 hours saved",
    timeframe: "per plan",
    description: "AI-driven SKU mapping for cabinet manufacturers",
  },
  {
    icon: Users,
    client: "RPM Healthcare",
    result: "5× patient coverage",
    timeframe: "per nurse",
    description: "Autonomous AI care coach for chronic patients",
  },
];

const testimonials = [
  {
    quote: "The AI doesn't just help us manage Non-QM complexity—it turned it into our competitive advantage. We're closing loans 300% faster with the confidence of having a senior underwriter available 24/7.",
    author: "VP Operations",
    role: "Mid-Market Lending Firm",
    company: "MortgageQ Client",
    impact: "95% time reduction",
  },
  {
    quote: "This isn't just automation—it's transformation. We quote more options, close faster, and our designers focus on design instead of spreadsheets. The ROI was evident within weeks.",
    author: "Operations Director",
    role: "Cabinet Manufacturer",
    company: "Cab-O-Matic Client",
    impact: "2 hours saved/plan",
  },
  {
    quote: "The AI coach transformed our care model. Nurses now manage 5× more patients with better outcomes because they focus on those who need them most.",
    author: "Chief Nursing Officer",
    role: "Regional Health System",
    company: "RPM Healthcare Client",
    impact: "5× coverage increase",
  },
];

export function ClientSuccessSection() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Real AI <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Production AI systems that deliver measurable business impact
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-success-30 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-success-10">
                  <story.icon className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">
                    {story.client}
                  </div>
                  <div className="text-2xl font-bold text-success">
                    {story.result}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {story.timeframe}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {story.description}
              </p>
            </motion.div>
          ))}
        </div>


        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              <blockquote className="text-sm leading-relaxed mb-4 text-muted-foreground">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-primary">
                    {testimonial.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center p-8 rounded-xl border border-border/50 max-w-2xl mx-auto bg-card/30 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold mb-4">
            Ready to Build Something Real?
          </h3>
          <p className="text-muted-foreground mb-6">
            Start with a 10-day sprint to validate your AI opportunity
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/labs/opportunity-audit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Get AI Opportunity Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card/50 text-foreground font-medium rounded-lg hover:bg-card/70 transition-colors"
            >
              Book Strategy Call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}