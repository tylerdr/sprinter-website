"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Workflow, Palette, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";

const demos = [
  {
    icon: Bot,
    title: "Agent Simulator",
    description: "Watch AI agents work in parallel",
    href: "/labs/agent-simulator",
    preview: "🤖 → 📊 → ✅",
  },
  {
    icon: Workflow,
    title: "Workflow Designer",
    description: "Map & augment your processes with AI",
    href: "/labs/workflow-tool",
    preview: "📝 → 🤖 → 🚀",
  },
  {
    icon: Gamepad2,
    title: "Ideation Lab",
    description: "AI-powered brainstorming games",
    href: "/labs/ideation",
    preview: "💡 → 🏃 → 🏆",
  },
  {
    icon: Palette,
    title: "AI Sketch Studio",
    description: "Transform sketches with AI magic",
    href: "/labs/sketch-studio",
    preview: "✏️ → ✨ → 🎨",
  },
];

export function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 noise-bg opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience <span className="gradient-text">AI in Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive demos showcasing our AI capabilities. Try them yourself!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveDemo(index)}
              >
                <Link
                  href={demo.href}
                  className={`group block p-6 rounded-xl transition-all ${
                    activeDemo === index
                      ? "bg-brand-10 border-brand-30"
                      : "bg-card/20 border-border/30 hover:bg-card/30"
                  } border backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        activeDemo === index
                          ? "bg-brand-gradient"
                          : "bg-card/30"
                      }`}
                    >
                      <demo.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {demo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {demo.description}
                      </p>
                      <div className="text-2xl tracking-wider font-mono opacity-50">
                        {demo.preview}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-2xl border border-border/30 overflow-hidden bg-brand-10"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-6">
                  {React.createElement(demos[activeDemo].icon, {
                    className: "w-24 h-24 mx-auto text-foreground/50 glow",
                  })}
                </div>
                <h3 className="text-2xl font-bold mb-2 gradient-text">
                  {demos[activeDemo].title}
                </h3>
                <p className="text-muted-foreground mb-6 px-8">
                  {demos[activeDemo].description}
                </p>
                <Link
                  href={demos[activeDemo].href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Try Demo →
                </Link>
                <div className="mt-3 text-xs text-muted-foreground/80">
                  Tip: Demos auto-rotate every 3s. Tap bullets to switch on
                  mobile.
                </div>
              </motion.div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              {demos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDemo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeDemo === index
                      ? "w-8 bg-brand-gradient"
                      : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const React = {
  createElement: (
    component: React.ComponentType<Record<string, unknown>>,
    props: Record<string, unknown>
  ) => {
    const Component = component;
    return <Component {...props} />;
  },
};
