# Model Registry Modernization Plan

## Context
We need to refresh our model catalog so MortgageQ surfaces the latest high-quality models from OpenAI, Anthropic, Google, Groq, and xAI via the AI SDK v5 provider APIs. The goal is to align the admin agent configuration workflow and the inline chat overrides with our Provider Registry strategy (see Ember) while keeping type-safety, metadata accuracy, and UX coherence for system administrators.

## Objectives
- Replace stale entries in `features/ai/models.ts` with an auditable registry that tracks provider, capabilities, cost, and suitability.
- Introduce a shared provider registry abstraction inspired by Ember and AI SDK v5 guidance to power model pickers and runtime selection.
- Update the admin agent configuration UI (`app/(admin)/admin/agents/page.tsx`) to use the new registry, surface model insights, and support per-agent defaults.
- Allow system admins to override the model for a single chat session, with clear metadata in the message history (hover info icon) detailing the applied settings.
- Ensure tooling (existing model pickers, tool picker) reflects registry changes without regressing multi-tenant safeguards.

## Approach
1. **Research & Baseline**
   - Inventory current MortgageQ model registry usage (agents, chat, tools).
   - Review Ember's model registry/picker implementation for reusable patterns.
   - Collect up-to-date specs (model IDs, capabilities, pricing) from `https://ai-sdk.dev/providers/ai-sdk-providers` and recent provider docs for Anthropic, OpenAI, Google, Groq, and xAI.
   - Summarize recommended provider management practices from AI SDK v5 docs.

2. **Registry Refactor Design**
   - Define a typed `ModelDefinition` interface covering metadata (capabilities, cost, recommended use-cases, availability) and provider binding (lazy loader or factory).
   - Organize models by provider with versioned IDs to ensure deterministic selection.
   - Establish fallbacks & alias strategy (short names, tenant overrides) and plan for periodic refresh with single source of truth.
   - Document the structure in code comments and ensure compatibility with existing consumers.

3. **Implementation**
   - Refactor `features/ai/models.ts` to use the new data structures, populate it with the curated list of current flagship models (Anthropic Claude 3.5/Claude 3.7 variants, OpenAI o-series, Google Gemini 2.0/2.5, xAI Grok 3, Groq LPU models, etc.).
   - Update selectors/helpers to expose typed registries for admin UI and runtime resolution.
   - Introduce summary metadata pills (cost tier, modality flags, recommended tasks) returned with model lists for display.

4. **Admin & Chat UX Enhancements**
   - Update `app/(admin)/admin/agents/page.tsx` and supporting components to render the new model picker, surface key metadata, and persist selections.
   - Restore/extend the tool picker for system admins and ensure both agent defaults and per-chat overrides use the new registry APIs.
   - Add inline override in chat for system admins, gated by role, with hoverable info icon in message actions showing the model + settings snapshot captured at send time.
   - Ensure metadata persists in chat transcripts without leaking across tenants.

5. **Testing & Validation**
   - Type-check (`npx tsc --noEmit`), lint (`yarn lint`), and build (`yarn build`).
   - Manual verification in browser: admin agent config page (model picker + tool picker), chat override flow, metadata tooltip.
   - Confirm no console warnings/errors and that fallbacks behave when a model is missing.

## Checklist
- [ ] Research notes captured (models, pricing, capabilities) and reflected in registry metadata.
- [ ] Typed model registry implemented with accurate entries and fallbacks.
- [ ] Admin agent model picker uses new registry and shows enriched metadata.
- [ ] System admin tool picker restored with per-chat override support and metadata tooltip.
- [ ] Multi-tenant access controls validated for overrides and metadata visibility.
- [ ] Telemetry/logging updated if needed for new model metadata tracking.
- [ ] Docs and inline comments updated where logic is non-obvious.

## Testing Criteria
- [ ] `npx tsc --noEmit`
- [ ] `yarn lint`
- [ ] `yarn build`
- [ ] Manual admin UI regression check (model picker, tool picker, save flow)
- [ ] Manual chat override test as system admin (ensuring metadata hover shows correct snapshot)
- [ ] Verify no runtime errors in browser console

