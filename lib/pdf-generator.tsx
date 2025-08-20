import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink
} from '@react-pdf/renderer';

// Register fonts (optional - for better typography)
// Font.register({
//   family: 'Inter',
//   src: '/fonts/Inter-Regular.ttf'
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #3b82f6',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    backgroundColor: '#f3f4f6',
    padding: 8,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  text: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.6,
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 11,
    color: '#4b5563',
    marginLeft: 20,
    marginBottom: 4,
  },
  highlightBox: {
    backgroundColor: '#fef3c7',
    padding: 12,
    marginVertical: 10,
    borderLeft: '3 solid #f59e0b',
  },
  roiBox: {
    backgroundColor: '#dcfce7',
    padding: 12,
    marginVertical: 10,
    borderRadius: 4,
  },
  roiTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  roiValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
  },
  opportunityCard: {
    backgroundColor: '#f9fafb',
    padding: 15,
    marginBottom: 15,
    borderLeft: '3 solid #3b82f6',
  },
  opportunityNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  opportunityName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  mechanismText: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
});

interface OpportunityData {
  name: string;
  description: string;
  mechanism: string;
  agentPattern: string[];
  roi: {
    timeframe: string;
    conservative: number;
    optimistic: number;
    assumptions: string[];
  };
  implementation: {
    week1: string[];
    week2_3: string[];
    week4: string[];
  };
  risks: string[];
}

interface AuditReportProps {
  email: string;
  company: string;
  industry: string;
  role: string;
  opportunities: OpportunityData[];
  reportId: string;
}

// Create Document Component
export const AuditReportPDF: React.FC<AuditReportProps> = ({ 
  email, 
  company, 
  industry, 
  role,
  opportunities,
  reportId 
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Opportunity Audit</Text>
        <Text style={styles.subtitle}>Personalized AI Roadmap for {company}</Text>
        <Text style={styles.subtitle}>Industry: {industry} | Role: {role}</Text>
        <Text style={styles.subtitle}>Report ID: {reportId}</Text>
      </View>

      {/* Executive Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.text}>
          Based on your industry profile and current systems, we&apos;ve identified {opportunities.length} high-impact 
          AI opportunities that can deliver measurable ROI within 60-120 days. Your existing infrastructure 
          positions you well for rapid deployment.
        </Text>
        <View style={styles.roiBox}>
          <Text style={styles.roiTitle}>Projected Impact</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Conservative ROI</Text>
              <Text style={styles.roiValue}>25-40%</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Time to Value</Text>
              <Text style={styles.roiValue}>60 days</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Year 1 ROI</Text>
              <Text style={styles.roiValue}>3.2x</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Top Opportunities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Top AI Opportunities</Text>
        {opportunities.slice(0, 3).map((opp, index) => (
          <View key={index} style={styles.opportunityCard}>
            <Text style={styles.opportunityNumber}>#{index + 1}</Text>
            <Text style={styles.opportunityName}>{opp.name}</Text>
            <Text style={styles.text}>{opp.description}</Text>
            <Text style={styles.mechanismText}>Mechanism: {opp.mechanism}</Text>
            
            <Text style={styles.subsectionTitle}>ROI Projection</Text>
            <Text style={styles.bulletPoint}>• Conservative: {opp.roi.conservative}% reduction</Text>
            <Text style={styles.bulletPoint}>• Optimistic: {opp.roi.optimistic}% reduction</Text>
            <Text style={styles.bulletPoint}>• Time to value: {opp.roi.timeframe}</Text>
            
            <Text style={styles.subsectionTitle}>Agent Pattern</Text>
            <Text style={styles.text}>{opp.agentPattern.join(' → ')}</Text>
          </View>
        ))}
      </View>

      {/* 30-Day Action Plan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>30-Day Action Plan</Text>
        
        <View style={styles.highlightBox}>
          <Text style={styles.subsectionTitle}>Week 1: Discovery & Design</Text>
          {opportunities[0]?.implementation.week1.map((task, i) => (
            <Text key={i} style={styles.bulletPoint}>• {task}</Text>
          ))}
        </View>
        
        <View style={styles.highlightBox}>
          <Text style={styles.subsectionTitle}>Week 2-3: Build & Test</Text>
          {opportunities[0]?.implementation.week2_3.map((task, i) => (
            <Text key={i} style={styles.bulletPoint}>• {task}</Text>
          ))}
        </View>
        
        <View style={styles.highlightBox}>
          <Text style={styles.subsectionTitle}>Week 4: Deploy & Optimize</Text>
          {opportunities[0]?.implementation.week4.map((task, i) => (
            <Text key={i} style={styles.bulletPoint}>• {task}</Text>
          ))}
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} Sprinter AI | Build at the pace of AI | sprinter.ai
      </Text>
    </Page>

    {/* Page 2 - Risk Management */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risk Management & Governance</Text>
        
        <Text style={styles.subsectionTitle}>Key Success Factors</Text>
        <Text style={styles.bulletPoint}>• Executive sponsorship and clear change management</Text>
        <Text style={styles.bulletPoint}>• Phased rollout with continuous monitoring</Text>
        <Text style={styles.bulletPoint}>• Human-in-the-loop for critical decisions</Text>
        <Text style={styles.bulletPoint}>• Regular performance reviews and tuning</Text>
        
        <Text style={styles.subsectionTitle}>Data & Privacy Considerations</Text>
        <Text style={styles.bulletPoint}>• All data remains within your infrastructure</Text>
        <Text style={styles.bulletPoint}>• HIPAA/SOC2 compliant architectures available</Text>
        <Text style={styles.bulletPoint}>• Audit trails for all AI decisions</Text>
        <Text style={styles.bulletPoint}>• PII/PHI handling protocols included</Text>
        
        {opportunities[0]?.risks && (
          <>
            <Text style={styles.subsectionTitle}>Specific Risks & Mitigations</Text>
            {opportunities[0].risks.map((risk, i) => (
              <Text key={i} style={styles.bulletPoint}>• {risk}</Text>
            ))}
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Steps</Text>
        <View style={styles.highlightBox}>
          <Text style={styles.text}>
            Ready to start your AI transformation? Our team can begin implementing your #1 opportunity 
            within 48 hours. Get a working prototype in 10 days, production deployment in 30.
          </Text>
          <Text style={[styles.text, { marginTop: 10, fontWeight: 'bold' }]}>
            Contact us at: hello@sprinter.ai or visit sprinter.ai/contact
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        This report is valid for 30 days | Generated for {email} | {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);

// Helper function to generate PDF buffer (for server-side generation)
export async function generatePDFBuffer(_props: AuditReportProps): Promise<Buffer> {
  // This would be used server-side with react-pdf/renderer
  // For now, returning a placeholder
  return Buffer.from('PDF content would be here');
}

// Component for client-side PDF download
export const PDFDownloadButton: React.FC<AuditReportProps> = (props) => (
  <PDFDownloadLink
    document={<AuditReportPDF {...props} />}
    fileName={`AI-Opportunity-Audit-${props.company}-${props.reportId}.pdf`}
  >
    {({ loading }) =>
      loading ? 'Generating PDF...' : 'Download PDF Report'
    }
  </PDFDownloadLink>
);