// A/B Test Variants for Hero and CTA Copy
// This file allows easy switching between different messaging variants for testing

export type HeroVariant = "scale" | "need" | "transform" | "accelerate";
export type CTAVariant = "blueprint" | "assessment" | "readiness" | "audit";

export const heroVariants = {
  scale: {
    headline: {
      line1: "Scale Your Portfolio",
      line2: "with AI"
    },
    subheadline: "Transform deal sourcing, due diligence, and portfolio operations. Deploy AI agents across your entire portfolio to drive operational improvements. See measurable results within 90 days."
  },
  need: {
    headline: {
      line1: "Your Portfolio Companies Need AI.",
      line2: "We Make It Happen."
    },
    subheadline: "From deal sourcing to portfolio optimization. Get enterprise AI capabilities without the overhead. Start seeing returns within the first quarter."
  },
  transform: {
    headline: {
      line1: "Transform Your Portfolio",
      line2: "Into an AI Powerhouse"
    },
    subheadline: "While your competitors use AI to find deals faster, accelerate due diligence, and optimize operations. Don't get left behind."
  },
  accelerate: {
    headline: {
      line1: "Accelerate Portfolio Growth",
      line2: "with Enterprise AI"
    },
    subheadline: "Deploy proven AI solutions across your entire portfolio. From deal sourcing to exit planning. Implementation in weeks, results in months."
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
    headline: "PE Firms Using AI Identify More Investment Opportunities",
    description: "Leading firms are automating deal sourcing, due diligence, and portfolio reporting to gain competitive advantages.",
    cta: "Get your custom Portfolio AI Blueprint in 24 hours. Free consultation, no obligations."
  },
  leftBehind: {
    headline: "Don't Get Left Behind",
    description: "While competitors use AI to accelerate deal analysis, are you still doing it the old way?",
    cta: "Start with a free assessment. Understand your opportunities in 24 hours."
  },
  competitive: {
    headline: "Your Competitors Are Already Using AI",
    description: "Leading PE firms leverage AI to accelerate diligence and expand deal flow significantly.",
    cta: "Level the playing field. Free assessment, results in 24 hours."
  },
  roi: {
    headline: "Proven ROI from AI Implementation",
    description: "Based on our case studies with Vista Equity Partners and KKR, portfolio companies see meaningful operational improvements.",
    cta: "Calculate your potential impact. Free assessment, no obligations."
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