# Sprinter AI Growth Engine Documentation

## Overview

The Sprinter AI website has been transformed into an autonomous growth engine targeting Private Equity firms. This document outlines the complete funnel architecture, automation systems, and operational procedures.

## 🎯 Target Market

**Primary:** Private Equity firms ($500M - $5B AUM)
**Secondary:** Growth Equity, Venture Capital firms
**Decision Makers:** Managing Partners, Operating Partners, CTOs

## 📊 Full Funnel Architecture

### Top of Funnel (TOFU) - Free
**AI Readiness Assessment** (`/ai-assessment`)
- 10-minute questionnaire
- Automated PDF report generation
- 24-hour delivery via email
- Lead capture mechanism

### Middle of Funnel (MOFU) - $2,500
**AI Opportunity Sprint** (`/ai-sprint`)
- 5-day implementation sprint
- Fixed price with Stripe checkout
- 100% money-back guarantee
- Prototype or proof-of-concept delivery

### Bottom of Funnel (BOFU) - $5-10K/month
**AI Partnership Program** (`/ai-partnership`)
- Ongoing AI innovation service
- Tiered pricing (Essentials/Growth/Enterprise)
- Month-to-month commitment
- Continuous value delivery

## 🤖 Automation Systems

### 1. Growth Marketing Agent
**Location:** `/lib/agents/growth-marketing-agent.ts`
**Trigger:** Daily at 9 AM UTC via Vercel Cron

**Capabilities:**
- Analyzes daily metrics (leads, assessments, proposals)
- Plans optimal outreach actions using GPT-4
- Sends personalized emails to high-intent leads
- Manages nurture sequences
- Calculates lead scores
- Generates daily insights reports

**Configuration:**
```env
AGENT_SECRET_TOKEN=your-secret-token
OPENAI_API_KEY=your-openai-key
RESEND_API_KEY=your-resend-key
```

### 2. Lead Nurture Sequences
**Location:** `/lib/services/lead-nurture.ts`

**Sequences:**
- `ai_assessment_completed`: 3-email sequence over 14 days
- `contact_form_submitted`: 2-email sequence over 3 days
- `high_intent_chat`: Same-day follow-up

**Personalization Variables:**
- `{{firstName}}`, `{{company}}`, `{{primary_opportunity}}`
- Dynamic content based on lead data

### 3. AI-Powered Chat Assistant
**Location:** `/app/api/chat/visitor/route.ts`

**Features:**
- PE-focused responses
- Intent detection (scoring 0-1)
- Lead capture after 3 messages
- Automatic high-intent alerts

### 4. Analytics & Tracking
**Location:** `/components/analytics/google-analytics.tsx`

**Events Tracked:**
- Funnel progression (assessment → sprint → partnership)
- Form submissions
- Chat interactions
- Proposal views and signatures
- Conversion events with monetary value

**Setup:**
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📧 Email Outreach Templates

### Cold Email Campaign
**Location:** `/lib/services/email-templates.ts`

**Templates:**
1. `aiAssessment`: Initial outreach offering free assessment
2. `aiSprint`: Direct pitch for $2,500 sprint
3. `aiPartnership`: High-value partnership offer
4. `aiInsights`: Content-based nurture
5. `reEngagement`: Win-back campaign

**Personalization Engine:**
- Uses JustHireAI.com for scale
- GPT-4 for dynamic personalization
- A/B testing capabilities

## 💾 Database Schema

### Core Tables
```sql
- contact_leads: All form submissions
- ai_assessment_leads: Assessment completions
- email_campaigns: Outreach tracking
- lead_nurture_sequences: Automated follow-ups
- stripe_customers: Payment records
- stripe_subscriptions: Recurring revenue
- growth_metrics: Performance tracking
- chat_conversations: Chat history
```

### Lead Scoring Algorithm
```
Base Score = 0
+ 30 points: Completed AI assessment
+ 10 points: Each chat conversation (max 50)
+ 15 points: High-intent chat message
+ 20 points: Viewed proposal
+ 10 points: Visited sprint page
Max Score = 100
Hot Lead Threshold = 70
```

