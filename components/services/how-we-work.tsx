"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import { CheckIcon } from "@heroicons/react/24/outline";

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    description: "Map processes, identify wedges, define acceptance criteria",
    activities: ["Stakeholder interviews", "Process mapping", "Data assessment", "ROI modeling"]
  },
  {
    number: "02",
    title: "Sprint",
    duration: "Weeks 2-3",
    description: "Build and test the solution with your team",
    activities: ["Rapid prototyping", "User testing", "Integration setup", "Training prep"]
  },
  {
    number: "03",
    title: "Deploy",
    duration: "Week 4",
    description: "Production rollout with monitoring and controls",
    activities: ["Go-live support", "Performance monitoring", "Exception handling", "Documentation"]
  },
  {
    number: "04",
    title: "Scale",
    duration: "Ongoing",
    description: "Expand success across teams and processes",
    activities: ["Usage analytics", "Continuous improvement", "Additional use cases", "ROI tracking"]
  }
];

const inclusions = [
  { title: "Acceptance Criteria", description: "Clear success metrics defined upfront" },
  { title: "Human-in-the-Loop", description: "Your team stays in control" },
  { title: "Governance Pack", description: "Audit trails and compliance" },
  { title: "30-Day Support", description: "Post-launch optimization" },
];

export function HowWeWork() {
  return (
    <AnimatedSection id="how-we-work" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Our Process</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">Discovery to Deployment in 4 Weeks</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        No endless consulting — just rapid execution with clear deliverables at every stage.
      </p>

      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((step) => (
          <article key={step.title} className="spr-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[color:var(--spr-primary)]">{step.number}</span>
              <span className="spr-chip">{step.duration}</span>
            </div>
            <h3 className="text-lg font-semibold text-[color:var(--spr-text)] mb-2">{step.title}</h3>
            <p className="text-sm text-[color:var(--spr-text-muted)] mb-4">{step.description}</p>
            <ul className="space-y-1.5">
              {step.activities.map((activity) => (
                <li key={activity} className="text-xs flex items-center gap-2 text-[color:var(--spr-text-muted)]">
                  <span className="spr-list-dot !w-1.5 !h-1.5" aria-hidden />
                  {activity}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 spr-card spr-card-accent p-8">
        <h3 className="text-xl font-semibold text-[color:var(--spr-text)] mb-6 text-center">Every Engagement Includes</h3>
        <div className="grid gap-6 md:grid-cols-4">
          {inclusions.map((item) => (
            <div key={item.title} className="text-center">
              <CheckIcon className="h-6 w-6 text-[color:var(--spr-primary)] mx-auto mb-2" />
              <p className="font-medium text-[color:var(--spr-text)] mb-1">{item.title}</p>
              <p className="text-sm text-[color:var(--spr-text-muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
