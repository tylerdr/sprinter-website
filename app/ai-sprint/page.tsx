import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sprinter-ai/Footer";
import Header from "@/components/sprinter-ai/Header";
import StickyCTA from "@/components/sprinter-ai/StickyCTA";
import {
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "The AI Readiness Sprint | Sprinter AI",
  description: "Your full operations map in 48 hours for $2,500. We find $200K+ in automation value — or it is free.",
  openGraph: {
    title: "The AI Readiness Sprint — Your Full Operations Map in 48 Hours",
    description: "Your full operations map in 48 hours for $2,500. We find $200K+ in automation value — or it is free.",
    type: "website",
  },
};

const sprintTimeline = [
  { day: "Day 1", task: "Kickoff & Discovery", description: "Deep dive into your specific use case and data" },
  { day: "Day 3", task: "Solution Design", description: "Present AI architecture and implementation plan" },
  { day: "Day 5", task: "Delivery", description: "Receive your AI Blueprint + working prototype or dataset" },
];

const deliverables = [
  "Custom AI Readiness Blueprint (20+ page strategic document)",
  "Working prototype or proof-of-concept for your #1 use case",
  "ROI calculation and implementation roadmap",
  "Technical architecture and tool recommendations",
  "60-minute strategy session with our AI experts",
  "30 days of follow-up support via email",
  "All code, prompts, and configurations (if applicable)",
  "Recording of all sessions for your team",
];

const useCases = [
  {
    title: "Deal Flow Accelerator",
    description: "AI-powered deal sourcing that finds hidden opportunities",
    outcome: "Get a list of 50+ qualified targets matching your criteria",
  },
  {
    title: "Due Diligence Automation",
    description: "AI that analyzes documents and surfaces key insights",
    outcome: "Cut DD time by 80% with automated document summaries",
  },
  {
    title: "Portfolio Optimization",
    description: "AI tools for portfolio company operations",
    outcome: "Identify $100K+ in immediate cost savings opportunities",
  },
];

