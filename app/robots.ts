import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Everything public stays crawlable. /api/ is raw JSON that duplicates the page.
// /design is left crawlable on purpose: it carries a noindex tag, which crawlers can only see if allowed in.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
