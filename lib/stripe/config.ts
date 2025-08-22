import Stripe from 'stripe';

// Initialize Stripe with proper configuration
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-07-30.basil",
      typescript: true,
    })
  : null;

// Product configuration aligned with Assess → Sprint → Scale → Partner funnel
export const STRIPE_PRODUCTS = {
  // Sprint products (per week pricing)
  SPRINT_1_WEEK: {
    name: "AI Discovery Sprint",
    description: "1-week AI sprint to validate your highest-impact use case. Includes working prototype and implementation roadmap.",
    price: 1000000, // $10,000 in cents
    currency: "usd",
    duration: "1 week",
    image: "https://sprinter.ai/images/ai-sprint.png",
  },
  SPRINT_2_WEEK: {
    name: "AI Prototype Sprint",
    description: "2-week AI sprint to build and test a production-ready prototype. Includes source code and team training.",
    price: 2000000, // $20,000 in cents
    currency: "usd",
    duration: "2 weeks",
    image: "https://sprinter.ai/images/ai-sprint.png",
  },
  SPRINT_3_WEEK: {
    name: "AI Implementation Sprint",
    description: "3-week AI sprint to deploy a complete solution. Includes integration, testing, and handoff.",
    price: 3000000, // $30,000 in cents
    currency: "usd",
    duration: "3 weeks",
    image: "https://sprinter.ai/images/ai-sprint.png",
  },
  SPRINT_4_WEEK: {
    name: "AI Transformation Sprint",
    description: "4-week comprehensive AI sprint. Full implementation with change management and team enablement.",
    price: 4000000, // $40,000 in cents
    currency: "usd",
    duration: "4 weeks",
    image: "https://sprinter.ai/images/ai-sprint.png",
  },
  
  // Scale product (quarterly)
  SCALE_QUARTERLY: {
    name: "AI Scaling Program",
    description: "3-month systematic AI deployment across multiple portfolio companies. Includes 3 implementations and dedicated success manager.",
    price: 5000000, // $50,000 in cents
    currency: "usd",
    duration: "3 months",
    image: "https://sprinter.ai/images/ai-scale.png",
  },
  
  // Partnership products (monthly subscriptions)
  PARTNER_ADVISORY: {
    name: "AI Advisory Partnership",
    description: "Strategic AI advisory with quarterly implementations and board-level guidance.",
    price: 10000000, // $100,000 in cents
    currency: "usd",
    interval: "month" as const,
    image: "https://sprinter.ai/images/ai-partner.png",
  },
  PARTNER_OPERATING: {
    name: "AI Operating Partnership",
    description: "Full AI operating support with dedicated 5-person team and unlimited implementations.",
    price: 20000000, // $200,000 in cents
    currency: "usd",
    interval: "month" as const,
    image: "https://sprinter.ai/images/ai-partner.png",
  },
  PARTNER_VENTURE: {
    name: "AI Venture Partnership",
    description: "Co-investment model with 8-person team, venture studio, and revenue share on exits.",
    price: 30000000, // $300,000 in cents
    currency: "usd",
    interval: "month" as const,
    image: "https://sprinter.ai/images/ai-partner.png",
  }
} as const;

// Custom fields for PE firms
export const PE_CUSTOM_FIELDS: Stripe.Checkout.SessionCreateParams.CustomField[] = [
  {
    key: "firm_name",
    label: {
      type: "custom",
      custom: "Private Equity Firm",
    },
    type: "text",
  },
  {
    key: "aum_range",
    label: {
      type: "custom",
      custom: "Assets Under Management",
    },
    type: "dropdown",
    dropdown: {
      options: [
        { label: "Under $500M", value: "under_500m" },
        { label: "$500M - $1B", value: "500m_1b" },
        { label: "$1B - $5B", value: "1b_5b" },
        { label: "$5B - $10B", value: "5b_10b" },
        { label: "$10B+", value: "over_10b" },
      ],
    },
  },
  {
    key: "portfolio_companies",
    label: {
      type: "custom",
      custom: "Portfolio Companies",
    },
    type: "dropdown",
    dropdown: {
      options: [
        { label: "1-5", value: "1_5" },
        { label: "6-10", value: "6_10" },
        { label: "11-25", value: "11_25" },
        { label: "26-50", value: "26_50" },
        { label: "50+", value: "50_plus" },
      ],
    },
  },
];

