#!/usr/bin/env node
/**
 * VIU Design System — token build (zero dependencies).
 *
 * Mirrors the 5 Figma variable collections 1:1:
 *   primitives.json  Primitives   (mode Value)
 *   semantic.json    Semantic     (modes Dark / Light)
 *   scales.json      Scales       (mode Value, aliases over primitives)
 *   type-scale.json  Type Scale   (modes Mobile / Desktop, responsive font sizes)
 *   grid.json        Grid         (modes base..2xl)
 *
 * Resolves the alias chain (everything aliases PRIMITIVES) and emits to /dist:
 *   tokens.css   CSS custom properties (black-first, light + responsive type) + type/grid helpers
 *   tokens.json  fully resolved tokens
 *   tokens.js    ESM object for JS/TS consumers
 *   tokens.d.ts  type declarations
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TOKENS = join(ROOT, "tokens");
const DIST = join(ROOT, "dist");

const read = (f) => JSON.parse(readFileSync(join(TOKENS, f), "utf8"));
const primitives = read("primitives.json");
const semantic = read("semantic.json");
const scales = read("scales.json");
const typeScale = read("type-scale.json");
const grid = read("grid.json");
const effects = read("effects.json");

/* ---------- flatten primitives with "/" (matches Figma variable names) ---------- */

function flattenPrimitives(node, path, out) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && "$value" in val) {
      out[[...path, key].join("/")] = val.$value;
    } else if (val && typeof val === "object") {
      flattenPrimitives(val, [...path, key], out);
    }
  }
}
const prim = {};
flattenPrimitives(primitives, [], prim); // "color/red/500" -> "#b5262e", "space/16" -> "16px"

const refRe = /^\{(.+)\}$/;
function resolve(value) {
  if (typeof value !== "string") return value;
  const m = value.match(refRe);
  if (!m) return value;
  if (!(m[1] in prim)) throw new Error(`Unresolved reference: {${m[1]}}`);
  return resolve(prim[m[1]]);
}

/* ---------- flatten alias collections (scales) ---------- */

function flattenAliases(node, path, out) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && "$value" in val) {
      out[[...path, key].join("/")] = resolve(val.$value);
    } else if (val && typeof val === "object") {
      flattenAliases(val, [...path, key], out);
    }
  }
}
const scaleTokens = {};
flattenAliases(scales, [], scaleTokens); // "space/md" -> "16px"

/* ---------- semantic (Dark/Light) ---------- */

const semantic_ = { Dark: {}, Light: {} };
function walkSemantic(node, path) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && ("Dark" in val || "Light" in val)) {
      const name = [...path, key].join("/");
      semantic_.Dark[name] = resolve(val.Dark);
      semantic_.Light[name] = resolve(val.Light);
    } else if (val && typeof val === "object") {
      walkSemantic(val, [...path, key]);
    }
  }
}
walkSemantic(semantic, []);

/* ---------- effects (shadows + gradients, Dark/Light) ---------- */

const effects_ = { Dark: {}, Light: {} };
function walkThemed(node, path, out) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && ("Dark" in val || "Light" in val)) {
      const name = [...path, key].join("/");
      out.Dark[name] = resolve(val.Dark);
      out.Light[name] = resolve(val.Light);
    } else if (val && typeof val === "object") {
      walkThemed(val, [...path, key], out);
    }
  }
}
walkThemed(effects, [], effects_);

/* ---------- type scale (Mobile/Desktop) ---------- */

const type_ = { Mobile: {}, Desktop: {} };
function walkType(node, path) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && ("Mobile" in val || "Desktop" in val)) {
      const name = [...path, key].join("/");
      type_.Mobile[name] = resolve(val.Mobile);
      type_.Desktop[name] = resolve(val.Desktop);
    } else if (val && typeof val === "object") {
      walkType(val, [...path, key]);
    }
  }
}
walkType(typeScale, []);

