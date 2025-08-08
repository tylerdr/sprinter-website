"use client";

import { motion } from "framer-motion";
import { Heart, Users, TrendingUp, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Work You Love",
    description:
      "When AI handles repetitive tasks, people can focus on creative, strategic work that brings them joy and purpose.",
  },
  {
    icon: Users,
    title: "Jobs Created, Not Lost",
    description:
      "We've helped create 50+ new roles by freeing teams to pursue higher-value work and innovation.",
  },
  {
    icon: TrendingUp,
    title: "Human + AI Partnership",
    description:
      "The future isn't AI replacing humans—it's humans and AI working together to achieve what neither could alone.",
  },
  {
    icon: Sparkles,
    title: "Abundance for All",
    description:
      "When we automate the mundane, we create abundance—more time, more creativity, more human connection.",
  },
];

export function HumanCenteredSection() {
  return (
    <section
      className="py-24 relative"
      aria-label="Human-centered AI philosophy"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-10 border border-accent-30 mb-6">
            <Heart className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              Human-Centered AI
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technology That{" "}
            <span className="gradient-text">Helps People Thrive</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe AI should handle the tasks people hate, so they can
            pursue work that matters. Every system we build creates opportunity,
            not obsolescence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all"
            >
              <div className="p-3 rounded-lg border border-accent-30 bg-accent-10 w-fit mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto p-8 rounded-2xl border border-accent-30 bg-accent-10"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Our Commitment to Human Flourishing
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Every AI system we build is designed with a simple principle: it
              should make human lives better. Not just more efficient, but more
              fulfilling. We measure success not just in ROI, but in human hours
              reclaimed for meaningful work, new opportunities created, and
              teams empowered to do what they do best.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  100K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Hours Reclaimed for Creativity
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm text-muted-foreground">
                  New Jobs Created
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand mb-2">0</div>
                <div className="text-sm text-muted-foreground">
                  People Replaced
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
