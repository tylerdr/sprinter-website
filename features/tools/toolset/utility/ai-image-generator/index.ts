/**
 * AI Image Generator Tool
 * Export point for the tool and UI components
 */

export { default as tool } from './tool';
export { 
  inputSchema,
  outputSchema,
  type Input,
  type Output 
} from './tool';

// Lazy load UI components
export const ui = () => import('./ui').then(m => m.default);