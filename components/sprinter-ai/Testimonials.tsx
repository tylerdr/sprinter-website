"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const testimonials = [
  {
    quote: "This isn't just automation — it's transformation. We quote more options, close faster, and our designers focus on design instead of spreadsheets. The ROI was evident within weeks.",
    author: "Operations Director",
    company: "Cabinet Manufacturer",
  },
  {
    quote: "The AI coach transformed our care model. Nurses now manage 5× more patients with better outcomes because they focus on those who need them most.",
    author: "Chief Nursing Officer",
    company: "Regional Health System",
  },
  {
    quote: "The AI doesn't just help us manage Non-QM complexity — it turned it into our competitive advantage. We're closing loans faster with confidence.",
    author: "VP Operations",
    company: "Non-QM Lending Firm",
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
