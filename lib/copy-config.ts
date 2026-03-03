/**
 * Centralized copy configuration for all marketing and UI text
 * This allows for easy updates without modifying view components
 */

export const COPY = {
  // Hero Section
  hero: {
    badge: "AI Agents Running in Production Today",
    headline: {
      line1: "AI agents that run",
      line2: "your operations 24/7"
    },
    subheadline: "We deploy AI agent systems that handle quoting, invoicing, follow-ups, reporting, and data entry — so your team focuses on what actually matters.",
    cta: {
      primary: "Book a Strategy Call",
      secondary: "See How It Works"
    }
  },

  // Operating Partner Hero (Enterprise Option)
  operatingPartner: {
    badge: "Enterprise AI Option",
    headline: {
      line1: "AI Operating Partner",
      line2: "for Portfolio-Scale Execution"
    },
    subheadline: {
      main: "For firms that need portfolio-level AI implementation and governance with measurable operational outcomes.",
      secondary: "Built on the same sprint-based delivery model used for mid-market operators."
    },
    cta: {
      primary: "Book Operating Partner Call",
      secondary: "View Service Details"
    },
    trustIndicators: [
      { icon: "Clock", text: "2-4 week sprints" },
      { icon: "Shield", text: "Practical governance" },
      { icon: "CheckCircle", text: "Measurable outcomes" },
      { icon: "Building2", text: "Portfolio-ready" }
    ]
  },

  // Footer
  footer: {
    cta: "Book a Strategy Call",
    newsletter: {
      title: "AI Insights Newsletter",
      description: "Get case studies, AI implementation guides, and industry insights delivered to your inbox.",
      placeholder: "your@company.com"
    },
    copyright: {
      tagline: "Built in the USA. AI agents for businesses that do real work."
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
    trustedBy: "Deployed in production across multiple industries",
    successRate: "Production-ready in weeks",
    timeToValue: "Average 21 days to first value",
    roiMultiple: "Real ROI, measured and verified"
  },

  // Value propositions
  valueProps: {
    speed: {
      title: "Ship in Weeks, Not Quarters",
      description: "Go from idea to production in 2-4 weeks with sprint-based delivery"
    },
    control: {
      title: "You Own Everything",
      description: "Full source code, documentation, and knowledge transfer. No vendor lock-in."
    },
    empowerment: {
      title: "Empower Your People",
      description: "AI handles the repetitive so your team can do their best work. Augment, don't replace."
    },
    leverage: {
      title: "Unlimited AI Workforce",
      description: "AI agents that work 24/7 on your processes, your data, your tools. Scale without scaling headcount."
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