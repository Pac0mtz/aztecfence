// Production server: serves the built site from dist/ plus the contact API.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import app from "./app.mjs";
import { installPages } from "./pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "..", "dist");
const indexHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");

installPages(app, { distDir: dist, html: indexHtml });

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));
