import { EntityType } from "../../types";
import { TeamMemberSchema, type TeamMember } from "./schema";

export const TeamMemberEntity: EntityType<TeamMember> = {
  slug: "team-member",
  name: "Team Member",
  namespace: "sprinter",
  isWorkspace: false,
  schema: TeamMemberSchema,
  uiConfig: {
    icon: "Users",
    displayName: "Team Member",
    pluralName: "Team Members",
    listView: {
      columns: ["first_name", "last_name", "email", "role", "status", "profile.department"],
      defaultSort: { field: "first_name", direction: "asc" },
      filters: ["status", "role", "profile.department"],
      searchFields: ["first_name", "last_name", "email"]
    },
    formView: {
      tabs: ["basic", "profile", "contact", "skills", "permissions"],
      sections: {
        basic: ["user_id", "email", "first_name", "last_name", "role", "status"],
        profile: ["profile"],
        contact: ["contact"],
        skills: ["skills", "certifications", "languages"],
        permissions: ["permissions"]
      }
    }
  },
  entityMapping: {
    toolMappings: {
      "team-manager": {
        reads: ["*"],
        writes: ["*"],
        required: ["user_id", "email", "first_name", "last_name"]
      },
      "permission-manager": {
        reads: ["permissions", "role"],
        writes: ["permissions", "role"],
        required: ["user_id"]
      }
    },
    allowedTypes: ["team-member"],
    constraints: {
      uniqueFields: ["user_id", "email"],
      requiredFields: ["user_id", "email", "first_name", "last_name", "role"]
    }
  },
  version: 1
};

export * from "./schema";