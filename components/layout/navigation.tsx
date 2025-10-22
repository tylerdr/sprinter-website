"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Menu, X, ChevronDown, Sparkles, Trophy, Rocket, ArrowRight,
  Calculator, Zap, Truck, Users, Grid3x3, BarChart3, BookOpen,
  Factory, Heart, Building, Play, ClipboardCheck, Newspaper, Shield,
  LogIn
} from "lucide-react";
import { useState } from "react";
import { NAVIGATION } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/logo/BrandLogo";
import { NavigationAuth } from "./navigation-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set());

  const toggleMobileItem = (href: string) => {
    const newExpanded = new Set(expandedMobileItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedMobileItems(newExpanded);
  };

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
          <div className="hidden md:flex items-center gap-3">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVIGATION.main.map((item) => {
                  const hasDropdown = "dropdown" in item && item.dropdown;
                  const dropdownItems = "items" in item && item.items ? item.items :
                                       "dropdown" in item && item.dropdown ? item.dropdown : [];

                  return (
                    <NavigationMenuItem key={item.href}>
                      {hasDropdown ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              "h-9 px-3 py-2 text-sm font-semibold transition-all duration-200",
                              "hover:text-foreground data-[state=open]:text-foreground",
                              "data-[state=open]:bg-accent/30",
                              pathname.startsWith(item.href)
                                ? "text-foreground"
                                : "text-muted-foreground/90"
                            )}
                          >
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className={cn(
                              "grid gap-1 p-3",
                              item.label === "Solutions" ? "w-[700px] grid-cols-2" :
                              item.label === "Results" ? "w-[600px] grid-cols-1" :
                              "w-[500px] grid-cols-1"
                            )}>
                              {dropdownItems?.map((subItem) => {
                                const getIcon = () => {
                                  if (!("icon" in subItem)) return null;
                                  switch(subItem.icon) {
                                    case "rocket": return Rocket;
                                    case "trophy": return Trophy;
                                    case "calculator": return Calculator;
                                    case "zap": return Zap;
                                    case "truck": return Truck;
                                    case "handshake": return Users;
                                    case "grid": return Grid3x3;
                                    case "chart": return BarChart3;
                                    case "book": return BookOpen;
                                    case "factory": return Factory;
                                    case "heart": return Heart;
                                    case "bank": return Building;
                                    case "play": return Play;
                                    case "clipboard": return ClipboardCheck;
                                    case "newspaper": return Newspaper;
                                    case "shield": return Shield;
                                    default: return null;
                                  }
                                };
                                const IconComponent = getIcon();
                                const isFeatured = "featured" in subItem && subItem.featured === true;
                                const badge = "badge" in subItem && typeof subItem.badge === 'string' ? subItem.badge : null;

                                return (
                                  <li key={subItem.href} className={cn(
                                    isFeatured && item.label === "Solutions" ? "col-span-2" : "",
                                    isFeatured && item.label === "Results" ? "col-span-1" : "",
                                    isFeatured && item.label === "Resources" ? "col-span-1" : ""
                                  )}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={subItem.href}
                                        className={cn(
                                          "group relative flex select-none gap-3 rounded-xl px-3 py-3 leading-none no-underline outline-none transition-all duration-200",
                                          "hover:bg-accent/50 hover:shadow-md",
                                          "focus:bg-accent focus:shadow-md",
                                          pathname === subItem.href && "bg-accent/30",
                                          isFeatured && "bg-gradient-to-br from-primary/5 via-transparent to-transparent border border-primary/10 hover:border-primary/20"
                                        )}
                                      >
                                        {IconComponent && (
                                          <div className={cn(
                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                                            isFeatured ? "bg-primary/10 group-hover:bg-primary/20" : "bg-muted/50 group-hover:bg-muted"
                                          )}>
                                            <IconComponent className={cn(
                                              "h-5 w-5 transition-all duration-200",
                                              isFeatured ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                            )} />
                                          </div>
                                        )}
                                        <div className="flex flex-col gap-0.5 flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold leading-none text-foreground">
                                              {subItem.label}
                                            </span>
                                            {badge && (
                                              <span className={cn(
                                                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                                                isFeatured ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                                              )}>
                                                {badge}
                                              </span>
                                            )}
                                          </div>
                                          {"description" in subItem && subItem.description ? (
                                            <p className="line-clamp-1 text-xs leading-snug text-muted-foreground mt-0.5">
                                              {String(subItem.description)}
                                            </p>
                                          ) : null}
                                        </div>
                                        {isFeatured && (
                                          <ArrowRight className="h-4 w-4 shrink-0 text-primary/60 transition-transform duration-200 group-hover:translate-x-0.5" />
                                        )}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "h-9 px-3 py-2 text-sm font-semibold",
                              pathname === item.href
                                ? "text-foreground bg-accent/40"
                                : "text-muted-foreground/90 hover:text-foreground hover:bg-accent/30"
                            )}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-border/30">
              <ThemeToggle />
              <NavigationAuth />
              {NAVIGATION.ctas && NAVIGATION.ctas.map((cta) => {
                const IconComponent = "icon" in cta && cta.icon === "sparkles" ? Sparkles : ArrowRight;
                return (
                  <Link
                    key={cta.href}
                    href={cta.href}
                  >
                    <Button
                      variant={cta.variant}
                      size="default"
                      className={cn(
                        "group relative overflow-hidden transition-all duration-300 px-5",
                        cta.variant === "default" && [
                          "bg-gradient-to-r from-primary via-primary to-primary/90",
                          "hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]",
                          "border border-primary/20",
                          "text-primary-foreground font-semibold"
                        ]
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {cta.label}
                        <IconComponent className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-110" />
                      </span>
                      {cta.variant === "default" && (
                        <>
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/30 to-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                        </>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
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
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="space-y-1" role="list">
                {NAVIGATION.main.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    role="listitem"
                  >
                    {"dropdown" in item && item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleMobileItem(item.href)}
                          className={cn(
                            "flex items-center justify-between w-full py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                            pathname.startsWith(item.href)
                              ? "text-foreground bg-card/30"
                              : "text-muted-foreground"
                          )}
                          aria-expanded={expandedMobileItems.has(item.href)}
                        >
                          {item.label}
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
                            {(("items" in item && item.items ? item.items :
                              "dropdown" in item && item.dropdown ? item.dropdown : [])).map((dropdownItem) => (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "block py-2 px-4 text-sm transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                                  pathname === dropdownItem.href
                                    ? "text-foreground bg-card/30"
                                    : "text-muted-foreground"
                                )}
                                aria-current={pathname === dropdownItem.href ? "page" : undefined}
                              >
                                {dropdownItem.label}
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
                          "block py-3 px-4 text-base font-medium transition-colors hover:text-foreground hover:bg-card/40 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background",
                          pathname === item.href
                            ? "text-foreground bg-card/30"
                            : "text-muted-foreground"
                        )}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                {NAVIGATION.ctas && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAVIGATION.main.length * 0.05 }}
                    className="flex flex-col gap-2 pt-4 mt-4 border-t border-border"
                  >
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <NavigationAuth />
                      </div>
                      {NAVIGATION.ctas.map((cta) => {
                        const IconComponent = "icon" in cta && cta.icon === "sparkles" ? Sparkles : ArrowRight;
                        return (
                          <Link
                            key={cta.href}
                            href={cta.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-semibold rounded-lg text-center transition-all duration-200 touch-manipulation",
                              "bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground",
                              "hover:shadow-lg active:scale-[0.98]",
                              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                            )}
                          >
                            {cta.label}
                            <IconComponent className="h-3.5 w-3.5" />
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
