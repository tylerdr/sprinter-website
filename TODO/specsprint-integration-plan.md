# SpecSprint Feature Integration Plan

## Audit Highlights
- **Navigation & Layout:** SpecSprint replaces the legacy `NavigationEnhanced` with an accessible dropdown nav that supports CTA buttons, tighter spacing, and improved mobile expansion. The root layout also swaps in the lighter chat widget and keeps the theme customizer visible.
- **Homepage Storytelling:** The SpecSprint homepage tightens the narrative into five focused modules (value pillars, three-step workflow, industry proof, quantified wins, high-intent CTA) that feel more cohesive than Sprinter’s current assortment of sections.
- **Labs Experience:** Their Labs page curates featured demos, groups tools into clearer categories, and adds better empty/CTA states. Our version still reads like a long unprioritized list.
- **Footer & Supporting Copy:** SpecSprint reorganizes the footer into product/solutions/resources/company plus legal trust columns, and their constants support CTA metadata (e.g., `NAVIGATION.ctas`) that simplify header/footer rendering.
- **Content & SEO Signals:** Page copy leans into benefit-driven headlines, crisp blurbs, and proof metrics which we can adapt to the Private Equity story while keeping existing SEO structures intact.

## Implementation Plan
1. **Navigation Overhaul**
   - Replace `NavigationEnhanced` usage with the SpecSprint dropdown nav, adapt it for Sprinter routes, and update the `NAVIGATION` constant to include CTA buttons and new footer groupings.
   - Confirm mobile interactions, analytics hooks, and auth links still behave as expected.
2. **Layout & Global Enhancements**
   - Update `app/layout.tsx` to render the new navigation, move to the lightweight chat widget (`ChatWidget`) plus theme customizer, and confirm analytics/toaster wiring remains intact.
3. **Footer Refresh**
   - Port the multi-column footer structure, restructure footer link groups for Sprinter-specific offerings (Operating Partner, Labs, Governance, etc.), and ensure accessibility/keyboard support.
4. **Homepage Restructure**
   - Introduce SpecSprint-style modules (`ValuePillars`, `HowItWorks`, industry highlight, proof metrics, final CTA) with Sprinter copy and data (portfolio wins, OP process, PE proof points).
   - Retire or repurpose redundant sections to avoid bloat.
5. **Labs Page Modernization**
   - Re-segment Labs into curated categories (e.g., Portfolio Ops, Deal Intelligence, Process Automation, Creative/Play), promote the right featured experiences, and tighten copy to PE value props.
6. **Content & Constants Alignment**
   - Reconcile `COMPANY_INFO`, `SOCIAL_LINKS`, `SEO`, and supporting copy so the new components serve Sprinter messaging while leveraging SpecSprint structure.
   - Audit dependent components/tests after the constants change.
7. **QA & Polish**
   - Run lint/tests, verify responsive behavior (nav, homepage sections, labs), and remove unused components/config left over from the previous structure.
