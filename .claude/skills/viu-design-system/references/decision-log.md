# VIU Design System · Decision log (append-only)

Historia de decisiones cerradas, batches y correcciones. **Solo se agrega al final; nunca se edita
lo ya logueado** (si algo logueado resultó falso, se agrega una entrada nueva que lo corrige y lo
referencia). El estado vigente vive en `state.md`.

## jun-2026 · A1 — escala única de madurez (ejecución)
**✅ A1 EJECUTADO (jun-2026):** los componentes ya están en la escala única en código — `ViuDocs.tsx`
  tipa `status: "Draft"|"Reviewed"|"Stable"|"Deprecated"` y las stories quedaron **74 `Stable` + 0
  `Reviewed`** *(corregido jul-2026 §5: al ejecutar A1 eran 67 `Stable` + 2 `Reviewed` [Tooltip/Slider,
  ex-`beta`]; ambos pasaron a `Stable` al cerrarse B4/B5 y se sumaron componentes nuevos → 74/0)*. El badge mapea Draft→warning · Reviewed→info · Stable→success
  · Deprecated→danger.
*(Nota posterior: con los batches de jul-2026 las stories quedaron 74 Stable + 0 Reviewed —
Tooltip/Slider promovidos al cerrar B4/B5; conteo vigente en state.md.)*

## jun-2026 → jul-2026 · Cola B/A, A4, C1 y batch de cierre
- **Batch jul-2026 (cierre — íconos residuales + Badge soft):** cerrada la cola de afinado de íconos/estructura — **Select** `26:293` (▾→`stat_minus_1`) · **Search** `26:347` (lupa vector→`search`) · **Nav** `233:19` (punto→Icon `home` swappable) · **Datepicker** `28:386`+**Date range** (calendario→`calendar_today`) · **Checkbox** `24:167` (✓→Glyph `check` 12px) · **Tab** `161:43` (+slot trailing `Icono fin`) · **Avatar** `19:90` (+`Type=Ícono` `account_circle`, SET 10→15, grid re-alineado sin auto-layout) · **Time picker** `409:6` (+`Estado=Abierto` a nivel componente, check Icon) · **Data table** `285:7` (search→instancia de molécula Search). **Badge `14:77`:** surface→sólido→**soft /100** (opaco+claro, texto /700, AA) + prop `Icono` leading. **Tokens nuevos:** primitiva `red/100` + 12 `feedback/{tono}-soft`/`-on-soft` (+ interino `neutral-solid`/`-on-solid`). Recetas/keys en figma-build §16; detalle en canon §Badge/§Íconos. **Badge en CÓDIGO alineado (jul-2026):** el CSS de `@viu/ui` pasó de `*-solid`/`bg-raised` a `feedback/{tono}-soft`+`-on-soft` en los 6 tonos (Brand y Neutral incluidos) + prop `icon?: boolean|ReactNode` (leading, glifo default `sell` embebido en `Icon/glyphs.tsx`, @xs, decorativo); Code Connect mapea `Tone`/`Icono`/`Label`. Gate de 5 pasos + 3 gates del skill en verde. Detalle en code-build §14 (Paridad de la tanda, bullet Badge SOFT).
- **Pendientes — DECIDIDOS jun-2026, en cola de ejecución (orden sugerido):**
  1. ~~**B2** · sumar Eye/EyeOff al Icon de Figma~~ ✅ HECHO (jun-2026). Natalia los creó en Figma
     como `Visibility`/`Visibility_off`; el código se renombró a `Visibility`/`VisibilityOff`
     (alineado a Figma, mejor nombre semántico). Code Connect mapea `Visibility_off`→`VisibilityOff`.
  2. ~~**B3** · `.figma.tsx` de Icon container~~ ✅ HECHO (jun-2026). El gap de `style`/`tone` que
     surgió quedó **RESUELTO**: el componente se reconstruyó con paridad completa (círculo + `tone`
     ×8 + `appearance` filled/stroke + tamaños), ver code-build.
  3. ~~**A1** · actualizar la etiqueta de madurez de los componentes a la escala única
     Draft/Reviewed/Stable/Deprecated~~ ✅ HECHO (jun-2026). `ViuDocs.tsx` retipado + stories
     migradas (67 Stable, 2 Reviewed al ejecutar A1; hoy 74 Stable, 0 Reviewed — ver el estado); tipo viejo `stable|beta|wip` obsoleto.
  4. ~~**B1** · migrar componentes de `disabled` por opacidad a `bg-disabled`/`text-disabled`~~
     ✅ HECHO (jun-2026). Resultaron solo **4** (no ~15): ListItem, MenuItem, Tab (usaban `opacity:
     var(--state-disabled)`) + TimePicker/PickerField (`opacity: 0.5` mágico). Regla aplicada:
     rellenos→`bg-disabled`+`text-disabled`; transparentes→solo `text-disabled` (ver interaction §2).
  5. ~~**B4** · Slider modo Rango (doble thumb) en código~~ ✅ HECHO (jun-2026). Unión discriminada
     `SingleSliderProps | RangeSliderProps`; `range` + `onValueChange([lo,hi])`, clamping lo≤hi, dos
     inputs superpuestos con z-index dinámico para grabbability. Tests de clamping agregados.
  6. ~~**B5** · colisión/flip de Tooltip + Popover (misma lógica)~~ ✅ HECHO (jun-2026). Hook
     compartido `overlay/useFlipSide.ts`; Tooltip mide en hover/focus, Popover en open + scroll/resize.
  *(Cola B/A completa. Slider y Tooltip pasaron de Reviewed → Stable. Pendiente sólo C1 design-to-code.)*
