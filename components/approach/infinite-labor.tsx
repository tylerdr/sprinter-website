"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import { CheckIcon } from "@heroicons/react/24/outline";

const shifts = [
  {
    before: "Hire more people",
    after: "Deploy more agents",
    impact: "Scale instantly without recruiting, training, or benefits costs",
  },
  {
    before: "$40-80K per FTE annually",
    after: "$0.01-0.10 per task with AI",
    impact: "Cost per task drops 99%+. Economics change completely.",
  },
  {
    before: "Design for limited headcount",
    after: "Rethink from first principles",
    impact: "What becomes possible when labor isn't the constraint?",
  },
];

const newPossibilities = [
  "Review 100% of contracts instead of sampling",
  "Respond to every customer inquiry in < 1 minute",
  "Generate custom proposals for every RFP",
  "Process every document, not just the urgent ones",
  "Continuously audit every transaction",
  "Personalize communication with every stakeholder",
];

export function InfiniteDigitalLabor() {
  return (
    <AnimatedSection id="infinite-labor" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Paradigm Shift</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">Infinite Digital Labor</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        When digital labor costs approach zero and scales infinitely, what becomes possible?
      </p>

      <div className="space-y-4 mb-12">
        {shifts.map((shift) => (
          <article key={shift.before} className="spr-card p-6">
            <div className="grid gap-4 md:grid-cols-2 mb-3">
              <div>
                <span className="text-xs font-semibold text-[color:rgba(255,120,120,0.8)] uppercase tracking-wider">Old World</span>
                <p className="text-sm text-[color:var(--spr-text-muted)] line-through mt-1">{shift.before}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-[color:var(--spr-primary)] uppercase tracking-wider">New World</span>
                <p className="text-sm font-semibold text-[color:var(--spr-text)] mt-1">{shift.after}</p>
              </div>
            </div>
            <p className="text-[color:var(--spr-text-muted)]">{shift.impact}</p>
          </article>
        ))}
      </div>

      <div className="spr-card spr-card-accent p-8">
        <h3 className="text-xl font-bold text-[color:var(--spr-text)] mb-6">What Becomes Possible</h3>
        <div className="grid gap-3 md:grid-cols-2 mb-6">
          {newPossibilities.map((possibility) => (
            <div key={possibility} className="flex items-start gap-3 rounded bg-[color:rgba(106,167,255,0.08)] p-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-[color:var(--spr-primary)] mt-0.5" />
              <span className="text-sm text-[color:var(--spr-text-soft)]">{possibility}</span>
            </div>
          ))}
        </div>
        <div className="rounded border-l-2 border-[color:var(--spr-primary)] bg-[color:rgba(106,167,255,0.08)] p-6">
          <h4 className="font-semibold text-[color:var(--spr-text)] mb-2">The Key Question:</h4>
          <p className="text-[color:var(--spr-text-muted)]">
            <strong className="text-[color:var(--spr-text)]">Optimize human time for high-value work.</strong> Let unlimited, scalable AI agents handle repetitive, time-consuming tasks.
            The constraint isn&apos;t labor anymore — it&apos;s our imagination.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
