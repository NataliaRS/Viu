---
name: viu-design-system
description: "Skill maestro y única fuente de verdad del VIU Design System — marca, principios, canon teórico, estándar de documentación, y build operativo en Figma (MCP) y en código (repo NataliaRS/Viu, Storybook). Usar SIEMPRE que el trabajo toque cualquier cosa de VIU: crear/editar componentes, variantes, tokens, estilos, docs, patrones, portada o páginas en Figma; escribir o revisar componentes React/CSS/Storybook del repo; decisiones de marca, color, tipografía, voz, accesibilidad o gobernanza; auditorías de tokens/contraste; collateral de marketing con la marca VIU; o cualquier mención de 'VIU', 'el design system', 'el sistema', 'tokens', 'la librería', 'el Storybook' o 'el repo'. Cargar ANTES de la primera llamada a use_figma o al primer cambio en código. Reemplaza y absorbe al skill figma-viu-build."
---

# VIU Design System — skill maestro

Una sola marca, un solo sistema, una sola fuente de verdad. Este skill unifica el porqué
(principios), la evidencia (canon), el cómo se documenta (estándar) y el cómo se construye (Figma
vía MCP + código). Si una decisión contradice algo de acá, se corrige la decisión o se actualiza el
skill — nunca quedan divergentes.

## 0. Identidad y locks (no negociables, aplican a TODO)
- **Quién es VIU:** práctica de UX, marketing y retail (~20 años, multi-industria). Premium,
  experta, confiable. Femenina y corporativa. Global.
- **Black-first:** superficie base `#0a0a0b`; modo oscuro por defecto; modo claro = blanco frío,
  nunca crema.
- **Crimson `#B5262E`** = acento primario (identidad + CTA). **Índigo `#272558`** = acento
  secundario menor (profundidad, gradients, énfasis), subordinado — nunca compite. Ningún acento de
  marca comunica error/estado: feedback es capa funcional separada.
- **Restraint senior:** ante la duda, se quita. Un acento, un CTA primario por superficie, un
  momento de motion por pantalla.
- **Especificidad:** si una decisión podría aparecer igual en cualquier sistema, se replantea.
- **Accesibilidad = piso (P5):** WCAG 2.2 AA verificado con números (4.5:1 texto, 3:1 grande/UI);
  target mínimo 24×24; foco visible; estado = color + información, nunca solo color;
  `prefers-reduced-motion` respetado. Si no cumple AA, no se aprueba — sin excepción.
- **Orden de desempate entre principios:** pisos (P5 accesibilidad + locks de identidad) → luego
  P1 problema real → P2 experiencia natural → P3 autoridad → P4 estructura → P6 escala/durabilidad
  → P7 iteración.
- **Tipografía:** PP Neue Montreal (display/títulos) · Google Sans (body/lectura) · General Sans
  (labels/UI) · JetBrains Mono (code). Merriweather está ELIMINADO.
- **Voz:** profesional, cercana, clara, educativa, humor inteligente. CTAs ≤ 3 palabras. Nunca
  despectiva ni discriminatoria.

## 1. Gobernanza (quién decide)
- Solo la dueña del sistema (Natalia) crea o aprueba componentes nuevos, en Figma o en código. Nada
  está "terminado" hasta que ella lo aprueba explícitamente.
- Toda decisión relevante va al decision log al tomarse. Versionado semver. **Madurez — escala
  única (RESUELTO jun-2026, A1): `Draft / Reviewed / Stable / Deprecated`** (la del estándar de doc;
  el Storybook ya usa `status`). El vocabulario viejo `experimental/estable/obsoleto` queda
  deprecado; mapeo de transición: experimental→Draft·Reviewed, estable→Stable, obsoleto→Deprecated.
  **✅ A1 EJECUTADO (jun-2026):** los componentes ya están en la escala única en código — `ViuDocs.tsx`
  tipa `status: "Draft"|"Reviewed"|"Stable"|"Deprecated"` y las stories quedaron **74 `Stable` + 0
  `Reviewed`** *(corregido jul-2026 §5: al ejecutar A1 eran 67 `Stable` + 2 `Reviewed` [Tooltip/Slider,
  ex-`beta`]; ambos pasaron a `Stable` al cerrarse B4/B5 y se sumaron componentes nuevos → 74/0)*. El badge mapea Draft→warning · Reviewed→info · Stable→success
  · Deprecated→danger.
