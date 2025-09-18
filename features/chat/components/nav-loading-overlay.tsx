"use client";
import { Loader2 } from "lucide-react";
import { useNavigationLoading } from "@/features/chat/providers/navigation-loading-context";
import { useEffect, useRef, useState } from "react";

const ENTER_DELAY_MS = 120; // avoid flash on ultra-fast navigations
const MIN_VISIBLE_MS = 250; // keep visible briefly so it feels smooth

export function NavLoadingOverlay() {
  const { isNavigating } = useNavigationLoading();
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const visibleSinceRef = useRef<number | null>(null);

  useEffect(() => {
    if (isNavigating) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      if (!visible) {
        showTimerRef.current = window.setTimeout(() => {
          setVisible(true);
          visibleSinceRef.current = Date.now();
        }, ENTER_DELAY_MS);
      }
    } else {
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      if (visible) {
        const elapsed = visibleSinceRef.current
          ? Date.now() - visibleSinceRef.current
          : MIN_VISIBLE_MS;
        const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
        hideTimerRef.current = window.setTimeout(() => {
          setVisible(false);
          visibleSinceRef.current = null;
        }, remaining);
      }
    }

    return () => {
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [isNavigating, visible]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        "absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-150 " +
        (visible
          ? "opacity-100 pointer-events-auto bg-background/40 backdrop-blur-sm"
          : "opacity-0 pointer-events-none")
      }
    >
      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      <span className="sr-only">Navigating</span>
    </div>
  );
}
