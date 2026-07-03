#!/usr/bin/env node
/**
 * verify-pointers.mjs — VIU DS skill
 * Valida que cada puntero del skill resuelva:
 *   1. `references/<x>.md` citados en SKILL.md → el archivo existe.
 *   2. `<ref> §<id>` (ej: figma-build §14, canon §Íconos, interaction §2) → existe un
 *      heading que matchee en ese archivo.
 *   3. `§<id>` sin archivo → se resuelve contra los headings del MISMO archivo.
 * Exit 0 = todo resuelve · Exit 1 = punteros rotos (listados).
 * Cero dependencias. Correr desde cualquier cwd dentro del repo.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const REFS_DIR = join(SKILL_DIR, "references");

const norm = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** headings de un .md → set de ids: para "## 14. Reuso" → "14"; "### 2b. Registro" → "2b";
 *  "## Sistema de íconos" → cada palabra significativa normalizada. */
function headingIds(text) {
  const ids = new Set();
  for (const m of text.matchAll(/^#{1,4}\s+(.+)$/gm)) {
    const h = m[1].trim();
    const num = h.match(/^(\d+[a-z]?)\s*[.·)]/i);
    if (num) ids.add(num[1].toLowerCase());
    for (const w of norm(h).split(/[^a-z0-9]+/)) if (w.length > 3) ids.add(w);
  }
  return ids;
}

const files = { "SKILL.md": readFileSync(join(SKILL_DIR, "SKILL.md"), "utf8") };
for (const f of readdirSync(REFS_DIR).filter((f) => f.endsWith(".md")))
  files[`references/${f}`] = readFileSync(join(REFS_DIR, f), "utf8");

const headings = Object.fromEntries(
  Object.entries(files).map(([k, v]) => [k, headingIds(v)])
);
const refNames = Object.keys(files)
  .filter((k) => k.startsWith("references/"))
  .map((k) => k.replace("references/", "").replace(".md", ""));

const errors = [];
for (const [fname, text] of Object.entries(files)) {
  // 1) referencias a archivos
  for (const m of text.matchAll(/references\/([\w-]+\.md)/g))
    if (!existsSync(join(REFS_DIR, m[1])))
      errors.push(`${fname}: cita references/${m[1]} — el archivo NO existe`);

  // 2) <ref> §<id>  y  <ref>.md §<id>
  const refAlt = refNames.join("|");
  for (const m of text.matchAll(
    new RegExp("`?(" + refAlt + ")(?:\\.md)?`?\\s*§\\s*([\\w][\\w-]*)", "gu")
  )) {
    const target = `references/${m[1]}.md`;
    const id = norm(m[2]);
    if (!headings[target]?.has(id))
      errors.push(`${fname}: "${m[1]} §${m[2]}" — no hay heading §${m[2]} en ${target}`);
  }

  // 3) §<num> sueltos → mismo archivo (solo ids numéricos tipo 2, 2b, 13)
  for (const m of text.matchAll(/(?<![\w/])§\s*(\d+[a-z]?)\b/g)) {
    const lineStart = text.lastIndexOf("\n", m.index) + 1;
    if (text[lineStart] === "|") continue; // en tablas, §N = notación de dimensiones
    const before = text.slice(Math.max(0, m.index - 40), m.index);
    if (new RegExp("(" + refAlt + ")(?:\\.md)?`?\\s*$").test(before)) continue; // ya cubierto en (2)
    if (!headings[fname].has(m[1].toLowerCase()))
      errors.push(`${fname}: "§${m[1]}" no existe como heading en el propio archivo`);
  }
}

if (errors.length) {
  console.error(`✗ verify-pointers: ${errors.length} puntero(s) roto(s)\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ verify-pointers: todos los punteros resuelven (${Object.keys(files).length} archivos)`);
