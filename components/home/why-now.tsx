"use client";

import { Rocket, Database, Users, Zap } from "lucide-react";

export function WhyNow() {
  const points = [
    {
      title: "Leverage Like Never Before",
      description:
        "Frontier models + cheap compute turn ideas into working systems fast. Small teams can now ship enterprise-scale outcomes.",
      icon: Rocket,
    },
    {
      title: "Use Your Unstructured Data",
      description:
        "Docs, emails, tickets, transcripts—now queryable, actionable, and automatable. Your moat is hiding in plain sight.",
      icon: Database,
    },
    {
      title: "Amplify Your Workforce",
      description:
        "Agents handle the repetitive and the forgotten. Your people focus on the work only they can do.",
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
            A once-in-a-generation platform shift. Move first, compound
            advantage, and turn workflows and data into durable moat.
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
