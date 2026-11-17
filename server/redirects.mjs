// Production host and legacy-path redirects. Pure functions so tests can
// cover them without booting the mailer.

const PRODUCTION_HOSTS = new Set(["aztecfence.net", "www.aztecfence.net"]);

const LEGACY_PATHS = new Map([
  ["/thank-you/thank-you", "/thank-you/"],
  ["/contact-us", "/contact/"],
  ["/book-a-free-consultation", "/contact/"],
  ["/vinyl-fencing", "/vinyl-picket-fencing/"],
  ["/aluminum-fencing", "/aluminum-fences/"],
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

export function applyRobotsMeta(html, pathname) {
  if (pathname !== "/thank-you/") return html;
  const tag = `<meta name="robots" content="noindex, nofollow"`;
  if (/<meta name="robots" content="[^"]*"/.test(html)) {
    return html.replace(/<meta name="robots" content="[^"]*"/, tag);
  }
  return html.replace("</head>", `${tag}>\n</head>`);
}
