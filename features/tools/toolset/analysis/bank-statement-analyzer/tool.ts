/**
 * Bank Statement Analyzer Tool - Version 6.0.0
 * Uses agent-based approach with streaming for better handling of large PDFs
 */

import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { createClient } from "@/utils/supabase/server";
import { logger } from "@/lib/logger";
import { uploadToBucket, getSignedUrl } from "@/lib/file-upload/file-utils";
import {
  CHAT_ATTACHMENTS_BUCKET,
  DEFAULT_EXPIRATION_SECONDS
} from "@/lib/file-upload/constants";

// Input schema
export const bankStatementAnalyzerInputSchema = z.object({
  fileData: z.string().describe("Base64 encoded PDF file"),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),
  documentType: z.enum(["personal", "business"]).default("business"),
  monthsToAnalyze: z.number().min(1).max(24).default(3),
  loanPurpose: z.enum(["purchase", "refinance", "cash-out"]).optional(),
  businessOwnershipPercent: z.number().min(1).max(100).default(100),
  expenseRatio: z.number().min(0).max(100).default(0)
});

// Simplified extraction schema for streaming chunks
const chunkExtractionSchema = z.object({
  accountInfo: z
    .object({
      businessName: z.string().optional(),
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      openingBalance: z.number(),
      closingBalance: z.number()
    })
    .optional(),
  transactions: z.array(
    z.object({
      date: z.string(),
      amount: z.number(),
      description: z.string(),
      isDeposit: z.boolean(),
      isTransfer: z.boolean().optional(),
      isNSF: z.boolean().optional(),
      isOverdraft: z.boolean().optional()
    })
  )
});

// Output schema
export const bankStatementAnalyzerOutputSchema = z.object({
  // Account Information
  businessName: z.string().optional(),
  accountHolder: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  statementPeriod: z.string().optional(),
  monthsAnalyzed: z.number(),

  // Balance Information
  openingBalance: z.number(),
  endingBalance: z.number(),

  // Income Analysis
  totalGrossDeposits: z.number(),
  depositsExcluded: z
    .number()
    .describe("Transfers and non-qualifying deposits"),
  netDeposits: z.number(),
  averageMonthlyNetDeposits: z.number(),
  qualifyingIncome: z
    .number()
    .describe("Final qualifying income after adjustments"),

  // Income Stability Metrics
  incomeStability: z.enum([
    "stable",
    "variable",
    "declining",
    "growing",
    "inconsistent"
  ]),
  inconsistentMonths: z
    .array(z.string())
    .describe("Months with zero or minimal deposits"),

  // NSF/Overdraft Information
  nsfCount: z.number().describe("Number of NSF/overdraft occurrences"),
  overdraftCount: z.number(),
  nsfDetails: z.array(
    z.object({
      date: z.string(),
      amount: z.number(),
      description: z.string()
    })
  ),

  // Large Deposits
  largeDeposits: z.array(
    z.object({
      date: z.string(),
      amount: z.number(),
      description: z.string(),
      percentOfAverage: z.number(),
      requiresExplanation: z.boolean()
    })
  ),

  // Transaction Details
  deposits: z.array(
    z.object({
      date: z.string(),
      amount: z.number(),
      description: z.string(),
      category: z.string(),
      isTransfer: z.boolean()
    })
  ),
  withdrawals: z.array(
    z.object({
      date: z.string(),
      amount: z.number(),
      description: z.string(),
      category: z.string()
    })
  ),

  // Monthly Breakdown
  monthlyBreakdown: z.array(
    z.object({
      month: z.string(),
      totalDeposits: z.number(),
      totalWithdrawals: z.number(),
      netFlow: z.number(),
      qualifyingDeposits: z.number(),
      openingBalance: z.number().optional(),
      closingBalance: z.number().optional()
    })
  ),

  // Qualification Insights
  qualificationInsights: z.object({
    baseQualifyingIncome: z.number(),
    ownershipAdjustedIncome: z.number(),
    expenseAdjustedIncome: z.number(),
    redFlags: z.array(z.string()),
    explanationRequired: z.array(z.string()),
    recommendations: z.array(z.string())
  }),

  // Document Quality
  documentQuality: z.object({
    isComplete: z.boolean(),
    missingPages: z.array(z.string()).optional(),
    clarity: z.enum(["excellent", "good", "fair", "poor"])
  }),

  // Original Document URL
  originalDocumentUrl: z.string().optional().describe("URL to view the original uploaded statement")
});

