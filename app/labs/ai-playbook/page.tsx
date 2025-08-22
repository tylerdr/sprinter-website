'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, BookOpen, Target, Users, Calendar, TrendingUp, Download, Share2, Zap, CheckCircle2, AlertCircle, Clock, DollarSign, BarChart3, Shield, Rocket } from 'lucide-react'
import { generatePlaybook } from './actions'
import { toast } from 'sonner'
import { AuthGate } from '@/components/auth/AuthGate'

interface Playbook {
  title: string
  executive_summary: string
  business_case: {
    current_state: string[]
    future_state: string[]
    value_drivers: string[]
    roi_projection: string
  }
  implementation_roadmap: {
    phase: string
    duration: string
    objectives: string[]
    deliverables: string[]
    success_metrics: string[]
  }[]
  technology_stack: {
    category: string
    tools: string[]
    purpose: string
  }[]
  team_structure: {
    role: string
    count: number
    responsibilities: string[]
  }[]
  risk_mitigation: {
    risk: string
    impact: string
    mitigation: string
  }[]
  success_metrics: {
    metric: string
    baseline: string
    target: string
    timeline: string
  }[]
  budget_estimate: {
    category: string
    year1: string
    year2: string
    year3: string
  }[]
}

export default function AIPlaybookBuilder() {
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    size: '',
    challenge: '',
    timeline: '',
    budget: '',
    priorities: ''
  })
  const [playbook, setPlaybook] = useState<Playbook | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!formData.company || !formData.industry || !formData.challenge) {
      toast.error('Please fill in required fields')
      return
    }

    setIsGenerating(true)
    try {
      const result = await generatePlaybook(formData)
      setPlaybook(result)
      toast.success('AI Playbook generated successfully!')
    } catch (error) {
      toast.error('Failed to generate playbook')
    } finally {
      setIsGenerating(false)
    }
  }

  const exportPlaybook = () => {
    if (!playbook) return
    
    const content = JSON.stringify(playbook, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.company}-ai-playbook.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Playbook exported!')
  }

  return (
    <AuthGate feature="AI Playbook Builder" requireAuth={true}>
      <div className="min-h-screen py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />
        
        <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Strategy Builder
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Transformation <span className="gradient-text">Playbook Builder</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate a comprehensive, board-ready AI strategy tailored to your portfolio company's 
            specific needs, industry, and growth objectives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Provide details about your portfolio company to generate a customized AI playbook
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="TechCorp Inc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS / Software</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="fintech">Financial Services</SelectItem>
                        <SelectItem value="retail">Retail / E-commerce</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="logistics">Logistics / Supply Chain</SelectItem>
                        <SelectItem value="energy">Energy / Utilities</SelectItem>
                        <SelectItem value="realestate">Real Estate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) => setFormData({ ...formData, size: value })}
                    >
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">&lt;50 employees</SelectItem>
                        <SelectItem value="small">50-200 employees</SelectItem>
                        <SelectItem value="medium">200-1000 employees</SelectItem>
                        <SelectItem value="large">1000-5000 employees</SelectItem>
                        <SelectItem value="enterprise">5000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Implementation Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    >
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">3 months</SelectItem>
                        <SelectItem value="6months">6 months</SelectItem>
                        <SelectItem value="12months">12 months</SelectItem>
                        <SelectItem value="18months">18 months</SelectItem>
                        <SelectItem value="24months">24+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="&lt;100k">&lt;$100K</SelectItem>
                      <SelectItem value="100-500k">$100K-$500K</SelectItem>
                      <SelectItem value="500k-1m">$500K-$1M</SelectItem>
                      <SelectItem value="1-5m">$1M-$5M</SelectItem>
                      <SelectItem value="5m+">$5M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenge">Primary Challenge / Opportunity *</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Describe the main business challenge or opportunity you want to address with AI..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priorities">Strategic Priorities</Label>
                  <Textarea
                    id="priorities"
                    value={formData.priorities}
                    onChange={(e) => setFormData({ ...formData, priorities: e.target.value })}
                    placeholder="List your top strategic priorities (e.g., cost reduction, revenue growth, customer experience)..."
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                      Generating AI Playbook...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5 mr-2" />
                      Generate AI Playbook
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generated Playbook */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            {playbook ? (
              <Card className="h-full overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{playbook.title}</CardTitle>
                      <CardDescription className="mt-2">
                        Customized AI transformation strategy for {formData.company}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={exportPlaybook}>
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b px-6">
                      <TabsTrigger value="summary">Executive Summary</TabsTrigger>
                      <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="budget">Budget</TabsTrigger>
                    </TabsList>
                    
                    <div className="p-6 max-h-[600px] overflow-y-auto">
                      <TabsContent value="summary" className="space-y-6 mt-0">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-500" />
                            Executive Summary
                          </h3>
                          <p className="text-muted-foreground">{playbook.executive_summary}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            Value Drivers
                          </h3>
                          <div className="space-y-2">
                            {playbook.business_case.value_drivers.map((driver, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                <span className="text-sm">{driver}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3">ROI Projection</h3>
                          <Card className="bg-blue-500/5 border-blue-500/20">
                            <CardContent className="pt-6">
                              <p className="text-2xl font-bold text-blue-500">
                                {playbook.business_case.roi_projection}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="roadmap" className="space-y-4 mt-0">
                        {playbook.implementation_roadmap.map((phase, i) => (
                          <Card key={i} className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">{phase.phase}</CardTitle>
                                <Badge variant="outline">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {phase.duration}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-2">Objectives:</p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {phase.objectives.map((obj, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                      <span className="text-blue-500">•</span>
                                      {obj}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Key Deliverables:</p>
                                <div className="flex flex-wrap gap-2">
                                  {phase.deliverables.map((del, j) => (
                                    <Badge key={j} variant="secondary">
                                      {del}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="metrics" className="space-y-4 mt-0">
                        <div className="grid gap-4">
                          {playbook.success_metrics.map((metric, i) => (
                            <Card key={i}>
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-500" />
                                    <h4 className="font-semibold">{metric.metric}</h4>
                                  </div>
                                  <Badge>{metric.timeline}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Baseline</p>
                                    <p className="font-medium">{metric.baseline}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Target</p>
                                    <p className="font-medium text-green-500">{metric.target}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="budget" className="space-y-4 mt-0">
                        <div className="space-y-4">
                          {playbook.budget_estimate.map((item, i) => (
                            <Card key={i}>
                              <CardContent className="pt-6">
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <DollarSign className="w-5 h-5 text-green-500" />
                                  {item.category}
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Year 1</p>
                                    <p className="font-medium">{item.year1}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Year 2</p>
                                    <p className="font-medium">{item.year2}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Year 3</p>
                                    <p className="font-medium">{item.year3}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-20">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">Generate Your AI Playbook</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Fill in your company details to generate a comprehensive AI transformation strategy
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
    </AuthGate>
  )
}