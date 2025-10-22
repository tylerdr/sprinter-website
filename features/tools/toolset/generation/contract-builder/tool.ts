import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";

// Input schema
export const contractBuilderInputSchema = z.object({
  contractType: z.enum(["service_agreement", "nda", "employment", "partnership", "licensing", "sales", "consulting", "custom"]).describe("Type of contract"),
  partyA: z.object({
    name: z.string(),
    type: z.enum(["individual", "company", "organization"]),
    address: z.string(),
    jurisdiction: z.string()
  }).describe("First party details"),
  partyB: z.object({
    name: z.string(),
    type: z.enum(["individual", "company", "organization"]),
    address: z.string(),
    jurisdiction: z.string()
  }).describe("Second party details"),
  contractTerms: z.object({
    duration: z.string().describe("Contract duration"),
    startDate: z.string().describe("Contract start date"),
    endDate: z.string().optional().describe("Contract end date (if applicable)"),
    renewalTerms: z.string().optional().describe("Renewal terms if applicable")
  }).describe("Contract term details"),
  scope: z.string().describe("Detailed scope of work or services"),
  compensation: z.object({
    amount: z.number().optional().describe("Total compensation amount"),
    structure: z.enum(["fixed", "hourly", "milestone", "commission", "equity", "other"]),
    paymentTerms: z.string().describe("Payment terms and schedule"),
    currency: z.string().default("USD")
  }).describe("Compensation structure"),
  deliverables: z.array(z.string()).describe("Key deliverables or obligations"),
  keyProvisions: z.array(z.string()).describe("Important contract provisions"),
  jurisdiction_law: z.string().describe("Governing law and jurisdiction"),
  terminationClauses: z.array(z.string()).describe("Contract termination conditions"),
  confidentialityLevel: z.enum(["none", "standard", "high", "mutual"]).describe("Level of confidentiality required"),
  liability_limitations: z.string().describe("Liability limitations and caps"),
  disputeResolution: z.enum(["litigation", "arbitration", "mediation", "negotiation"]).describe("Dispute resolution method"),
  specialClauses: z.array(z.string()).optional().describe("Any special clauses or provisions")
});

// Output schema
export const contractBuilderOutputSchema = z.object({
  contractTitle: z.string().describe("Formal contract title"),
  preamble: z.string().describe("Contract opening and party identification"),
  definitions: z.array(z.object({
    term: z.string(),
    definition: z.string()
  })).describe("Key terms and definitions"),
  mainClauses: z.array(z.object({
    clause: z.string(),
    title: z.string(),
    content: z.string(),
    subclauses: z.array(z.string()).optional()
  })).describe("Main contract clauses"),
  schedules: z.array(z.object({
    title: z.string(),
    content: z.string(),
    items: z.array(z.string())
  })).describe("Contract schedules and attachments"),
  signatureBlocks: z.object({
    partyA: z.object({
      signatureLine: z.string(),
      dateLine: z.string(),
      witnessLine: z.string().optional()
    }),
    partyB: z.object({
      signatureLine: z.string(),
      dateLine: z.string(),
      witnessLine: z.string().optional()
    })
  }).describe("Signature block formatting"),
  legalCompliance: z.object({
    complianceNotes: z.array(z.string()),
    requiredDisclosures: z.array(z.string()),
    jurisdiction_requirements: z.array(z.string())
  }).describe("Legal compliance considerations"),
  riskAssessment: z.array(z.object({
    risk: z.string(),
    severity: z.enum(["low", "medium", "high"]),
    mitigation: z.string()
  })).describe("Risk assessment and mitigation"),
  recommendations: z.array(z.string()).describe("Legal recommendations and best practices"),
  reviewChecklist: z.array(z.object({
    category: z.string(),
    items: z.array(z.string())
  })).describe("Contract review checklist"),
  amendments: z.object({
    process: z.string(),
    requirements: z.array(z.string())
  }).describe("Amendment process and requirements"),
  executionRequirements: z.array(z.string()).describe("Requirements for contract execution")
});

export type ContractBuilderInput = z.infer<typeof contractBuilderInputSchema>;
export type ContractBuilderOutput = z.infer<typeof contractBuilderOutputSchema>;

const contractBuilderTool: ToolSpec<
  typeof contractBuilderInputSchema,
  typeof contractBuilderOutputSchema
