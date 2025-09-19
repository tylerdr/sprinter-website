"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Palette } from "lucide-react";
import { useState, useCallback } from "react";
import { BrandLogo } from "@/components/logo/BrandLogo";
import { NavigationAuth } from "./navigation-auth";
import dynamic from "next/dynamic";

const ThemeStudio = dynamic(
  () => import("@/components/design/ThemeStudio").then(mod => mod.ThemeStudio),
  { ssr: false }
);
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  getNavigationConfig,
  type NavItem,
  type NavSection,
  type NavFeature,
} from "@/lib/navigation-config";


function MegaMenuContent({ item, onAction }: { item: NavItem; onAction?: (item: NavItem) => void }) {
  return (
    <NavigationMenuContent>
      <ul className="grid w-[600px] gap-3 p-4 md:w-[700px] md:grid-cols-3 lg:w-[800px]">
        {item.featured && (
          <li className="col-span-full">
            <NavigationMenuLink asChild>
              <Link
                href={item.featured.href}
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
              >
                <div className="mb-2 text-lg font-medium">
                  {item.featured.title}
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  {item.featured.description}
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        )}
        {item.sections?.map((section) =>
          section.items.map((subItem) => (
            <li key={subItem.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={subItem.href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">{subItem.label}</div>
                  {subItem.description && (
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                      {subItem.description}
                    </p>
                  )}
                </Link>
              </NavigationMenuLink>
            </li>
          ))
        )}
      </ul>
    </NavigationMenuContent>
  );
}

function StandardMenuContent({ items, onAction }: { items: NavItem[]; onAction?: (item: NavItem) => void }) {
  return (
    <NavigationMenuContent>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">{item.label}</div>
                {item.description && (
                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </NavigationMenuContent>
  );
}

export function EnhancedNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set());
  const [themeStudioOpen, setThemeStudioOpen] = useState(false);
  const config = getNavigationConfig();

  const toggleMobileItem = (href: string) => {
    const newExpanded = new Set(expandedMobileItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedMobileItems(newExpanded);
  };

  const handleNavAction = useCallback((item: NavItem) => {
    // Handle navigation actions if needed
  }, []);

  return (
    <>
      <nav
        id="navigation"
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-2xl border-b border-border/50"
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
            <div className="hidden md:flex items-center gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {config.main.map((item) => {
                    const isMega = item.type === "mega";
                    const isDropdown = item.type === "dropdown" || isMega;

                    return (
                      <NavigationMenuItem key={item.href}>
                        {isDropdown ? (
                          <>
                            <NavigationMenuTrigger
                              className={cn(
                                "h-9 px-3 py-2 text-sm font-medium gap-1.5",
                                pathname.startsWith(item.href)
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {item.icon && <item.icon className="h-3.5 w-3.5" />}
                              {item.label}
                            </NavigationMenuTrigger>
                            {isMega ? (
                              <MegaMenuContent item={item} onAction={handleNavAction} />
                            ) : (
                              <StandardMenuContent items={item.items || []} onAction={handleNavAction} />
                            )}
                          </>
                        ) : (
                          <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "h-9 px-3 py-2 text-sm font-medium gap-1.5",
                                pathname === item.href
                                  ? "text-foreground bg-accent/50"
                                  : "text-muted-foreground"
                              )}
                            >
                              {item.icon && <item.icon className="h-3.5 w-3.5" />}
                              {item.label}
                            </NavigationMenuLink>
                          </Link>
                        )}
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center gap-2 ml-2">
                {config.ctas.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2",
                      cta.variant === "outline"
                        ? "border border-border hover:bg-accent hover:text-accent-foreground"
                        : cta.variant === "gradient"
                        ? "bg-brand-gradient text-primary-foreground hover:opacity-90 shadow-lg shadow-brand/20"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {cta.icon && <cta.icon className="h-3.5 w-3.5" />}
                    {cta.label}
                  </Link>
                ))}
                <NavigationAuth />
                <button
                  onClick={() => setThemeStudioOpen(true)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="Open theme studio"
                >
                  <Palette className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setThemeStudioOpen(true)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Open theme studio"
              >
                <Palette className="h-4 w-4" />
              </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-card/30 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
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
              className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border overflow-hidden"
              id="mobile-navigation"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="container mx-auto px-4 sm:px-6 py-4">
                <div className="space-y-1" role="list">
                  {config.main.map((item, index) => {
                    const hasDropdown = item.type === "dropdown" || item.type === "mega";
                    const dropdownItems = item.type === "mega"
                      ? item.sections?.flatMap(s => s.items) || []
                      : item.items || [];

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        role="listitem"
                      >
                        {hasDropdown ? (
                          <div>
                            <button
                              onClick={() => {
                                if (item.label === "Design" && item.items?.find(i => i.label === "Theme Studio")) {
                                  setThemeStudioOpen(true);
                                  setMobileMenuOpen(false);
                                } else {
                                  toggleMobileItem(item.href);
                                }
                              }}
                              className={cn(
                                "flex items-center justify-between w-full py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-background",
                                pathname.startsWith(item.href)
                                  ? "text-foreground bg-card/30"
                                  : "text-muted-foreground"
                              )}
                              aria-expanded={expandedMobileItems.has(item.href)}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon && <item.icon className="h-4 w-4" />}
                                {item.label}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  expandedMobileItems.has(item.href) && "rotate-180"
                                )}
                              />
                            </button>
                            {expandedMobileItems.has(item.href) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-1"
                              >
                                {dropdownItems.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.href}
                                    href={dropdownItem.href}
                                    onClick={(e) => {
                                      if (dropdownItem.type === "action" && dropdownItem.label === "Theme Studio") {
                                        e.preventDefault();
                                        setThemeStudioOpen(true);
                                        setMobileMenuOpen(false);
                                      } else {
                                        setMobileMenuOpen(false);
                                      }
                                    }}
                                    className={cn(
                                      "flex items-center gap-2 py-2 px-4 text-sm transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-background",
                                      pathname === dropdownItem.href
                                        ? "text-foreground bg-card/30"
                                        : "text-muted-foreground"
                                    )}
                                    aria-current={pathname === dropdownItem.href ? "page" : undefined}
                                  >
                                    {dropdownItem.icon && <dropdownItem.icon className="h-3.5 w-3.5" />}
                                    <span className="flex-1">{dropdownItem.label}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-2 py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-background",
                              pathname === item.href
                                ? "text-foreground bg-card/30"
                                : "text-muted-foreground"
                            )}
                            aria-current={pathname === item.href ? "page" : undefined}
                          >
                            {item.icon && <item.icon className="h-4 w-4" />}
                            {item.label}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                  {config.ctas && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: config.main.length * 0.05 }}
                      className="flex flex-col gap-2 pt-4 border-t border-border"
                    >
                      {config.ctas.map((cta) => (
                        <Link
                          key={cta.href}
                          href={cta.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-center gap-2 py-3 px-4 text-base font-medium rounded-lg text-center transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-background",
                            cta.variant === "outline"
                              ? "border border-border hover:bg-accent hover:text-accent-foreground"
                              : cta.variant === "gradient"
                              ? "bg-brand-gradient text-primary-foreground hover:opacity-90"
                              : "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                        >
                          {cta.icon && <cta.icon className="h-4 w-4" />}
                          {cta.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ThemeStudio open={themeStudioOpen} onOpenChange={setThemeStudioOpen} />
    </>
  );
}