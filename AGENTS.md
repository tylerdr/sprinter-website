# AGENTS.md

## React Bits Integration

This project incorporates React Bits components (https://reactbits.dev) for enhanced UI animations and interactions.

### Installed Components

All React Bits components are installed via the shadcn CLI using TypeScript + Tailwind (TS-TW) versions:

```bash
npx shadcn@latest add https://reactbits.dev/r/<ComponentName>-TS-TW
```

#### Currently Integrated Components:

1. **Hyperspeed** - Interactive space-warp background effect
   - Location: Hero section background
   - Features: Click-and-hold to accelerate effect
   - File: `components/Hyperspeed.tsx`

2. **BlurText** - Animated text reveal with blur effect
   - Location: Hero headlines and section headers
   - Features: Word-by-word or character animation with directional blur
   - File: `components/BlurText.tsx`

3. **StarBorder** - Animated glowing border effect
   - Location: Primary CTA buttons
   - Features: Rotating star-like border animation on hover
   - File: `components/StarBorder.tsx`

4. **ShinyText** - Shimmer text effect
   - Location: Button labels and emphasized text
   - Features: Animated shine effect across text
   - File: `components/ShinyText.tsx`

5. **SplashCursor** - Click ripple effect
   - Location: Global (hero section)
   - Features: Creates expanding ripples on click
   - File: `components/SplashCursor.tsx`

6. **ScrollFloat** - Scroll-triggered float animation
   - Location: Section headings and content blocks
   - Features: Elements float up and fade in on scroll
   - File: `components/ScrollFloat.tsx`

7. **MagicBento** - Interactive bento grid
   - Location: Services showcase section
   - Features: Hover effects, expandable cards, gradient overlays
   - File: `components/MagicBento.tsx`

8. **LogoLoop** - Infinite scrolling logo carousel
   - Location: Technology partners section
   - Features: Auto-scrolling loop of partner/tech logos
   - File: `components/LogoLoop.tsx`

9. **TrueFocus** - Text emphasis animation
   - Location: Key value propositions
   - Features: Focus/blur surrounding text on hover
   - File: `components/TrueFocus.tsx`

10. **GlitchText** - Digital glitch effect
    - Location: Tech-focused sections
    - Features: Cyberpunk-style text glitch animation
    - File: `components/GlitchText.tsx`

11. **ScrollStack** - Stacked cards scroll effect
    - Location: Testimonials/features sections
    - Features: Cards stack and scale on scroll
    - File: `components/ScrollStack.tsx`

### Implementation Guidelines

1. **Performance**: React Bits components are optimized but use them judiciously
   - Limit heavy animations (Hyperspeed, MagicBento) to 1-2 per page
   - Use intersection observer-based animations (ScrollFloat) for better performance

2. **Accessibility**: Ensure animations respect user preferences
   - Components should check for `prefers-reduced-motion`
   - Provide non-animated fallbacks where necessary

3. **Consistency**: Follow these patterns:
   - Hero sections: BlurText for headings, StarBorder for primary CTAs
   - Content sections: ScrollFloat for reveal animations
   - Interactive elements: SplashCursor for visual feedback
   - Tech/AI content: GlitchText for thematic emphasis

4. **Mobile Optimization**: Test all animations on mobile devices
   - Disable complex animations on low-end devices
   - Ensure touch interactions work properly (especially Hyperspeed)

### Adding New React Bits Components

To add a new React Bits component:

```bash
# Browse available components at https://reactbits.dev

# Install via shadcn CLI (always use TS-TW version)
npx shadcn@latest add https://reactbits.dev/r/ComponentName-TS-TW

# Import and use in your components
import { ComponentName } from "@/components/ComponentName";
```

### Custom Animations

For animations requiring Tailwind classes not in v4, add them to `app/globals.css`:

```css
/* React Bits Animations */
@keyframes animation-name {
  /* keyframes */
}

.animate-class-name {
  animation: animation-name duration timing-function;
}
```

### Troubleshooting

1. **Animation not working**: Check if required CSS animations are in globals.css
2. **TypeScript errors**: Ensure you're using the TS-TW version of components
3. **Performance issues**: Reduce animation complexity or disable on mobile
4. **Build errors**: Some components may need additional dependencies (check console)

### Future Enhancements

Consider adding:
- Particles backgrounds for AI/tech sections
- Magnetic buttons for interactive CTAs
- Liquid/fluid animations for modern feel
- 3D card effects for product showcases
- Text scramble effects for loading states