#!/usr/bin/env node
/**
 * VIU Design System — token build (zero dependencies).
 *
 * Reads the DTCG source files in /tokens, resolves the alias chain
 * (primitives -> semantic -> theme), and emits to /dist:
 *   - tokens.css   CSS custom properties (black-first, light theme override) + type/grid helpers
 *   - tokens.json  fully resolved tokens (primitive + scale + semantic per theme)
 *   - tokens.js    ESM object for JS/TS consumers
 *   - tokens.d.ts  type declarations
 *
 * Rule mirrored from Figma: components consume SEMANTIC + SCALE, never primitives.
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
const scale = read("scale.json");
const semantic = read("semantic.json");

/* ---------- helpers ---------- */

// Walk a token tree, calling cb(pathArray, node) for every leaf that has $value.
function walk(node, path, cb) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && "$value" in val) {
      cb([...path, key], val);
    } else if (val && typeof val === "object") {
      walk(val, [...path, key], cb);
    }
  }
}

// Flat map "a.b.c" -> $value, across a token tree.
function flatten(tree) {
  const map = {};
  walk(tree, [], (path, node) => {
    map[path.join(".")] = node.$value;
  });
  return map;
}

const primitiveMap = flatten(primitives); // color.red.500 -> #b5262e
const scaleLeafMap = {};                   // space.md -> 16px, font.size.body-m -> 14px, etc.
walk(scale, [], (path, node) => {
  if (typeof node.$value !== "object") scaleLeafMap[path.join(".")] = node.$value;
});

const refLookup = { ...primitiveMap, ...scaleLeafMap };

// Resolve a value that may be an alias "{a.b.c}" against the lookup table.
function resolveRef(value) {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{(.+)\}$/);
  if (!m) return value;
  const target = refLookup[m[1]];
  if (target === undefined) throw new Error(`Unresolved token reference: {${m[1]}}`);
  return resolveRef(target);
}

const toVar = (segments) => "--" + segments.join("-").toLowerCase().replace(/\./g, "-");

/* ---------- resolve semantic per theme ---------- */

const THEMES = ["dark", "light"];
const semanticResolved = { dark: {}, light: {} };
// Semantic leaves are identified by carrying theme keys ("dark"/"light") rather than "$value".
function walkSemantic(node, path) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (val && typeof val === "object" && ("dark" in val || "light" in val)) {
      const name = [...path, key].join(".");
      for (const theme of THEMES) {
        if (!(theme in val)) throw new Error(`Semantic token ${name} missing theme "${theme}"`);
        semanticResolved[theme][name] = resolveRef(val[theme]);
      }
    } else if (val && typeof val === "object") {
      walkSemantic(val, [...path, key]);
    }
  }
}
walkSemantic(semantic, []);

/* ---------- resolve composite typography ---------- */

const typeResolved = {};
walk(scale, [], (path, node) => {
  if (node.$type === "typography") {
    const v = node.$value;
    typeResolved[path[path.length - 1]] = {
      fontFamily: resolveRef(v.fontFamily),
      fontSize: resolveRef(v.fontSize),
      fontWeight: resolveRef(v.fontWeight),
      lineHeight: v.lineHeight,
      letterSpacing: v.letterSpacing,
    };
  }
});

/* ---------- CSS emit ---------- */

const css = [];
css.push("/* VIU Design System — generated tokens. DO NOT EDIT BY HAND.");
css.push("   Source: /tokens/*.json — run `npm run build:tokens` to regenerate. */\n");

// Primitives + scale live in :root (theme-independent).
css.push(":root {");
css.push("  /* ---- primitives · color ---- */");
walk(primitives, [], (path, node) => {
  css.push(`  ${toVar(path)}: ${node.$value};`);
});
css.push("\n  /* ---- scale · spacing ---- */");
walk(scale.space, ["space"], (p, n) => css.push(`  ${toVar(p)}: ${n.$value};`));
css.push("\n  /* ---- scale · radius ---- */");
walk(scale.radius, ["radius"], (p, n) => css.push(`  ${toVar(p)}: ${n.$value};`));
css.push("\n  /* ---- scale · typography primitives ---- */");
walk(scale.font, ["font"], (p, n) => css.push(`  ${toVar(p)}: ${n.$value};`));
css.push("\n  /* ---- scale · breakpoints ---- */");
walk(scale.breakpoint, ["breakpoint"], (p, n) => css.push(`  ${toVar(p)}: ${n.$value};`));
css.push("\n  /* ---- scale · grid ---- */");
for (const [bp, g] of Object.entries(scale.grid)) {
  css.push(`  --grid-${bp}-columns: ${g.columns};`);
  css.push(`  --grid-${bp}-gutter: ${g.gutter};`);
  css.push(`  --grid-${bp}-margin: ${g.margin};`);
}
css.push("}\n");

