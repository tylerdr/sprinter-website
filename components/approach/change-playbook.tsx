"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Lightbulb, Trophy, BarChart3 } from "lucide-react";

const playbook = [
  {
    icon: MessageSquare,
    title: "Reframe the Narrative",
    description: "Transform 'AI will replace me' into 'AI handles the boring stuff so I can do real work'",
    example: '"Now I can actually take lunch breaks and work on strategic projects"',
  },
  {
    icon: Users,
    title: "Co-Design Sessions",
    description: "30-60 minutes with actual users to understand their workflow and pain points",
    example: "The AP team designs their own exception routing rules",
  },
  {
    icon: Lightbulb,
    title: "Human-in-the-Loop from Day One",
    description: "Users validate and approve AI suggestions, maintaining control while building trust",
    example: "Every extraction below 95% confidence goes to review queue",
  },
  {
    icon: Trophy,
    title: "Visible Wins",
    description: "Before/after metrics on wallboards, success stories in team meetings",
    example: "Invoice processing time: 15min → 2min displayed on office dashboard",
  },
  {
    icon: BarChart3,
    title: "Enablement Bursts",
    description: "Micro-training sessions, cheat sheets, and ongoing support",
    example: "5-minute Monday tips on using the new document tools",
  },
];

export function ChangePlaybook() {
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">People-First Change Playbook</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              How we turn skeptics into champions and ensure lasting adoption.
            </p>
          </div>

          <div className="space-y-6">
            {playbook.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      <div className="bg-muted/20 rounded-lg p-3 border-l-2 border-blue-500/50">
                        <p className="text-sm italic">{item.example}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Key Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 border text-center"
          >
            <h3 className="text-2xl font-bold mb-3">The Result?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Employees who genuinely love the new tools and ask "What else can we automate?"
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <Trophy className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">98% adoption rate within 30 days</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}