export default function AISprintPage() {
  return (
    <div className="spr-theme spr-page">
      <Header />
      <main className="pb-32">
        <section className="spr-container relative overflow-hidden px-2 py-20 sm:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(106,167,255,0.2),_transparent_62%)] blur-2xl" />
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
                <SparklesIcon className="h-4 w-4" />
                <span>Only 5 Spots Available This Month</span>
              </div>
            </div>

            <h1 className="spr-heading-xl text-center">Your Full Operations Map in 48 Hours for $2,500</h1>

            <p className="spr-body-lg mt-6 text-center">
              The AI Readiness Sprint
            </p>

            <p className="spr-body mt-4 text-center">
              We find $200K+ in automation value — or it is free.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-[color:var(--spr-text)]">
                  <ShieldCheckIcon className="h-6 w-6 text-[color:var(--spr-primary)]" />
                  <span className="text-xl font-semibold">$200K+ Value Guarantee</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-[color:var(--spr-text)]">$2,500</span>
                <span className="ml-2 text-lg text-[color:var(--spr-text-muted)]">48-hour sprint</span>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="#book-sprint" className="spr-button spr-button-primary">
                Book Your AI Sprint Now
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="spr-heading-lg mb-6">Why Operators Choose the AI Readiness Sprint</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="spr-card p-6">
                <div className="mb-4 text-4xl font-bold text-[color:var(--spr-primary)]">5 Days</div>
                <p className="spr-body">Not months. We deliver real results before your next partners meeting.</p>
              </div>
              <div className="spr-card p-6">
                <div className="mb-4 text-4xl font-bold text-[color:var(--spr-primary)]">$2,500</div>
                <p className="spr-body">Fixed investment. Guaranteed $200K+ value or your money back. No questions asked.</p>
              </div>
              <div className="spr-card p-6">
                <div className="mb-4 text-4xl font-bold text-[color:var(--spr-primary)]">Zero Risk</div>
                <p className="spr-body">Clear deliverables. Proven methodology. Apply sprint learnings to any larger engagement.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="spr-heading-lg mb-12 text-center">Your 5-Day Journey</h2>

            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-px bg-[linear-gradient(180deg,var(--spr-primary),var(--spr-accent))] md:left-1/2" />

              {sprintTimeline.map((item, idx) => (
                <div
                  key={item.day}
                  className={`relative mb-12 flex items-center ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1" />
                  <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border [border-color:var(--spr-border-strong)] bg-[linear-gradient(140deg,rgba(106,167,255,0.85),rgba(255,171,102,0.85))] text-[#041022] shadow-[var(--spr-shadow-soft)]">
                    <span className="font-bold">{item.day}</span>
                  </div>
                  <div className="ml-8 flex-1 md:ml-0 md:px-8">
                    <div className="spr-card p-6">
                      <h3 className="mb-2 text-xl font-semibold text-[color:var(--spr-text)]">{item.task}</h3>
                      <p className="text-[color:var(--spr-text-muted)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="spr-heading-lg mb-12 text-center">Everything You Get</h2>

            <div className="spr-card p-8">
              <div className="grid gap-4 md:grid-cols-2">
                {deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-[color:var(--spr-primary)]" />
                    <span className="text-[color:var(--spr-text-soft)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-lg border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)] p-6">
                <p className="text-center text-xl font-bold text-[color:var(--spr-text)]">
                  Enterprise-Grade Value, Startup Speed
                </p>
                <p className="mt-2 text-center text-[color:var(--spr-text-muted)]">
                  Sprint learnings can be applied toward any implementation project
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="spr-heading-lg mb-4 text-center">Choose Your Focus Area</h2>
            <p className="spr-body mb-12 text-center">We&apos;ll customize the sprint to your highest-impact opportunity</p>

            <div className="grid gap-8 md:grid-cols-3">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="spr-card p-6">
                  <RocketLaunchIcon className="mb-4 h-10 w-10 text-[color:var(--spr-primary)]" />
                  <h3 className="mb-2 text-xl font-semibold text-[color:var(--spr-text)]">{useCase.title}</h3>
                  <p className="mb-4 text-[color:var(--spr-text-muted)]">{useCase.description}</p>
                  <div className="rounded border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.12)] p-3">
                    <p className="text-sm font-semibold text-[color:var(--spr-accent)]">Deliverable:</p>
                    <p className="text-sm text-[color:var(--spr-text-soft)]">{useCase.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-4xl">
            <div className="spr-card spr-card-accent overflow-hidden p-8">
              <h3 className="mb-6 text-2xl font-bold text-[color:var(--spr-text)]">Recent Sprint Success</h3>
              <p className="mb-6 text-lg italic text-[color:var(--spr-text-soft)]">
                "In just 48 hours, Sprinter identified an AI-driven deal sourcing approach that found 47 off-market targets we had completely missed.
                The ROI was immediate - we're now evaluating 3 potential acquisitions from that list.
                The sprint paid for itself 100x over."
              </p>
              <div>
                <p className="font-semibold text-[color:var(--spr-text)]">Managing Partner</p>
                <p className="text-[color:var(--spr-text-muted)]">Mid-Market Operator</p>
              </div>
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-4xl text-center">
            <ShieldCheckIcon className="mx-auto mb-6 h-16 w-16 text-[color:var(--spr-primary)]" />
            <h2 className="spr-heading-lg mb-6">Our Iron-Clad Guarantee</h2>
            <p className="spr-body-lg mb-8">
              If you don&apos;t agree that our AI Sprint identified at least $200K+ the value of your investment
              in potential ROI, we&apos;ll refund 100% of your money. No questions asked.
            </p>
            <p className="spr-body">
              We&apos;re so confident because we&apos;ve done this before. Our AI expertise combined with your
              industry knowledge creates breakthrough opportunities every time.
            </p>
          </div>
        </section>

        <section id="book-sprint" className="spr-container py-16">
          <div className="mx-auto max-w-2xl">
            <div className="spr-card p-8">
              <h2 className="spr-heading-lg mb-6 text-center">Ready to Start Your AI Sprint?</h2>

              <div className="mb-8 space-y-4 text-center">
                <p className="text-[color:var(--spr-text-muted)]">
                  Limited to 5 sprints per month to ensure quality delivery
                </p>
                <p className="text-2xl font-bold text-[color:var(--spr-text)]">
                  Investment: <span className="text-[color:var(--spr-primary)]">$2,500</span> ($200K+ value guarantee)
                </p>
                <p className="text-lg text-[color:var(--spr-text)]">
                  Only <span className="text-[color:var(--spr-accent)]">2 spots</span> remaining this month
                </p>
              </div>

              <Link href="/contact?product=ai-sprint&intent=purchase" className="spr-button spr-button-primary w-full">
                Book Your Sprint Now
                <ArrowRightIcon className="h-5 w-5" />
              </Link>

              <div className="mt-6 space-y-2 text-center text-sm text-[color:var(--spr-text-muted)]">
                <p>✓ Instant confirmation</p>
                <p>✓ Secure payment via Stripe</p>
                <p>✓ Start within 48 hours</p>
                <p>✓ 100% money-back guarantee</p>
              </div>

              <div className="mt-8 border-t [border-color:var(--spr-border)] pt-8">
                <p className="mb-4 text-center text-[color:var(--spr-text-muted)]">Prefer to discuss first?</p>
                <Link href="/contact" className="spr-button spr-button-secondary w-full">
                  Schedule a 15-Minute Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="spr-heading-lg mb-12 text-center">Common Questions</h2>

            <div className="space-y-6">
              <div className="spr-card p-6">
                <h3 className="mb-2 font-semibold text-[color:var(--spr-text)]">What if we don&apos;t have technical staff?</h3>
                <p className="text-[color:var(--spr-text-muted)]">
                  No problem. We deliver everything in business terms with clear implementation guides.
                  Many clients use our blueprints with their existing vendors or hire us for implementation.
                </p>
              </div>

              <div className="spr-card p-6">
                <h3 className="mb-2 font-semibold text-[color:var(--spr-text)]">Is our data secure?</h3>
                <p className="text-[color:var(--spr-text-muted)]">
                  Absolutely. We sign NDAs and follow enterprise security protocols.
                  All work can be done with anonymized or sample data if preferred.
                </p>
              </div>

              <div className="spr-card p-6">
                <h3 className="mb-2 font-semibold text-[color:var(--spr-text)]">What happens after the sprint?</h3>
                <p className="text-[color:var(--spr-text-muted)]">
                  You&apos;ll have everything needed to implement independently.
                  Or, engage us for ongoing support through our AI Partnership Program.
                  The $2,500 sprint fee is credited toward any continued engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="spr-container py-16">
          <div className="mx-auto max-w-2xl rounded-[var(--spr-radius-md)] border [border-color:var(--spr-border)] bg-[linear-gradient(140deg,rgba(106,167,255,0.16),rgba(255,171,102,0.12))] p-8 text-center shadow-[var(--spr-shadow-soft)]">
            <h2 className="mb-4 text-2xl font-bold text-[color:var(--spr-text)]">Stop Watching. Start Winning.</h2>
            <p className="mb-6 text-[color:var(--spr-text-soft)]">
              While competitors debate AI strategy, you&apos;ll have a working solution in 48 hours.
            </p>
            <Link href="#book-sprint" className="spr-button spr-button-primary">
              Claim Your Sprint Spot
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
