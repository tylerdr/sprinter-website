/**
 * Bank Statement Analyzer Tool
 * Export point for the tool and UI components
 */

export { default as tool } from './tool';
export { 
  bankStatementAnalyzerInputSchema,
  bankStatementAnalyzerOutputSchema,
  type BankStatementAnalyzerInput,
  type BankStatementAnalyzerOutput 
} from './tool';

// Lazy load UI components
export const ui = () => import('./ui').then(m => m.default);