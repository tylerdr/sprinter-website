"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ChevronRight, 
  Target, 
  Database, 
  Zap, 
  Rocket, 
  TrendingUp,
  CheckCircle,
  Clock,
  Code,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TimelineStep {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
  outcome: string;
}

const executionSteps: TimelineStep[] = [
  {
    id: "discovery",
    title: "Discovery & Assessment",
    duration: "Week 1",
    description: "Map processes, identify bottlenecks, and prioritize AI opportunities",
    icon: Target,
    details: [
      "Process mapping workshop with key stakeholders",
      "Data readiness assessment",
      "Technical infrastructure review",
      "ROI projection for top 3 opportunities",
      "Risk analysis and mitigation planning"
    ],
    outcome: "Clear roadmap with prioritized AI initiatives"
  },
  {
    id: "data",
    title: "Data Preparation",
    duration: "Week 1-2",
    description: "Organize and prepare your data for AI consumption",
    icon: Database,
    details: [
      "Data collection and consolidation",
      "Quality assessment and cleaning",
      "Schema design and normalization",
      "Security and compliance review",
      "API integration planning"
    ],
    outcome: "Clean, structured data ready for AI processing"
  },
  {
    id: "prototype",
    title: "Rapid Prototyping",
    duration: "Week 2-3",
    description: "Build working AI prototype with real data",
    icon: Zap,
    details: [
      "Model selection and configuration",
      "Initial training and fine-tuning",
      "User interface design",
      "Integration with existing systems",
      "Performance benchmarking"
    ],
    outcome: "Working prototype demonstrating core functionality"
  },
  {
    id: "production",
    title: "Production Deployment",
    duration: "Week 3-4",
    description: "Deploy, integrate, and scale your AI system",
    icon: Rocket,
    details: [
      "Production infrastructure setup",
      "Security hardening and testing",
      "Monitoring and alerting configuration",
      "Team training and documentation",
      "Gradual rollout with feedback loops"
    ],
    outcome: "Live AI system with real users"
  },
  {
    id: "optimization",
    title: "Continuous Optimization",
    duration: "Ongoing",
    description: "Monitor, iterate, and maximize ROI",
    icon: TrendingUp,
    details: [
      "Performance monitoring and analytics",
      "User feedback collection",
      "Model retraining and updates",
      "Feature expansion based on usage",
      "ROI tracking and reporting"
    ],
    outcome: "Continuously improving AI delivering measurable value"
  }
];

export function ExecutionTimeline() {
  const [expandedStep, setExpandedStep] = useState<string | null>("discovery");

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30 mb-6">
            <Code className="w-5 h-5 text-brand" />
            <span className="text-sm font-medium text-brand">
              Proven Execution Playbook
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Idea to <span className="gradient-text">Production in 4 Weeks</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our battle-tested process delivers working AI systems fast. No lengthy 
            discovery phases, no endless PowerPoints—just rapid iteration and real results.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-30 via-brand to-brand-30 hidden md:block" />

          <div className="space-y-6">
            {executionSteps.map((step, index) => {
              const isExpanded = expandedStep === step.id;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className={cn(
                      "w-full text-left group transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background rounded-xl"
                    )}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                          "border-2",
                          isExpanded
                            ? "bg-brand-gradient border-transparent scale-110"
                            : "bg-card/10 border-brand-30 group-hover:scale-105"
                        )}>
                          <Icon className={cn(
                            "w-8 h-8",
                            isExpanded ? "text-primary-foreground" : "text-brand"
                          )} />
                        </div>
                        {index < executionSteps.length - 1 && (
                          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-brand-30 to-transparent md:hidden" />
                        )}
                      </div>

                      {/* Content */}
                      <div className={cn(
                        "flex-1 p-6 rounded-xl border transition-all",
                        isExpanded
                          ? "bg-card/10 border-brand-30 shadow-lg shadow-brand/5"
                          : "bg-card/5 border-border/10 group-hover:bg-card/10"
                      )}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">
                              {step.title}
                            </h3>
                            <span className="text-sm text-brand font-medium">
                              {step.duration}
                            </span>
                          </div>
                          <ChevronRight className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform mt-1",
                            isExpanded ? "rotate-90" : "group-hover:translate-x-1"
                          )} />
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {step.description}
                        </p>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="border-t border-border/20 pt-4 mt-4">
                              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                What We Do
                              </h4>
                              <ul className="space-y-2 mb-4">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">
                                      {detail}
                                    </span>
                                  </li>
                                ))}
                              </ul>

                              <div className="p-3 rounded-lg bg-success-10 border border-success-30">
                                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-success" />
                                  Outcome
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {step.outcome}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 rounded-2xl border border-brand-30 bg-brand-10 text-center"
        >
          <Clock className="w-12 h-12 text-brand mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">
            Most Clients See ROI in 60 Days
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our rapid deployment approach means you&apos;re not waiting months to see results. 
            We focus on quick wins that demonstrate value while building toward 
            transformational outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              Start Your AI Journey
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card/10 border border-border/20 font-semibold rounded-lg hover:bg-card/20 transition-all"
            >
              See Success Stories
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}