"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * AgentChatHeader
 *
 * A sleek, reusable header for chat surfaces.
 * - Left: optional icon, title, and small description stacked
 * - Right: optional actions (buttons, toggles, etc.)
 */
export interface AgentChatHeaderProps {
  /** Main heading text */
  title?: string;
  /** Optional supporting description under the title */
  description?: string;
  /** Optional leading icon (e.g., agent badge) */
  icon?: ReactNode;
  /** Optional right-side actions */
  actions?: ReactNode;
  /** Additional className overrides */
  className?: string;
}

/**
 * Renders a modern chat header with subtle background and border.
 */
export function AgentChatHeader({
  title,
  description,
  icon,
  actions,
  className
}: AgentChatHeaderProps) {
  return (
    <div
      className={cn(
        "w-full border-b bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50",
        "px-4 py-3 md:px-5 md:py-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {icon ? (
            <div
              className={cn(
                "size-8 rounded-md grid place-items-center",
                "bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white",
                "dark:from-indigo-500 dark:to-fuchsia-500"
              )}
              aria-hidden
            >
              {icon}
            </div>
          ) : null}

          <div className="min-w-0">
            {title ? (
              <h3 className="text-sm md:text-base font-semibold truncate">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="text-xs md:text-sm text-muted-foreground truncate">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {actions ? (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
