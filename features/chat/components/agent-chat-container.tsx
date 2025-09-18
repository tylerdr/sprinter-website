import type { AgentConfig } from "@/features/agents/registry";
import { UserProfileWithCurrentTenant } from "@/lib/profiles";
import { createClient } from "@/lib/supabase/server";
import { checkSystemAdmin } from "@/utils/checkUserPermissions";
import { agentRegistry } from "@/features/agents/registry";
import { DEFAULT_AGENT_ID } from "@/features/ai";
import AgentChatWrapper from "./agent-chat-wrapper";
import { TenantAgentEntitlements } from "@/features/chat/lib/access/access";
import { logger } from "@/lib/logger";
import { redirect } from "next/navigation";
import { createOrAttachEntityAction } from "@/features/entities/server/actions";

interface AgentChatContainerProps {
  chatId: string;
  agentSlug?: string;
  entitlements: TenantAgentEntitlements;
  userProfile: UserProfileWithCurrentTenant;
}

export default async function AgentChatContainer({
  chatId,
  agentSlug,
  entitlements,
  userProfile
}: AgentChatContainerProps) {
  const isSystemAdmin = checkSystemAdmin(userProfile);

  let chatAgentId: string | undefined;
  let aiChat: any;
  let entityId: string | undefined;

  try {
    if (chatId !== "new") {
      const supabase = await createClient();

      const { data } = await supabase
        .from("ai_chats")
        .select(
          "id, created_by, messages:ai_messages(id,role,parts,metadata,created_at), agent_id, workspace_id"
        )
        .eq("id", chatId)
        .single();
      aiChat = data;
      entityId = data?.workspace_id ?? undefined;

      if (aiChat) {
        if (!isSystemAdmin && aiChat.created_by !== userProfile?.id) {
          redirect(`/chat/new`);
        }
        chatAgentId = aiChat.agent_id || undefined;
      } else {
        const numericChatId = parseInt(chatId, 10);
        if (!isNaN(numericChatId)) {
          const { data: existingChat } = await supabase
            .from("queries")
            .select("id")
            .eq("id", numericChatId)
            .single();
          if (!existingChat) throw new Error("NOT_FOUND");
        } else {
          throw new Error("NOT_FOUND");
        }
      }
    } else {
      // For new chats, create an entity that will be bound when chat is created
      const { entityId: newEntityId } = await createOrAttachEntityAction({
        typeSlug: 'loan_scenario',
        title: `Chat - ${new Date().toLocaleDateString()}`,
        initialState: {}
      });
      entityId = newEntityId;
    }

    await agentRegistry.initialize({
      loadFromDatabase: true,
      tenantId: userProfile?.current_tenant?.id
    });

    const allAgents = agentRegistry.getAllAgents();
    const chatAgent = allAgents.find(agent => agent.id === chatAgentId);
    const availableAgents: AgentConfig[] = allAgents
      .filter(agent => {
        return (
          agent.isActive !== false &&
          (!agent.tenantId ||
            agent.tenantId === userProfile?.current_tenant?.id) &&
          entitlements.allowedAgentSlugs.includes(agent.slug)
        );
      })
      .sort((a, b) => {
        if (a.id === DEFAULT_AGENT_ID) return -1;
        if (b.id === DEFAULT_AGENT_ID) return 1;
        return 0;
      });

    // Determine if the original chat agent is no longer allowed for this user/tenant
    const originalAgentDisallowed = Boolean(
      chatAgentId &&
        !entitlements.allowedAgentSlugs.includes(chatAgent?.slug || "")
    );

    const defaultAgentId =
      chatAgentId ||
      (availableAgents.length > 0 ? availableAgents[0].id : DEFAULT_AGENT_ID);

    return (
      <AgentChatWrapper
        authData={{
          userId: userProfile.id,
          inputLocked: originalAgentDisallowed,
          inputLockMessage: originalAgentDisallowed
            ? `You no longer have access to the ${chatAgent?.name || "selected"} agent. Start a new scenario with an available agent.`
            : undefined,
          workspaceId: entityId
        }}
        initialMessages={aiChat?.messages}
        agentId={defaultAgentId}
        apiEndpoint="/api/chat"
        sessionId={chatId}
        showHeader={false}
        className="border-0 rounded-none w-full max-w-full"
        availableAgents={availableAgents}
        enableAgentSwitching={
          availableAgents.length > 1 && !aiChat?.messages?.length
        }
      />
    );
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      logger.warn("[CHAT] Chat container not found", {
        chatId,
        agentSlug,
        userId: userProfile?.id,
        tenantId: userProfile?.current_tenant?.id
      });
      throw error;
    }

    logger.error("[CHAT] Failed to render AgentChatContainer", {
      error,
      chatId,
      agentSlug,
      userId: userProfile?.id,
      tenantId: userProfile?.current_tenant?.id,
      isSystemAdmin
    });
    throw error;
  }
}