// Sprint-specific custom fields
export const SPRINT_CUSTOM_FIELDS: Stripe.Checkout.SessionCreateParams.CustomField[] = [
  {
    key: "use_case_focus",
    label: {
      type: "custom",
      custom: "Primary Use Case",
    },
    type: "dropdown",
    dropdown: {
      options: [
        { label: "Deal Sourcing & Origination", value: "deal_sourcing" },
        { label: "Due Diligence Automation", value: "due_diligence" },
        { label: "Portfolio Operations", value: "portfolio_ops" },
        { label: "Financial Analysis & Modeling", value: "financial_analysis" },
        { label: "Market Research & Intelligence", value: "market_research" },
        { label: "Other (we'll discuss)", value: "other" },
      ],
    },
  },
  {
    key: "urgency",
    label: {
      type: "custom",
      custom: "Timeline",
    },
    type: "dropdown",
    dropdown: {
      options: [
        { label: "Start immediately", value: "immediate" },
        { label: "Within 2 weeks", value: "2_weeks" },
        { label: "Within 1 month", value: "1_month" },
        { label: "Planning for Q1 2025", value: "q1_2025" },
        { label: "Flexible", value: "flexible" },
      ],
    },
  },
];

// Helper to create checkout session
export async function createCheckoutSession(
  product: keyof typeof STRIPE_PRODUCTS,
  metadata?: Record<string, string>,
  customerEmail?: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const productConfig = STRIPE_PRODUCTS[product];
  const isSubscription = 'interval' in productConfig;
  const isSprint = product.startsWith('SPRINT_');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'ach_debit', 'us_bank_account'],
    line_items: [
      {
        price_data: {
          currency: productConfig.currency,
          product_data: {
            name: productConfig.name,
            description: productConfig.description,
            images: [productConfig.image],
          },
          unit_amount: productConfig.price,
          ...(isSubscription && {
            recurring: {
              interval: productConfig.interval,
              interval_count: 1,
            },
          }),
        },
        quantity: 1,
      },
    ],
    mode: isSubscription ? 'subscription' : 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sprinter.ai'}/success?session_id={CHECKOUT_SESSION_ID}&product=${product}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sprinter.ai'}/${
      isSprint ? 'ai-sprint' : product.includes('SCALE') ? 'ai-scale' : 'ai-partnership'
    }`,
    customer_email: customerEmail,
    billing_address_collection: 'required',
    tax_id_collection: {
      enabled: true,
    },
    custom_fields: [...PE_CUSTOM_FIELDS, ...(isSprint ? SPRINT_CUSTOM_FIELDS : [])],
    metadata: {
      product,
      source: 'website',
      ...metadata,
    },
    allow_promotion_codes: true,
    payment_intent_data: !isSubscription ? {
      metadata: {
        product,
        ...metadata,
      },
    } : undefined,
    subscription_data: isSubscription ? {
      metadata: {
        product,
        ...metadata,
      },
      trial_period_days: product === 'PARTNER_ADVISORY' ? 7 : undefined, // 7-day trial for partnerships
    } : undefined,
  });

  return session;
}

// Helper to retrieve session
export async function retrieveSession(sessionId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }
  
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'payment_intent', 'subscription', 'line_items'],
  });
}

// Helper to create portal session for subscription management
export async function createPortalSession(customerId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }
  
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sprinter.ai'}/partnership/manage`,
  });
}

// Helper to handle webhook events
export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment/subscription
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: Update lead status, send welcome email, etc.
      break;
      
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      // Handle subscription changes
      const subscription = event.data.object as Stripe.Subscription;
      // TODO: Update subscription status in database
      break;
      
    case 'customer.subscription.deleted':
      // Handle cancellation
      const cancelledSub = event.data.object as Stripe.Subscription;
      // TODO: Update status, trigger offboarding
      break;
  }
}