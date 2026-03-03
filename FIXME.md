# FIXME — Final QA + Footer Fix

## Tyler's Instructions (verbatim)
"Fix the footer so it doesn't wrap on normally sized screen. Simplify the number of sections & options in the footer. We don't need the due diligence section and need to ensure the sections, links & services fully align with our updated positioning. Fix all remaining issues."

## What to Fix

### 1. Footer (components/layout/footer.tsx + lib/constants.ts)
The footer uses an 8-col grid with 5 nav sections + company info + newsletter = 7 groups. It wraps on normal screens.

**Fix:**
- Remove the "Due Diligence" section entirely from `NAVIGATION.footer` in `lib/constants.ts` AND from the footer component
- Consolidate to 3 nav sections max: "Services", "Resources", "Company"
- "Services" should combine the best of Advisory + Implementation into one clean list aligned with current positioning (AI agents for mid-market operations)
- Keep links to pages that actually exist and match the positioning
- The grid should be: Company Info (col-span-2) | Services | Resources | Company | Newsletter (col-span-2) = 8 cols, no wrapping
- Test that it doesn't wrap at 1024px+ viewport widths

### 2. Uncommitted Changes
There are 82 uncommitted file changes from a previous agent run. Review them — if they look like valid dark-theme/content fixes, commit them. If they're broken, revert.

### 3. Verify Build
Run `npm run build` — must pass clean with zero errors.

### 4. Commit & Push
Commit all fixes with descriptive messages. Push to branch `feature/sprinter-strategic-positioning-main`.

## Current Positioning Context
The homepage hero says: "AI agents that run your operations 24/7" — targeting mid-market operators with quoting, prospecting, scheduling, reporting automation. The footer links should reflect THIS, not the old PE/due-diligence positioning.

## Key services to keep in footer:
- AI Sprint / AI Readiness Sprint
- AI Operating Partner
- AI Assessment (free)
- Fractional AI (Co-Founder or CAIO)
- Case Studies
- Contact
- About
- Labs

## Do NOT include in footer:
- Due diligence anything
- Family office
- Governance
- Portfolio audits
- Strategic buyer
