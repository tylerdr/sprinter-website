# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture Overview

This is a Next.js 15 website for Sprinter AI, an AI consulting and venture studio. The codebase uses:

- **Framework**: Next.js 15 with App Router, TypeScript, React 19
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Animations**: Framer Motion
- **Backend Ready**: Supabase client configured in `lib/supabase/`
- **Path Aliases**: `@/` maps to project root

### Key Directories

- `app/` - Next.js App Router pages and API routes
  - `labs/` - Interactive AI demonstrations (agent-simulator, workflow-tool, ideation, sketch-studio)
  - `use-cases/` and `use-cases/industries/` - Programmatic SEO pages
  - `api/contact/` - Contact form API endpoint
- `components/` - Reusable React components
  - `ai-elements/` - AI-specific UI components for demos
  - `home/` - Homepage section components
  - `layout/` - Navigation and Footer
  - `ui/` - shadcn/ui base components
- `lib/` - Utilities and data
  - `constants.ts` - Centralized site configuration, company info, pricing
  - `use-cases-data.ts`, `blog-data.ts`, `case-studies-data.ts` - Content data
  - `supabase/` - Database client setup

### Design System

The site uses a dark, futuristic theme with:
- Blue-to-purple gradient accents
- Glass morphism effects with backdrop blur
- Consistent spacing and typography via Tailwind
- Mobile-responsive layouts

### Environment Variables

Required for full functionality:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY` (for contact form)

## TypeScript Configuration

Strict mode enabled with path alias `@/` for imports. All components and pages use TypeScript.