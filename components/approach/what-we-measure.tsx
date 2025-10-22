"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, AlertTriangle, Smile, Users } from "lucide-react";

const metrics = [
  {
    icon: TrendingDown,
    metric: "Touches per Document ↓",
    description: "From 12 manual steps to 2 validations",
    improvement: "-83%",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Clock,
    metric: "Cycle Time ↓",
    description: "Invoice processing: 3 days to 4 hours",
    improvement: "-92%",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: AlertTriangle,
    metric: "Exception Rate ↓",
    description: "Documents needing intervention: 45% to 8%",
    improvement: "-82%",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Smile,
    metric: "Work NPS ↑",
    description: "Employee satisfaction: 'This made my day better'",
    improvement: "+72",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Users,
    metric: "Adoption % ↑",
    description: "Active users within 30 days",
    improvement: "98%",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

export function WhatWeMeasure() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What We Measure (So People Feel the Win)</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Success isn't just about efficiency—it's about making work better for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className={`text-2xl font-bold ${item.color}`}>{item.improvement}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.metric}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Special Highlight on Work NPS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-orange-500/5 to-pink-500/5 rounded-lg p-8 border"
          >
            <div className="text-center">
              <Smile className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">The Most Important Metric</h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We ask one simple question after implementation: "Did this make your day better?"
                When the answer is yes, everything else follows.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-4 py-2 bg-card rounded-lg border">
                  <span className="text-sm text-muted-foreground">Before:</span>
                  <span className="ml-2 font-semibold">"I dread Mondays"</span>
                </div>
                <div className="px-4 py-2 bg-card rounded-lg border">
                  <span className="text-sm text-muted-foreground">After:</span>
                  <span className="ml-2 font-semibold text-green-500">"I love my job again"</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}