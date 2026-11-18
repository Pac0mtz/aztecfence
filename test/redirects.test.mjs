import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import test from "node:test";
import app from "../server/app.mjs";
import { PAGES } from "../shared/routes.mjs";
import {
  appendOriginalQuery,
  applyRobotsMeta,
  canonicalHostRedirect,
  legacyRedirectPath,
} from "../server/redirects.mjs";

function request({ path, host, proto }) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path,
          method: "GET",
          headers: {
            host,
            ...(proto ? { "x-forwarded-proto": proto } : {}),
          },
        },
        (res) => {
          res.resume();
          res.on("end", () => {
            server.close();
            resolve({ status: res.statusCode, location: res.headers.location || null });
          });
        },
      );
      req.on("error", (err) => {
        server.close();
        reject(err);
      });
      req.end();
    });
  });
}

test("legacy aliases redirect with and without a trailing slash", () => {
  const cases = [
    ["/thank-you/thank-you", "/thank-you/"],
    ["/thank-you/thank-you/", "/thank-you/"],
    ["/Thank-You/Thank-You/", "/thank-you/"],
    ["/contact-us", "/contact/"],
    ["/contact-us/", "/contact/"],
    ["/book-a-free-consultation", "/contact/"],
    ["/book-a-free-consultation/", "/contact/"],
    ["/vinyl-fencing", "/vinyl-picket-fencing/"],
    ["/vinyl-fencing/", "/vinyl-picket-fencing/"],
    ["/aluminum-fencing", "/aluminum-fences/"],
    ["/aluminum-fencing/", "/aluminum-fences/"],
    ["/gallery", "/photo-gallery/"],
    ["/gallery/", "/photo-gallery/"],
    ["/about", "/about-us/"],
    ["/about/", "/about-us/"],
    ["/get-a-quote", "/contact/"],
    ["/get-a-quote/", "/contact/"],
    ["/free-quote", "/contact/"],
    ["/free-quote/", "/contact/"],
    ["/wood-fencing", "/wood-picket-fencing/"],
    ["/wood-fencing/", "/wood-picket-fencing/"],
  ];
  for (const [from, to] of cases) {
    assert.equal(legacyRedirectPath(from), to, from);
  }
  for (const keep of ["/", "/thank-you/", "/contact/", "/photo-gallery/", "/about-us/", "/wood-picket-fencing/", "/vinyl-picket-fencing/", "/aluminum-fences/"]) {
    assert.equal(legacyRedirectPath(keep), null, keep);
  }
  assert.equal(
    appendOriginalQuery(legacyRedirectPath("/wood-fencing/"), "/wood-fencing/?ref=ad"),
    "/wood-picket-fencing/?ref=ad",
  );
  assert.equal(
    appendOriginalQuery(legacyRedirectPath("/gallery"), "/gallery?utm=1"),
    "/photo-gallery/?utm=1",
  );
});

test("legacy redirects keep the query string", () => {
  assert.equal(
    appendOriginalQuery(legacyRedirectPath("/thank-you/thank-you"), "/thank-you/thank-you?gclid=abc&utm_source=google"),
    "/thank-you/?gclid=abc&utm_source=google",
  );
  assert.equal(appendOriginalQuery("/contact/", "/contact-us/"), "/contact/");
});

test("production hosts 301 to the https apex and leave local and API alone", () => {
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "www.aztecfence.net",
      forwardedProto: "https",
      originalUrl: "/contact/?gclid=1",
      path: "/contact/",
    }),
    "https://aztecfence.net/contact/?gclid=1",
  );
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "aztecfence.net",
      forwardedProto: "http",
      originalUrl: "/aluminum-fences/",
      path: "/aluminum-fences/",
    }),
    "https://aztecfence.net/aluminum-fences/",
  );
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "www.aztecfence.net",
      forwardedProto: "http",
      originalUrl: "/",
      path: "/",
    }),
    "https://aztecfence.net/",
  );
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "WWW.AZTECFENCE.NET:443",
      forwardedProto: "https",
      originalUrl: "/gates/",
      path: "/gates/",
    }),
    "https://aztecfence.net/gates/",
  );
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "aztecfence.net",
      forwardedProto: "https",
      originalUrl: "/",
      path: "/",
    }),
    null,
  );
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "aztecfence.net",
      forwardedProto: "",
      originalUrl: "/",
      path: "/",
    }),
    null,
  );
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "localhost:3000",
      forwardedProto: "http",
      originalUrl: "/",
      path: "/",
    }),
    null,
  );
  assert.equal(
    canonicalHostRedirect({
      hostHeader: "www.aztecfence.net",
      forwardedProto: "http",
      originalUrl: "/api/contact",
      path: "/api/contact",
    }),
    null,
  );
});

