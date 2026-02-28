"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const pillars = [
  {
    number: "01",
    title: "People",
    description: "Earn trust; design for the front line; measure joy-of-work and adoption.",
  },
  {
    number: "02",
    title: "Process",
    description: "Map how work really happens; remove friction; define acceptance criteria.",
  },
  {
    number: "03",
    title: "Projects",
    description: "Deliver 2-week wedge sprints; prove value fast; document results.",
  },
  {
    number: "04",
    title: "Product",
    description: "Scale what works into durable automations and internal products.",
  },
];

export function FourPillars() {
  return (
    <AnimatedSection id="four-pillars" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>The Sprinter Method</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">The 4 Ps: Our Proven Methodology</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        A systematic approach that starts with people and ends with scalable solutions.
      </p>

      <div className="grid gap-6 md:grid-cols-4">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="spr-card p-6">
            <span className="text-3xl font-bold text-[color:var(--spr-primary)] mb-3 block">{pillar.number}</span>
            <h3 className="text-xl font-semibold text-[color:var(--spr-text)] mb-2">{pillar.title}</h3>
            <p className="text-sm text-[color:var(--spr-text-muted)]">{pillar.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.1)]">
          <span className="text-sm font-medium text-[color:var(--spr-text)]">Result:</span>
          <span className="text-sm text-[color:var(--spr-text-muted)]">
            Sustainable AI adoption with measurable ROI and happy teams
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
