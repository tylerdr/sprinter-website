# Sprinter Website — Consolidated Audit & Fix Plan
**Date:** 2026-02-27 | **Audited by:** Codex, Claude, Gemini (multi-model consensus)

---

## Critical Finding: Identity Crisis (All 3 auditors flagged)

The site runs **two different design systems, two brand identities, and three buyer personas** simultaneously:
- Homepage: dark theme, "Sprinter Consulting," SMB operator targeting $2,500 Sprint
- Fractional/Accelerate pages: shadcn/ui light theme, "Sprinter AI," PE/enterprise nav, $35-60K positioning  
- No clear routing between the two audiences

**Decision required from Tyler:** Who is the primary paid-traffic buyer? For now, we unify everything under one design system.

---

## Top 20 Issues (Consensus-Ranked)

### P0 — Must Fix Before Paid Traffic

| # | Issue | Fix |
|---|-------|-----|
| 1 | Two design systems (dark spr-theme vs light shadcn) | Unify under dark spr-theme |
| 2 | No social proof on offer pages (data exists unused) | Pull testimonials + logos onto every page |
| 3 | Generic hero ("Your team, amplified") | Outcome-led: "AI agents that run your operations 24/7" |
| 4 | Fractional page has no pricing | Add range |
| 5 | CTA → bare Cal.com (no context/intake) | Add qualification step |
| 6 | Fractional page missing from nav | Add to navigation |
| 7 | Client logos in code but never rendered | Import trusted-by component |
| 8 | Chat widget competes with CTA | Suppress on campaign pages |
| 9 | Guarantee vague ("$200K+ or free") | Standalone block with terms |
| 10 | Too many exits on offer pages | One primary CTA per page |

### P1 — Week 2-3

| # | Fix |
|---|-----|
| 11 | Sticky mobile CTA |
| 12 | Expand Sprint page (120 words → full sales page) |
| 13 | Real founder photo (currently placeholder SVG) |
| 14 | Standardize naming to "AI Readiness Sprint" |
| 15 | Consolidate to sprinter.ai branding |
| 16 | Video on high-ticket pages |
| 17 | Add context to metrics |

### P2 — Week 4+
| # | Fix |
|---|-----|
| 18 | Retargeting pixels |
| 19 | Structured data |
| 20 | A/B testing infra |

---

## Copy Rewrites

### Homepage Hero
**New:** "AI agents that run your operations 24/7."
**Sub:** "Custom AI for mid-market operators — quoting, prospecting, scheduling, reporting — deployed in weeks. Built by engineers who've shipped in your industry."

### Homepage CTA
**New:** "See What AI Can Do for Your Business — Free 30-min Call"

### Sprint Hero
**New:** "The AI Readiness Sprint: Your Full Operations Map in 48 Hours for $2,500"
**Sub:** "We find $200K+ in automation value — or it's free."

### Fractional Subhead
**New:** "Stop hiring AI consultants who leave you with slide decks. Get an embedded operator who ships working systems — your tools, your team, your timeline."

---

## Agent Implementation Batches

### Batch 1: Design System Unification + Navigation
- Migrate fractional/accelerate to spr-theme dark
- Unify header/footer
- Add offers to nav
- Remove competing CTAs
- Sticky mobile CTA bar

### Batch 2: Content & Social Proof
- Hero rewrites (home, sprint, fractional)
- Expand Sprint page
- Add pricing to fractional
- Render logo bar + testimonials
- Guarantee block
- Standardize naming + footer branding

### Batch 3: Conversion Infra
- Suppress chat on campaign routes
- Structured data
- Pixel placeholders
- Mobile QA
- Production build verify
