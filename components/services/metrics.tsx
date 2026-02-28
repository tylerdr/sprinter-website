"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const metrics = [
  { value: "≥60%", label: "Touchless Processing" },
  { value: "42%", label: "Cycle Time Reduction" },
  { value: "2-4 wks", label: "Time to Production" },
  { value: "20+", label: "Systems Deployed" },
];

export function ServicesMetrics() {
  return (
    <AnimatedSection className="spr-container" delay={0.05}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="spr-card spr-card-accent spr-card-tight p-6 text-center">
            <div className="text-3xl font-bold text-[color:var(--spr-primary)] mb-1">{m.value}</div>
            <div className="text-sm text-[color:var(--spr-text-muted)]">{m.label}</div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
