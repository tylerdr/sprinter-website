"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Home, Building, TrendingUp } from "lucide-react";
import type { ConformingLoanLimit } from "./schema";

interface ConformingLoanLimitDisplayProps {
  limit: ConformingLoanLimit;
}

export function ConformingLoanLimitDisplay({ limit }: ConformingLoanLimitDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {limit.year} Conforming Loan Limits
              {limit.countyName && ` - ${limit.countyName}`}
              {limit.stateName && `, ${limit.stateName}`}
            </CardTitle>
            <CardDescription>
              {limit.cbsaName && `${limit.cbsaName} • `}
              {limit.limitType.replace(/_/g, ' ').toUpperCase()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {limit.isHighCostArea && <Badge variant="outline">High Cost</Badge>}
            {limit.isSpecialArea && <Badge variant="secondary">Special Area</Badge>}
            {limit.isActive && <Badge variant="default">Active</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Home className="h-4 w-4" />
              Single Family
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(limit.singleFamilyLimit)}
            </div>
          </div>

          {limit.duplexLimit && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <Building className="h-4 w-4" />
                Duplex
              </div>
              <div className="text-xl font-bold">
                {formatCurrency(limit.duplexLimit)}
              </div>
            </div>
          )}

          {limit.triplexLimit && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <Building className="h-4 w-4" />
                Triplex
              </div>
              <div className="text-xl font-bold">
                {formatCurrency(limit.triplexLimit)}
              </div>
            </div>
          )}

          {limit.fourplexLimit && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <Building className="h-4 w-4" />
                Fourplex
              </div>
              <div className="text-xl font-bold">
                {formatCurrency(limit.fourplexLimit)}
              </div>
            </div>
          )}
        </div>

        {limit.percentOfBaseline && (
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {limit.percentOfBaseline}% of baseline limit
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default {
  Display: ConformingLoanLimitDisplay
};