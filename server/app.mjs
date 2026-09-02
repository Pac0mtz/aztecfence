import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import sharp from "sharp";

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
  wood: "Wood / privacy wood",
  privacy: "Privacy fence",
  "chain-link": "Chain link",
  vinyl: "Vinyl",
  aluminum: "Aluminum",
  commercial: "Commercial / industrial",
  residential: "Residential — not sure yet",
  gates: "Gates",
};

const uploadPhotos = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 5 },
  fileFilter: (_req, file, cb) => {
    if (String(file.mimetype || "").startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

function maybeUploadPhotos(req, res, next) {
  const ct = req.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) return next();
  return uploadPhotos.array("photos", 5)(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ success: false, message: "Each photo must be 8 MB or smaller." });
      }
      return res.status(400).json({ success: false, message: "Too many files or invalid upload." });
    }
    return res.status(400).json({ success: false, message: err.message || "Invalid upload." });
  });
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeFilename(name) {
  if (!name || typeof name !== "string") return "photo.jpg";
  return name.replace(/[/\\]/g, "_").replace(/[^\w.\-()+ ]/g, "_").slice(0, 180) || "photo.jpg";
}

function parseAds(raw) {
  if (!raw) return null;
  if (typeof raw === "object") return raw;
  try {
    const parsed = JSON.parse(String(raw));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function row(label, valueHtml) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;width:140px;vertical-align:top;font-size:13px;color:#64748b;font-weight:500;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;vertical-align:top;font-size:15px;color:#0f172a;font-weight:600;">${valueHtml}</td>
  </tr>`;
}

function buildQuoteHtml({ name, email, phone, address, serviceLabel, length, message, ads, photoCids }) {
  const photoCount = photoCids.length;
  const n = escapeHtml(name);
  const tel = String(phone).replace(/\D/g, "");
  const photoHtml = photoCount
    ? `<tr><td colspan="2" style="padding:22px 0 0;">
        <p style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#0891b2;font-weight:700;">Job photos</p>
        ${photoCids.map((cid, i) =>
          `<img src="cid:${cid}" alt="Quote photo ${i + 1}" width="520" style="max-width:520px;width:100%;height:auto;display:block;border-radius:10px;margin:0 0 12px;border:1px solid #e2e8f0;" />`,
        ).join("")}
      </td></tr>`
    : "";
  const adsBits = [];
  if (ads?.landing) adsBits.push(`Landing: ${escapeHtml(ads.landing)}`);
  if (ads?.utm_campaign) adsBits.push(`Campaign: ${escapeHtml(ads.utm_campaign)}`);
  if (ads?.gclid) adsBits.push("Google Ads click");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#e8eef5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#e8eef5;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 8px 30px rgba(15,23,42,0.12);">
  <tr><td style="background:#0f172a;padding:28px 24px;text-align:center;">
    <img src="https://aztecfence.net/images/AZTEC-Fence-logo-round.png" alt="Aztec Fence" width="72" height="72" style="border-radius:50%;margin-bottom:12px;" />
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;">New fence quote</h1>
    <p style="margin:8px 0 0;color:#67e8f9;font-size:14px;">aztecfence.net · reply to the customer below</p>
  </td></tr>
  <tr><td style="padding:28px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", n)}
      ${row("Phone", `<a href="tel:${tel}" style="color:#0891b2;text-decoration:none;">${escapeHtml(phone)}</a>`)}
      ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0891b2;text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${row("Address", escapeHtml(address || "—"))}
      ${row("Fence type", `<span style="display:inline-block;background:#ecfeff;color:#0e7490;padding:4px 12px;border-radius:999px;font-size:13px;">${escapeHtml(serviceLabel)}</span>`)}
      ${length ? row("Approx. length", escapeHtml(length)) : ""}
      ${photoCount ? row("Photos", `${photoCount} attached`) : row("Photos", "None")}
      ${message ? `<tr><td colspan="2" style="padding:18px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#0891b2;font-weight:700;">Project details</td></tr>
      <tr><td colspan="2" style="padding:0 0 8px;"><div style="background:#f8fafc;border-left:4px solid #06b6d4;padding:14px 16px;border-radius:0 10px 10px 0;font-size:15px;color:#334155;line-height:1.55;white-space:pre-wrap;">${escapeHtml(message)}</div></td></tr>` : ""}
      ${adsBits.length ? `<tr><td colspan="2" style="padding:16px 0 0;font-size:12px;color:#94a3b8;">${adsBits.join(" · ")}</td></tr>` : ""}
      ${photoHtml}
    </table>
  </td></tr>
  <tr><td style="padding:0 24px 28px;">
    <a href="tel:${tel}" style="display:inline-block;background:#06b6d4;color:#ffffff;font-weight:700;padding:12px 22px;border-radius:999px;text-decoration:none;margin-right:8px;">Call ${escapeHtml(phone)}</a>
    <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#0f172a;color:#ffffff;font-weight:700;padding:12px 22px;border-radius:999px;text-decoration:none;">Reply by email</a>
  </td></tr>
  <tr><td style="background:#f1f5f9;padding:14px 24px;text-align:center;font-size:12px;color:#64748b;">
    Aztec Fence Company · 11 N Fairfield Rd, Round Lake, IL 60073 · (847) 740-4655
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

app.post("/api/contact", maybeUploadPhotos, async (req, res) => {
  try {
    const body = req.body || {};
    const files = Array.isArray(req.files) ? req.files : [];
    const name = body.name;
    const email = body.email;
    const phone = body.phone;
    const service = body.service;
    const message = body.message;
    const address = body.address;
    const length = body.length;
    const botcheck = body.botcheck;
    const ads = parseAds(body.ads);

    if (botcheck) return res.json({ success: true });

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ success: false, message: "Name, email, phone, and property address are required." });
    }
    if (typeof name !== "string" || name.length > 200 ||
        typeof email !== "string" || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        typeof phone !== "string" || phone.length > 50 ||
        typeof address !== "string" || address.length > 400 ||
        (message && (typeof message !== "string" || message.length > 5000)) ||
        (length && (typeof length !== "string" || length.length > 80))) {
      return res.status(400).json({ success: false, message: "Invalid form data." });
    }

    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
    if (rateLimited(ip)) {
      return res.status(429).json({ success: false, message: "Too many requests. Please call us at (847) 740-4655." });
    }

    console.log(`contact_submit host=${req.headers.host} ip=${ip} name=${String(name).slice(0, 80)} email=${email} photos=${files.length}`);

    const transport = makeTransport();
    if (!transport) {
      console.error("TITAN_SMTP_PASS is not set — cannot send contact email.");
      return res.status(500).json({ success: false, message: "Contact form is not configured. Please call us at (847) 740-4655." });
    }

    const serviceLabel = SERVICE_LABELS[service] || service || "Not specified";
    const messageId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const attachments = await Promise.all(files.map(async (file, i) => {
      const jpeg = await sharp(file.buffer, { failOn: "none" })
        .rotate()
        .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toBuffer();
      const baseName = sanitizeFilename(file.originalname).replace(/\.[^.]+$/, "") || `quote-photo-${i + 1}`;
      return {
        filename: `${baseName}.jpg`,
        content: jpeg,
        contentType: "image/jpeg",
        cid: `fencephoto-${messageId}-${i}@aztecfence.net`,
        contentDisposition: "inline",
      };
    }));
    const photoCids = attachments.map((attachment) => attachment.cid);

    const html = buildQuoteHtml({
      name, email, phone, address, serviceLabel, length, message, ads, photoCids,
    });

    const text = [
      `New fence quote from ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Address: ${address || "—"}`,
      `Fence type: ${serviceLabel}`,
      length ? `Approx. length: ${length}` : null,
      `Photos: ${files.length}`,
      "",
      message || "No extra details",
    ].filter(Boolean).join("\n");

    await transport.sendMail({
      from: '"Aztec Fence Website" <sales@aztecfence.net>',
      to: "sales@aztecfence.net",
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Fence quote: ${name}${address ? ` — ${address}` : ""}`,
      text,
      html,
      attachments,
    });

    console.log(`contact_sent email=${email} photos=${files.length}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, message: "Failed to send your request. Please call us at (847) 740-4655." });
  }
});

export default app;
