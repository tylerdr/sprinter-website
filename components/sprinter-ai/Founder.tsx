"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

export default function Founder() {
  return (
    <AnimatedSection id="founder" className="spr-container spr-section-divider" delay={0.05}>
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="spr-card overflow-hidden p-6">
          <div className="relative flex h-72 items-end rounded-[1rem] border [border-color:var(--spr-border)] bg-[color:rgba(8,14,28,0.86)] p-5">
            <div className="absolute inset-0 bg-[url('/images/sprinter-ai/mesh-aurora.svg')] bg-cover bg-center opacity-70" />
            <div className="absolute inset-0 bg-[url('/images/sprinter-ai/geometric-glow.svg')] bg-cover bg-center opacity-50" />
            <p className="relative z-10 text-sm text-[color:var(--spr-text-soft)]">
              Tyler Dreher - Founder, Sprinter Consulting
            </p>
          </div>
        </div>

        <div>
          <h2 className="spr-heading-lg">Built by an engineer who ships.</h2>
          <blockquote className="mt-6 space-y-5 text-base leading-relaxed text-[color:var(--spr-text-muted)] sm:text-lg">
            <p>
              I&apos;m Tyler Dreher. I&apos;ve spent 8 years building software for companies across manufacturing,
              construction, fintech, and healthcare. I don&apos;t theorize about AI - I deploy it. Every day.
            </p>
            <p>
              When OpenAI drops a new model on Tuesday, I&apos;m building with it by Wednesday. When a client calls
              with a problem, they have a working solution by Friday.
            </p>
            <p>
              Sprinter exists because I believe every business deserves the AI advantage that only tech giants had
              yesterday. The tools exist. The gap is closing. The question is whether you&apos;ll be the one closing it -
              or the one it closes on.
            </p>
            <p className="font-medium text-[color:var(--spr-text)]">- Tyler Dreher, Founder</p>
          </blockquote>
        </div>
      </div>
    </AnimatedSection>
  );
}
