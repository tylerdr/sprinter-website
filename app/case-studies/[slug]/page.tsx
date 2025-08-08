import { notFound } from "next/navigation"
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies-data"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return caseStudies.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug)
  if (!study) return { title: "Case Study – Sprinter AI" }
  return {
    title: `${study.title} – Case Study – Sprinter AI`,
    description: study.description,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug)
  if (!study) return notFound()

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <span className="text-sm font-medium text-green-400">Proven Results</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{study.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{study.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-red-400 mb-2">THE CHALLENGE</h3>
                <p className="text-gray-300">{study.challenge}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-400 mb-2">OUR SOLUTION</h3>
                <p className="text-gray-300">{study.solution}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">KEY FEATURES</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {study.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <blockquote className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500 italic text-gray-300">
                &quot;{study.testimonial}&quot;
              </blockquote>
            </div>
          </div>
          <aside>
            <h3 className="text-sm font-semibold text-green-400 mb-4">RESULTS</h3>
            <div className="space-y-4 mb-6">
              {study.results.map(r => (
                <div key={r.label} className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                  <div className="text-3xl font-bold gradient-text mb-1">{r.metric}</div>
                  <div className="text-sm text-gray-400">{r.label}</div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
              Get Similar Results
              <ArrowRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
