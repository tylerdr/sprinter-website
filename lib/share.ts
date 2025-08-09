export type LabState = Record<string, unknown>;

export function encodeState(state: LabState) {
  const json = JSON.stringify(state);
  return typeof window === "undefined" ? "" : window.btoa(encodeURIComponent(json));
}

export function decodeState(param?: string | null): LabState {
  if (!param) return {};
  try { 
    return JSON.parse(decodeURIComponent(window.atob(param))); 
  } catch { 
    return {}; 
  }
}

export function buildShareUrl(slug: string, state?: LabState) {
  const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://sprinter.ai'}/labs/${slug}`);
  if (state && Object.keys(state).length) {
    url.searchParams.set("s", encodeState(state));
  }
  return url.toString();
}

export function buildEmbedUrl(slug: string, state?: LabState) {
  const url = new URL(buildShareUrl(slug, state));
  url.searchParams.set("embed", "1");
  return url.toString();
}