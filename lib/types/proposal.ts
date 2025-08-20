// Proposal types and interfaces

export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined' | 'expired'
export type ProposalAccessType = 'public' | 'password' | 'magic_link' | 'authenticated'
export type ProposalProjectType = 'poc_sprint' | 'workshop' | 'transformation' | 'venture' | 'custom'
export type ContentType = 'proposal' | 'document' | 'presentation'

export interface ProposalSection {
  id: string
  title: string
  type: 'text' | 'list' | 'table' | 'timeline' | 'pricing' | 'signature' | 'custom' | 'slide' | 'bullet_points'
  content: unknown
  order: number
  layout?: 'full' | 'half' | 'third' // For presentation layouts
  background?: string // For slide backgrounds
}

export interface ProposalContent {
  coverPage: {
    title: string
    subtitle?: string
    clientName: string
    clientCompany?: string
    date: string
    confidential?: boolean
  }
  greeting?: {
    salutation: string
    body: string
  }
  sections: ProposalSection[]
  appendix?: ProposalSection[]
}

export interface ProposalMetrics {
  goals: Array<{
    title: string
    description: string
    metric?: string
    target?: string
  }>
  successCriteria: Array<{
    criterion: string
    measurement: string
  }>
}

export interface ProposalScope {
  approach: string
  tasks: string[]
  deliverables: Array<{
    name: string
    description: string
    format?: string
  }>
  outOfScope?: string[]
}

export interface ProposalTimeline {
  duration: string
  startDate?: string
  milestones: Array<{
    week?: number
    date?: string
    title: string
    description: string
    deliverables?: string[]
  }>
  meetings?: Array<{
    frequency: string
    duration: string
    purpose: string
  }>
}

export interface ProposalPricing {
  totalValue: number
  currency: string
  structure: 'fixed' | 'hourly' | 'retainer' | 'equity' | 'hybrid'
  paymentTerms: string
  schedule?: Array<{
    percentage: number
    amount?: number
    milestone: string
    dueDate?: string
  }>
  additionalTerms?: string[]
  creditTowardNextPhase?: {
    amount: number
    conditions: string
  }
}

export interface ProposalRequirement {
  id: string
  title: string
  description?: string
  category: 'data' | 'access' | 'personnel' | 'technical' | 'other'
  isRequired: boolean
  isCompleted?: boolean
  completedAt?: string
  notes?: string
}

export interface Proposal {
  id: string
  
  // Metadata
  title: string
  clientName: string
  clientCompany?: string
  clientEmail: string
  projectType: ProposalProjectType
  contentType?: ContentType // 'proposal' | 'document' | 'presentation'
  
  // Content
  content: ProposalContent
  templateId?: string
  
  // Business details
  metrics?: ProposalMetrics
  scope?: ProposalScope
  timeline?: ProposalTimeline
  pricing?: ProposalPricing
  requirements?: ProposalRequirement[]
  guarantee?: {
    title: string
    description: string
    terms?: string[]
  }
  
  // Access control
  accessType: ProposalAccessType
  accessToken?: string
  passwordHash?: string
  expiresAt?: string
  
  // Status tracking
  status: ProposalStatus
  sentAt?: string
  firstViewedAt?: string
  lastViewedAt?: string
  acceptedAt?: string
  declinedAt?: string
  
  // Financial
  totalValue?: number
  currency?: string
  paymentTerms?: string
  
  // Relationships
  createdBy?: string
  ownerId?: string
  
  // Timestamps
  createdAt: string
  updatedAt: string
}

export interface ProposalTemplate {
  id: string
  name: string
  description?: string
  type: ProposalProjectType
  contentType?: ContentType // For document and presentation templates
  contentSchema: {
    sections: Array<{
      id: string
      title: string
      type: string
      template: string // Template with {{variables}}
      required: boolean
      order: number
    }>
    variables: Array<{
      key: string
      label: string
      type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'array'
      required: boolean
      defaultValue?: unknown
      options?: Array<{ value: string; label: string }>
    }>
  }
  isActive: boolean
  createdBy?: string
  createdAt: string
  updatedAt: string
}

export interface ProposalView {
  id: string
  proposalId: string
  viewerId?: string
  sessionId?: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  viewedAt: string
  durationSeconds?: number
  pagesViewed?: string[]
}

export interface ProposalEvent {
  id: string
  proposalId: string
  viewerId?: string
  sessionId?: string
  eventType: 'pdf_download' | 'chat_opened' | 'question_asked' | 'file_uploaded' | 'link_clicked' | 'section_viewed'
  eventData?: Record<string, unknown>
  createdAt: string
}

export interface ProposalChat {
  id: string
  proposalId: string
  viewerId?: string
  sessionId?: string
  role: 'user' | 'assistant' | 'system'
  content: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface ProposalUpload {
  id: string
  proposalId: string
  uploadedBy?: string
  fileName: string
  fileSize?: number
  fileType?: string
  storagePath: string
  description?: string
  category?: string
  isClientUpload: boolean
  uploadedAt: string
}

export interface ProposalSignature {
  id: string
  proposalId: string
  signerName: string
  signerEmail: string
  signerTitle?: string
  signatureData: string
  ipAddress?: string
  signedAt: string
}

// Proposal generation types
export interface ProposalGenerationInput {
  templateId: string
  clientInfo: {
    name: string
    company?: string
    email: string
    contactName?: string
  }
  projectDetails: {
    type: ProposalProjectType
    title: string
    problem: string
    opportunity: string
    goals: string[]
    successMetrics?: string[]
  }
  scope: {
    approach: string
    tasks: string[]
    deliverables: string[]
    outOfScope?: string[]
  }
  timeline: {
    duration: string
    startDate?: string
    milestones: Array<{
      title: string
      description: string
      timing: string
    }>
  }
  pricing: {
    total: number
    structure: 'fixed' | 'hourly' | 'retainer'
    paymentTerms: string
    creditOption?: boolean
  }
  requirements?: string[]
  customSections?: Array<{
    title: string
    content: string
  }>
}

export interface ProposalAnalytics {
  proposalId: string
  totalViews: number
  uniqueViewers: number
  averageViewDuration: number
  lastViewedAt?: string
  downloadCount: number
  chatInteractions: number
  fileUploads: number
  conversionRate?: number
  engagementScore?: number
}