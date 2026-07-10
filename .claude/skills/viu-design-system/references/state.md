# VIU Design System · Estado actual

**Actualizado: jul-2026 (post F3 + Badge soft + Icon cross-file).** Este archivo es la única fuente
de estado del sistema: conteos, inventarios y pendientes vivos. Se actualiza en cada batch (regla
§5 del SKILL.md); la historia de cómo se llegó acá vive en `decision-log.md`. Los conteos de acá
los custodia `scripts/verify-counts.mjs` contra la realidad del repo.

- **Tokens:** 346 variables / 5 colecciones *(corregido jul-2026: antes decía 331; +15 del batch Badge soft — `red/100` + 12 `feedback/*-soft` + 2 interinos `neutral-solid`)*, auditadas 1:1 Figma↔código; paridad verificada y ahora custodiada por el pipeline `snapshot(Figma) ↔ tokens/*.json ↔ dist/*.css` con CI `tokens-parity.yml` (ver code-build). *(jul-2026 F5: `alert/400` cambió de valor `#f0565b`→`#f57377` para que `feedback/danger-text` Dark pase AA sobre elevated (3.98→4.90); solo lo consume danger-text Dark. Conteo sin cambio — es un cambio de VALOR, no de token.)*
  Effects (sombras/gradients) como Styles → `tokens/effects.json`.
- **Figma:** **29 átomos · 35 moléculas · 9 organismos = 73 componentes** + 4 patrones (frames de
  composición, sin nodo de componente). Todos publicables (unused-props = []). *(Crecimiento jun-2026:
  Natalia construyó los 5 gaps de C1 en Figma — **Kbd** `721:7` átomo + **Segmented control** `724:28`
  / **Choice group** `728:35` / **Combobox** `730:40` / **Date range picker** `732:120` moléculas;
  detalle e IDs en figma-build §2b. Antes: 28/31/68 — el registro venía de "27 átomos / 66" y la
  portada "ÁTOMOS·26"; el faltante histórico era Icon container `574:150`.)* **Íconos = Material Symbols
  (jun-2026):** wrapper «Icon» en el archivo Icon, set `34:27` (6 Size; *corregido jul-2026: antes `944:6` local — se mudó junto a Glyph*) + librería «Glyph» `24:10626` (2.864 glifos snake_case,
  archivo Icon `5rV8Ad6qqHx5mocSpObi0k`); el set local `56:431` (11 glifos) fue migrado y ELIMINADO.
  Chevron fino = `stat_minus_1`/`stat_1`; laterales `chevron_left/right`. Detalle/migración en
  canon §Íconos + figma-build §15. **Código `@viu/ui` MIGRADO (jun-2026):** `Icon` dibuja el SVG
  oficial de Material Symbols embebido (repo google/material-design-icons, Outlined; SIN fuente);
  `glyph` acepta nombres legacy (mapeados) o Material embebido directo. Ver code-build. **Tree item `411:19` completo: 12 var** (Expansión ×
  Estado) + Icono/Checkbox. Banner `135:84`: CTA removido / Toast `176:101`: acción removida (jun-2026).
  Card modular SET(45). Portada con índice por nivel atómico (⚠️ falta sumarle
  las 5 entradas nuevas en Figma — figma-build §7b). Sections en archivo aparte; `Marketing · LinkedIn`
  fuera del índice. Sandbox de pruebas: `zmTSs2J5H3EIkItlF85rfc`.
