"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { MessageSquare } from "lucide-react";

interface SidebarAgentLink {
  slug: string;
  name: string;
  icon?: string;
  primaryImagePath?: string;
  secondaryImagePath?: string;
  href: string;
  description?: string | null;
}

export interface MobileAgentNavProps {
  sidebarAgentLinks: SidebarAgentLink[];
}

export default function MobileAgentNav({
  sidebarAgentLinks
}: MobileAgentNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentAgent = searchParams.get("agent");
  const isChatRoute = pathname?.startsWith("/chat");

  return (
    <div className="w-full flex flex-col">
      <div className="text-xs font-medium text-muted-foreground mb-2">
        Available Agents
      </div>
      {sidebarAgentLinks.map(a => {
        const isActive = Boolean(isChatRoute && currentAgent === a.slug);
        const base =
          "w-full text-xs flex items-center gap-3 px-3 py-2 rounded-md transition-all relative group";
        const activeClass = isActive
          ? "bg-muted text-primary font-semibold"
          : "text-muted-foreground hover:text-primary hover:bg-accent";
        return (
          <Link
            key={a.slug}
            href={a.href}
            className={`${base} ${activeClass}`}
            aria-label={a.name}
            title={a.name}
          >
            {a.secondaryImagePath ? (
              <Image
                src={a.secondaryImagePath}
                alt={a.name}
                width={16}
                height={16}
                className="h-4 w-4"
              />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
            <span className="truncate">{a.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
