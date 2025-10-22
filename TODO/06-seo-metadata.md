# SEO & Metadata Optimization Guide

## Current SEO Status

### ✅ What's Working
- Basic metadata structure in place
- Programmatic SEO pages for use cases
- Blog content with proper structure
- Clean URL structure

### 🚨 What Needs Improvement
- Missing Open Graph images
- Incomplete structured data
- No XML sitemap
- Missing robots.txt optimization
- No canonical URLs on some pages
- Limited schema markup

---

## 1. Metadata Implementation

### Base Metadata Template
```typescript
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sprinter.ai'),
  title: {
    default: 'Sprinter AI - Production AI in 10 Days',
    template: '%s | Sprinter AI'
  },
  description: 'Transform your business with production-ready AI solutions. From strategy to deployment in 10 days. Trusted by leading PE firms and enterprises.',
  keywords: ['AI consulting', 'AI transformation', 'private equity AI', 'enterprise AI', 'AI sprint'],
  authors: [{ name: 'Sprinter AI' }],
  creator: 'Sprinter AI',
  publisher: 'Sprinter AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Sprinter AI - Production AI in 10 Days',
    description: 'Transform your business with production-ready AI solutions',
    url: 'https://sprinter.ai',
    siteName: 'Sprinter AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sprinter AI',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sprinter AI - Production AI in 10 Days',
    description: 'Transform your business with production-ready AI solutions',
    images: ['/twitter-image.jpg'],
    creator: '@sprinterai',
    site: '@sprinterai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sprinter.ai',
  },
};
```

### Page-Specific Metadata
```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `https://sprinter.ai/blog/${params.slug}`,
    },
  };
}
```

---

## 2. Structured Data (Schema.org)

### Organization Schema
```typescript
// components/StructuredData.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sprinter AI',
    url: 'https://sprinter.ai',
    logo: 'https://sprinter.ai/logo.png',
    sameAs: [
      'https://twitter.com/sprinterai',
      'https://linkedin.com/company/sprinterai',
      'https://github.com/sprinterai'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0123',
      contactType: 'sales',
      email: 'sales@sprinter.ai',
      areaServed: 'US',
      availableLanguage: 'English'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 AI Street',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Service Schema
```typescript
// app/services/page.tsx
export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Consulting',
    provider: {
      '@type': 'Organization',
      name: 'Sprinter AI'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'AI Sprint',
        price: '25000',
        priceCurrency: 'USD',
        description: '10-day AI implementation sprint'
      },
      {
        '@type': 'Offer',
        name: 'AI Operating Partner',
        price: '125000',
        priceCurrency: 'USD',
        description: 'Full AI transformation program'
      }
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Blog Post Schema
```typescript
// components/BlogPostSchema.tsx
export function BlogPostSchema({ post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sprinter AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sprinter.ai/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sprinter.ai/blog/${post.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### FAQ Schema
```typescript
// components/FAQSchema.tsx
export function FAQSchema({ faqs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 3. XML Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sprinter.ai';

  // Get dynamic content
  const posts = await getBlogPosts();
  const caseStudies = await getCaseStudies();
  const useCases = await getUseCases();

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/services',
    '/solutions',
    '/industries',
    '/labs',
    '/blog',
    '/case-studies',
    '/privacy',
    '/terms'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const caseStudyPages = caseStudies.map(study => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const useCasePages = useCases.map(useCase => ({
    url: `${baseUrl}/use-cases/${useCase.slug}`,
    lastModified: useCase.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...blogPages,
    ...caseStudyPages,
    ...useCasePages,
  ];
}
```

---

## 4. Robots.txt Configuration

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/*.json$',
          '/_next/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://sprinter.ai/sitemap.xml',
  };
}
```

---

## 5. Open Graph Image Generation

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Sprinter AI';
  const description = searchParams.get('description') || 'Production AI in 10 Days';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: 60, fontWeight: 'bold', color: 'white', margin: 0 }}>
            {title}
          </h1>
          <p style={{ fontSize: 30, color: 'rgba(255,255,255,0.8)', marginTop: 20 }}>
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## 6. Performance & SEO

### Core Web Vitals Impact
```typescript
// Optimize for SEO-critical metrics
export const metadata = {
  // Preconnect to external domains
  other: {
    'link': [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://analytics.google.com' },
    ]
  }
};
```

### Lazy Load Non-Critical Content
```typescript
// Defer loading below-fold content
const BelowFold = dynamic(() => import('./BelowFold'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

---

## 7. International SEO (if applicable)

```typescript
// app/layout.tsx
export const metadata = {
  alternates: {
    canonical: 'https://sprinter.ai',
    languages: {
      'en-US': 'https://sprinter.ai',
      'en-GB': 'https://uk.sprinter.ai',
    },
  },
};

// Add hreflang tags
<link rel="alternate" hreflang="en-US" href="https://sprinter.ai" />
<link rel="alternate" hreflang="en-GB" href="https://uk.sprinter.ai" />
<link rel="alternate" hreflang="x-default" href="https://sprinter.ai" />
```

---

## 8. SEO Monitoring & Tools

### Google Search Console Setup
```
1. Verify domain ownership
2. Submit sitemap.xml
3. Monitor coverage issues
4. Track search performance
5. Fix mobile usability issues
```

### Essential Meta Tags Checklist
- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Canonical URL
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Viewport meta tag
- [ ] Robots meta tag
- [ ] Author meta tag
- [ ] Language declaration

### Schema Markup Checklist
- [ ] Organization
- [ ] WebSite
- [ ] Service
- [ ] Product
- [ ] BlogPosting
- [ ] FAQ
- [ ] BreadcrumbList
- [ ] Review/Rating

---

## 9. Content SEO Best Practices

### URL Structure
```
Good:
- /blog/ai-transformation-guide
- /case-studies/vista-equity-success
- /services/ai-sprint

Bad:
- /blog/post-123
- /p/456789
- /services/service1
```

### Heading Structure
```html
<!-- Proper hierarchy -->
<h1>Main Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>
    <h3>Another Subsection</h3>
  <h2>Another Section</h2>
```

### Internal Linking
```typescript
// Add contextual internal links
<Link href="/services/ai-sprint">
  Learn more about our 10-day AI Sprint
</Link>

// Breadcrumbs for better navigation
<nav aria-label="Breadcrumb">
  <ol className="flex space-x-2">
    <li><Link href="/">Home</Link></li>
    <li><Link href="/blog">Blog</Link></li>
    <li aria-current="page">{post.title}</li>
  </ol>
</nav>
```

---

## 10. Technical SEO Fixes

### Redirect Management
```typescript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
    ];
  },
};
```

### 404 Page Optimization
```typescript
// app/not-found.tsx
export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: 'noindex, follow',
};

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find what you're looking for.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
```

---

## Success Metrics

- ✅ All pages have unique titles and descriptions
- ✅ Structured data validates without errors
- ✅ XML sitemap accessible and submitted
- ✅ Robots.txt properly configured
- ✅ Open Graph images display correctly
- ✅ Core Web Vitals pass (LCP, FID, CLS)
- ✅ Mobile-friendly test passes
- ✅ No crawl errors in Search Console
- ✅ Rich snippets appear in search results