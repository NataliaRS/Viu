import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev playground for visually checking components against the tokens.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
  // Keep the demo build separate from the library build (dist/, produced by tsup).
  build: { outDir: "demo-dist" },
});
