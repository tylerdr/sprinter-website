/**
 * Social Post Generator Tool
 * Export point for the tool and UI components
 */

export { default as tool } from './tool';
export { 
  socialPostGeneratorInputSchema,
  socialPostGeneratorOutputSchema,
  type SocialPostGeneratorInput,
  type SocialPostGeneratorOutput 
} from './tool';

// Lazy load UI components
export const ui = () => import('./ui').then(m => m.default);