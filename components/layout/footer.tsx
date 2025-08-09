import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { COMPANY_INFO, SOCIAL_LINKS, NAVIGATION } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-background border-t border-border/10"
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo-no-background.png"
                alt="Sprinter Consulting logo"
                width={160}
                height={36}
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {COMPANY_INFO.tagline}. One intelligent sprint at a time.
            </p>
            <div
              className="flex space-x-4"
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
          </div>

          {/* Products Links */}
          <nav aria-label="Products">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.products.map((link) => (
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

          {/* Services Links */}
          <nav aria-label="Services">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.services.map((link) => (
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

          {/* Resources Links */}
          <nav aria-label="Resources">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.resources.map((link) => (
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

          {/* Company Links */}
          <nav aria-label="Company">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.company.map((link) => (
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
        </div>

        {/* Call to Action */}
        <div className="border-t border-border/10 mt-8 pt-8 text-center">
          <Link
            href="/contact"
            className="px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation text-sm inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
          >
            Start Building
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}