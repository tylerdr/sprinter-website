// A/B Test Variants for Hero and CTA Copy
// This file allows easy switching between different messaging variants for testing

export type HeroVariant = "scale" | "need" | "transform" | "accelerate";
export type CTAVariant = "blueprint" | "assessment" | "readiness" | "audit";

export const heroVariants = {
  scale: {
    headline: {
      line1: "Your AI Operating Partner",
      line2: "for Private Equity"
    },
    subheadline: "Boringly reliable 30-45 day wins (AP/expense, Quote Intelligence, 3PL Ops) with fund-level governance you can defend to LPs. No API? No problem. We build the safe middle layer for QBO/Sage/desktop."
  },
  need: {
    headline: {
      line1: "Make AI Boring.",
      line2: "Ship Portfolio Wins in 45 Days."
    },
    subheadline: "The AI Operating Partner for PE. Governance first, hype last. Touchless AP, faster quotes, accurate 3PL billing—auditable, repeatable, defensible."
  },
  transform: {
    headline: {
      line1: "Be the OP Who Shipped It.",
      line2: "Not the One Still Evaluating."
    },
    subheadline: "30-45 day wedges with clear acceptance criteria. Options memos, not vendor pushes. We choose what's right for each portco. No rewires, no drama."
  },
  accelerate: {
    headline: {
      line1: "No API? No Problem.",
      line2: "We Drive QBO/Sage/Desktop."
    },
    subheadline: "Your AI Operating Partner for lower-middle-market PE. Upload-only Sage? We ship the CSV spec and automations. Desktop app? We build the agentic middle layer."
  }
} as const;

export const ctaVariants = {
  blueprint: {
    primary: "Get Portfolio AI Blueprint →",
    secondary: "Book Partner Meeting"
  },
  assessment: {
    primary: "Get Free Portfolio Assessment",
    secondary: "Schedule LP Briefing"
  },
  readiness: {
    primary: "Assess Portfolio AI Readiness",
    secondary: "Explore Operating Partnership"
  },
  audit: {
    primary: "Get Free Portfolio AI Audit",
    secondary: "Discuss Your Portfolio"
  }
} as const;

export const valuePropsVariants = {
  offMarket: {
    headline: "AP touchless rate to 64% in 30 days (QBO; 18k invoices/yr)",
    description: "Quote cycle time ↓42% after 6 weeks (RFPs→Avontus). 3PL billing accuracy ↑18 pts with upload-only Sage.",
    cta: "If we miss the acceptance criteria, we work the next sprint at our cost to close the gap."
  },
  leftBehind: {
    headline: "Your ERP is ancient? Upload-only Sage/Biz?",
    description: "We ship CSV specs + automations. No rewires. Your champion approves, not executes.",
    cta: "Book the 90-Minute OP Workshop. Leave with a pilot plan and options memo."
  },
  competitive: {
    headline: "Fee-offset optics. Security pack. Vendor neutrality.",
    description: "Governance you can defend. Least-privilege access, redacted docs, full audit logs. We bring the policy pack.",
    cta: "Download the Governance Pack PDF. See what your CFO and counsel will sign."
  },
  roi: {
    headline: "30-45 day AP win you can replicate across portcos",
    description: "Acceptance criteria: ≥60% touchless invoices, exception SLA <48h, full audit trail. For upload-only Sage/Biz, we ship the CSV spec.",
    cta: "Want the 1-page pilot brief and governance pack? 90-minute OP Workshop next week."
  }
} as const;

// Function to get current variant based on environment variable or random selection
export function getCurrentVariants() {
  // These could be set via environment variables for controlled A/B testing
  const heroVariant = (process.env.NEXT_PUBLIC_HERO_VARIANT as HeroVariant) || "scale";
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