///<reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/spacex-project/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.mts",
  },
});
