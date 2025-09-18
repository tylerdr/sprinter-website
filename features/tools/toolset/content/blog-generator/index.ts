/**
 * Blog Generator Tool
 * Export point for the tool and UI components
 */

export { default as tool } from './tool';
export { 
  blogGeneratorInputSchema,
  blogGeneratorOutputSchema,
  type BlogGeneratorInput,
  type BlogGeneratorOutput 
} from './tool';

// Lazy load UI components
export const ui = () => import('./ui').then(m => m.default);