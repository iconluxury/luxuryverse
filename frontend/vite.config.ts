import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Switch to esbuild
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "vite-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts"
    }),
    nodePolyfills({
      globals: { Buffer: true, global: true }
    }),
    visualizer() // For bundle analysis
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") }
  },
  optimizeDeps: {
    esbuildOptions: { define: { global: "globalThis" } }
  },
  build: {
    sourcemap: false, // Disable sourcemaps for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          wagmi: ["@wagmi/connectors", "viem"],
          ox: ["ox"]
        }
      }
    }
  }
});