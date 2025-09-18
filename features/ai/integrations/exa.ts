type ExaSearchOptions = {
  numResults?: number;
  site?: string;
  type?: "news" | "web";
  includeDomains?: string[];
  excludeDomains?: string[];
};

type ExaApiResult = {
  url: string;
  title?: string;
  text?: string;
  snippet?: string;
  publishedDate?: string;
  id?: string;
  score?: number;
  highlights?: string[];
};

export type WebSearchResult = {
  title: string;
  url: string;
  snippet?: string;
  publishedAt?: string;
  score?: number;
};

export async function exaSearch(
  query: string,
  opts: ExaSearchOptions = {}
): Promise<WebSearchResult[]> {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) {
    return [];
  }

  // EXA REST API endpoint
  const endpoint = "https://api.exa.ai/search";

  // Build request body
  const body: any = {
    query: opts.site ? `${query} site:${opts.site}` : query,
    numResults: opts.numResults ?? 5,
    text: true, // Include text snippets
    highlights: true // Include highlights
  };

  if (opts.type) body.type = opts.type;
  if (opts.includeDomains?.length) body.includeDomains = opts.includeDomains;
  if (opts.excludeDomains?.length) body.excludeDomains = opts.excludeDomains;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body),
    // Timeouts are not native; rely on platform defaults
    cache: "no-store"
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Exa API error (${res.status}):`, errorText);
    return [];
  }

  const data = (await res.json()) as { results?: ExaApiResult[] };
  const items = data.results ?? [];
  return items.map(r => ({
    title: r.title || r.url,
    url: r.url,
    snippet:
      r.snippet || r.text || (r.highlights && r.highlights[0]) || undefined,
    publishedAt: r.publishedDate,
    score: r.score
  }));
}
