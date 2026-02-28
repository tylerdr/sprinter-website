import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { getPageMetadata } from "@/lib/seo";
import ContactForm from "@/components/contact/ContactForm";
import { SparklesIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = getPageMetadata("contact");

export default function ContactPage() {
  return (
    <div className="spr-theme spr-page">
      <main className="overflow-x-hidden">
        <section className="spr-container relative overflow-hidden px-2 py-20 sm:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(106,167,255,0.15),_transparent_62%)] blur-2xl" />
          </div>

          <div className="text-center mb-12">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
                <SparklesIcon className="h-4 w-4" />
                <span>Let&apos;s Build Together</span>
              </div>
            </div>

            <h1 className="spr-heading-xl mb-4">
              Work With <span className="text-[color:var(--spr-accent)]">Us</span>
            </h1>
            <p className="spr-body-lg max-w-2xl mx-auto">
              Bring a problem or a dataset. We&apos;ll bring a working system. Let&apos;s
              turn unstructured data and workflows into compounding leverage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mx-auto max-w-6xl">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="spr-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-[color:var(--spr-text)]">Get in Touch</h3>

                <div className="space-y-4">
                  <a
                    href="mailto:hello@sprinter.ai"
                    className="flex items-center gap-3 text-[color:var(--spr-text-muted)] hover:text-[color:var(--spr-primary)] transition-colors"
                  >
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    <span>hello@sprinter.ai</span>
                  </a>

                  <a
                    href="tel:+16156010782"
                    className="flex items-center gap-3 text-[color:var(--spr-text-muted)] hover:text-[color:var(--spr-primary)] transition-colors"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <span>+1 (615) 601-0782</span>
                  </a>

                  <div className="flex items-start gap-3 text-[color:var(--spr-text-muted)]">
                    <MapPin className="w-5 h-5 mt-0.5" aria-hidden="true" />
                    <address className="not-italic">
                      Brentwood, TN
                      <br />
                      United States
                    </address>
                  </div>
                </div>
              </div>

              <div className="spr-card spr-card-accent p-6">
                <Calendar className="w-8 h-8 text-[color:var(--spr-primary)] mb-3" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2 text-[color:var(--spr-text)]">
                  Book a Discovery Call
                </h3>
                <p className="text-sm text-[color:var(--spr-text-muted)] mb-4">
                  Prefer to talk? Schedule a 30-minute call to discuss your AI
                  needs.
                </p>
                <a
                  href="https://cal.com/tyler-dreher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spr-button spr-button-primary text-sm"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Schedule Call
                </a>
              </div>

              <div className="spr-card p-6">
                <MessageSquare
                  className="w-8 h-8 text-[color:var(--spr-accent)] mb-3"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold mb-2 text-[color:var(--spr-text)]">Response Time</h3>
                <p className="text-sm text-[color:var(--spr-text-muted)]">
                  We typically respond within 24 hours during business days. For
                  urgent matters, please call directly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
