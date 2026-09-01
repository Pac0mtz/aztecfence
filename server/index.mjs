// Production server: serves the built site from dist/ plus the contact API.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import app from "./app.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(dist, "index.html");
const indexHtml = fs.readFileSync(indexPath, "utf8");

const SITE = "https://aztecfence.net";

const PAGE_META = {
  "/": {
    title: "Aztec Fence Company | Fence Installation in Northern Illinois",
    description: "Aztec Fence Company installs aluminum, vinyl, wood, chain link & commercial fencing across Northern Illinois. 30+ years, licensed & insured. Free quotes — (847) 740-4655.",
  },
  "/aluminum-fences/": {
    title: "Aluminum Fence Installation in Northern Illinois | Aztec Fence",
    description: "Ornamental aluminum fencing that's rust-free, low-maintenance, and backed by a lifetime warranty. Pool-code options across Northern Illinois. Free quotes — call (847) 740-4655.",
  },
  "/vinyl-picket-fencing/": {
    title: "Vinyl Picket Fence Installation in Northern Illinois | Aztec Fence",
    description: "Low-maintenance vinyl picket fencing that never needs painting. Fade-, crack-, and warp-resistant with lifetime warranty options across Northern Illinois. Free quotes — (847) 740-4655.",
  },
  "/wood-picket-fencing/": {
    title: "Wood Picket Fence Installation in Northern Illinois | Aztec Fence",
    description: "Custom cedar wood picket fences that add timeless curb appeal to your Northern Illinois home. Spaced, scalloped, and gated designs. Free quotes — call (847) 740-4655.",
  },
  "/wood-picket-fences/": {
    title: "Wood Picket Fence Installation in Northern Illinois | Aztec Fence",
    description: "Custom cedar wood picket fences that add timeless curb appeal to your Northern Illinois home. Spaced, scalloped, and gated designs. Free quotes — call (847) 740-4655.",
  },
  "/chain-link-fences/": {
    title: "Chain Link Fence Installation in Northern Illinois | Aztec Fence",
    description: "Galvanized & vinyl-coated chain link fencing for homes, businesses, and industrial sites across Northern Illinois. Durable, low-maintenance, and affordable. Free quotes — call (847) 740-4655.",
  },
  "/privacy-fences/": {
    title: "Privacy Fence Installation in Northern Illinois | Aztec Fence",
    description: "Wood, vinyl, and board-on-board privacy fences that block views, cut noise, and boost property value across Northern Illinois. Free quotes — call (847) 740-4655.",
  },
  "/security-fences/": {
    title: "Commercial & Industrial Security Fencing in Northern Illinois | Aztec Fence",
    description: "Heavy-duty security fencing — galvanized chain link, barbed wire, privacy slats, and access gates — for commercial and industrial sites across Northern Illinois. Free quotes — (847) 740-4655.",
  },
  "/gates/": {
    title: "Gate Installation in Northern Illinois | Aztec Fence Company",
    description: "Custom residential & commercial gates — swing, slide, and automated entry gates in steel, aluminum & wood across Northern Illinois. Free quotes: (847) 740-4655.",
  },
  "/residential-fence/": {
    title: "Residential Fencing in Northern Illinois | Aztec Fence Company",
    description: "Residential fence installation — wood, vinyl, aluminum & chain link — that adds beauty, privacy, and value to your Northern Illinois home. Free quotes: (847) 740-4655.",
  },
  "/commercial-fencing/": {
    title: "Commercial & Industrial Fencing in Northern Illinois | Aztec Fence",
    description: "Commercial fencing for businesses & industrial sites — security fencing, chain link, ornamental steel & access gates across Northern Illinois. Free quotes: (847) 740-4655.",
  },
  "/photo-gallery/": {
    title: "Fence Photo Gallery | Aztec Fence Company — Northern Illinois",
    description: "Browse 100+ photos of our aluminum, vinyl, wood, chain link & commercial fencing projects across Northern Illinois. Get inspired, then request a free quote.",
  },
  "/about-us/": {
    title: "About Aztec Fence Company | 30+ Years in Northern Illinois",
    description: "Family-owned since 1994, Aztec Fence Company has installed quality residential & commercial fencing across Northern Illinois for 30+ years. Licensed & insured.",
  },
  "/contact/": {
    title: "Contact Aztec Fence Company | Free Fence Quote in Northern Illinois",
    description: "Contact Aztec Fence Company for a free fencing consultation and quote. Call (847) 740-4655 or visit us at 11 N Fairfield Rd, Round Lake, IL 60073.",
  },
  "/privacy-policy/": {
    title: "Privacy Policy | Aztec Fence Company",
    description: "How Aztec Fence Company collects, uses, and protects information from our website, quote form, and advertising, including Google Ads conversion tracking.",
  },
  "/terms-and-conditions/": {
    title: "Terms & Conditions | Aztec Fence Company",
    description: "Terms and conditions for using the Aztec Fence Company website and services.",
  },
  "/thank-you/": {
    title: "Thank You | Aztec Fence Company",
    description: "We received your fence quote request and will contact you shortly.",
  },
};

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function applyMeta(html, pathname, meta) {
  const canonical = `${SITE}${pathname === "/" ? "/" : pathname}`;
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(meta.description)}"`,
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`,
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeAttr(meta.title)}"`,
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeAttr(meta.description)}"`,
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`,
  );

  const extra =
    pathname === "/privacy-policy/"
      ? `<p>Aztec Fence Company collects name, email, phone, and project details from our quote form so we can contact you. We use Google Ads tags to measure quote requests and calls. We do not sell personal information. Email sales@aztecfence.net or call (847) 740-4655 with privacy questions.</p>`
      : `<p>${escapeAttr(meta.description)}</p>`;

  const crawler = `<div id="root"><main><h1>${meta.title}</h1>${extra}<p>Aztec Fence Company, 11 N Fairfield Rd, Round Lake, IL 60073. <a href="tel:8477404655">(847) 740-4655</a>. <a href="/contact/">Free quote</a>. <a href="/privacy-policy/">Privacy Policy</a>.</p></main></div>`;
  out = out.replace(/<div id="root"><\/div>/, crawler);
  return out;
}

function normalizePath(urlPath) {
  if (!urlPath || urlPath === "/") return "/";
  const clean = urlPath.split("?")[0].split("#")[0];
  return clean.endsWith("/") ? clean : `${clean}/`;
}

app.use(express.static(dist, { index: false }));
app.get(/^\/(?!api\/).*/, (req, res) => {
  const pathname = normalizePath(req.path);
  const meta = PAGE_META[pathname];
  if (meta) {
    res.type("html").send(applyMeta(indexHtml, pathname, meta));
    return;
  }
  res.sendFile(indexPath);
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));
