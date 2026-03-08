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
      <div className="mx-auto max-w-3xl">
        <h2 className="spr-heading-lg">Built by someone who&apos;s been in your shoes.</h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-[color:var(--spr-text-muted)] sm:text-lg">
          <p>
            I&apos;m Tyler Dreher. I started my career as a mechanical engineer at Exxon, then ran a
            construction business. In both worlds, I watched brilliant people burn hours on work that
            was repetitive for humans and trivial for computers. That frustration became my mission.
          </p>
          <p>
            In 2018 I started Sprinter to bridge that gap — first with custom software, then analytics,
            then AI. Today I deploy AI agent systems that handle the operational grind so your people
            can do the work that actually matters. I don&apos;t theorize about AI — I deploy it. Every day.
          </p>
          <p>
            Our own businesses run on the same technology we deploy for clients. That&apos;s not a sales pitch —
            it&apos;s how we know the systems work. When you see our automated ventures running without
            human intervention, you&apos;re looking at the same platform we&apos;ll deploy for you.
          </p>
          <p className="font-medium text-[color:var(--spr-text)]">&mdash; Tyler Dreher, Founder</p>
        </div>
      </div>
    </AnimatedSection>
  );
}
