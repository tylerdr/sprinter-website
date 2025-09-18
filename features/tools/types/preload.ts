/**
 * Type definitions for tool preload data
 */

export interface LenderOption {
  id: number;
  name: string;
  description?: string | null;
  logo?: string | null;
}

export interface ProgramOption {
  id: number;
  name: string;
  lenderId: number;
  lenderName?: string;
  description?: string | null;
}

export interface QualifierOption {
  id: number;
  key: string;
  name: string;
  category?: string | null;
  description?: string | null;
}

export interface LoanTermOption {
  value: string;
  label: string;
  years: number;
}

export interface StateOption {
  value: string;
  label: string;
  code: string;
}

export interface ToolPreloadData {
  lenders: LenderOption[];
  programs: ProgramOption[];
  qualifiers: QualifierOption[];
  loanTerms: LoanTermOption[];
  states: StateOption[];
}

export interface ToolContextData extends ToolPreloadData {
  isLoading: false;
  error: null;
  getOptions: (path: string) => any[];
  getFilteredPrograms: (lenderIds: number[]) => ProgramOption[];
  searchLenders: (term: string) => LenderOption[];
  searchPrograms: (term: string, lenderIds?: number[]) => ProgramOption[];
}