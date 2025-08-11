import type { Metadata } from "next"
import { COMPANY_INFO } from "@/lib/constants"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("terms")

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Effective Date: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the services provided by {COMPANY_INFO.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), 
              you agree to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use our services.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">2. Services Description</h2>
            <p className="text-muted-foreground mb-3">
              {COMPANY_INFO.name} provides AI consulting, development, and venture partnership services, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>AI strategy consulting and workshops</li>
              <li>Custom AI agent and automation development</li>
              <li>AI transformation projects</li>
              <li>Venture partnerships and technical co-founding</li>
              <li>Educational content and tools</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-3">When using our services, you agree to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Use our services in compliance with all applicable laws</li>
              <li>Not engage in any activity that interferes with our services</li>
              <li>Respect our intellectual property rights</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground mb-3">
              All content, features, and functionality on our website and in our services are owned by 
              {COMPANY_INFO.name} and are protected by international copyright, trademark, and other 
              intellectual property laws.
            </p>
            <p className="text-muted-foreground">
              For custom development projects, intellectual property ownership will be defined in 
              individual project agreements.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground mb-3">For paid services:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Payment terms will be specified in individual service agreements</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>You are responsible for all taxes associated with your purchase</li>
              <li>We reserve the right to modify pricing with notice</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">6. Confidentiality</h2>
            <p className="text-muted-foreground">
              Both parties agree to maintain the confidentiality of any proprietary information shared 
              during the course of our engagement. This includes business strategies, technical details, 
              and any information marked as confidential.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, {COMPANY_INFO.name} shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages resulting from your use 
              or inability to use our services.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">8. Warranties and Disclaimers</h2>
            <p className="text-muted-foreground">
              Our services are provided &quot;as is&quot; without warranties of any kind, either express or implied. 
              We do not guarantee that our services will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold {COMPANY_INFO.name} harmless from any claims, losses, 
              liabilities, damages, costs, or expenses arising from your use of our services or 
              violation of these terms.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your access to our services at any time, 
              with or without cause, with or without notice. Upon termination, your right to use our 
              services will immediately cease.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of the State 
              of Tennessee, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users of any 
              material changes by posting the new Terms on this page and updating the &quot;Effective Date.&quot;
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-3 text-muted-foreground">
              <p>Email: {COMPANY_INFO.email}</p>
              <p>Address: {COMPANY_INFO.location.city}, {COMPANY_INFO.location.state}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}