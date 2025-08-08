import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = getPageMetadata("contact");

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-10 border border-brand-30 mb-6">
            <Sparkles className="w-5 h-5 text-brand" aria-hidden="true" />
            <span className="text-sm font-medium text-brand">
              Let&apos;s Build Together
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Work With <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bring a problem or a dataset. We’ll bring a working system. Let’s
            turn unstructured data and workflows into compounding leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>

              <div className="space-y-4">
                <a
                  href="mailto:hello@sprinter.ai"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  <span>hello@sprinter.ai</span>
                </a>

                <a
                  href="tel:+14155551234"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  <span>+1 (415) 555-1234</span>
                </a>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 mt-0.5" aria-hidden="true" />
                  <address className="not-italic">
                    San Francisco, CA
                    <br />
                    United States
                  </address>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-info-30 bg-info-10">
              <Calendar className="w-8 h-8 text-info mb-3" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">
                Book a Discovery Call
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Prefer to talk? Schedule a 30-minute call to discuss your AI
                needs.
              </p>
              <a
                href="mailto:hello@sprinter.ai?subject=Discovery%20Call"
                className="inline-flex items-center gap-2 px-4 py-2 bg-info/20 text-info font-medium rounded-lg hover:bg-info/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Schedule Call
              </a>
            </div>

            <div className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
              <MessageSquare
                className="w-8 h-8 text-brand mb-3"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-gray-300">
                We typically respond within 24 hours during business days. For
                urgent matters, please call directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
