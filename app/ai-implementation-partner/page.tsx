import type { Metadata } from "next";
import { HeroSection } from "@/components/seo-pages/workshop-hero";
import { WorkshopDetails } from "@/components/seo-pages/workshop-details";
import { DeliverablesList } from "@/components/seo-pages/deliverables-list";
import { TimelineSection } from "@/components/seo-pages/timeline-section";
import { PricingSection } from "@/components/seo-pages/pricing-section";
import { FAQSection } from "@/components/seo-pages/faq-section";
import { CTASection } from "@/components/seo-pages/cta-section";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "GenAI Implementation Partner for Private Equity | Sprinter",
  description: "Boutique AI consulting firm specializing in private equity portfolio companies. Fixed-fee implementations, vendor neutral recommendations, 100+ successful deployments.",
  keywords: "ai implementation partner, genai implementation partner, ai consulting partner private equity, boutique ai consulting firm, ai systems integrator, portfolio operations ai consulting",
};

export default function AIImplementationPartnerPage() {
  return (
    <div className="spr-theme spr-page">
      <HeroSection
        badge="GenAI Implementation Partner"
        headline="Your AI Implementation Partner for Private Equity"
        subheadline="From Pilot to Production in 90 Days"
        description="Boutique AI consulting firm specializing in PE portfolio operations. We build, deploy, and scale AI solutions that actually work. Vendor neutral, fixed-fee engagements, proven playbooks."
        primaryCTA="Schedule Partner Discussion"
        primaryCTAHref="/contact?type=partner"
        secondaryCTA="View Case Studies"
        secondaryCTAHref="/case-studies"
      />

      <DeliverablesList
        title="How We Partner With PE Firms"
        items={[
          {
            title: "Portfolio-Wide Strategy",
            description: "Develop AI roadmaps tailored to each portfolio company's maturity, market, and strategic priorities.",
            icon: "rocket"
          },
          {
            title: "Hands-On Implementation",
            description: "We build and deploy solutions, not PowerPoints. Your teams see working AI in weeks, not months.",
            icon: "checklist"
          },
          {
            title: "Vendor Neutral Approach",
            description: "Recommend best-fit solutions—build, buy, or hybrid. No kickbacks, no preferred vendors, just what works.",
            icon: "shield"
          },
          {
            title: "Knowledge Transfer",
            description: "Train your operating partners and portfolio teams to identify, scope, and manage AI initiatives independently.",
            icon: "document"
          },
          {
            title: "LP-Ready Governance",
            description: "Implement frameworks for AI ethics, data privacy, and risk management that satisfy LP requirements.",
            icon: "shield"
          },
          {
            title: "Measurable ROI",
            description: "Every engagement includes clear KPIs, tracking dashboards, and quarterly business reviews.",
            icon: "chart"
          }
        ]}
      />

      <TimelineSection
        title="Our 4-Step Delivery Model"
        phases={[
          {
            day: "Discovery",
            title: "Week 1-2: Assessment & Prioritization",
            activities: [
              "Portfolio company diagnostic",
              "Use case identification and scoring",
              "Technical architecture review",
              "Quick win identification"
            ]
          },
          {
            day: "Pilot",
            title: "Week 3-6: Rapid Prototyping",
            activities: [
              "Build MVP for highest-impact use case",
              "Real data integration",
              "User acceptance testing",
              "ROI validation"
            ]
          },
          {
            day: "Scale",
            title: "Week 7-12: Production Deployment",
            activities: [
              "Full implementation rollout",
              "Integration with existing systems",
              "Training and change management",
              "Performance optimization"
            ]
          },
          {
            day: "Operate",
            title: "Ongoing: Continuous Improvement",
            activities: [
              "Monthly performance reviews",
              "Expansion to additional use cases",
              "Portfolio replication support",
              "Quarterly strategic alignment"
            ]
          }
        ]}
      />

      <DeliverablesList
        title="Solutions We've Deployed for 100+ Portcos"
        items={[
          {
            title: "AP & Invoice Automation",
            description: "60%+ touchless processing, <48hr exception handling, works with any ERP including upload-only systems.",
            icon: "calculator"
          },
          {
            title: "Quote Intelligence",
            description: "42% reduction in quote cycle time, automated competitive analysis, dynamic pricing optimization.",
            icon: "chart"
          },
          {
            title: "3PL Operations",
            description: "Automated carrier selection, real-time tracking integration, exception management workflows.",
            icon: "rocket"
          },
          {
            title: "Portfolio Reporting",
            description: "Automated KPI collection, anomaly detection, board-ready dashboards updated in real-time.",
            icon: "document"
          },
          {
            title: "Deal Sourcing",
            description: "AI-powered market scanning, automated CIM analysis, competitive landscape mapping.",
            icon: "chart"
          },
          {
            title: "Customer Support",
            description: "70% ticket deflection, 24/7 availability, seamless human handoff, sentiment analysis.",
            icon: "checklist"
          }
        ]}
      />

      <PricingSection
        title="Engagement Models"
        packages={[
          {
            name: "Sprint",
            price: "$50K-100K",
            description: "Single use case, single portco",
            features: [
              "4-6 week implementation",
              "One focused use case",
              "Production deployment",
              "30-day support included"
            ]
          },
          {
            name: "Transformation",
            price: "$250K-500K",
            description: "Multiple use cases, single portco",
            features: [
              "12-week comprehensive program",
              "3-5 use cases implemented",
              "Change management included",
              "Quarterly reviews for 1 year"
            ],
            recommended: true
          },
          {
            name: "Portfolio",
            price: "Custom",
            description: "Fund-wide engagement",
            features: [
              "Dedicated team assignment",
              "Unlimited portfolio companies",
              "Reusable playbooks",
              "Direct LP reporting support"
            ]
          }
        ]}
      />

      <FAQSection
        questions={[
          {
            question: "How are you different from big consulting firms?",
            answer: "We're practitioners, not advisors. Our team has built and scaled AI at companies like yours. Fixed fees, faster timelines, and we stick around to ensure success."
          },
          {
            question: "Do you work with specific industries?",
            answer: "We've deployed AI across manufacturing, healthcare, financial services, retail, and logistics. Our frameworks adapt to any industry with repeatable operations."
          },
          {
            question: "What about data security and compliance?",
            answer: "SOC 2 compliant, HIPAA ready when needed. We work within your security requirements and provide full audit trails for all AI decisions."
          },
          {
            question: "Can you work with our existing tech stack?",
            answer: "Yes. We've integrated with every major ERP, CRM, and operational system. Even desktop-only and upload-only systems—we make it work."
          },
          {
            question: "What's your typical client profile?",
            answer: "$50M-$5B revenue portfolio companies. Lower middle market to growth equity. Companies ready to move fast but need expert guidance."
          },
          {
            question: "Do you provide ongoing support?",
            answer: "Yes. All engagements include 30-90 days of post-deployment support. Extended support and managed services available."
          }
        ]}
      />

      <CTASection
        headline="Ready to Accelerate Your Portfolio's AI Transformation?"
        description="Join leading PE firms who trust us as their AI implementation partner. Fixed fees, proven playbooks, real results."
        primaryCTA="Schedule Partner Discussion"
        primaryCTAHref="/contact?type=partner"
        secondaryCTA="Download No-API Cookbook"
        secondaryCTAHref="/downloads/no-api-cookbook"
      />
    </div>
  );
}