> = {
  slug: "contract-builder",
  name: "AI Contract Builder",
  description: "Generate professional contracts with AI assistance and legal guidance",
  version: "1.0.0",
  inputSchema: contractBuilderInputSchema,
  outputSchema: contractBuilderOutputSchema,

  execute: async (input) => {
    // Generate contract title
    const contractTitle = `${input.contractType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Agreement between ${input.partyA.name} and ${input.partyB.name}`;

    // Generate preamble
    const preamble = `This ${input.contractType.replace(/_/g, ' ')} agreement ("Agreement") is entered into on ${input.contractTerms.startDate} by and between ${input.partyA.name}, a ${input.partyA.type} organized under the laws of ${input.partyA.jurisdiction} with its principal place of business at ${input.partyA.address} ("${input.partyA.type === 'individual' ? 'Individual' : 'Company'}"), and ${input.partyB.name}, a ${input.partyB.type} organized under the laws of ${input.partyB.jurisdiction} with its principal place of business at ${input.partyB.address} ("${input.partyB.type === 'individual' ? 'Client' : 'Contractor'}").`;

    // Generate definitions
    const definitions = [
      {
        term: "Agreement",
        definition: "This contract and all schedules, exhibits, and amendments thereto"
      },
      {
        term: "Services",
        definition: input.scope
      },
      {
        term: "Deliverables",
        definition: "The specific work products, reports, or services to be provided under this Agreement"
      },
      {
        term: "Confidential Information",
        definition: "Any non-public, proprietary, or confidential information disclosed by either party"
      }
    ];

    // Add contract-specific definitions
    if (input.contractType === "employment") {
      definitions.push({
        term: "Employment Period",
        definition: `The period of employment commencing on ${input.contractTerms.startDate} and continuing until terminated`
      });
    }

    // Generate main clauses
    const mainClauses = [
      {
        clause: "1",
        title: "Scope of Work",
        content: `The scope of work under this Agreement includes: ${input.scope}`,
        subclauses: input.deliverables.map((deliverable, index) =>
          `1.${index + 1} ${deliverable}`
        )
      },
      {
        clause: "2",
        title: "Term and Duration",
        content: `This Agreement shall commence on ${input.contractTerms.startDate} and shall continue for a period of ${input.contractTerms.duration}.`,
        subclauses: input.contractTerms.renewalTerms ? [
          `2.1 Renewal: ${input.contractTerms.renewalTerms}`
        ] : undefined
      },
      {
        clause: "3",
        title: "Compensation and Payment",
        content: `Compensation shall be structured as ${input.compensation.structure} payments.`,
        subclauses: [
          `3.1 Payment Terms: ${input.compensation.paymentTerms}`,
          `3.2 Currency: All payments shall be made in ${input.compensation.currency}`,
          input.compensation.amount ? `3.3 Total Amount: ${input.compensation.currency} ${input.compensation.amount.toLocaleString()}` : ""
        ].filter(Boolean)
      },
      {
        clause: "4",
        title: "Performance and Deliverables",
        content: "The parties agree to perform their respective obligations as follows:",
        subclauses: input.deliverables.map((deliverable, index) =>
          `4.${index + 1} ${deliverable}`
        )
      },
      {
        clause: "5",
        title: "Confidentiality",
        content: input.confidentialityLevel === "none" ?
          "No specific confidentiality obligations apply to this Agreement." :
          `Both parties acknowledge that they may receive confidential information. Each party agrees to maintain the confidentiality of such information and use it solely for the purposes of this Agreement.`,
        subclauses: input.confidentialityLevel !== "none" ? [
          "5.1 Definition of confidential information",
          "5.2 Obligations of receiving party",
          "5.3 Exceptions to confidentiality",
          "5.4 Return of confidential information"
        ] : undefined
      },
      {
        clause: "6",
        title: "Liability and Indemnification",
        content: input.liability_limitations,
        subclauses: [
          "6.1 Limitation of liability",
          "6.2 Indemnification obligations",
          "6.3 Insurance requirements (if applicable)"
        ]
      },
      {
        clause: "7",
        title: "Termination",
        content: "This Agreement may be terminated under the following circumstances:",
        subclauses: input.terminationClauses.map((clause, index) =>
          `7.${index + 1} ${clause}`
        )
      },
      {
        clause: "8",
        title: "Dispute Resolution",
        content: `Any disputes arising under this Agreement shall be resolved through ${input.disputeResolution}.`,
        subclauses: [
          "8.1 Good faith negotiation requirement",
          "8.2 Formal dispute resolution process",
          "8.3 Governing law and jurisdiction"
        ]
      },
      {
        clause: "9",
        title: "General Provisions",
        content: "This Agreement contains the entire agreement between the parties.",
        subclauses: [
          "9.1 Entire agreement",
          "9.2 Amendment process",
          "9.3 Severability",
          "9.4 Governing law",
          "9.5 Force majeure"
        ]
      }
    ];

    // Add special clauses if provided
    if (input.specialClauses && input.specialClauses.length > 0) {
      mainClauses.push({
        clause: "10",
        title: "Special Provisions",
        content: "The following special provisions apply to this Agreement:",
        subclauses: input.specialClauses.map((clause, index) =>
          `10.${index + 1} ${clause}`
        )
      });
    }

    // Generate schedules
    const schedules = [
      {
        title: "Schedule A - Statement of Work",
        content: "Detailed description of services and deliverables",
        items: input.deliverables
      },
      {
        title: "Schedule B - Payment Schedule",
        content: "Detailed payment terms and milestones",
        items: [
          input.compensation.paymentTerms,
          `Total contract value: ${input.compensation.currency} ${input.compensation.amount?.toLocaleString() || 'TBD'}`,
          `Payment structure: ${input.compensation.structure}`
        ]
      }
    ];

    // Generate signature blocks
    const signatureBlocks = {
      partyA: {
        signatureLine: `${input.partyA.name}\nBy: _________________________\nName: \nTitle: \n`,
        dateLine: "Date: _______________",
        witnessLine: input.partyA.type === "individual" ? "Witness: _________________________" : undefined
      },
      partyB: {
        signatureLine: `${input.partyB.name}\nBy: _________________________\nName: \nTitle: \n`,
        dateLine: "Date: _______________",
        witnessLine: input.partyB.type === "individual" ? "Witness: _________________________" : undefined
      }
    };

    // Generate legal compliance
    const legalCompliance = {
      complianceNotes: [
        "This contract should be reviewed by qualified legal counsel",
        "Ensure compliance with local and federal regulations",
        "Verify all parties have authority to enter into this agreement",
        "Consider tax implications of the agreement structure"
      ],
      requiredDisclosures: [
        "Material conflicts of interest",
        "Regulatory compliance requirements",
        "Insurance and bonding requirements",
        "Professional licensing requirements"
      ],
      jurisdiction_requirements: [
        `This agreement is governed by the laws of ${input.jurisdiction_law}`,
        "All parties must have capacity to contract",
        "Contract terms must comply with local regulations",
        "Proper execution and notarization may be required"
      ]
    };

    // Generate risk assessment
    const riskAssessment = [
      {
        risk: "Non-performance by either party",
        severity: "high" as const,
        mitigation: "Include specific performance milestones and remedies for breach"
      },
      {
        risk: "Scope creep or unclear deliverables",
        severity: "medium" as const,
        mitigation: "Define detailed statement of work and change control process"
      },
      {
        risk: "Payment disputes",
        severity: "medium" as const,
        mitigation: "Clear payment terms and dispute resolution procedures"
      },
      {
        risk: "Confidentiality breaches",
        severity: input.confidentialityLevel === "high" ? "high" as const : "medium" as const,
        mitigation: "Robust confidentiality clauses and appropriate remedies"
      }
    ];

    // Generate recommendations
    const recommendations = [
      "Have all parties review the contract with independent legal counsel",
      "Ensure all terms are clearly defined and unambiguous",
      "Include appropriate force majeure and contingency provisions",
      "Consider including alternative dispute resolution mechanisms",
      "Verify insurance and indemnification requirements are adequate",
      "Include clear termination and transition provisions",
      "Ensure compliance with applicable laws and regulations"
    ];

    // Generate review checklist
    const reviewChecklist = [
      {
        category: "Party Information",
        items: [
          "Correct legal names and addresses",
          "Authority to enter into contract",
          "Corporate resolutions if required",
          "Proper entity formation documentation"
        ]
      },
      {
        category: "Terms and Conditions",
        items: [
          "Clear scope of work definition",
          "Appropriate payment terms",
          "Realistic delivery timelines",
          "Adequate termination provisions"
        ]
      },
      {
        category: "Legal Compliance",
        items: [
          "Compliance with applicable laws",
          "Required regulatory approvals",
          "Appropriate governing law clause",
          "Proper dispute resolution mechanisms"
        ]
      },
      {
        category: "Risk Management",
        items: [
          "Adequate liability limitations",
          "Appropriate indemnification clauses",
          "Insurance requirements",
          "Confidentiality protections"
        ]
      }
    ];

    // Generate amendments information
    const amendments = {
      process: "Any amendments to this Agreement must be in writing and signed by all parties",
      requirements: [
        "Written amendment document",
        "Signatures of all parties",
        "Consideration for the modification",
        "Compliance with original contract amendment procedures"
      ]
    };

    // Generate execution requirements
    const executionRequirements = [
      "All parties must sign the agreement",
      "Witnesses may be required depending on jurisdiction",
      "Notarization may be required for certain contract types",
      "Corporate resolutions may be needed for business entities",
      "Proper delivery of executed agreements to all parties",
      "Filing or recording requirements (if applicable)"
    ];

    return {
      contractTitle,
      preamble,
      definitions,
      mainClauses,
      schedules,
      signatureBlocks,
      legalCompliance,
      riskAssessment,
      recommendations,
      reviewChecklist,
      amendments,
      executionRequirements
    };
  }
};

export default contractBuilderTool;