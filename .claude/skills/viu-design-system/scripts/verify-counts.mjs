#!/usr/bin/env node
/**
 * verify-counts.mjs — VIU DS skill
 * Compara los conteos DECLARADOS en el skill contra la realidad CONTABLE del repo:
 *   A. Tokens: SKILL.md y figma-build §13 vs. scripts/figma-tokens.snapshot.json (total y por colección).
 *   B. Componentes en código: total declarado (átomos+moléculas+organismos+patrones) vs.
 *      carpetas de ui/src con ≥1 *.stories.tsx (excluyendo no-componentes: EXCLUDE).
 *   C. Madurez: histograma de `status:` en stories vs. lo declarado (si hay declaración).
 * Exit 0 = coincide · Exit 1 = drift (con delta exacto para corregir el skill o el estado).
 * Cero dependencias.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ---- localizar repo root subiendo hasta package.json
let ROOT = dirname(fileURLToPath(import.meta.url));
while (!existsSync(join(ROOT, "package.json"))) {
  const up = dirname(ROOT);
  if (up === ROOT) { console.error("✗ no encontré la raíz del repo (package.json)"); process.exit(1); }
  ROOT = up;
}
const SKILL = join(ROOT, ".claude/skills/viu-design-system");
const skillMd = readFileSync(join(SKILL, "SKILL.md"), "utf8");
const figmaBuild = readFileSync(join(SKILL, "references/figma-build.md"), "utf8");

// Carpetas de ui/src que NO son componentes publicables (internos compartidos quedan
// fuera solos por no tener story; estos se excluyen explícitamente):
const EXCLUDE = new Set(["foundations", "dev", "test", "overlay"]);

const errors = [], notes = [];

// ---------- A. TOKENS ----------
const snapPath = join(ROOT, "scripts/figma-tokens.snapshot.json");
if (!existsSync(snapPath)) {
  errors.push("no existe scripts/figma-tokens.snapshot.json (¿pipeline de tokens no corrido?)");
} else {
  const snap = JSON.parse(readFileSync(snapPath, "utf8"));
  const cols = Object.entries(snap).filter(([, v]) => v && typeof v === "object" && v.tokens);
  const real = Object.fromEntries(cols.map(([k, v]) => [k, Object.keys(v.tokens).length]));
  const realTotal = Object.values(real).reduce((a, b) => a + b, 0);

  const dTot = skillMd.match(/(\d+)\s+variables\s*\/\s*(\d+)\s+colecciones/);
  if (!dTot) notes.push("SKILL.md: no encontré la declaración 'N variables / M colecciones'");
  else {
    if (+dTot[1] !== realTotal) errors.push(`tokens: SKILL.md declara ${dTot[1]} variables, snapshot tiene ${realTotal}`);
    if (+dTot[2] !== cols.length) errors.push(`tokens: SKILL.md declara ${dTot[2]} colecciones, snapshot tiene ${cols.length}`);
  }
  const dCols = figmaBuild.match(/Primitives\((\d+)\)\s*·\s*Semantic\((\d+)\)\s*·\s*\n?\s*Scales\((\d+)\)\s*·\s*Type Scale\((\d+)\)\s*·\s*Grid\((\d+)\)\s*=\s*(\d+)/);
  if (!dCols) notes.push("figma-build §13: no encontré el desglose por colección");
  else {
    const decl = { Primitives: +dCols[1], Semantic: +dCols[2], Scales: +dCols[3], "Type Scale": +dCols[4], Grid: +dCols[5] };
    for (const [c, n] of Object.entries(decl))
      if (real[c] !== undefined && real[c] !== n)
        errors.push(`tokens/${c}: figma-build declara ${n}, snapshot tiene ${real[c]}`);
    if (+dCols[6] !== realTotal) errors.push(`tokens: figma-build declara total ${dCols[6]}, snapshot tiene ${realTotal}`);
  }
}

// ---------- B. COMPONENTES EN CÓDIGO ----------
const uiSrc = join(ROOT, "ui/src");
const dirs = readdirSync(uiSrc).filter((d) => statSync(join(uiSrc, d)).isDirectory());
const withStory = dirs.filter((d) => readdirSync(join(uiSrc, d)).some((f) => f.endsWith(".stories.tsx")));
const components = withStory.filter((d) => !EXCLUDE.has(d)).sort();
const noStory = dirs.filter((d) => !withStory.includes(d) && !EXCLUDE.has(d)).sort();

const dComp = skillMd.match(/(\d+)\s+átomos\s*[·+]\s*(\d+)\s+moléculas\s*[·+]\s*(\d+)\s*\n?\s*organismos\s*[=+]?\s*(\d+)?\s*componentes/u);
const dPat = skillMd.match(/(\d+)\s+patrones/u);
if (!dComp) notes.push("SKILL.md: no encontré la declaración 'A átomos · M moléculas · O organismos'");
else {
  const [a, m, o] = [+dComp[1], +dComp[2], +dComp[3]];
  const declaredTotal = a + m + o + (dPat ? +dPat[1] : 0);
  if (dComp[4] && a + m + o !== +dComp[4])
    errors.push(`componentes: la suma declarada no cierra (${a}+${m}+${o} ≠ ${dComp[4]})`);
  if (declaredTotal !== components.length) {
    errors.push(`componentes: skill declara ${declaredTotal} (${a}a+${m}m+${o}o${dPat ? `+${dPat[1]}p` : ""}), ui/src tiene ${components.length} carpetas con story`);
    errors.push(`  → carpetas contadas: ${components.join(", ")}`);
  }
}
if (noStory.length) notes.push(`carpetas sin story (internos compartidos, no cuentan): ${noStory.join(", ")}`);

// ---------- C. MADUREZ ----------
const hist = { Draft: 0, Reviewed: 0, Stable: 0, Deprecated: 0 };
for (const d of components)
  for (const f of readdirSync(join(uiSrc, d)).filter((f) => f.endsWith(".stories.tsx"))) {
    const m = readFileSync(join(uiSrc, d, f), "utf8").match(/status:\s*"(Draft|Reviewed|Stable|Deprecated)"/);
    if (m) hist[m[1]]++; else notes.push(`${d}/${f}: story sin status de madurez`);
  }
const dStable = skillMd.match(/(\d+)\s*`?Stable`?\s*\+\s*(\d+)\s*\n?\s*`?Reviewed`?/u);
if (dStable && (+dStable[1] !== hist.Stable || +dStable[2] !== hist.Reviewed))
  errors.push(`madurez: skill declara ${dStable[1]} Stable + ${dStable[2]} Reviewed; stories reales: ${hist.Stable} Stable + ${hist.Reviewed} Reviewed (+${hist.Draft} Draft, ${hist.Deprecated} Deprecated)`);

// ---------- salida ----------
for (const n of notes) console.log("ℹ " + n);
if (errors.length) {
  console.error(`\n✗ verify-counts: ${errors.length} discrepancia(s) — el skill/estado quedó atrás de la realidad\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ verify-counts: declarado = real (${components.length} componentes, madurez ${JSON.stringify(hist)})`);
