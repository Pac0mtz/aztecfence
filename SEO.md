# Aztec Fence — SEO Strategy & Keyword Map

Local service business (fence installation) serving **Northern Illinois / Lake County**, based in
Round Lake, IL. SEO priorities: local pack visibility, service-page rankings, and
conversion-focused content. Primary conversion = phone call / free-quote form.

## Keyword research & page mapping

Each money page targets one primary head term + local modifier, plus supporting long-tail.

| Page | URL | Primary keyword | Secondary / long-tail |
|------|-----|-----------------|------------------------|
| Home | `/` | fence company northern illinois | fence installation lake county il, fence contractor round lake il |
| Aluminum | `/aluminum-fences/` | aluminum fence installation | ornamental aluminum fence, pool fence il, rust-free aluminum fencing |
| Vinyl Picket | `/vinyl-picket-fencing/` | vinyl picket fence | white vinyl fence, low maintenance fence, pvc picket fence |
| Wood Picket | `/wood-picket-fencing/` | wood picket fence | cedar picket fence, white picket fence installation |
| Chain Link | `/chain-link-fences/` | chain link fence installation | galvanized chain link, vinyl coated chain link, dog run fence |
| Privacy | `/privacy-fences/` | privacy fence installation | 6 ft privacy fence, board on board fence, backyard privacy fence |
| Security | `/security-fences/` | commercial security fencing | industrial fence, barbed wire fence, anti-climb fence |
| Gates | `/gates/` | gate installation | driveway gates, automated gates, commercial slide gate |
| Residential | `/residential-fence/` | residential fence installation | home fence, backyard fence il |
| Commercial | `/commercial-fencing/` | commercial fence installation | industrial fencing, perimeter fence, business fence |
| Gallery | `/photo-gallery/` | fence gallery / fence ideas | fence design photos, fence pictures il |
| About | `/about-us/` | aztec fence company | (brand) |
| Contact | `/contact/` | fence quote / fence estimate | free fence estimate near me |

**Local modifiers to weave into copy & H2s:** Northern Illinois, Lake County, Round Lake,
Gurnee, Libertyville, Waukegan, Grayslake, Mundelein, Vernon Hills, Lake Zurich, plus the full
service-area list already rendered on the home page (good for local long-tail).

## Site structure

- Flat, crawlable URL hierarchy (real paths, trailing slash to match existing inbound links).
- One `<h1>` per page; section `<h2>`/`<h3>` carry secondary keywords.
- Breadcrumbs (visual + `BreadcrumbList` schema) on every interior page.
- Internal linking: home → service pages → contact; gallery cross-links categories.

## Technical SEO implemented in this codebase

- **Real, indexable URLs** — switched `HashRouter` → `BrowserRouter` (was `/#/…`, now `/…`).
- **Per-page `<title>`, meta description, canonical, Open Graph & Twitter** via `src/components/Seo.tsx`.
- **Structured data (JSON-LD):**
  - Site-wide `GeneralContractor`/`LocalBusiness` + `WebSite` (static in `index.html` — crawlable without JS) with NAP, geo, hours, `aggregateRating`, and `makesOffer`.
  - Per page: `Service`, `FAQPage`, `BreadcrumbList`, `ImageGallery`, `AboutPage`, `ContactPage`.
- **`robots.txt`** + **`sitemap.xml`** in `public/`.
- **Performance (ranking factor):** images capped at 1280px, WebP grid thumbnails with JPEG
  fallback, lazy-loading, async decode, explicit dimensions (CLS), `fetchpriority` on the LCP hero.
- Semantic headings, descriptive `alt` text, geo meta tags, theme-color, favicon.
- FAQ content on every fence-style page targeting question-style search queries.

## Important production caveats / next steps

1. **Server SPA fallback (required).** With `BrowserRouter`, the host must rewrite unknown paths
   to `index.html` (e.g. Netlify `_redirects: /* /index.html 200`, Vercel rewrites, or Nginx
   `try_files $uri /index.html`). Vite dev/preview already does this.
2. **Prerender / SSR for best results.** This is a client-rendered SPA. Google renders JS, but
   prerendering each route to static HTML (e.g. `vite-plugin-ssr`/`vike`, `react-snap`, or a
   prerender step) guarantees crawlers and social scrapers see full content + meta immediately.
3. **Set the real canonical domain** if not `aztecfence.net` (currently the canonical base in
   `Seo.tsx`, `index.html`, `robots.txt`, and `sitemap.xml`).
4. **Off-page (highest local-SEO leverage):** Google Business Profile (categories, photos,
   reviews, posts), consistent NAP citations, and local backlinks. Keep the on-site
   `aggregateRating` in sync with the real review count.
5. Add a real OG share image (1200×630) and per-page OG images for richer social previews.
