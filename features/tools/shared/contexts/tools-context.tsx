"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { LenderOption } from "../database/lenders";
import type { QualifierOption } from "../database/qualifiers";
import type { LoanTermOption, StateOption } from "../database/loan-options";

// Types for context data
interface ProgramOption {
  id: number;
  name: string;
  lenderId: number;
  lenderName?: string;
}

interface ToolsContextData {
  lenders: LenderOption[];
  programs: ProgramOption[];
  qualifiers: QualifierOption[];
  loanTerms: LoanTermOption[];
  states: StateOption[];
  isLoading: boolean;
  error: string | null;
  getOptions: (path: string) => any[];
}

// Create context
const ToolsContext = createContext<ToolsContextData | undefined>(undefined);

// Provider component
export function ToolsProvider({
  children,
  initialData = {}
}: {
  children: ReactNode;
  initialData?: Partial<ToolsContextData>;
}) {
  const [lenders, setLenders] = useState<LenderOption[]>(initialData.lenders || []);
  const [programs, setPrograms] = useState<ProgramOption[]>(initialData.programs || []);
  const [qualifiers, setQualifiers] = useState<QualifierOption[]>(initialData.qualifiers || []);
  const [loanTerms, setLoanTerms] = useState<LoanTermOption[]>(initialData.loanTerms || []);
  const [states, setStates] = useState<StateOption[]>(initialData.states || []);
  const [isLoading, setIsLoading] = useState(!initialData.lenders);
  const [error, setError] = useState<string | null>(null);

  // Load data from API
  useEffect(() => {
    if (initialData.lenders) {
      // Data was provided server-side, no need to fetch
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [lendersRes, programsRes, qualifiersRes, loanTermsRes, statesRes] = await Promise.all([
          fetch('/api/tools/data/lenders').then(r => r.json()),
          fetch('/api/tools/data/programs').then(r => r.json()),
          fetch('/api/tools/data/qualifiers').then(r => r.json()),
          fetch('/api/tools/data/loan-terms').then(r => r.json()),
          fetch('/api/tools/data/states').then(r => r.json())
        ]);

        setLenders(lendersRes.data || []);
        setPrograms(programsRes.data || []);
        setQualifiers(qualifiersRes.data || []);
        setLoanTerms(loanTermsRes.data || []);
        setStates(statesRes.data || []);
      } catch (err) {
        console.error('Failed to load tools data:', err);
        setError('Failed to load dropdown data');

        // Set default fallback data
        setLoanTerms([
          { value: '360', label: '30 Years', years: 30 },
          { value: '180', label: '15 Years', years: 15 }
        ]);
        setStates([
          { value: 'CA', label: 'California', code: 'CA' },
          { value: 'TX', label: 'Texas', code: 'TX' },
          { value: 'FL', label: 'Florida', code: 'FL' },
          { value: 'NY', label: 'New York', code: 'NY' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [initialData.lenders]);

  // Helper function to get options by path (for backward compatibility)
  const getOptions = (path: string): any[] => {
    switch (path) {
      case '/lenderId':
        return lenders.map(l => ({ value: l.id, label: l.name }));
      case '/programId':
        return programs.map(p => ({ value: p.id, label: p.name }));
      case '/qualifiers':
        return qualifiers.map(q => ({ value: q.key, label: q.name }));
      case '/loanTerms':
        return loanTerms;
      case '/states':
        return states;
      default:
        return [];
    }
  };

  const value: ToolsContextData = {
    lenders,
    programs,
    qualifiers,
    loanTerms,
    states,
    isLoading,
    error,
    getOptions
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
}

// Custom hook to use the context
export function useToolsContext() {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error('useToolsContext must be used within a ToolsProvider');
  }
  return context;
}

// Export for tools that need direct access
export { ToolsContext };