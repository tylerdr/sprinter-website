"use client";

import DraggableDashboard from "@/components/draggable-dashboard";
import { Card } from "@/components/ui/card";
import { BarChart, Users, DollarSign, TrendingUp, Building2, Zap } from "lucide-react";

const dashboardWidgets = [
  {
    id: "portfolio-overview",
    title: "Portfolio Overview",
    content: (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">47</div>
            <div className="text-sm text-muted-foreground">Active Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">$2.1B</div>
            <div className="text-sm text-muted-foreground">Total AUM</div>
          </div>
        </div>
      </div>
    ),
    icon: <Building2 className="w-5 h-5" />,
    size: { width: 300, height: 200 },
  },
  {
    id: "ai-readiness",
    title: "AI Readiness Score",
    content: (
      <div className="p-4">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500">83%</div>
            <div className="text-sm text-muted-foreground">Portfolio Average</div>
          </div>
        </div>
      </div>
    ),
    icon: <Zap className="w-5 h-5" />,
    size: { width: 250, height: 180 },
  },
  {
    id: "value-created",
    title: "AI Value Created",
    content: (
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Hours Saved</span>
            <span className="font-semibold">2,400/week</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Cost Reduction</span>
            <span className="font-semibold">$4.2M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Revenue Impact</span>
            <span className="font-semibold">+$12M</span>
          </div>
        </div>
      </div>
    ),
    icon: <DollarSign className="w-5 h-5" />,
    size: { width: 280, height: 200 },
  },
  {
    id: "adoption-metrics",
    title: "Adoption Metrics",
    content: (
      <div className="p-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>User Adoption</span>
              <span>78%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Feature Usage</span>
              <span>92%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    ),
    icon: <Users className="w-5 h-5" />,
    size: { width: 300, height: 180 },
  },
];

export function PortfolioDashboard() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Interactive Portfolio Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Drag and rearrange widgets to customize your view. Real-time AI impact across your portfolio.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <DraggableDashboard widgets={dashboardWidgets} />
        </div>
      </div>
    </section>
  );
}