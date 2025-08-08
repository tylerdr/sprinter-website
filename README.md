# Sprinter AI Website

A modern, futuristic website for Sprinter AI - an AI consulting business and venture studio specializing in autonomous AI agents and agentic workflows.

## 🚀 Features

### Core Pages
- **Homepage** - Futuristic hero with interactive animations, services preview, and trust signals
- **AI Labs** - Interactive AI demonstrations and tools
  - **Agent Simulator** - Watch multiple AI agents collaborate in parallel
  - **Workflow Designer** - Map business processes and identify AI opportunities
  - **Ideation Lab** - Creative AI games including brainstorming, idea racing, and Scattergories
  - **AI Sketch Studio** (pending) - Transform sketches with AI
- **Contact** - Modern contact form with multiple ways to connect

### Technical Stack
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Framer Motion** for animations
- **Supabase** ready for backend/auth

### Design Features
- Dark, futuristic theme with gradient accents
- Interactive mouse-following effects
- Smooth animations and transitions
- Mobile-responsive design
- Techno-optimistic tone throughout

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:SprinterAI/sprinter-website.git
cd sprinter-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your Supabase and API keys.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
sprinter-website/
├── app/                    # Next.js app router pages
│   ├── labs/              # Interactive AI demos
│   │   ├── agent-simulator/
│   │   ├── workflow-tool/
│   │   └── ideation/
│   ├── contact/           # Contact page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── home/             # Homepage sections
│   └── layout/           # Navigation & Footer
├── lib/                  # Utilities and configs
│   └── supabase/        # Supabase client setup
└── public/              # Static assets
```

## 🎨 Key Components

### Interactive Demos
- **Agent Simulator**: Demonstrates parallel AI agent collaboration
- **Workflow Tool**: Interactive process mapping with AI suggestions
- **Ideation Lab**: Multiple creative games including:
  - AI Brainstorm Generator
  - Idea Scorer with feedback
  - Idea Race Tournament
  - Startup Scattergories

### Design System
- Gradient text effects using blue-to-purple gradients
- Glass morphism with backdrop blur
- Noise background textures
- Glow effects on key elements

## 🚧 Pending Features

- [ ] AI Sketch Studio implementation
- [ ] Case Studies showcase
- [ ] About/Approach page
- [ ] Services detail page
- [ ] Blog/Insights section
- [ ] Actual AI API integrations
- [ ] Supabase authentication
- [ ] Contact form backend

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

The site is optimized for deployment on Vercel, Netlify, or any Node.js hosting platform.

## 📝 Environment Variables

Required environment variables (see `.env.local.example`):
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `OPENAI_API_KEY` - For AI features (optional in development)

## 🤝 Contributing

This is a private repository for Sprinter AI. Please coordinate with the team before making changes.

## 📄 License

Proprietary - Sprinter AI © 2024

---

Built with 💙 by Sprinter AI - Building the future with autonomous AI agents.