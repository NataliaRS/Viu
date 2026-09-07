/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import { VIU_EN } from "../.storybook/viu-en";

/**
 * GATE de i18n (jul-2026) — garantiza que el toggle EN/ES no quede a medias.
 *
 * Cada componente documenta su contenido en ESPAÑOL en la story (`meta.parameters.viu`);
 * el inglés vive en el overlay `.storybook/viu-en.ts`, keyed por `meta.title`. Este test
 * falla si al agregar/editar un componente NO se agrega (o se queda incompleta) su traducción:
 *   1. una story con `viu` sin entrada EN → falla,
 *   2. una entrada EN a la que le falta un campo de texto que sí está en el ES → falla,
 *   3. una entrada EN huérfana (título que ya no existe) → falla.
 * Es el equivalente de los gates `verify-*`: la traducción deja de ser "acordarse" y pasa a
 * ser mecánica (corre en `npm run -w ui test`, cableado en CI, storybook-verify job `unit`).
 *
 * Nota: Foundations e Introduction traducen inline (context.globals.locale / IntroContent),
 * no vía overlay — no aplican acá.
 */
const FIELDS = ["overview", "whenToUse", "whenNotToUse", "anatomy", "accessibility", "dos", "donts"] as const;

type Viu = Partial<Record<(typeof FIELDS)[number], unknown>>;
type Meta = { title?: string; parameters?: { viu?: Viu } };

// Evalúa el meta (default export) de cada story sin renderizarla.
const modules = import.meta.glob("./**/*.stories.tsx", { eager: true }) as Record<string, { default?: Meta }>;

const esByTitle: Record<string, { viu: Viu; file: string }> = {};
for (const [file, mod] of Object.entries(modules)) {
  const meta = mod.default;
  const title = meta?.title;
  const viu = meta?.parameters?.viu;
  if (title && viu) esByTitle[title] = { viu, file };
}

describe("i18n · cobertura del overlay inglés (viu-en.ts)", () => {
  it("hay stories con contenido `viu` para chequear", () => {
    // guarda de humo: si esto es 0, el glob se rompió y el gate no estaría chequeando nada.
    expect(Object.keys(esByTitle).length).toBeGreaterThan(0);
  });

  it("cada componente con `parameters.viu` tiene entrada en VIU_EN", () => {
    const missing = Object.keys(esByTitle)
      .filter((t) => !VIU_EN[t])
      .sort();
    expect(missing, `Faltan entradas EN en .storybook/viu-en.ts para:\n  ${missing.join("\n  ")}`).toEqual([]);
  });

  it("cada entrada EN traduce todos los campos de texto presentes en el ES", () => {
    const gaps: string[] = [];
    for (const [title, { viu }] of Object.entries(esByTitle)) {
      const en = VIU_EN[title];
      if (!en) continue;
      for (const f of FIELDS) {
        if (viu[f] != null && (en as Viu)[f] == null) gaps.push(`${title} → ${f}`);
      }
    }
    expect(gaps.sort(), `Campos sin traducir en viu-en.ts:\n  ${gaps.join("\n  ")}`).toEqual([]);
  });

  it("no hay entradas EN huérfanas (título inexistente)", () => {
    const stale = Object.keys(VIU_EN)
      .filter((t) => !esByTitle[t])
      .sort();
    expect(stale, `Entradas EN huérfanas en viu-en.ts (el título ya no existe):\n  ${stale.join("\n  ")}`).toEqual([]);
  });
});
