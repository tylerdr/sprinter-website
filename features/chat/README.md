# Chat Module

Unified AI chat with streaming, tools, and inline citations (AI SDK v5 Elements).

## Key Files

- `components/agent-chat.tsx` – main chat UI (uses `@ai-sdk/react` `useChat`)
- `components/message-with-citations.tsx` – renders markdown and inline citation markers `[n]` using Elements `InlineCitation`
- `components/sources.tsx` – renders a list of `source-url` UI parts (per-message sources)
- `components/tool-result-renderer.tsx` – maps tool outputs to UI using `features/tools/ui-registry`
- `lib/chat-utils.ts` – server-side streaming with AI SDK, tool execution, and source part injection
- `types.ts` – shared types used by chat features

## How Citations Currently Work

- The system prompt instructs models to include inline citations using `[n]` markers. See `features/ai/citations/prompts.ts#getAgentCitationPrompt`.
- On the server, `createStreamingChatResponse` streams the model output and injects UI message parts of type `source-url` for each tool result that contains citation-like metadata (title/url/page). These render at the top of assistant messages via `components/sources.tsx`.
- On the client, `MessageWithCitations` parses `[n]` markers from text using `features/ai/citations/extractor.ts` and renders interactive inline badges with `InlineCitation` Elements. It can enrich markers with metadata if the message supplies `metadata.citations` or if the client populates a `messageCitations` map.

Known gap: the server does not currently attach a `citation` UI part nor populate `message.metadata.citations`. As a result, inline markers may render without rich card data unless the model embeds enough info in the text itself or a tool emits compatible metadata.

## Server Streaming Overview

`features/chat/lib/chat-utils.ts`:
- Normalizes client messages to `UIMessage[]` and calls `streamText` with tools.
- When a tool result appears, extracts citation-like entries and injects `source-url` parts into the same assistant message stream:
  - `{ type: 'source-url', url, title, description, metadata: { number, source, pageNumber, documentId, ... } }`
- Returns `createUIMessageStreamResponse({ stream })` to the client.

## Client Rendering Overview

- Assistant messages render in-order parts: `text`, `reasoning`, `tool-*`, `file`, `web-preview`, and `source-url` (shown as a Sources block before content).
- Inline citations: `MessageWithCitations` looks for `[n]` markers and, when citation data is available, wraps them with `InlineCitation` Elements for hover cards and carousels.
- Tool results are rendered via `ToolResultRenderer` using a dynamic UI registry.

## Why Citations May Not Show Richly

- Inline citation metadata is not yet included in message metadata or as `citation` UI parts; only `source-url` parts are injected. Without attached metadata, `[n]` markers fall back to plain superscripts.
- Legacy docs and tests reference selectors like `.citation-marker` or `data-source` that are not present in the current Elements-based implementation.

## Next Steps (High-level)

1) Server: emit `citation` UI parts or populate `message.metadata.citations` by correlating `[n]` markers to `source-url` entries (see TODO/FIX_CITATIONS_HANDLING.md).
2) Client: register streamed `source-url` parts into the `messageCitations` map so `MessageWithCitations` can enrich `[n]` markers without waiting for metadata.
3) Add non-invasive data attributes for E2E (e.g., `class="citation-marker"` on `InlineCitationCardTrigger` and `data-source` on source items) or update tests.
4) Keep prompts strict about inline `[n]` and avoid trailing “Citations:” blocks.

See the AI SDK Elements docs for references:
- Chatbot example: https://ai-sdk.dev/elements/examples/chatbot
- Inline Citation: https://ai-sdk.dev/elements/components/inline-citation
- Sources: https://ai-sdk.dev/elements/components/sources
