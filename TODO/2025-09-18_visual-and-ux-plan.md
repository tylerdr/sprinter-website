# 2025-09-18 Visual Design, Animations & UX Plan

## Context
Sprinter’s marketing site must feel premium, trustworthy, and dynamic, matching the caliber of top-tier AI consultancies while reflecting our people-first ethos. This plan outlines the design system updates, animation strategy, responsive behavior, and accessibility requirements to deliver a polished experience.

## Objectives
- Refresh visual identity to emphasize confidence, warmth, and technical excellence.
- Introduce purposeful motion and micro-interactions that reinforce the "Start small. Win early. Expand." narrative.
- Ensure layouts scale seamlessly across devices and remain accessible to all users.
- Showcase social proof, metrics, and interactive elements in visually compelling formats.

## Checklist
- [ ] Align on art direction (color palette adjustments, typography hierarchy, imagery style).
- [ ] Create component library updates (cards, accordions, tabs, metric counters, CTA buttons) using shadcn/ui + Tailwind tokens.
- [ ] Design motion system (durations, easing, choreography rules) for hero, navigation, section reveals, counters, and case study storytelling.
- [ ] Prototype interactive hero experience (document intelligence animation, outcome counter, CTA transitions).
- [ ] Implement "Idea Roulette" animation (wheel spin, result reveal, confetti/sparkle cues) with accessibility-safe variants.
- [ ] Add scroll-triggered reveals for approach pillars and service tiles (staggered entry with reduced-motion fallback).
- [ ] Design interactive case study timeline (before/after slider or stepper) highlighting people-first outcomes.
- [ ] Craft animated infographic for People → Process → Projects → Product sequence.
- [ ] Produce illustration/icon set for document intelligence workflows (PDF to data pipeline, HITL checkpoints).
- [ ] Ensure responsive layouts for all sections (mobile-first with tests on common viewports and tablets used by execs).
- [ ] Conduct accessibility audit (contrast, focus states, reduced motion, screen-reader labels).
- [ ] Build storybook or playground environment to validate components before integration.
- [ ] Plan video/demo asset production (90-second wedge demos, hero background loop).
- [ ] Document brand usage guidelines in `/docs/design` for future contributors.

## Detailed Plan
### 1. Art Direction & Design System
- Update color palette: maintain dark mode authority with accent colors for trust (deep blues) and energy (electric greens) while respecting contrast ratios.
- Select typography pairings (primary display, body, mono for metrics) and spacing scale aligned to tailwind config.
- Define imagery style (blend of real-world operations photography with abstract data flows).

### 2. Component Library Enhancement
- Extend shadcn/ui components with Sprinter-specific variants (metric cards, testimonial sliders, pricing tables).
- Create reusable badges for proof metrics ("≥60% touchless invoices").
- Add stateful CTA (hover, pressed, loading) and inline validation states.

### 3. Motion & Micro-Interactions
- Hero: animated overlay showing PDF snippets transforming into structured data; highlight metric counters with asynchronous increments.
- Navigation: subtle underline slide and drop shadow on scroll.
- Section reveals: use `framer-motion` or CSS animations with observers; provide reduced-motion fallback.
- Case studies: vertical timeline reveals, animated KPI deltas.
- Idea Roulette: physics-inspired spin easing, result highlight, ability to re-spin; ensure focus remains after animation.

### 4. Storytelling Modules
- People-First page: interactive before/after day-in-the-life slider.
- Approach page: animated 4P loop with tooltips; highlight human quotes.
- Governance page: animated flow diagram showing data governance, HITL, audit capture.

### 5. Responsiveness & Layout
- Optimize for large desktop (1440–1920) typical of PE teams, as well as laptop/tablet (1280, 1024) and mobile (390, 430, 768).
- Use CSS container queries for component scaling where appropriate.
- Validate nav behavior (hamburger, sticky, collapse) and ensure hero remains legible on small screens.

### 6. Accessibility & Performance
- Implement prefers-reduced-motion support.
- Guarantee 4.5:1 contrast for body text, 3:1 for large text and UI icons.
- Provide skip links, focus outlines, and ARIA labels for interactive modules.
- Optimize animations for GPU (transform/opacity) and lazy-load heavy assets.

### 7. Documentation & Handoff
- Publish updated design tokens and component specs in Figma + `/docs/design/2025-09-18-visual-guidelines.md`.
- Provide animation reference library (Lottie or MP4 loops) with instructions for dev integration.
- Record Loom walkthrough for engineering teams covering interaction expectations.

## Testing Criteria
- [ ] Figma components reviewed and approved by design + product leads.
- [ ] Storybook snapshots for critical components approved by engineering.
- [ ] Lighthouse accessibility score ≥ 95 on marketing pages; manual screen reader test completed.
- [ ] Motion regression tested for reduced-motion preference; no blocking animations for vestibular users.
- [ ] Cross-browser QA (Chrome, Safari, Edge, Firefox) and device matrix (iOS, Android, tablets) completed with screenshots.
- [ ] Performance budget adhered to (LCP < 2.5s on 4G, minimal CLS); hero/video assets optimized and lazy-loaded.

Deliver on this plan to create a premium, trust-building experience that sets Sprinter apart from competitors.

### 8. Legacy Asset Audit
- Review current marketing components (`components/home`, `components/operating-partner`, `components/services`, `components/solutions`, `public/images`, `screenshots/`) for reuse vs. retirement.
- Document pages using legacy gradients, fonts, or animations to replace during redesign.
- Audit existing animations for performance or accessibility issues; deprecate those without reduced-motion support.
- Inventory testimonial, metrics, and logo carousels to ensure updated styling and interactions.
- Maintain findings in a `design.asset_audit` entity with action items.
