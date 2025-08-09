"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Sparkles, Bot, FileText, BarChart3, Mic, Palette, Gamepad2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { NAVIGATION, COMPANY_INFO } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/logo/BrandLogo";

const labsSubmenu = [
  {
    category: "Featured",
    items: [
      { 
        href: "/labs/opportunity-audit", 
        label: "AI Opportunity Audit", 
        description: "Get your personalized AI roadmap",
        icon: Sparkles,
        featured: true
      },
    ]
  },
  {
    category: "Featured",
    items: [
      { href: "/labs/opportunity-audit", label: "AI Opportunity Audit", description: "Get your AI roadmap", icon: Sparkles },
      { href: "/labs/agent-battle", label: "Agent Battle", description: "AI vs AI debates", icon: Gamepad2 },
      { href: "/labs/tiny-town", label: "Tiny Town", description: "Simulate AI NPCs", icon: Bot },
      { href: "/labs/vibe-coding", label: "Vibe Coding", description: "Generate UI components", icon: Palette },
    ]
  },
  {
    category: "Agents & Workflows",
    items: [
      { href: "/labs/agent-simulator", label: "Agent Simulator", description: "Watch AI agents collaborate", icon: Bot },
      { href: "/labs/agent-playground", label: "Agent Playground", description: "Build workflows visually", icon: Bot },
      { href: "/labs/ai-assistant", label: "AI Assistant", description: "Chat with our AI", icon: Bot },
      { href: "/labs/storyboarding", label: "Storyboarding", description: "Map user journeys", icon: Bot },
    ]
  },
  {
    category: "Data & Docs",
    items: [
      { href: "/labs/document-intelligence", label: "Document Intelligence", description: "Extract insights from PDFs", icon: FileText },
      { href: "/labs/data-analyzer", label: "Data Analyzer", description: "Analyze CSV/Excel files", icon: BarChart3 },
      { href: "/labs/roi-calculator", label: "ROI Calculator", description: "Calculate AI savings", icon: BarChart3 },
      { href: "/labs/code-review", label: "Code Review", description: "AI code analysis", icon: FileText },
    ]
  },
  {
    category: "Creative & Play",
    items: [
      { href: "/labs/ideation", label: "Ideation Lab", description: "AI brainstorming games", icon: Gamepad2 },
      { href: "/labs/sketch-studio", label: "Sketch Studio", description: "AI-enhanced drawing", icon: Palette },
      { href: "/labs/music-studio", label: "Music Studio", description: "Create AI music", icon: Palette },
      { href: "/labs/ad-creator", label: "Ad Creator", description: "Generate social ads", icon: Palette },
    ]
  },
];

export function EnhancedNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);

  return (
    <nav
      id="navigation"
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 min-w-0"
            aria-label="Sprinter AI Home"
          >
            <BrandLogo className="h-8" priority />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
            role="list"
          >
            {NAVIGATION.main.map((item) => {
              const isLabs = item.href === "/labs";
              const isActive = pathname === item.href || (isLabs && pathname.startsWith("/labs"));
              
              if (isLabs) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setLabsDropdownOpen(true)}
                    onMouseLeave={() => setLabsDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        "relative text-sm font-medium transition-colors hover:text-foreground py-2 px-1 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm inline-flex items-center gap-1",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                      aria-expanded={labsDropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                      {isActive && (
                        <motion.div
                          layoutId="navbar-underline"
                          className="absolute -bottom-5 left-0 right-0 h-0.5 bg-brand-gradient"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {labsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-[600px] rounded-xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                              {labsSubmenu.map((category) => (
                                <div key={category.category}>
                                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                                    {category.category}
                                  </h3>
                                  <ul className="space-y-2">
                                    {category.items.map((subItem) => (
                                      <li key={subItem.href}>
                                        <Link
                                          href={subItem.href}
                                          className={cn(
                                            "group flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors",
                                            "featured" in subItem && subItem.featured && "ring-1 ring-yellow-500/30 bg-yellow-500/5"
                                          )}
                                        >
                                          <subItem.icon className={cn(
                                            "w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-brand",
                                            "featured" in subItem && subItem.featured && "text-yellow-500"
                                          )} />
                                          <div className="flex-1">
                                            <div className="font-medium text-sm group-hover:text-foreground flex items-center gap-2">
                                              {subItem.label}
                                              {"featured" in subItem && subItem.featured && (
                                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-500 text-black font-semibold">
                                                  NEW
                                                </span>
                                              )}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                              {subItem.description}
                                            </div>
                                          </div>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-border">
                              <Link
                                href="/labs"
                                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
                              >
                                View all AI Labs
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-foreground py-2 px-1 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && !item.href.includes("/labs") && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-5 left-0 right-0 h-0.5 bg-brand-gradient"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-card/10 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="space-y-1" role="list">
                {NAVIGATION.main.map((item, index) => {
                  const isLabs = item.href === "/labs";
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      role="listitem"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/5 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                          pathname === item.href || (isLabs && pathname.startsWith("/labs"))
                            ? "text-foreground bg-card/10"
                            : "text-muted-foreground"
                        )}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                      
                      {isLabs && (
                        <div className="ml-4 mt-2 space-y-1">
                          <Link
                            href="/labs/opportunity-audit"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-card/5 rounded-lg"
                          >
                            <span className="text-yellow-500">★</span> AI Opportunity Audit
                          </Link>
                          <Link
                            href="/labs/agent-simulator"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-card/5 rounded-lg"
                          >
                            Agent Simulator
                          </Link>
                          <Link
                            href="/labs/ideation"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-card/5 rounded-lg"
                          >
                            Ideation Games
                          </Link>
                          <Link
                            href="/labs"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-4 text-sm font-medium text-brand hover:text-brand/80"
                          >
                            View all Labs →
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}