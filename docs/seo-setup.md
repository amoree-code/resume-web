# Search engine setup

Manual steps that need your accounts. Nothing here is done until you do it.

## 1. Google Search Console — https://search.google.com/search-console

1. Add property → **URL prefix** → `https://cv-ameer.vercel.app/`.
   (A Domain property needs DNS access, which a `vercel.app` subdomain does not give you.)
2. Verify with **HTML tag**. Copy only the `content="…"` value.
3. Vercel → Project → Settings → Environment Variables → add
   `GOOGLE_SITE_VERIFICATION` = that value (Production). Redeploy, then click **Verify**.
4. **Sitemaps** → submit `sitemap.xml`. Status should read *Success*.
5. **URL Inspection** → `https://cv-ameer.vercel.app/` → **Test live URL** → **Request indexing**.
6. Check back in 3–7 days: **Pages** (indexing errors), **Performance** (queries, impressions,
   clicks — filter by query "Ameer Abdulkareem" to track the name).

## 2. Bing Webmaster Tools — https://www.bing.com/webmasters

Bing's index also feeds Yahoo, DuckDuckGo, Ecosia and parts of ChatGPT search and Copilot.

1. Fastest: **Import from Google Search Console** after step 1 is verified.
2. Or add the site manually, choose **HTML meta tag**, and set
   `BING_SITE_VERIFICATION` in Vercel to the `msvalidate.01` content value. Redeploy, verify.
3. **Sitemaps** → submit `https://cv-ameer.vercel.app/sitemap.xml`.
4. **URL Inspection** → request indexing for the home page.

## 3. IndexNow — https://www.indexnow.org/

Not set up. For a single-page site that changes a few times a year, submitting through
Bing Webmaster Tools after a deploy is enough. Worth adding only if the site grows into
many pages that change often.

## 4. Validate after each deploy

- Rich Results Test: https://search.google.com/test/rich-results — the page should show
  ProfilePage with no errors.
- Schema validator: https://validator.schema.org/ — WebSite, ProfilePage, Person.
- PageSpeed Insights: https://pagespeed.web.dev/ — mobile LCP < 2.5 s, CLS < 0.1, INP < 200 ms.
- Social card preview: paste the URL into LinkedIn Post Inspector
  (https://www.linkedin.com/post-inspector/) to refresh the cached card.

## 5. When content changes

Bump `LAST_UPDATED` in `lib/site.ts` so the sitemap `lastmod` and the ProfilePage
`dateModified` stay accurate.
