import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const src = (path: string) =>
  fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: src("app"),
      pages: src("pages"),
      widgets: src("widgets"),
      features: src("features"),
      entities: src("entities"),
      shared: src("shared"),
      core: src("core"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
  },
});
