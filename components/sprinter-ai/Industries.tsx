"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const industries = [
  {
    icon: "🔨",
    title: "Construction & Roofing",
    body: "Estimating, job costing, permit tracking, crew scheduling",
  },
  {
    icon: "🪵",
    title: "Manufacturing",
    body: "QC, maintenance prediction, order processing, yield optimization",
  },
  {
    icon: "🍷",
    title: "Wine & Spirits",
    body: "Sales enablement, territory planning, compliance, customer research",
  },
  {
    icon: "🏠",
    title: "Kitchen & Bath",
    body: "Catalog management, quoting, dealer onboarding, order automation",
  },
  {
    icon: "📊",
    title: "Investment & PE",
    body: "Portfolio monitoring, deal flow, due diligence, market intelligence",
  },
  {
    icon: "💼",
    title: "Professional Services",
    body: "Client onboarding, billing, project tracking, knowledge management",
  },
];

export default function Industries() {
  return (
    <AnimatedSection id="industries" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
      <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">
        We don't learn your industry on your dime. We already know it.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <article key={industry.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-2xl" aria-hidden>
              {industry.icon}
            </p>
            <h3 className="mt-4 text-lg font-semibold text-[#FAFAFA]">{industry.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">{industry.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-9 text-lg text-[#FAFAFA]">
        Don't see your industry? If you have processes, we can automate them.
      </p>
    </AnimatedSection>
  );
}
