/**
 * Share utilities for tool results.
 * Provides helpers for generating payloads and copying/share content.
 */

import { copyToClipboard } from "@/lib/utils";

export interface ToolSharePayload {
  slug: string;
  toolName?: string;
  generatedAt: string;
  url?: string;
  input?: unknown;
  output: unknown;
}

export interface BuildToolSharePayloadOptions {
  slug: string;
  toolName?: string;
  url?: string;
  input?: unknown;
  output: unknown;
}

/**
 * Safely stringify values that may include circular references.
 */
function safeStringify(value: unknown, space = 2): string {
  const seen = new WeakSet();

  return JSON.stringify(
    value,
    (_, val) => {
      if (typeof val === "object" && val !== null) {
        if (seen.has(val)) {
          return "[Circular]";
        }
        seen.add(val);
      }
      return val;
    },
    space
  ) ?? "";
}

/**
 * Build a canonical payload for tool result sharing.
 */
export function buildToolSharePayload({
  slug,
  toolName,
  url,
  input,
  output
}: BuildToolSharePayloadOptions): ToolSharePayload {
  return {
    slug,
    toolName,
    url,
    input,
    output,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Generate a markdown summary for sharing tool results.
 */
export function formatToolShareMarkdown(payload: ToolSharePayload): string {
  const heading = `# ${payload.toolName ?? payload.slug} Result Share`;
  const metaLines = [
    `- Tool Slug: ${payload.slug}`,
    `- Shared At: ${new Date(payload.generatedAt).toLocaleString()}`,
    payload.toolName ? `- Tool Name: ${payload.toolName}` : null,
    payload.url ? `- Source URL: ${payload.url}` : null
  ].filter(Boolean);

  const inputBlock = payload.input === undefined || payload.input === null
    ? ""
    : `\n## Input\n\n\`\`\`json\n${safeStringify(payload.input)}\n\`\`\``;

  const outputBlock = `\n## Output\n\n\`\`\`json\n${safeStringify(payload.output)}\n\`\`\``;

  return [heading, "", ...metaLines, inputBlock, outputBlock].filter(Boolean).join("\n");
}

/**
 * Format the payload as prettified JSON for clipboard sharing.
 */
export function formatToolShareJSON(payload: ToolSharePayload): string {
  return safeStringify(payload);
}

/**
 * Copy markdown summary to the clipboard.
 */
export async function copyToolShareMarkdown(payload: ToolSharePayload): Promise<boolean> {
  const markdown = formatToolShareMarkdown(payload);
  return copyToClipboard(markdown);
}

/**
 * Copy JSON summary to the clipboard.
 */
export async function copyToolShareJSON(payload: ToolSharePayload): Promise<boolean> {
  const json = formatToolShareJSON(payload);
  return copyToClipboard(json);
}

/**
 * Use the Web Share API when available, returning true on success.
 * Falls back to false if the API is unavailable or rejects.
 */
export async function shareToolViaNavigator(
  payload: ToolSharePayload,
  options: { preferMarkdown?: boolean } = {}
): Promise<boolean> {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    return false;
  }

  try {
    const text = options.preferMarkdown
      ? formatToolShareMarkdown(payload)
      : formatToolShareJSON(payload);

    await navigator.share({
      title: payload.toolName ?? payload.slug,
      text,
      url: payload.url
    });
    return true;
  } catch {
    return false;
  }
}
