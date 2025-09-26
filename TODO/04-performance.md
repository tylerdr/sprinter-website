# Performance Optimization Guide

## Current Performance Issues

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s (Currently: ~3.5s)
- **FID (First Input Delay):** < 100ms (Currently: Good)
- **CLS (Cumulative Layout Shift):** < 0.1 (Currently: ~0.15)
- **TTFB (Time to First Byte):** < 600ms (Currently: ~800ms)

---

## Critical Performance Optimizations

### 1. Image Optimization

#### Current Issues:
- Large unoptimized images in hero sections
- Missing responsive images
- No lazy loading on below-fold images

#### Solutions:

```typescript
// Use Next.js Image component everywhere
import Image from 'next/image';

// Bad
<img src="/hero.jpg" alt="Hero" />

// Good
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL={blurDataUrl}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### Image Format Optimization:
```bash
# Convert images to WebP
for file in public/images/*.{jpg,png}; do
  cwebp "$file" -o "${file%.*}.webp"
done
```

### 2. Bundle Size Reduction

#### Analyze Bundle:
```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

# Run analysis
ANALYZE=true npm run build
```

#### Code Splitting Strategies:

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false // For client-only components
  }
);

// Route-based code splitting
// This happens automatically with Next.js App Router

// Component-level splitting
const LazyComponent = lazy(() => import('./LazyComponent'));
```

### 3. Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true // Reduce CLS
});
```

### 4. Animation Performance

#### GPU Acceleration:
```css
/* Use transform and opacity for animations */
.animate {
  transform: translateZ(0); /* Force GPU layer */
  will-change: transform, opacity; /* Hint browser */
}

/* Avoid animating expensive properties */
/* Bad: width, height, padding, margin */
/* Good: transform, opacity */
```

#### Framer Motion Optimization:
```typescript
// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const animationConfig = {
  initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: prefersReducedMotion ? 0 : 0.5 }
};
```

### 5. Caching Strategy

#### API Route Caching:
```typescript
// app/api/data/route.ts
export async function GET() {
  const data = await fetchData();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
```

#### Static Generation:
```typescript
// Use generateStaticParams for dynamic routes
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Revalidate at most every hour
export const revalidate = 3600;
```

### 6. Database Query Optimization

```typescript
// lib/supabase/queries.ts
// Bad: Multiple queries
const user = await supabase.from('users').select('*').single();
const posts = await supabase.from('posts').select('*');
const comments = await supabase.from('comments').select('*');

// Good: Single query with joins
const { data, error } = await supabase
  .from('users')
  .select(`
    *,
    posts (
      *,
      comments (*)
    )
  `)
  .single();
```

### 7. Third-Party Script Optimization

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function Layout() {
  return (
    <>
      {/* Load critical scripts first */}
      <Script
        src="https://critical.js"
        strategy="beforeInteractive"
      />

      {/* Defer non-critical scripts */}
      <Script
        src="https://analytics.js"
        strategy="lazyOnload"
      />

      {/* Inline critical CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: criticalCSS
        }}
      />
    </>
  );
}
```

---

## Lab-Specific Optimizations

### 1. Lazy Load Labs
```typescript
// app/labs/page.tsx
const labComponents = {
  'agent-simulator': dynamic(() => import('./agent-simulator/AgentSimulator')),
  'workflow-tool': dynamic(() => import('./workflow-tool/WorkflowTool')),
  // ... other labs
};
```

### 2. Virtualization for Long Lists
```typescript
// For labs with many items
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  );
}
```

---

## Monitoring & Metrics

### 1. Web Vitals Tracking
```typescript
// app/layout.tsx
import { useReportWebVitals } from 'next/web-vitals';

export function ReportWebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);

    // Or send to monitoring service
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify(metric),
    });
  });
}
```

### 2. Performance Observer
```typescript
// hooks/usePerformanceMonitor.ts
export function usePerformanceMonitor() {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      // LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // CLS
      const clsObserver = new PerformanceObserver((list) => {
        let cls = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        console.log('CLS:', cls);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);
}
```

---

## Build Optimization

### Next.js Config:
```javascript
// next.config.js
module.exports = {
  swcMinify: true,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lodash'],
  },

  webpack: (config, { isServer }) => {
    // Tree shaking
    config.optimization.usedExports = true;

    // Module concatenation
    config.optimization.concatenateModules = true;

    return config;
  },
};
```

---

## Deployment Optimizations

### 1. CDN Configuration
```javascript
// Use Vercel Edge Config
export const config = {
  runtime: 'edge',
};
```

### 2. Prerendering
```typescript
// Force static generation for marketing pages
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours
```

### 3. Middleware Optimization
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Add caching headers
  const response = NextResponse.next();

  // Cache static assets
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}
```

---

## Performance Budget

### Target Metrics:
```javascript
// performance-budget.json
{
  "timings": {
    "firstContentfulPaint": 1500,
    "largestContentfulPaint": 2500,
    "timeToInteractive": 3500,
    "totalBlockingTime": 300
  },
  "sizes": {
    "javascript": 400000,
    "css": 60000,
    "fonts": 100000,
    "images": 500000,
    "total": 1500000
  }
}
```

### Monitoring Script:
```bash
#!/bin/bash
# check-performance.sh

# Run Lighthouse
npx lighthouse https://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report.json \
  --only-categories=performance

# Check against budget
node scripts/check-budget.js
```

---

## Quick Wins Checklist

### Immediate (30 mins):
- [ ] Enable Next.js Image component for all images
- [ ] Add loading="lazy" to below-fold images
- [ ] Compress existing images
- [ ] Add font-display: swap to fonts

### Short-term (2 hours):
- [ ] Implement dynamic imports for heavy components
- [ ] Add caching headers to API routes
- [ ] Optimize bundle with tree shaking
- [ ] Remove unused dependencies

### Medium-term (4 hours):
- [ ] Implement virtual scrolling for long lists
- [ ] Add service worker for offline support
- [ ] Optimize database queries
- [ ] Implement edge caching

---

## Success Metrics

- ✅ Lighthouse Performance Score > 90
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ FID < 100ms
- ✅ Total bundle size < 300KB (gzipped)
- ✅ Time to Interactive < 3.5s
- ✅ First Contentful Paint < 1.5s