import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: "http://localhost:3000/",
  },
  resolve: {
    alias: [{ find: "src", replacement: resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/tests/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
        "**/vite-env.d.ts",
        "src/main.tsx",
        "src/App.tsx",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "src/tests/test-utils.tsx",
        "src/tests/setup.ts",
        "src/tests/mocks/**",
      ],
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
