import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Server output is built by Nitro. On Vercel (VERCEL=1) Nitro selects the
// "vercel" preset automatically and writes .vercel/output; locally it builds a
// Node server in .output/ that `npm run preview` / `npm start` can run.
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Use src/server.ts (SSR error wrapper) as the server entry.
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    nitro({
      routeRules: {
        "/**": {
          headers: {
            "x-content-type-options": "nosniff",
            "referrer-policy": "strict-origin-when-cross-origin",
            "x-frame-options": "SAMEORIGIN",
            "permissions-policy": "camera=(), microphone=(), geolocation=()",
            "strict-transport-security": "max-age=63072000; includeSubDomains",
          },
        },
        "/admin/**": {
          headers: { "x-robots-tag": "noindex, nofollow", "cache-control": "no-store" },
        },
        "/auth": { headers: { "x-robots-tag": "noindex, nofollow", "cache-control": "no-store" } },
      },
    }),
    viteReact(),
  ],
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { port: 8080 },
});
