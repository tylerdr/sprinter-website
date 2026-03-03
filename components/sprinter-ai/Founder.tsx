"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

export default function Founder() {
  return (
    <AnimatedSection id="founder" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Who We Are</span>
        </div>
      </div>
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
          <h2 className="spr-heading-lg">Built by someone who&apos;s been in your shoes.</h2>
          <blockquote className="mt-6 space-y-5 text-base leading-relaxed text-[color:var(--spr-text-muted)] sm:text-lg">
            <p>
              I&apos;m Tyler Dreher. I started my career as a mechanical engineer at Exxon, then ran a
              construction business. In both worlds, I watched brilliant people burn hours on work that
              was repetitive for humans and trivial for computers. That frustration became my mission.
            </p>
            <p>
              In 2018 I started Sprinter to bridge that gap — first with custom software, then analytics,
              then AI. Today I deploy AI agent systems that empower people to do their best work by
              handling the operational grind they shouldn&apos;t have to do. I don&apos;t theorize about AI — I deploy it. Every day.
            </p>
            <p>
              AI is the ultimate leverage for individuals and businesses. The tools exist today to give
              every company an unlimited AI workforce. The question is whether you&apos;ll be the one
              using it — or the one watching competitors pull ahead.
            </p>
            <p className="font-medium text-[color:var(--spr-text)]">— Tyler Dreher, Founder</p>
          </blockquote>
        </div>
      </div>
    </AnimatedSection>
  );
}
