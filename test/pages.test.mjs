import assert from "node:assert/strict";
import express from "express";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { PAGES } from "../shared/routes.mjs";
import { RESTORED_LAKE_COUNTY, SERVICE_AREAS, areaServedLd } from "../shared/service-areas.mjs";
import { installPages } from "../server/pages.mjs";
import { installRedirects } from "../server/redirects.mjs";

const shell = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const distDir = fs.mkdtempSync(path.join(os.tmpdir(), "aztec-pages-"));
fs.writeFileSync(path.join(distDir, "sitemap.xml"), "<urlset>https://aztecfence.net/</urlset>");
fs.writeFileSync(path.join(distDir, "robots.txt"), "User-agent: *\nAllow: /\n");
fs.mkdirSync(path.join(distDir, "images"));
fs.writeFileSync(path.join(distDir, "images", "logo.png"), "PNG");

const app = express();
installRedirects(app);
app.post("/api/contact", (_req, res) => {
  res.json({ success: true });
});
installPages(app, { distDir, html: shell });

function request({ method = "GET", path: urlPath, host = "aztecfence.net", proto = "https" }) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: urlPath,
          method,
          headers: { host, "x-forwarded-proto": proto },
        },
        (res) => {
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            server.close();
            resolve({
              status: res.statusCode,
              location: res.headers.location || null,
              type: res.headers["content-type"] || "",
              body: Buffer.concat(chunks).toString("utf8"),
            });
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

const OLD_LAKE_COUNTY = [
  "Antioch", "Bannockburn", "Barrington", "Beach Park", "Buffalo Grove", "Deerfield",
  "Fox Lake", "Grayslake", "Green Oaks", "Gurnee", "Hainesville", "Highland Park",
  "Highwood", "Indian Creek", "Island Lake", "Kildeer", "Lake Barrington", "Lake Bluff",
  "Lake Forest", "Lake Villa", "Lake Zurich", "Libertyville", "Lincolnshire", "Lindenhurst",
  "Long Grove", "Mettawa", "Mundelein", "North Barrington", "Old Mill Creek", "Park City",
  "Port Barrington", "Riverwoods", "Round Lake", "Round Lake Beach", "Round Lake Heights",
  "Round Lake Park", "Tower Lakes", "Vernon Hills", "Volo", "Wadsworth", "Wauconda",
  "Waukegan", "Wilmette", "Winthrop Harbor", "Zion",
];

test("the app route table and the server use the same paths", () => {
  const src = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const used = [...src.matchAll(/routePath\("([^"]+)"\)/g)].map((match) => match[1]);
  assert.deepEqual(used.slice().sort(), PAGES.map((page) => page.path).slice().sort());
  assert.equal(/path="\//.test(src), false);
  assert.match(src, /path="\*"/);
});

test("unknown routes are HTTP 404 pages, and real routes stay 200", async () => {
  const missing = await request({ path: "/not-a-page" });
  assert.equal(missing.status, 404);
  assert.match(missing.type, /html/);
  assert.match(missing.body, /<h1>Page not found<\/h1>/);
  assert.match(missing.body, /noindex, nofollow/);
  assert.match(missing.body, /gtag\('config', 'AW-11484223030'\)/);
  assert.match(missing.body, /href="\/contact\/"/);
  assert.match(missing.body, /href="\/wood-picket-fencing\/"/);
  assert.match(missing.body, /href="\/aluminum-fences\/"/);
  assert.equal(missing.body.includes('rel="canonical"'), false);
  assert.doesNotMatch(missing.body, /canonical" href="https:\/\/aztecfence\.net\/"/);
  assert.match(missing.body, /property="og:url" content="https:\/\/aztecfence\.net\/not-a-page\/"/);

  const missingSlash = await request({ path: "/not-a-page/" });
  assert.equal(missingSlash.status, 404);

  for (const page of PAGES) {
    const slashless = page.path === "/" ? "/" : page.path.replace(/\/$/, "");
    for (const urlPath of page.path === "/" ? ["/"] : [page.path, slashless]) {
      const res = await request({ path: urlPath });
      const canonical = page.path === "/" ? "https://aztecfence.net/" : `https://aztecfence.net${page.path}`;
      assert.equal(res.status, 200, urlPath);
      assert.match(res.body, new RegExp(`rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
      assert.match(res.body, /gtag\('config', 'AW-11484223030'\)/);
    }
  }

  const thankYou = await request({ path: "/thank-you/" });
  assert.equal(thankYou.status, 200);
  assert.match(thankYou.body, /noindex, nofollow/);
  assert.match(thankYou.body, /rel="canonical" href="https:\/\/aztecfence\.net\/thank-you\/"/);
});

test("new aliases 301 and static files, sitemap, robots, and the API stay up", async () => {
  const cases = [
    ["/gallery", "/photo-gallery/"],
    ["/gallery/", "/photo-gallery/"],
    ["/gallery?utm=1", "/photo-gallery/?utm=1"],
    ["/about", "/about-us/"],
    ["/about/", "/about-us/"],
    ["/get-a-quote", "/contact/"],
    ["/get-a-quote/", "/contact/"],
    ["/free-quote", "/contact/"],
    ["/free-quote/?gclid=1", "/contact/?gclid=1"],
    ["/wood-fencing", "/wood-picket-fencing/"],
    ["/wood-fencing/", "/wood-picket-fencing/"],
    ["/wood-fencing?ref=ad", "/wood-picket-fencing/?ref=ad"],
  ];
  for (const [urlPath, location] of cases) {
    const res = await request({ path: urlPath });
    assert.equal(res.status, 301, urlPath);
    assert.equal(res.location, location, urlPath);
  }

  const wood = await request({ path: "/wood-picket-fencing/" });
  assert.equal(wood.status, 200);
  assert.match(wood.body, /Wood Picket Fence Installation/);

  const sitemap = await request({ path: "/sitemap.xml" });
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.body, /urlset/);

  const robots = await request({ path: "/robots.txt" });
  assert.equal(robots.status, 200);
  assert.match(robots.body, /User-agent/);

  const asset = await request({ path: "/images/logo.png" });
  assert.equal(asset.status, 200);
  assert.equal(asset.body, "PNG");

  const apiGet = await request({ path: "/api/contact" });
  assert.equal(apiGet.status, 404);
  assert.equal(apiGet.body.includes("Page not found"), false);
  assert.equal(apiGet.body.includes("gtag("), false);

  const apiPost = await request({ method: "POST", path: "/api/contact" });
  assert.equal(apiPost.status, 200);
  assert.match(apiPost.body, /"success":true/);
});

test("Illinois regains every old Lake County town without duplicates", () => {
  const current = [
    "Lake County", "Round Lake", "Grayslake", "McHenry", "Huntley", "Woodstock",
    "Highland Park", "Wilmette", "Kenilworth", "Winnetka", "Evanston",
  ];
  const expectedAdded = OLD_LAKE_COUNTY.filter((name) => !current.includes(name));
  assert.deepEqual([...RESTORED_LAKE_COUNTY], expectedAdded);
  assert.ok(RESTORED_LAKE_COUNTY.includes("Antioch"));
  assert.ok(RESTORED_LAKE_COUNTY.includes("Gurnee"));

  const illinois = SERVICE_AREAS[0].places;
  assert.deepEqual(illinois.slice(0, current.length), current);
  assert.equal(new Set(illinois.map((name) => name.toLowerCase())).size, illinois.length);
  for (const name of expectedAdded) {
    assert.equal(illinois.filter((place) => place === name).length, 1, name);
  }
  assert.deepEqual(SERVICE_AREAS[1].places, ["Kenosha", "Pleasant Prairie", "Lake Geneva", "Delavan"]);

  const data = JSON.parse(shell.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(data["@graph"][0].areaServed, areaServedLd());
  assert.equal(data["@graph"][0].openingHoursSpecification[0].opens, "07:00");
  assert.equal(data["@graph"][0].openingHoursSpecification[0].closes, "17:00");
  assert.equal(data["@graph"][0].openingHoursSpecification[1].opens, "07:00");
  assert.equal(data["@graph"][0].openingHoursSpecification[1].closes, "11:00");
  assert.match(shell, /gtag\('config', 'AW-11484223030'\)/);
});