- Antes de crear un componente, distinguir: (1) existe pero no está publicado, (2) gap real
  reusable, (3) one-off que NO debe entrar a la librería. No conflar Badge/Tag/Pill/Chip/
  Notification badge (cada uno tiene rol y doc propios; no crearlos en batch).
- Fuente única de tokens: la VARIABLE de Figma manda; `tokens/*.json → CSS` se genera. Nunca se
  editan a mano los archivos generados.
- Arquitectura de capas: Primitives (valores crudos, sin significado de uso) → Semantic (propósito;
  lo que consume el producto) → Component (tokens propios SOLO cuando un semántico no alcanza) ·
  Patterns = composición, no tokens. Cada capa referencia solo la inmediatamente inferior, nunca
  salta. El producto nunca consume un primitivo de COLOR directo (en tipografía/dimensión los
  primitivos SÍ son consumibles — matiz honesto en code-build.md). Inventario real de capas:
  figma-build.md §13. **Arquitectura R3 — CERRADO (RESUELTO jun-2026, A5):** el CSS vanilla
  (`viu-ds.css`/`button.css`) se declara superado por `@viu/ui`; en `NataliaRS/Viu` no existe
  (verificado), y se da por muerto también en gobernanza. La implementación de referencia es
  `@viu/ui`; no se mantiene una capa vanilla en paralelo.

## 2. Mapa de referencias (qué leer según la tarea)

| Tarea | Leer |
|---|---|
| Decisión de marca, conflicto entre principios, voz, no-objetivos | `references/principles.md` |
| Justificar/cuestionar un principio con teoría (Norman, WCAG, Frost, Kholmatova…) | `references/canon.md` |
| Estados, capas `--state-*`, motion `--motion-*`, reduced-motion, checklist de interacción | `references/interaction.md` |
| Documentar un componente o foundation (plantillas 11-dim / 6-dim, quality bar, equivalencias MD↔Figma↔Storybook) | `references/doc-standard.md` |
| Cualquier trabajo en Figma (use_figma, keys, registro de componentes, helpers, recetas, gotchas, inventario de 346 tokens) | `references/figma-build.md` — leer ANTES de la primera llamada a use_figma |
| Cualquier trabajo en código (repo, regla cero-magic-values, Storybook estándar, convenciones, overlays, CI/deploy) | `references/code-build.md` |

Para builds Figma↔código, leer ambas operativas: comparten la regla de paridad (la variable de
Figma manda, el código se deriva, las text styles se sincronizan a mano).

## 3. Pre-flight universal (antes de tocar nada)
1. Leer la referencia operativa correspondiente (§2). Sin esto se repiten los rollbacks ya pagados.
2. Inspeccionar el estado REAL antes de afirmar: en Figma, enumerar `figma.root.children` con
   `page.loadAsync()` (nunca declarar ausencia por búsqueda fuzzy); en código, leer el archivo del
   repo. El contexto/memoria puede estar viejo.
3. Identificar la capa correcta: ¿es token (archivo Tokens), componente (archivo Componentes /
   `ui/src`), doc (página Doc / `.md` / `parameters.viu`), o patrón? Avisar que editar Tokens
   requiere republicar la librería.
4. Cambio + verificación en el mismo paso: en Figma, mutación + lectura de datos en la misma
   llamada (transaccional, hace rollback); en CI, leer `conclusion: success`, no solo que el run
   arranque.
5. QA gates antes de cerrar: Figma → pre-publish check de props huérfanas + contraste; código →
   `typecheck · test · build · figma connect parse · build-storybook`; doc → quality bar de
   doc-standard.md; skill → `node .claude/skills/viu-design-system/scripts/verify-pointers.mjs` y
   `verify-counts.mjs` en 0 (gates mecánicos del propio skill — F1). **Cross-check obligatorio con Figma ante CUALQUIER cambio visual/de componente:
   Figma es la fuente de verdad — confirmar nodo-a-nodo (`get_variable_defs` + `get_screenshot` con
   `enableBase64Response:true`, el sandbox bloquea egress a figma.com) antes de declarar hecho; no
   aplicar convenciones "de memoria" sin verificarlas. Detalle del método en `code-build.md`.** Ubicación del tooling: los gates de gobernanza (`build/token-usage.mjs`,
   ghost-check, `lint-literals.mjs`, `contrast-audit.py`) viven en el proyecto de gobernanza, NO en
   `NataliaRS/Viu` (verificado jun-2026: ausentes en el repo de código); los gates de código viven
   en el repo.