- **Código (`NataliaRS/Viu`, rama `claude/viu-design-system`):** **29 átomos + 35 moléculas + 9
  organismos + 4 patrones = 73 componentes** en `@viu/ui`, Storybook en vivo
  (https://nataliars.github.io/Viu/) con chrome de marca, ViuDocs y Foundations interactivas.
  **C1 design-to-code COMPLETO (5/5):** ✅ Kbd + ✅ SegmentedControl + ✅ ChoiceGroup + ✅ Combobox +
  ✅ DateRangePicker portados. **Paridad Figma↔código restaurada** — cobertura 1:1. **Conteo de código
  (F1.1 jul-2026):** en `ui/src` hay **74 carpetas publicables con story** — distinto del 73 de Figma por
  **granularidad, no por cobertura**: `Field/Input·Select·Textarea` son **recetas** (`FormField`+control)
  sin carpeta propia en código, y `Calendar`/`DateField` son **internos compartidos sin story** (por eso
  no cuentan). Iguales en cobertura, distintos en conteo; el mapa 1:1 explícito llega con
  `components.json` en F2. *(nota §5: `verify-counts` compara este número contra la realidad contable de
  `ui/src`.)*
- **Manifest (F2, jul-2026):** `components.json` en la raíz del repo = **fuente única del
  inventario** — 77 entries: 74 mapeadas a `ui/src` + 3 recetas Figma-only (`Field/Input·Select·
  Textarea`, componen Input/Select/Textarea + FormField). Custodiado por `verify-parity` (activo,
  verde). El mapa de granularidad 73(Figma)+4(patrones frames `282:7`/`274:7`/`288:7`/`285:7`)↔74
  (código) quedó explícito entry por entry. El entry Icon es cross-file (archivo Icon `5rV8Ad…` set `34:27` + key durable; resuelto jul-2026 — el wrapper se había mudado, no borrado). **Pasada exhaustiva de nodeIds vía MCP COMPLETA (jul-2026): los 77 resuelven (77/77); los únicos 4 con nombre `<X> · Doc` son los patrones (frames de composición, esperado). Detalle en figma-build §2b.**
- **CI (F3+F5, jul-2026):** workflows en Actions — `tokens-parity.yml` (paridad
  snapshot↔json↔css), `skill-consistency.yml` (los tres gates F1/F2 en cada push/PR que toca skill,
  `ui/src` o manifest), `package-skill.yml` (gates + `.skill` como artifact en cada cambio del
  skill; formato verificado idéntico al empaquetador de referencia) y **`storybook-verify.yml` (F5):
  dos jobs — a11y (axe/`@storybook/test-runner` sobre CADA story) + visual (regresión Figma↔story,
  SKIP hasta baseline)**. `deploy-storybook.yml` en Node 24. Todos root-based `npm ci` (monorepo
  workspaces, un solo lockfile). Regla viva del pre-flight: leer `conclusion: success` de los runs,
  no asumir.
- **A11y (F5, jul-2026 — invariante por commit):** `storybook-verify.yml` corre axe sobre las 80
  stories en cada push/PR → **0 fallas WCAG dejó de ser auditoría puntual y pasó a gate mecánico.**
  Estado: **80/80 suites, 203/203 tests, 0 violaciones.** El estreno cazó 35 fallas reales en 19
  componentes (ver decision-log F5): estructurales/ARIA/label arregladas en código; 17 `color-contrast`
  remediadas subiendo el texto de-énfasis de `text-tertiary`/`text-disabled`→`text-secondary` (regla en
  code-build) + `feedback/danger-text` (`alert/400`) aclarado a `#f57377` (pasaba en base pero fallaba
  en elevated). *(Corrige la afirmación previa "0 fallas WCAG reales": la contrast-audit vieja medía
  solo sobre `bg/base`; axe cazó los fallos sobre superficies raised/elevated.)* Los 4 gates de
  gobernanza (`token-usage · ghost-check · lint-literals · contrast-audit`) siguen en el proyecto de
  gobernanza, NO en `NataliaRS/Viu`; el gate del repo es el de 5 pasos (typecheck · test · build ·
  figma connect parse · build-storybook) + los de CI.

## Pendientes vivos
- Migrar los 4 gates de gobernanza (`token-usage` · ghost-check · `lint-literals` ·
  `contrast-audit`) al repo cuando Natalia ubique el proyecto donde viven (Fase 3.1 del plan
  enterprise; el CI ya está listo para recibirlos).
- Renombrar la librería `24:10626` "Icon"→"Glyph" en Figma para evitar dos sets llamados "Icon"
  (anotado en figma-build §2b desde jun-2026).
- ~~**F5 · rebind Figma del remap de contraste**~~ ✅ HECHO (jul-2026). Natalia rebindeó en el archivo
  Componentes los text layers de-énfasis `text/tertiary`→`text/secondary` (Card eyebrow/meta, Image
  caption, Field/FormField helper, Menu item shortcut, Step label, Wizard count) y publicó la primitiva
  `color/alert/400`→`#f57377`. Cross-check MCP confirmado: `feedback/danger-text`=#f57377 (Banner
  `135:84`) y Card `434:6` usa `text/secondary`; snapshot ya en #f57377 → Figma↔repo en paridad.
- ~~**F5 · visual baselines POC (bloqueado por FIGMA_TOKEN)**~~ ✅ CORRIDO (jul-2026, Natalia dio el
  token como secret de GitHub). Resultado y decisión en decision-log (F5 · POC visual). **Veredicto:
  el pixel-diff Figma-PNG↔DOM da ~15% aun en paridad métrica (alto exacto, ancho ±2px, mismo contenido
  y case) — dominado por antialiasing cross-rasterizer + esquinas del pill + banda de pad; NO por render
  de fuente. Por la regla de Natalia (residuo grande → B), el gate de regresión visual va a DOM-vs-DOM,
  no Figma-PNG-vs-DOM.** Quedan estos pendientes derivados:
- ~~**F5b · switch del POC a DOM-vs-DOM**~~ ✅ HECHO (jul-2026). `capture-baselines.mjs` screenshotea la
  story (Chromium) como baseline; `visual-regression.mjs` compara story-vs-baseline mismo-rasterizer
  (~0% si no cambió, ruido cross-rasterizer eliminado). La captura Figma quedó como `capture-figma-refs.mjs`
  → `visual-figma-refs/` (ayuda de revisión lado-a-lado, NO baseline). `visual-baseline.yml` produce ambos
  PNG como artifact para aprobación. Doctrina codificada en code-build + README. **Pendiente operativo:**
  Natalia aprueba la baseline DOM del Badge (story `--visual-parity`) mirándola al lado del ref de Figma;
  con su OK → commit `baseline:` + `skip:false` activa el gate.
- ~~**F5c · republicar la librería Tokens**~~ ✅ HECHO (Natalia, jul-2026). `Label/S Caps` (`a3965a…`)
  quedó importable cross-file.
- ~~**F5d · migrar consumidores de micro-mayúscula a Label/S Caps**~~ ✅ HECHO (jul-2026, vía MCP,
  cross-check nodo a nodo; 0 nodos quedan en Label/S). **Badge** 6 tonos (override interino de `14:59`
  REEMPLAZADO por el estilo) · **Status** 4 · **Tag** main 3 · **FileRow** 3 · **Card** 225 (45 eyebrows
  `CATEGORÍA` + 180 labels de instancias de Tag heredadas del main). Detalle en decision-log (F5 · F5d).
  *(Hallazgo del POC: el nodo `14:59` estaba en Label/S mixto mientras el código uppercasea — era la
  causa del "ancho distinto", no fuente ni padding. Label/S Caps creado en la lib Tokens vía MCP.)*
