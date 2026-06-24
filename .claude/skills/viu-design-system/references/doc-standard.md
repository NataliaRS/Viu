# VIU Design System · Estándar de documentación

## Cómo leer este documento
Define cómo se documenta cada pieza del sistema para que la doc sirva por igual a Diseño, Ingeniería y
QA, y sea trazable y gobernable. Es una adaptación del Design System Documentation Framework a los
principios de VIU: rigurosa donde rinde (componentes, grupos semánticos) y liviana donde el rigor
sería relleno (primitivas simples), porque P4 manda —si no comunica, se quita— y un no-objetivo de
VIU es "nada por inflar".

No reemplaza a `principles.md` (el porqué) ni a la arquitectura (el dónde): los usa. El rationale y la
gobernanza viven en principios; acá se documenta la pieza concreta apuntando a esas reglas.

## Reglas de output (válidas para toda la doc)
- **Encabezado fijo por unidad:** nombre · familia/tier · prioridad · madurez (Draft / Reviewed /
  Stable / Deprecated).
- **Dimensiones en orden y numeradas.** Si una no aplica, `N/A` con una línea de justificación; no se
  borra.
- **Tokens y valores en formato código:** `--color-bg-brand`, `8px`, `1.125`.
- **Observado vs. recomendado** separados de forma explícita cuando difieran. Nunca mezclados en la
  misma frase.
- **Gaps marcados ⚠️ PENDIENTE:** —nunca inventados— y, si se puede, con la pregunta concreta que los
  resuelve.
- **Trazabilidad obligatoria:** la dimensión de Anatomía lista los tokens que consume el componente.
  En VIU ese mapa se extrae del CSS con `build/token-usage.mjs`, así no se desincroniza de la fuente.

## Plantilla de COMPONENTE (11 dimensiones)
Encabezado: Nombre · Familia · Tier · Prioridad · Madurez
1. **Definición semántica** — qué es funcionalmente, no solo visualmente.
2. **Función primaria** — qué problema resuelve en los flujos del usuario.
3. **Taxonomía** — familia, categoría y relaciones dentro del sistema.
4. **Variantes** — el mapa completo: variantes × tamaños × estados.
5. **Anatomía y tokens consumidos** — partes + los tokens que consume (extraídos del CSS). Puente con
   Foundations.
6. **Comportamiento** — estados, interacción, transición/motion, responsive.
7. **Uso** — cuándo sí / cuándo no, combinaciones válidas.
8. **Errores comunes** — misuse frecuente y cómo evitarlo.
9. **Componentes relacionados** — con qué se confunde, qué lo sustituye, pares naturales.
10. **Gobernanza y validación** — quién aprueba, QA, parity check Figma↔código.
11. **Accesibilidad** — specs WCAG 2.2 AA específicos del componente.

*(Se fusionaron "Implementation notes" dentro de Anatomía/Comportamiento para no inflar; los hints de
ingeniería van ahí.)*

## Plantilla de FOUNDATION (liviana — 6 dimensiones)
Las primitivas simples (radio, z-index) se documentan livianas; los grupos semánticos densos (color)
pueden expandirse. Orden:
1. **Definición semántica** — qué representa, no su valor.
2. **Escala y valores** — la escala, unidades y progresión (ratio/base).
3. **Derivación y dependencias** — de qué deriva y qué lo consume. Puente con Components.
4. **Theming & modes** — comportamiento light/dark/branding y dónde se sobreescribe.
5. **Accesibilidad** — contraste, tamaños mínimos, reduced-motion, foco.
6. **Gobernanza** — aprobación, versionado, deprecation.

## Quality bar (antes de dar por terminada una unidad)
- ☐ Encabezado con madurez.
- ☐ Dimensiones presentes y en orden.
- ☐ Hay rationale (por qué existe), no solo descripción.
- ☐ Hay gobernanza (quién/cómo se controla) y un criterio de validación.
- ☐ La Anatomía lista los tokens consumidos (trazabilidad real, extraída del CSS).
- ☐ Gaps marcados, no inventados.
- ☐ Observado y recomendado diferenciados.

## Equivalencias por superficie (la misma doc, tres formas)
**APROBADA por gobernanza (jun-2026, A2)** — es regla: el mapa MD↔Figma↔Storybook de abajo se trata
como normativo.

| Dimensión | Markdown (`<comp>.md`) | Figma (página Atom ·/Molecule ·/…) | Storybook (`parameters.viu`) |
|---|---|---|---|
| Definición + función | §1–2 | Doc frame · intro bajo `_Header` | `overview` |
| Variantes | §4 | El component set mismo + sección Propiedades | stories nombradas |
| Anatomía + tokens | §5 | Sección Anatomía | `anatomy[]` |
| Comportamiento | §6 | Sección Comportamiento/Estados | stories States |
| Uso (sí/no) | §7 | "Cuándo y dónde" | `whenToUse[]` / `whenNotToUse[]` |
| Errores comunes | §8 | "Cuándo y dónde" (evitar) | `dos[]` / `donts[]` |
| Accesibilidad | §11 | Sección o notas | `accessibility[]` |
| Madurez | encabezado | — | `status` |

**Regla:** el contenido es uno solo; las tres superficies lo espejan. Si difieren, gana el `.md` de
gobernanza y se corrige el resto.

## Notas por componente

### Time picker — doc
La fila seleccionada del dropdown "Abierto" usa check **Icon** (`check`, `text/brand`), no ✓ texto. El
componente y el doc comparten el mismo patrón de seleccionado (`bg/brand-subtle` + `text/brand` + check
Icon, space-between).
