import type { Metadata } from "next";
import { HeroSection } from "@/components/seo-pages/workshop-hero";
import { WorkshopDetails } from "@/components/seo-pages/workshop-details";
import { DeliverablesList } from "@/components/seo-pages/deliverables-list";
import { TimelineSection } from "@/components/seo-pages/timeline-section";
import { PricingSection } from "@/components/seo-pages/pricing-section";
import { FAQSection } from "@/components/seo-pages/faq-section";
import { CTASection } from "@/components/seo-pages/cta-section";

export const metadata: Metadata = {
  title: "AI Scoping Workshop for Private Equity & Portfolio Companies | Sprinter",
  description: "Fixed-fee AI readiness assessment and implementation roadmap. 2-week diagnostic with clear deliverables: options memo, pilot SOW, and ROI model. Built for PE portfolio operations.",
  keywords: "ai scoping workshop, ai discovery workshop, private equity ai, portfolio company ai, ai readiness assessment, ai pilot scoping, fixed fee ai consulting, operating partner workshop",
};

export default function AIScopingWorkshopPage() {
  return (
    <>
      <HeroSection
        badge="Private Equity & Portfolio Companies"
        headline="AI Scoping Workshop"
        subheadline="2-Week Sprint to AI Clarity"
        description="Fixed-fee diagnostic that delivers an options memo, pilot SOW, and ROI model. Built specifically for PE portfolio operations. No PowerPoints, just actionable deliverables."
        primaryCTA="Book Scoping Call"
        primaryCTAHref="/contact?type=workshop"
        secondaryCTA="See Case Studies"
        secondaryCTAHref="/case-studies"
      />

      <WorkshopDetails />

      <DeliverablesList
        title="What You Get in 10 Business Days"
        items={[
          {
            title: "Options Memo",
            description: "3-5 AI opportunities ranked by ROI, implementation complexity, and strategic fit. Build vs. buy analysis included.",
            icon: "document"
          },
          {
            title: "Pilot SOW",
            description: "Ready-to-execute statement of work for your highest-impact use case. Fixed timeline, clear acceptance criteria.",
            icon: "checklist"
          },
          {
            title: "Data Readiness Score",
            description: "Detailed assessment of your data maturity, gaps, and remediation roadmap. System integration requirements mapped.",
            icon: "chart"
          },
          {
            title: "ROI Model",
            description: "Financial model with conservative, base, and optimistic scenarios. Cost savings, efficiency gains, and payback period.",
            icon: "calculator"
          },
          {
            title: "Governance Framework",
            description: "LP-ready policies for AI usage, data privacy, and vendor management. Audit trail requirements specified.",
            icon: "shield"
          },
          {
            title: "Portfolio Playbook",
            description: "Replication strategy to scale successful pilots across portfolio companies. Change management guide included.",
            icon: "rocket"
          }
        ]}
      />

      <TimelineSection
        title="10-Day Sprint Timeline"
        phases={[
          {
            day: "Days 1-2",
            title: "Discovery & Stakeholder Alignment",
            activities: [
              "Executive interviews with C-suite and board sponsors",
              "Process walkthrough with operational teams",
              "Systems architecture and data review",
              "Pain point prioritization workshop"
            ]
          },
          {
            day: "Days 3-5",
            title: "Opportunity Mapping & Technical Assessment",
            activities: [
              "Use case identification and scoring",
              "Data quality and accessibility audit",
              "Vendor landscape analysis",
              "Security and compliance review"
            ]
          },
          {
            day: "Days 6-7",
            title: "Solution Design & Business Case",
            activities: [
              "Pilot architecture and technical approach",
              "ROI modeling and sensitivity analysis",
              "Risk assessment and mitigation strategies",
              "Resource and timeline planning"
            ]
          },
          {
            day: "Days 8-9",
            title: "Documentation & Review",
            activities: [
              "Options memo drafting",
              "SOW and acceptance criteria development",
              "Governance framework creation",
              "Stakeholder review sessions"
            ]
          },
          {
            day: "Day 10",
            title: "Presentation & Go/No-Go Decision",
            activities: [
              "Executive presentation of findings",
              "Pilot kick-off planning",
              "Portfolio replication roadmap",
              "Next steps and support model"
            ]
          }
        ]}
      />

      <PricingSection
        title="Transparent, Fixed-Fee Pricing"
        packages={[
          {
            name: "Single Portco",
            price: "$25,000",
            description: "One portfolio company assessment",
            features: [
              "10-day diagnostic sprint",
              "All deliverables included",
              "2 follow-up sessions",
              "Pilot implementation support"
            ]
          },
          {
            name: "Portfolio Package",
            price: "$75,000",
            description: "Up to 5 portfolio companies",
            features: [
              "Streamlined 5-day assessments",
              "Cross-portfolio opportunity analysis",
              "Centralized playbook creation",
              "Monthly office hours for 3 months"
            ],
            recommended: true
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "Full fund engagement",
            features: [
              "Unlimited portfolio companies",
              "Dedicated team assignment",
              "Quarterly strategic reviews",
              "Direct LP reporting support"
            ]
          }
        ]}
      />

      <FAQSection
        questions={[
          {
            question: "What do you need from us?",
            answer: "Access to 3-5 key stakeholders, process documentation, sample data sets, and system architecture diagrams. We provide a detailed prep checklist upon booking."
          },
          {
            question: "What if we're not ready for AI?",
            answer: "That's exactly what the workshop determines. If foundational work is needed, we'll provide a clear roadmap with quick wins to build momentum."
          },
          {
            question: "Do you sign NDAs?",
            answer: "Yes, we execute mutual NDAs before any discovery work begins. We're also happy to work under your standard confidentiality agreements."
          },
          {
            question: "How is this different from big consulting firms?",
            answer: "Fixed timeline, fixed fee, and practitioners who build—not just advise. Our team has shipped AI for 100+ portfolio companies. We know what works."
          },
          {
            question: "Can we convert the workshop fee to implementation?",
            answer: "Yes, 100% of the workshop fee credits toward pilot implementation if you proceed within 30 days."
          },
          {
            question: "What happens after the workshop?",
            answer: "You'll have everything needed to move forward—with us, another vendor, or internally. Most clients proceed to pilot within 2 weeks."
          }
        ]}
      />

      <CTASection
        headline="Ready to Accelerate Your Portfolio's AI Journey?"
        description="Join 100+ portfolio companies that have transformed operations with AI. Fixed fee, clear deliverables, proven results."
        primaryCTA="Book Scoping Call"
        primaryCTAHref="/contact?type=workshop"
        secondaryCTA="Download Governance Pack"
        secondaryCTAHref="/downloads/governance-pack"
      />
    </>
  );
}
