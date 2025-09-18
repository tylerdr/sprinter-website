"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Hook to navigate while preserving current search params and merging extras.
 * Supports providing extras as a query string or a key/value object.
 */
export function useMergedQueryNav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const build = useCallback(
    (path: string, extra?: string | Record<string, unknown>) => {
      const merged = new URLSearchParams(searchParams.toString());
      if (typeof extra === "string") {
        const extraParams = new URLSearchParams(extra);
        extraParams.forEach((v, k) => merged.set(k, v));
      } else if (extra && typeof extra === "object") {
        Object.entries(extra).forEach(([k, v]) => {
          if (v === undefined || v === null || v === "") merged.delete(k);
          else merged.set(k, String(v));
        });
      }
      const qs = merged.toString();
      return `${path}${qs ? `?${qs}` : ""}`;
    },
    [searchParams]
  );

  const push = useCallback(
    (path: string, extra?: string | Record<string, unknown>) => {
      router.push(build(path, extra));
    },
    [router, build]
  );

  const replace = useCallback(
    (path: string, extra?: string | Record<string, unknown>) => {
      router.replace(build(path, extra));
    },
    [router, build]
  );

  return { build, push, replace };
}
