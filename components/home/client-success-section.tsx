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
    client: "Financial Services",
    result: "70% faster processing",
    timeframe: "in 4 weeks",
    description: "AI-powered loan processing automation",
  },
  {
    icon: Clock,
    client: "Healthcare Network", 
    result: "5x capacity increase",
    timeframe: "in 10 days",
    description: "Emergency triage system deployment",
  },
  {
    icon: Users,
    client: "E-commerce Platform",
    result: "400% traffic growth",
    timeframe: "in 3 months",
    description: "AI content generation at scale",
  },
];

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
            Proven <span className="gradient-text">Portfolio Impact</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from portfolio companies across industries
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