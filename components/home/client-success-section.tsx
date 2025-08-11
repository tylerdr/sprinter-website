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
  Award,
  CheckCircle
} from "lucide-react";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";

const successStories = [
  {
    icon: DollarSign,
    client: "Financial Services Client",
    result: "$2.4M additional revenue",
    timeframe: "in 6 months",
    description: "AI loan assistant processing 300% more applications",
  },
  {
    icon: Clock,
    client: "Regional Healthcare Network", 
    result: "5x patient capacity",
    timeframe: "in 90 days",
    description: "AI care coach managing routine check-ins",
  },
  {
    icon: Users,
    client: "E-commerce Platform",
    result: "10,000 pages created",
    timeframe: "in 3 months",
    description: "AI content engine driving 400% traffic growth",
  },
];

const trustedClients = [
  { name: "Wells Fargo", type: "Fortune 500 Bank" },
  { name: "Accenture", type: "Global Consulting" },
  { name: "Rock Hill Capital", type: "Private Equity" },
  { name: "Broadlume", type: "Tech Innovation" },
  { name: "Vero Capital", type: "Investment Mgmt" },
  { name: "Beckway", type: "Business Advisory" },
];

export function ClientSuccessSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, color-mix(in oklch, var(--success) 5%, transparent), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-10 border border-success-30 mb-6">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">
              Proven Results
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Real Impact for <span className="gradient-text">Real Companies</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            From Fortune 500 to high-growth startups, we deliver AI that ships fast and scales.
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

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Trusted Partners
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Companies Our Team Has <span className="gradient-text">Worked With</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team brings experience from leading organizations across technology, finance, and consulting
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {trustedClients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Building2 className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                    <div>
                      <div className="font-semibold text-sm">{client.name}</div>
                      <div className="text-xs text-muted-foreground/70">{client.type}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              What <span className="gradient-text">Clients Say</span>
            </h3>
            <p className="text-muted-foreground">
              Real feedback from teams shipping AI in production
            </p>
          </div>
          <TestimonialCarousel autoPlay showMetrics />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center p-8 rounded-xl border border-warning-30 max-w-2xl mx-auto bg-warning-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-warning" />
            <h3 className="text-xl font-bold text-warning">
              Limited Capacity
            </h3>
          </div>
          <p className="text-foreground mb-6">
            We limit our capacity to <strong>3 new AI transformation projects per month</strong> to ensure quality delivery.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Your 10-Day Sprint
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}