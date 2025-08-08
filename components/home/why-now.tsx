"use client";

import { Rocket, Database, Users, Zap } from "lucide-react";

export function WhyNow() {
  const points = [
    {
      title: "Build Like Never Before",
      description:
        "Frontier models + cheap compute transform ideas into live systems instantly. Small teams now ship enterprise-scale breakthroughs and dominate markets.",
      icon: Rocket,
    },
    {
      title: "Unlock Your Hidden Gold",
      description:
        "Transform docs, emails, tickets, transcripts into queryable intelligence and automated workflows. Your competitive moat is ready to activate.",
      icon: Database,
    },
    {
      title: "Supercharge Your Team",
      description:
        "Deploy AI agents to crush repetitive tasks and automate forgotten workflows. Your people focus on creating breakthrough value only humans can deliver.",
      icon: Users,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30 mb-6">
            <Zap className="w-5 h-5 text-brand" />
            <span className="text-sm font-medium text-brand">Why Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Greatest <span className="gradient-text">Leverage</span> in
            History
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A once-in-a-generation platform shift. Strike first, build momentum,
            and craft workflows and data into unbreakable competitive moats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((pt) => (
            <div
              key={pt.title}
              className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all"
            >
              <div
                className="inline-flex p-3 rounded-lg border border-brand-30 bg-brand-10 mb-4"
                aria-hidden="true"
              >
                <pt.icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{pt.title}</h3>
              <p className="text-sm text-muted-foreground">{pt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