- **A4 (RESUELTO): átomo `Marker` DESCARTADO** — no es gap real; "Marker, no CheckCircle" sigue
  siendo solo la regla de nombrar por rol (figma-build §12), no un componente a construir.
- **Gaps C1 — ✅ construidos en Figma (jun-2026):** Segmented control `724:28` · Choice group
  (Radio/Checkbox) `728:35` · Combobox `730:40` · Date range picker `732:120` · Kbd `721:7`. Se
  siguió el proceso decidido (PRIMERO en Figma, fuente de verdad). Reuso estricto aplicado
  (figma-build §14): Combobox→Search+Menu item; Choice group→Radio+Checkbox; Date range
  picker→Datepicker ×2. **Design-to-code a `@viu/ui` COMPLETO (5/5, jun-2026):** ✅ Kbd + ✅
  SegmentedControl + ✅ ChoiceGroup + ✅ Combobox + ✅ DateRangePicker, todos con gate completo + tests.
  **Datepicker/DateRangePicker REFACTORIZADOS (jun-2026):** ambos reusan `Calendar` + `DateField`
  compartidos (espeja Figma, que compone el DateRangePicker con 2 Datepicker); el Datepicker ya NO
  envuelve el `<input type=date>` nativo — calendario propio de marca. Ver code-build. **C1
  cerrado; paridad Figma↔código en cobertura 1:1 *(73 es el número **Figma**; **74 carpetas de código con
  story** — iguales en cobertura, distintos en granularidad; ver bullet "Código" arriba y F1.1)*.**


## jul-2026 · Fases enterprise F1–F3 (infraestructura de verificación)
- **F1:** tres gates ejecutables en `scripts/` del skill (`verify-pointers` · `verify-counts` ·
  `verify-parity`), cero dependencias, cableados a §3/§5/§5b. En su estreno cazaron dos drifts
  reales: tokens 331→346 (el batch Badge soft no había actualizado conteos) y componentes 77
  declarados vs 74 carpetas (granularidad Figma≠código, resuelta declarando ambos números).
