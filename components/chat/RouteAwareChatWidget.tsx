"use client";

import { usePathname } from "next/navigation";
import { ChatWidgetWithErrorBoundary as ChatWidget } from "@/components/chat/ChatWidget";
import { isOfferPagePath } from "@/lib/offer-pages";

export function RouteAwareChatWidget() {
  const pathname = usePathname();
  const shouldSuppress = isOfferPagePath(pathname);

  if (shouldSuppress) {
    return null;
  }

  return <ChatWidget />;
}
