import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { COMPANY_INFO, SOCIAL_LINKS, NAVIGATION } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-background border-t border-border/10"
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Zap
                className="w-7 h-7 sm:w-8 sm:h-8 text-brand"
                aria-hidden="true"
              />
              <span className="text-lg sm:text-xl font-bold gradient-text">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {COMPANY_INFO.tagline}. One intelligent sprint at a time.
            </p>
          </div>

          {/* Explore Links */}
          <nav aria-label="Explore">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors block py-1 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors block py-1 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                >
                  Insights
                </Link>
              </li>
            </ul>
          </nav>

          {/* AI Tools Links */}
          <nav aria-label="AI Tools">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
              AI Tools
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.aiTools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors block py-1 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
              Connect
            </h3>
            <div
              className="flex space-x-4 mb-4"
              role="list"
              aria-label="Social media links"
            >
              <a
                href={SOCIAL_LINKS.github}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on GitHub (opens in new window)"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter) (opens in new window)"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with us on LinkedIn (opens in new window)"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                aria-label="Send us an email"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation text-sm min-h-[44px] inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
            >
              Start Building
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
            <span>
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
              reserved.
            </span>
            <span className="hidden sm:inline mx-2">|</span>
            <span className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors touch-manipulation py-1 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
              >
                Privacy Policy
              </Link>
              <span aria-hidden="true">|</span>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors touch-manipulation py-1 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
              >
                Terms of Service
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
