import type { Metadata } from "next"
import { COMPANY_INFO } from "@/lib/constants"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("privacy")

export default function PrivacyPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-3">
              {COMPANY_INFO.name} collects information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Fill out our contact forms</li>
              <li>Subscribe to our newsletter</li>
              <li>Use our AI tools and demos</li>
              <li>Communicate with us via email</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal information to third parties. 
              We may share information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-3">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-3">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to track activity on our website and 
              improve your experience. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 text-muted-foreground">
              <p>Email: {COMPANY_INFO.email}</p>
              <p>Location: {COMPANY_INFO.location.state}, {COMPANY_INFO.location.country}</p>
            </div>
          </section>

          <section className="p-6 rounded-xl bg-card/20 border border-border/30">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}