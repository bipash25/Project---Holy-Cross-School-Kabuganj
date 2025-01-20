import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";
import { splitVendorChunkPlugin } from "vite";
import compression from "vite-plugin-compression";

const conditionalPlugins = [];
if (process.env.TEMPO) {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    port: 3000,
    host: true,
    headers: {
      "Cache-Control": "public, max-age=31536000",
      Expires: new Date(Date.now() + 31536000000).toUTCString(),
    },
  },
  plugins: [
    react({
      plugins: [...conditionalPlugins],
    }),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: "webp",
        quality: "80",
        as: "picture",
      }),
    }),
    splitVendorChunkPlugin(),
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      filter: /\.(js|css|html|svg)$/,
      deleteOriginFile: false,
    }),
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
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: Object.keys(require("./package.json").dependencies).filter(
            (pkg) => pkg.includes("@radix-ui"),
          ),
          utils: ["clsx", "tailwind-merge", "date-fns"],
          icons: ["lucide-react"],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
      },
      mangle: true,
    },
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["tempo-devtools"],
  },
});
