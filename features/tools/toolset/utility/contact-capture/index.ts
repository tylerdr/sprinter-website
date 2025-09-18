/**
 * Contact Capture Tool
 * Export point for the tool and UI components
 */

export { default as tool } from './tool';
export { 
  contactCaptureInputSchema,
  contactCaptureOutputSchema,
  type ContactCaptureInput,
  type ContactCaptureOutput 
} from './tool';

// Lazy load UI components
export const ui = () => import('./ui').then(m => m.default);