export type BankStatementAnalyzerInput = z.infer<
  typeof bankStatementAnalyzerInputSchema
>;
export type BankStatementAnalyzerOutput = z.infer<
  typeof bankStatementAnalyzerOutputSchema
>;

/**
 * Extract data using streaming approach with multiple focused passes
 */
async function extractWithStreaming(
  pdfUrl: string,
  documentType: string,
  monthsToAnalyze: number,
  onProgress?: (message: string) => void
): Promise<any> {
  const model = google("gemini-2.5-pro");

  const extractedData: any = {
    accountInfo: null,
    transactions: [],
    monthlyData: {}
  };

  try {
    // Step 1: Extract account information
    onProgress?.("Extracting account information...");

    const accountResult = await generateObject({
      model,
      schema: z.object({
        businessName: z.string().optional(),
        accountHolder: z.string().optional(),
        bankName: z.string().optional(),
        accountNumber: z.string().optional(),
        statementPeriod: z.string().optional(),
        openingBalance: z.number(),
        closingBalance: z.number()
      }),
      system:
        "Extract account holder information and balances from this bank statement.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract the account information from this bank statement."
            },
            { type: "file", data: pdfUrl, mediaType: "application/pdf" }
          ]
        }
      ],
      temperature: 0.1
    });

    extractedData.accountInfo = accountResult.object;

    // Step 2: Extract transactions in chunks
    onProgress?.("Analyzing transactions...");

    for (let i = 0; i < monthsToAnalyze; i++) {
      const monthPrompt =
        i === 0
          ? "Extract ALL transactions from the MOST RECENT month in the statement."
          : `Extract ALL transactions from month ${i + 1} (counting from most recent).`;

      try {
        const monthResult = await generateObject({
          model,
          schema: z.object({
            monthIdentifier: z
              .string()
              .describe("Month and year like 'January 2024'"),
            transactions: z.array(
              z.object({
                date: z.string(),
                amount: z
                  .number()
                  .describe("Positive for deposits, negative for withdrawals"),
                description: z.string()
              })
            ),
            openingBalance: z.number().optional(),
            closingBalance: z.number().optional()
          }),
          system: `Extract transaction data for a specific month. Include ALL transactions visible for that month.`,
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: monthPrompt },
                { type: "file", data: pdfUrl, mediaType: "application/pdf" }
              ]
            }
          ],
          temperature: 0.1,
          maxRetries: 2
        });

        if (monthResult.object.transactions.length > 0) {
          extractedData.monthlyData[monthResult.object.monthIdentifier] =
            monthResult.object;
          extractedData.transactions.push(...monthResult.object.transactions);
          onProgress?.(
            `Processed ${monthResult.object.transactions.length} transactions for ${monthResult.object.monthIdentifier}`
          );
        }
      } catch (monthError) {
        logger.warn(`Failed to extract month ${i + 1}`, { monthError });
      }
    }

    // Step 3: Identify special transactions
    if (extractedData.transactions.length > 0) {
      onProgress?.("Identifying transfers and fees...");

      const specialTxns = await generateObject({
        model,
        schema: z.object({
          transfers: z
            .array(z.string())
            .describe("Descriptions of transfer transactions"),
          nsfFees: z
            .array(z.string())
            .describe("Descriptions of NSF/overdraft fees")
        }),
        system:
          "Identify transfers between accounts and NSF/overdraft fees from these transaction descriptions.",
        messages: [
          {
            role: "user",
            content: `Analyze these transactions and identify:
1. Transfers (look for: Transfer, TFR, Xfer, "from/to account")
2. NSF/Overdraft fees (look for: NSF, Overdraft, OD, Returned Item, Insufficient Funds)

Transactions:
${extractedData.transactions.map((t: any) => `${t.date}: ${t.description} - $${t.amount}`).join("\n")}

Return the descriptions of transactions that match these categories.`
          }
        ],
        temperature: 0.1
      });

      // Mark transfers and NSF
      extractedData.transactions = extractedData.transactions.map((t: any) => ({
        ...t,
        isTransfer: specialTxns.object.transfers.some(desc =>
          t.description.includes(desc)
        ),
        isNSF: specialTxns.object.nsfFees.some(desc =>
          t.description.includes(desc)
        )
      }));
    }
  } catch (error) {
    logger.error("Streaming extraction failed", { error });
    throw error;
  }

  return extractedData;
}

