"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const testimonials = [
  {
    quote: "In just 48 hours, Sprinter identified an AI-driven deal sourcing approach that found 47 off-market targets we had completely missed. The ROI was immediate.",
    author: "Managing Partner",
    company: "Mid-Market Operator",
  },
  {
    quote: "The AI coach transformed our care model. Nurses now manage 5× more patients with better outcomes because they focus on those who need them most.",
    author: "Chief Nursing Officer",
    company: "Regional Health System",
  },
  {
    quote: "This AI engine accomplished in 3 months what would've taken our team 3 years and $2M. We're now the category leader in organic traffic.",
    author: "VP Growth",
    company: "E-commerce Aggregator",
  },
  {
    quote: "Amble didn't just digitize our workshops — it revolutionized our entire innovation practice. We can now run 10 workshops simultaneously across continents.",
    author: "Managing Director",
    company: "Global Consulting Firm",
  },
];

export default function Testimonials() {
  return (
    <AnimatedSection id="testimonials" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>What Clients Say</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-12">Results that speak for themselves.</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote key={t.author} className="spr-card spr-card-accent p-6">
            <p className="text-base italic leading-relaxed text-[color:var(--spr-text-soft)] mb-4">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer>
              <p className="font-semibold text-[color:var(--spr-text)]">{t.author}</p>
              <p className="text-sm text-[color:var(--spr-text-muted)]">{t.company}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </AnimatedSection>
  );
}
