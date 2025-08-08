import type { Metadata } from "next"
import { SEO, PAGE_SEO, COMPANY_INFO } from "./constants"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
}

export function generateMetadata({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  noindex = false,
  nofollow = false,
  article,
}: SEOProps): Metadata {
  const fullTitle = title ? `${title}` : SEO.title
  const fullDescription = description || SEO.description
  const fullKeywords = keywords || SEO.keywords
  const fullOgTitle = ogTitle || title || SEO.title
  const fullOgDescription = ogDescription || description || SEO.description
  const fullOgImage = ogImage || SEO.ogImage
  const fullOgUrl = ogUrl || SEO.siteUrl
  const fullTwitterTitle = twitterTitle || ogTitle || title || SEO.title
  const fullTwitterDescription = twitterDescription || ogDescription || description || SEO.description
  const fullTwitterImage = twitterImage || ogImage || SEO.ogImage

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: SEO.author }],
    creator: SEO.author,
    publisher: COMPANY_INFO.name,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
      },
    },
    alternates: {
      canonical: canonical || fullOgUrl,
    },
    openGraph: {
      title: fullOgTitle,
      description: fullOgDescription,
      url: fullOgUrl,
      siteName: COMPANY_INFO.name,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: fullOgTitle,
        },
      ],
      locale: "en_US",
      type: article ? "article" : "website",
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: article.author ? [article.author] : [SEO.author],
        section: article.section,
        tags: article.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTwitterTitle,
      description: fullTwitterDescription,
      creator: SEO.twitterHandle,
      site: SEO.twitterHandle,
      images: [fullTwitterImage],
    },
    verification: {
      // Add verification codes when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // other: "your-other-verification-code",
    },
  }
}

// Helper to generate page-specific metadata
export function getPageMetadata(page: keyof typeof PAGE_SEO, overrides?: SEOProps): Metadata {
  const pageData = PAGE_SEO[page]
  
  return generateMetadata({
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    ogTitle: pageData.ogTitle,
    canonical: `${SEO.siteUrl}${page === 'home' ? '' : `/${page}`}`,
    ...overrides,
  })
}

// Generate structured data for organization
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    description: COMPANY_INFO.description,
    url: SEO.siteUrl,
    logo: `${SEO.siteUrl}/logo.png`,
    foundingDate: COMPANY_INFO.founded,
    contactPoint: {
      "@type": "ContactPoint",
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phone,
      contactType: "Business",
      areaServed: "US",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_INFO.location.city,
      addressRegion: COMPANY_INFO.location.state,
      addressCountry: COMPANY_INFO.location.country,
    },
    sameAs: [
      "https://x.com/SprinterAI",
      "https://www.linkedin.com/company/sprinter-ai/",
      "https://github.com/SprinterAI",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Consulting",
          description: "Expert AI consulting and development services",
          provider: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Autonomous Agent Development",
          description: "Custom autonomous AI agent development",
          provider: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Transformation",
          description: "Enterprise AI transformation and implementation",
          provider: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
          },
        },
      },
    ],
  }
}

// Generate structured data for services
export function generateServiceStructuredData(serviceName: string, serviceDescription: string, price?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: SEO.siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceName,
            description: serviceDescription,
          },
          ...(price && { price: price }),
          priceCurrency: "USD",
        },
      ],
    },
  }
}

// Generate structured data for articles/blog posts
export function generateArticleStructuredData({
  title,
  description,
  author,
  publishDate,
  modifiedDate,
  url,
  image,
}: {
  title: string
  description: string
  author: string
  publishDate: string
  modifiedDate?: string
  url: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: `${SEO.siteUrl}/logo.png`,
      },
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    url: url,
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  }
}

// Generate structured data for FAQs
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Helper to inject structured data into pages
export function getStructuredDataScript(data: object) {
  return {
    __html: JSON.stringify(data),
  }
}