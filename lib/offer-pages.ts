export const OFFER_PAGE_PATH_PREFIXES = [
  "/ai-sprint",
  "/fractional-ai-cofounder",
  "/fractional-caio",
  "/accelerate",
  "/ai-operating-partner-retainer",
  "/ai-advisor-retainer",
  "/ai-implementation-partner",
  "/ai-scoping-workshop",
  "/ai-partnership",
  "/operating-partner",
  "/sprint",
  "/edge",
] as const;

export function isOfferPagePath(pathname: string): boolean {
  return OFFER_PAGE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
