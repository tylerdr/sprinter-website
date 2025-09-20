"use client";

import ScrollFloat from "@/components/ScrollFloat";
import { motion } from "framer-motion";
import { Shield, Award, Users2, TrendingUp } from "lucide-react";

const trustStats = [
  {
    icon: Users2,
    value: "60K+",
    label: "Developers Trust Us",
    description: "Active users across enterprises"
  },
  {
    icon: TrendingUp,
    value: "92%",
    label: "Success Rate",
    description: "Of sprints deliver on time"
  },
  {
    icon: Award,
    value: "SOC 2",
    label: "Certified",
    description: "Enterprise-grade security"
  },
  {
    icon: Shield,
    value: "24/7",
    label: "Support",
    description: "Always available for your team"
  }
];

export function TrustIndicators() {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Compact Trust Badge */}
        <div className="flex justify-center mb-8">
          <ScrollFloat>
            <div className="bg-background flex items-center rounded-full border p-1.5 shadow-lg">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-primary">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground px-3 text-sm">
                Trusted by <strong className="text-foreground font-medium">60K+</strong>{" "}
                developers & <strong className="text-foreground font-medium">50+</strong>{" "}
                PE-backed companies.
              </p>
            </div>
          </ScrollFloat>
        </div>

        {/* Trust Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {trustStats.map((stat, index) => (
            <ScrollFloat key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>
  );
}