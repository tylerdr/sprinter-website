"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAnalytics, GA_EVENTS } from "@/components/analytics/google-analytics"
import { toast } from "sonner"

export function AIAssessmentForm() {
  const { track, trackFormSubmit } = useAnalytics()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track form start
    track(GA_EVENTS.START_ASSESSMENT, {
      category: "Funnel",
      label: "Assessment Form Started",
    })

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch("/api/ai-assessment", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        // Track successful submission
        track(GA_EVENTS.COMPLETE_ASSESSMENT, {
          category: "Funnel",
          label: "Assessment Form Completed",
          value: 1,
        })
        
        trackFormSubmit("ai_assessment", {
          company: formData.get("company"),
          role: formData.get("role"),
        })

        // Redirect to thank you page
        window.location.href = "/ai-assessment/thank-you"
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to submit assessment. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold">Your Information</h3>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" name="firstName" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" name="lastName" required className="mt-1" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Business Email *</Label>
          <Input id="email" name="email" type="email" required className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="company">PE Firm Name *</Label>
          <Input id="company" name="company" required className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="role">Your Role *</Label>
          <Input id="role" name="role" placeholder="e.g., Managing Partner, Operating Partner" required className="mt-1" />
        </div>
      </div>

      {/* Assessment Questions */}
      <div className="space-y-6 border-t border-gray-800 pt-6">
        <h3 className="font-semibold">Quick Assessment Questions</h3>
        
        {/* Question 1 */}
        <div>
          <Label>1. What is your firm's AUM range?</Label>
          <RadioGroup name="aum" className="mt-3 space-y-2" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="<500M" id="aum1" />
              <Label htmlFor="aum1">Less than $500M</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="500M-1B" id="aum2" />
              <Label htmlFor="aum2">$500M - $1B</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1B-5B" id="aum3" />
              <Label htmlFor="aum3">$1B - $5B</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value=">5B" id="aum4" />
              <Label htmlFor="aum4">More than $5B</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Question 2 */}
        <div>
          <Label>2. How many portfolio companies do you currently manage?</Label>
          <RadioGroup name="portfolio_size" className="mt-3 space-y-2" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-5" id="ps1" />
              <Label htmlFor="ps1">1-5 companies</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="6-15" id="ps2" />
              <Label htmlFor="ps2">6-15 companies</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="16-30" id="ps3" />
              <Label htmlFor="ps3">16-30 companies</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value=">30" id="ps4" />
              <Label htmlFor="ps4">More than 30 companies</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Question 3 */}
        <div>
          <Label>3. What's your current AI adoption level?</Label>
          <RadioGroup name="ai_adoption" className="mt-3 space-y-2" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="ai1" />
              <Label htmlFor="ai1">No AI initiatives yet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exploring" id="ai2" />
              <Label htmlFor="ai2">Exploring opportunities</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="piloting" id="ai3" />
              <Label htmlFor="ai3">Running pilots</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="implementing" id="ai4" />
              <Label htmlFor="ai4">Actively implementing</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Question 4 */}
        <div>
          <Label htmlFor="biggest_challenge">
            4. What's your biggest operational challenge that takes the most time?
          </Label>
          <Textarea 
            id="biggest_challenge" 
            name="biggest_challenge"
            placeholder="e.g., Deal sourcing, due diligence, portfolio reporting, value creation..."
            className="mt-2"
            rows={3}
          />
        </div>

        {/* Question 5 */}
        <div>
          <Label htmlFor="primary_interest">
            5. Which AI use case interests you most?
          </Label>
          <RadioGroup name="primary_interest" className="mt-3 space-y-2" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="deal_sourcing" id="pi1" />
              <Label htmlFor="pi1">AI-powered deal sourcing & market mapping</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="due_diligence" id="pi2" />
              <Label htmlFor="pi2">Automated due diligence & document analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="portfolio_ops" id="pi3" />
              <Label htmlFor="pi3">Portfolio company operations & efficiency</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="value_creation" id="pi4" />
              <Label htmlFor="pi4">AI-driven value creation strategies</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Get My Free AI Opportunity Report"}
        </Button>
        <p className="mt-4 text-center text-sm text-gray-500">
          100% free. No credit card required. Results in 24 hours.
        </p>
      </div>
    </form>
  )
}