/**
 * Process extracted data into final output format
 */
function processExtractedData(
  extracted: any,
  input: BankStatementAnalyzerInput
): BankStatementAnalyzerOutput {
  const allDeposits: any[] = [];
  const allWithdrawals: any[] = [];
  const monthlyBreakdown: any[] = [];
  const nsfDetails: any[] = [];
  let totalTransfers = 0;
  let nsfCount = 0;
  let overdraftCount = 0;

  // Process all transactions
  const transactions = extracted.transactions || [];

  transactions.forEach((transaction: any) => {
    const amount = Math.abs(transaction.amount);

    if (transaction.amount > 0) {
      const isTransfer =
        transaction.isTransfer ||
        /transfer|tfr|xfer/i.test(transaction.description);

      allDeposits.push({
        date: transaction.date,
        amount,
        description: transaction.description,
        category: isTransfer ? "Transfer" : "Deposit",
        isTransfer
      });

      if (isTransfer) {
        totalTransfers += amount;
      }
    } else {
      allWithdrawals.push({
        date: transaction.date,
        amount,
        description: transaction.description,
        category: "Withdrawal"
      });

      if (
        transaction.isNSF ||
        /nsf|non.?sufficient|returned.item/i.test(transaction.description)
      ) {
        nsfCount++;
        nsfDetails.push({
          date: transaction.date,
          amount,
          description: transaction.description
        });
      } else if (/overdraft|od\b/i.test(transaction.description)) {
        overdraftCount++;
        nsfDetails.push({
          date: transaction.date,
          amount,
          description: transaction.description
        });
      }
    }
  });

  // Process monthly data
  Object.entries(extracted.monthlyData || {}).forEach(
    ([month, data]: [string, any]) => {
      const monthTransactions = data.transactions || [];
      const monthDeposits = monthTransactions.filter((t: any) => t.amount > 0);
      const monthWithdrawals = monthTransactions.filter(
        (t: any) => t.amount < 0
      );

      const totalDeposits = monthDeposits.reduce(
        (sum: number, t: any) => sum + Math.abs(t.amount),
        0
      );
      const totalWithdrawals = monthWithdrawals.reduce(
        (sum: number, t: any) => sum + Math.abs(t.amount),
        0
      );
      const transferAmount = monthDeposits
        .filter(
          (t: any) => t.isTransfer || /transfer|tfr|xfer/i.test(t.description)
        )
        .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);

      monthlyBreakdown.push({
        month,
        totalDeposits,
        totalWithdrawals,
        netFlow: totalDeposits - totalWithdrawals,
        qualifyingDeposits: totalDeposits - transferAmount,
        openingBalance: data.openingBalance,
        closingBalance: data.closingBalance
      });
    }
  );

  // If no monthly breakdown, create a single summary
  if (monthlyBreakdown.length === 0 && transactions.length > 0) {
    const totalDeposits = allDeposits.reduce((sum, d) => sum + d.amount, 0);
    const totalWithdrawals = allWithdrawals.reduce(
      (sum, w) => sum + w.amount,
      0
    );
    const qualifyingDeposits = allDeposits
      .filter(d => !d.isTransfer)
      .reduce((sum, d) => sum + d.amount, 0);

    monthlyBreakdown.push({
      month: "All Transactions",
      totalDeposits,
      totalWithdrawals,
      netFlow: totalDeposits - totalWithdrawals,
      qualifyingDeposits,
      openingBalance: extracted.accountInfo?.openingBalance || 0,
      closingBalance: extracted.accountInfo?.closingBalance || 0
    });
  }

  // Calculate totals and averages
  const totalGrossDeposits = allDeposits.reduce((sum, d) => sum + d.amount, 0);
  const depositsExcluded = totalTransfers;
  const netDeposits = totalGrossDeposits - depositsExcluded;
  const monthsAnalyzed = Math.max(monthlyBreakdown.length, 1);
  const averageMonthlyNetDeposits = netDeposits / monthsAnalyzed;

  // Calculate qualifying income with adjustments
  const baseQualifyingIncome = averageMonthlyNetDeposits;
  const ownershipAdjustedIncome =
    baseQualifyingIncome * (input.businessOwnershipPercent / 100);
  const expenseAdjustedIncome =
    ownershipAdjustedIncome * (1 - input.expenseRatio / 100);
  const qualifyingIncome = Math.round(expenseAdjustedIncome * 100) / 100;

  // Identify large deposits (>50% of average)
  const largeDepositThreshold = averageMonthlyNetDeposits * 0.5;
  const largeDeposits = allDeposits
    .filter(d => !d.isTransfer && d.amount > largeDepositThreshold)
    .map(d => ({
      date: d.date,
      amount: d.amount,
      description: d.description,
      percentOfAverage: Math.round(
        (d.amount / averageMonthlyNetDeposits) * 100
      ),
      requiresExplanation: true
    }))
    .slice(0, 50); // Limit to 50

  // Identify inconsistent months
  const inconsistentThreshold = averageMonthlyNetDeposits * 0.2;
  const inconsistentMonths = monthlyBreakdown
    .filter(m => m.qualifyingDeposits < inconsistentThreshold)
    .map(m => m.month);

  // Determine income stability
  let incomeStability:
    | "stable"
    | "variable"
    | "declining"
    | "growing"
    | "inconsistent" = "stable";

  if (inconsistentMonths.length >= Math.floor(monthsAnalyzed * 0.4)) {
    incomeStability = "inconsistent";
  } else if (monthlyBreakdown.length > 1) {
    const firstHalf = monthlyBreakdown.slice(0, Math.floor(monthsAnalyzed / 2));
    const secondHalf = monthlyBreakdown.slice(Math.floor(monthsAnalyzed / 2));

    if (firstHalf.length > 0 && secondHalf.length > 0) {
      const firstAvg =
        firstHalf.reduce((sum, m) => sum + m.qualifyingDeposits, 0) /
        firstHalf.length;
      const secondAvg =
        secondHalf.reduce((sum, m) => sum + m.qualifyingDeposits, 0) /
        secondHalf.length;

      if (secondAvg > firstAvg * 1.2) {
        incomeStability = "growing";
      } else if (secondAvg < firstAvg * 0.8) {
        incomeStability = "declining";
      }
    }
  }

  // Build qualification insights
  const redFlags: string[] = [];
  const explanationRequired: string[] = [];
  const recommendations: string[] = [];

  if (nsfCount + overdraftCount > 0) {
    redFlags.push(
      `${nsfCount + overdraftCount} NSF/overdraft occurrences detected`
    );
    explanationRequired.push(
      "Letter of explanation for NSF/overdraft activity"
    );
  }

  if (largeDeposits.length > 0) {
    explanationRequired.push(
      `Source documentation for ${largeDeposits.length} large deposits`
    );
  }

  if (incomeStability === "inconsistent" || incomeStability === "declining") {
    redFlags.push(`Income pattern is ${incomeStability}`);
    recommendations.push("Consider averaging income over longer period");
  }

  if (inconsistentMonths.length > 0) {
    explanationRequired.push(
      `Explanation for inconsistent deposits in ${inconsistentMonths.length} months`
    );
  }

  if (qualifyingIncome > 0 && nsfCount === 0 && overdraftCount === 0) {
    recommendations.push("Strong cash flow with no NSF/overdraft issues");
  }

  if (incomeStability === "stable" || incomeStability === "growing") {
    recommendations.push(
      `Income shows ${incomeStability} pattern - favorable for qualification`
    );
  }

  return {
    // Account Information
    businessName: extracted.accountInfo?.businessName,
    accountHolder: extracted.accountInfo?.accountHolder,
    bankName: extracted.accountInfo?.bankName,
    accountNumber: extracted.accountInfo?.accountNumber,
    statementPeriod: extracted.accountInfo?.statementPeriod,
    monthsAnalyzed,

    // Balance Information
    openingBalance: extracted.accountInfo?.openingBalance || 0,
    endingBalance: extracted.accountInfo?.closingBalance || 0,

    // Income Analysis
    totalGrossDeposits: Math.round(totalGrossDeposits * 100) / 100,
    depositsExcluded: Math.round(depositsExcluded * 100) / 100,
    netDeposits: Math.round(netDeposits * 100) / 100,
    averageMonthlyNetDeposits:
      Math.round(averageMonthlyNetDeposits * 100) / 100,
    qualifyingIncome,

    // Income Stability
    incomeStability,
    inconsistentMonths,

    // NSF/Overdraft
    nsfCount,
    overdraftCount,
    nsfDetails: nsfDetails.slice(0, 50),

    // Large Deposits
    largeDeposits,

    // Transaction Details (limited)
    deposits: allDeposits.slice(0, 100),
    withdrawals: allWithdrawals.slice(0, 100),

    // Monthly Breakdown
    monthlyBreakdown,

    // Qualification Insights
    qualificationInsights: {
      baseQualifyingIncome: Math.round(baseQualifyingIncome * 100) / 100,
      ownershipAdjustedIncome: Math.round(ownershipAdjustedIncome * 100) / 100,
      expenseAdjustedIncome: Math.round(expenseAdjustedIncome * 100) / 100,
      redFlags,
      explanationRequired,
      recommendations
    },

    // Document Quality
    documentQuality: {
      isComplete: monthlyBreakdown.length >= input.monthsToAnalyze,
      missingPages:
        monthlyBreakdown.length < input.monthsToAnalyze
          ? [
              `Missing ${input.monthsToAnalyze - monthlyBreakdown.length} month(s) of data`
            ]
          : undefined,
      clarity:
        allDeposits.length > 50
          ? ("excellent" as const)
          : allDeposits.length > 25
            ? ("good" as const)
            : allDeposits.length > 10
              ? ("fair" as const)
              : ("poor" as const)
    }
  };
}

