// A/B Test Variants for Hero and CTA Copy
// This file allows easy switching between different messaging variants for testing

export type HeroVariant = "peoplefirst" | "scale" | "need" | "transform" | "accelerate";
export type CTAVariant = "blueprint" | "assessment" | "readiness" | "audit";

export const heroVariants = {
  peoplefirst: {
    headline: {
      line1: "Put AI to Work",
      line2: "Across Your Portfolio"
    },
    subheadline: "Transform your portfolio companies with agentic AI systems deployed in 10 days. Get custom solutions, off-the-shelf integrations, and repeatable playbooks proven across 50+ implementations. Your competitive advantage starts here."
  },
  scale: {
    headline: {
      line1: "Your GenAI Implementation Partner",
      line2: "for Portfolio Companies"
    },
    subheadline: "Deploy production-ready AI across your portfolio. From AP automation to quote intelligence systems. 60%+ touchless processing in 10 days with full governance and audit trails."
  },
  need: {
    headline: {
      line1: "AI Due Diligence & Value Creation",
      line2: "for Private Equity"
    },
    subheadline: "Technical due diligence, AI readiness assessments, and hands-on implementation. We help Operating Partners and Value Creation teams ship real AI wins. Portfolio-wide playbooks included."
  },
  transform: {
    headline: {
      line1: "Boutique AI Consulting",
      line2: "for PE Portfolio Ops"
    },
    subheadline: "Fixed-fee sprints that deliver working AI in production. No PowerPoints, just pilots. From 3PL operations to portfolio reporting—we've automated it for 100+ portcos."
  },
  accelerate: {
    headline: {
      line1: "AI Strategy Workshop",
      line2: "for Operating Partners"
    },
    subheadline: "2-week sprint to assess, scope, and pilot AI across your portfolio. Vendor-neutral recommendations with build vs. buy analysis. Clear acceptance criteria and LP-ready governance docs."
  }
} as const;

export const ctaVariants = {
  blueprint: {
    primary: "Book AI Scoping Workshop →",
    secondary: "Download RFP Template"
  },
  assessment: {
    primary: "Get AI Readiness Assessment",
    secondary: "View Fixed-Fee Pricing"
  },
  readiness: {
    primary: "Schedule Discovery Sprint",
    secondary: "See Portfolio Case Studies"
  },
  audit: {
    primary: "Book 2-Week Diagnostic",
    secondary: "Get Options Memo Template"
  }
} as const;

export const valuePropsVariants = {
  offMarket: {
    headline: "Your Portfolio. Powered by AI. In 10 Days.",
    description: "You get repeatable playbooks proven across 50+ portfolio companies. Choose custom development or off-the-shelf integrations based on your needs. From AP automation to quote intelligence—achieve measurable ROI in your first sprint.",
    cta: "Book your AI Scoping Workshop today. Fixed fee, clear deliverables."
  },
  leftBehind: {
    headline: "AI Due Diligence for Tech & Data Risk",
    description: "5-10 day assessment packages. Model risk, data governance, vendor analysis, TCO projections. Board-ready reports that actually inform deal decisions.",
    cta: "Schedule Due Diligence Consultation. See sample reports and pricing."
  },
  competitive: {
    headline: "Operating Partner AI Enablement",
    description: "Equip your OPs with AI playbooks tailored to portfolio verticals. From pricing optimization to procurement analytics. Hands-on workshops, not theory.",
    cta: "Book Operating Partner Workshop. 90 minutes to transform your approach."
  },
  roi: {
    headline: "Fixed-Fee Implementation, Clear Acceptance Criteria",
    description: "No hourly billing surprises. 2-week diagnostic, 30-day pilot, 90-day scale. Every engagement includes SOW, success metrics, and governance framework.",
    cta: "View pricing and engagement models. Transparent fees, proven results."
  }
} as const;

// Function to get current variant based on environment variable or random selection
export function getCurrentVariants() {
  // These could be set via environment variables for controlled A/B testing
  const heroVariant = (process.env.NEXT_PUBLIC_HERO_VARIANT as HeroVariant) || "peoplefirst";
  const ctaVariant = (process.env.NEXT_PUBLIC_CTA_VARIANT as CTAVariant) || "blueprint";
  const valuePropsVariant = process.env.NEXT_PUBLIC_VALUE_PROP_VARIANT || "offMarket";
  
  return {
    hero: heroVariants[heroVariant],
    cta: ctaVariants[ctaVariant],
    valueProp: valuePropsVariants[valuePropsVariant as keyof typeof valuePropsVariants]
  };
}

// Function for client-side A/B testing (can be integrated with analytics)
export function getRandomVariant<T extends Record<string, any>>(variants: T): T[keyof T] {
  const keys = Object.keys(variants);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return variants[randomKey];
}