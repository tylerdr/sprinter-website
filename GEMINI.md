# Design System Consistency Fix

Read DESIGN-AUDIT.md for the full audit. Here's what needs to happen:

## Priority 1: Fix Contact Page Theme
The contact page (`app/contact/page.tsx`) renders in LIGHT mode while every other page is DARK. Fix it to use the same dark theme. Check if it's missing a dark class or has its own theme override.

## Priority 2: Create Shared Design System Components
Look at the AI Sprint page (`app/ai-sprint/page.tsx`) — it's the best page on the site. Use it as the reference for design patterns. Create or update these shared components:

### SectionWrapper (`components/design/SectionWrapper.tsx`)
- Consistent vertical padding (py-20 or similar)
- Max-width container (max-w-6xl mx-auto px-6)
- Optional variant prop for background: 'default' | 'gradient' | 'darker' | 'lighter'
- The gradient variant should use subtle dark gradients like the AI Sprint page

### SectionHeading (`components/design/SectionHeading.tsx`)  
- Optional badge/pill (like "🚀 AI Sprint" pills on the sprint page)
- H2 with consistent sizing (text-3xl md:text-4xl font-bold)
- Optional subtitle paragraph (text-muted-foreground)
- Centered by default, left-align variant

### Card (`components/design/Card.tsx`)
- Base card: dark bg with subtle border, rounded-xl, p-6
- Variants: feature (icon + title + description), stat (big number + label), testimonial (quote + author)
- Consistent hover state (subtle border glow or brightness change)

### Button - ensure consistent usage
- Primary: gradient background (brand-start → brand-end or the orange→blue gradient used on homepage)  
- Secondary: outline/ghost with border
- Audit ALL pages and replace ad-hoc button styles with the consistent ones

## Priority 3: Fill Content on Sparse Pages

### Homepage (`app/page.tsx`)
Below the hero, add these sections (use real content from case-studies-data.ts and existing copy):
1. "Trusted By" logo bar or client count
2. Services overview (3-4 cards linking to service pages)
3. Featured case study highlight (pull from case-studies data)
4. Process/approach teaser (3 steps)
5. Final CTA section

### Services Page (`app/services/page.tsx`)
Below the hero cards, add:
1. Expanded service descriptions with icons
2. "How We Work" process section
3. CTA to contact/ai-sprint

### Approach Page (`app/approach/page.tsx`)
Expand with:
1. Detailed methodology steps (discovery → design → build → measure)
2. What makes Sprinter different
3. CTA section

## Priority 4: Footer Consistency
Ensure ALL pages use the same dark footer component with the same link categories. The contact page footer especially needs fixing.

## Rules
- Keep the existing dark navy aesthetic — do NOT lighten the overall theme
- Use Tailwind classes that reference the CSS custom properties in globals.css
- The AI Sprint page is the gold standard for section rhythm and design quality
- Don't remove any existing content, only add/improve
- Commit after each major change with descriptive messages
- Run `npm run build` to verify no build errors after changes

When completely finished, run this command to notify me:
openclaw system event --text "Done: Design system consistency fixes applied to sprinter-website" --mode now