/**
 * Main tool implementation with streaming progress updates
 */
const bankStatementAnalyzer: ToolSpec<
  typeof bankStatementAnalyzerInputSchema,
  typeof bankStatementAnalyzerOutputSchema
> = {
  slug: "bank-statement-analyzer",
  name: "Bank Statement Analyzer",
  description:
    "Analyze bank statements for loan qualification with AI-powered extraction",
  version: "6.0.0",
  inputSchema: bankStatementAnalyzerInputSchema,
  outputSchema: bankStatementAnalyzerOutputSchema,

  execute: async (input, context) => {
    try {
      logger.info("Starting bank statement analysis v6", {
        fileName: input.fileName,
        fileSize: input.fileSize,
        documentType: input.documentType,
        monthsToAnalyze: input.monthsToAnalyze
      });

      // Validate file size (max 10MB)
      if (input.fileSize && input.fileSize > 10 * 1024 * 1024) {
        throw new Error(
          "File size exceeds 10MB limit. Please upload a smaller PDF."
        );
      }

      // Process base64 data - handle both data URL and raw base64
      let pdfBase64 = input.fileData;
      if (pdfBase64.includes(",")) {
        // It's a data URL, extract the base64 part
        pdfBase64 = pdfBase64.split(",")[1];
      }

      // Upload the PDF and get a signed URL
      const fileBuffer = Buffer.from(pdfBase64, "base64");
      const filename = input.fileName || `bank-statement-${Date.now()}.pdf`;
      const userId = context?.userId || "anonymous";

      logger.info("Uploading PDF to storage", {
        filename,
        fileSize: fileBuffer.length
      });

      // Generate storage path
      const storagePath = `${userId}/${context?.sessionId || 'default'}/${filename}`;

      // Upload file
      const uploadResult = await uploadToBucket(
        CHAT_ATTACHMENTS_BUCKET,
        storagePath,
        fileBuffer,
        {
          contentType: input.fileType || "application/pdf",
          upsert: false
        }
      );

      if (uploadResult.error) {
        throw new Error(`Failed to upload file: ${uploadResult.error.message || 'Unknown error'}`);
      }

      // Get signed URL
      const signedUrlResult = await getSignedUrl(
        CHAT_ATTACHMENTS_BUCKET,
        storagePath,
        DEFAULT_EXPIRATION_SECONDS
      );

      if (signedUrlResult.error) {
        throw new Error(`Failed to get signed URL: ${signedUrlResult.error.message || 'Unknown error'}`);
      }

      const signedUrl = signedUrlResult.data?.signedUrl;

      if (!signedUrl) {
        throw new Error("Failed to upload PDF file. Please try again.");
      }

      logger.info("PDF uploaded successfully", {
        storagePath,
        signedUrl: signedUrl.substring(0, 100) + "..."
      });

      // Extract data with streaming approach
      logger.info("Starting streaming extraction");

      const progressCallback = (message: string) => {
        logger.info("Extraction progress", { message });
      };

      const extracted = await extractWithStreaming(
        signedUrl,
        input.documentType,
        input.monthsToAnalyze,
        progressCallback
      );

      logger.info("Extraction completed", {
        hasAccountInfo: !!extracted.accountInfo,
        transactionCount: extracted.transactions?.length || 0,
        monthsExtracted: Object.keys(extracted.monthlyData || {}).length
      });

      // Process into final output
      const result = processExtractedData(extracted, input);

      logger.info("Bank statement analysis completed successfully", {
        qualifyingIncome: result.qualifyingIncome,
        nsfCount: result.nsfCount,
        overdraftCount: result.overdraftCount,
        incomeStability: result.incomeStability,
        monthsAnalyzed: result.monthsAnalyzed
      });

      // Add the signed URL to the result for viewing the original document
      return {
        ...result,
        originalDocumentUrl: signedUrl
      };
    } catch (error) {
      logger.error("Bank statement analysis failed", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });

      // Check if it's a JSON parsing error
      if (error instanceof Error && error.message.includes("JSON")) {
        throw new Error(
          "The bank statement is too large to process in one go. Please try uploading a statement with fewer pages or months."
        );
      }

      throw new Error(
        error instanceof Error
          ? `Analysis failed: ${error.message}`
          : "Analysis failed. Please try again with a clearer PDF."
      );
    }
  }
};

export default bankStatementAnalyzer;

// Export schemas for UI
export const Input = bankStatementAnalyzerInputSchema;
export const Output = bankStatementAnalyzerOutputSchema;
