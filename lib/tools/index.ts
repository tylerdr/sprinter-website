import { Tool } from 'ai';
import { z } from 'zod';
import { AgentCapability } from '../agents/types';

export interface ToolOptions {
  isAdmin?: boolean;
  capabilities?: string[];
  agentId?: string;
}

export function getTools(options: ToolOptions = {}): Tool[] {
  // Temporarily return empty array until tool types are fixed
  return [];
}

// Export all tool collections for direct access
export { databaseTools } from './admin/database';
export { contentTools } from './admin/content';
export { imageTools } from './admin/image';
export { analyticsTools } from './admin/analytics';
export { generalTools } from './general';