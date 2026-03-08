"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const ventures = [
  {
    name: "Automated E-Commerce Operation",
    description:
      "Product sourcing, listing optimization, customer service, and order fulfillment — all handled by AI agents. Zero full-time employees.",
    status: "Running in production",
  },
  {
    name: "AI Content & Distribution Engine",
    description:
      "Research, writing, editing, publishing, and distribution across multiple channels. Agents handle the full pipeline from topic selection to analytics.",
    status: "Running in production",
  },
  {
    name: "Automated Service Business",
    description:
      "Lead qualification, quoting, scheduling, and client communication managed entirely by AI agents. Human involvement only for strategic decisions.",
    status: "Running in production",
  },
];

export default function ProofSection() {
  return (
    <AnimatedSection id="proof" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>Our Own Proof</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center max-w-4xl mx-auto">
        We don&apos;t just build AI for clients. We run our own businesses with it.
      </h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        The same technology we deploy for you powers our own automated ventures.
        These businesses run with minimal human intervention — proof that the systems work.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {ventures.map((venture) => (
          <article key={venture.name} className="spr-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-green-400">
                {venture.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[color:var(--spr-text)] mb-3">
              {venture.name}
            </h3>
            <p className="text-sm leading-relaxed text-[color:var(--spr-text-muted)]">
              {venture.description}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-9 text-lg text-center text-[color:var(--spr-text-soft)]">
        Powered by OpenClaw — the same AI operations platform we deploy for clients.
      </p>
    </AnimatedSection>
  );
}
