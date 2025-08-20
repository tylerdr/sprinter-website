// Document and Presentation templates

import type { ProposalTemplate } from '@/lib/types/proposal'

export const documentTemplate: ProposalTemplate = {
  id: 'doc-onepager',
  name: 'One-Pager Document',
  description: 'Template for executive summary documents',
  type: 'custom',
  contentType: 'document',
  contentSchema: {
    sections: [
      {
        id: 'title',
        title: 'Title',
        type: 'text',
        template: `# {{documentTitle}}

{{subtitle}}`,
        required: true,
        order: 1
      },
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        type: 'text',
        template: `## Executive Summary

{{summary}}`,
        required: true,
        order: 2
      },
      {
        id: 'key-points',
        title: 'Key Points',
        type: 'list',
        template: `## Key Points

{{#keyPoints}}
• {{.}}
{{/keyPoints}}`,
        required: true,
        order: 3
      },
      {
        id: 'details',
        title: 'Details',
        type: 'text',
        template: `## {{detailsTitle}}

{{detailsContent}}`,
        required: false,
        order: 4
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        type: 'list',
        template: `## Next Steps

{{#nextSteps}}
1. {{.}}
{{/nextSteps}}`,
        required: true,
        order: 5
      },
      {
        id: 'contact',
        title: 'Contact',
        type: 'text',
        template: `## Contact Information

**{{contactName}}**
{{contactTitle}}
{{contactEmail}}
{{contactPhone}}`,
        required: false,
        order: 6
      }
    ],
    variables: [
      { key: 'documentTitle', label: 'Document Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text', required: false },
      { key: 'summary', label: 'Executive Summary', type: 'textarea', required: true },
      { key: 'keyPoints', label: 'Key Points (array)', type: 'array', required: true },
      { key: 'detailsTitle', label: 'Details Section Title', type: 'text', required: false, defaultValue: 'Details' },
      { key: 'detailsContent', label: 'Details Content', type: 'textarea', required: false },
      { key: 'nextSteps', label: 'Next Steps (array)', type: 'array', required: true },
      { key: 'contactName', label: 'Contact Name', type: 'text', required: false },
      { key: 'contactTitle', label: 'Contact Title', type: 'text', required: false },
      { key: 'contactEmail', label: 'Contact Email', type: 'email', required: false },
      { key: 'contactPhone', label: 'Contact Phone', type: 'text', required: false }
    ]
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const reportTemplate: ProposalTemplate = {
  id: 'doc-report',
  name: 'Analysis Report',
  description: 'Template for detailed analysis reports',
  type: 'custom',
  contentType: 'document',
  contentSchema: {
    sections: [
      {
        id: 'cover',
        title: 'Cover Page',
        type: 'text',
        template: `# {{reportTitle}}

**{{reportType}} Report**

Prepared for: {{clientName}}
Date: {{date}}
Author: {{author}}`,
        required: true,
        order: 1
      },
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        type: 'text',
        template: `## Executive Summary

{{executiveSummary}}

**Key Findings:**
{{#keyFindings}}
• {{.}}
{{/keyFindings}}`,
        required: true,
        order: 2
      },
      {
        id: 'methodology',
        title: 'Methodology',
        type: 'text',
        template: `## Methodology

{{methodology}}`,
        required: true,
        order: 3
      },
      {
        id: 'findings',
        title: 'Detailed Findings',
        type: 'text',
        template: `## Detailed Findings

{{#findings}}
### {{title}}

{{description}}

**Impact:** {{impact}}
**Priority:** {{priority}}

{{/findings}}`,
        required: true,
        order: 4
      },
      {
        id: 'recommendations',
        title: 'Recommendations',
        type: 'list',
        template: `## Recommendations

{{#recommendations}}
### {{title}}

{{description}}

**Timeline:** {{timeline}}
**Resources:** {{resources}}

{{/recommendations}}`,
        required: true,
        order: 5
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        type: 'text',
        template: `## Conclusion

{{conclusion}}`,
        required: true,
        order: 6
      },
      {
        id: 'appendix',
        title: 'Appendix',
        type: 'text',
        template: `## Appendix

{{appendixContent}}`,
        required: false,
        order: 7
      }
    ],
    variables: [
      { key: 'reportTitle', label: 'Report Title', type: 'text', required: true },
      { key: 'reportType', label: 'Report Type', type: 'text', required: true, defaultValue: 'Analysis' },
      { key: 'clientName', label: 'Client Name', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'author', label: 'Author', type: 'text', required: true },
      { key: 'executiveSummary', label: 'Executive Summary', type: 'textarea', required: true },
      { key: 'keyFindings', label: 'Key Findings (array)', type: 'array', required: true },
      { key: 'methodology', label: 'Methodology', type: 'textarea', required: true },
      { key: 'findings', label: 'Detailed Findings (array of objects)', type: 'array', required: true },
      { key: 'recommendations', label: 'Recommendations (array of objects)', type: 'array', required: true },
      { key: 'conclusion', label: 'Conclusion', type: 'textarea', required: true },
      { key: 'appendixContent', label: 'Appendix Content', type: 'textarea', required: false }
    ]
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const presentationTemplate: ProposalTemplate = {
  id: 'pres-pitch',
  name: 'Pitch Deck',
  description: 'Template for investor pitch presentations',
  type: 'custom',
  contentType: 'presentation',
  contentSchema: {
    sections: [
      {
        id: 'title-slide',
        title: 'Title Slide',
        type: 'slide',
        template: `# {{companyName}}

## {{tagline}}

{{date}}`,
        required: true,
        order: 1,
        layout: 'full',
        background: 'gradient'
      },
      {
        id: 'problem',
        title: 'The Problem',
        type: 'slide',
        template: `## The Problem

{{problemStatement}}

**Market Pain Points:**
{{#painPoints}}
• {{.}}
{{/painPoints}}`,
        required: true,
        order: 2,
        layout: 'full'
      },
      {
        id: 'solution',
        title: 'Our Solution',
        type: 'slide',
        template: `## Our Solution

{{solutionDescription}}

**Key Features:**
{{#features}}
• {{.}}
{{/features}}`,
        required: true,
        order: 3,
        layout: 'full'
      },
      {
        id: 'market',
        title: 'Market Opportunity',
        type: 'slide',
        template: `## Market Opportunity

**TAM:** {{tam}}
**SAM:** {{sam}}
**SOM:** {{som}}

{{marketDescription}}`,
        required: true,
        order: 4,
        layout: 'half'
      },
      {
        id: 'business-model',
        title: 'Business Model',
        type: 'slide',
        template: `## Business Model

{{businessModel}}

**Revenue Streams:**
{{#revenueStreams}}
• {{.}}
{{/revenueStreams}}`,
        required: true,
        order: 5,
        layout: 'full'
      },
      {
        id: 'traction',
        title: 'Traction',
        type: 'slide',
        template: `## Traction

{{#metrics}}
**{{label}}:** {{value}}
{{/metrics}}

{{tractionDescription}}`,
        required: false,
        order: 6,
        layout: 'half'
      },
      {
        id: 'team',
        title: 'Team',
        type: 'slide',
        template: `## Team

{{#teamMembers}}
### {{name}}
**{{role}}**
{{bio}}

{{/teamMembers}}`,
        required: true,
        order: 7,
        layout: 'full'
      },
      {
        id: 'ask',
        title: 'The Ask',
        type: 'slide',
        template: `## The Ask

**Raising:** {{raiseAmount}}
**Valuation:** {{valuation}}

**Use of Funds:**
{{#useOfFunds}}
• {{category}}: {{amount}}
{{/useOfFunds}}`,
        required: true,
        order: 8,
        layout: 'full'
      },
      {
        id: 'contact',
        title: 'Contact',
        type: 'slide',
        template: `## Thank You

**Contact:**
{{contactName}}
{{contactEmail}}
{{contactPhone}}

{{website}}`,
        required: true,
        order: 9,
        layout: 'full',
        background: 'gradient'
      }
    ],
    variables: [
      { key: 'companyName', label: 'Company Name', type: 'text', required: true },
      { key: 'tagline', label: 'Tagline', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'problemStatement', label: 'Problem Statement', type: 'textarea', required: true },
      { key: 'painPoints', label: 'Pain Points (array)', type: 'array', required: true },
      { key: 'solutionDescription', label: 'Solution Description', type: 'textarea', required: true },
      { key: 'features', label: 'Key Features (array)', type: 'array', required: true },
      { key: 'tam', label: 'TAM (Total Addressable Market)', type: 'text', required: true },
      { key: 'sam', label: 'SAM (Serviceable Addressable Market)', type: 'text', required: true },
      { key: 'som', label: 'SOM (Serviceable Obtainable Market)', type: 'text', required: true },
      { key: 'marketDescription', label: 'Market Description', type: 'textarea', required: true },
      { key: 'businessModel', label: 'Business Model', type: 'textarea', required: true },
      { key: 'revenueStreams', label: 'Revenue Streams (array)', type: 'array', required: true },
      { key: 'metrics', label: 'Traction Metrics (array of objects)', type: 'array', required: false },
      { key: 'tractionDescription', label: 'Traction Description', type: 'textarea', required: false },
      { key: 'teamMembers', label: 'Team Members (array of objects)', type: 'array', required: true },
      { key: 'raiseAmount', label: 'Raise Amount', type: 'text', required: true },
      { key: 'valuation', label: 'Valuation', type: 'text', required: true },
      { key: 'useOfFunds', label: 'Use of Funds (array of objects)', type: 'array', required: true },
      { key: 'contactName', label: 'Contact Name', type: 'text', required: true },
      { key: 'contactEmail', label: 'Contact Email', type: 'email', required: true },
      { key: 'contactPhone', label: 'Contact Phone', type: 'text', required: false },
      { key: 'website', label: 'Website', type: 'text', required: false }
    ]
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const documentTemplates = [
  documentTemplate,
  reportTemplate,
  presentationTemplate
]