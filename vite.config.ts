import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from "@remix-run/dev";
import react from '@vitejs/plugin-react'
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();


export default defineConfig({
  plugins: [remix(), react(), tsconfigPaths(), sentryVitePlugin({
    org: "remix-company",
    project: "javascript-remix"
  })],
  test: {
    globals:true,
    setupFiles: ["./tests/setup-tests.ts"],
    environment: 'jsdom',
  },
  build: {
    sourcemap: true
  }
});