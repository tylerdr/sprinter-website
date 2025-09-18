"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Users, DollarSign } from "lucide-react";

const metrics = [
  {
    category: "Financial Impact",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    stats: [
      { label: "Average EBITDA Improvement", value: "23%" },
      { label: "Working Capital Optimization", value: "31%" },
      { label: "Cost Reduction", value: "18-35%" },
      { label: "Revenue Growth", value: "15-28%" }
    ]
  },
  {
    category: "Operational Excellence",
    icon: TrendingUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    stats: [
      { label: "Productivity Gains", value: "46%" },
      { label: "Process Automation", value: "60-85%" },
      { label: "Error Reduction", value: "92%" },
      { label: "Cycle Time Improvement", value: "42%" }
    ]
  },
  {
    category: "Speed to Value",
    icon: Clock,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    stats: [
      { label: "First Value Delivery", value: "30-45 days" },
      { label: "Full ROI Achievement", value: "6-9 months" },
      { label: "Portfolio-wide Rollout", value: "12-18 months" },
      { label: "Implementation Success Rate", value: "98%" }
    ]
  },
  {
    category: "Portfolio Coverage",
    icon: Users,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    stats: [
      { label: "PE Firms Served", value: "100+" },
      { label: "Portfolio Companies", value: "500+" },
      { label: "Industries Covered", value: "25+" },
      { label: "Successful Exits", value: "45+" }
    ]
  }
];

export function SuccessMetrics() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Proven Results Across 130+ Engagements
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable impact that drives LP confidence and portfolio performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold ml-3">{metric.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {metric.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-baseline">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className="font-semibold text-lg">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}