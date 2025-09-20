"use client";

import BentoGrid from "@/components/kokonutui/bento-grid";
import ScrollFloat from "@/components/ScrollFloat";
import SwooshText from "@/components/kokonutui/swoosh-text";

export function AICapabilities() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollFloat className="text-center mb-16">
          <SwooshText
            text="AI That Actually Ships"
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            shadowColors={{
              first: "rgba(99, 102, 241, 0.5)",
              second: "rgba(168, 85, 247, 0.4)",
              third: "rgba(236, 72, 153, 0.3)",
              fourth: "rgba(251, 146, 60, 0.2)",
              glow: "rgba(168, 85, 247, 0.15)"
            }}
          />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Production-ready AI integrations with the world's leading models.
            From concept to deployment in days, not months.
          </p>
        </ScrollFloat>

        <div className="max-w-7xl mx-auto">
          <BentoGrid />
        </div>
      </div>
    </section>
  );
}