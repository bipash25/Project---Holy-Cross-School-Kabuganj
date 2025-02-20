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
      registerType: 'autoUpdate',
      includeAssets: ['**/*.{webp,png,jpg,jpeg}'],
      manifest: {
        name: 'Holy Cross School Kabuganj',
        short_name: 'HCSK',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/assets/images/logo-B-xAu0RA.webp',
            sizes: '192x192',
            type: 'image/webp'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp}']
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    }
  },
  assetsInclude: ["**/*.webp"],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-slot'
    ]
  }
});
