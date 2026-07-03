#!/usr/bin/env node
/**
 * verify-parity.mjs — VIU DS skill
 * Valida el manifest `components.json` (Fase 2) contra el filesystem:
 *   1. Cada entry → su `code.path` existe y tiene story.
 *   2. Cada carpeta-componente de ui/src → tiene entry en el manifest (nada fantasma).
 *   3. `status` de cada entry ∈ escala única y coincide con el `status:` de su story.
 *   4. `figma.nodeId` presente y con forma válida (N:N). La existencia del nodo en Figma
 *      se valida vía MCP (rutina en figma-build), no acá: el CI no ve Figma.
 * Si components.json NO existe todavía → SKIP con exit 0 (el gate se activa solo al
 * nacer el manifest; así puede vivir en CI desde el día uno).
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

let ROOT = dirname(fileURLToPath(import.meta.url));
while (!existsSync(join(ROOT, "package.json"))) ROOT = dirname(ROOT);

const manifestPath = join(ROOT, "components.json");
if (!existsSync(manifestPath)) {
  console.log("⤳ verify-parity: SKIP — components.json no existe todavía (Fase 2 del plan). Exit 0.");
  process.exit(0);
}

const STATUSES = new Set(["Draft", "Reviewed", "Stable", "Deprecated"]);
const EXCLUDE = new Set(["foundations", "dev", "test", "overlay"]);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const entries = Array.isArray(manifest) ? manifest : manifest.components;
const errors = [];

const covered = new Set();
for (const e of entries) {
  const id = e.name ?? "(sin nombre)";
  if (e.code === null) {
    // entry Figma-only (receta): válida solo si lo declara explícitamente
    if (!e.codeNote) errors.push(`${id}: code=null sin codeNote que explique la receta`);
    if (!/^\d+:\d+$/.test(e.figma?.nodeId ?? "")) errors.push(`${id}: figma.nodeId ausente o inválido`);
    continue;
  }
  if (!e.code?.path) { errors.push(`${id}: sin code.path`); continue; }
  const p = join(ROOT, e.code.path);
  covered.add(e.code.path.split("/").pop());
  if (!existsSync(p)) { errors.push(`${id}: code.path ${e.code.path} no existe`); continue; }
  const files = readdirSync(p);
  const story = files.find((f) => f.endsWith(".stories.tsx"));
  if (!story) errors.push(`${id}: ${e.code.path} sin *.stories.tsx`);
  if (!STATUSES.has(e.status)) errors.push(`${id}: status "${e.status}" fuera de la escala única`);
  else if (story) {
    const m = readFileSync(join(p, story), "utf8").match(/status:\s*"(Draft|Reviewed|Stable|Deprecated)"/);
    if (m && m[1] !== e.status) errors.push(`${id}: manifest dice ${e.status}, la story dice ${m[1]}`);
  }
  if (!/^\d+:\d+$/.test(e.figma?.nodeId ?? "")) errors.push(`${id}: figma.nodeId ausente o inválido`);
}

const uiSrc = join(ROOT, "ui/src");
for (const d of readdirSync(uiSrc)) {
  if (EXCLUDE.has(d) || !statSync(join(uiSrc, d)).isDirectory()) continue;
  const hasStory = readdirSync(join(uiSrc, d)).some((f) => f.endsWith(".stories.tsx"));
  if (hasStory && !covered.has(d)) errors.push(`ui/src/${d}: componente con story SIN entry en components.json`);
}

if (errors.length) {
  console.error(`✗ verify-parity: ${errors.length} problema(s)\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ verify-parity: ${entries.length} entries del manifest ↔ filesystem, sin fantasmas`);
