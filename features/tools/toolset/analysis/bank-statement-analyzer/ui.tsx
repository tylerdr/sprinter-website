/**
 * Bank Statement Analyzer UI Components - Version 2.0
 * Enhanced with comprehensive metrics display and export functionality
 */

"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  FileText,
  Calendar,
  Info,
  Upload,
  X,
  FileIcon,
  Download,
  FileSpreadsheet,
  AlertCircle,
  Percent,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToolUI } from "@/features/tools/types";
import {
  bankStatementAnalyzerInputSchema as Input,
  bankStatementAnalyzerOutputSchema as Output
} from "./tool";
import { z } from "zod";
import { cn } from "@/lib/utils";

type InputType = z.infer<typeof Input>;
type OutputType = z.infer<typeof Output>;

/**
 * Result display component with all enhanced metrics
 */
export const Result: React.FC<{ data: OutputType }> = ({ data: result }) => {

  const getStabilityIcon = (stability: string) => {
    switch (stability) {
      case "stable":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "growing":
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "inconsistent":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStabilityColor = (stability: string) => {
    switch (stability) {
      case "stable":
        return "text-green-600";
      case "growing":
        return "text-blue-600";
      case "declining":
        return "text-red-600";
      case "inconsistent":
        return "text-orange-600";
      default:
        return "text-yellow-600";
    }
  };

  const formatCurrency = (val: number) =>
    `$${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

  return (
    <div className="space-y-6">
      {/* Original Statement Viewer */}
      {result.originalDocumentUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm">Original Statement</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(result.originalDocumentUrl, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Original PDF
              </Button>
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      {/* Business & Account Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {result.businessName && (
              <>
                <span className="text-muted-foreground">Business Name:</span>
                <span className="font-medium">{result.businessName}</span>
              </>
            )}
            {result.bankName && (
              <>
                <span className="text-muted-foreground">Bank:</span>
                <span>{result.bankName}</span>
              </>
            )}
            {result.accountNumber && (
              <>
                <span className="text-muted-foreground">Account:</span>
                <span>{result.accountNumber}</span>
              </>
            )}
            <span className="text-muted-foreground">Analysis Period:</span>
            <span>{result.monthsAnalyzed} months</span>
            <span className="text-muted-foreground">Opening Balance:</span>
            <span>{formatCurrency(result.openingBalance)}</span>
            <span className="text-muted-foreground">Ending Balance:</span>
            <span>{formatCurrency(result.endingBalance)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Total Gross Deposits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(result.totalGrossDeposits)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Before exclusions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Deposits Excluded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(result.depositsExcluded)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Transfers & non-qualifying
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Total Net Deposits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(result.netDeposits)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Qualifying deposits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Qualifying Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(result.qualifyingIncome)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly qualifying
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Average Monthly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatCurrency(result.averageMonthlyNetDeposits)}
            </div>
            <div
              className={`flex items-center gap-1 mt-1 ${getStabilityColor(result.incomeStability)}`}
            >
              {getStabilityIcon(result.incomeStability)}
              <span className="text-sm capitalize">
                {result.incomeStability}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              NSF/Overdrafts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${(result.nsfCount + result.overdraftCount) > 0 ? "text-red-600" : "text-green-600"}`}>
              {result.nsfCount + result.overdraftCount}
            </div>
            {(result.nsfCount + result.overdraftCount) > 0 && (
              <Badge variant="destructive" className="mt-1">
                Red Flag
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Inconsistent Months
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${result.inconsistentMonths.length > 2 ? "text-orange-600" : ""}`}>
              {result.inconsistentMonths.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Low deposit months
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Warnings */}
      {(result.nsfCount + result.overdraftCount) > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold">NSF/Overdraft Activity Detected</div>
            <p className="mt-1">
              {result.nsfCount} NSF and {result.overdraftCount} overdraft occurrences found. This may impact loan qualification.
            </p>
            {result.nsfDetails && result.nsfDetails.length > 0 && (
              <p className="mt-1 text-xs">
                Recent: {result.nsfDetails.slice(0, 3).map(d => d.date).join(", ")}
                {result.nsfDetails.length > 3 && ` and ${result.nsfDetails.length - 3} more`}
              </p>
            )}
          </AlertDescription>
        </Alert>
      )}

      {result.incomeStability === "inconsistent" && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold">Inconsistent Income Pattern</div>
            <p className="mt-1">
              {result.inconsistentMonths.length} months showed deposits below 20% of the average.
              Additional documentation may be required.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
          <TabsTrigger value="deposits">Large Deposits</TabsTrigger>
          <TabsTrigger value="income">Income Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Deposit Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">Gross Deposits</th>
                      <th className="text-right py-2">Transfers</th>
                      <th className="text-right py-2">Qualifying</th>
                      <th className="text-right py-2">End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.monthlyBreakdown.map((month, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium">{month.month}</td>
                        <td className="text-right py-2 text-green-600">
                          {formatCurrency(month.totalDeposits)}
                        </td>
                        <td className="text-right py-2 text-red-600">
                          {formatCurrency(month.totalWithdrawals)}
                        </td>
                        <td className="text-right py-2 font-medium">
                          {formatCurrency(month.qualifyingDeposits)}
                        </td>
                        <td className="text-right py-2">
                          {formatCurrency(month.closingBalance || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 font-bold">
                    <tr>
                      <td className="py-2">Total</td>
                      <td className="text-right py-2 text-green-600">
                        {formatCurrency(result.totalGrossDeposits)}
                      </td>
                      <td className="text-right py-2 text-red-600">
                        -
                      </td>
                      <td className="text-right py-2">
                        {formatCurrency(result.netDeposits)}
                      </td>
                      <td className="text-right py-2">
                        {formatCurrency(result.endingBalance)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Large Deposits Analysis
                <Badge variant="outline" className="ml-2">
                  {result.largeDeposits.length} found
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.largeDeposits.length > 0 ? (
                <div className="space-y-3">
                  {result.largeDeposits.map((deposit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-lg">
                            {formatCurrency(deposit.amount)}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            {deposit.percentOfAverage.toFixed(0)}% of avg
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {deposit.date}
                        </div>
                        {deposit.description && (
                          <div className="text-sm mt-1">{deposit.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Deposits exceeding 50% of average monthly deposits require source documentation
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No large deposits requiring explanation
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Qualification Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Base Qualifying Income</p>
                    <p className="text-xl font-bold">{formatCurrency(result.averageMonthlyNetDeposits)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Final Qualifying Income</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(result.qualifyingIncome)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Income Stability</span>
                    <div className="flex items-center gap-2">
                      {getStabilityIcon(result.incomeStability)}
                      <span className={`font-medium capitalize ${getStabilityColor(result.incomeStability)}`}>
                        {result.incomeStability}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consistency Score</span>
                    <span className="font-medium">
                      {((result.monthsAnalyzed - result.inconsistentMonths.length) / result.monthsAnalyzed * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Months Analyzed</span>
                    <span className="font-medium">{result.monthsAnalyzed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Trend Direction</span>
                    <span className="font-medium capitalize">
                      {result.incomeStability === "growing" ? "Increasing" :
                       result.incomeStability === "declining" ? "Decreasing" : "Stable"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

/**
 * Loading component
 */
export const Loading: React.FC = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <div>
          <p className="font-medium">Analyzing Bank Statement...</p>
          <p className="text-sm text-muted-foreground">
            Using Gemini 2.5 Pro to extract and analyze transaction data
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

/**
 * Error component
 */
export const Error: React.FC<{ message: string }> = ({ message }) => (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertDescription>
      <div className="font-semibold">Analysis Failed</div>
      <p className="mt-1">{message}</p>
    </AlertDescription>
  </Alert>
);

/**
 * Enhanced input form with ownership % and expense ratio
 */
export const InputForm: React.FC<{
  onSubmit: (data: InputType) => void;
  isLoading?: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<InputType>>({
    documentType: "business",
    monthsToAnalyze: 3,
    businessOwnershipPercent: 100,
    expenseRatio: 0
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileRead = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setPdfFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData(prev => ({
        ...prev,
        fileData: base64,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileRead(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fileData) {
      onSubmit(formData as InputType);
    }
  };

  const removeFile = () => {
    setPdfFile(null);
    setFormData(prev => ({
      ...prev,
      fileData: undefined,
      fileName: undefined,
      fileSize: undefined,
      fileType: undefined
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* File Upload Area */}
      <div>
        <Label htmlFor="file">Bank Statement (PDF)</Label>
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            pdfFile ? "bg-muted/50" : "hover:border-muted-foreground/50"
          )}
        >
          {pdfFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileIcon className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{pdfFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your PDF here, or click to browse
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                Choose File
              </Button>
            </>
          )}
        </div>
        <InputField
          ref={fileInputRef}
          id="file"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isLoading}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="documentType">Account Type</Label>
          <Select
            value={formData.documentType}
            onValueChange={value =>
              setFormData(prev => ({
                ...prev,
                documentType: value as "personal" | "business"
              }))
            }
            disabled={isLoading}
          >
            <SelectTrigger id="documentType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal Account</SelectItem>
              <SelectItem value="business">Business Account</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="months">Months to Analyze</Label>
          <InputField
            id="months"
            type="number"
            min="1"
            max="24"
            value={formData.monthsToAnalyze}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                monthsToAnalyze: parseInt(e.target.value) || 3
              }))
            }
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Business-specific fields */}
      {formData.documentType === "business" && (
        <>
          <div>
            <Label htmlFor="ownership">
              <Building className="h-3 w-3 inline mr-1" />
              Business Ownership Percentage: {formData.businessOwnershipPercent}%
            </Label>
            <Slider
              id="ownership"
              min={1}
              max={100}
              step={1}
              value={[formData.businessOwnershipPercent || 100]}
              onValueChange={([value]) =>
                setFormData(prev => ({
                  ...prev,
                  businessOwnershipPercent: value
                }))
              }
              disabled={isLoading}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Percentage of business owned by borrower (affects qualifying income)
            </p>
          </div>

          <div>
            <Label htmlFor="expense">
              <Percent className="h-3 w-3 inline mr-1" />
              Business Expense Ratio: {formData.expenseRatio}%
            </Label>
            <Slider
              id="expense"
              min={0}
              max={100}
              step={5}
              value={[formData.expenseRatio || 0]}
              onValueChange={([value]) =>
                setFormData(prev => ({
                  ...prev,
                  expenseRatio: value
                }))
              }
              disabled={isLoading}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Typical business expense percentage (reduces qualifying income)
            </p>
          </div>
        </>
      )}

      <div>
        <Label htmlFor="loanPurpose">Loan Purpose (Optional)</Label>
        <Select
          value={formData.loanPurpose || ""}
          onValueChange={value =>
            setFormData(prev => ({ ...prev, loanPurpose: value as any || undefined }))
          }
          disabled={isLoading}
        >
          <SelectTrigger id="loanPurpose">
            <SelectValue placeholder="Select loan purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="purchase">Purchase</SelectItem>
            <SelectItem value="refinance">Refinance</SelectItem>
            <SelectItem value="cash-out">Cash-Out Refinance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !formData.fileData}
        className="w-full"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Analyzing with Gemini 2.5 Pro...
          </>
        ) : (
          "Analyze Statement"
        )}
      </Button>
    </form>
  );
};

/**
 * Export the complete UI implementation
 */
const ui: ToolUI<typeof Input, typeof Output> = {
  Result,
  Loading,
  Error,
  InputForm
};

export default ui;
