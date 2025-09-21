/**
 * Centralized copy configuration for all marketing and UI text
 * This allows for easy updates without modifying view components
 */

export const COPY = {
  // Hero Section
  hero: {
    badge: "Real AI in Production • Not Just Another Deck",
    headline: {
      line1: "Build at the",
      line2: "pace of AI"
    },
    subheadline: "Ship a working prototype in 10 days. Go live in 4 weeks. Your team stays in control while AI handles the repetitive.",
    cta: {
      primary: "Get an AI Opportunity Audit",
      secondary: "Start a 10-Day Sprint"
    }
  },

  // Operating Partner Hero
  operatingPartner: {
    badge: "Fund-Level AI Orchestration",
    headline: {
      line1: "Your AI Operating Partner",
      line2: "for Private Equity"
    },
    subheadline: {
      main: "Fund-level orchestration and boringly reliable 30-45 day wins—starting with AP & expense automation, Quote Intelligence, and 3PL Ops.",
      secondary: "No API? No problem. We build the safe middle layer for QBO/Sage/desktop."
    },
    cta: {
      primary: "Book 90-Minute OP Workshop",
      secondary: "Download AP Accelerator Brief"
    },
    trustIndicators: [
      { icon: "Clock", text: "30-45 day wins" },
      { icon: "Shield", text: "Vendor neutral" },
      { icon: "CheckCircle", text: "Acceptance criteria" },
      { icon: "Building2", text: "Portfolio-wide" }
    ]
  },

  // Footer
  footer: {
    cta: "Run the 10-Day Portfolio Sprint",
    newsletter: {
      title: "AI Insights Newsletter",
      description: "Get weekly case studies, AI implementation guides, and industry insights delivered to your inbox.",
      placeholder: "your@company.com"
    },
    copyright: {
      tagline: "Built in the USA. Designed for operating partners and PE-backed teams."
    }
  },

  // Common CTAs
  cta: {
    learnMore: "Learn More",
    getStarted: "Get Started",
    bookDemo: "Book a Demo",
    downloadBrief: "Download Brief",
    contactSales: "Contact Sales",
    viewCaseStudy: "View Case Study",
    exploreUseCases: "Explore Use Cases"
  },

  // Trust badges and social proof
  socialProof: {
    trustedBy: "Trusted by 50+ PE-backed companies",
    successRate: "94% project success rate",
    timeToValue: "Average 21 days to first value",
    roiMultiple: "3-5x ROI in 90 days"
  },

  // Value propositions
  valueProps: {
    speed: {
      title: "Ship in Weeks, Not Quarters",
      description: "Go from idea to production in 4 weeks with our proven sprint methodology"
    },
    control: {
      title: "You Own Everything",
      description: "Full source code, documentation, and knowledge transfer. No vendor lock-in."
    },
    reliability: {
      title: "Boringly Reliable",
      description: "Production-ready solutions with 99.9% uptime and enterprise-grade security"
    },
    expertise: {
      title: "PE-Native Team",
      description: "We speak your language and understand portfolio company dynamics"
    }
  },

  // Error messages
  errors: {
    form: {
      required: "This field is required",
      email: "Please enter a valid email address",
      phone: "Please enter a valid phone number"
    },
    api: {
      generic: "Something went wrong. Please try again.",
      network: "Network error. Please check your connection."
    }
  },

  // Success messages
  success: {
    form: {
      contact: "Thank you! We'll be in touch within 24 hours.",
      newsletter: "You're subscribed! Check your email for confirmation.",
      download: "Your download will begin shortly."
    }
  }
};

// Helper function to get nested copy values
export function getCopy(path: string): string {
  const keys = path.split('.');
  let value: any = COPY;

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      console.warn(`Copy not found for path: ${path}`);
      return path;
    }
  }

  return String(value);
}