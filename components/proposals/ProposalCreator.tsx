'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Send, Eye, Loader2, AlertCircle, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createProposal } from '@/lib/services/proposal'
import { populateTemplate } from '@/lib/data/proposal-templates'
import type { ProposalTemplate, ProposalGenerationInput } from '@/lib/types/proposal'

interface ProposalCreatorProps {
  templates: ProposalTemplate[]
  userId: string
}

export default function ProposalCreator({ templates, userId }: ProposalCreatorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<ProposalTemplate | null>(null)
  const [formData, setFormData] = useState<ProposalGenerationInput>({
    templateId: '',
    clientInfo: {
      name: '',
      company: '',
      email: '',
      contactName: ''
    },
    projectDetails: {
      type: 'poc_sprint',
      title: '',
      problem: '',
      opportunity: '',
      goals: [],
      successMetrics: []
    },
    scope: {
      approach: '',
      tasks: [],
      deliverables: [],
      outOfScope: []
    },
    timeline: {
      duration: '4 weeks',
      startDate: '',
      milestones: []
    },
    pricing: {
      total: 20000,
      structure: 'fixed',
      paymentTerms: '50% upfront, 50% on delivery',
      creditOption: true
    },
    requirements: []
  })
  
  const [variables, setVariables] = useState<Record<string, unknown>>({})
  const [aiAssist, setAiAssist] = useState(true)
  const [previewContent, setPreviewContent] = useState<string>('')
  const [customSections, setCustomSections] = useState<Array<{ title: string; content: string }>>([])
  
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      setFormData(prev => ({
        ...prev,
        templateId: template.id,
        projectDetails: {
          ...prev.projectDetails,
          type: template.type
        }
      }))
      
      // Initialize variables with defaults
      const defaultVars: Record<string, unknown> = {}
      template.contentSchema.variables.forEach(v => {
        if (v.defaultValue !== undefined) {
          defaultVars[v.key] = v.defaultValue
        }
      })
      setVariables(defaultVars)
    }
  }
  
  const handleVariableChange = (key: string, value: unknown) => {
    setVariables(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  const handleAddArrayItem = (field: string, value: string) => {
    if (!value.trim()) return
    
    const path = field.split('.')
    setFormData(prev => {
      const newData = { ...prev }
      let current: Record<string, unknown> = newData as Record<string, unknown>
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] as Record<string, unknown>
      }
      
      const lastKey = path[path.length - 1]
      if (Array.isArray(current[lastKey])) {
        current[lastKey] = [...(current[lastKey] as string[]), value]
      }
      
      return newData
    })
  }
  
  const handleRemoveArrayItem = (field: string, index: number) => {
    const path = field.split('.')
    setFormData(prev => {
      const newData = { ...prev }
      let current: Record<string, unknown> = newData as Record<string, unknown>
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] as Record<string, unknown>
      }
      
      const lastKey = path[path.length - 1]
      if (Array.isArray(current[lastKey])) {
        current[lastKey] = (current[lastKey] as unknown[]).filter((_, i) => i !== index)
      }
      
      return newData
    })
  }
  
  const generatePreview = () => {
    if (!selectedTemplate) return
    
    let preview = ''
    selectedTemplate.contentSchema.sections.forEach(section => {
      const content = populateTemplate(section.template, variables)
      preview += `## ${section.title}\n\n${content}\n\n`
    })
    
    setPreviewContent(preview)
  }
  
  const handleSave = async (status: 'draft' | 'sent' = 'draft') => {
    if (!selectedTemplate) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Include custom sections in formData
      const inputWithCustomSections = {
        ...formData,
        customSections: customSections.filter(s => s.title && s.content)
      }
      
      // Generate proposal content via API
      const generateResponse = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: inputWithCustomSections,
          template: selectedTemplate,
          useAI: aiAssist
        })
      })
      
      if (!generateResponse.ok) {
        throw new Error('Failed to generate proposal content')
      }
      
      const { content } = await generateResponse.json()
      
      // Create proposal in database
      const proposal = await createProposal({
        title: formData.projectDetails.title,
        clientName: formData.clientInfo.name,
        clientCompany: formData.clientInfo.company,
        clientEmail: formData.clientInfo.email,
        projectType: formData.projectDetails.type,
        content,
        templateId: selectedTemplate.id,
        totalValue: formData.pricing.total,
        currency: 'USD',
        paymentTerms: formData.pricing.paymentTerms,
        accessType: 'magic_link',
        status,
        createdBy: userId,
        ownerId: userId
      })
      
      // Send email if status is 'sent'
      if (status === 'sent') {
        await fetch('/api/proposals/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            proposalId: proposal.id,
            recipientEmail: formData.clientInfo.email,
            accessToken: proposal.accessToken
          })
        })
      }
      
      router.push(`/admin/proposals/${proposal.id}`)
    } catch (error) {
      console.error('Failed to create proposal:', error)
      setError(error instanceof Error ? error.message : 'Failed to create proposal. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Select Template</h2>
        <Select value={selectedTemplate?.id} onValueChange={handleTemplateSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a proposal template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map(template => (
              <SelectItem key={template.id} value={template.id}>
                <div className="flex items-center gap-2">
                  <span>{template.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {template.type}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>
      
      {selectedTemplate && (
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="scope">Scope & Timeline</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="custom">Custom Sections</TabsTrigger>
            <TabsTrigger value="variables">Template Variables</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Client Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientInfo.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      clientInfo: { ...prev.clientInfo, name: e.target.value }
                    }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="clientCompany">Company</Label>
                  <Input
                    id="clientCompany"
                    value={formData.clientInfo.company}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      clientInfo: { ...prev.clientInfo, company: e.target.value }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientInfo.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      clientInfo: { ...prev.clientInfo, email: e.target.value }
                    }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.clientInfo.contactName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      clientInfo: { ...prev.clientInfo, contactName: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 p-4 bg-muted/50 rounded-lg">
                <Switch
                  id="ai-assist"
                  checked={aiAssist}
                  onCheckedChange={setAiAssist}
                />
                <Label htmlFor="ai-assist" className="cursor-pointer">
                  <span className="font-medium">Use AI to enhance content</span>
                  <span className="text-sm text-muted-foreground block">
                    {aiAssist ? 'AI will generate professional, tailored content based on your inputs' : 'Content will be generated from template with your inputs only'}
                  </span>
                </Label>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Project Details</h3>
              
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.projectDetails.title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    projectDetails: { ...prev.projectDetails, title: e.target.value }
                  }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="problem">Problem Statement *</Label>
                <Textarea
                  id="problem"
                  value={formData.projectDetails.problem}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    projectDetails: { ...prev.projectDetails, problem: e.target.value }
                  }))}
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="opportunity">Opportunity *</Label>
                <Textarea
                  id="opportunity"
                  value={formData.projectDetails.opportunity}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    projectDetails: { ...prev.projectDetails, opportunity: e.target.value }
                  }))}
                  rows={3}
                  required
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={aiAssist}
                  onCheckedChange={setAiAssist}
                />
                <Label>Use AI to enhance content</Label>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="scope">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Scope & Timeline</h3>
              
              <div>
                <Label htmlFor="approach">Technical Approach *</Label>
                <Textarea
                  id="approach"
                  value={formData.scope.approach}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    scope: { ...prev.scope, approach: e.target.value }
                  }))}
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.timeline.duration}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      timeline: { ...prev.timeline, duration: e.target.value }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.timeline.startDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      timeline: { ...prev.timeline, startDate: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="pricing">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Pricing & Terms</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="total">Total Value ($)</Label>
                  <Input
                    id="total"
                    type="number"
                    value={formData.pricing.total}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pricing: { ...prev.pricing, total: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="structure">Pricing Structure</Label>
                  <Select 
                    value={formData.pricing.structure}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      pricing: { ...prev.pricing, structure: value as 'fixed' | 'hourly' | 'retainer' }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Price</SelectItem>
                      <SelectItem value="hourly">Hourly Rate</SelectItem>
                      <SelectItem value="retainer">Retainer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Textarea
                  id="paymentTerms"
                  value={formData.pricing.paymentTerms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, paymentTerms: e.target.value }
                  }))}
                  rows={2}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.pricing.creditOption}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, creditOption: checked }
                  }))}
                />
                <Label>Include credit toward next phase</Label>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom">
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Custom Sections</h3>
                  <p className="text-sm text-muted-foreground">
                    Add additional sections not covered by the template
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomSections([...customSections, { title: '', content: '' }])}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </div>
              
              {customSections.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No custom sections added yet
                </div>
              ) : (
                <div className="space-y-4">
                  {customSections.map((section, index) => (
                    <Card key={index} className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-3">
                          <div>
                            <Label htmlFor={`section-title-${index}`}>Section Title</Label>
                            <Input
                              id={`section-title-${index}`}
                              value={section.title}
                              onChange={(e) => {
                                const newSections = [...customSections]
                                newSections[index].title = e.target.value
                                setCustomSections(newSections)
                              }}
                              placeholder="e.g., Technical Approach"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`section-content-${index}`}>Content</Label>
                            <Textarea
                              id={`section-content-${index}`}
                              value={section.content}
                              onChange={(e) => {
                                const newSections = [...customSections]
                                newSections[index].content = e.target.value
                                setCustomSections(newSections)
                              }}
                              placeholder="Describe the content for this section or provide a prompt for AI generation"
                              rows={4}
                            />
                          </div>
                        </div>
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newSections = customSections.filter((_, i) => i !== index)
                            setCustomSections(newSections)
                          }}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="variables">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Template Variables</h3>
              <p className="text-sm text-muted-foreground">
                Fill in the template-specific variables below
              </p>
              
              <div className="space-y-4">
                {selectedTemplate.contentSchema.variables.map(variable => (
                  <div key={variable.key}>
                    <Label htmlFor={variable.key}>
                      {variable.label}
                      {variable.required && ' *'}
                    </Label>
                    
                    {variable.type === 'textarea' ? (
                      <Textarea
                        id={variable.key}
                        value={String(variables[variable.key] || '')}
                        onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                        rows={3}
                        required={variable.required}
                      />
                    ) : variable.type === 'select' && variable.options ? (
                      <Select
                        value={String(variables[variable.key] || '')}
                        onValueChange={(value) => handleVariableChange(variable.key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {variable.options.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={variable.key}
                        type={variable.type === 'number' ? 'number' : variable.type === 'date' ? 'date' : 'text'}
                        value={String(variables[variable.key] || '')}
                        onChange={(e) => handleVariableChange(
                          variable.key,
                          variable.type === 'number' ? parseInt(e.target.value) : e.target.value
                        )}
                        required={variable.required}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Proposal Preview</h3>
                <Button onClick={generatePreview} variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Generate Preview
                </Button>
              </div>
              
              {previewContent && (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: previewContent.replace(/\n/g, '<br />') 
                  }} />
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {/* Action Buttons */}
      {selectedTemplate && (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch checked={aiAssist} onCheckedChange={setAiAssist} />
              <Label>AI Enhancement</Label>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleSave('draft')}
                disabled={loading || !formData.clientInfo.email || !formData.projectDetails.title}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Draft
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => handleSave('sent')}
                disabled={loading || !formData.clientInfo.email || !formData.projectDetails.title}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {aiAssist ? 'AI Generating...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Create & Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}