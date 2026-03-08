# Sprinter Website Launch Audit — 2026-03-08

**Goal**: Get sprinter-website live at sprinterconsulting.com / sprinter.ai with a compelling offer funnel that reflects Tyler's vision: AI audit → OpenClaw agent deployment → ongoing management. Professional design. No AI slop.

---

## Tyler's Vision (from Discord)

> AI audit/analysis to identify opportunities → service to setup & manage OpenClaw agent to start knocking out the backlog of opportunities. Similar to what we're doing for OCI. The automated zero-human companies are proof of what AI's doing for us, and additional revenue streams, AND marketing for our services because people who see these and want something similar will by default want us to do it since they've already seen what's possible.

---

## P0 — CRITICAL: Must Fix Before Traffic

### 1. DUAL NAVIGATION SYSTEM (Architecture)
**Problem**: `layout.tsx` → `SiteChrome` wraps ALL pages with `EnhancedNavigation` (shadcn mega menu with light-themed dropdowns) + `Footer` (layout version with newsletter). The homepage's `components/sprinter-ai/Header.tsx` and `Footer.tsx` are **not being rendered** — they're orphaned components. The active nav has mega menus, "Sign In" button, and light-themed dropdown panels that clash with the dark spr-theme.

**Fix**: Replace `SiteChrome` to use the `sprinter-ai/Header.tsx` and `sprinter-ai/Footer.tsx` across the whole site. These are clean, on-brand, and match the spr-theme. Remove or archive `EnhancedNavigation`, the layout `Footer`, and `navigation-auth.tsx`.

**Files**: `components/layout/site-chrome.tsx`, `components/layout/enhanced-navigation.tsx`, `components/layout/footer.tsx`, `components/sprinter-ai/Header.tsx`, `components/sprinter-ai/Footer.tsx`

### 2. OFFER FUNNEL MISALIGNMENT (Content/Strategy)
**Problem**: Current offers are Sprint ($2,500) → Fractional ($5-8K/mo) → Custom (project). Tyler wants: **Free AI Audit/Assessment** (lead magnet) → **Deploy & manage AI agents** (core service) → **Ongoing optimization** (retention). Similar to the OCI engagement. No mention of OpenClaw anywhere.

**Fix**: 
- Restructure the offer ladder: **Free AI Assessment** (or very low cost — lead gen tool that identifies opportunities) → **Agent Deployment** (setup + management, monthly retainer) → **Scale** (expand across operations)
- Update `ServicesOverview.tsx`, `HowItWorks.tsx`, `ProcessSection.tsx` to reflect this funnel
- Add a dedicated assessment/audit landing page as the primary entry point
- Reference OpenClaw by name as the platform powering the agents
- Add "Proof" section: automated companies Tyler has built as demonstrations

### 3. PAGE BLOAT — 40+ DEAD PAGES (Architecture)
**Problem**: The site has ~40+ pages for deprecated PE/enterprise positioning: `ai-due-diligence-consulting`, `family-office`, `governance`, `portfolio-diligence`, `strategic-buyer-diligence`, `pe-services`, `ai-operating-partner-retainer`, `ai-advisor-retainer`, `ai-partnership`, `ai-scoping-workshop`, `accelerate`, `partnership`, `operating-partner`, `fractional-caio`, `education`, `products`, `downloads`, `solutions`, `insights`, `opportunity-atlas`, `dashboard`, etc.

**Fix**: 
- Delete or `noindex` all PE/enterprise/dead pages
- Keep ONLY: `/` (home), `/ai-sprint` or `/assessment` (entry offer), `/services`, `/contact`, `/about`, `/case-studies`, `/blog`, `/labs`, `/privacy`, `/terms`
- Update `lib/constants.ts` NAVIGATION to only link to kept pages
- Update `lib/navigation-config.ts` to remove dead references
- Set up redirects in `next.config.ts` for any pages with external links

### 4. NAV ITEMS UPDATE (Content)
**Problem**: Current nav links to `/#problem`, `/#solution`, `/#how-it-works`, `/#results`, `/#industries`, `/fractional-ai-cofounder`, `/sprint`, `/edge`. These scroll anchors make it feel like a one-page template. The `/sprint` and `/edge` pages overlap with `/ai-sprint` and `/fractional-ai-cofounder`.