// Semantic tokens — default theme is dark (black-first).
function emitTheme(selector, theme) {
  css.push(`${selector} {`);
  for (const [name, value] of Object.entries(semanticResolved[theme])) {
    css.push(`  ${toVar(name.split("."))}: ${value};`);
  }
  css.push("}\n");
}
css.push("/* Default theme: dark (black-first) */");
emitTheme(":root, [data-theme=\"dark\"]", "dark");
css.push("/* Light theme override */");
emitTheme("[data-theme=\"light\"]", "light");
css.push("/* Auto: follow OS when no explicit data-theme is set */");
css.push("@media (prefers-color-scheme: light) {");
const lightLines = Object.entries(semanticResolved.light)
  .map(([name, value]) => `    ${toVar(name.split("."))}: ${value};`)
  .join("\n");
css.push(`  :root:not([data-theme]) {\n${lightLines}\n  }`);
css.push("}\n");

// Typography utility classes.
css.push("/* ---- typography utilities ---- */");
for (const [name, t] of Object.entries(typeResolved)) {
  css.push(`.viu-type-${name} {`);
  css.push(`  font-family: ${t.fontFamily};`);
  css.push(`  font-size: ${t.fontSize};`);
  css.push(`  font-weight: ${t.fontWeight};`);
  css.push(`  line-height: ${t.lineHeight};`);
  css.push(`  letter-spacing: ${t.letterSpacing};`);
  css.push(`}`);
}
css.push("");

// Responsive grid container helper.
css.push("/* ---- responsive grid container ---- */");
css.push(".viu-grid {");
css.push("  display: grid;");
css.push("  grid-template-columns: repeat(var(--grid-base-columns), 1fr);");
css.push("  column-gap: var(--grid-base-gutter);");
css.push("  padding-inline: var(--grid-base-margin);");
css.push("}");
const bpOrder = ["sm", "md", "lg", "xl", "2xl"];
for (const bp of bpOrder) {
  const min = scale.breakpoint[bp].$value;
  css.push(`@media (min-width: ${min}) {`);
  css.push("  .viu-grid {");
  css.push(`    grid-template-columns: repeat(var(--grid-${bp}-columns), 1fr);`);
  css.push(`    column-gap: var(--grid-${bp}-gutter);`);
  css.push(`    padding-inline: var(--grid-${bp}-margin);`);
  css.push("  }");
  css.push("}");
}
css.push("");

/* ---------- resolved JSON + JS emit ---------- */

const resolvedJson = {
  primitive: primitiveMap,
  scale: { ...scaleLeafMap, type: typeResolved, grid: scale.grid },
  semantic: semanticResolved,
};

const jsBody =
  "// VIU Design System — generated tokens. DO NOT EDIT BY HAND.\n" +
  "export const tokens = " + JSON.stringify(resolvedJson, null, 2) + ";\n" +
  "export default tokens;\n";

const dtsBody =
  "// VIU Design System — generated token types.\n" +
  "export interface ViuTokens {\n" +
  "  primitive: Record<string, string>;\n" +
  "  scale: Record<string, unknown>;\n" +
  "  semantic: { dark: Record<string, string>; light: Record<string, string> };\n" +
  "}\n" +
  "export declare const tokens: ViuTokens;\n" +
  "export default tokens;\n";

/* ---------- write ---------- */

mkdirSync(DIST, { recursive: true });
writeFileSync(join(DIST, "tokens.css"), css.join("\n"));
writeFileSync(join(DIST, "tokens.json"), JSON.stringify(resolvedJson, null, 2) + "\n");
writeFileSync(join(DIST, "tokens.js"), jsBody);
writeFileSync(join(DIST, "tokens.d.ts"), dtsBody);

const counts = {
  primitives: Object.keys(primitiveMap).length,
  scale: Object.keys(scaleLeafMap).length,
  typography: Object.keys(typeResolved).length,
  "semantic (per theme)": Object.keys(semanticResolved.dark).length,
};
console.log("VIU tokens built ->", DIST);
for (const [k, v] of Object.entries(counts)) console.log(`  ${k}: ${v}`);
