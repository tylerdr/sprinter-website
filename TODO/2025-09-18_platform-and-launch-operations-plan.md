# 2025-09-18 Platform Integration & Launch Operations Plan

## Context
To launch the new Sprinter site successfully we must align the AI Sprinter Platform (entities, tools, agents, workflows) with Next.js delivery, analytics, QA, and GTM operations. This plan covers technical integration, quality gates, and go-live readiness.

## Objectives
- Implement entity schemas, tool registry updates, and workflow automation required by the new IA and interactive experiences.
- Ensure the marketing application remains type-safe, performant, and secure.
- Establish comprehensive QA, analytics, and observability systems for launch and post-launch monitoring.

## Checklist
- [ ] Define and migrate database schemas for new entity types (use cases, pain points, goals, technologies, models, frameworks, libraries, document types, industries, companies, products, ideas, compositions, ROI estimates, governance packs).
- [ ] Update AI Sprinter Platform registries: entity type registry, view registry, tool registry, agent definitions, workflow specs.
- [ ] Implement entity-aware publishing pipeline (draft → review → publish → indexable) with moderation and audit logs.
- [ ] Configure sandbox vs. production environments (Supabase, analytics, feature flags) for safe iteration.
- [ ] Integrate new routes/pages into Next.js app with data loaders, caching, ISR configuration, error handling.
- [ ] Set up analytics pipelines (Segment/PostHog, GA4) capturing navigation, tool usage, conversions, newsletter signups, CTA clicks.
- [ ] Implement GTM/CRM automation (HubSpot/Salesforce) for high-intent signals (workshop bookings, ROI calc thresholds).
- [ ] Establish observability (logs, metrics, tracing) for marketing stack and AI tool executions.
- [ ] Create automated regression suite (Playwright for UX smoke, vitest/unit for utilities) covering critical journeys.
- [ ] Prepare launch runbook (deployment steps, feature flag toggles, rollback plan, RACI chart).
- [ ] Set up post-launch monitoring dashboards and incident response protocols.
- [ ] Document maintenance processes (content refresh cadence, tool performance review, SEO audits).

## Detailed Plan
### 1. Database & Schema Work
- Write migrations for new entity tables with relations and publication metadata.
- [x] Add chat persistence tables (`threads`, `messages`, `tool_executions`) and ensure `ai_tool_events` is present for workflow logging.
- Enforce constraints (unique slugs, foreign keys for relations, quality score fields).
- Seed reference data (taxonomy picklists) based on information architecture plan.

### 2. Registries & Platform Configuration
- Update `/features/entities` registry with new schemas and validation logic.
- Extend view registry to map entity types to React components with incremental static regeneration.
- Register tools with gating metadata and moderation policies.
- Define agents (Planner, Researcher, Writer, Evaluator, Publisher) with tool allow-lists and stop conditions.
- Specify workflows (content_seed, stale_refresh, idea_roulette_publish) in YAML/JSON with audit logging.
- Represent lead nurture sequences as AI Sprinter workflows and log execution via `ai_tool_events`/`lead_activities` instead of bespoke tables.

### 3. Application Integration
- Implement data fetching layer (server components, caching) respecting multi-tenant context.
- Add error boundaries, loading states, and fallback UI for each route.
- Integrate interactive tools with server actions, streaming responses, and optimistic UI updates.
- Update Next.js middleware if required for marketing preview authentication.

### 4. Analytics & Instrumentation
- Map events to analytics schema; ensure unique IDs for entity interactions.
- Configure conversion goals (booked workshop, wedge sprint request, newsletter sign-up).
- Set up heatmap/session replay tools as needed, respecting privacy policy.
- Integrate CRM (HubSpot/Salesforce) via webhook or direct API with consent logging.

### 5. QA & Automation
- Expand Playwright suite to cover hero CTA, package selection, tool gating flows, Idea Roulette spin/publish, newsletter signup, contact form.
- Add unit tests for entity schema validation and tool execution wrappers.
- Run lighthouse CI for performance and accessibility budgets.
- Define manual QA script (cross-browser/device matrix, interactive tools, animations, forms).

### 6. Security & Compliance
- Review data handling for tool inputs/outputs, ensure encryption at rest/in transit.
- Verify feature flag and environment variable handling; remove secrets from client bundles.
- Update privacy policy to reflect data collection and AI tool usage.
- Conduct security review (OWASP checks, dependency audit, rate limiting for tool endpoints).

### 7. Launch Runbook & Post-Launch
- Document deployment flow (preview → staging → production), approval gates, and rollback steps.
- Create RACI chart for launch day (engineering, design, marketing, ops, support).
- Schedule final smoke tests and analytics validation after launch.
- Define post-launch optimization backlog (phase 2 enhancements, A/B tests, content expansion).

## Testing Criteria
- [ ] `npx tsc --noEmit` passes with zero errors.
- [ ] `yarn lint` passes or documented waivers.
- [ ] `yarn build` succeeds without warnings.
- [ ] Playwright regression suite passes in CI (desktop + mobile viewports).
- [ ] Manual QA checklist signed off by design, engineering, and marketing leads.
- [ ] Analytics event validation complete (front-end → analytics tool → CRM).
- [ ] Security review sign-off (vulnerability scan, dependency audit, environment variable audit).
- [ ] Post-launch monitoring alerts configured and tested.

Completing this plan ensures the technical foundation, governance, and operational readiness required for a successful launch.

### 8. AI Sprinter Alignment Gap Closure
- Audit existing marketing routes and components to ensure they consume data via entity/view registries instead of bespoke React logic; create backlog tasks where refactors are required.
- Verify marketing tools and demos are registered as first-class Sprinter Tools with schemas, entity mappings, and audit logging; convert ad-hoc interactions.
- Ensure publications leverage entity-driven routes with canonical metadata; retire hardcoded markdown pages.
- Review current analytics instrumentation for compliance with standard tool/agent/workflow observability contracts.
- Capture all findings in a `platform.sprinter_alignment` entity, including severity, recommended fix, and owner.

### 9. Schema Assets Provided (2025-09-20)
- [ ] Add the supplied entity schemas (`knowledge.use_case`, `knowledge.pain_point`, `knowledge.goal`, `capability.*`, `market.*`, `solution.product`, `content.idea`, `content.composition`, `analysis.*`, `policy.governance_pack`) to the `entity_types` registry with versioning and metadata.
- [ ] Scaffold the eight tool specs (`idea-roulette`, `wedge-spec-generate`, `roi-calc`, `goal-fit`, `stack-compose`, `doc-field-template`, `product-fit`, `gov-checklist`) under `features/tools/toolset/**` using typed `inputSchema/execute/outputSchema` and entity-aware mappings.
- [ ] Register the five agents (`seo-planner-agent`, `researcher-agent`, `writer-agent`, `evaluator-agent`, `publisher-agent`) with system instructions, tool allow-lists, context policies, and bounded loop settings.
- [ ] Create workflow definitions for `content-seed` and `idea-roulette-publish`, expose them via the workflow runner, and enforce eval/approval gates per quality requirements.
- [ ] Ensure DB overrides and tool discovery hooks persist artifacts and emit the `data-entity_*` parts expected by the AI Sprinter platform.
