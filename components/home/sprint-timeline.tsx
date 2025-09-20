"use client";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import ScrollFloat from "@/components/ScrollFloat";
import { GlitchText } from "@/components/GlitchText";
import { Zap, Code2, Rocket, CheckCircle2, Users, TrendingUp } from "lucide-react";

const sprintSteps = [
  {
    id: 1,
    date: "Day 1-2",
    title: "Discovery & Alignment",
    description: "Deep dive into your workflows, identify automation opportunities, align on success metrics.",
    icon: Zap,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    date: "Day 3-5",
    title: "Rapid Prototyping",
    description: "Build working AI prototypes, integrate with your existing tools, test with real data.",
    icon: Code2,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    date: "Day 6-8",
    title: "Production Deployment",
    description: "Deploy to production, implement monitoring, establish feedback loops.",
    icon: Rocket,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    date: "Day 9-10",
    title: "Team Enablement",
    description: "Train your team, document workflows, hand over ownership with confidence.",
    icon: Users,
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: 5,
    date: "Day 10+",
    title: "Scale & Optimize",
    description: "Monitor performance, gather insights, identify next opportunities for expansion.",
    icon: TrendingUp,
    color: "from-indigo-500/20 to-purple-500/20",
  },
];

export function SprintTimeline() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollFloat className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <GlitchText text="10-Day Sprint Process" />
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            From zero to production AI in 10 days. Every sprint follows our proven playbook.
          </p>
        </ScrollFloat>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <Timeline defaultValue={3} orientation="horizontal">
            {sprintSteps.map((step) => (
              <TimelineItem key={step.id} step={step.id}>
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineDate className="text-primary font-semibold">
                    {step.date}
                  </TimelineDate>
                  <TimelineTitle className="flex items-center gap-2">
                    <step.icon className="w-5 h-5" />
                    {step.title}
                  </TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
                <TimelineContent>
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${step.color} border border-border/50`}>
                    {step.description}
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <Timeline defaultValue={3} orientation="vertical">
            {sprintSteps.map((step) => (
              <TimelineItem key={step.id} step={step.id}>
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineDate className="text-primary font-semibold">
                    {step.date}
                  </TimelineDate>
                  <TimelineTitle className="flex items-center gap-2">
                    <step.icon className="w-5 h-5" />
                    {step.title}
                  </TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
                <TimelineContent>
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${step.color} border border-border/50`}>
                    {step.description}
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}