test("thank-you robots meta is noindex and the ads tag is left in place", () => {
  const html = `<script>gtag('config', 'AW-11484223030');</script><meta name="robots" content="index, follow" />`;
  const out = applyRobotsMeta(html, "/thank-you/");
  assert.match(out, /content="noindex, nofollow"/);
  assert.match(out, /gtag\('config', 'AW-11484223030'\)/);
  assert.equal(applyRobotsMeta(html, "/contact/"), html);
});

test("Express responds with 301s for host and legacy paths", async () => {
  const cases = [
    {
      path: "/contact/?gclid=1",
      host: "www.aztecfence.net",
      proto: "https",
      location: "https://aztecfence.net/contact/?gclid=1",
    },
    {
      path: "/",
      host: "aztecfence.net",
      proto: "http",
      location: "https://aztecfence.net/",
    },
    {
      path: "/aluminum-fences/",
      host: "www.aztecfence.net",
      proto: "http",
      location: "https://aztecfence.net/aluminum-fences/",
    },
    {
      path: "/thank-you/thank-you?gclid=abc",
      host: "aztecfence.net",
      proto: "https",
      location: "/thank-you/?gclid=abc",
    },
    {
      path: "/thank-you/thank-you/",
      host: "aztecfence.net",
      proto: "https",
      location: "/thank-you/",
    },
    {
      path: "/contact-us",
      host: "aztecfence.net",
      proto: "https",
      location: "/contact/",
    },
    {
      path: "/contact-us/",
      host: "aztecfence.net",
      proto: "https",
      location: "/contact/",
    },
    {
      path: "/book-a-free-consultation/",
      host: "aztecfence.net",
      proto: "https",
      location: "/contact/",
    },
    {
      path: "/vinyl-fencing",
      host: "aztecfence.net",
      proto: "https",
      location: "/vinyl-picket-fencing/",
    },
    {
      path: "/aluminum-fencing/",
      host: "aztecfence.net",
      proto: "https",
      location: "/aluminum-fences/",
    },
    {
      path: "/gallery",
      host: "aztecfence.net",
      proto: "https",
      location: "/photo-gallery/",
    },
    {
      path: "/gallery/?utm=1",
      host: "aztecfence.net",
      proto: "https",
      location: "/photo-gallery/?utm=1",
    },
    {
      path: "/about/",
      host: "aztecfence.net",
      proto: "https",
      location: "/about-us/",
    },
    {
      path: "/get-a-quote",
      host: "aztecfence.net",
      proto: "https",
      location: "/contact/",
    },
    {
      path: "/free-quote/",
      host: "aztecfence.net",
      proto: "https",
      location: "/contact/",
    },
    {
      path: "/wood-fencing?ref=ad",
      host: "aztecfence.net",
      proto: "https",
      location: "/wood-picket-fencing/?ref=ad",
    },
    {
      path: "/wood-fencing/",
      host: "aztecfence.net",
      proto: "https",
      location: "/wood-picket-fencing/",
    },
  ];

  for (const item of cases) {
    const res = await request(item);
    assert.equal(res.status, 301, item.path);
    assert.equal(res.location, item.location, item.path);
  }

  const local = await request({ path: "/", host: "localhost:3000", proto: "http" });
  assert.notEqual(local.status, 301);
  assert.equal(local.location, null);

  const api = await request({ path: "/api/contact", host: "www.aztecfence.net", proto: "http" });
  assert.notEqual(api.status, 301);

  const thankYou = await request({ path: "/thank-you/", host: "aztecfence.net", proto: "https" });
  assert.notEqual(thankYou.status, 301);
});

test("public files keep the ads tag, drop the fake rating, and omit the thank-you URL", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /gtag\('config', 'AW-11484223030'\)/);
  assert.match(html, /src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=AW-11484223030"/);
  assert.equal(/aggregateRating/i.test(html), false);
  assert.equal(/"@type":\s*"Review"/.test(html), false);
  assert.match(html, /"opens": "07:00"/);
  assert.match(html, /"closes": "11:00"/);
  for (const place of ["Lake County", "Kenilworth", "Evanston", "Kenosha", "Delavan"]) {
    assert.match(html, new RegExp(place));
  }

  const sitemap = fs.readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.equal(sitemap.toLowerCase().includes("thank-you"), false);
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  const expected = PAGES
    .filter((page) => page.path !== "/thank-you/")
    .map((page) => (page.path === "/" ? "https://aztecfence.net/" : `https://aztecfence.net${page.path}`))
    .sort();
  assert.deepEqual(locs, expected);

  const robots = fs.readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8");
  assert.equal(robots.includes("Disallow"), false);
  assert.match(robots, /User-agent: AdsBot-Google\nAllow: \//);
  assert.match(robots, /User-agent: AdsBot-Google-Mobile\nAllow: \//);
});