**Fix**: Simplify nav to: **Services** (dropdown: AI Assessment, Agent Deployment, Custom Build) | **Case Studies** | **About** | **Blog** | **[CTA: Book a Call]**

**Files**: `components/sprinter-ai/Header.tsx`, `lib/constants.ts`

### 5. COMPETING CTAs (CRO)
**Problem**: Every page has two CTAs fighting each other: "Start a Conversation" (→ /contact) and "Book a Strategy Call" (→ cal.com). The final CTA section has BOTH side by side. This creates decision paralysis.

**Fix**: ONE primary CTA everywhere: **"Book a Free Strategy Call"** (→ cal.com with intake form or → /contact with embedded scheduling). Secondary CTA on appropriate pages only: "See How It Works" or "View Case Studies".

**Files**: `components/sprinter-ai/Hero.tsx`, `components/sprinter-ai/FinalCTA.tsx`, all offer pages

---

## P1 — HIGH: Fix Before Launch

### 6. ANONYMOUS / FABRICATED-LOOKING TESTIMONIALS (Trust)
**Problem**: Testimonials use generic titles: "Operations Director, Cabinet Manufacturer" / "Chief Nursing Officer, Regional Health System" / "VP Operations, Non-QM Lending Firm". These read as fabricated even if they're real. No names, no photos, no company names.

**Fix**: Either use real names with permission, or reformat as outcome statements without quotation marks (present as results, not testimonials). Remove the quotation-mark format entirely if attribution can't be specific.

**Files**: `components/sprinter-ai/Testimonials.tsx`, `components/sprinter-ai/CaseStudyHighlights.tsx`

### 7. FOUNDER SECTION — NO PHOTO (Trust)
**Problem**: The founder section has a decorative SVG background with "Tyler Dreher - Founder" text overlay. No actual photo. This kills credibility for a consulting business.

**Fix**: Add a real, professional photo of Tyler. If one doesn't exist, use a clean headshot placeholder or remove the image container entirely and use a text-only layout.

**Files**: `components/sprinter-ai/Founder.tsx`, `public/images/`

### 8. TEXT-ONLY LOGO BAR (Trust)
**Problem**: "Trusted by" section is just text names: "Cab-O-Matic / ADG", "MortgageQ", "Oak Chips Inc", "RPM Healthcare". No actual logos. Looks like it was thrown together.

**Fix**: Get actual client logos (even simple text-based ones created from brand fonts), or remove this section and fold the social proof into the case studies section.

**Files**: `components/sprinter-ai/TrustedBy.tsx`, `public/images/`

