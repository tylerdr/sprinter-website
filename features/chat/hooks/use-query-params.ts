"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Returns a tuple of [value, setValue] bound to a boolean query param.
 * Encoding strategy (symmetric around defaultValue):
 * - If defaultValue === false (common case): store ?key=true when value is true; remove key when false
 * - If defaultValue === true:            store ?key=false when value is false; remove key when true
 * Uses router.replace to avoid history stack spam.
 */
export function useBooleanQueryParam(key: string, defaultValue = false) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = useMemo(() => {
    const v = searchParams.get(key);
    if (!defaultValue) {
      // default = false → explicit true in URL
      if (v === null) return false;
      return v === "true";
    } else {
      // default = true → explicit false in URL
      if (v === null) return true;
      return v !== "false" ? true : false;
    }
  }, [searchParams, key, defaultValue]);

  const setValue = useCallback(
    (next: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!defaultValue) {
        // default = false → store true as ?key=true, remove for false
        if (next) params.set(key, "true");
        else params.delete(key);
      } else {
        // default = true → store false as ?key=false, remove for true
        if (next) params.delete(key);
        else params.set(key, "false");
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname, searchParams, key, defaultValue]
  );

  return [value, setValue] as const;
}

/**
 * Returns a tuple of [value, setValue] bound to a string query param.
 * - When next is a non-empty string, sets ?key=next
 * - When next is empty/null/undefined, removes the key from the URL
 * Uses router.replace to avoid history stack spam.
 */
export function useStringQueryParam(key: string, defaultValue = "") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = useMemo(() => {
    const v = searchParams.get(key);
    return v ?? defaultValue;
  }, [searchParams, key, defaultValue]);

  const setValue = useCallback(
    (next?: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next && next.length > 0) params.set(key, next);
      else params.delete(key);
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname, searchParams, key]
  );

  return [value, setValue] as const;
}
