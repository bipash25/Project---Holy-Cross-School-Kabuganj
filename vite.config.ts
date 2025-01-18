import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";
import { splitVendorChunkPlugin } from "vite";

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/ws": {
        target: "wss://exciting-germain1-xclt8.dev.tempolabs.ai",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
    imagetools(),
    splitVendorChunkPlugin(),
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
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-tabs"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
