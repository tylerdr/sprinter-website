# QA Audit & Fix Task

## Context
The Sprinter Consulting website on branch `feature/sprinter-strategic-positioning-main` "still doesn't look good" per the client. A design audit has been completed (see DESIGN-AUDIT.md) identifying 10 critical issues.

## Your Mission
Fix ALL issues in DESIGN-AUDIT.md. The AI Sprint page (`/ai-sprint`) is the gold standard — every other page should match its quality, content density, and visual polish.

## Priority Fixes (in order)

### 1. Contact Page — MUST use dark theme
The contact page has a white/light background while every other page is dark. Fix it to match the dark theme.

### 2. Homepage Content Density
The homepage has Hero + sections that exist but feel sparse. Compare each section against the AI Sprint page's density. Each section needs:
- Proper headings with kicker/badge text above
- Substantive body copy (not just card titles)
- Visual variety: alternating section backgrounds (subtle gradient bands, dividers)
- Good content rhythm

### 3. Services Page — Expand
Currently tiny cards then empty space. Needs expanded descriptions, process explanation, comparison elements.

### 4. Approach Page — Fill Out
Barely any content. Needs methodology breakdown, timeline, deliverables.

### 5. Design Consistency
- Consistent card component styles across all pages
- Consistent button styles (primary gradient, secondary outline)
- Consistent footer across ALL pages (dark theme)
- Consistent typography hierarchy
- Consistent section spacing with alternating treatments

### 6. CTA Consistency
Pick ONE button style system and apply everywhere:
- Primary: gradient (use the brand gradient)
- Secondary: outline
- No more random purple/blue buttons

## Rules
- Keep the existing spr-* design system CSS classes
- Use AnimatedSection wrapper for all new sections
- Run `npm run build` after ALL changes to verify no errors
- Do NOT change the AI Sprint page (it's the reference)
- Commit your changes with descriptive messages
- Push to the branch when done

## Reference
- AI Sprint page: `app/ai-sprint/page.tsx` (gold standard)
- Design system CSS: `app/globals.css` (search for `.spr-`)
- Component library: `components/sprinter-ai/`
