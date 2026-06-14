import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Library build for the published @viu/ui package. Uses Vite (same engine as
// Storybook) so CSS Modules are wired correctly: hashed class names in the JS AND
// the emitted CSS match. (tsup/esbuild's local-css left the JS maps empty → the
// package shipped unstyled for external consumers; Vite fixes that.)
// Types are emitted separately by `tsc -p tsconfig.build.json`.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: (asset) =>
          asset.name && asset.name.endsWith(".css") ? "index.css" : "assets/[name][extname]",
      },
    },
  },
});
