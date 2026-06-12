import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  // *.module.css are handled by esbuild's local-css loader; a single index.css is emitted.
  loader: { ".module.css": "local-css" },
});
