import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// In this monorepo the tokens package is the repo root, so we alias its `/css`
// entry to the built tokens CSS. In a STANDALONE app you don't need this alias:
// `npm i @viu/design-tokens` and import "@viu/design-tokens/css" directly.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@viu/design-tokens/css": fileURLToPath(new URL("../../dist/tokens.css", import.meta.url)),
    },
  },
});
