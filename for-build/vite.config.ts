import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: "webp",
        quality: "80",
        as: "picture",
      }),
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*.{webp,png,jpg,jpeg}"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui"],
          vendor: [],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true, // Enable sourcemaps for debugging
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true,
      },
    },
  },
  assetsInclude: ["**/*.webp"],
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-slot",
    ],
    exclude: [],
  },
});
