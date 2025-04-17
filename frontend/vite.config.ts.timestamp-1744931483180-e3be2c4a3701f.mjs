// vite.config.ts
import { defineConfig } from "file:///workspaces/luxuryverse/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///workspaces/luxuryverse/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///workspaces/luxuryverse/frontend/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
import path from "path";
import { nodePolyfills } from "file:///workspaces/luxuryverse/frontend/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { visualizer } from "file:///workspaces/luxuryverse/frontend/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "/workspaces/luxuryverse/frontend";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts"
    }),
    nodePolyfills({
      globals: { Buffer: true, global: true }
    })
  ],
  resolve: {
    alias: { "@": path.resolve(__vite_injected_original_dirname, "src") }
  },
  optimizeDeps: {
    esbuildOptions: { define: { global: "globalThis" } }
  },
  build: {
    sourcemap: false,
    // Disable sourcemaps for faster builds
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "dist/stats.html",
          // Output file for visualization
          open: true
          // Auto-open in browser after build
        })
      ],
      output: {
        manualChunks: {
          wagmi: ["@wagmi/connectors", "viem"],
          ox: ["ox"]
          // Verify this package name
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy9sdXh1cnl2ZXJzZS9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvbHV4dXJ5dmVyc2UvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3dvcmtzcGFjZXMvbHV4dXJ5dmVyc2UvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOyAvLyBVc2VzIGVzYnVpbGRcbmltcG9ydCB7IFRhblN0YWNrUm91dGVyVml0ZSB9IGZyb20gXCJAdGFuc3RhY2svcm91dGVyLXZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgVGFuU3RhY2tSb3V0ZXJWaXRlKHtcbiAgICAgIHJvdXRlc0RpcmVjdG9yeTogXCIuL3NyYy9yb3V0ZXNcIixcbiAgICAgIGdlbmVyYXRlZFJvdXRlVHJlZTogXCIuL3NyYy9yb3V0ZVRyZWUuZ2VuLnRzXCIsXG4gICAgfSksXG4gICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICBnbG9iYWxzOiB7IEJ1ZmZlcjogdHJ1ZSwgZ2xvYmFsOiB0cnVlIH0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogeyBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIikgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXNidWlsZE9wdGlvbnM6IHsgZGVmaW5lOiB7IGdsb2JhbDogXCJnbG9iYWxUaGlzXCIgfSB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogZmFsc2UsIC8vIERpc2FibGUgc291cmNlbWFwcyBmb3IgZmFzdGVyIGJ1aWxkc1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgICAgZmlsZW5hbWU6IFwiZGlzdC9zdGF0cy5odG1sXCIsIC8vIE91dHB1dCBmaWxlIGZvciB2aXN1YWxpemF0aW9uXG4gICAgICAgICAgb3BlbjogdHJ1ZSwgLy8gQXV0by1vcGVuIGluIGJyb3dzZXIgYWZ0ZXIgYnVpbGRcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHdhZ21pOiBbXCJAd2FnbWkvY29ubmVjdG9yc1wiLCBcInZpZW1cIl0sXG4gICAgICAgICAgb3g6IFtcIm94XCJdLCAvLyBWZXJpZnkgdGhpcyBwYWNrYWdlIG5hbWVcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1IsU0FBUyxvQkFBb0I7QUFDL1MsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLGtCQUFrQjtBQUwzQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixtQkFBbUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixvQkFBb0I7QUFBQSxJQUN0QixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsTUFDWixTQUFTLEVBQUUsUUFBUSxNQUFNLFFBQVEsS0FBSztBQUFBLElBQ3hDLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPLEVBQUUsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSyxFQUFFO0FBQUEsRUFDL0M7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxRQUFRLGFBQWEsRUFBRTtBQUFBLEVBQ3JEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUE7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQLFdBQVc7QUFBQSxVQUNULFVBQVU7QUFBQTtBQUFBLFVBQ1YsTUFBTTtBQUFBO0FBQUEsUUFDUixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osT0FBTyxDQUFDLHFCQUFxQixNQUFNO0FBQUEsVUFDbkMsSUFBSSxDQUFDLElBQUk7QUFBQTtBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
