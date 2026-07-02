#!/usr/bin/env node
/**
 * Gate de paridad `tokens/*.json` ↔ `dist/*` (mitad JSON→CSS del pipeline de tokens).
 *
 * Rebuildea los tokens y falla si el `dist/` commiteado quedó desincronizado de los
 * JSON fuente. Garantiza que el CSS/JSON generado SIEMPRE refleje `tokens/*.json`:
 * cero ediciones manuales al CSS, cero `dist/` viejo por olvidar rebuildear.
 *
 * NO verifica Figma↔JSON (eso lo hace `sync-tokens.mjs`, que necesita acceso a Figma).
 * Este gate cubre la parte que corre sin red/credenciales, en cualquier plan.
 */
import { execSync } from "node:child_process";

execSync("node scripts/build-tokens.mjs", { stdio: "inherit" });

const drift = execSync("git status --porcelain -- dist/", { encoding: "utf8" }).trim();
if (drift) {
  console.error("\n❌ dist/ está desincronizado de tokens/*.json.");
  console.error("   Corré `npm run build:tokens` y commiteá el dist/ regenerado.\n");
  console.error(drift);
  process.exit(1);
}
console.log("✓ Paridad tokens/*.json ↔ dist/ OK.");
