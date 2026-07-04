#!/usr/bin/env node
/**
 * visual-regression.mjs — F5 · Regresión visual Figma ↔ Storybook (EXPERIMENTAL)
 *
 * Compara baselines aprobadas (PNG exportados de Figma por la dueña del sistema, en
 * visual-baselines/) contra las stories renderizadas con Playwright + pixelmatch.
 *
 * Modelo de gobernanza: la baseline es un ARTEFACTO APROBADO — la exporta Natalia desde
 * Figma (Export PNG 1x del nodo), no la fabrica una máquina. Cambiar una baseline = decir
 * "este es el nuevo look canónico" y pasa por commit revisable.
 *
 * Honestidad experimental: fuentes y antialiasing difieren entre Figma y el browser →
 * los thresholds son por entry y generosos al inicio. Un fallo acá es una ALERTA para
 * mirar el diff (se sube como artifact), no un veredicto automático. Empezar con 5–10
 * componentes core y calibrar antes de escalar (plan F5).
 *
 * Uso: node scripts/visual-regression.mjs --storybook ui/storybook-static
 * Config: visual-baselines/manifest.json →
 *   [{ "name", "storyId", "baseline", "threshold" (0–1, ratio de píxeles distintos),
 *      "selector" (default "#storybook-root > *") }]
 * Deps (ui/): playwright, pixelmatch, pngjs. SKIP con exit 0 si no hay manifest o está vacío.
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

let ROOT = dirname(fileURLToPath(import.meta.url));
while (!existsSync(join(ROOT, "package.json"))) ROOT = dirname(ROOT);
const require = createRequire(join(ROOT, "ui", "package.json"));

const manifestPath = join(ROOT, "visual-baselines", "manifest.json");
if (!existsSync(manifestPath)) {
  console.log("⤳ visual-regression: SKIP — no hay visual-baselines/manifest.json todavía.");
  process.exit(0);
}
const entries = JSON.parse(readFileSync(manifestPath, "utf8")).filter((e) => !e.skip);
if (!entries.length) {
  console.log("⤳ visual-regression: SKIP — manifest sin entries activas.");
  process.exit(0);
}

const sbDirArg = process.argv.indexOf("--storybook");
const sbDir = join(ROOT, sbDirArg > -1 ? process.argv[sbDirArg + 1] : "ui/storybook-static");
if (!existsSync(join(sbDir, "iframe.html"))) {
  console.error(`✗ no encontré el build de Storybook en ${sbDir} (correr build-storybook antes)`);
  process.exit(1);
}

const { chromium } = require("playwright");
const pixelmatch = require("pixelmatch");
const { PNG } = require("pngjs");
const { createServer } = await import("node:http");
const { readFile } = await import("node:fs/promises");

// server estático mínimo para el build (sin dependencia extra).
// Content-Type OBLIGATORIO: los bundles de Storybook son ES modules y el browser rechaza
// (`Failed to load module script`) cualquier .js servido sin un MIME de JS → la story no
// montaría y el screenshot esperaría eternamente `#storybook-root > *`.
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".map": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
};
const server = createServer(async (req, res) => {
  const path = join(sbDir, decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html");
  try {
    const body = await readFile(path);
    res.setHeader("Content-Type", MIME[extname(path).toLowerCase()] ?? "application/octet-stream");
    res.end(body);
  } catch {
    res.statusCode = 404;
    res.end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const diffDir = join(ROOT, "visual-diffs");
mkdirSync(diffDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
const failures = [];

for (const e of entries) {
  const baselinePath = join(ROOT, "visual-baselines", e.baseline);
  if (!existsSync(baselinePath)) {
    failures.push(`${e.name}: baseline ${e.baseline} no existe (exportarla de Figma — ver README)`);
    continue;
  }
  await page.goto(`${base}/iframe.html?id=${e.storyId}&viewMode=story`, { waitUntil: "networkidle" });
  // Esperar a que las webfonts de marca pinten ANTES del screenshot: `networkidle` no
  // garantiza que `document.fonts` haya aplicado, y un render con la fuente de fallback
  // da anchos distintos a los de Figma (que usa la fuente real) → falso mismatch.
  await page.evaluate(() => document.fonts.ready);
  const el = page.locator(e.selector ?? "#storybook-root > *").first();
  const shot = PNG.sync.read(await el.screenshot());
  const ref = PNG.sync.read(readFileSync(baselinePath));

  if (shot.width !== ref.width || shot.height !== ref.height) {
    failures.push(`${e.name}: dimensiones ≠ — story ${shot.width}×${shot.height} vs baseline ${ref.width}×${ref.height} (re-exportar a 1x o revisar tamaño del componente)`);
    continue;
  }
  const diff = new PNG({ width: ref.width, height: ref.height });
  const bad = pixelmatch(ref.data, shot.data, diff.data, ref.width, ref.height, { threshold: 0.2 });
  const ratio = bad / (ref.width * ref.height);
  const limit = e.threshold ?? 0.05;
  const verdict = ratio <= limit ? "✓" : "✗";
  console.log(`${verdict} ${e.name}: ${(ratio * 100).toFixed(2)}% píxeles distintos (límite ${(limit * 100).toFixed(0)}%)`);
  if (ratio > limit) {
    writeFileSync(join(diffDir, `${e.name.replace(/\W+/g, "-")}.diff.png`), PNG.sync.write(diff));
    failures.push(`${e.name}: ${(ratio * 100).toFixed(2)}% > ${(limit * 100).toFixed(0)}% — diff en visual-diffs/`);
  }
}

await browser.close();
server.close();
if (failures.length) {
  console.error(`\n✗ visual-regression: ${failures.length} alerta(s) — mirar los diffs antes de concluir\n`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(`\n✓ visual-regression: ${entries.length} componente(s) dentro de umbral`);
