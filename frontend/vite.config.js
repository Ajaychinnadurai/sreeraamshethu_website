import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
      "/media": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2020",
    // CSS code splitting — each chunk gets its own CSS file for better caching
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        // Manual chunks — separates heavy vendor libraries for better cache efficiency
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("react-router")) return "router";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("axios")) return "axios";
            if (id.includes("react") || id.includes("scheduler")) return "react";
          }
        },
      },
    },
  },
});