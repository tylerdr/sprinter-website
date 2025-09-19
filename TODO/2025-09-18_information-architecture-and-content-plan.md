# 2025-09-18 Information Architecture & Content Systems Plan

## Context
The site must evolve into an entity-driven AI Opportunity Atlas that supports programmatic SEO, structured storytelling, and interactive exploration. This plan covers navigation, routing, content modeling, and publishing workflows required to ship the new IA.

## Objectives
- Define a concise top-level navigation aligned with the master messaging and packages.
- Implement entity-based routing and templates (use cases, pain points, goals, technologies, models, frameworks, OSS libraries, document types, industries, companies, products, ideas, compositions).
- Stand up the AI Opportunity Atlas hub with filtering, graph relationships, and high-value seed content.
- Ensure SEO best practices (canonical handling, structured data, sitemaps, quality gates) to avoid thin programmatic pages.

## Checklist
- [ ] Approve final navigation structure (Operating Partner, Packages & Pricing, Services, Industries, Approach, Resources).
- [ ] Map all required routes to entity types and compositions with canonical rules.
- [ ] Define/implement entity schemas in the AI Sprinter Platform database for all content types.
- [ ] Configure publication metadata (title, slug, meta, indexable flag) per entity type.
- [ ] Build content templates (markdown/MDX or JSON schema) for each entity, including required fields (TL;DR, KPIs, acceptance criteria, governance notes).
- [ ] Launch the AI Opportunity Atlas hub page with filter controls, search, and featured entities.
- [ ] Produce seed content set (minimum 12 high-priority entities across types) to validate templates.
- [ ] Generate composition patterns (e.g., `{technology}-in-{industry}`) with canonicalization and quality scoring.
- [ ] Wire entity relations (solves, supports, applies-to, in-industry, references) with enforcement in admin tooling.
- [ ] Implement quality gates (length, uniqueness, governance inclusion, review status) before toggling `indexable=true`.
- [ ] Configure sitemaps (`sitemap-main.xml`, `sitemap-ideas.xml`, `sitemap-compositions.xml`) and robots directives.
- [ ] Establish content workflows (content_seed, stale_refresh, idea_roulette_publish) with editorial review checkpoints.

## Detailed Plan
### 1. Navigation & Page Topology
- Confirm nav labels, ordering, and dropdown behavior if needed.
- Update footer quick links to match new architecture (Pricing, Newsletter, Governance, Atlas, Careers).
- Ensure route groups in Next.js align with desired breadcrumb trails.

### 2. Entity Schema Design
- For each entity type, define Zod schema (titles, summaries, outcomes, KPIs, acceptance criteria, governance, related IDs).
- Include publication metadata, SEO fields, gating flags, and analytics tags.
- Document schema in `/docs` for future contributors.

### 3. Routing & Rendering
- Create SSR/ISR routes matching patterns (e.g., `/insights/use-cases/[slug]`, `/ideas/[technology]-in-[industry]`).
- Implement view registry that maps entity type to React server component view with fallback templates.
- Handle canonical and redirects for alias slugs.

### 4. AI Opportunity Atlas Hub
- Build `/insights/atlas` with filters (type, industry, document type, goals) and search via Supabase/Elastic.
- Surface featured entities, trending ideas, and recently published content.
- Include education modules explaining how to use the Atlas.

### 5. Seed Content Production
- Prioritize entities that align with packages and case studies (e.g., BOL reconciliation, vendor onboarding pack extraction, LLM extraction technology, Human-in-the-Loop concept).
- Ensure each seed entry includes KPIs, acceptance criteria, governance notes, and cross-links.

### 6. Composition Pages
- Define safe combinations (e.g., technology × industry, use case × industry) and avoid combinatorial bloat.
- Implement canonical key generator and noindex fallback for low-quality drafts.
- Provide editorial UI to edit composition narratives before publishing.

### 7. Relations & Graph Widgets
- Enforce relation types and cardinality in admin UI.
- Build Related Content widget logic (embedding similarity + curated overrides).
- Display graph context (e.g., "Solves for: exceptions backlog, duplicate entries") on entity pages.

### 8. SEO & Quality Safeguards
- Add structured data blocks (Article/TechArticle, FAQPage, Product, BreadcrumbList).
- Configure meta tags, open graph, and Twitter cards per entity.
- Implement automated audits for thin content detection and indexing toggles.

