// Production host and legacy-path redirects. Pure functions so tests can
// cover them without booting the mailer.

const PRODUCTION_HOSTS = new Set(["aztecfence.net", "www.aztecfence.net"]);

const LEGACY_PATHS = new Map([
  ["/thank-you/thank-you", "/thank-you/"],
  ["/contact-us", "/contact/"],
  ["/book-a-free-consultation", "/contact/"],
  ["/vinyl-fencing", "/vinyl-picket-fencing/"],
  ["/aluminum-fencing", "/aluminum-fences/"],
  ["/gallery", "/photo-gallery/"],
  ["/about", "/about-us/"],
  ["/get-a-quote", "/contact/"],
  ["/free-quote", "/contact/"],
  ["/wood-fencing", "/wood-picket-fencing/"],
  ["/wood-picket-fences", "/wood-picket-fencing/"],
  ["/index.html", "/"],
]);

export function legacyRedirectPath(pathname) {
  const pathOnly = String(pathname || "/").split("?")[0].split("#")[0];
  const key = pathOnly.replace(/\/+$/, "").toLowerCase() || "/";
  return LEGACY_PATHS.get(key) || null;
}

export function appendOriginalQuery(targetPath, originalUrl) {
  const raw = String(originalUrl || "");
  const q = raw.indexOf("?");
  if (q === -1) return targetPath;
  return targetPath + raw.slice(q);
}

const WORDPRESS_PREFIXES = ["/wp-admin", "/wp-content", "/wp-includes", "/wp-json", "/tag", "/category", "/author"];
const WORDPRESS_FILES = new Set(["/xmlrpc.php", "/wp-login.php"]);

/**
 * Old WordPress URLs Google still requests. Matched case-insensitively, with
 * or without a trailing slash. Real unknown paths return false and stay 404.
 */
export function isWordpressGonePath(pathname) {
  const pathOnly = String(pathname || "").split("?")[0].split("#")[0];
  let decoded = pathOnly;
  try {
    decoded = decodeURIComponent(pathOnly);
  } catch {
    decoded = pathOnly;
  }
  const collapsed = decoded.toLowerCase().replace(/\/{2,}/g, "/");
  if (!collapsed.startsWith("/")) return false;
  const trimmed = collapsed.replace(/\/+$/, "") || "/";
  if (WORDPRESS_FILES.has(trimmed)) return true;
  if (WORDPRESS_PREFIXES.some((prefix) => trimmed === prefix || trimmed.startsWith(`${prefix}/`))) return true;
  return trimmed.split("/").filter(Boolean).includes("feed");
}

/**
 * WordPress homepage search (?s=) should not be a second indexable URL.
 * Only the bare homepage is redirected, and only when the s parameter is
 * present. Other homepage queries (gclid, utm_*) are left alone.
 * Returns "/" or null.
 */
export function homepageSearchRedirect(pathname, originalUrl) {
  const raw = originalUrl ? String(originalUrl) : String(pathname || "/");
  const hash = raw.indexOf("#");
  const withoutHash = hash === -1 ? raw : raw.slice(0, hash);
  const q = withoutHash.indexOf("?");
  const pathOnly = q === -1 ? withoutHash : withoutHash.slice(0, q);
  if (pathOnly !== "/") return null;
  if (q === -1) return null;
  const params = new URLSearchParams(withoutHash.slice(q + 1));
  if (!params.has("s")) return null;
  return "/";
}

/**
 * 301 target for the public site, or null when the request should be served.
 * Only an explicit x-forwarded-proto of "http" triggers the HTTPS redirect.
 * Missing proto is left alone: the TLS terminator in front of Node often
 * forwards plain HTTP without that header, and redirecting then loops.
 * www always goes to the https apex. /api is excluded so a POST is not
 * turned into a GET.
 */
export function canonicalHostRedirect({ hostHeader, forwardedProto, originalUrl, path }) {
  const host = String(hostHeader || "").split(":")[0].toLowerCase();
  if (!PRODUCTION_HOSTS.has(host)) return null;

  const reqPath = path || "/";
  if (reqPath === "/api" || reqPath.startsWith("/api/")) return null;

  const proto = String(forwardedProto || "").split(",")[0].trim().toLowerCase();
  const isWww = host === "www.aztecfence.net";
  const isHttp = proto === "http";
  if (!isWww && !isHttp) return null;

  const url = String(originalUrl || "/");
  if (!url.startsWith("/") || url.startsWith("//")) return null;
  return `https://aztecfence.net${url}`;
}

export function setRobots(html, content) {
  const tag = `<meta name="robots" content="${content}"`;
  if (/<meta name="robots" content="[^"]*"/.test(html)) {
    return html.replace(/<meta name="robots" content="[^"]*"/, tag);
  }
  return html.replace("</head>", `${tag}>\n</head>`);
}

export function applyRobotsMeta(html, pathname) {
  if (pathname !== "/thank-you/") return html;
  return setRobots(html, "noindex, nofollow");
}

export function installRedirects(app) {
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    const searchTarget = homepageSearchRedirect(req.path, req.originalUrl);
    const hostTarget = canonicalHostRedirect({
      hostHeader: req.headers.host,
      forwardedProto: req.get("x-forwarded-proto"),
      originalUrl: searchTarget || req.originalUrl,
      path: req.path,
    });
    if (hostTarget) return res.redirect(301, hostTarget);
    if (searchTarget) return res.redirect(301, searchTarget);

    const legacy = legacyRedirectPath(req.path);
    if (legacy) return res.redirect(301, appendOriginalQuery(legacy, req.originalUrl));

    next();
  });
}
