import { notFound } from "next/navigation"
import { articles, getArticleBySlug } from "@/lib/blog-data"
import type { Metadata } from "next"

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: "Article – SprinterHQ" }
  return {
    title: `${article.title} – SprinterHQ`,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return notFound()

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">{new Date(article.date).toLocaleDateString()}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{article.title}</h1>
          <p className="text-gray-400">{article.excerpt}</p>
        </div>

        <div className="prose prose-invert prose-headings:scroll-mt-24">
          {article.content.map(section => (
            <section key={section.heading} className="mb-8">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
