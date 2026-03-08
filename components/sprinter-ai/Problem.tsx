"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const items = [
  {
    number: "01",
    text: "Your team spends 20+ hours a week on quoting, data entry, and follow-ups. That\u2019s half a full-time salary going to work a machine could do better.",
  },
  {
    number: "02",
    text: "Your competitors are automating their operations right now. Every month you wait, the gap between their speed and yours gets wider.",
  },
  {
    number: "03",
    text: "You\u2019ve looked at AI tools but nothing fits. Off-the-shelf chatbots don\u2019t understand your processes. Custom development takes too long and costs too much.",
  },
];

export default function Problem() {
  return (
    <AnimatedSection id="problem" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>The Problem</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center max-w-4xl mx-auto">
        Your best people are buried in work that should be automated.
      </h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        You know AI can help. But finding the right opportunities, building the right systems,
        and actually getting them running in production — that&apos;s where most companies stall.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.number} className="spr-card p-6">
            <p className="spr-kicker mb-3">{item.number}</p>
            <p className="spr-body">{item.text}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-lg text-center text-[color:var(--spr-text-soft)]">
        This isn&apos;t about replacing people. It&apos;s about freeing them to do the work that actually requires a human.
      </p>
    </AnimatedSection>
  );
}
