"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calculator, FileText, Building } from "lucide-react";
import type { ClosingCostFee } from "./schema";

interface ClosingCostFeeDisplayProps {
  fee: ClosingCostFee;
}

export function ClosingCostFeeDisplay({ fee }: ClosingCostFeeDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const getPaidByColor = (paidBy: string) => {
    switch (paidBy) {
      case "buyer": return "destructive";
      case "seller": return "secondary";
      case "split": return "outline";
      default: return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {fee.feeName}
            </CardTitle>
            <CardDescription>
              {fee.stateName} ({fee.stateCode})
              {fee.countyName && ` - ${fee.countyName}`}
              {fee.cityName && ` - ${fee.cityName}`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getPaidByColor(fee.paidBy)}>
              Paid by {fee.paidBy}
            </Badge>
            {fee.isGovernmentFee && <Badge variant="secondary">Government</Badge>}
            {fee.isNegotiable && <Badge variant="outline">Negotiable</Badge>}
            {!fee.isRequired && <Badge variant="outline">Optional</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Calculation Method and Amount */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Calculator className="h-4 w-4" />
              {fee.calculationMethod.replace(/_/g, ' ').toUpperCase()}
            </div>

            {fee.calculationMethod === 'flat' && fee.flatAmount && (
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(fee.flatAmount)}
              </div>
            )}

            {fee.calculationMethod === 'percentage_of_loan' && fee.percentageRate && (
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatPercentage(fee.percentageRate)} of loan
              </div>
            )}

            {fee.calculationMethod === 'percentage_of_purchase' && fee.percentageRate && (
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatPercentage(fee.percentageRate)} of purchase
              </div>
            )}

            {fee.calculationMethod === 'per_unit' && fee.perUnitAmount && (
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(fee.perUnitAmount)} per $1000
              </div>
            )}
          </div>

          {/* Typical Amount */}
          {fee.typicalAmount && (
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Typical Amount</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {formatCurrency(fee.typicalAmount)}
              </span>
            </div>
          )}

          {/* Min/Max Range */}
          {(fee.minimumFee || fee.maximumFee) && (
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Range</span>
              <span className="font-medium">
                {fee.minimumFee && formatCurrency(fee.minimumFee)}
                {fee.minimumFee && fee.maximumFee && ' - '}
                {fee.maximumFee && formatCurrency(fee.maximumFee)}
              </span>
            </div>
          )}

          {/* Property Type Adjustments */}
          {(fee.singleFamilyAdjustment !== 1 || fee.condoAdjustment !== 1 || fee.multiFamilyAdjustment !== 1) && (
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-sm font-medium mb-2">Property Type Adjustments</div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {fee.singleFamilyAdjustment !== 1 && (
                  <div>Single Family: {(fee.singleFamilyAdjustment * 100).toFixed(0)}%</div>
                )}
                {fee.condoAdjustment !== 1 && (
                  <div>Condo: {(fee.condoAdjustment * 100).toFixed(0)}%</div>
                )}
                {fee.multiFamilyAdjustment !== 1 && (
                  <div>Multi-Family: {(fee.multiFamilyAdjustment * 100).toFixed(0)}%</div>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {fee.feeDescription && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {fee.feeDescription}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default {
  Display: ClosingCostFeeDisplay
};