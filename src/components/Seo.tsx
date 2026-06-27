import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Single source of truth for site-wide SEO constants.
export const SITE_URL = "https://aztecfence.net";
export const SITE_NAME = "Aztec Fence Company";
const DEFAULT_OG_IMAGE = "/images/Residential-vinyl-privacy-fence-04-1.jpg";

interface SeoProps {
  /** Full document title, e.g. "Chain Link Fences in Northern Illinois | Aztec Fence" */
  title: string;
  description: string;
  /** Canonical path override (defaults to the current route). */
  path?: string;
  keywords?: string;
  /** OG/Twitter image, absolute or site-relative. */
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Page-specific JSON-LD (object or array). */
  jsonLd?: object | object[];
}

function upsertMeta(attr: "name" | "property", value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({
  title, description, path, keywords, image, type = "website", noindex, jsonLd,
}: SeoProps) {
  const { pathname } = useLocation();
  const canonicalPath = path ?? pathname;
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const canonical = SITE_URL + canonicalPath;
    const rawImg = image || DEFAULT_OG_IMAGE;
    const img = rawImg.startsWith("http") ? rawImg : SITE_URL + rawImg;

    document.title = title;
    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", img);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);

    const ldId = "page-jsonld";
    let script = document.getElementById(ldId) as HTMLScriptElement | null;
    if (ld) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = ldId;
        document.head.appendChild(script);
      }
      script.textContent = ld;
    } else if (script) {
      script.remove();
    }

    return () => {
      document.getElementById(ldId)?.remove();
    };
  }, [title, description, canonicalPath, keywords, image, type, noindex, ld]);

  return null;
}
