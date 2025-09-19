# Sprinter AI Website Launch Master Plan

## Executive Summary
This document outlines all required improvements to launch the Sprinter AI website as the premier AI Operating Partner for Lower-Mid and Mid-Market Private Equity firms. Based on competitive analysis of leading firms (Tenex, Cadre AI, IBM, Accenture) and comprehensive site audit.

## 🎯 Critical Positioning Updates

### Homepage Hero Messaging
- [ ] **PRIMARY**: Change hero to "People-First AI Operating Partner for Private Equity"
- [ ] **SUB-HEADLINE**: "Start with one document type your team will love. Expand to end-to-end automation. 30-45 day wins guaranteed."
- [ ] **CTAs**: Update to "Book 90-Minute OP Workshop" and "See Pricing"
- [ ] **PROOF BAR**: Add "≥60% touchless processing" and "Fund-level AI governance"

### Core Philosophy Page (/approach)
- [ ] Create new "Our Approach" section in navigation
- [ ] Add People → Process → Projects → Product methodology page
- [ ] Emphasize "AI done FOR people, not TO people"
- [ ] Include "Start Small. Win Early. Expand." messaging
- [ ] Add "lunch breaks are back" human impact stories

## 📦 Service Offering Restructure

### Package Updates (/pricing)
- [ ] **Rename packages** to match competitive positioning:
  - AI Operating Partner Retainer (Fund-level): $12k-25k/month
  - Transformation Partner (Outcome-based): $50k-125k/month
  - AI Sprint (Project): $20k per 2-week sprint
  - Education & Enablement: Various tiers
- [ ] Add transparent pricing for ALL packages (not just some)
- [ ] Include "90-Minute OP Workshop" at $1,500 (credited to any package)
- [ ] Add guarantees: "If sprint misses criteria, remedial sprint at our cost"

### New Services Section (/services)
- [ ] Create 10 service tiles with outcomes-first messaging:
  1. Document Intelligence & PDF Data Extraction
  2. End-to-End Process Automation
  3. Custom CoPilots (Sales, Ops, Finance)
  4. Agentic Workflow Automation
  5. Quote Intelligence & CPQ Assist
  6. 3PL Operations & Billing Accuracy
  7. RAG on Policies & Guidelines
  8. Data & Integration Layer (QBO/Sage/Desktop)
  9. Analytics & KPI Instrumentation
  10. AI Governance & Security
- [ ] Each tile needs: Outcome line, 5-bullet scope, 6-week timeline

## 🏭 Industry Page Enhancements

### Focus Industries (7 priority verticals)
- [ ] Manufacturing & Building Products - Add CPQ/Quote Intelligence focus
- [ ] Wholesale/Distribution & 3PL - Emphasize billing accuracy outcomes
- [ ] Mortgage & Lending - Highlight MortgageQ product
- [ ] Healthcare Services - Add RPM and intake automation
- [ ] B2B Field & Industrial Services - Focus on scheduling/job costing
- [ ] Consumer Multi-Unit Services - Customer support CoPilot emphasis
- [ ] Specialty Chemicals/Light Industrial - Compliance documentation

### Each Industry Page Needs:
- [ ] 3 outcome tiles with specific metrics
- [ ] 2 case study teasers
- [ ] "Start with a Wedge Sprint" CTA
- [ ] Document types specific to that industry

## 🎓 AI Education Services (New Section)

### Create /education landing page with:
- [ ] Executive AI Bootcamp: $9,500 per cohort (up to 12)
- [ ] Manager Enablement Lab: $2,500/person
- [ ] Portfolio AI Day: $15,000 (onsite, up to 3 sessions)
- [ ] AI Governance Workshop: $7,500
- [ ] People-First Change Management Training

## 📊 Case Studies Overhaul

### Required Case Studies (6 priority)
- [ ] AP Touchless to 64% in 30 Days (QBO, no API)
- [ ] Quote Intelligence: 42% Faster Quote Cycles
- [ ] 3PL Billing Accuracy: +18 pts (Sage, upload-only)
- [ ] Mortgage Underwriting CoPilot (MortgageQ)
- [ ] Healthcare Intake & RPM Coach
- [ ] Portfolio AI PMO: From chaos to 90-day wins

### Case Study Template:
- [ ] Context → Constraint → Intervention → Outcome → Time to Value → Stack → Governance
- [ ] Include real metrics and timelines
- [ ] Add client logos where permitted

## 🔧 Interactive Tools & Lead Magnets

### Per-Page Interactive Tools
- [ ] Use Cases: Wedge Spec Generator (outputs acceptance criteria)
- [ ] Pain Points: ROI Calculator (time/cost savings)
- [ ] Goals: Goal Fit Finder (suggests wedges)
- [ ] Technologies: Stack Composer (recommends tech stack)
- [ ] Industries: Pre-filled Idea Roulette
- [ ] Products: Product Fit Checker

### Gating Strategy:
- [ ] Free preview → Soft gate for PDF export
- [ ] Email capture for full results
- [ ] Integration with newsletter signup

## 📧 AI for PE Newsletter

### Implementation:
- [ ] Create newsletter signup in header/footer
- [ ] Design "AI for PE" landing page
- [ ] Lead magnet: "100-Day AI Playbook for OPs" PDF
- [ ] Weekly content calendar:
  - Week 1: 3 PE-safe wins in 30-45 days
  - Week 2: Defending AI ROI to ICs & LPs
  - Week 3: No API? Safe middle layer solutions
  - Week 4: Agentic workflows with governance

## 🏛️ Governance & Compliance

