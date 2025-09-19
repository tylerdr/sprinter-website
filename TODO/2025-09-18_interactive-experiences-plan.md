# 2025-09-18 Interactive Experiences & AI Tools Plan

## Context
Interactive, people-first experiences are core to demonstrating Sprinter’s AI Sprinter Platform. This plan covers the design, tooling, and analytics for calculators, labs, the idea roulette, wedge planners, and other lead magnets embedded across the site.

## Objectives
- Implement interactive tools as first-class AI Sprinter Tools with typed schemas, governance, and entity-aware outputs.
- Embed context-appropriate experiences on key pages (e.g., wedge planner on use cases, ROI calculator on pain points) to drive engagement and lead capture.
- Ensure tools persist outputs as entities/artifacts, enabling the AI Opportunity Atlas to grow programmatically.
- Instrument analytics to measure usage, conversions, and content generation effectiveness.

## Checklist
- [ ] Define tool roster, ownership, and placement map across templates.
- [ ] Author tool specs (inputSchema, execute, outputSchema, gating mode, permissions) in `/features/tools/toolset` for:
  - Idea Roulette (`idea-roulette`)
  - Wedge Spec Generator (`wedge-spec-generate`)
  - ROI Calculator (`roi-calc`)
  - Goal Fit Finder (`goal-fit`)
  - Stack Composer (`stack-compose`)
  - Document Field Template Builder (`doc-field-template`)
  - Product Fit Checker (`product-fit`)
  - Governance Checklist Builder (`gov-checklist`)
- [ ] Register tool metadata (labels, descriptions, gating settings) in database overrides.
- [ ] Build reusable UI container(s) for embedded tools with loading states, gating flows, and success callbacks.
- [ ] Integrate each tool into its target templates with tailored copy and contextual defaults.
- [ ] Configure entity creation mappings (e.g., idea roulette → `content.idea`, ROI calculator → `analysis.roi_estimate`).
- [ ] Implement moderation/evaluation hooks to prevent low-quality or duplicate artifacts before publication.
- [ ] Add personalization logic (prefill inputs based on page entity context, e.g., default document type or industry).
- [ ] Wire up analytics events (`tool_opened`, `tool_submitted`, `tool_gated`, `tool_conversion`) with metadata (entity ID, tool slug, gating result).
- [ ] Create automated notifications/CRM hooks for high-intent tool submissions (e.g., ROI > threshold triggers sales alert).
- [ ] Document user flows and escalation paths (e.g., support chat or follow-up if tool errors out).
- [ ] QA accessibility and responsiveness for all embedded experiences.

## Detailed Plan
### 1. Tool Roster & Placement
- Map each page template to the tool(s) it should host, ensuring no page feels static.
- Document gating strategies (free vs. soft vs. hard) and conversion goals per tool.

### 2. Specification & Implementation
- Define TypeScript types and schemas, ensuring no `any` usage.
- Implement server-side execute functions with guardrails (timeout, validation, error handling).
- Utilize AI Sprinter entity-aware execution pipeline to automatically persist outputs as entities and emit `data-entity_*` parts for UI streaming.

### 3. UI Integration
- Develop a shared `InteractiveToolPanel` with states: idle, input, running, success, gated, error.
- Provide props for contextual descriptions, success CTA (e.g., "Book a Wedge Sprint"), and analytics identifiers.
- Support optional PDF export or email send via server actions.

### 4. Personalization & Prefill
- Pull relevant entity attributes (e.g., default document type, pain points) to pre-populate tool forms.
- Provide API for manual overrides and user-selected values.

### 5. Output Persistence & Publishing
- Ensure outputs create or update entities with proper relations (e.g., idea links to technology, industry, goal IDs).
- Implement quality scoring and moderation cues before toggling `indexable=true`.
- Maintain audit logs of tool runs (inputs, outputs, user identity if known).

### 6. Analytics & CRM Hooks
- Instrument event tracking (Segment/PostHog/etc.) with consistent naming.
- Build dashboards showing tool usage, conversion rates, generated entities, and attributed deals.
- Set thresholds for automatic routing to sales (e.g., ROI calc showing >$250k annual savings).

### 7. QA & Accessibility
- Test across breakpoints and assistive technologies (keyboard nav, screen readers).
- Validate gating flows for logged-in vs. anonymous users.
- Confirm error states are informative and recoverable.

## Testing Criteria
- [ ] Type-safe tool implementations reviewed; unit tests cover schema validation and error handling.
- [ ] End-to-end QA for each embedded tool (desktop + mobile) including gating scenarios.
- [ ] Entity artifacts verified in database with correct relations and publication states.
- [ ] Analytics events captured in dashboards; sample tool run traced from front-end to CRM.
- [ ] Security review completed for server actions (rate limits, abuse prevention, PII handling).
- [ ] Accessibility audit (manual + automated) passes WCAG AA for interactive components.

Executing this plan ensures the site feels alive, generates compounding content, and feeds GTM motions.

### 8. Legacy Experience Review
- Catalogue existing interactive demos (e.g., Agent Simulator, Workflow Designer, Ideation Engine) in current site/components; document which map to new tool specs vs. require rebuilds.
- Ensure legacy components are refactored into AI Sprinter Tool definitions with schemas and persisted outputs.
- Audit `/app/tools/page.tsx` runner UX to confirm it can host new marketing tools (roulette, calculators); identify gaps in gating or analytics support.
- Verify that any existing HubSpot or iframe embeds comply with new gating strategy or plan replacements.
- Track findings in `content.interactive_audit` entities linked to tool rebuild tasks.
