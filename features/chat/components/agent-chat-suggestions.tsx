"use client";

import { Button } from "@/components/ui/button";

export interface AgentChatSuggestionsProps {
  suggestions: string[];
  onPick: (suggestion: string) => void;
}

/**
 * Simple suggestion chips that wrap to new lines to avoid horizontal overflow.
 */
export default function AgentChatSuggestions({
  suggestions,
  onPick
}: AgentChatSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {suggestions.map((s, i) => (
          <Button
            key={i}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onPick(s)}
            className="rounded-full"
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}
