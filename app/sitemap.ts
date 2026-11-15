import type { MetadataRoute } from 'next';
import { LAST_UPDATED, SITE_URL } from '@/lib/site';

// Only canonical, indexable routes. /design is noindex and /api is data, so neither is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: LAST_UPDATED }];
}
