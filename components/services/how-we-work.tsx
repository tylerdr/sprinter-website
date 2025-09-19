"use client";

import { motion } from "framer-motion";
import { Search, Zap, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    duration: "Week 1",
    description: "Map processes, identify wedges, define acceptance criteria",
    activities: ["Stakeholder interviews", "Process mapping", "Data assessment", "ROI modeling"]
  },
  {
    icon: Zap,
    title: "Sprint",
    duration: "Weeks 2-3",
    description: "Build and test the solution with your team",
    activities: ["Rapid prototyping", "User testing", "Integration setup", "Training prep"]
  },
  {
    icon: Rocket,
    title: "Deploy",
    duration: "Week 4",
    description: "Production rollout with monitoring and controls",
    activities: ["Go-live support", "Performance monitoring", "Exception handling", "Documentation"]
  },
  {
    icon: Trophy,
    title: "Scale",
    duration: "Ongoing",
    description: "Expand success across teams and processes",
    activities: ["Usage analytics", "Continuous improvement", "Additional use cases", "ROI tracking"]
  }
];

export function HowWeWork() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From discovery to deployment in 4 weeks. No endless consulting—just rapid execution.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 z-0" />
                  )}

                  <div className="relative bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                    <ul className="space-y-1">
                      {step.activities.map((activity) => (
                        <li key={activity} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="text-green-500">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 border text-center"
          >
            <h3 className="text-2xl font-semibold mb-3">Every Engagement Includes</h3>
            <div className="grid md:grid-cols-4 gap-6 mt-6">
              <div>
                <p className="font-medium mb-1">Acceptance Criteria</p>
                <p className="text-sm text-muted-foreground">Clear success metrics defined upfront</p>
              </div>
              <div>
                <p className="font-medium mb-1">Human-in-the-Loop</p>
                <p className="text-sm text-muted-foreground">Your team stays in control</p>
              </div>
              <div>
                <p className="font-medium mb-1">Governance Pack</p>
                <p className="text-sm text-muted-foreground">Audit trails and compliance</p>
              </div>
              <div>
                <p className="font-medium mb-1">30-Day Support</p>
                <p className="text-sm text-muted-foreground">Post-launch optimization</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}