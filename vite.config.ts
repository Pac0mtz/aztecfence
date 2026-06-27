import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  server: {
    host: true, // bind 0.0.0.0 so Replit's proxy can reach the dev server
    port: Number(process.env.PORT) || 3000,
    allowedHosts: true, // accept Replit's *.replit.dev / *.repl.co proxy hostnames
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 3000,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
