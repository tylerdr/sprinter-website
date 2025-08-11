"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Clock, Users, DollarSign, ArrowRight } from "lucide-react";

const recentWins = [
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

export function RecentWins() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, color-mix(in oklch, var(--success) 5%, transparent), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-success-10 border border-success-30 mb-4 sm:mb-6">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-xs sm:text-sm font-medium text-success">
              Recent Client Wins
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Recent{" "}
            <span className="gradient-text">Client Results</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Proof that focused AI execution compounds. Ship, measure, iterate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-7xl mx-auto">
          {recentWins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 sm:p-6 rounded-xl border border-success-30 h-full flex flex-col"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 flex-grow">
                <div className="p-2 rounded-lg bg-success-10 flex-shrink-0">
                  <win.icon className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">
                    {win.client}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-success leading-tight">
                    {win.result}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground/80">
                    {win.timeframe}
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-auto">
                {win.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center p-6 rounded-xl border border-warning-30 max-w-2xl mx-auto bg-warning-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
            <h3 className="text-lg sm:text-xl font-bold text-warning">
              Limited Availability
            </h3>
          </div>
          <p className="text-foreground/80 mb-4 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            We limit our capacity to{" "}
            <strong>3 new AI transformation projects per month</strong> to
            ensure quality delivery.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base"
          >
            Start a 10-Day Sprint
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
