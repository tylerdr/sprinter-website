"use client";
import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMergedQueryNav } from "@/features/chat/hooks/use-merged-query-nav";
import { useNavigationLoading } from "@/features/chat/providers/navigation-loading-context";

export function useNavWithLoading() {
  const {
    build,
    push: mergedPush,
    replace: mergedReplace
  } = useMergedQueryNav();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setNavigating } = useNavigationLoading();

  useEffect(
    () => setNavigating(false),
    [pathname, searchParams, setNavigating]
  );

  /**
   * Check if the target path is the same as current location
   */
  const isSamePath = useCallback(
    (targetPath: string) => {
      // Normalize paths by removing trailing slashes
      const normalizedCurrent = pathname.replace(/\/$/, "") || "/";
      const normalizedTarget = targetPath.replace(/\/$/, "") || "/";
      return normalizedCurrent === normalizedTarget;
    },
    [pathname]
  );

  const push = useCallback(
    (params: { path: string; extra?: string | Record<string, unknown> }) => {
      const { path, extra } = params;

      // Skip loading state if navigating to the same path
      if (isSamePath(path)) {
        mergedPush(path, extra);
        return;
      }

      setNavigating(true);
      mergedPush(path, extra);
    },
    [mergedPush, setNavigating, isSamePath]
  );

  const replace = useCallback(
    (params: {
      path: string;
      extra?: string | Record<string, unknown>;
      disableLoading?: boolean;
    }) => {
      const { path, extra } = params;

      // Skip loading state if navigating to same path or explicitly disabled
      if (params.disableLoading || isSamePath(path)) {
        mergedReplace(path, extra);
        return;
      }

      setNavigating(true);
      mergedReplace(path, extra);
    },
    [mergedReplace, setNavigating, isSamePath]
  );

  return { build, push, replace };
}
