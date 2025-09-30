"use client";

import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Clock, DollarSign, Lightbulb } from "lucide-react";

const shifts = [
  {
    icon: Clock,
    before: "Hire more people",
    after: "Deploy more agents",
    impact: "Scale instantly without recruiting, training, or benefits costs",
  },
  {
    icon: DollarSign,
    before: "$40-80K per FTE annually",
    after: "$0.01-0.10 per task with AI",
    impact: "Cost per task drops 99%+. Economics change completely.",
  },
  {
    icon: Lightbulb,
    before: "Design for limited headcount",
    after: "Rethink from first principles",
    impact: "What becomes possible when labor isn't the constraint?",
  },
];

const newPossibilities = [
  "Review 100% of contracts instead of sampling",
  "Respond to every customer inquiry in < 1 minute",
  "Generate custom proposals for every RFP",
  "Process every document, not just the urgent ones",
  "Continuously audit every transaction",
  "Personalize communication with every stakeholder",
];

export function InfiniteDigitalLabor() {
  return (
    <section id="infinite-labor" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">Paradigm Shift</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Infinite Digital Labor</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              When digital labor costs approach zero and scales infinitely, what becomes possible?
            </p>
          </div>

          {/* The Shift */}
          <div className="space-y-6 mb-12">
            {shifts.map((shift, index) => {
              const Icon = shift.icon;
              return (
                <motion.div
                  key={shift.before}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-xs font-medium text-red-500 mb-1">Old World</div>
                          <div className="text-sm font-medium text-muted-foreground line-through">{shift.before}</div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-green-500 mb-1">New World</div>
                          <div className="text-sm font-semibold text-foreground">{shift.after}</div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{shift.impact}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* What Becomes Possible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-8 border"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-green-500" />
              <h3 className="text-2xl font-bold">What Becomes Possible</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {newPossibilities.map((possibility, index) => (
                <motion.div
                  key={possibility}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-2 bg-card/50 rounded-lg p-3"
                >
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">✓</span>
                  </div>
                  <span className="text-sm">{possibility}</span>
                </motion.div>
              ))}
            </div>
            <div className="bg-card/50 rounded-lg p-6 border-l-4 border-green-500">
              <h4 className="font-semibold mb-2">The Key Question:</h4>
              <p className="text-muted-foreground">
                <strong>Optimize human time for high-value work.</strong> Let unlimited, scalable AI agents handle repetitive, time-consuming tasks.
                The constraint isn't labor anymore—it's our imagination.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}