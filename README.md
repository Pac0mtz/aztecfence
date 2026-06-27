# Aztec Fence Company — Website

Marketing site for Aztec Fence Company (Northern Illinois). Built with **React 19 + TypeScript +
Vite**, Tailwind CSS, React Router, and Framer Motion.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server (port 3000). |
| `npm run build` | Type-check + production build to `dist/` (runs `thumbs` first via `prebuild`). |
| `npm run preview` | Serve the production build locally with SPA history fallback. |
| `npm run thumbs` | Regenerate WebP + JPEG gallery thumbnails (`scripts/generate-thumbs.mjs`). |
| `npm run lint` | ESLint. |

## Run on Replit

This repo is Replit-ready:

1. In Replit: **Create Repl → Import from GitHub** and paste this repo's URL.
2. Press **Run** — `.replit` installs deps and starts `npm run dev`. Vite is configured with
   `host: true` + `allowedHosts: true` so it works behind Replit's proxy.
3. To publish: **Deploy** uses the `[deployment]` block (`npm ci && npm run build`, then
   `npm run preview`) — autoscale so the SPA history fallback works.

## Deployment notes (any host)

- The app uses **`BrowserRouter`** (real URLs). The host **must** rewrite unknown paths to
  `index.html`:
  - Netlify: `/* /index.html 200`
  - Vercel: SPA rewrite to `/index.html`
  - Nginx: `try_files $uri /index.html;`
  - Replit/`vite preview`: handled automatically.
- Set the canonical domain in `src/components/Seo.tsx`, `index.html`, `public/robots.txt`, and
  `public/sitemap.xml` if it differs from `aztecfence.net`.

## SEO

See [`SEO.md`](./SEO.md) for the keyword map, structured-data, and production SEO checklist.
