/**
 * Core types for the Entity System
 */

import { z } from "zod";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// Entity Type Definition
export interface EntityType<T = any> {
  slug: string;
  name: string;
  namespace?: string;
  parentSlug?: string;
  isWorkspace?: boolean;
  schema: z.ZodSchema<T>;
  uiConfig?: EntityUIConfig;
  entityMapping?: {
    toolMappings?: Record<string, {
      reads: string[];
      writes: string[];
      required: string[];
    }>;
    allowedTypes?: string[];
    constraints?: {
      uniqueFields?: string[];
      requiredFields?: string[];
      maxLength?: Record<string, number>;
    };
  };
  version?: number;
}

// UI Configuration
export interface EntityUIConfig {
  icon?: string | LucideIcon;
  displayName?: string;
  pluralName?: string;
  listView?: {
    columns?: string[];
    defaultSort?: {
      field: string;
      direction: "asc" | "desc";
    };
    filters?: string[];
    searchFields?: string[];
  };
  formView?: {
    tabs?: string[];
    sections?: Record<string, string[]>;
  };
}

// Component Props
export interface EntityListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  onCreate: () => void;
}

export interface EntityFormProps<T, C = T, U = Partial<T>> {
  mode: "create" | "edit";
  initialData?: Partial<T>;
  onSubmit: (data: C | U) => Promise<void>;
  onCancel: () => void;
}

export interface EntityDetailProps<T> {
  item: T;
  onEdit: () => void;
  onDelete: () => void;
}

// UI Component Set
export interface EntityUI<T, C = T, U = Partial<T>> {
  list: React.ComponentType<EntityListProps<T>>;
  form: React.ComponentType<EntityFormProps<T, C, U>>;
  detail: React.ComponentType<EntityDetailProps<T>>;
  icon?: LucideIcon;
  displayField?: keyof T | string;
  searchFields?: string[];
}

// Entity Instance
export interface EntityInstance<T = any> {
  id: string;
  entityType: string;
  entitySlug: string;
  displayName: string;
  data: T;
  tenantId?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Entity Query
export interface EntityQuery {
  entityType?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
  limit?: number;
  offset?: number;
  search?: string;
}

// Entity Operation Result
export interface EntityOperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: string[];
}

// Entity Hook Return Types
export interface UseEntityReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseEntityListReturn<T> {
  items: T[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export interface UseEntityMutationReturn<T, P = any> {
  mutate: (payload: P) => Promise<T>;
  loading: boolean;
  error: Error | null;
  data: T | null;
}