## 4. Disciplina de proceso (transversal)
- **Act-then-review:** proceder sin checkpoints de confirmación; presentar decisiones y tradeoffs
  después de ejecutar.
- **Honestidad verificable:** nunca declarar hecho lo no verificado; gaps marcados ⚠️ PENDIENTE:,
  nunca inventados; observado vs. recomendado siempre separados; correcciones a afirmaciones falsas
  se loguean explícitas.
- **Nombrar por rol semántico, no forma visual** (Marker, no CheckCircle).
- **Cero valores mágicos:** en código, color solo Semantic; espaciado/radio/z/motion/iconos/
  tipografía por token (excepciones honestas listadas en code-build.md). En Figma, todo bindeado a
  variable/estilo.
- **Comunicación:** español rioplatense, nivel Director, conciso, con tradeoffs honestos ("dale",
  "armá", "decime").

## 5. Regla permanente: actualizar este skill al cerrar cada batch
Un batch sin update del skill está incompleto. Antes (o junto) al cierre, actualizar: (a) el
"Estado actual" de abajo y los conteos de code-build.md/figma-build.md, (b) la sección de
convenciones que toque con los gotchas nuevos, (c) keys/IDs/tokens si cambiaron. Las actualizaciones
son fusiones que preservan todo el detalle previo — nunca un rewrite que pierda riqueza. Excepción
que evita que el skill acumule mentiras: un dato que quedó FALSO no se preserva, se corrige en el
lugar con nota (`corregido <fecha>: antes decía X`) — preservar riqueza ≠ preservar errores. Si algo
causó un rollback, un error de TS, un bug de foco, una sorpresa de CI o una corrección de token:
queda escrito acá, no solo en el chat. **Verificación mecánica (F1):** los scripts en `scripts/`
del skill — `verify-pointers.mjs` (punteros §↔headings) · `verify-counts.mjs` (conteos declarados vs.
snapshot de tokens, carpetas de `ui/src` con story, madurez en stories) · `verify-parity.mjs`
(manifest `components.json`; SKIPea hasta que exista, Fase 2) — deben salir en 0 antes de cerrar el
batch. Si `verify-counts` falla, el fix es actualizar el estado con nota de corrección — NUNCA
aflojar el script ni la EXCLUDE list para silenciarlo.

Al instalar este skill, **desinstalar `figma-viu-build`**: ambos compiten en triggering y el viejo
quedó atrás. Este lo absorbe entero.

### 5b. Sync del skill (el repo manda)
Este skill vive versionado en `NataliaRS/Viu` → `.claude/skills/viu-design-system/` (rama
`claude/viu-design-system`, repo público). Claude Code lo consume directo del filesystem — cada
commit lo actualiza al instante de ese lado. La copia instalada en claude.ai es un **snapshot** que
se republica a mano; nunca se editan las dos copias en paralelo: **el repo es la fuente de verdad
del skill mismo.**
- **Rutina "actualizá el skill desde el repo" (en chat, cuando Natalia lo pida):**
  1. `git clone --depth 1 https://github.com/NataliaRS/Viu.git` en el sandbox (github.com está
     permitido) y tomar `.claude/skills/viu-design-system/`.
  2. Correr los gates del skill antes de empaquetar: `node .claude/skills/viu-design-system/
     scripts/verify-pointers.mjs` + `verify-counts.mjs`. Si algo falla → avisar con el output y NO
     empaquetar (no se instala un skill con punteros rotos o conteos falsos).
  3. Empaquetar con el script del skill-creator desde un directorio ESCRIBIBLE:
     `cd /home/claude && PYTHONPATH=/mnt/skills/examples/skill-creator python -m
     scripts.package_skill <ruta-del-skill>` (correrlo desde el dir del skill-creator falla:
     filesystem read-only).
  4. Copiar el `.skill` a outputs + `present_files` → Natalia toca **Save skill** (mismo nombre =
     reemplaza la instalada). Total: un mensaje + un click.
- **Dirección inversa (el batch se cerró en chat, no en Code):** generar los archivos actualizados
  del skill, presentarlos, y Natalia le pide a Claude Code que los commitee a
  `.claude/skills/viu-design-system/`. Después, opcionalmente, correr la rutina de arriba para
  republicar el snapshot de chat desde el repo.
- **Regla §5 ampliada:** el cierre de batch en Claude Code incluye commitear la carpeta
  `.claude/skills/viu-design-system/` en el mismo commit/PR del batch — el repo nunca queda atrás
  del código.

