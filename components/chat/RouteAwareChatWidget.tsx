"use client";

import { usePathname } from "next/navigation";
import { ChatWidgetWithErrorBoundary as ChatWidget } from "@/components/chat/ChatWidget";

const SUPPRESSED_PATH_PREFIXES = ["/ai-sprint", "/accelerate", "/fractional"];

export function RouteAwareChatWidget() {
  const pathname = usePathname();
  const shouldSuppress = SUPPRESSED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (shouldSuppress) {
    return null;
  }

  return <ChatWidget />;
}
