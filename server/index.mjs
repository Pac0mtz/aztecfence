// Production server: serves the built site from dist/ plus the contact API.
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import app from "./app.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "..", "dist");

app.use(express.static(dist));
app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, "index.html")));

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));
