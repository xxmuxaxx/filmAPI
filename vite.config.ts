import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      core: src("core"),
      modules: src("modules"),
      config: src("config.ts"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
  },
});