### Create /governance section with:
- [ ] Responsible AI Framework page
- [ ] Data Privacy & PII handling guidelines
- [ ] Model Registry & Versioning approach
- [ ] Audit Trail & Access Controls
- [ ] Compliance standards (GDPR, HIPAA, SOC 2)
- [ ] Download: Governance Pack PDF

## 👥 Team & About Pages

### Add Missing Pages:
- [ ] /about - Company mission and PE focus
- [ ] /team - Leadership bios and AI expertise
- [ ] /partners - Technology partnerships (OpenAI, Anthropic, etc.)
- [ ] /careers - Hiring for AI engineers and engagement managers

## 🧹 Technical Cleanup

### Remove Redundant Files:
- [ ] Delete `/app/labs/pe-tycoon/page-old.tsx`
- [ ] Clean up `/app/labs/vibe-coding/page-new.tsx`
- [ ] Consolidate navigation configs

### Complete TODOs:
- [ ] Fix 24 test suite TODO items
- [ ] Implement Gemini 2.5 Flash for image generation
- [ ] Complete PSEO generation for locations/comparisons
- [ ] Add Supabase type generation from schema

## 🚀 pSEO Entity Implementation

### Entity Types to Create:
- [ ] knowledge.use_case
- [ ] knowledge.pain_point
- [ ] knowledge.goal
- [ ] capability.technology
- [ ] market.industry
- [ ] solution.product
- [ ] content.idea
- [ ] content.composition

### Routes to Implement:
- [ ] /insights/use-cases/{slug}
- [ ] /insights/pain-points/{slug}
- [ ] /insights/technologies/{slug}
- [ ] /ideas/{technology}-in-{industry}
- [ ] /playbooks/{use-case}-for-{industry}

### Quality Gates:
- [ ] 900+ word minimum
- [ ] Unique acceptance criteria required
- [ ] KPIs table mandatory
- [ ] 5+ internal links minimum
- [ ] Governance section required

## 🎮 Idea Roulette Tool

### Implementation:
- [ ] Create interactive 3-wheel spinner UI
- [ ] Industry × Document Type × Pain Point combinations
- [ ] Generate content.idea entities on spin
- [ ] Email one-pager PDF on publish
- [ ] Track in database for content generation

## 📈 Metrics & Tracking

### Add Analytics:
- [ ] Workshop booking conversion
- [ ] Sprint purchase tracking
- [ ] Newsletter signup rates
- [ ] Tool usage per page
- [ ] Time on site by template

## 🎨 Design Updates

### Visual Enhancements:
- [ ] Add light mode option (currently dark only)
- [ ] Improve contrast for accessibility
- [ ] Add before/after comparison sliders
- [ ] Create metric dashboard components
- [ ] Design wedge finder form UI

## 🔗 Navigation Restructure

### New Navigation (6 items max):
1. Operating Partner
2. Packages & Pricing
3. Services (10 tiles)
4. Industries (7 verticals)
5. Approach (People-First)
6. Resources (Case Studies, Newsletter, Tools)

## 📝 Content Updates by Page

### Homepage
- [ ] Update hero with people-first messaging
- [ ] Add rolling metrics counter
- [ ] Include PE firm logos (with permission)
- [ ] Emphasize document intelligence over AP

### Operating Partner Page
- [ ] Detail retainer offerings
- [ ] Add governance artifacts section
- [ ] Include diligence checklist download
- [ ] Show portfolio-wide impact metrics

### Pricing Page
- [ ] Show all 4 packages with transparent pricing
- [ ] Add comparison table
- [ ] Include guarantees and SLAs
- [ ] Add FAQ section

### Solutions Pages
- [ ] Shift from AP-heavy to document intelligence
- [ ] Add acceptance criteria examples
- [ ] Include HITL governance notes
- [ ] Show confidence thresholds

## 🚦 Launch Readiness Checklist

### Pre-Launch Requirements:
- [ ] All pricing displayed transparently
- [ ] 6 case studies with real metrics published
- [ ] Newsletter signup active
- [ ] Interactive tools on 5+ pages
- [ ] Governance content complete
- [ ] Team page populated
- [ ] All test TODOs resolved
- [ ] Redundant files removed

### Launch Day:
- [ ] LinkedIn announcement post
- [ ] Newsletter blast to existing contacts
- [ ] Update all social profiles
- [ ] Activate paid search campaigns
- [ ] Monitor analytics and forms

### Post-Launch Week 1:
- [ ] A/B test homepage hero
- [ ] Monitor tool engagement
- [ ] Adjust gating based on conversion
- [ ] Publish first newsletter issue
- [ ] Schedule first workshops

## Priority Order

### Week 1 (Immediate)
1. Update homepage messaging
2. Fix pricing transparency
3. Clean up redundant files
4. Add people-first approach page

### Week 2 (Core Updates)
1. Create service tiles
2. Update industry pages
3. Add governance content
4. Implement newsletter

### Week 3 (Enhancement)
1. Add interactive tools
2. Create case studies
3. Build education services
4. Add team pages

### Week 4 (Polish & Launch)
1. Complete all testing
2. Final content review
3. SEO optimization
4. Launch preparation

---

## Success Metrics

- **Conversion Rate**: >5% visitor to workshop booking
- **Newsletter Signups**: 100+ in first month
- **Tool Engagement**: >30% of visitors use interactive tools
- **Time on Site**: >3 minutes average
- **Sprint Bookings**: 2+ in first month post-launch

---

## Notes

- Focus on document intelligence and end-to-end automation, not just AP
- Emphasize people-first change management
- Highlight "no API" solutions for desktop ERPs
- Lead with outcomes and acceptance criteria
- Make pricing completely transparent
- Position as THE AI Operating Partner for LMM/MM PE

---

*Last Updated: [Current Date]*
*Status: Ready for Implementation*