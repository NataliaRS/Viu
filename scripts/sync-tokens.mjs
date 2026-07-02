#!/usr/bin/env node
/**
 * Auditor de paridad Figma ↔ repo (mitad Figma→JSON del pipeline de tokens).
 *
 * Compara el SNAPSHOT de las variables de Figma (`scripts/figma-tokens.snapshot.json`,
 * leído vía MCP `getLocalVariablesAsync`) contra los `tokens/*.json` del repo, por
 * token y por modo. Reporta:
 *   - FALTA_EN_REPO   → está en Figma y NO en tokens/*.json (hay que agregarlo)
 *   - SOBRA_EN_REPO   → está en el repo y NO en Figma (hay que quitarlo)
 *   - CAMBIÓ          → el valor/alias difiere entre Figma y el repo
 *
 * Sale con código 1 si hay cualquier divergencia (sirve como gate).
 *
 * Cómo refrescar el snapshot (no es CI-automático en plan Pro; lo corre un agente):
 *   1. Vía MCP de Figma (use_figma) sobre el archivo Tokens `o4tzMPcZIWMzVc67dW6dWW`,
 *      ejecutar getLocalVariablesAsync, resolver aliases/colores y volcar el JSON con
 *      la misma forma que este snapshot.
 *   2. Sobrescribir `scripts/figma-tokens.snapshot.json`.
 *   3. `npm run sync:tokens` para ver el diff; ajustar tokens/*.json; `npm run build:tokens`.
 *   4. `npm run check:tokens` valida JSON↔CSS. Los dos gates juntos = paridad Figma↔CSS.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const snap = JSON.parse(readFileSync(join(ROOT, "scripts/figma-tokens.snapshot.json"), "utf8"));

const FILES = {
  Primitives: "tokens/primitives.json",
  Semantic: "tokens/semantic.json",
  Scales: "tokens/scales.json",
  "Type Scale": "tokens/type-scale.json",
  Grid: "tokens/grid.json",
};

const round = (n) => Math.round(n * 1e6) / 1e6;
// El repo guarda dimensiones con unidad ("48px", "-0.02em") y Figma sin unidad (48).
// Un string que sea solo número (+ px/em/rem) se compara como número; el resto, como string.
const norm = (v) => {
  if (typeof v === "number") return round(v);
  if (typeof v === "string") {
    const s = v.trim();
    const m = /^(-?\d*\.?\d+)(px|em|rem|ms)?$/.exec(s);
    if (m) return round(parseFloat(m[1]));
    return s.toLowerCase();
  }
  return v;
};

/** Aplana un tokens/*.json a { "path/con/slash": { mode: value } }. */
function flatten(obj, modeSet, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const keys = Object.keys(v);
      if ("$value" in v) {
        out[prefix + k] = { Value: v.$value };
      } else if (keys.length && keys.every((kk) => modeSet.has(kk))) {
        out[prefix + k] = v;
      } else {
        flatten(v, modeSet, prefix + k + "/", out);
      }
    }
  }
  return out;
}

let drift = 0;
for (const [collection, file] of Object.entries(FILES)) {
  const fig = snap[collection];
  if (!fig) { console.error(`✖ snapshot sin colección "${collection}"`); drift++; continue; }
  const modeSet = new Set(fig.modes);
  const repo = flatten(JSON.parse(readFileSync(join(ROOT, file), "utf8")), modeSet);

  const figNames = new Set(Object.keys(fig.tokens));
  const repoNames = new Set(Object.keys(repo));
  const problems = [];

  for (const name of figNames) {
    if (!repoNames.has(name)) { problems.push(`  FALTA_EN_REPO   ${name} = ${JSON.stringify(fig.tokens[name])}`); continue; }
    for (const mode of fig.modes) {
      const a = norm(fig.tokens[name][mode]);
      const b = norm(repo[name][mode]);
      if (a !== b) problems.push(`  CAMBIÓ          ${name} [${mode}]  figma=${a}  repo=${b}`);
    }
  }
  for (const name of repoNames) if (!figNames.has(name)) problems.push(`  SOBRA_EN_REPO   ${name}`);

  if (problems.length) {
    console.error(`\n▼ ${collection} (${file}) — ${problems.length} divergencia(s):`);
    console.error(problems.sort().join("\n"));
    drift += problems.length;
  } else {
    console.log(`✓ ${collection}: ${figNames.size} tokens en paridad.`);
  }
}

if (drift) {
  console.error(`\n❌ ${drift} divergencia(s) Figma↔repo. Alineá tokens/*.json con el snapshot y rebuildeá.`);
  process.exit(1);
}
console.log("\n✓ Paridad Figma↔repo total (todos los tokens).");
