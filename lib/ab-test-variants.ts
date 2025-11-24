// A/B Test Variants for Hero and CTA Copy
// This file allows easy switching between different messaging variants for testing
// Updated with outcome-focused copy following Hormozi's Grand Slam Offer framework

export type HeroVariant = "peoplefirst" | "scale" | "need" | "transform" | "accelerate";
export type CTAVariant = "blueprint" | "assessment" | "readiness" | "audit";

export const heroVariants = {
  peoplefirst: {
    headline: {
      line1: "Add Millions to EBITDA",
      line2: "in 10 Days, Not 10 Months"
    },
    subheadline: "Ship production AI that actually works. No vendor lock-in. No failed pilots. Just measurable ROI—250% average in 60 days. Proven across 50+ portfolio companies. Works with your legacy systems. Guaranteed results or we work free."
  },
  scale: {
    headline: {
      line1: "Turn Your Portfolio Into",
      line2: "an AI-Powered Engine"
    },
    subheadline: "From AP automation to quote intelligence—60%+ touchless processing in production within 10 days. Full governance and audit trails. Playbooks that multiply across your entire portfolio."
  },
  need: {
    headline: {
      line1: "Stop Leaving Money",
      line2: "on the Table"
    },
    subheadline: "Your competitors are shipping AI while you're stuck in pilot purgatory. We've helped 50+ portcos add millions to EBITDA with AI that ships in 10 days. No API required. ROI guaranteed."
  },
  transform: {
    headline: {
      line1: "Production AI in 10 Days",
      line2: "Guaranteed"
    },
    subheadline: "Fixed-fee sprints. Working systems in production. No decks, no delays. If we don't ship in 10 days, we continue at no charge. That's how confident we are in The Sprinter Method™."
  },
  accelerate: {
    headline: {
      line1: "Your AI Operating Partner",
      line2: "for Portfolio Value Creation"
    },
    subheadline: "Get the AI wins that matter—without hiring a $500K head of AI. Independent counsel. Hands-on execution. Playbooks proven across 50+ implementations. Capacity for just 3 new retainer clients this quarter."
  }
} as const;

export const ctaVariants = {
  blueprint: {
    primary: "Get Your Free Assessment →",
    secondary: "See How We Guarantee Results"
  },
  assessment: {
    primary: "Claim Your Free AI Roadmap",
    secondary: "Only 10 Spots This Month"
  },
  readiness: {
    primary: "Book Your Assessment (Free)",
    secondary: "See $12M Case Study"
  },
  audit: {
    primary: "Start With Free Assessment",
    secondary: "View Pricing & Guarantee"
  }
} as const;

export const valuePropsVariants = {
  offMarket: {
    headline: "250% Average ROI in 60 Days. Guaranteed.",
    description: "We don't charge until you see results. If we don't identify at least $500K in AI opportunities during your assessment, it's free. If we don't ship to production in 10 days, we work free until we do. That's how confident we are.",
    cta: "Only 3 retainer slots available this quarter. Book your free assessment now."
  },
  leftBehind: {
    headline: "Never Get Blindsided by a Bad Acquisition Again",
    description: "Our technical AI diligence has saved clients from 3 acquisitions that would have cost millions. 5-day turnaround. Board-ready reports. Build-vs-buy clarity.",
    cta: "Book a diligence consultation. See what we've helped clients avoid."
  },
  competitive: {
    headline: "Stop Paying $500K/Year for AI Leadership",
    description: "Get fractional CAIO services that deliver results, not just advice. Board-level counsel. Vendor negotiations. Implementation oversight. All without the full-time salary.",
    cta: "See how one family office saved $4M in their first year."
  },
  roi: {
    headline: "Production AI in 10 Days, or We Work Free",
    description: "Fixed-fee sprints with acceptance criteria. No hourly surprises. No stalled pilots. If we miss our 10-day deadline, we continue at no charge until you're in production. Zero risk.",
    cta: "Book your assessment. See transparent pricing. Make a decision with confidence."
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