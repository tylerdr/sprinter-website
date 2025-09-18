import { NavigationLoadingProvider } from "@/features/chat/providers/navigation-loading-context";
import { AgentChat, type AgentChatProps } from "./agent-chat";
import AgentChatHistorySidebar from "./agent-chat-sidebar/agent-chat-history-sidebar";
import { NavLoadingOverlay } from "@/features/chat/components/nav-loading-overlay";

export default function AgentChatWrapper(props: AgentChatProps) {
  return (
    <NavigationLoadingProvider>
      <div className="flex h-[calc(100dvh-57px)] w-full overflow-x-hidden overflow-y-auto">
        <AgentChatHistorySidebar />

        <div className="flex-1 min-w-0 relative">
          <NavLoadingOverlay />
          <AgentChat {...props} />
        </div>
      </div>
    </NavigationLoadingProvider>
  );
}
