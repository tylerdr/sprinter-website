export interface AgentRouteResolution {
  redirectTo?: string;
  resolvedSlug?: string | null;
}

/**
 * Resolve canonical route behavior for chat agent selection.
 * - If requested slug is not allowed: redirect to single allowed agent or selector.
 * - If no slug and exactly one allowed: redirect to that agent.
 * - Otherwise: proceed (optionally returning the resolved slug if you need it).
 */
export function resolveAgentRoute(
  chatId: string,
  requestedSlug: string | undefined,
  allowedAgentSlugs: string[]
): AgentRouteResolution {
  if (allowedAgentSlugs.length === 0) {
    return { redirectTo: "/" };
  }
  if (chatId === "new") {
    if (requestedSlug && !allowedAgentSlugs.includes(requestedSlug)) {
      if (allowedAgentSlugs.length === 1) {
        return { redirectTo: `/chat/${chatId}?agent=${allowedAgentSlugs[0]}` };
      }
      return { redirectTo: `/chat/${chatId}` };
    }
    if (!requestedSlug && allowedAgentSlugs.length === 1) {
      return { redirectTo: `/chat/${chatId}?agent=${allowedAgentSlugs[0]}` };
    }
  }
  return { resolvedSlug: requestedSlug ?? null };
}
