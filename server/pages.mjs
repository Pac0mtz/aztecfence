import express from "express";
import { PAGES } from "../shared/routes.mjs";
import { applyRobotsMeta, setRobots } from "./redirects.mjs";

const SITE = "https://aztecfence.net";

export function normalizePath(urlPath) {
  if (!urlPath || urlPath === "/") return "/";
  const clean = String(urlPath).split("?")[0].split("#")[0];
  if (!clean || clean === "/") return "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

export function lookupPage(pathname) {
  const normalized = normalizePath(pathname);
  return PAGES.find((page) => page.path === normalized) || null;
}

function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderPage(html, page) {
  const pathname = page.path;
  const canonical = `${SITE}${pathname === "/" ? "/" : pathname}`;
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(page.description)}"`,
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`,
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeAttr(page.title)}"`,
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeAttr(page.description)}"`,
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`,
  );
  out = applyRobotsMeta(out, pathname);

  const extra =
    pathname === "/privacy-policy/"
      ? `<p>Aztec Fence Company collects name, email, phone, and project details from our quote form so we can contact you. We use Google Ads tags to measure quote requests and calls. We do not sell personal information. Email sales@aztecfence.net or call (847) 740-4655 with privacy questions.</p>`
      : `<p>${escapeHtml(page.description)}</p>`;

  const crawler = `<div id="crawler-fallback" aria-hidden="true"><main><h1>${escapeHtml(page.title)}</h1>${extra}<p>Aztec Fence Company, 11 N Fairfield Rd, Round Lake, IL 60073. <a href="tel:8477404655">(847) 740-4655</a>. <a href="/contact/">Free quote</a>. <a href="/privacy-policy/">Privacy Policy</a>.</p></main></div>`;
  out = out.replace(/<div id="root"><\/div>/, `<div id="root"></div>${crawler}`);
  return out;
}

export function renderNotFound(html, pathname) {
  const title = "Page not found | Aztec Fence Company";
  const description = "That page is not on the Aztec Fence site. Browse our fencing services or request a free quote.";
  const url = `${SITE}${pathname}`;
  const links = PAGES
    .filter((page) => page.linkLabel)
    .map((page) => `<a href="${page.path}">${escapeHtml(page.linkLabel)}</a>`)
    .join(", ");

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(description)}"`,
  );
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>\s*/g, "");
  out = setRobots(out, "noindex, nofollow");
  out = out.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeAttr(title)}"`,
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeAttr(description)}"`,
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url}"`,
  );

  const crawler = `<div id="crawler-fallback" aria-hidden="true"><main><h1>Page not found</h1><p>${escapeHtml(description)}</p><p>${links}.</p><p><a href="/contact/">Request a free quote</a> or call <a href="tel:8477404655">(847) 740-4655</a>.</p></main></div>`;
  out = out.replace(/<div id="root"><\/div>/, `<div id="root"></div>${crawler}`);
  return out;
}

export function installPages(app, { distDir, html }) {
  app.use(express.static(distDir, { index: false }));
  app.get(/^\/(?!api\/).*/, (req, res) => {
    const page = lookupPage(req.path);
    if (page) {
      res.status(200).type("html").send(renderPage(html, page));
      return;
    }
    res.status(404).type("html").send(renderNotFound(html, normalizePath(req.path)));
  });
}
