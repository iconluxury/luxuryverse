import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Uses esbuild
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    nodePolyfills({
      globals: { Buffer: true, global: true },
    }),
    visualizer(), // Bundle analysis
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  optimizeDeps: {
    esbuildOptions: { define: { global: "globalThis" } },
  },
  build: {
    sourcemap: false, // Disable sourcemaps for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          wagmi: ["@wagmi/connectors", "viem"],
          ox: ["ox"], // Verify this package name
        },
      },
    },
  },
});