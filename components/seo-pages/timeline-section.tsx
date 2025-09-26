"use client";

import { motion } from "framer-motion";

interface TimelinePhase {
  day: string;
  title: string;
  activities: string[];
}

interface TimelineSectionProps {
  title: string;
  phases: TimelinePhase[];
}

export function TimelineSection({ title, phases }: TimelineSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            {phases.map((phase, index) => (
              <motion.div
                key={phase.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex gap-8 mb-12 last:mb-0"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                </div>

                <div className="flex-1 pb-8">
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-medium text-primary">{phase.day}</span>
                      <h3 className="text-xl font-semibold">{phase.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}