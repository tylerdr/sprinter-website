"use client";

/**
 * Client Component Bridge for Tool Context
 * Bridges server-preloaded data to client components
 */

import React, { createContext, useContext, useMemo } from "react";
import type { ToolPreloadData, ToolContextData, ProgramOption, LenderOption } from "../types/preload";

interface ToolContextBridgeProps {
  children: React.ReactNode;
  preloadedData: ToolPreloadData;
  renderMode?: "page" | "chat" | "artifact";
}

// Create the context
const ToolDataContext = createContext<ToolContextData | undefined>(undefined);

export function ToolContextBridge({
  children,
  preloadedData,
  renderMode = "page"
}: ToolContextBridgeProps) {
  // Memoize helper functions to avoid recreating on every render
  const contextValue = useMemo<ToolContextData>(() => {
    // Helper function for backward compatibility with old getOptions pattern
    const getOptions = (path: string): any[] => {
      switch (path) {
        case "/lenderId":
          return preloadedData.lenders.map(l => ({
            value: l.id,
            label: l.name,
            metadata: { description: l.description, logo: l.logo }
          }));
        case "/programId":
          return preloadedData.programs.map(p => ({
            value: p.id,
            label: p.name,
            metadata: { lenderId: p.lenderId, lenderName: p.lenderName }
          }));
        case "/qualifiers":
          return preloadedData.qualifiers.map(q => ({
            value: q.key,
            label: q.name,
            metadata: { category: q.category, description: q.description }
          }));
        case "/loanTerms":
          return preloadedData.loanTerms.map(t => ({
            value: t.value,
            label: t.label,
            metadata: { years: t.years }
          }));
        case "/states":
          return preloadedData.states.map(s => ({
            value: s.value,
            label: s.label,
            metadata: { code: s.code }
          }));
        default:
          return [];
      }
    };

    // Filter programs by lender IDs
    const getFilteredPrograms = (lenderIds: number[]): ProgramOption[] => {
      if (!lenderIds.length) return preloadedData.programs;
      return preloadedData.programs.filter(p => lenderIds.includes(p.lenderId));
    };

    // Search lenders by name
    const searchLenders = (term: string): LenderOption[] => {
      if (!term) return preloadedData.lenders;
      const lowercaseTerm = term.toLowerCase();
      return preloadedData.lenders.filter(l =>
        l.name.toLowerCase().includes(lowercaseTerm)
      );
    };

    // Search programs by name, optionally filtered by lender IDs
    const searchPrograms = (term: string, lenderIds?: number[]): ProgramOption[] => {
      let programs = preloadedData.programs;

      if (lenderIds && lenderIds.length > 0) {
        programs = programs.filter(p => lenderIds.includes(p.lenderId));
      }

      if (term) {
        const lowercaseTerm = term.toLowerCase();
        programs = programs.filter(p =>
          p.name.toLowerCase().includes(lowercaseTerm)
        );
      }

      return programs;
    };

    return {
      ...preloadedData,
      isLoading: false,
      error: null,
      getOptions,
      getFilteredPrograms,
      searchLenders,
      searchPrograms
    };
  }, [preloadedData]);

  return (
    <ToolDataContext.Provider value={contextValue}>
      {children}
    </ToolDataContext.Provider>
  );
}

/**
 * Hook to access tool data in client components
 */
export function useToolData(): ToolContextData {
  const context = useContext(ToolDataContext);
  if (!context) {
    throw new Error("useToolData must be used within ToolContextBridge");
  }
  return context;
}

/**
 * Backward compatibility alias for useToolData
 * Allows gradual migration from useToolsContext
 */
export const useToolsContext = useToolData;