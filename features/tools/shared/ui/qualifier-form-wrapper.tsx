/**
 * Server component wrapper for loading qualifiers and passing to client forms
 */

import React from "react";
import {
  getPropertyTypes,
  getOccupancyTypes,
  getLoanPurposes,
  getIncomeTypes,
  getCommonLoanQualifiers,
} from "../database/qualifiers";

interface QualifierFormWrapperProps {
  children: (props: {
    propertyTypes: Array<{ value: string; label: string; description?: string }>;
    occupancyTypes: Array<{ value: string; label: string; description?: string }>;
    loanPurposes: Array<{ value: string; label: string; description?: string }>;
    incomeTypes: Array<{ value: string; label: string; description?: string }>;
    commonQualifiers: any[];
  }) => React.ReactNode;
}

export async function QualifierFormWrapper({ children }: QualifierFormWrapperProps) {
  // Load all qualifiers from database
  const [propertyTypes, occupancyTypes, loanPurposes, incomeTypes, commonQualifiers] =
    await Promise.all([
      getPropertyTypes(),
      getOccupancyTypes(),
      getLoanPurposes(),
      getIncomeTypes(),
      getCommonLoanQualifiers()
    ]);

  // Provide fallback values if database is empty
  const defaultPropertyTypes = [
    { value: "single_family", label: "Single Family", description: "Single family residence" },
    { value: "condo", label: "Condominium", description: "Condo unit" },
    { value: "townhouse", label: "Townhouse", description: "Townhouse property" },
    { value: "multi_family", label: "Multi-Family", description: "2-4 unit property" },
  ];

  const defaultOccupancyTypes = [
    { value: "primary_residence", label: "Primary Residence", description: "Owner-occupied" },
    { value: "second_home", label: "Second Home", description: "Vacation or second home" },
    { value: "investment", label: "Investment", description: "Rental property" },
  ];

  const defaultLoanPurposes = [
    { value: "purchase", label: "Purchase", description: "Buy a new property" },
    { value: "refinance", label: "Refinance", description: "Refinance existing loan" },
    { value: "cash_out", label: "Cash-Out Refinance", description: "Refinance with cash out" },
  ];

  const defaultIncomeTypes = [
    { value: "w2", label: "W-2 Employee", description: "Traditional employment" },
    { value: "self_employed", label: "Self-Employed", description: "Business owner" },
    { value: "bank_statements", label: "Bank Statements", description: "Bank statement income" },
    { value: "asset_depletion", label: "Asset Depletion", description: "Asset-based income" },
  ];

  return (
    <>
      {children({
        propertyTypes: propertyTypes.length > 0 ? propertyTypes : defaultPropertyTypes,
        occupancyTypes: occupancyTypes.length > 0 ? occupancyTypes : defaultOccupancyTypes,
        loanPurposes: loanPurposes.length > 0 ? loanPurposes : defaultLoanPurposes,
        incomeTypes: incomeTypes.length > 0 ? incomeTypes : defaultIncomeTypes,
        commonQualifiers,
      })}
    </>
  );
}