### 9. Workflow Automation
- Configure AI Sprinter Agents (Planner, Researcher, Writer, Evaluator, Publisher) with tool allow-lists.
- Define evaluation metrics (length, accepted criteria, KPIs, governance) and blocking thresholds.
- Send daily/weekly digests of published/updated entities to ops & GTM teams.

## Testing Criteria
- [ ] Content approval workflow exercised end-to-end (draft → review → publish → indexable true) for each entity type.
- [ ] Navigation smoke-tested on desktop, tablet, mobile for accessibility and routing correctness.
- [ ] Sitemaps validated via Google Search Console inspection tools.
- [ ] Structured data passes Google Rich Results Test for representative entity pages.
- [ ] Programmatic composition pages reviewed by SEO specialist to confirm unique value and absence of duplication.
- [ ] Supabase entries verified for accurate relations; broken link audit (internal/external) returns zero critical errors.

Completion of this plan ensures development, design, and SEO efforts rest on a robust IA foundation.

### 10. Existing Surface Audit & Migration Tasks
Perform a systematic review of the current application routes, catalog required actions, and track remediation in the entity CMS. Minimum actions per route: determine keep/retire/redirect status, map to new entity/template, identify copy/design deltas, and log engineering tasks for data wiring.

**Core marketing pages**
- [app/page.tsx](../app/page.tsx): home hero, proof metrics, labs preview (components under `components/home/**`).
- [app/about/page.tsx](../app/about/page.tsx): founder story, company values, impact metrics.
- [app/operating-partner/page.tsx](../app/operating-partner/page.tsx): AI operating partner positioning, portfolio PMO narrative.
- [app/ai-sprint/page.tsx](../app/ai-sprint/page.tsx) & [app/ai-partnership/page.tsx](../app/ai-partnership/page.tsx): package landing pages for sprint and retainer offers.
- [app/ai-assessment/page.tsx](../app/ai-assessment/page.tsx): workshop CTA and diagnostic flow.
- [app/services/page.tsx](../app/services/page.tsx) plus service detail routes (`app/services/discovery`, `app/services/sprint`, `app/services/enterprise`, `app/services/venture`).
- [app/solutions/page.tsx](../app/solutions/page.tsx) with vertical/solution subpages under `app/solutions/*`.
- [app/use-cases/page.tsx](../app/use-cases/page.tsx) and detail routes powered by `app/use-cases/[slug]`.
- [app/products/page.tsx](../app/products/page.tsx) and product detail pages in `app/products/*`.
- [app/pe-services/page.tsx](../app/pe-services/page.tsx) and [app/partnership/page.tsx](../app/partnership/page.tsx) for PE-focused messaging.
- [app/pricing/page.tsx](../app/pricing/page.tsx) for transparent package pricing and FAQs.
- [app/contact/page.tsx](../app/contact/page.tsx) lead capture form.
- [app/governance/page.tsx](../app/governance/page.tsx) for responsible AI messaging.

**Resource hubs & content libraries**
- `app/insights` (atlas-style articles), `app/resources`, `app/case-studies`, `app/blog`, and `app/downloads` directories; ensure entity mapping for each content type.

**Industry & solution navigation**
- `app/industries` index and detail routes, `components/industries/**` cards, and global navigation drop-downs.

**AI Labs & interactive experiences**
- `/app/labs/page.tsx` index plus 30+ lab routes under `app/labs/*` (e.g., `agent-simulator`, `workflow-tool`, `document-intelligence`, `pe-tycoon`).
- Audit lab metadata surfaces in `components/labs/**` for alignment with new tool registry.

**Legal & policy**
- [app/privacy/page.tsx](../app/privacy/page.tsx), [app/terms/page.tsx](../app/terms/page.tsx), and any disclosures in `components/guides` or footers.

**Authenticated & in-app marketing surfaces**
- Dashboard, proposals, and labs surfaces under `app/dashboard/**` and `app/proposals/**` referencing marketing copy; update to point at new packages/services.
- Navigation components in `components/layout/**` and chat widgets in `components/chat-widget.tsx`.

Create an IA migration tracker entity (`project.website_ia_audit`) that records each route, status, owner, dependencies, and redirect mapping.
