# 2025-09-18 Sprinter Website Launch Master Plan

## Purpose
Create a world-class Sprinter AI consulting website that reflects the people-first, document-intelligence-focused positioning, delights PE buyers, and showcases our AI Sprinter Platform through interactive experiences. This master plan enumerates the major workstreams required to launch and links to detailed execution plans for each stream.

## Status (2025-09-18 Audit)
- Positioning & copy: Not started — site content still reflects pre-PE messaging.
- Information architecture: Mega menu deployed, but target taxonomy (Operating Partner / Packages / Industries / Approach) not implemented yet.
- Interactive experiences: Core labs restored; tool specs, gating, and analytics remain outstanding.
- Visual & UX: Navigation polish and auth flows improved; broader design system refresh and motion work untouched.
- Platform & launch operations: Rate limiting and auth resiliency shipped; entity schemas, analytics, and automation remain open.

## Pillars & Linked Plans
| Pillar | Focus | Detailed Plan |
| --- | --- | --- |
| Positioning, Messaging & Copy | Narrative, packages, case studies, governance storytelling | [2025-09-18_positioning-and-copy-plan.md](./2025-09-18_positioning-and-copy-plan.md) |
| Information Architecture & Content Systems | Navigation, entity-driven content, AI Opportunity Atlas, SEO scaffolding | [2025-09-18_information-architecture-and-content-plan.md](./2025-09-18_information-architecture-and-content-plan.md) |
| Interactive Experiences & AI Tools | Roulette, calculators, wedge planners, tool gating, analytics | [2025-09-18_interactive-experiences-plan.md](./2025-09-18_interactive-experiences-plan.md) |
| Visual Design, Animations & UX Polish | Motion system, responsive layouts, accessibility, feel of trust | [2025-09-18_visual-and-ux-plan.md](./2025-09-18_visual-and-ux-plan.md) |
| Platform Integration, QA & Launch Operations | Entity schemas, workflows, instrumentation, approvals, launch checklist | [2025-09-18_platform-and-launch-operations-plan.md](./2025-09-18_platform-and-launch-operations-plan.md) |

## Global Milestones
1. **Strategy Lock (Week 0)** – Approve positioning, IA, tool roster, and design direction.
2. **Content & Entity Seed (Week 2)** – Publish initial set of high-priority entities (use cases, pain points, goals, industries, technologies, products) aligned with packages and case studies.
3. **Interactive Beta (Week 4)** – Roulette, calculators, and wedge planners live behind feature flag; analytics verified.
4. **Design QA (Week 5)** – Motion system, responsive tweaks, accessibility sign-off, browser/device checks.
5. **Launch Readiness (Week 6)** – All plans’ checklists complete, quality gates passed (`npx tsc --noEmit`, `yarn lint`, `yarn build`, manual QA, SEO readiness), playbooks for GTM finalized.

## Cross-Plan Dependencies
- Copy and IA plans must align before component build starts.
- Interactive tools rely on finalized entity schemas (Platform plan).
- Visual plan requires prioritized content modules to stage motion.
- Launch plan coordinates testing criteria from every stream.
- All workstreams add capabilities to existing surfaces first, retiring legacy pages only after replacements are live and validated.

## Reporting Cadence
- Weekly async status update referencing checklist completion per plan.
- Bi-weekly live review focused on blockers, scope adjustments, and QA findings.

## Definition of Done
- All linked plan checklists completed and testing criteria satisfied.
- Website deployed with updated content, interactive tools, visual polish, and analytics events live.
- GTM playbooks, case studies, and newsletter flows operational.
- Post-launch monitoring plan in place for continuous optimization.

Maintain this master file as the single source of truth for high-level progress and linkage to sub-plans.
