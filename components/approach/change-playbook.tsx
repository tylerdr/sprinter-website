"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import { CheckIcon } from "@heroicons/react/24/outline";

const playbook = [
  {
    title: "Reframe the Narrative",
    description: "Transform 'AI will replace me' into 'AI handles the boring stuff so I can do real work'",
    example: "\"Now I can actually take lunch breaks and work on strategic projects\"",
  },
  {
    title: "Co-Design Sessions",
    description: "30-60 minutes with actual users to understand their workflow and pain points",
    example: "The AP team designs their own exception routing rules",
  },
  {
    title: "Human-in-the-Loop from Day One",
    description: "Users validate and approve AI suggestions, maintaining control while building trust",
    example: "Every extraction below 95% confidence goes to review queue",
  },
  {
    title: "Visible Wins",
    description: "Before/after metrics on wallboards, success stories in team meetings",
    example: "Invoice processing time: 15min → 2min displayed on office dashboard",
  },
  {
    title: "Enablement Bursts",
    description: "Micro-training sessions, cheat sheets, and ongoing support",
    example: "5-minute Monday tips on using the new document tools",
  },
];

export function ChangePlaybook() {
  return (
    <AnimatedSection id="change-playbook" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>Change Management</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">People-First Change Playbook</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        How we turn skeptics into champions and ensure lasting adoption.
      </p>

      <div className="space-y-4">
        {playbook.map((item) => (
          <article key={item.title} className="spr-card p-6">
            <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                <CheckIcon className="h-6 w-6 text-[color:var(--spr-primary)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[color:var(--spr-text)] mb-2">{item.title}</h3>
                <p className="text-[color:var(--spr-text-muted)] mb-3">{item.description}</p>
                <div className="rounded border-l-2 border-[color:var(--spr-primary)] bg-[color:rgba(106,167,255,0.08)] p-3">
                  <p className="text-sm italic text-[color:var(--spr-text-soft)]">{item.example}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 spr-card spr-card-accent p-8 text-center">
        <h3 className="text-xl font-bold text-[color:var(--spr-text)] mb-3">The Result?</h3>
        <p className="text-[color:var(--spr-text-muted)] mb-4">
          Employees who genuinely love the new tools and ask &quot;What else can we automate?&quot;
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)]">
          <span className="text-sm font-medium text-[color:var(--spr-primary)]">98% adoption rate within 30 days</span>
        </div>
      </div>
    </AnimatedSection>
  );
}