/* ---------- grid (base..2xl modes) ---------- */

const GRID_MODES = ["base", "sm", "md", "lg", "xl", "2xl"];
const grid_ = {};
for (const [name, modes] of Object.entries(grid)) {
  if (name.startsWith("$")) continue;
  grid_[name] = {};
  for (const m of GRID_MODES) grid_[name][m] = resolve(modes[m]);
}

/* ---------- CSS ---------- */

const toVar = (name) => "--" + name.replace(/\//g, "-");
const css = [];
css.push("/* VIU Design System — generated tokens. DO NOT EDIT BY HAND.");
css.push("   Source: /tokens/*.json — run `npm run build:tokens` to regenerate. */\n");

css.push(":root {");
css.push("  /* ---- Primitives (raw — components consume Scales/Semantic/Type, not these) ---- */");
for (const [name, v] of Object.entries(prim)) css.push(`  ${toVar(name)}: ${v};`);
// Derived families for code consumers (Label text style uses General Sans; code uses mono).
css.push("\n  /* ---- derived families (from text styles; not Figma variables) ---- */");
css.push('  --font-family-label: "General Sans", "Inter", system-ui, sans-serif;');
css.push("  --font-family-code: var(--font-family-mono);");
css.push("\n  /* ---- Scales (semantic aliases) ---- */");
for (const [name, v] of Object.entries(scaleTokens)) css.push(`  ${toVar(name)}: ${v};`);
css.push("\n  /* ---- Grid (per-mode) ---- */");
for (const [name, modes] of Object.entries(grid_)) {
  for (const m of GRID_MODES) css.push(`  ${toVar(name)}-${m}: ${modes[m]};`);
}
css.push("}\n");

// Semantic — black-first (Dark default).
function emitSemantic(selector, mode) {
  css.push(`${selector} {`);
  for (const [name, v] of Object.entries(semantic_[mode])) css.push(`  ${toVar(name)}: ${v};`);
  for (const [name, v] of Object.entries(effects_[mode])) css.push(`  ${toVar(name)}: ${v};`);
  css.push("}\n");
}
css.push("/* Default theme: Dark (black-first) */");
emitSemantic(':root, [data-theme="dark"]', "Dark");
css.push("/* Light theme */");
emitSemantic('[data-theme="light"]', "Light");
css.push("@media (prefers-color-scheme: light) {");
css.push(
  "  :root:not([data-theme]) {\n" +
    [...Object.entries(semantic_.Light), ...Object.entries(effects_.Light)]
      .map(([n, v]) => `    ${toVar(n)}: ${v};`)
      .join("\n") +
    "\n  }",
);
css.push("}\n");

// Type scale — Mobile default, Desktop at >= md (1024px). Mode switch is a code-side
// decision (Figma toggles Mobile/Desktop per frame); md is the chosen breakpoint.
const DESKTOP_BP = prim["breakpoint/md"]; // 1024px
css.push("/* Responsive type sizes: Mobile by default, Desktop at >= md */");
css.push(":root {");
for (const [name, v] of Object.entries(type_.Mobile)) css.push(`  ${toVar(name)}: ${v};`);
css.push("}");
css.push(`@media (min-width: ${DESKTOP_BP}) {`);
css.push("  :root {");
for (const [name, v] of Object.entries(type_.Desktop)) css.push(`    ${toVar(name)}: ${v};`);
css.push("  }");
css.push("}\n");

// Typography utility classes.
const ROLE = {
  oversize: { family: "display", weight: "medium", lh: "tight", ls: "tight" },
  display: { family: "display", weight: "medium", lh: "tight", ls: "tight" },
  headline: { family: "display", weight: "medium", lh: "tight", ls: "tight" },
  title: { family: "display", weight: "medium", lh: "snug", ls: "normal" },
  body: { family: "body", weight: "regular", lh: "relaxed", ls: "normal" },
  label: { family: "label", weight: "medium", lh: "relaxed", ls: "normal" },
  code: { family: "code", weight: "regular", lh: "relaxed", ls: "normal" },
};
css.push("/* ---- typography utilities ---- */");
for (const fullName of Object.keys(type_.Mobile)) {
  const short = fullName.replace("font-size/", ""); // e.g. "label-s"
  const role = short.split("-")[0];
  const cfg = { ...ROLE[role] };
  if (short === "label-s") cfg.ls = "wide"; // micro-label tracking
  css.push(`.viu-type-${short} {`);
  css.push(`  font-family: var(--font-family-${cfg.family});`);
  css.push(`  font-size: var(--${toVar(fullName).slice(2)});`);
  css.push(`  font-weight: var(--font-weight-${cfg.weight});`);
  css.push(`  line-height: var(--line-height-${cfg.lh});`);
  css.push(`  letter-spacing: var(--tracking-${cfg.ls});`);
  css.push(`}`);
}
css.push("");

// Responsive grid container.
css.push("/* ---- responsive grid container ---- */");
css.push(".viu-grid {");
css.push("  display: grid;");
css.push("  grid-template-columns: repeat(var(--grid-columns-base), 1fr);");
css.push("  column-gap: var(--grid-gutter-base);");
css.push("  padding-inline: var(--grid-margin-base);");
css.push("}");
for (const m of ["sm", "md", "lg", "xl", "2xl"]) {
  css.push(`@media (min-width: ${prim["breakpoint/" + m]}) {`);
  css.push("  .viu-grid {");
  css.push(`    grid-template-columns: repeat(var(--grid-columns-${m}), 1fr);`);
  css.push(`    column-gap: var(--grid-gutter-${m});`);
  css.push(`    padding-inline: var(--grid-margin-${m});`);
  css.push("  }");
  css.push("}");
}
css.push("");

/* ---------- resolved JSON + JS ---------- */

const resolved = {
  primitive: prim,
  scales: scaleTokens,
  semantic: { dark: semantic_.Dark, light: semantic_.Light },
  effects: { dark: effects_.Dark, light: effects_.Light },
  type: { mobile: type_.Mobile, desktop: type_.Desktop },
  grid: grid_,
};

mkdirSync(DIST, { recursive: true });
writeFileSync(join(DIST, "tokens.css"), css.join("\n"));
writeFileSync(join(DIST, "tokens.json"), JSON.stringify(resolved, null, 2) + "\n");
writeFileSync(
  join(DIST, "tokens.js"),
  "// VIU Design System — generated tokens. DO NOT EDIT BY HAND.\n" +
    "export const tokens = " +
    JSON.stringify(resolved, null, 2) +
    ";\nexport default tokens;\n",
);
writeFileSync(
  join(DIST, "tokens.d.ts"),
  "// VIU Design System — generated token types.\n" +
    "export interface ViuTokens {\n" +
    "  primitive: Record<string, string | number>;\n" +
    "  scales: Record<string, string | number>;\n" +
    "  semantic: { dark: Record<string, string>; light: Record<string, string> };\n" +
    "  effects: { dark: Record<string, string>; light: Record<string, string> };\n" +
    "  type: { mobile: Record<string, string>; desktop: Record<string, string> };\n" +
    "  grid: Record<string, Record<string, string | number>>;\n" +
    "}\n" +
    "export declare const tokens: ViuTokens;\nexport default tokens;\n",
);

console.log("VIU tokens built ->", DIST);
console.log(`  primitives: ${Object.keys(prim).length}`);
console.log(`  scales: ${Object.keys(scaleTokens).length}`);
console.log(`  semantic (per theme): ${Object.keys(semantic_.Dark).length}`);
console.log(`  effects (per theme): ${Object.keys(effects_.Dark).length}`);
console.log(`  type scale (per mode): ${Object.keys(type_.Mobile).length}`);
console.log(`  grid: ${Object.keys(grid_).length}`);
