# Sprinter Website Design Audit

Branch: `feature/sprinter-strategic-positioning-main`
Date: 2026-02-27

## Critical Issues

### 1. Homepage — Massive Empty Space
The homepage hero section works, but below it there's a huge dark void before the footer. No sections for social proof, services overview, case study highlights, or CTAs. The page looks broken/incomplete.

### 2. Services Page — Same Problem
Hero + 4 small service cards at the top, then a giant empty dark area before footer. No detail sections, no testimonials, no process explanation.

### 3. Approach Page — Barely Any Content
Three small cards at the top, then empty. This should be a rich page explaining methodology.

### 4. Contact Page — Light Theme Mismatch
The contact page renders with a WHITE/light background and dark text, while every other page is DARK theme (navy/dark blue bg, light text). This is a jarring inconsistency. The footer on contact is also light-themed.

### 5. Inconsistent Card Styles
- Case Studies page uses detailed cards with tags, metrics, and descriptions (good)
- Services page uses tiny minimal cards (bad - undersells)
- About page values section uses icon cards (different style again)
- No consistent card component across pages

### 6. Inconsistent Section Spacing
- AI Sprint page has good section rhythm with varied backgrounds (gradient sections)
- Other pages have no section variation — just flat dark background throughout
- No alternating section treatments to break up content

### 7. Footer Inconsistency
- Contact page: light footer with different layout
- All other pages: dark footer
- Footer link categories vary between pages

### 8. Typography Hierarchy Not Applied Consistently
- AI Sprint: clear H1 → H2 → body hierarchy with good spacing
- Homepage: H1 exists but nothing below it
- Services: H1 → immediate card grid, no supporting copy

### 9. CTA Inconsistency
- Homepage: gradient orange/red button + outline button
- AI Sprint: gradient blue button + outline button
- Contact: purple/blue send button
- Different button styles across pages with no system

### 10. Navigation
- Nav items work but "Sign In" and "Start" buttons in top-right have inconsistent styling across pages

## What Works Well
- AI Sprint page is the strongest — good content density, clear sections, testimonials, FAQ, strong CTA rhythm
- Case Studies page has good content and layout
- About page is decent (founder note, values, impact stats)
- Dark theme overall is on-brand and professional
- Gradient accents (orange → blue) are distinctive

## Design System Requirements for Fix

### Consistent Color Tokens
- Primary background: dark navy (--background dark mode)
- Section alternates: slightly lighter navy / subtle gradient bands
- Accent: brand gradient (orange → blue for CTAs)
- Text: white/light gray hierarchy

### Component Standardization
- **SectionWrapper**: consistent padding, max-width, optional gradient background
- **Card**: one base card with variants (feature, case-study, testimonial, pricing)
- **Button**: primary (gradient), secondary (outline), ghost — used consistently
- **SectionHeading**: badge/pill + H2 + subtitle pattern (used on AI Sprint, should be everywhere)

### Content Gaps to Fill
- Homepage: needs services overview, case study highlights, testimonials, process section, final CTA
- Services: needs expanded descriptions, use cases, comparison
- Approach: needs full methodology breakdown, timeline, deliverables
- Contact page: MUST use dark theme to match rest of site

### Priority Fix Order
1. Fix Contact page theme (dark mode)
2. Establish shared section/card/button components
3. Fill Homepage content sections
4. Fill Services page
5. Fill Approach page
6. Ensure consistent footer across all pages
