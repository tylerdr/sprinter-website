import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { COMPANY_INFO, SOCIAL_LINKS, NAVIGATION } from "@/lib/constants";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

const footerSections: Array<{
  title: string;
  links: { href: string; label: string }[];
  ariaLabel: string;
}> = [
  {
    title: "Programs",
    links: NAVIGATION.footer.products,
    ariaLabel: "Programs",
  },
  {
    title: "Solutions",
    links: NAVIGATION.footer.solutions,
    ariaLabel: "Solutions",
  },
  {
    title: "Resources",
    links: NAVIGATION.footer.resources,
    ariaLabel: "Resources",
  },
  {
    title: "Company",
    links: NAVIGATION.footer.company,
    ariaLabel: "Company",
  },
  {
    title: "Legal",
    links: NAVIGATION.footer.legal,
    ariaLabel: "Legal",
  },
  {
    title: "Trust Center",
    links: NAVIGATION.footer.trust,
    ariaLabel: "Trust Center",
  },
];

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-background border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo-no-background.png"
                alt="Sprinter AI logo"
                width={160}
                height={36}
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {COMPANY_INFO.tagline}
            </p>
            <div className="text-xs text-muted-foreground">
              <p>{COMPANY_INFO.location.city}, {COMPANY_INFO.location.state}</p>
              <p>{COMPANY_INFO.email}</p>
            </div>
            <div className="flex space-x-4 mt-4" role="list" aria-label="Social media links">
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

          {footerSections
            .filter((section) => section.links && section.links.length > 0)
            .map((section) => (
              <nav key={section.title} aria-label={section.ariaLabel}>
                <h3 className="text-foreground font-semibold mb-3 sm:mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
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
            ))}

          {/* Newsletter Signup */}
          <div className="sm:col-span-2 lg:col-span-2">
            <NewsletterSignup
              variant="footer"
              title="AI Insights Newsletter"
              description="Get weekly case studies, AI implementation guides, and industry insights delivered to your inbox."
              placeholder="your@company.com"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="border-t border-border/30 mt-8 pt-8 text-center">
          <Link
            href="/contact"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all touch-manipulation text-sm inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
          >
            Run the 10-Day Portfolio Sprint
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/30 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built in the USA. Designed for operating partners and PE-backed teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
