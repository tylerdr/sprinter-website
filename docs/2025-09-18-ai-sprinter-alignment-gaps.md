# 2025-09-18 AI Sprinter Alignment Gap Analysis

This document summarizes the current gaps between the existing marketing application and the AI Sprinter Platform constitution. Use it alongside the Website Vision Constants and the detailed execution plans in `/TODO/` when planning implementation work.

## 1. Capability as Data
- **Finding:** Marketing pages are still implemented as bespoke React components (e.g., `components/home/**`, `components/services/**`, `components/solutions/**`) with copy and layout hardcoded. They do not yet consume Entity-backed content or View registry blocks, making it hard to scale the AI transformation narrative consistently.
- **Action:** Introduce marketing entity types (use_case, pain_point, goal, idea, product, etc.) and refactor pages to resolve data via the entity/view registries. Track in `platform.sprinter_alignment` and IA plan checklist.

## 2. Schema-First Tools
- **Finding:** Existing labs and demos (e.g., `/app/labs/agent-simulator`, `/app/labs/workflow-tool`, `/app/labs/ideation`) are tied directly to UI components without registered Sprinter Tool specs, schemas, or audit logging.
- **Action:** Rebuild each interactive experience as a Sprinter Tool with `inputSchema`, `execute`, and `outputSchema`. Configure tool-to-entity mappings so outputs persist as `content.*` entities.

## 3. Views, Not Pages
- **Finding:** Marketing routes rely on page-specific JSX and do not use the shared view registry or three-panel layout primitives.
- **Action:** Define view blocks for marketing surfaces (hero, package cards, Atlas listings) and register them so the same components render in `/tools`, `/entities`, and chat contexts when invoked by agents.

## 4. Deterministic Context Policies
- **Finding:** No agents currently serve marketing workflows (planner, writer, evaluator). Context policies for these agents have not been specified.
- **Action:** Author agent specs for marketing planners/researchers/writers with explicit context layers (global messaging, Website Vision Constants, competitive research entities). Add to agent catalog and workflow definitions.

## 5. Entity Graph & Relations
- **Finding:** There is no central entity graph representing marketing knowledge (use cases, industries, technologies). Content lives in disparate files.
- **Action:** Seed the entity catalog as defined in the IA plan, establish relations (`solves`, `applies_to`, `references`), and ensure tools/workflows operate over the graph.

## 6. Workflows & Automation
- **Finding:** Auto-publishing workflows (content_seed, stale_refresh, idea_roulette_publish) are not yet implemented. Content updates rely on manual edits.
- **Action:** Implement declarative workflows with eval gates and moderation to automate content lifecycle. Register triggers and ensure outputs stream via entity parts.

## 7. Observability & Eval
- **Finding:** Tool executions for marketing experiences lack standardized logging, and no eval suites exist for generated content quality.
- **Action:** Route all tool invocations through the entity-aware execution pipeline, emit `ai_tool_events`, and define golden set evals for content generation workflows.

## 8. Publishing & SEO Pipeline
- **Finding:** Current marketing pages do not use publication metadata from the entity system; sitemaps and structured data are manual.
- **Action:** Adopt the publication subsystem so entity state drives meta tags, sitemaps, canonical URLs, and ISR. Integrate quality score gating before setting `indexable=true`.

## 9. Security & Governance
- **Finding:** Marketing forms and demos bypass tool-level confirmation and RBAC checks. AI disclosures on privacy/terms pages are outdated.
- **Action:** Update tool specs with safety metadata (`dangerous`, `require_confirmation`), enforce tenant scoping, and refresh legal content per the new data flows.

## 10. Documentation & Onboarding
- **Finding:** Contributors lack a concise reference for applying the AI Sprinter constitution to marketing work.
- **Action:** Maintain this document, link it from `/docs/AI_SPRINTER_PLATFORM_ARCHITECTURE.md`, and update as gaps close. Capture progress snapshots per milestone.

Track remediation tasks in the relevant TODO plans and record completion in a dedicated `platform.sprinter_alignment` entity.