- **F2:** `components.json` (raíz del repo) = fuente única del inventario, 77 entries (74 con
  código + 3 recetas Figma-only `Field/Input·Select·Textarea`); figma-build §2b jubilado como
  fuente de conteo. Los 77 nodeId validados vía MCP (77/77 ✓).
- **F2/F3 · Icon wrapper:** `944:6` no resolvía — el wrapper NO estaba borrado: se MUDÓ al archivo
  Icon (`5rV8Ad…`, set `34:27`) junto a Glyph. El entry quedó cross-file con `fileKey` + **key
  durable** `71c7115a…` (lección: los nodeIds mueren en mudanzas; las keys no → el schema del
  manifest ahora soporta ambos).
- **F3:** CI completo — `skill-consistency.yml` (los 3 gates en cada push/PR) y
  `package-skill.yml` (gates + `.skill` como artifact, formato verificado idéntico al empaquetador
  de referencia); `deploy-storybook.yml` a Node 24. Primer commit custodiado: `58d411a`, todo verde.
- **F4:** este split — SKILL.md (reglas, estable, con `version:` en frontmatter) / `state.md`
  (estado vivo) / `decision-log.md` (este archivo). Cero pérdida auditada línea a línea.

## jul-2026 · F5 — a11y continua (axe por commit) + POC de regresión visual
- **Infra:** `.storybook/test-runner.ts` (axe sobre cada story), `storybook-verify.yml` (jobs a11y +
  visual), `scripts/{capture-baselines,visual-regression}.mjs`, `visual-baselines/{manifest,README}`.
  Deps en `ui/`: `@storybook/test-runner@0.22.1` (el 0.24 pide Storybook 10; el repo usa SB 8.4.7),
  axe-playwright, http-server, wait-on, `playwright@1.56`, pixelmatch, pngjs.
- **Gotchas de infra (pagados):** (1) el `storybook-verify.yml` provisto hacía `npm ci` en `ui/` con
  `ui/package-lock.json` — no existe (monorepo workspaces, lockfile único en raíz) → reescrito
  root-based `npm ci` + `-w ui` + `--config-dir ui/.storybook`, espejando deploy-storybook. (2) Local:
  la CDN de Playwright está bloqueada y el browser preinstalado es build 1194 (playwright 1.56) vs el
  1228 que fija test-runner (playwright 1.61) → shim que apunta la ruta 1228 al binario 1194 (solo
  local; en CI `playwright install` baja el browser). El `.skill`/artefactos generados NO se commitean.
- **a11y — 35 fallas reales cazadas en 19 componentes (estreno del gate), todas arregladas:**
  - *Estructural/ARIA/label (código):* `TableRow`/`Table` inyectan `role="cell"`/`"columnheader"`
    (celdas vacías excluidas) → Table/DataTable/AppShell; `Stepper`→`role="listitem"`; `TreeItem`
    checkbox con `aria-label` + fix de `role="tree"` anidado; `DataTable` empty-state como fila válida;
    stories: Progress `label`, Slider/Select `aria-label`, Tab con decorator `tablist`, foundations
    `<th scope>` sr-only, AppShell `h3`→`h2`.
  - *Contraste (17, decisión de Natalia = opción 1 "remap a text-secondary"):* subir el texto de
    de-énfasis `text-tertiary`/`text-disabled`→`text-secondary` (Card eyebrow/meta, Image caption,
    FormField/Form helper, Menu/MenuItem shortcut, Wizard/Step count/label, AppShell meta). Chip y
    FormField disabled: `aria-disabled` (son inactivos → axe los exime; el `text-disabled` es correcto
    ahí). `feedback/danger-text` fallaba sobre elevated (3.98): `alert/400` `#f0565b`→`#f57377`
    (elevated 4.90) — Natalia aprobó "lightear". foundations/Colors (matriz de contraste didáctica,
    muestra sub-AA a propósito): exclusión acotada de axe en test-runner.ts, documentada.
  - **Corrección §5 a "0 fallas WCAG reales":** era FALSO en el sentido estricto — la contrast-audit
    medía solo sobre `bg/base`; `text-tertiary` (y danger-text) fallan sobre raised/elevated. Regla
    nueva codificada en code-build (token de texto por superficie). Resultado final: **80/80 suites,
    203/203, 0 violaciones.**