## 🚀 Deployment & Operations

### Environment Variables Required
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
RESEND_API_KEY=
CONTACT_TO_EMAIL=hello@sprinter.ai
CONTACT_FROM_EMAIL=hello@sprinter.ai

# AI
OPENAI_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Agent
AGENT_SECRET_TOKEN=
```

### Daily Operations Checklist
1. **Morning (9 AM UTC)**
   - Growth Agent runs automatically
   - Review insights report email
   - Check hot lead alerts

2. **Ongoing**
   - Monitor chat conversations
   - Respond to high-intent leads
   - Review proposal analytics

3. **Weekly**
   - Analyze funnel conversion rates
   - Adjust email templates based on performance
   - Review and optimize lead scores

### Key Metrics to Track
- **Top of Funnel**
  - Assessment completions/day
  - Email open rates (target: >25%)
  - Chat engagement rate

- **Middle of Funnel**
  - Sprint page → checkout conversion
  - Average time to purchase
  - Money-back guarantee claims

- **Bottom of Funnel**
  - Partnership inquiries
  - MRR growth
  - Customer lifetime value

## 🔧 Maintenance & Optimization

### A/B Testing Opportunities
1. Email subject lines
2. Landing page headlines
3. Pricing presentation
4. CTA button copy
5. Assessment questions

### Content Calendar
- **Weekly:** New PE case study or success story
- **Bi-weekly:** Industry insight blog post
- **Monthly:** AI trend report for PE

### Lead Source Attribution
Track UTM parameters:
- `utm_source`: email, linkedin, organic
- `utm_medium`: cold, nurture, content
- `utm_campaign`: specific campaign name

## 📈 Success Metrics

### Target KPIs (First 90 Days)
- 500+ assessment completions
- 50+ sprint purchases ($125K revenue)
- 10+ partnership subscriptions ($50K+ MRR)
- <2% refund rate
- 70+ NPS score

### Conversion Benchmarks
- Assessment → Sprint: 10%
- Sprint → Partnership: 30%
- Cold Email → Assessment: 5%
- Chat → Lead: 40%

## 🛠 Troubleshooting

### Common Issues

**Agent Not Running:**
- Check Vercel cron logs
- Verify AGENT_SECRET_TOKEN
- Check function timeout settings

**Emails Not Sending:**
- Verify RESEND_API_KEY
- Check Resend dashboard for errors
- Review email templates for issues

**Low Conversion Rates:**
- Review lead quality
- A/B test messaging
- Check page load speeds
- Analyze drop-off points

## 🔒 Security Considerations

1. **API Authentication**
   - All agent endpoints require Bearer token
   - Supabase RLS policies enforce data access
   - Stripe webhooks verify signatures

2. **Data Privacy**
   - GDPR-compliant data handling
   - Unsubscribe links in all emails
   - Secure storage of sensitive data

3. **Rate Limiting**
   - OpenAI API rate limits respected
   - Email sending throttled to avoid spam flags
   - Database queries optimized for performance

## 📚 Additional Resources

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Resend Dashboard](https://resend.com/emails)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Google Analytics](https://analytics.google.com)
- [Vercel Dashboard](https://vercel.com)

## 🎯 Next Steps for Scale

1. **Expand Target Market**
   - Add VC-specific funnel
   - Create enterprise corporate track
   - Develop SMB self-serve option

2. **Enhanced Automation**
   - Implement predictive lead scoring
   - Add multi-channel outreach (SMS, LinkedIn)
   - Build referral program automation

3. **Content Expansion**
   - Launch podcast for PE leaders
   - Create video case studies
   - Develop interactive ROI calculator

4. **Platform Integration**
   - Connect with Salesforce/HubSpot
   - Integrate with Slack for alerts
   - Add Zapier webhooks

---

*Last Updated: December 2024*
*Maintained by: Sprinter AI Engineering Team*