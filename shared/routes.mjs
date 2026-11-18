// Single route table for the React app and the production server.
// A path that is not listed here is not a page: the server returns 404.
import { LANDING_PAGES } from "./landings.mjs";

const CORE_PAGES = [
  {
    path: "/",
    title: "Aztec Fence Company | Fence Installation in Northern Illinois",
    description: "Aztec Fence Company installs aluminum, vinyl, wood, chain link & commercial fencing across Northern Illinois. 30+ years, licensed & insured. Free quotes — (847) 740-4655.",
    linkLabel: "Home",
    h1: "Our Fences Stand Firm As Our Reputation",
  },
  {
    path: "/aluminum-fences/",
    title: "Aluminum Fence Installation in Northern Illinois | Aztec Fence",
    description: "Rust-free aluminum and pool-code fence installation in Northern Illinois. Lifetime warranty. Free quotes. (847) 740-4655.",
    linkLabel: "Aluminum fences",
  },
  {
    path: "/vinyl-picket-fencing/",
    title: "Vinyl Picket Fence Installation in Northern Illinois | Aztec Fence",
    description: "Low-maintenance vinyl picket fencing that never needs painting. Fade-, crack-, and warp-resistant with lifetime warranty options across Northern Illinois. Free quotes — (847) 740-4655.",
    linkLabel: "Vinyl picket fencing",
  },
  {
    path: "/wood-picket-fencing/",
    title: "Wood Picket Fence Installation in Northern Illinois | Aztec Fence",
    description: "Custom cedar wood picket fences that add timeless curb appeal to your Northern Illinois home. Spaced, scalloped, and gated designs. Free quotes — call (847) 740-4655.",
    linkLabel: "Wood picket fencing",
  },
  {
    path: "/chain-link-fences/",
    title: "Chain Link Fence Installation in Northern Illinois | Aztec Fence",
    description: "Galvanized & vinyl-coated chain link fencing for homes, businesses, and industrial sites across Northern Illinois. Durable, low-maintenance, and affordable. Free quotes — call (847) 740-4655.",
    linkLabel: "Chain link fences",
  },
  {
    path: "/privacy-fences/",
    title: "Privacy Fence Installation in Northern Illinois | Aztec Fence",
    description: "Wood, vinyl, and board-on-board privacy fences that block views, cut noise, and boost property value across Northern Illinois. Free quotes — call (847) 740-4655.",
    linkLabel: "Privacy fences",
  },
  {
    path: "/security-fences/",
    title: "Commercial & Industrial Security Fencing in Northern Illinois | Aztec Fence",
    description: "Heavy-duty security fencing — galvanized chain link, barbed wire, privacy slats, and access gates — for commercial and industrial sites across Northern Illinois. Free quotes — (847) 740-4655.",
    linkLabel: "Security fences",
  },
  {
    path: "/gates/",
    title: "Gate Installation in Northern Illinois | Aztec Fence Company",
    description: "Custom residential & commercial gates — swing, slide, and automated entry gates in steel, aluminum & wood across Northern Illinois. Free quotes: (847) 740-4655.",
    linkLabel: "Gates",
  },
  {
    path: "/residential-fence/",
    title: "Residential Fencing in Northern Illinois | Aztec Fence Company",
    description: "Residential fence installation — wood, vinyl, aluminum & chain link — that adds beauty, privacy, and value to your Northern Illinois home. Free quotes: (847) 740-4655.",
    linkLabel: "Residential fencing",
  },
  {
    path: "/commercial-fencing/",
    title: "Commercial & Industrial Fencing in Northern Illinois | Aztec Fence",
    description: "Commercial fencing for businesses & industrial sites — security fencing, chain link, ornamental steel & access gates across Northern Illinois. Free quotes: (847) 740-4655.",
    linkLabel: "Commercial fencing",
  },
  {
    path: "/photo-gallery/",
    title: "Fence Photo Gallery | Aztec Fence Company — Northern Illinois",
    description: "Browse 100+ photos of our aluminum, vinyl, wood, chain link & commercial fencing projects across Northern Illinois. Get inspired, then request a free quote.",
    linkLabel: "Photo gallery",
  },
  {
    path: "/about-us/",
    title: "About Aztec Fence Company | 30+ Years in Northern Illinois",
    description: "Family-owned since 1994, Aztec Fence Company has installed quality residential & commercial fencing across Northern Illinois for 30+ years. Licensed & insured.",
    linkLabel: "About us",
  },
  {
    path: "/contact/",
    title: "Contact Aztec Fence Company | Free Fence Quote in Northern Illinois",
    description: "Contact Aztec Fence Company for a free fencing consultation and quote. Call (847) 740-4655 or visit us at 11 N Fairfield Rd, Round Lake, IL 60073.",
    linkLabel: "Contact",
  },
  {
    path: "/privacy-policy/",
    title: "Privacy Policy | Aztec Fence Company",
    description: "How Aztec Fence Company collects, uses, and protects information from our website, quote form, and advertising, including Google Ads conversion tracking.",
  },
  {
    path: "/terms-and-conditions/",
    title: "Terms & Conditions | Aztec Fence Company",
    description: "Terms and conditions for using the Aztec Fence Company website and services.",
  },
  {
    path: "/thank-you/",
    title: "Thank You | Aztec Fence Company",
    description: "We received your fence quote request and will contact you shortly.",
  },
];

export const PAGES = CORE_PAGES.concat(LANDING_PAGES.map((page) => ({
  path: page.path,
  title: page.title,
  description: page.description,
  h1: page.h1,
  linkLabel: page.linkLabel,
})));

export function routePath(path) {
  const match = PAGES.find((page) => page.path === path);
  if (!match) throw new Error(`Missing route table entry for ${path}`);
  return match.path;
}
