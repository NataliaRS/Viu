#!/usr/bin/env node
/**
 * capture-baselines.mjs — F5b · Captura de baselines DOM (screenshot de la story)
 *
 * El gate de regresión visual es DOM-vs-DOM: la baseline ES el screenshot de la propia
 * story (Chromium), y visual-regression.mjs compara el screenshot futuro contra ella con el
 * MISMO rasterizer → estable, sin el ruido cross-rasterizer que tiene comparar contra un PNG
 * de Figma (el POC jul-2026 midió ~15% de diferencia con paridad métrica excelente — ruido de
 * rasterización, no señal; ver decision-log F5 · POC visual y code-build).
 *
 * GOBERNANZA: este script AUTOMATIZA la captura, NO la aprobación.
 * - Baseline inicial: Natalia la aprueba comparando LADO A LADO el screenshot de la story (esto)
 *   contra el render de Figma (visual-figma-refs/, `capture-figma-refs.mjs`) — ahí vive ahora el
 *   vínculo Figma↔diseño. Va en commit propio etiquetado `baseline:`.
 * - PROHIBIDO refrescar una baseline para poner un test en verde sin su OK explícito: un fallo
 *   visual es una pregunta ("¿cambió a propósito?"), la responde gobernanza, no el script.
 *
 * Uso: node scripts/capture-baselines.mjs --storybook ui/storybook-static [--only "Badge"]
 * Deps (ui/): playwright, pngjs. Requiere `build-storybook` antes.
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

let ROOT = dirname(fileURLToPath(import.meta.url));
while (!existsSync(join(ROOT, "package.json"))) ROOT = dirname(ROOT);
const require = createRequire(join(ROOT, "ui", "package.json"));

const manifestPath = join(ROOT, "visual-baselines", "manifest.json");
const entriesAll = JSON.parse(readFileSync(manifestPath, "utf8"));
const onlyIdx = process.argv.indexOf("--only");
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1].toLowerCase() : null;
const entries = entriesAll.filter((e) => !only || e.name.toLowerCase().includes(only));
if (!entries.length) { console.error("✗ ninguna entry del manifest matchea"); process.exit(1); }

const sbDirArg = process.argv.indexOf("--storybook");
const sbDir = join(ROOT, sbDirArg > -1 ? process.argv[sbDirArg + 1] : "ui/storybook-static");
if (!existsSync(join(sbDir, "iframe.html"))) {
  console.error(`✗ no encontré el build de Storybook en ${sbDir} (correr build-storybook antes)`);
  process.exit(1);
}

const { chromium } = require("playwright");
const { PNG } = require("pngjs");
const { createServer } = await import("node:http");
const { readFile } = await import("node:fs/promises");

// Content-Type OBLIGATORIO: los bundles de Storybook son ES modules; sin MIME de JS el browser
// los rechaza y la story no monta (mismo server que visual-regression.mjs).
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

mkdirSync(join(ROOT, "visual-baselines"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
for (const e of entries) {
  await page.goto(`${base}/iframe.html?id=${e.storyId}&viewMode=story`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready); // webfonts pintadas antes del screenshot
  const el = page.locator(e.selector ?? "#storybook-root > *").first();
  const png = await el.screenshot();
  const out = join(ROOT, "visual-baselines", e.baseline);
  const existed = existsSync(out);
  writeFileSync(out, png);
  const dim = PNG.sync.read(png);
  console.log(`${existed ? "↻ refrescada" : "＋ nueva"}  ${e.baseline}  (${e.name}, ${dim.width}×${dim.height})`);
}
await browser.close();
server.close();
console.log(
  "\n✓ capture-baselines (DOM): screenshots en visual-baselines/. Aprobación LADO A LADO de la dueña " +
  "(story vs visual-figma-refs/) + commit `baseline:` antes de activar (`skip:false`)."
);