## 6. Estado actual (junio 2026)
- **Tokens:** 346 variables / 5 colecciones *(corregido jul-2026: antes decía 331; +15 del batch Badge soft — `red/100` + 12 `feedback/*-soft` + 2 interinos `neutral-solid`)*, auditadas 1:1 Figma↔código; paridad verificada y ahora custodiada por el pipeline `snapshot(Figma) ↔ tokens/*.json ↔ dist/*.css` con CI `tokens-parity.yml` (ver code-build).
  Effects (sombras/gradients) como Styles → `tokens/effects.json`.
- **Figma:** **29 átomos · 35 moléculas · 9 organismos = 73 componentes** + 4 patrones (frames de
  composición, sin nodo de componente). Todos publicables (unused-props = []). *(Crecimiento jun-2026:
  Natalia construyó los 5 gaps de C1 en Figma — **Kbd** `721:7` átomo + **Segmented control** `724:28`
  / **Choice group** `728:35` / **Combobox** `730:40` / **Date range picker** `732:120` moléculas;
  detalle e IDs en figma-build §2b. Antes: 28/31/68 — el registro venía de "27 átomos / 66" y la
  portada "ÁTOMOS·26"; el faltante histórico era Icon container `574:150`.)* **Íconos = Material Symbols
  (jun-2026):** wrapper «Icon» `944:6` (6 Size) + librería «Glyph» `24:10626` (2.864 glifos snake_case,
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
  (código) quedó explícito entry por entry. ⚠️ PENDIENTE: nodeId del wrapper Icon `944:6` no
  resolvió vía MCP — confirmar en Figma (ver figma-build §2b).
- **A11y:** 0 fallas WCAG reales; `success-solid` = green-700; contraste de borde = excepción
  documentada (1.4.11). Cuatro gates limpios — `token-usage · ghost-check · lint-literals ·
  contrast-audit` — que **corren en el proyecto de gobernanza, NO en `NataliaRS/Viu`** (verificado
  jun-2026: ausentes en el repo de código; el gate del repo es el de 5 pasos: typecheck · test ·
  build · figma connect parse · build-storybook).
- **Batch jul-2026 (cierre — íconos residuales + Badge soft):** cerrada la cola de afinado de íconos/estructura — **Select** `26:293` (▾→`stat_minus_1`) · **Search** `26:347` (lupa vector→`search`) · **Nav** `233:19` (punto→Icon `home` swappable) · **Datepicker** `28:386`+**Date range** (calendario→`calendar_today`) · **Checkbox** `24:167` (✓→Glyph `check` 12px) · **Tab** `161:43` (+slot trailing `Icono fin`) · **Avatar** `19:90` (+`Type=Ícono` `account_circle`, SET 10→15, grid re-alineado sin auto-layout) · **Time picker** `409:6` (+`Estado=Abierto` a nivel componente, check Icon) · **Data table** `285:7` (search→instancia de molécula Search). **Badge `14:77`:** surface→sólido→**soft /100** (opaco+claro, texto /700, AA) + prop `Icono` leading. **Tokens nuevos:** primitiva `red/100` + 12 `feedback/{tono}-soft`/`-on-soft` (+ interino `neutral-solid`/`-on-solid`). Recetas/keys en figma-build §16; detalle en canon §Badge/§Íconos.
- **Pendientes — DECIDIDOS jun-2026, en cola de ejecución (orden sugerido):**
  1. ~~**B2** · sumar Eye/EyeOff al Icon de Figma~~ ✅ HECHO (jun-2026). Natalia los creó en Figma
     como `Visibility`/`Visibility_off`; el código se renombró a `Visibility`/`VisibilityOff`
     (alineado a Figma, mejor nombre semántico). Code Connect mapea `Visibility_off`→`VisibilityOff`.
  2. ~~**B3** · `.figma.tsx` de Icon container~~ ✅ HECHO (jun-2026). El gap de `style`/`tone` que
     surgió quedó **RESUELTO**: el componente se reconstruyó con paridad completa (círculo + `tone`
     ×8 + `appearance` filled/stroke + tamaños), ver code-build.
  3. ~~**A1** · actualizar la etiqueta de madurez de los componentes a la escala única
     Draft/Reviewed/Stable/Deprecated~~ ✅ HECHO (jun-2026). `ViuDocs.tsx` retipado + stories
     migradas (67 Stable, 2 Reviewed al ejecutar A1; hoy 74 Stable, 0 Reviewed — ver §6); tipo viejo `stable|beta|wip` obsoleto.
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
