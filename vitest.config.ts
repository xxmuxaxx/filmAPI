import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      environmentOptions: { jsdom: { url: "http://localhost:8082" } },
      setupFiles: ["./src/test/setup.ts"],
      restoreMocks: true,
    },
  })
);
