"use client";

import { LinkPreview } from "@/components/ui/link-preview";

interface EnhancedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function EnhancedLink({ href, children, className }: EnhancedLinkProps) {
  // Only use LinkPreview for external links
  if (href.startsWith("http")) {
    return (
      <LinkPreview url={href} className={className}>
        {children}
      </LinkPreview>
    );
  }

  // Regular link for internal navigation
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}