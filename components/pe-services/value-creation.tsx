"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Target,
  Zap,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Clock,
  CheckCircle2
} from "lucide-react";

const playbooks = [
  {
    phase: "Due Diligence",
    icon: Target,
    timeline: "Pre-acquisition",
    description: "AI-powered analysis to identify value creation opportunities",
    actions: [
      "Tech stack assessment and AI readiness scoring",
      "Operational efficiency analysis",
      "Automation opportunity mapping",
      "ROI projection modeling"
    ]
  },
  {
    phase: "100-Day Sprint",
    icon: Zap,
    timeline: "Post-acquisition",
    description: "Rapid implementation of high-impact AI initiatives",
    actions: [
      "AP automation (60%+ touchless rate)",
      "Quote intelligence systems",
      "Customer service automation",
      "Data infrastructure setup"
    ]
  },
  {
    phase: "Value Acceleration",
    icon: TrendingUp,
    timeline: "Year 1-2",
    description: "Scale AI across operations for compound growth",
    actions: [
      "Revenue optimization models",
      "Supply chain intelligence",
      "Predictive maintenance",
      "Cross-portfolio synergies"
    ]
  },
  {
    phase: "Exit Preparation",
    icon: Shield,
    timeline: "Pre-exit",
    description: "Maximize valuation with proven AI capabilities",
    actions: [
      "AI governance documentation",
      "Performance metrics packaging",
      "Technology transfer readiness",
      "Buyer confidence building"
    ]
  }
];

export function ValueCreationPlaybook() {
  return (
    <section id="playbook" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            The PE Value Creation Playbook
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Systematic AI implementation from due diligence to exit
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {playbooks.map((playbook, index) => {
            const Icon = playbook.icon;
            return (
              <motion.div
                key={playbook.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{playbook.phase}</h3>
                    <p className="text-sm text-muted-foreground">{playbook.timeline}</p>
                  </div>
                  <p className="text-sm mb-4">{playbook.description}</p>
                  <ul className="space-y-2">
                    {playbook.actions.map((action, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Key Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">30-45</div>
              <div className="text-sm text-muted-foreground">Days to First Value</div>
            </div>
            <div>
              <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">46%</div>
              <div className="text-sm text-muted-foreground">Productivity Gains</div>
            </div>
            <div>
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Portfolio Coverage</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}