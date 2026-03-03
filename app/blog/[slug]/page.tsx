import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticleBySlug } from "@/lib/blog-data";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article – Sprinter AI" };
  return {
    title: `${article.title} – Sprinter AI`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();

  const relatedArticles = articles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        (a.category === article.category ||
          a.tags.some((tag) => article.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <div className="spr-theme spr-page min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-10 text-brand">
                {article.category}
              </span>
              {article.featured && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-gradient text-primary-foreground">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/80 pb-6 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <button className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/20 hover:bg-card/30 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            {article.content.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <footer className="mt-12 pt-8 border-t border-border/30">
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-card/20 text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="bg-brand-10 rounded-xl p-6 sm:p-8 mb-12 border border-brand-30">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Ready to implement these strategies?
              </h3>
              <p className="text-muted-foreground mb-4">
                Let&apos;s discuss how to apply these insights to your specific
                business challenges.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Schedule a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {relatedArticles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand" />
                  Related Articles
                </h3>
                <div className="grid gap-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group p-4 rounded-lg bg-card/20 border border-border/30 hover:bg-card/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 group-hover:text-brand transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-sm text-muted-foreground/80 line-clamp-2">
                            {related.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/80 group-hover:text-brand group-hover:translate-x-1 transition-all mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
