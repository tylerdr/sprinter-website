import { agentRegistry } from "@/features/agents/registry";
import { getTenantAgentEntitlements } from "@/features/chat/lib/access/access";
import type { UserProfileWithCurrentTenant } from "@/lib/profiles";
import MobileAgentNav from "./mobile-agent-nav";

interface SidebarAgentLink {
  slug: string;
  name: string;
  icon?: string;
  primaryImagePath?: string;
  secondaryImagePath?: string;
  href: string;
  description?: string | null;
}

export interface MobileAgentNavProps {
  user: UserProfileWithCurrentTenant;
}

/**
 * Server MobileAgentNav
 * Renders a compact quick-launch for available chat agents using server-side data.
 */
export default async function MobileAgentNavWrapper({
  user
}: MobileAgentNavProps) {
  const { entitlements } = await getTenantAgentEntitlements(user);

  await agentRegistry.initialize({
    loadFromDatabase: true,
    tenantId: user?.current_tenant?.id
  });

  const allAgents = agentRegistry.getAllAgents();
  const agents: SidebarAgentLink[] = allAgents
    .filter(a => a.isActive !== false)
    .filter(a => !a.tenantId || a.tenantId === user?.current_tenant?.id)
    .filter(a => entitlements.allowedAgentSlugs.includes(a.slug))
    .map(a => ({
      slug: a.slug,
      name: a.name,
      icon: a.icon,
      primaryImagePath: a.primaryImagePath,
      secondaryImagePath: a.secondaryImagePath,
      href: `/chat/new?agent=${a.slug}&history=false`,
      description: a.description
    }));

  if (agents.length === 0) return null;

  return <MobileAgentNav sidebarAgentLinks={agents} />;
}
