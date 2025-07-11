import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// ES module equivalent of __dirname
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: "8080",
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "lib",
        replacement: resolve(__dirname, "lib"),
      },
    ],
  },
  build: {
    target: "esnext",
    minify: "terser",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "ui-vendor": ["lucide-react", "react-icons"],
          "pdf-vendor": ["html2canvas", "jspdf"],
          "radix-vendor": [
            "@radix-ui/react-slot",
            "@radix-ui/react-label",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          // Template chunks - each template gets its own chunk
          "template-1": ["./src/components/templates/Template1"],
          "template-2": ["./src/components/templates/Template2"],
          "template-3": ["./src/components/templates/Template3"],
          "template-4": ["./src/components/templates/Template4"],
          "template-5": ["./src/components/templates/Template5"],
          "template-6": ["./src/components/templates/Template6"],
          "template-7": ["./src/components/templates/Template7"],
          "template-8": ["./src/components/templates/Template8"],
          "template-9": ["./src/components/templates/Template9"],
          // Receipt templates
          "receipt-templates": [
            "./src/components/templates/Receipt1",
            "./src/components/templates/Receipt2",
            "./src/components/templates/Receipt3",
            "./src/components/templates/Receipt4",
          ],
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split("/")
                .pop()
                .replace(/\.[^.]*$/, "")
            : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
