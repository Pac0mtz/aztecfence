# Aztec Fence Company — Marketing Website

React 19 + TypeScript + Vite marketing site for Aztec Fence Company (Northern Illinois).

## Stack

- **React 19 + TypeScript** — component framework
- **Vite** — dev server and build tool (port 3000)
- **Tailwind CSS + shadcn/ui (Radix)** — styling and UI primitives
- **Framer Motion** — animations
- **React Router v7** — client-side routing (BrowserRouter)

## Running on Replit

Press **Run** — the `Dev` workflow installs deps (`npm install`) then starts `npm run dev`.  
The app is available in the preview pane on port 3000.

No secrets or external services are required.

## Key scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server (port 3000) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve production build with SPA history fallback |
| `npm run thumbs` | Regenerate WebP/JPEG gallery thumbnails |
| `npm run lint` | ESLint |

## Deployment

Configured in `.replit` for autoscale deployment:
- **Build:** `npm ci && npm run build`
- **Run:** `npm run preview` (serves `dist/` with SPA history fallback)

## User preferences

<!-- Add any remembered preferences here -->
