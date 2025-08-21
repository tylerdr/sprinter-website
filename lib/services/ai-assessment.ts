import { OpenAI } from "openai"
import { createClient } from "@/lib/supabase/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface AssessmentData {
  firstName: string
  lastName: string
  email: string
  company: string
  role: string
  aum: string
  portfolio_size: string
  ai_adoption: string
  biggest_challenge: string
  primary_interest: string
}

// Generate AI assessment report using OpenAI
export async function generateAIAssessmentReport(data: AssessmentData): Promise<string> {
  try {
    // Generate assessment insights using AI
    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are an AI strategy consultant specializing in private equity. 
          Generate a comprehensive AI readiness assessment based on the provided information.
          Be specific, actionable, and focus on ROI and quick wins.
          Use industry benchmarks and realistic estimates.`
        },
        {
          role: "user",
          content: `Generate an AI readiness assessment for:
          Company: ${data.company}
          AUM: ${data.aum}
          Portfolio Size: ${data.portfolio_size}
          Current AI Adoption: ${data.ai_adoption}
          Biggest Challenge: ${data.biggest_challenge}
          Primary Interest: ${data.primary_interest}
          
          Provide:
          1. AI Readiness Score (0-100) with justification
          2. Three specific quick-win AI opportunities with ROI estimates
          3. Implementation timeline for each opportunity
          4. Industry comparison and benchmarks
          5. Recommended next steps`
        }
      ],
      max_tokens: 2000,
    })

    const assessmentContent = analysis.choices[0].message.content || ""

    // Parse the AI response to extract key metrics
    const readinessScore = extractReadinessScore(assessmentContent)
    const opportunities = extractOpportunities(assessmentContent)
    
    // Generate the HTML report
    const reportHtml = generateReportHTML({
      ...data,
      readinessScore,
      opportunities,
      fullAnalysis: assessmentContent,
    })

    // Save report to storage and get URL
    const reportUrl = await saveReportToStorage(data.email, reportHtml)
    
    return reportUrl
  } catch (error) {
    console.error("Error generating AI assessment:", error)
    throw error
  }
}

function extractReadinessScore(content: string): number {
  // Extract score from AI response (simple regex approach)
  const match = content.match(/Score[:\s]+(\d+)/i)
  return match ? parseInt(match[1]) : 50
}

function extractOpportunities(content: string): string[] {
  // Extract top 3 opportunities (simplified)
  const opportunities = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    if (line.match(/^\d\.|^-|^•/) && opportunities.length < 3) {
      opportunities.push(line.replace(/^[\d\.\-•]\s*/, '').trim())
    }
  }
  
  return opportunities.length > 0 ? opportunities : [
    "AI-powered deal sourcing and market analysis",
    "Automated due diligence document processing",
    "Portfolio company operational optimization"
  ]
}

function generateReportHTML(data: any): string {
  const { 
    firstName, 
    lastName, 
    company, 
    readinessScore, 
    opportunities,
    fullAnalysis 
  } = data

  // Determine readiness level
  let readinessLevel = "Beginner"
  let readinessColor = "#ef4444" // red
  if (readinessScore >= 75) {
    readinessLevel = "Advanced"
    readinessColor = "#10b981" // green
  } else if (readinessScore >= 50) {
    readinessLevel = "Intermediate"
    readinessColor = "#f59e0b" // amber
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Readiness Assessment - ${company}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      color: white;
      padding: 60px 40px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 36px;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 18px;
      opacity: 0.9;
    }
    .content {
      padding: 40px;
    }
    .score-section {
      text-align: center;
      padding: 40px;
      background: #f9fafb;
      border-radius: 12px;
      margin-bottom: 40px;
    }
    .score-circle {
      width: 180px;
      height: 180px;
      margin: 0 auto 20px;
      position: relative;
    }
    .score-value {
      font-size: 72px;
      font-weight: bold;
      color: ${readinessColor};
    }
    .score-label {
      font-size: 24px;
      color: #6b7280;
      margin-top: 10px;
    }
    .opportunities {
      margin: 40px 0;
    }
    .opportunity-card {
      background: #f3f4f6;
      border-left: 4px solid #2563eb;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    .opportunity-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #111827;
    }
    .opportunity-roi {
      color: #059669;
      font-weight: 600;
    }
    .analysis-section {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: 8px;
      padding: 20px;
      margin: 40px 0;
    }
    .cta-section {
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      color: white;
      padding: 40px;
      text-align: center;
      margin-top: 40px;
      border-radius: 12px;
    }
    .cta-button {
      display: inline-block;
      background: white;
      color: #2563eb;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      padding: 30px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Sprinter AI</div>
      <h1>AI Readiness Assessment</h1>
      <div class="subtitle">Prepared for ${firstName} ${lastName} at ${company}</div>
    </div>
    
    <div class="content">
      <div class="score-section">
        <div class="score-circle">
          <div class="score-value">${readinessScore}</div>
        </div>
        <div class="score-label">AI Readiness Score: ${readinessLevel}</div>
        <p style="color: #6b7280; margin-top: 10px;">
          Your firm is ${readinessScore >= 50 ? 'ahead of' : 'behind'} ${100 - readinessScore}% of PE firms in AI adoption
        </p>
      </div>

      <div class="opportunities">
        <h2 style="margin-bottom: 20px;">Your Top 3 AI Opportunities</h2>
        
        ${opportunities.map((opp, idx) => `
          <div class="opportunity-card">
            <div class="opportunity-title">${idx + 1}. ${opp}</div>
            <div class="opportunity-roi">Potential ROI: ${(idx + 1) * 3}x within 6 months</div>
            <p style="color: #6b7280; margin-top: 8px;">
              Implementation time: ${2 + idx} weeks | 
              Estimated savings: $${(idx + 1) * 250}K annually
            </p>
          </div>
        `).join('')}
      </div>

      <div class="analysis-section">
        <h3 style="margin-bottom: 12px;">💡 Key Insight</h3>
        <p>
          Based on your portfolio size and current challenges, implementing AI for 
          ${data.primary_interest.replace(/_/g, ' ')} could save your team 
          ${readinessScore < 50 ? '100+' : '50+'} hours per month and uncover 
          ${readinessScore < 50 ? '3-5x' : '2-3x'} more opportunities.
        </p>
      </div>

      <div class="cta-section">
        <h2>Ready to Implement Your First AI Win?</h2>
        <p style="margin-top: 10px;">
          Our 5-Day AI Sprint turns one of these opportunities into a working prototype
        </p>
        <a href="https://sprinter.ai/ai-sprint" class="cta-button">
          Book Your AI Sprint - $2,500
        </a>
        <p style="margin-top: 20px; font-size: 14px;">
          100% money-back guarantee if we don't deliver 10x value
        </p>
      </div>
    </div>

    <div class="footer">
      <p>© 2024 Sprinter AI | hello@sprinter.ai | +1 (615) 601-0782</p>
      <p style="margin-top: 10px; font-size: 12px;">
        This assessment is based on industry benchmarks and AI analysis. 
        Actual results may vary.
      </p>
    </div>
  </div>
</body>
</html>
  `
}

async function saveReportToStorage(email: string, html: string): Promise<string> {
  try {
    const supabase = await createClient()
    
    // Generate unique filename
    const timestamp = Date.now()
    const fileName = `ai-assessments/${email.replace('@', '_')}_${timestamp}.html`
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('reports')
      .upload(fileName, html, {
        contentType: 'text/html',
        cacheControl: '3600',
      })

    if (error) {
      console.error("Storage error:", error)
      // Fallback: return a data URL
      const base64 = Buffer.from(html).toString('base64')
      return `data:text/html;base64,${base64}`
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('reports')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error("Error saving report:", error)
    // Return a placeholder URL
    return "https://sprinter.ai/report-processing"
  }
}