#!/usr/bin/env node
/**
 * capture-baselines.mjs — F5 · Captura/refresh de baselines desde Figma (automatizado)
 *
 * Lee visual-baselines/manifest.json y renderiza cada `figmaNode` vía la Images REST API
 * de Figma (disponible en plan Pro con un personal access token — a diferencia de la
 * Variables API), guardando los PNG 1x en visual-baselines/.
 *
 * Uso:  FIGMA_TOKEN=<personal access token>  node scripts/capture-baselines.mjs [--only "Badge"]
 * Token: Figma → Settings → Security → Personal access tokens (scope: File content, read).
 *
 * GOBERNANZA (regla, no sugerencia): este script AUTOMATIZA la captura, no la aprobación.
 * - Baselines nuevas o cambiadas van en un commit propio, etiquetado `baseline:`, que
 *   Natalia aprueba mirando el diff — su rol es aprobar, no operar.
 * - PROHIBIDO refrescar una baseline para poner en verde un test que falla, sin OK
 *   explícito de la dueña: un fallo visual es una pregunta ("¿cambió a propósito?"),
 *   y la respuesta es de gobernanza, no del script.
 *
 * Cero dependencias (fetch nativo de Node ≥18).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

let ROOT = dirname(fileURLToPath(import.meta.url));
while (!existsSync(join(ROOT, "package.json"))) ROOT = dirname(ROOT);

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
    const out = join(ROOT, "visual-baselines", e.baseline);
    const existed = existsSync(out);
    writeFileSync(out, png);
    console.log(`${existed ? "↻ refrescada" : "＋ nueva"}  ${e.baseline}  (${e.name}, ${png.length} bytes)`);
  }
}

if (failures) process.exit(1);
console.log("\n✓ capture-baselines: listo. Commit propio etiquetado `baseline:` + aprobación de la dueña antes de mergear.");
