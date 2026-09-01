import express from "express";
import nodemailer from "nodemailer";

const app = express();

app.use((req, res, next) => {
  const host = (req.headers.host || "").split(":")[0];
  // Keep /api on www so quote POSTs are not turned into GETs by a 301.
  if (host === "www.aztecfence.net" && !req.path.startsWith("/api/")) {
    return res.redirect(301, `https://aztecfence.net${req.originalUrl}`);
  }
  next();
});

app.use(express.json({ limit: "50kb" }));

// --- basic in-memory rate limiting: max 5 submissions per IP per 15 min ---
const hits = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || [];
  const recent = entry.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function makeTransport() {
  const pass = process.env.TITAN_SMTP_PASS;
  if (!pass) return null;
  return nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: { user: "sales@aztecfence.net", pass },
  });
}

const SERVICE_LABELS = {
  wood: "Wood Fences",
  privacy: "Privacy Fences",
  "chain-link": "Chain Link Fences",
  vinyl: "Vinyl Fences",
  aluminum: "Aluminum Fences",
  commercial: "Commercial Fences",
  residential: "Residential Fences",
  gates: "Custom Gates",
};

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, service, message, botcheck, ads } = req.body || {};

    // Honeypot: silently accept so bots think they succeeded
    if (botcheck) return res.json({ success: true });

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "Name, email, and phone are required." });
    }
    if (typeof name !== "string" || name.length > 200 ||
        typeof email !== "string" || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        typeof phone !== "string" || phone.length > 50 ||
        (message && (typeof message !== "string" || message.length > 5000))) {
      return res.status(400).json({ success: false, message: "Invalid form data." });
    }

    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
    if (rateLimited(ip)) {
      return res.status(429).json({ success: false, message: "Too many requests. Please try again later or call us at (847) 740-4655." });
    }

    console.log(`contact_submit host=${req.headers.host} ip=${ip} name=${String(name).slice(0, 80)} email=${email}`);

    const transport = makeTransport();
    if (!transport) {
      console.error("TITAN_SMTP_PASS is not set — cannot send contact email.");
      return res.status(500).json({ success: false, message: "Contact form is not configured. Please call us at (847) 740-4655." });
    }

    const serviceLabel = SERVICE_LABELS[service] || service || "Not specified";
    const adsLines = ads && typeof ads === "object"
      ? [
          "",
          "Ad attribution:",
          ads.gclid ? `GCLID: ${String(ads.gclid).slice(0, 200)}` : null,
          ads.gbraid ? `GBRAID: ${String(ads.gbraid).slice(0, 200)}` : null,
          ads.wbraid ? `WBRAID: ${String(ads.wbraid).slice(0, 200)}` : null,
          ads.utm_source ? `utm_source: ${String(ads.utm_source).slice(0, 200)}` : null,
          ads.utm_medium ? `utm_medium: ${String(ads.utm_medium).slice(0, 200)}` : null,
          ads.utm_campaign ? `utm_campaign: ${String(ads.utm_campaign).slice(0, 200)}` : null,
          ads.utm_term ? `utm_term: ${String(ads.utm_term).slice(0, 200)}` : null,
          ads.utm_content ? `utm_content: ${String(ads.utm_content).slice(0, 200)}` : null,
          ads.landing ? `Landing page: ${String(ads.landing).slice(0, 200)}` : null,
        ].filter(Boolean)
      : [];

    await transport.sendMail({
      from: '"Aztec Fence Website" <sales@aztecfence.net>',
      to: "sales@aztecfence.net",
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New Fence Quote Request from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service: ${serviceLabel}`,
        "",
        "Message:",
        message || "No message provided",
        ...adsLines,
      ].join("\n"),
    });

    console.log(`contact_sent email=${email}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, message: "Failed to send your request. Please call us at (847) 740-4655." });
  }
});

export default app;
