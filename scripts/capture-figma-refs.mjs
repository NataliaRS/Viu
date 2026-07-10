#!/usr/bin/env node
/**
 * capture-figma-refs.mjs — F5b · Referencias de Figma para revisión LADO A LADO (NO baselines)
 *
 * Renderiza cada `figmaNode` del manifest vía la Images REST API de Figma y guarda los PNG 1x
 * en visual-figma-refs/. Estas imágenes son SOLO ayuda de revisión: cuando Natalia aprueba una
 * baseline nueva, mira el screenshot de la story (DOM) al lado del render de Figma (este ref) y
 * decide si el vínculo Figma↔diseño está bien. NO se comparan por pixel-diff (ver code-build:
 * la fidelidad Figma↔web se juzga en métricas/tokens y a ojo, no por pixel-diff cross-rasterizer;
 * el POC jul-2026 midió ~15% de ruido de rasterización con paridad métrica excelente).
 *
 * El GATE mecánico es DOM-vs-DOM: baseline = screenshot de la story (capture-baselines.mjs),
 * comparado contra el screenshot futuro con el mismo rasterizer. Este script NO produce baselines.
 *
 * Uso:  FIGMA_TOKEN=<personal access token>  node scripts/capture-figma-refs.mjs [--only "Badge"]
 * Token: Figma → Settings → Security → Personal access tokens (scope: File content, read).
 *
 * Cero dependencias (fetch nativo de Node ≥18).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

let ROOT = dirname(fileURLToPath(import.meta.url));
while (!existsSync(join(ROOT, "package.json"))) ROOT = dirname(ROOT);
const REFS_DIR = join(ROOT, "visual-figma-refs");
mkdirSync(REFS_DIR, { recursive: true });

const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) {
  console.error("✗ falta FIGMA_TOKEN (Figma → Settings → Security → Personal access tokens)");
  process.exit(1);
}
// fileKey por defecto = archivo Componentes (mismo default que components.json);
// una entry puede overridear con "figmaFileKey" (ej. el wrapper Icon, cross-file).
const DEFAULT_FILE = "kjEg0KpLID4cH00DruERTN";

const manifest = JSON.parse(readFileSync(join(ROOT, "visual-baselines", "manifest.json"), "utf8"));
const onlyIdx = process.argv.indexOf("--only");
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1].toLowerCase() : null;
const targets = manifest.filter((e) => !only || e.name.toLowerCase().includes(only));
if (!targets.length) {
  console.error("✗ ninguna entry del manifest matchea");
  process.exit(1);
}

// agrupar por archivo para pedir todos los ids en una sola llamada por fileKey
const byFile = {};
for (const e of targets) (byFile[e.figmaFileKey ?? DEFAULT_FILE] ??= []).push(e);

let failures = 0;
for (const [fileKey, entries] of Object.entries(byFile)) {
  const ids = entries.map((e) => e.figmaNode).join(",");
  const res = await fetch(
    `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(ids)}&format=png&scale=1`,
    { headers: { "X-Figma-Token": TOKEN } }
  );
  if (!res.ok) {
    console.error(`✗ Images API ${res.status} para ${fileKey}: ${await res.text()}`);
    process.exit(1);
  }
  const { images, err } = await res.json();
  if (err) { console.error(`✗ Images API: ${err}`); process.exit(1); }

  for (const e of entries) {
    const url = images[e.figmaNode];
    if (!url) {
      console.error(`✗ ${e.name}: Figma no devolvió render para ${e.figmaNode} (¿nodo borrado/movido? verificar con verify-parity / MCP)`);
      failures++;
      continue;
    }
    const png = Buffer.from(await (await fetch(url)).arrayBuffer());
    const out = join(REFS_DIR, e.baseline);
    writeFileSync(out, png);
    console.log(`figma-ref  ${e.baseline}  (${e.name}, ${png.length} bytes)`);
  }
}

if (failures) process.exit(1);
console.log("\n✓ capture-figma-refs: refs de Figma en visual-figma-refs/ (ayuda de revisión lado a lado, NO baselines).");
