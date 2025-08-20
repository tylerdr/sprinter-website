'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, MessageSquare, Clock, CheckCircle, ChevronRight, Share2, Presentation, X, ChevronLeft, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import ProposalChat from './ProposalChatV2'
import ProposalRequirements from './ProposalRequirements'
import ProposalSignature from './ProposalSignature'
import ProposalUploads from './ProposalUploads'
import { trackProposalEvent } from '@/lib/services/proposal'
import type { Proposal } from '@/lib/types/proposal'
import { cn } from '@/lib/utils'

interface ProposalViewerProps {
  proposal: Proposal
  isAuthenticated: boolean
}

interface TimelineContent {
  duration?: string
  milestones?: Array<{
    title: string
    timing?: string
    date?: string
    description: string
  }>
}

interface PricingContent {
  totalPrice?: string
  total?: number
  structure?: string
  paymentTerms?: string
  schedule?: Array<{
    milestone: string
    percentage: number
  }>
}

export default function ProposalViewer({ proposal }: ProposalViewerProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [showChat, setShowChat] = useState(false)
  const [viewDuration, setViewDuration] = useState(0)
  const [presentationMode, setPresentationMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sessionId] = useState(() => 
    typeof window !== 'undefined' 
      ? `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      : ''
  )
  const startTimeRef = useRef(Date.now())
  const viewedSectionsRef = useRef<Set<string>>(new Set())
  
  // Track view duration
  useEffect(() => {
    const interval = setInterval(() => {
      setViewDuration(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Track page unload
  useEffect(() => {
    const handleUnload = () => {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const viewedSections = Array.from(viewedSectionsRef.current)
      
      // Use sendBeacon for reliable tracking on page leave
      if (navigator.sendBeacon) {
        const data = new FormData()
        data.append('proposalId', proposal.id)
        data.append('sessionId', sessionId)
        data.append('duration', duration.toString())
        data.append('sections', JSON.stringify(viewedSections))
        
        navigator.sendBeacon('/api/proposals/track-view', data)
      }
    }
    
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [proposal.id, sessionId])
  
  // Get sections early to avoid scope issues
  const sections = proposal.content.sections || []
  
  // Track section views
  useEffect(() => {
    viewedSectionsRef.current.add(activeSection)
    trackProposalEvent(proposal.id, 'section_viewed', sessionId, { section: activeSection })
  }, [activeSection, proposal.id, sessionId])
  
  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!presentationMode) return
      
      switch (e.key) {
        case 'ArrowLeft':
          setCurrentSlide(prev => Math.max(0, prev - 1))
          break
        case 'ArrowRight':
          setCurrentSlide(prev => Math.min(sections.length - 1, prev + 1))
          break
        case 'Escape':
          setPresentationMode(false)
          if (document.fullscreenElement) {
            document.exitFullscreen()
          }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [presentationMode, sections.length])
  
  const handleDownloadPDF = async () => {
    trackProposalEvent(proposal.id, 'pdf_download', sessionId)
    
    // Open PDF generation in new tab
    window.open(`/api/proposals/${proposal.id}/pdf`, '_blank')
  }
  
  const handleOpenChat = () => {
    setShowChat(true)
    trackProposalEvent(proposal.id, 'chat_opened', sessionId)
  }
  
  const handleShare = () => {
    const url = `${window.location.origin}/proposals/${proposal.id}`
    if (proposal.accessToken) {
      const shareUrl = `${url}?token=${proposal.accessToken}`
      navigator.clipboard.writeText(shareUrl)
      // Show toast notification
    }
  }
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const currentSectionIndex = sections.findIndex(s => s.id === activeSection)
  const progress = ((currentSectionIndex + 1) / sections.length) * 100
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">{proposal.title}</h1>
              <Badge variant={proposal.status === 'viewed' ? 'default' : 'secondary'}>
                {proposal.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(viewDuration)}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPresentationMode(true)
                  setCurrentSlide(0)
                  trackProposalEvent(proposal.id, 'presentation_started', sessionId)
                }}
                className="gap-2"
              >
                <Presentation className="h-4 w-4" />
                Present
              </Button>
              
              <Button
                size="sm"
                onClick={handleOpenChat}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Ask Questions
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <Progress value={progress} className="mt-4 h-1" />
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <h3 className="font-semibold mb-4">Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    {viewedSectionsRef.current.has(section.id) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/50" />
                    )}
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
              
              {/* Client info */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium mb-2">Prepared for</h4>
                <p className="text-sm text-muted-foreground">{proposal.clientName}</p>
                {proposal.clientCompany && (
                  <p className="text-sm text-muted-foreground">{proposal.clientCompany}</p>
                )}
              </div>
            </Card>
          </aside>
          
          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="scope">Scope</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="pricing">Investment</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="dataroom">Data Room</TabsTrigger>
              </TabsList>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="overview" className="space-y-6">
                    <ProposalSection
                      section={sections.find(s => s.id === 'overview')}
                    />
                  </TabsContent>
                  
                  <TabsContent value="scope" className="space-y-6">
                    <ProposalSection
                      section={sections.find(s => s.id === 'scope')}
                    />
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="space-y-6">
                    <ProposalSection
                      section={sections.find(s => s.id === 'timeline')}
                    />
                  </TabsContent>
                  
                  <TabsContent value="pricing" className="space-y-6">
                    <ProposalSection
                      section={sections.find(s => s.id === 'pricing')}
                    />
                  </TabsContent>
                  
                  <TabsContent value="requirements" className="space-y-6">
                    <ProposalRequirements proposalId={proposal.id} />
                  </TabsContent>
                  
                  <TabsContent value="dataroom" className="space-y-6">
                    <ProposalUploads proposalId={proposal.id} />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    const prevIndex = Math.max(0, currentSectionIndex - 1)
                    setActiveSection(sections[prevIndex].id)
                  }}
                  disabled={currentSectionIndex === 0}
                >
                  Previous
                </Button>
                
                {currentSectionIndex === sections.length - 1 ? (
                  <ProposalSignature proposalId={proposal.id} />
                ) : (
                  <Button
                    onClick={() => {
                      const nextIndex = Math.min(sections.length - 1, currentSectionIndex + 1)
                      setActiveSection(sections[nextIndex].id)
                    }}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Tabs>
          </main>
        </div>
      </div>
      
      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <ProposalChat
            proposalId={proposal.id}
            proposalContent={proposal.content}
            sessionId={sessionId}
            onClose={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Presentation Mode Overlay */}
      <AnimatePresence>
        {presentationMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Presentation Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">{proposal.title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {currentSlide + 1} / {sections.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (document.documentElement.requestFullscreen) {
                      document.documentElement.requestFullscreen()
                    }
                  }}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPresentationMode(false)
                    trackProposalEvent(proposal.id, 'presentation_ended', sessionId)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Presentation Content */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl w-full"
                >
                  <Card className="p-12">
                    <h1 className="text-3xl font-bold mb-6">
                      {sections[currentSlide]?.title}
                    </h1>
                    <div className="text-lg leading-relaxed">
                      <ProposalSection section={sections[currentSlide]} />
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Presentation Footer Controls */}
            <div className="flex justify-between items-center p-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Progress value={((currentSlide + 1) / sections.length) * 100} className="w-64" />
              
              <Button
                onClick={() => setCurrentSlide(Math.min(sections.length - 1, currentSlide + 1))}
                disabled={currentSlide === sections.length - 1}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Component to render individual proposal sections
function ProposalSection({ 
  section 
}: { 
  section?: {
    id: string
    title: string
    type: string
    content: unknown
    order: number
  }
}) {
  if (!section) return null
  
  const renderContent = () => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: String(section.content) }} />
          </div>
        )
      
      case 'list':
        return (
          <ul className="space-y-3">
            {(section.content as string[]).map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      
      case 'timeline':
        return <TimelineView timeline={section.content as TimelineContent} />
      
      case 'pricing':
        return <PricingView pricing={section.content as PricingContent} />
      
      default:
        return <div>{JSON.stringify(section.content)}</div>
    }
  }
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
      {renderContent()}
    </Card>
  )
}

// Timeline component
function TimelineView({ timeline }: { timeline: {
  duration?: string
  milestones?: Array<{
    title: string
    timing?: string
    date?: string
    description: string
  }>
} }) {
  return (
    <div className="relative">
      {timeline.milestones && timeline.milestones.map((milestone, index) => (
        <div key={index} className="flex gap-4 mb-6">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold">{index + 1}</span>
            </div>
            {timeline.milestones && index < timeline.milestones.length - 1 && (
              <div className="absolute top-10 left-5 w-0.5 h-full bg-border" />
            )}
          </div>
          <div className="flex-1 pb-6">
            <h4 className="font-semibold">{milestone.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{milestone.timing}</p>
            <p className="mt-2">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Pricing component
function PricingView({ pricing }: { pricing: {
  totalPrice?: string
  total?: number
  structure?: string
  paymentTerms?: string
  schedule?: Array<{
    milestone: string
    percentage: number
  }>
} }) {
  return (
    <div className="space-y-6">
      <div className="bg-primary/5 rounded-lg p-6">
        <div className="text-3xl font-bold">{pricing.totalPrice}</div>
        <div className="text-muted-foreground mt-1">{pricing.structure}</div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-3">Payment Terms</h4>
        <p>{pricing.paymentTerms}</p>
      </div>
      
      {pricing.schedule && (
        <div>
          <h4 className="font-semibold mb-3">Payment Schedule</h4>
          <div className="space-y-2">
            {pricing.schedule.map((payment, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>{payment.milestone}</span>
                <span className="font-semibold">{payment.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}