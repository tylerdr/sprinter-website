"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  DollarSign,
  ArrowRight,
  Quote
} from "lucide-react";

const successStories = [
  {
    icon: DollarSign,
    client: "FinTech Portfolio Company",
    result: "95% time reduction",
    timeframe: "in research time",
    description: "Document intelligence for loan processing",
  },
  {
    icon: Clock,
    client: "B2B SaaS Portfolio Company",
    result: "2+ hours saved",
    timeframe: "per quote",
    description: "AI-driven product configuration",
  },
  {
    icon: TrendingUp,
    client: "Healthcare Portfolio Company",
    result: "5× coverage",
    timeframe: "per operator",
    description: "Autonomous workflow automation",
  },
];

const testimonials = [
  {
    quote: "They shipped a working system in 3 weeks that our internal team estimated would take 6 months. The ROI was evident immediately.",
    author: "VP Operations",
    role: "Portfolio Company",
    impact: "95% time reduction",
  },
  {
    quote: "Not just automation—it's transformation. We quote faster, close more deals, and our team focuses on high-value work instead of data entry.",
    author: "Operations Director",
    role: "Portfolio Company",
    impact: "2+ hours saved/plan",
  },
  {
    quote: "The playbook they built for us is now being rolled out to three other portfolio companies. Real leverage.",
    author: "Operating Partner",
    role: "PE Firm",
    impact: "Portfolio-wide value",
  },
];

export function ClientSuccessSection() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
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
          className="text-center"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center gap-2 text-primary font-medium hover:underline"
          >
            See all case studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}