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
import Balancer from "react-wrap-balancer";
import { IconBadge } from "@/components/ui/icon-badge";

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
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-12 md:space-y-16"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30">
              <Code className="w-5 h-5 text-brand" />
              <span className="text-sm font-semibold text-brand">
                Proven Execution Playbook
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              <Balancer>
                From Idea to <span className="gradient-text">Production in 4 Weeks</span>
              </Balancer>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed">
              <Balancer>
                Our battle-tested process delivers working AI systems fast. No lengthy 
                discovery phases, no endless PowerPoints—just rapid iteration and real results.
              </Balancer>
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {executionSteps.map((step, index) => {
              const isExpanded = expandedStep === step.id;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className={cn(
                      "w-full text-left group transition-all rounded-xl",
                      "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background"
                    )}
                    aria-expanded={isExpanded}
                  >
                    <div className={cn(
                      "p-6 rounded-xl border transition-all h-full",
                      isExpanded
                        ? "bg-gradient-to-br from-brand/10 to-brand-end/10 border-brand-30 shadow-lg shadow-brand/10"
                        : "bg-card/20 border-border/30 group-hover:bg-card/30 group-hover:border-border/40"
                    )}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "p-2.5 rounded-lg transition-all",
                            isExpanded
                              ? "bg-brand-gradient"
                              : "bg-brand/10"
                          )}>
                            <Icon className={cn(
                              "w-5 h-5",
                              isExpanded ? "text-primary-foreground" : "text-brand"
                            )} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 tracking-tight leading-tight">
                              {step.title}
                            </h3>
                            <span className="text-sm text-brand font-semibold tabular-nums">
                              {step.duration}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform mt-1 flex-shrink-0",
                          isExpanded ? "rotate-90" : "group-hover:translate-x-1"
                        )} />
                      </div>

                      <p className="text-muted-foreground text-sm font-normal leading-relaxed">
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
                            <div className="mb-3">
                              <IconBadge
                                icon={<Users className="w-4 h-4" />}
                                title="What We Do"
                                className="mb-0"
                              />
                            </div>
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
          <h3 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
            <Balancer>
              Most Clients See ROI in 60 Days
            </Balancer>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto font-normal leading-relaxed">
            <Balancer>
              Our rapid deployment approach means you&apos;re not waiting months to see results. 
              We focus on quick wins that demonstrate value while building toward 
              transformational outcomes.
            </Balancer>
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card/30 border border-border/20 font-semibold rounded-lg hover:bg-card/40 transition-all"
            >
              See Success Stories
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}