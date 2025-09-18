/**
 * Server Component for preloading tool data
 * This component fetches data on the server and passes it to client components
 */

import { preloadToolData } from "../server/preload-service";
import { ToolContextBridge } from "./tool-context-bridge";

interface ToolPreloadProviderProps {
  children: React.ReactNode;
  /**
   * Optional render mode for different contexts
   * - "page": Standalone tool page (default)
   * - "chat": Within AI chat interface
   * - "artifact": As generated artifact
   */
  renderMode?: "page" | "chat" | "artifact";
}

export async function ToolPreloadProvider({
  children,
  renderMode = "page"
}: ToolPreloadProviderProps) {
  // Fetch all tool data on the server
  const preloadedData = await preloadToolData();

  // Pass the preloaded data to the client bridge component
  return (
    <ToolContextBridge
      preloadedData={preloadedData}
      renderMode={renderMode}
    >
      {children}
    </ToolContextBridge>
  );
}