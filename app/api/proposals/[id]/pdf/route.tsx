import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getProposalServer } from '@/lib/services/proposal-server'
import { PDFDocument } from '@/lib/pdf-proposal-generator'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Get proposal data
    const proposal = await getProposalServer(id)
    
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      )
    }
    
    // Generate PDF
    const pdfDoc = new PDFDocument({
      title: proposal.title,
      subject: `Proposal for ${proposal.clientName}`,
      author: 'Sprinter AI',
      keywords: 'proposal, ai, consulting'
    })
    
    // Add content to PDF
    pdfDoc.addCoverPage({
      title: proposal.title,
      subtitle: proposal.content.coverPage?.subtitle,
      client: proposal.clientName,
      company: proposal.clientCompany,
      date: proposal.content.coverPage?.date || new Date().toLocaleDateString()
    })
    
    // Add sections
    proposal.content.sections.forEach((section, index) => {
      pdfDoc.addSection({
        title: section.title,
        content: section.content,
        type: section.type,
        pageBreak: index > 0
      })
    })
    
    // Add footer with page numbers
    pdfDoc.addFooter()
    
    // Generate PDF buffer
    const pdfBuffer = await pdfDoc.generate()
    
    // Track download event
    const supabase = await createClient()
    await supabase.from('proposal_events').insert({
      proposal_id: id,
      event_type: 'pdf_download',
      event_data: { timestamp: new Date().toISOString() }
    })
    
    // Return PDF
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${proposal.title.replace(/[^a-z0-9]/gi, '_')}_proposal.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}