### 9. OVERBLOWN CLAIMS (Copy)
**Problem**: Several copy elements read as unsubstantiated hype:
- "We deploy an unlimited AI workforce" 
- "$200K+ Value Guarantee — or it's free" (no terms, no specifics)
- "Only 5 Spots Available This Month" (classic scarcity manipulation)
- "AI agents that run your operations 24/7" (technically agents don't run 24/7 without monitoring)

**Fix**: Tone down to confident but honest:
- "We deploy AI agents that handle your operational workload"
- Make the guarantee specific with clear terms, or remove it
- Remove fake scarcity
- "AI agents that handle your repetitive operations"

**Files**: `components/sprinter-ai/Hero.tsx`, `components/sprinter-ai/Solution.tsx`, `app/ai-sprint/page.tsx`, `components/sprinter-ai/ProcessSection.tsx`

### 10. SPRINT TIMELINE INCONSISTENCY (Copy)  
**Problem**: The AI Sprint page shows "Day 1, Day 3, Day 5" timeline but the hero says "48 hours" and the homepage says "48 hours". Five days ≠ 48 hours.

**Fix**: Pick one. If it's actually a 48-hour intensive, make the timeline reflect that. If it's a 5-day engagement, don't claim "48 hours".

**Files**: `app/ai-sprint/page.tsx`

### 11. PRICING CONSTANTS CLEANUP (Architecture)
**Problem**: `lib/constants.ts` PRICING object still contains PE-era pricing: Fractional CAIO at $35-60K/month, AI Advisor Retainer at $8-15K/month, Assessment at $10K, Workshop at $1,500, Wedge Sprint at $20K. None of this matches the actual offer.

**Fix**: Update PRICING to reflect actual current offers: AI Assessment (free or $2,500), Agent Deployment (monthly retainer), Custom Build (project-based).

**Files**: `lib/constants.ts`

---

## P2 — IMPORTANT: Fix Before Scaling Traffic

### 12. ADD PROOF SECTION — AUTOMATED COMPANIES (Trust/Marketing)
**Problem**: Tyler's automated zero-human companies are a massive differentiator. They don't appear on the site at all. These are living proof that the same technology works.

**Fix**: Add a "Built With Our Technology" or "Running on OpenClaw" section to the homepage showcasing the automated ventures. Link to them. This is the ultimate proof point.

**Files**: New component, homepage `page.tsx`

### 13. OPENCLAW MENTION (Positioning)
**Problem**: OpenClaw is the platform powering everything, but it's never mentioned. Tyler explicitly wants this in the funnel.

**Fix**: Reference OpenClaw in the HowItWorks section and on the services page. Position it as the platform that powers the agent deployment: "Powered by OpenClaw — our AI operations platform."

**Files**: `components/sprinter-ai/HowItWorks.tsx`, services pages

### 14. LEAD CAPTURE FOR NON-READY VISITORS (CRO)
**Problem**: The only conversion path is "book a call." Visitors who aren't ready to talk have no way to engage. No email capture, no free assessment tool, no downloadable resource.

**Fix**: Add a free AI assessment tool or at minimum an email capture with a lead magnet (e.g., "Free AI Readiness Checklist" or "See What AI Can Automate in Your Business").

**Files**: New component/page

### 15. CASE STUDY PAGES — VERIFY THEY EXIST AND ARE GOOD
**Problem**: Homepage links to `/case-studies/ai-cabinet-automation`, `/case-studies/ai-mortgage-assistant`, `/case-studies/ai-patient-coach`. Need to verify these pages exist and have substantive content.

**Fix**: Audit each case study page for completeness and quality.

### 16. CONTACT FORM EMAIL DISCREPANCY
**Problem**: Footer uses `tyler@sprinterconsulting.com`, contact page sidebar uses `hello@sprinter.ai`, constants use `hello@sprinter.ai`. Pick one.

**Fix**: Standardize to `hello@sprinter.ai` everywhere.

**Files**: `components/sprinter-ai/Footer.tsx`, `app/contact/page.tsx`, `lib/constants.ts`

### 17. MOBILE CTA BAR
**Problem**: `StickyCTA.tsx` exists but only renders on specific pages. Should be on all pages with primary CTA.

### 18. DEPLOY CONFIGURATION
**Problem**: `vercel.json` exists but need to verify domain setup for both `sprinterconsulting.com` and `sprinter.ai`.

---

## Implementation Batches

### Batch 1: Architecture Cleanup (blocks everything else)
- [ ] Replace SiteChrome to use sprinter-ai Header/Footer
- [ ] Delete or noindex all dead pages (PE, enterprise, etc.)
- [ ] Clean up navigation config and constants
- [ ] Commit uncommitted changes
- [ ] Verify build still passes

### Batch 2: Offer Funnel Alignment
- [ ] Rewrite ServicesOverview for new funnel (Assessment → Deploy → Scale)
- [ ] Update HowItWorks for new process
- [ ] Rewrite Hero copy for the assessment entry point
- [ ] Update ProcessSection/Guarantee for new offer
- [ ] Create or update AI Assessment page as primary entry

### Batch 3: Trust & Polish
- [ ] Fix testimonials (real attribution or reformat)
- [ ] Add founder photo or clean text-only layout
- [ ] Fix logo bar or remove
- [ ] Tone down overblown claims
- [ ] Add automated companies proof section
- [ ] Fix email consistency
- [ ] Fix Sprint timeline inconsistency

### Batch 4: CRO & Conversion
- [ ] Unify CTAs across all pages
- [ ] Add lead capture mechanism
- [ ] OpenClaw mention in appropriate places
- [ ] Mobile CTA bar everywhere
- [ ] Verify case study pages

### Batch 5: Deploy
- [ ] Final build verification
- [ ] Domain configuration
- [ ] Push to production
