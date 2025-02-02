import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";
import { splitVendorChunkPlugin } from "vite";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    react({
      plugins: process.env.TEMPO ? [["tempo-devtools/swc", {}]] : [],
    }),
    imagetools(),
    splitVendorChunkPlugin(),
    tempo(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Holy Cross School Kabuganj",
        short_name: "HCSK",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
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
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-tabs"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: true,
  },
});
