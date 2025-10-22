"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Rocket, Layers, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: ClipboardCheck,
    title: "Assess",
    description: "90-minute readiness workshop",
    details:
      "Map portfolio priorities, surface blockers, and align on KPIs. Leave with a board-ready options memo and prioritized sprint candidates.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    step: "2",
    icon: Rocket,
    title: "Sprint",
    description: "5-day build to production",
    details:
      "Co-create with operators to deploy the first automation. Ship with integrations, training, and adoption resources in place.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    step: "3",
    icon: Layers,
    title: "Scale",
    description: "Roll out & compound",
    details:
      "Document playbooks, templatize the win, and redeploy across sister companies. Track impact in the portfolio scoreboard.",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            From Workshop to Wins in Weeks
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            A repeatable operating partner playbook that keeps momentum across every company in the fund.
          </p>
        </motion.div>

        <div className="hidden lg:block max-w-6xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute top-16 left-0 right-0 flex justify-between items-center px-32">
              <ArrowRight className="text-muted-foreground/30 w-8 h-8" />
              <ArrowRight className="text-muted-foreground/30 w-8 h-8" />
            </div>

            <div className="relative flex justify-between px-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <div className="w-32 h-32 rounded-2xl bg-background border-4 border-primary flex flex-col items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color}`} />
                    <div className="relative z-10">
                      <step.icon className="w-8 h-8 text-primary mb-1" />
                      <span className="text-xs font-bold text-muted-foreground">Step {step.step}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold mt-3">{step.title}</span>
                  <span className="text-sm text-muted-foreground text-center max-w-36">
                    {step.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="h-full"
            >
              <Card className="h-full hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-50`} />

                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-background/90 backdrop-blur-sm border border-border">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-muted-foreground/40">
                      {step.step}
                    </div>
                  </div>

                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {step.title}
                  </CardTitle>

                  <CardDescription className="text-primary/80 font-medium">
                    {step.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-sm text-muted-foreground">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