- **Condición de Natalia (rebind Figma mismo batch):** pendiente vivo en state.md — subir los fills
  tertiary→secondary en los nodos Componentes + `alert/400` en Tokens, cross-check MCP antes/después.
- **Regresión visual (POC):** manifest con Badge `14:59` (`skip:true` hasta capturar baseline con
  FIGMA_TOKEN); el job visual SKIPea verde hasta entonces. Gobernanza de baselines: commit `baseline:`
  aprobado por Natalia; prohibido refrescar una baseline para poner un test en verde sin su OK.

## jul-2026 · F5 · POC de regresión visual — corrida real y veredicto (Figma↔DOM → DOM-vs-DOM)
- **Token:** Natalia lo dio como secret de GitHub (`FIGMA_TOKEN`). Se armó `visual-baseline.yml`
  (`workflow_dispatch`, no commitea) que captura el nodo vía Images API con el secret, mide y sube
  artifacts. Se corrió ~10 veces cazando bugs REALES del harness (ninguno un ajuste de threshold):
  (1) Playwright: instalar con el bin de `ui` (1.56), no el 1.61 hoisted; (2) el server estático no
  mandaba `Content-Type` → los ES modules de Storybook no ejecutaban; (3) `selector` para aislar el
  Badge del decorator `minHeight:100vh`; (4) esperar `document.fonts.ready`; (5) `pixelmatch` ESM
  (`.default`); (6) tolerar Δdim subpixel (padear a tamaño común, banda de borde cuenta como diff).
- **Causa raíz del "ancho distinto" (NO era fuente ni padding):** la story `Default` renderiza
  "Nuevo" y el nodo `14:59` dice "Etiqueta" + punto (ellipse 6px) — **contenidos distintos**. Fix:
  story `VisualParity` que espeja el contenido literal del nodo; regla nueva de manifest (cada entry
  de regresión apunta a una story de paridad, doc en `visual-baselines/README`). Además se descubrió
  un **hallazgo C real:** el label del nodo `14:59` estaba en Label/S **mixto** mientras el código
  uppercasea (`text-transform`); el intento de diseño es micro-mayúscula → faltaba `textCase: UPPER`
  en Figma. Se creó vía MCP el text style **Label/S Caps** (`a3965a…`, dup de Label/S + Uppercase,
  mismos tokens) en la lib Tokens; se aplicó un override interino a `14:59` para medir. Republicación
  + migración de los 5 consumidores (Badge/Card eyebrow/Tag/Status/FileRow) = pendientes F5c/F5d.
- **Número (sin tocar threshold):** con contenido, case y tema igualados, **~15% de píxeles distintos**
  (alto EXACTO 25=25, ancho 85 vs 83 = Δ2px subpixel). Forzar tema claro no lo movió (14.92→15.01) →
  el fill ya matcheaba; el ~15% es **antialiasing cross-rasterizer (Figma export vs Chromium) + esquinas
  del pill + banda de pad**, no render de fuente. La paridad MÉTRICA es excelente; el pixel-diff crudo
  contra un PNG de Figma es intrínsecamente ruidoso.
- **Veredicto (regla de Natalia: residuo grande → B, C despejado):** el gate mecánico de regresión
  visual va a **DOM-vs-DOM** (baseline = screenshot de la story, mismo rasterizer → estable). Figma↔DOM
  queda como chequeo a ojo, no gate. Detalle e implementación pendiente en state.md (F5b). El
  `visual-baseline.yml` + la infra Figma-Images quedan como herramienta de captura, no como gate.
