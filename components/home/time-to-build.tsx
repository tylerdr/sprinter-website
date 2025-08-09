"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  TrendingUp, 
  Globe, 
  Cpu, 
  Users, 
  Rocket,
  Clock,
  DollarSign
} from "lucide-react";

const reasons = [
  {
    icon: Cpu,
    title: "AI Costs Plummeting",
    description: "Model costs have dropped 100x in 2 years. What cost $1,000 in 2022 now costs less than $10."
  },
  {
    icon: Clock,
    title: "Development Velocity 10x",
    description: "Ship production AI in days, not months. Build MVPs in hours. Iterate at the speed of thought."
  },
  {
    icon: Globe,
    title: "APIs for Everything",
    description: "Connect any system, automate any workflow. The world's data and services are now programmable."
  },
  {
    icon: TrendingUp,
    title: "Early Mover Advantage",
    description: "While competitors debate, builders dominate. The gap between AI-native and traditional grows daily."
  },
  {
    icon: Users,
    title: "Talent Abundance",
    description: "AI augments every team member. One person can now accomplish what took entire departments."
  },
  {
    icon: DollarSign,
    title: "Infinite ROI Potential",
    description: "Automate million-dollar processes for thousands. Create value that compounds exponentially."
  }
];

export function TimeToBuild() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-10 to-background opacity-5" />
        <div className="absolute inset-0 noise-bg opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/30 mb-6">
            <Zap className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium text-warning">The AI Revolution</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            There&apos;s Never Been a{" "}
            <span className="gradient-text">Better Time to Build</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The barriers have fallen. The tools exist. The opportunity is massive. 
            Every day you wait, someone else is building the future. Here&apos;s why the time is now:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="p-6 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm hover:bg-card/10 hover:border-brand/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-brand/20 to-brand-end/20 group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="w-6 h-6 text-brand" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-brand transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-brand/5 via-brand-end/5 to-transparent border border-brand/20 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <Rocket className="w-8 h-8 text-brand mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  The Window of Opportunity Won&apos;t Last Forever
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Right now, AI is accessible to everyone—from solo founders to enterprises. 
                  But history shows that technological revolutions create winners fast. 
                  The companies that act today will define entire industries tomorrow.
                </p>
                <p className="text-lg text-foreground font-medium">
                  Stop planning. Start building. Ship your first AI product in 10 days with Sprinter.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact?intent=10-day-sprint"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Start a 10-Day Sprint
                <Zap className="w-4 h-4" />
              </a>
              <a
                href="/labs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card/10 text-foreground font-medium rounded-lg hover:bg-card/20 transition-colors border border-border/20"
              >
                Explore What&apos;s Possible
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}