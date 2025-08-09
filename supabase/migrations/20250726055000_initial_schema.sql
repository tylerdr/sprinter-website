-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

CREATE TYPE "public"."agent_capability" AS ENUM('vision', 'tools', 'multi-turn');--> statement-breakpoint
CREATE TYPE "public"."agent_model" AS ENUM('gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo', 'o1-preview', 'o1-mini', 'o1', 'claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-5-sonnet-latest', 'claude-3-opus-latest', 'claude-3-5-haiku-latest', 'anthropic.claude-3-5-sonnet-20241022-v2:0', 'anthropic.claude-3-haiku-20240307-v1:0', 'deepseek-chat', 'grok-2-1212', 'grok-beta');--> statement-breakpoint
CREATE TYPE "public"."app_permission" AS ENUM('chats.own.create', 'chats.own.read', 'chats.own.update', 'chats.own.delete', 'chats.team.create', 'chats.team.read', 'chats.team.update', 'chats.team.delete', 'chats.all.create', 'chats.all.read', 'chats.all.update', 'chats.all.delete', 'messages.own.create', 'messages.own.read', 'messages.own.update', 'messages.own.delete', 'messages.team.create', 'messages.team.read', 'messages.team.update', 'messages.team.delete', 'messages.all.create', 'messages.all.read', 'messages.all.update', 'messages.all.delete', 'entities.own.create', 'entities.own.read', 'entities.own.update', 'entities.own.delete', 'entities.team.create', 'entities.team.read', 'entities.team.update', 'entities.team.delete', 'entities.all.create', 'entities.all.read', 'entities.all.update', 'entities.all.delete', 'entity_types.own.create', 'entity_types.own.read', 'entity_types.own.update', 'entity_types.own.delete', 'entity_types.team.create', 'entity_types.team.read', 'entity_types.team.update', 'entity_types.team.delete', 'entity_types.all.create', 'entity_types.all.read', 'entity_types.all.update', 'entity_types.all.delete', 'users.own.read', 'users.own.update', 'users.team.create', 'users.team.read', 'users.team.update', 'users.team.delete', 'users.all.create', 'users.all.read', 'users.all.update', 'users.all.delete', 'documents.own.create', 'documents.own.read', 'documents.own.update', 'documents.own.delete', 'documents.team.create', 'documents.team.read', 'documents.team.update', 'documents.team.delete', 'documents.all.create', 'documents.all.read', 'documents.all.update', 'documents.all.delete', 'audit_logs.own.read', 'audit_logs.team.read', 'audit_logs.all.read');--> statement-breakpoint
CREATE TYPE "public"."deployment_type" AS ENUM('platform', 'standalone');--> statement-breakpoint
CREATE TYPE "public"."message_type" AS ENUM('text', 'image', 'audio', 'video', 'file', 'tool-invocation');--> statement-breakpoint
CREATE TYPE "public"."sender_type" AS ENUM('user', 'ai', 'system');--> statement-breakpoint
CREATE TYPE "public"."tenant_type" AS ENUM('public', 'team');--> statement-breakpoint
CREATE TYPE "public"."visibility_level" AS ENUM('public', 'private', 'team', 'shared');--> statement-breakpoint
CREATE TABLE "agents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"name" text,
	"description" text,
	"prompt" text NOT NULL,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb,
	"metadata" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"table_name" text NOT NULL,
	"operation" text NOT NULL,
	"resource_id" text,
	"old_data" jsonb,
	"new_data" jsonb,
	"changed_by" uuid,
	"tenant_id" uuid,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"active_tenant_id" uuid DEFAULT '00000000-0000-0000-0000-000000000000',
	"first_name" text,
	"last_name" text,
	"email" text,
	"phone" text,
	"photo_url" text,
	"display_name" text,
	"industry_role" text,
	"full_name" text,
	"primary_language" text,
	"timezone" text DEFAULT 'UTC'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"email_confirmed_at" timestamp with time zone,
	"last_sign_in_at" timestamp with time zone,
	"role" text,
	"is_anonymous" boolean,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "waitlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"manufacturers" text,
	"interest" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "chat_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"participant_type" text NOT NULL,
	"participant_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"title" text,
	"is_group" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"owner_id" uuid NOT NULL,
	"visibility" "visibility_level" DEFAULT 'team',
	"shared_with" uuid[] DEFAULT '{}',
	"agent_id" uuid
);
--> statement-breakpoint
CREATE TABLE "artifacts_documents" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"kind" varchar DEFAULT 'text' NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "artifacts_documents_id_created_at_pk" PRIMARY KEY("id","created_at")
);
--> statement-breakpoint
CREATE TABLE "artifacts_suggestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"document_created_at" timestamp with time zone NOT NULL,
	"original_text" text NOT NULL,
	"suggested_text" text NOT NULL,
	"description" text,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"document_id" uuid NOT NULL,
	"chunk_index" integer NOT NULL,
	"content" text,
	"embedding" vector(1536),
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "chunks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"entity_id" uuid,
	"file_url" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"visibility" "visibility_level" DEFAULT 'team',
	"shared_with" uuid[] DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE "entities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"entity_type_id" uuid NOT NULL,
	"content" jsonb,
	"embedding" vector(1536),
	"owner_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"image_url" text,
	"title" text,
	"description" text,
	"visibility" "visibility_level",
	"metadata" jsonb,
	"parent_id" uuid
);
--> statement-breakpoint
ALTER TABLE "entities" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "entity_relations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"from_entity_id" uuid NOT NULL,
	"to_entity_id" uuid NOT NULL,
	"relationship_type" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entity_type_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_entity_type_id" uuid NOT NULL,
	"to_entity_type_id" uuid NOT NULL,
	"relationship_type" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entity_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"version_number" integer DEFAULT 1 NOT NULL,
	"json_schema" jsonb,
	"render_code" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"visibility" "visibility_level" DEFAULT 'public',
	"shared_with" uuid[] DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE "evaluation_datasets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"expected_response" text,
	"actual_response" text,
	"context" text,
	"system_prompt" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"is_suggestion" boolean DEFAULT false,
	"is_evaluation" boolean DEFAULT true,
	"is_active" boolean DEFAULT true,
	"category" text,
	"dataset_name" text,
	"tags" text[],
	"display_order" integer DEFAULT 0,
	"display_label" text,
	"related_entity_id" uuid,
	"related_entity_type" text,
	"parent_message_id" uuid,
	"evaluation_score" numeric(5, 4),
	"evaluation_metrics" jsonb DEFAULT '{}'::jsonb,
	"last_evaluated_at" timestamp with time zone,
	"evaluation_count" integer DEFAULT 0,
	"version" integer DEFAULT 1,
	"previous_version_id" uuid,
	"tenant_id" uuid NOT NULL,
	"created_by" text,
	"updated_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"tenant_type" "tenant_type" NOT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"logo_url" text,
	"vertical_id" uuid,
	"vertical_config" jsonb DEFAULT '{}'::jsonb,
	"primary_agent_id" uuid,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tenant_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role_id" uuid NOT NULL,
	"permission" "app_permission" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_global_role" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"sender_type" "sender_type" NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" text,
	"message_type" "message_type" DEFAULT 'text',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"role" text,
	"raw_response" jsonb,
	"data" jsonb,
	"tool_invocations" jsonb[],
	"parts" jsonb DEFAULT '{}'::jsonb,
	"completion_id" text
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"message_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"is_upvoted" boolean NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"chat_id" uuid NOT NULL,
	CONSTRAINT "votes_message_id_user_id_pk" PRIMARY KEY("message_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "agents_tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tool_invocations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"tool_name" text NOT NULL,
	"user_id" uuid NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"args" jsonb NOT NULL,
	"result" jsonb,
	"state" jsonb,
	"metadata" jsonb,
	"message_id" uuid,
	"tool_call_id" text,
	"completion_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"type" text,
	"schema" jsonb,
	"execute_code" text,
	"source" text DEFAULT 'local',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text,
	"title" text NOT NULL,
	"description" text,
	"due_date" timestamp with time zone,
	"status" text DEFAULT 'open',
	"owner_id" uuid,
	"workflow_run_id" uuid,
	"workflow_step_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workflow_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workflow_id" uuid NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"current_step" integer DEFAULT 1 NOT NULL,
	"started_at" timestamp with time zone DEFAULT now(),
	"ended_at" timestamp with time zone,
	"triggered_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workflow_steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workflow_id" uuid NOT NULL,
	"step_order" integer NOT NULL,
	"step_type" text NOT NULL,
	"config" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workflows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain" text NOT NULL,
	"vertical_id" uuid,
	"tenant_id" uuid,
	"is_primary" boolean DEFAULT false,
	"ssl_status" text DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "domains_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "user_vertical_context" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"vertical_id" uuid NOT NULL,
	"active_tenant_id" uuid,
	"last_accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verticals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"deployment_type" "deployment_type" NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "verticals_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_participants" ADD CONSTRAINT "chat_participants_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_owner_id_profiles_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_documents" ADD CONSTRAINT "artifacts_documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_suggestions" ADD CONSTRAINT "artifacts_suggestions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_suggestions" ADD CONSTRAINT "artifacts_suggestions_document_fkey" FOREIGN KEY ("document_id","document_created_at") REFERENCES "public"."artifacts_documents"("id","created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chunks" ADD CONSTRAINT "chunks_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chunks" ADD CONSTRAINT "chunks_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_entity_id_entities_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entities" ADD CONSTRAINT "entities_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entities" ADD CONSTRAINT "entities_entity_type_id_entity_types_id_fk" FOREIGN KEY ("entity_type_id") REFERENCES "public"."entity_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entities" ADD CONSTRAINT "entities_owner_id_profiles_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entities" ADD CONSTRAINT "entities_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_relations" ADD CONSTRAINT "entity_relations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_relations" ADD CONSTRAINT "entity_relations_from_entity_id_entities_id_fk" FOREIGN KEY ("from_entity_id") REFERENCES "public"."entities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_relations" ADD CONSTRAINT "entity_relations_to_entity_id_entities_id_fk" FOREIGN KEY ("to_entity_id") REFERENCES "public"."entities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_type_relationships" ADD CONSTRAINT "entity_type_relationships_from_entity_type_id_entity_types_id_fk" FOREIGN KEY ("from_entity_type_id") REFERENCES "public"."entity_types"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "entity_type_relationships" ADD CONSTRAINT "entity_type_relationships_to_entity_type_id_entity_types_id_fk" FOREIGN KEY ("to_entity_type_id") REFERENCES "public"."entity_types"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "entity_types" ADD CONSTRAINT "entity_types_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluation_datasets" ADD CONSTRAINT "evaluation_datasets_parent_message_id_messages_id_fk" FOREIGN KEY ("parent_message_id") REFERENCES "public"."messages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluation_datasets" ADD CONSTRAINT "evaluation_datasets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluation_datasets" ADD CONSTRAINT "evaluation_datasets_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluation_datasets" ADD CONSTRAINT "evaluation_datasets_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents_tools" ADD CONSTRAINT "agents_tools_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents_tools" ADD CONSTRAINT "agents_tools_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_invocations" ADD CONSTRAINT "tool_invocations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_invocations" ADD CONSTRAINT "tool_invocations_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_invocations" ADD CONSTRAINT "tool_invocations_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_invocations" ADD CONSTRAINT "tool_invocations_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tools" ADD CONSTRAINT "tools_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_owner_id_profiles_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workflow_run_id_workflow_runs_id_fk" FOREIGN KEY ("workflow_run_id") REFERENCES "public"."workflow_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workflow_step_id_workflow_steps_id_fk" FOREIGN KEY ("workflow_step_id") REFERENCES "public"."workflow_steps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_runs" ADD CONSTRAINT "workflow_runs_workflow_id_workflows_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "public"."workflows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_steps" ADD CONSTRAINT "workflow_steps_workflow_id_workflows_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "public"."workflows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domains" ADD CONSTRAINT "domains_vertical_id_verticals_id_fk" FOREIGN KEY ("vertical_id") REFERENCES "public"."verticals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vertical_context" ADD CONSTRAINT "user_vertical_context_vertical_id_verticals_id_fk" FOREIGN KEY ("vertical_id") REFERENCES "public"."verticals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "agents_tenant_agent_idx" ON "agents" USING btree ("tenant_id","slug");--> statement-breakpoint
CREATE INDEX "agents_slug_idx" ON "agents" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "agents_is_primary_idx" ON "agents" USING btree ("is_primary");--> statement-breakpoint
CREATE INDEX "idx_agents_config_ui_show" ON "agents" USING btree ("config");--> statement-breakpoint
CREATE INDEX "idx_agents_config_ui_category" ON "agents" USING btree ("config");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_timestamp" ON "audit_logs" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_table_resource" ON "audit_logs" USING btree ("table_name","resource_id");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_tenant" ON "audit_logs" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_changed_by" ON "audit_logs" USING btree ("changed_by");--> statement-breakpoint
CREATE INDEX "chat_participants_chat_id_idx" ON "chat_participants" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "chat_participants_participant_idx" ON "chat_participants" USING btree ("participant_id");--> statement-breakpoint
CREATE INDEX "chats_tenant_id_idx" ON "chats" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "chats_owner_id_idx" ON "chats" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "idx_entities_entity_type_id" ON "entities" USING btree ("entity_type_id");--> statement-breakpoint
CREATE INDEX "entities_parent_id_idx" ON "entities" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "entity_relations_from_idx" ON "entity_relations" USING btree ("from_entity_id");--> statement-breakpoint
CREATE INDEX "entity_relations_to_idx" ON "entity_relations" USING btree ("to_entity_id");--> statement-breakpoint
CREATE INDEX "entity_types_tenant_slug_idx" ON "entity_types" USING btree ("tenant_id","slug");--> statement-breakpoint
CREATE INDEX "eval_datasets_tenant_idx" ON "evaluation_datasets" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "eval_datasets_category_idx" ON "evaluation_datasets" USING btree ("category");--> statement-breakpoint
CREATE INDEX "eval_datasets_dataset_name_idx" ON "evaluation_datasets" USING btree ("dataset_name");--> statement-breakpoint
CREATE INDEX "eval_datasets_is_suggestion_idx" ON "evaluation_datasets" USING btree ("is_suggestion") WHERE is_suggestion = true;--> statement-breakpoint
CREATE INDEX "eval_datasets_is_evaluation_idx" ON "evaluation_datasets" USING btree ("is_evaluation") WHERE is_evaluation = true;--> statement-breakpoint
CREATE INDEX "eval_datasets_display_order_idx" ON "evaluation_datasets" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "eval_datasets_metadata_idx" ON "evaluation_datasets" USING gin ("metadata");--> statement-breakpoint
CREATE INDEX "eval_datasets_tags_idx" ON "evaluation_datasets" USING gin ("tags");--> statement-breakpoint
CREATE INDEX "eval_datasets_entity_idx" ON "evaluation_datasets" USING btree ("related_entity_id","related_entity_type");--> statement-breakpoint
CREATE INDEX "eval_datasets_tenant_category_idx" ON "evaluation_datasets" USING btree ("tenant_id","category");--> statement-breakpoint
CREATE UNIQUE INDEX "eval_datasets_question_dataset_uniq" ON "evaluation_datasets" USING btree ("tenant_id","dataset_name","question") WHERE dataset_name IS NOT NULL;--> statement-breakpoint
CREATE INDEX "user_tenants_user_id_idx" ON "user_tenants" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_tenants_tenant_id_idx" ON "user_tenants" USING btree ("tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "permissions_tenant_slug_idx" ON "permissions" USING btree ("tenant_id","slug");--> statement-breakpoint
CREATE INDEX "role_permissions_role_id_idx" ON "role_permissions" USING btree ("role_id");--> statement-breakpoint
CREATE UNIQUE INDEX "roles_tenant_slug_idx" ON "roles" USING btree ("tenant_id","slug");--> statement-breakpoint
CREATE INDEX "messages_chat_id_idx" ON "messages" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "messages_chat_created_at_idx" ON "messages" USING btree ("chat_id","created_at");--> statement-breakpoint
CREATE INDEX "messages_completion_id_idx" ON "messages" USING btree ("completion_id");--> statement-breakpoint
CREATE INDEX "votes_message_id_idx" ON "votes" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "votes_user_id_idx" ON "votes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "votes_chat_id_idx" ON "votes" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "agents_tools_agent_tool_idx" ON "agents_tools" USING btree ("agent_id","tool_id");--> statement-breakpoint
CREATE INDEX "tool_invocations_tool_idx" ON "tool_invocations" USING btree ("tool_id");--> statement-breakpoint
CREATE INDEX "tool_invocations_status_idx" ON "tool_invocations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "tool_invocations_message_idx" ON "tool_invocations" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "tool_invocations_tool_call_id_idx" ON "tool_invocations" USING btree ("tool_call_id");--> statement-breakpoint
CREATE INDEX "tool_invocations_completion_id_idx" ON "tool_invocations" USING btree ("completion_id");--> statement-breakpoint
CREATE INDEX "tools_tenant_tool_idx" ON "tools" USING btree ("tenant_id","slug");--> statement-breakpoint
CREATE INDEX "tools_slug_idx" ON "tools" USING btree ("slug");