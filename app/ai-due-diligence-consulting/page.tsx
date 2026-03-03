import type { Metadata } from "next";
import { HeroSection } from "@/components/seo-pages/workshop-hero";
import { DeliverablesList } from "@/components/seo-pages/deliverables-list";
import { TimelineSection } from "@/components/seo-pages/timeline-section";
import { PricingSection } from "@/components/seo-pages/pricing-section";
import { FAQSection } from "@/components/seo-pages/faq-section";
import { CTASection } from "@/components/seo-pages/cta-section";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "AI Due Diligence Consulting for M&A | Sprinter",
  description: "Technical due diligence for AI, data, and GenAI capabilities. 5-10 day assessment packages for PE deal teams. Model risk, data governance, vendor analysis, TCO projections.",
  keywords: "ai due diligence, tech due diligence, data due diligence, genai due diligence, ai risk assessment m&a, ai vendor analysis, model risk assessment, private equity due diligence",
};

export default function AIDueDiligenceConsultingPage() {
  return (
    <div className="spr-theme spr-page">
      <HeroSection
        badge="M&A Due Diligence"
        headline="AI & Data Due Diligence for Private Equity"
        subheadline="Technical Risk Assessment That Informs Deal Decisions"
        description="Comprehensive AI, data, and technology due diligence for M&A transactions. 5-10 day sprints that uncover risks, validate opportunities, and quantify AI potential. Built by practitioners who've been on both sides of the deal."
        primaryCTA="Schedule Diligence Consultation"
        primaryCTAHref="/contact?type=diligence"
        secondaryCTA="Download Checklist Template"
        secondaryCTAHref="/downloads/diligence-checklist"
      />

      <DeliverablesList
        title="What We Assess"
        items={[
          {
            title: "AI/ML Model Risk",
            description: "Model accuracy, bias detection, technical debt, retraining requirements, and regulatory compliance gaps.",
            icon: "shield"
          },
          {
            title: "Data Architecture & Quality",
            description: "Data completeness, governance maturity, privacy compliance, integration complexity, and remediation costs.",
            icon: "chart"
          },
          {
            title: "Technology Stack Evaluation",
            description: "Scalability assessment, technical debt quantification, modernization requirements, and security vulnerabilities.",
            icon: "document"
          },
          {
            title: "Vendor & IP Analysis",
            description: "Critical vendor dependencies, contract terms, IP ownership verification, and switching costs.",
            icon: "shield"
          },
          {
            title: "AI Opportunity Sizing",
            description: "Automation potential, competitive positioning, market readiness, and implementation roadmap.",
            icon: "rocket"
          },
          {
            title: "TCO & Investment Requirements",
            description: "5-year technology investment forecast, talent requirements, and ROI projections.",
            icon: "calculator"
          }
        ]}
      />

      <TimelineSection
        title="Our Diligence Process"
        phases={[
          {
            day: "Day 1-2",
            title: "Data Room Review & Planning",
            activities: [
              "Documentation analysis",
              "Technology architecture review",
              "Key stakeholder identification",
              "Risk hypothesis development"
            ]
          },
          {
            day: "Day 3-4",
            title: "Technical Deep Dive",
            activities: [
              "Code repository analysis",
              "Model performance validation",
              "Data quality sampling",
              "Security assessment"
            ]
          },
          {
            day: "Day 5-6",
            title: "Management Interviews",
            activities: [
              "CTO/CIO discussions",
              "Data team capabilities assessment",
              "Vendor relationship review",
              "Roadmap validation"
            ]
          },
          {
            day: "Day 7-8",
            title: "Analysis & Modeling",
            activities: [
              "Risk quantification",
              "Opportunity sizing",
              "Investment requirements",
              "Synergy identification"
            ]
          },
          {
            day: "Day 9-10",
            title: "Report & Recommendations",
            activities: [
              "Executive summary preparation",
              "Red flag documentation",
              "100-day plan development",
              "Board presentation support"
            ]
          }
        ]}
      />

      <DeliverablesList
        title="Deliverables"
        items={[
          {
            title: "Executive Summary",
            description: "2-page overview of critical findings, deal implications, and go/no-go recommendation.",
            icon: "document"
          },
          {
            title: "Technical Risk Report",
            description: "Detailed assessment of technology debt, scalability issues, and remediation requirements.",
            icon: "shield"
          },
          {
            title: "Data Maturity Assessment",
            description: "Data quality scores, governance gaps, compliance risks, and improvement roadmap.",
            icon: "chart"
          },
          {
            title: "AI Opportunity Analysis",
            description: "Use case prioritization, implementation timeline, and ROI projections.",
            icon: "rocket"
          },
          {
            title: "Vendor Risk Matrix",
            description: "Critical dependencies, contract analysis, and switching cost estimates.",
            icon: "checklist"
          },
          {
            title: "100-Day Action Plan",
            description: "Post-close priorities, quick wins, and critical risk mitigation steps.",
            icon: "checklist"
          }
        ]}
      />

      <PricingSection
        title="Diligence Packages"
        packages={[
          {
            name: "Rapid Assessment",
            price: "$35,000",
            description: "5-day sprint",
            features: [
              "High-level technology review",
              "Key risk identification",
              "AI opportunity sizing",
              "Executive summary report"
            ]
          },
          {
            name: "Comprehensive",
            price: "$75,000",
            description: "10-day deep dive",
            features: [
              "Full technical assessment",
              "Detailed risk quantification",
              "Management interviews",
              "100-day action plan",
              "Board presentation support"
            ],
            recommended: true
          },
          {
            name: "Confirmatory",
            price: "$15,000",
            description: "2-day validation",
            features: [
              "Specific issue investigation",
              "Red flag validation",
              "Quick expert opinion",
              "Verbal findings report"
            ]
          }
        ]}
      />

      <FAQSection
        questions={[
          {
            question: "When should we engage you in the deal process?",
            answer: "Ideally during the LOI stage or early in confirmatory diligence. We can also provide rapid assessments during initial target screening."
          },
          {
            question: "What access do you need?",
            answer: "Data room access, 2-3 management interviews, and ideally access to code repositories and data samples. We work within your confidentiality constraints."
          },
          {
            question: "Can you assess international targets?",
            answer: "Yes. We regularly assess companies globally and understand region-specific regulations like GDPR, CCPA, and emerging AI governance requirements."
          },
          {
            question: "Do you provide post-close support?",
            answer: "Absolutely. Many clients engage us for 100-day plan execution, interim CTO services, or ongoing transformation support."
          },
          {
            question: "How do you handle competitive/time-sensitive deals?",
            answer: "We can mobilize within 24 hours and provide preliminary findings within 48-72 hours for urgent situations."
          },
          {
            question: "What types of companies do you assess?",
            answer: "Any company with significant technology components, data assets, or AI ambitions. From SaaS to manufacturing to healthcare."
          }
        ]}
      />

      <CTASection
        headline="Make Confident AI Investment Decisions"
        description="Get expert technical due diligence that goes beyond the surface. Understand real risks, validate opportunities, and enter deals with eyes wide open."
        primaryCTA="Schedule Diligence Consultation"
        primaryCTAHref="/contact?type=diligence"
        secondaryCTA="View Sample Report"
        secondaryCTAHref="/downloads/sample-diligence-report"
      />
    </div>
  );
}