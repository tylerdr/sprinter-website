'use client'

import { useState, useEffect } from 'react'
import { Check, Circle, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { getProposalRequirements, updateRequirement } from '@/lib/services/proposal'
import type { ProposalRequirement } from '@/lib/types/proposal'
import { cn } from '@/lib/utils'

interface ProposalRequirementsProps {
  proposalId: string
}

export default function ProposalRequirements({ proposalId }: ProposalRequirementsProps) {
  const [requirements, setRequirements] = useState<ProposalRequirement[]>([])
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProposalRequirements(proposalId)
        setRequirements(data)
        
        // Initialize notes
        const initialNotes: Record<string, string> = {}
        data.forEach(req => {
          if (req.notes) {
            initialNotes[req.id] = req.notes
          }
        })
        setNotes(initialNotes)
      } catch (error) {
        console.error('Failed to load requirements:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [proposalId])
  
  const handleToggle = async (requirement: ProposalRequirement) => {
    setSaving(requirement.id)
    
    try {
      const updated = await updateRequirement(requirement.id, {
        isCompleted: !requirement.isCompleted,
        completedAt: !requirement.isCompleted ? new Date().toISOString() : undefined
      })
      
      setRequirements(prev => 
        prev.map(req => req.id === requirement.id ? updated : req)
      )
    } catch (error) {
      console.error('Failed to update requirement:', error)
    } finally {
      setSaving(null)
    }
  }
  
  const handleNotesUpdate = async (requirementId: string) => {
    setSaving(requirementId)
    
    try {
      await updateRequirement(requirementId, {
        notes: notes[requirementId]
      })
    } catch (error) {
      console.error('Failed to update notes:', error)
    } finally {
      setSaving(null)
    }
  }
  
  const groupedRequirements = requirements.reduce((acc, req) => {
    const category = req.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(req)
    return acc
  }, {} as Record<string, ProposalRequirement[]>)
  
  const completedCount = requirements.filter(r => r.isCompleted).length
  const totalCount = requirements.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-2 bg-muted rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
        </div>
      </Card>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">What We Need From You</h2>
          <Badge variant={completionPercentage === 100 ? 'default' : 'secondary'}>
            {completedCount} of {totalCount} Complete
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
        
        {completionPercentage === 100 && (
          <div className="mt-4 p-3 bg-green-500/10 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span className="text-sm">All requirements have been provided!</span>
          </div>
        )}
      </Card>
      
      {/* Requirements by Category */}
      {Object.entries(groupedRequirements).map(([category, items]) => (
        <Card key={category} className="p-6">
          <h3 className="font-semibold mb-4 capitalize flex items-center gap-2">
            {category === 'data' && <AlertCircle className="h-4 w-4" />}
            {category} Requirements
          </h3>
          
          <div className="space-y-4">
            {items.map((requirement) => (
              <div 
                key={requirement.id}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  requirement.isCompleted ? "bg-muted/30 border-muted" : "border-border"
                )}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={requirement.isCompleted}
                    onCheckedChange={() => handleToggle(requirement)}
                    disabled={saving === requirement.id}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-medium",
                          requirement.isCompleted && "line-through text-muted-foreground"
                        )}>
                          {requirement.title}
                        </span>
                        {requirement.isRequired && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      
                      {requirement.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {requirement.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Notes section */}
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add notes or details..."
                        value={notes[requirement.id] || ''}
                        onChange={(e) => setNotes(prev => ({
                          ...prev,
                          [requirement.id]: e.target.value
                        }))}
                        className="min-h-[60px] text-sm"
                      />
                      {notes[requirement.id] && notes[requirement.id] !== requirement.notes && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleNotesUpdate(requirement.id)}
                          disabled={saving === requirement.id}
                        >
                          {saving === requirement.id ? 'Saving...' : 'Save Notes'}
                        </Button>
                      )}
                    </div>
                    
                    {requirement.completedAt && (
                      <p className="text-xs text-muted-foreground">
                        Completed on {new Date(requirement.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
      
      {requirements.length === 0 && (
        <Card className="p-12 text-center">
          <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No requirements specified for this proposal</p>
        </Card>
      )}
    </div>
  )
}