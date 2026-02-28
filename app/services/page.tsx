import type { Metadata } from "next";
import { StructuredData } from "@/components/seo-structured-data";
import { ServicesHero } from "@/components/services/hero";
import { ServiceTiles } from "@/components/services/service-tiles";
import { HowWeWork } from "@/components/services/how-we-work";
import { ServicesCTA } from "@/components/services/cta";
import { ServicesTestimonials } from "@/components/services/testimonials";
import { ServicesMetrics } from "@/components/services/metrics";

export const metadata: Metadata = {
  title: "AI Services for Private Equity | Sprinter AI",
  description: "End-to-end AI services from strategy to implementation. Document intelligence, process automation, custom copilots, and governance for PE portfolios.",
  openGraph: {
    title: "AI Services for Private Equity | Sprinter AI",
    description: "Transform your portfolio with outcome-focused AI services. From document intelligence to end-to-end automation.",
    images: ["/images/og/services.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        type="service"
        serviceName="AI Services for Private Equity"
        serviceDescription="End-to-end AI services from strategy to implementation. Document intelligence, process automation, custom copilots, and governance for PE portfolios."
      />
      <StructuredData
        type="faq"
        faqs={[
          {
            question: "How long does an AI project typically take?",
            answer:
              "Our AI Sprint delivers production-ready systems in 2-4 weeks. Wedge implementations take 2 weeks, while full transformations range from 3-6 months depending on scope.",
          },
          {
            question: "What's included in an AI Sprint?",
            answer:
              "An AI Sprint includes a working solution with clear acceptance criteria, production deployment with monitoring, integration with existing systems, team training, and 30 days of post-launch support.",
          },
          {
            question: "Do you focus only on AP automation?",
            answer:
              "No, we focus on document intelligence across all operations - BOLs, work orders, warranty claims, vendor docs, job tickets, and more. AP is just one of many use cases.",
          },
          {
            question: "What kind of ROI can I expect?",
            answer:
              "Most clients achieve ≥60% touchless processing, 42% faster cycle times, and 250% ROI within 60 days. We define clear KPIs and acceptance criteria upfront.",
          },
        ]}
      />
      <div className="spr-theme spr-page">
        <main className="overflow-x-hidden">
          <ServicesHero />
          <ServicesMetrics />
          <ServiceTiles />
          <ServicesTestimonials />
          <HowWeWork />
          <ServicesCTA />
        </main>
      </div>
    </>
  );
}
