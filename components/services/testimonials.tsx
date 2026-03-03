"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const testimonials = [
  {
    quote: "The AI doesn't just help us manage Non-QM complexity — it turned it into our competitive advantage. We're closing loans 300% faster.",
    author: "VP Operations",
    company: "Mid-Market Lending Firm",
    metric: "300% faster",
  },
  {
    quote: "This isn't just automation — it's transformation. We quote more options, close faster, and our designers focus on design instead of spreadsheets.",
    author: "Operations Director",
    company: "Cabinet Manufacturer",
    metric: "20× ROI",
  },
];

export function ServicesTestimonials() {
  return (
    <AnimatedSection id="services-testimonials" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Client Results</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-12">Teams that ship with Sprinter.</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote key={t.author} className="spr-card spr-card-accent p-8">
            <div className="mb-4">
              <span className="text-2xl font-bold text-[color:var(--spr-primary)]">{t.metric}</span>
            </div>
            <p className="text-base italic leading-relaxed text-[color:var(--spr-text-soft)] mb-6">
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
