# VIU — código: `@viu/design-tokens` + `@viu/ui` (repo `NataliaRS/Viu`, público)

> Numeración heredada del skill original (§14–16) para trazabilidad de referencias cruzadas.

## 14. Repo de código
Repo trabajado en sesiones web de Claude Code (rama `claude/*`). Storybook en vivo:
**https://nataliars.github.io/Viu/**

**Tokens (raíz):** `tokens/{primitives,semantic,scales,type-scale,grid}.json` espejan 1:1 las 5
colecciones (`figma-build.md` §13). `scripts/build-tokens.mjs` (sin deps) resuelve alias y emite
`dist/{tokens.css,tokens.json,tokens.js,.d.ts}`. Comando: `npm run build:tokens`.
- CSS: primitivos + scales + grid en `:root`; Semantic black-first (`:root`=Dark,
  `[data-theme="light"]`, `prefers-color-scheme`); Type Scale responsive (Mobile en `:root`, Desktop
  en `@media (min-width:1024px)` — el disparador 1024px es decisión de código; Figma cambia el modo
  por frame, no hay breakpoint oficial). Clases `.viu-type-*`, contenedor `.viu-grid`.
- Naming CSS: `color/bg/base`→`--color-bg-base`, `space/md`→`--space-md`. Derivados de código (NO son
  variables Figma): `--font-family-label` (=General Sans, tomado de la text style Label) y
  `--font-family-code` (=mono).

**Componentes:** `ui/` = paquete `@viu/ui` (React 18 + TS + CSS Modules). **Build = Vite lib
(`vite.lib.config.ts`) + `tsc -p tsconfig.build.json` para los .d.ts** → `dist/index.js` +
`dist/index.css` + tipos. Vitest, playground Vite, Storybook 8. Cada componente: `Componente.tsx` +
`.module.css` + `.stories.tsx` + `.figma.tsx` (Code Connect).
- **🔴 BUG CRÍTICO RESUELTO (jun-2026): tsup dejaba el paquete SIN ESTILOS.** El build viejo con tsup
  (`loader:{".module.css":"local-css"}`) emitía el CSS pero dejaba el mapeo de clases VACÍO en el JS
  (`var Button_default = {}`), así que `styles.button` era `undefined` → los componentes salían sin
  ninguna clase. **Storybook se veía bien (usa Vite desde fuente), pero el paquete publicado renderizaba
  sin marca en cualquier consumidor externo** (lo detectó Natalia viendo el prototipo en Pages: fondo
  negro [tokens] OK, pero botones/cards/banners planos). Fix: buildear con Vite lib (mismo motor que
  Storybook → hashea las clases consistentes en JS y CSS) + `tsc` para tipos. Verificación: tras
  buildear, `dist/index.js` debe referenciar clases hasheadas (`button_xxxx`) que EXISTAN en
  `dist/index.css` — no `{}`. Regla: cualquier cambio de build del paquete se valida consumiéndolo
  (el prototipo), no solo en Storybook.

**Hechos: 29 átomos + 35 moléculas + 9 organismos + 4 patrones = 73 componentes** *(jun-2026: C1
design-to-code COMPLETO 5/5 — +Kbd átomo; +SegmentedControl +ChoiceGroup +Combobox +DateRangePicker
moléculas. Paridad Figma↔código restaurada: 29/35/9 en ambos lados).*
- **Átomos (29):** Icon (Material Symbols vía ligadura; glyph legacy o Material directo), IconButton, Button, Badge, Link, Tag, Status, Pill,
  Chip, Notification badge, Avatar, Divider, Progress, Tooltip, Checkbox, Radio, Switch, Slider,
  Input, Skeleton, Spinner, Select, Step, Textarea, Tab, Rating, Image, Icon container, **Kbd**
  (`<kbd>`, JetBrains Mono; sombra inferior literal `0 1px 0 rgba(0,0,0,.45)` + `min-width:26px` =
  excepciones honestas del keycap, sin token).
- **Moléculas (30 componentes + 3 recetas Field):** FormField, Search, Tabs, Breadcrumb, Banner,
  Toast, Pagination, Nav, NavItem, Accordion, AccordionItem, List, ListItem, AvatarGroup, Stepper,
  Menu, MenuItem, Dropzone, FileRow, PasswordInput, TableRow, TreeItem, Toolbar, Quote, RichText,
  VideoEmbed, TimePicker, Datepicker, **SegmentedControl** (radiogroup sobre radios nativos; thumb
  activo = bg/elevated + shadow/raised; paddings off-grid de Figma 3/7px redondeados a tokens
  `3xs`/`xs` → misma altura externa 38px), **ChoiceGroup** (fieldset+legend; reusa Radio/Checkbox;
  unión discriminada radio→`value:string` / checkbox→`value:string[]`; helper vía aria-describedby),
  **Combobox** (reusa Search+MenuItem; patrón WAI-ARIA combobox+listbox: foco en el input,
  aria-activedescendant, ↑↓/Enter/Esc, filtrado, click-outside; opción activa = bg/hover por inline
  style para ganarle al `:hover` de MenuItem de forma robusta), **Datepicker + DateRangePicker**
  (ver abajo). Field/Input·Select·Textarea = recetas FormField+control (story `Fields`).
- **Datepicker / DateRangePicker — REFACTOR de reuso (jun-2026, pedido por Natalia; cross-check Figma
  `28:386` / `732:17`).** Espejan a Figma: el range picker **compone dos Datepicker** + un Calendar.
  En código se extrajeron **dos primitivos internos compartidos** (carpetas propias, NO exportados en
  `index.ts`): `Calendar/` (popover con header navegable + grilla; `mode:"single"|"range"`; single =
  círculo `bg/brand` + anillo `today` con `border/strong`; range = extremos círculo + banda
  `bg/brand-subtle`; lunes-primero, ES; remonta en cada open → `defaultMonth` siembra el mes) y
  `DateField/` (label + valor/placeholder + **glifo de calendario SVG inline** — en Figma el ícono es
  un vector dentro del campo, NO una instancia del set de íconos, así que va como SVG local, no
  depende del sistema de íconos). `Datepicker` = DateField + Calendar single; `DateRangePicker` = 2×DateField +
  Calendar range. `calendarUtils.ts` centraliza MONTHS/WEEKDAYS(`L M M J V S D`, dos M como Figma)/
  fmt/sameDay/monthCells. **OBSOLETO:** el Datepicker ya NO envuelve `<input type=date>` nativo; los
  campos del range ya NO son triggers read-only duplicados (eran divergencia). Accesibilidad: DateField
  asocia `<label htmlFor>` (nombre accesible = label; los tests del range pasaron de `"Hasta: …"` a
  `"Hasta"` + assert del valor por `getByText`).
- **Organismos (9):** Card, EmptyState, PageHeader, Footer, Table, TreeView, Modal, Drawer, Popover.
  Overlays comparten `src/overlay/useFocusTrap.ts` (foco atrapado + Esc + restore) y `useScrollLock`;
  Modal/Drawer van por `createPortal` con scrim `alpha/black-72` en `z/modal`; Popover es anclado
  (trigger slot + caret + click-outside) en `z/popover`.
  - **Card — REESCRITA jun-2026 (props estructuradas, paridad con Figma `434:6`).** Estaba portada
    como contenedor genérico (solo `surface`/`orientation`/`media`/`footer`/`badge`/`accent`+children)
    → había **perdido ~15 de las 20 props** de la Card de Figma. Ahora expone toda la anatomía como
    props opcionales: `icon` (caja 48×48), `tags`, `eyebrow`, `title`, `subtitle`, `action`, `body`,
    `link`, `primaryAction`/`secondaryAction`, `author{name,meta,avatar}` (tras divisor), + `children`
    como escape hatch. Superficies fieles a Figma: Elevated=`bg/elevated`+`shadow/raised`,
    Outlined=`bg/base`+`border/default`, Filled=`bg/subtle`. Estados: focus=outline `border/focus`;
    **selected=`bg/brand-2-subtle`+inset `border/brand-2`** (superficie+signifier, P5);
    disabled=texto `text-disabled`+no interactiva. Disposición `media-bottom` (Abajo) = `flex-direction:
    column-reverse` (DOM [media,content]). Clickable → `role=button`+tabIndex+Enter/Espacio.
    **`titleSize` (jun-2026):** prop que elige el paso de la escala tipográfica del sistema para el
    título — `title-s|m|l · headline-s|m|l · display-s|m|l · oversize-s|m|l` (12, default `title-s`).
    Aplica la clase global `viu-type-${titleSize}` al `<h3>` (que aporta familia/peso/line-height/
    tracking + responsive); el CSS `.title` solo lleva color/margin. **Patrón reusable:** para exponer
    un tamaño de la type scale como prop, NO hardcodees font-size — bindeá la clase `viu-type-*`.
  - **LECCIÓN (design-to-code de componentes ricos):** exponé la anatomía de Figma como **props
    estructuradas opcionales**, NO la colapses a slots genéricos + children — colapsar pierde las
    props de texto/toggle del componente de Figma y rompe la paridad. Verificá `componentPropertyDefinitions`
    del set ANTES de portar.
  - **TreeView/TreeItem (jun-2026):** TreeView es contenedor compositional (role=tree); el ejemplo
    canónico es el árbol Proyectos de Figma con expand/collapse + render de hijos REAL (estado por
    nodo con Set; el ejemplo viejo estaba roto: handler vacío + sin hijos). TreeItem sumó props
    `disabled`, `checkbox`/`checked`/`onCheckedChange` (reusa el atom Checkbox antes del chevron) y
    `aria-level`; selected pasó a `bg-brand-subtle` + chevron `text-brand`; Hoja = sin chevron (spacer
    16px). Orden: checkbox → chevron/spacer → icon → label. Usa el glifo `Folder` para carpetas.
- **Patrones (4):** AppShell (sidebar+topbar+content), Form (layout + banner + acciones), Wizard
  (Stepper + paso + nav controlada), DataTable (toolbar + Table + paginación + estados). Son
  componentes de layout reusables que componen el resto (no stories sueltas).

**Deudas conocidas:** ~~Slider solo modo Único~~ → **RESUELTO (B4, jun-2026):** Slider soporta `range`
(doble thumb, banda entre extremos) vía unión discriminada `SingleSliderProps | RangeSliderProps`;
`onValueChange([lo,hi])`, clamping lo≤hi, dos `<input type=range>` superpuestos (thumbs grabbables por
z-index dinámico). ~~Tooltip/Popover sin colisión/flip~~ → **RESUELTO (B5, jun-2026):** hook compartido
`src/overlay/useFlipSide.ts` voltea al lado opuesto cuando el preferido se sale del viewport (Tooltip
mide en hover/focus; Popover en open + scroll/resize). **C1 design-to-code COMPLETO (jun-2026, 5/5):** ✅ Kbd `721:7` + ✅ SegmentedControl `724:28` +
✅ ChoiceGroup `728:35` + ✅ Combobox `730:40` + ✅ DateRangePicker `732:120` portados a `@viu/ui`.
**Paridad Figma↔código restaurada** (29 átomos / 35 moléculas / 9 organismos en ambos lados). **Icon container — Code
Connect creado (jun-2026, B3, `.figma.tsx` → nodo `574:150`).
Gap de paridad PENDIENTE:** el nodo Figma tiene 3 ejes (Size × `style` Filled/Stroke × `tone`
Brand/Neutral/Inverse/Danger/Warning/Success/Info/Disable = 48 variantes), pero el componente de
código solo expone `size`; Code Connect mapea solo `size`. Falta llevar `style`/`tone` al código si
se quiere paridad total. **Eye/EyeOff → RESUELTO (jun-2026, B2):** Natalia los creó en Figma como
`Visibility`/`Visibility_off` (nodos 726:3273/726:71) y el código se renombró `Eye`→`Visibility`,
`EyeOff`→`VisibilityOff` (mejor nombre semántico, alineado a Figma como fuente de verdad); Code
Connect mapea `Visibility_off`→`VisibilityOff`. **B1 → RESUELTO (jun-2026):** migración de disabled
por opacidad a tokens explícitos completa; eran solo 4 componentes (ListItem/MenuItem/Tab +
TimePicker/PickerField), no ~15 — el resto ya consumía `bg-disabled`/`text-disabled`. Patrón:
rellenos→`bg-disabled`+`text-disabled`; transparentes→solo `text-disabled` (interaction §2).

**Iconos — MIGRADO a Material Symbols (jun-2026):** `Icon` dibuja el **SVG oficial de Material
Symbols** (repo `google/material-design-icons`, estilo *Outlined* 400, grade 0, viewBox
`0 -960 960 960`, `fill: currentColor`) — **sin dependencia de fuente**. Los paths viven en
`Icon/glyphs.tsx` (`symbolPaths`). La prop `glyph` acepta los 11 nombres legacy (resueltos a Material:
Chevron→`chevron_right`, Plus→`add`, Alert→`warning`, VisibilityOff→`visibility_off`…) **o** un nombre
Material embebido directo (`error`). **Direccionales:** el baseline del código es derecha →
Chevron→`chevron_right`/Arrow→`arrow_forward`, y las rotaciones CSS existentes (rotate 90→abajo…) se
conservan SIN tocar CSS (en Figma el baseline es abajo, por eso allí Chevron→`stat_minus_1`).
**Sumar un ícono nuevo:** copiar el path de `symbols/web/<name>/materialsymbolsoutlined/<name>_24px.svg`
del repo a `symbolPaths` (clone sparse+blobless: `git clone --depth 1 --filter=blob:none --sparse`).
**Decisión (jun-2026):** primero se migró a la *fuente* Material Symbols (ligadura) pero, con acceso al
repo oficial (github sí está en allowlist, figma no), se pasó a SVG embebido — más robusto para
consumidores (sin FOUT ni texto de ligadura, sin requerir cargar fuente). `data-icon` = selector estable
en tests; el SVG decorativo va `aria-hidden`.

### Regla de consumo de tokens (código) — CERO valores mágicos
Un componente nunca usa hex ni números sueltos. Mapa de tokenización para CADA componente nuevo:
- color → SOLO Semantic (`--color-bg|text|border|feedback-*`). Nunca primitivos de color ni hex.
- espaciado/padding/gap → `--space-*` (Scales) · radios → `--radius-*` (Scales) · z-index → `--z-*`.
- transiciones → `transition-duration: var(--motion-duration-micro)` + `transition-timing-function:
  var(--motion-ease-standard)` (Scales). Animaciones largas → `--motion-duration-loop`.
- bordes/líneas → `--border-width-default` (1px) / `--border-width-strong` (2px). Focus ring →
  `outline: var(--border-width-strong) solid var(--color-border-focus); outline-offset:
  var(--space-3xs)`.
- tamaño de iconos → `--icon-size-*` (xs16/sm20/md24/lg32/xl40/2xl48).
- tipografía → `--font-size-*` (Type Scale, responsive),
  `--font-family-{display|body|label|code}`, `--font-weight-*`,
  `--line-height-{tight|snug|relaxed}`, `--tracking-{tight|normal|wide}`. (Micro-labels en mayúscula:
  `--tracking-wide`.)
- **Matiz honesto:** en código SÍ se consumen ciertos primitivos sin capa semántica (font-family,
  font-weight, line-height, tracking, icon-size, font-size numéricos). La regla Figma "nunca
  Primitives" aplica a COLOR; en tipografía/dimensión esos primitivos SON los tokens consumibles.
- **Literales aceptados** (también literales en Figma, no hay token): bordes `1.5px` de
  Button/IconButton; alturas de control 32/40/48; tamaños de Avatar 24–64; `2.5px` del Spinner MD.

**Consumir desde JS/TS** (`@viu/design-tokens`): claves con slash.
`tokens.semantic.{dark,light}["color/bg/base"]` · `tokens.scales["space/md"]` ·
`tokens.type.{mobile,desktop}["font-size/title-l"]` · `tokens.grid["grid-columns"][mode]`.

### CI / deploy (gotchas reales, jun-2026)
- `.github/workflows/deploy-storybook.yml` → build tokens + `build-storybook -w ui` + GitHub Pages.
  **Publica DOS cosas en el mismo Pages (jun-2026):** Storybook en `/Viu/` + la app de ejemplo
  `examples/prototype` en `/Viu/prototype/` (un repo = un solo Pages). El workflow ahora también corre
  `build -w @viu/ui` (dist que consume el prototipo) + `build -w @viu/prototype` y copia
  `examples/prototype/dist → ui/storybook-static/prototype` antes del upload. El prototipo usa
  Vite `base:"/Viu/prototype/"` en build (y `/` en dev). **Acople a tener en cuenta:** si el build del
  prototipo falla, el deploy entero (incl. Storybook) falla. Plantilla de consumo del DS: `@viu/ui` +
  tokens vía `@viu/design-tokens/css` (alias en monorepo) + `@viu/ui/styles` + `data-theme`.
  Pages se habilita 1 vez (Settings→Pages→Source: GitHub Actions). La GitHub App de Claude Code
  necesita permiso **Contents: write**.
- **Rama de trabajo actual = `claude/viu-design-system`** (renombrada desde `kind-wozniak`,
  jun-2026). Es la única rama; se commitea y pushea ahí y cada batch sale en vivo solo.
- **GOTCHA: deploy DOBLEMENTE branch-gated.** La rama debe pasar DOS puertas independientes: (1)
  `push.branches` del yaml (trigger) y (2) la política "Deployment branches" del environment
  `github-pages` (Settings→Environments). Si falta en (1) no dispara; si falta en (2) el `build` pasa
  pero el job `deploy` falla en el gate (~30s). La (2) solo la configura el usuario en GitHub UI.
  Recomendado: environment en "No restriction" (o patrón `claude/*`). Renombrar la rama exige
  actualizar las DOS puertas + el `branches:` del yaml.
- **Sandbox git proxy:** permite pushear a la rama provisionada (`claude/*`) pero da HTTP 403 al
  crear/borrar ramas arbitrarias. Renombrar/borrar ramas remotas se hace desde GitHub UI.
- **`actions/deploy-pages@v4` puede fallar con timeout transitorio de OIDC** ("Failed to get ID
  Token… id-token: write") aunque el permiso ESTÉ bien. NO es config: se cura con
  `rerun_failed_jobs`.
- **REGLA: verificá `conclusion` del run, no solo que arranque.** Un run `in_progress` o `status:
  completed` NO significa éxito — leé `conclusion: success`. Si falla,
  `get_job_logs(failed_only,return_content)` da el error real (los logs viejos 404ean al expirar; leé
  el run fresco). Error cometido dos veces: declarar "deployado" sin chequear la conclusión.
- `concurrency.group: "pages"` → hay UN solo sitio publicado; si dos cosas deployan casi a la vez, el
  último gana. La salida de `actions_list` runs es ENORME → filtrar con `per_page:1` + filtro de
  rama, o jq por `head_branch`/`conclusion`.
- **RUTINA OBLIGATORIA post-push (jun-2026, pedida por Natalia): verificar SIEMPRE que el cambio llegó
  a Storybook, en cada push.** Tras pushear, consultar el run de `deploy-storybook.yml` del commit
  pusheado (GitHub MCP `actions_list list_workflow_runs` filtrando por rama; luego `list_workflow_jobs`
  del run) y confirmar que **AMBOS jobs = `conclusion: success`**: `build` (pasos *Build Storybook* +
  *Upload artifact*) **y** `deploy` (paso *Deploy to GitHub Pages*). Recién ahí declarar "publicado",
  con el sha + timestamp. NO alcanza con que el gate local pase ni con que el run "arranque".
- **RUTINA OBLIGATORIA: cross-check con Figma ANTE CUALQUIER CAMBIO (jun-2026, pedida por Natalia).**
  Todo cambio que toque la apariencia/anatomía/estados/props de un componente se valida **contra
  Figma como fuente de verdad ANTES de declararlo hecho** — no basta con aplicar una convención "de
  memoria" o dictada; hay que confirmarla nodo-a-nodo en Figma. Método (file `Componentes`
  `kjEg0KpLID4cH00DruERTN`; node-ids en `figma-build.md`):
  1. `get_variable_defs(nodeId)` del set → confirma QUÉ variables/tokens usa (p.ej. que existan
     `bg/brand-2-subtle` #5a55a8 y `bg/brand-subtle` #b5262e).
  2. `get_screenshot(nodeId, enableBase64Response:true)` del set → confirma QUÉ estado mapea a QUÉ
     token (columnas/filas = variantes: Default/Hover/Seleccionado/Deshabilitado). **El sandbox
     bloquea egress a `figma.com`**, así que `curl` del `image_url` falla ("Host not in allowlist") →
     SIEMPRE pedir el screenshot con `enableBase64Response:true` para verlo inline.
  3. Comparar el `bg`/`color` real de cada estado contra el `.module.css` y dejar registrado el
     resultado (✓ por componente, con el sha). Si diverge, es bug de código, no de la convención.
  Verificado así jun-2026 la paridad de estados (Tree `411:19` · List `165:41` · Table `195:58` ·
  Nav `233:19` · Menu `170:21` · Pill `16:63` · Chip `17:67`): Hover=índigo / Sel.=crimson, 1:1.
- **Si CI está verde pero el usuario "no ve cambios":** es caché del CLIENTE, no el pipeline. Verificado
  jun-2026: el build NO genera service worker; los assets van hasheados; GitHub Pages cachea el HTML
  ~10 min. Desde el sandbox NO se puede abrir `nataliars.github.io` (host fuera del allowlist → 403),
  así que no puedo inspeccionar el sitio vivo — la verificación es por CI. Bypass para el usuario:
  abrir en **incógnito**, o URL con query-bust `…/Viu/?v=<ts>`, o DevTools→Network "Disable cache".
- **Sesión web efímera:** el container clona limpio → correr `npm install` en la raíz ANTES del gate
  (si falta `node_modules`, `tsc` falla con "Cannot find type definition file"). `dist/tokens.css`
  (raíz) lo consume `preview.tsx` vía `../../dist/tokens.css`; si falta, `npm run build:tokens` en la
  raíz.

**Correcciones halladas en auditoría (ya aplicadas en código):** `bg/strong` Light = neutral/100 (no
200) · `breakpoint/xs`=320 (no 375) · Type Scale responsive (no solo Desktop) → corrige iniciales de
Avatar LG (18px Mobile) · letterSpacing de Figma en % → micro-labels (Badge/Tag/Status/Label-S) usan
`tracking/wide`=0.04em (no 4px).

## 15. Estándar de Storybook (presentación + docs) — OBLIGATORIO para CADA componente nuevo
El Storybook es el producto de marca, no un catálogo. Reglas que TODO componente debe cumplir:
- **Chrome de marca (ya montado, no re-hacer):** `.storybook/theme.ts` + `manager.ts` (dark, crimson,
  fuentes VIU) y `parameters.docs.theme` (Docs oscuro). El decorator de `preview.tsx` es
  *viewMode-aware* (sin bloques 100vh en Docs).
- **Fuentes de marca (jun-2026):** los tokens declaran las FAMILIAS pero no cargan archivos → hay que
  cargar webfonts. Cargadas vía `<link>`+preconnect en: `.storybook/preview-head.html` (canvas SB),
  `examples/prototype/index.html` (prototipo), y documentadas en `ui/README` para consumidores. Google
  Sans (body) + JetBrains Mono (code) por Google Fonts; General Sans (label) + Satoshi (fallback display)
  por Fontshare (gratis). **PP Neue Montreal (display) es comercial — sin CDN libre**; el stack cae a
  Satoshi → system-ui hasta sumar su `@font-face` con licencia.
- **Página de docs reutilizable:** `.storybook/ViuDocs.tsx` seteada global (`parameters.docs.page`).
  Lee `parameters.viu` del meta y renderiza: Título + status badge + link "Ver en Figma" → Overview →
  Cuándo usar / Evitar (2 cards) → Vista general (Primary) → Propiedades (Controls) → Anatomía →
  Accesibilidad → Do & Don't (2 cards) → Ejemplos (Stories). Campos faltantes degradan elegante.
  **Status badge — escala única (A1, jun-2026):** `Draft`→feedback-warning · `Reviewed`→feedback-info ·
  `Stable`→feedback-success · `Deprecated`→feedback-danger (mapa `STATUS` en ViuDocs.tsx). Migración
  hecha: el sistema tenía `stable`(67)+`beta`(2) → `stable→Stable`, `beta→Reviewed` (las 2 `beta`
  eran Tooltip y Slider; al cerrarse B4/B5 jun-2026 ambos pasaron a `Stable` → hoy 69 Stable, 0
  Reviewed). El tipo viejo `"stable"|"beta"|"wip"` quedó
  OBSOLETO.
- **Cada `meta` DEBE incluir** (espeja el doc canónico de Figma):
  ```ts
  parameters: { viu: {
    status: "Draft" | "Reviewed" | "Stable" | "Deprecated", // escala única (A1, jun-2026)
    figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=<id>",
    overview: "1–2 frases: qué es y para qué.",
    whenToUse: ["…"], whenNotToUse: ["… → usá <otro componente>"],
    anatomy: ["Parte — token/rol", …],
    accessibility: ["rol/teclado/aria; no comunicar solo por color", …],
    dos: ["…"], donts: ["…"],
  } }
  ```
  Ejemplos canónicos: `Button` e `Input` (copiar su estructura).
- **Naming / IA:** título `Components/<Atoms|Molecules|Organisms|Patterns>/<Nombre>`. `tags:
  ["autodocs"]` siempre. El `storySort` (preview.tsx) es explícito con `method:"alphabetical"` +
  `order` anidado: top-level `Get started → Foundations → Components`; Foundations en orden pedagógico
  (`Tokens, Colors, Typography, Spacing & Radius, Grid, Effects`); Components por tier atómico
  (`Atoms, Molecules, Organisms, Patterns`); dentro de cada tier, alfabético. **OJO:**
  `method:"alphabetical"` también ordena las STORIES dentro de un componente alfabéticamente — la
  "Vista general (Primary)" de ViuDocs muestra la story que quede primera alfabéticamente. Sin el
  `method`, los tiers caían en orden de carga (se veía desordenado).
- **Convención de stories:** `Playground` (con controles) · variantes nombradas · `States`/`Gallery`
  con `parameters.controls.disable` cuando es una grilla. Estado controlado con `useState` en `render`
  para interactivos.
- **Props slot (ReactNode) en Controls:** los slots (`icon`, `leadingIcon`, `trailingIcon`, `link`,
  `action`, `avatar`) tienen `control: false` GLOBAL en `preview.tsx`. Si agregás un slot con otro
  nombre, sumalo a esa lista global (no a `children`). **Para hacer un slot toggleable en una story:
  el `control:"boolean"` a nivel story NO vence al disable global — NI con `mapping`** (confirmado
  jun-2026: Card con `showX` renderiza; Banner/Toast/EmptyState con `mapping`+nombre real NO mostraban
  el control). La nota vieja que recomendaba `mapping` con el nombre real era FALSA. → **Único método
  que funciona: usá una KEY que NO esté en la lista global** (`showLink`/`showAction`/`showIcon`) en una
  interface demo-args, y mapeá `showX → prop` en el `render`. Slots NO listados (footer, actions, media,
  badge, tags…) sí funcionan con nombre real como boolean. Patrón completo → §15.
- **Foundations:** token-driven (leen `dist/tokens.js`, no hardcodear). Patrones ya hechos: swatches
  copy-to-click, matriz de contraste WCAG, dark/light lado a lado, galerías de
  spacing/radius/type/effects/grid. Al agregar tokens nuevos → sumar su visualización.
- **Entrada:** `src/Introduction.mdx` (`Get started/Introduction`) — actualizar links/uso si cambia
  el paquete.

## 16. Convenciones de moléculas / organismos / patrones (código)
- **Composición:** una molécula importa y compone los átomos del paquete (`../Atom/Atom`), nunca los
  re-implementa. Título `Components/Molecules/<Nombre>` (idem Organisms/Patterns). Carpeta
  `ui/src/<Nombre>/`.
- **Props controladas (convención):** estado + handler — `value`/`onValueChange`,
  `checked`/`onCheckedChange`, `open`/`onOpenChange`. Acciones one-shot: `onClose` · `onClear` ·
  `onRemove`. Datos por array de items tipados (ej. `Tabs.items`, `Breadcrumb.items`).
- **Gotchas de TypeScript (ya pegados):**
  - Prop `title`/`open`/`color` chocan con `HTMLAttributes`. Si tu prop es `ReactNode`/custom →
    `extends Omit<HTMLAttributes<HTMLDivElement>, "title">`.
  - `satisfies Meta<typeof C>` EXIGE `args` en el meta si el componente tiene props requeridas sin
    default (ej. Tabs, AppShell `sidebar`+`children`, Form/Wizard/DataTable). Agregá `args` mínimos
    aunque uses `render`.
  - **Props en UNIÓN DISCRIMINADA → `args` colapsa a `never` (gotcha real, pegó 3× en jun-2026:
    Slider, SegmentedControl, ChoiceGroup).** `satisfies Meta<typeof C>` sobre un componente con props
    `A | B` hace que Storybook intersecte los miembros y tipe `args: never` → toda story (incluso
    `render`-only) tira TS2322 "args is missing / never". Fix: tipá el meta contra UN miembro concreto
    (`satisfies Meta<SingleSliderProps>` / `Meta<RadioChoiceGroupProps>`) y manejá los otros modos por
    `render`. Si además hay props requeridas, sumá `args` mínimos del miembro elegido.
  - **Controles usables para componentes con props `ReactNode`/slots (Card, y cualquier rico) —
    RESUELTO Y VERIFICADO jun-2026.** Los Controls de Storybook no editan props `ReactNode` (slots):
    para poder mostrar/quitar cada parte desde el panel "Propiedades", se define una interface de args
    "demo" con primitivas (booleanos toggle + `text` para copy + `inline-radio` para variantes) y se
    mapean a las props reales en `render` (texto vacío `|| undefined` = quita esa parte). Receta que
    FUNCIONA:
    1. `satisfies Meta<DemoArgs>` + **MANTENÉ `component: C`** + `render` + `args`. (Sin `component`,
       ViuDocs `<Controls/>` no se engancha al `<Primary/>` → los controles no actualizan el render.)
    2. Para que `Meta<DemoArgs>` acepte `component: C`, los args demo deben ser asignables a las props
       → si un toggle choca de TIPO con su prop (ej. prop `author: CardAuthor` vs arg boolean), usá una
       key distinta (`showAuthor`). `boolean`/`string` SÍ son asignables a `ReactNode`, esos no chocan.
    3. `parameters.controls.include:[...]` lista solo los args demo.
    4. **CAUSA RAÍZ del bug "icon/link/action no tienen toggle" (verificada): `.storybook/preview.tsx`
       desactiva GLOBALMENTE el control de los args llamados `icon`, `link`, `action`, `avatar`,
       `leadingIcon`, `trailingIcon`** (`argTypes: { icon: { control: false }, … }` — puesto para que
       esos slots no muestren el "objeto React" feo en TODOS los componentes). Ese disable global gana
       sobre el `control:"boolean"` del story. → Para un playground con toggles de esos slots, **usá una
       key que NO esté en esa lista** (`showIcon`/`showLink`/`showAction`) y el `render` mapea
       `showIcon → icon`. NO toques el `preview.tsx` global (lo necesitan los otros componentes).
    5. **NO uses `name:"icon"` (etiqueta linda) en esos args:** duplica el display-name contra el
       argType que docgen ya generó para la prop real → colapsa/oculta controles. Dejá la etiqueta
       como la key (`showIcon`). Trade-off aceptado: etiqueta `showIcon` en vez de `icon`.
    6. Las demás props (las que NO están en la lista global de §4 ni chocan de tipo) conservan su
       nombre real y funcionan (media, badge, tags, title, subtitle, body, primaryAction…). Mantené
       `tags:["autodocs"]`.
    *(Historia: diagnostiqué mal 2 veces antes de hallar §4 — primero "docgen deshabilita ReactNode"
    [falso: media/badge andaban], luego "sacar component" [rompió el binding] y "name override" [colapsó
    el panel]. El verdadero culpable era el disable global del preview.)*
    7. **ROLLOUT COMPLETO (jun-2026): los 14 ricos de Tier 1 tienen este playground** — Card, Banner,
       Toast, EmptyState, ListItem, MenuItem, NavItem, AccordionItem, PageHeader, Dropzone, FileRow,
       Chip, Modal, Drawer, Popover. **+ TreeView y TreeItem** (sumados después, mismo patrón:
       TreeView con `showCheckboxes`/`showIcons` + árbol Proyectos de Figma; TreeItem con
       `expansion`/`state`/`level`/`showIcon`/`checkbox` + galería States). Props `children`/`title`
       REQUERIDAS se incluyen en los demo-args (con `name:"label"`/`"body"` opcional para etiqueta linda
       — seguro porque no chocan con otra prop).
    8. **Overlays (Modal/Drawer/Popover):** portan a `<body>` con scrim → NO renderizar abiertos en
       Docs (taparían la página). El `render` usa un trigger + `useState` para abrir; `open` (y el
       `trigger` de Popover) se incluyen en los demo-args para satisfacer las props requeridas pero van
       **state-driven/fijos y excluidos de `controls.include`**.
  - `cx(..., cond && clase)` con `cond: ReactNode` rompe (puede ser null/0). Usá `cond ? clase :
    false`.
  - Merge de refs: `useRef<T | null>(null)` (mutable) y `(ref as any).current = node` para forwardear.
  - **Reuso con override de `role`/atributos:** los átomos ponen `role="…"` ANTES de `{...rest}` (ej.
    Search `role="searchbox"`, MenuItem `role="menuitem"`) → al reusarlos podés pisar el role vía
    props (Combobox: Search→`role="combobox"`+ARIA, MenuItem→`role="option"`+`tabIndex={-1}`). Para
    forzar un estado visual que el átomo solo da por `:hover` (ej. opción activa por teclado), pasá
    `style={{background:"var(--color-bg-hover)"}}` inline — le gana al `:hover` sin pelear con el
    orden de los CSS modules.
- **Superficies flotantes (Toast/Popover/Menu/Modal):** `bg/elevated` + `border/subtle` +
  `box-shadow: var(--shadow-overlay)` + `radius/surface`. Capa con `z/*` correspondiente.
- **Overlays con foco/scrim (Modal/Drawer/Popover — aprendido jun-2026):**
  - Hook compartido `src/overlay/useFocusTrap.ts` (NO exportado del index): `useFocusTrap(active,
    ref, onDismiss, {closeOnEsc})` = foco al primer focusable al abrir + Tab/Shift+Tab cíclico + Esc +
    restore de foco al disparador. Handlers leídos por `ref` interno y deps `[active, ref]` → NO
    re-foca en cada render del padre (bug si ponés `onDismiss` en deps con arrow inline). +
    `useScrollLock(active)` para Modal/Drawer.
  - Modal/Drawer: `createPortal(…, document.body)`, scrim full-bleed con `var(--alpha-black-72)` (NO
    hay token semántico de scrim; el primitivo alpha es la excepción honesta) en `z/modal`;
    `role=dialog` + `aria-modal` + `aria-labelledby`(title)/`aria-describedby`(subtitle); dialog
    `tabIndex=-1`; cierre por scrim con `onMouseDown` + `e.target===e.currentTarget` (no cierra al
    arrastrar desde adentro).
  - Popover: anclado (NO portal) — `position:relative` root con slot `trigger` + panel `absolute`
    `z/popover`; non-modal pero reusa el focus-trap; cierre extra por click-outside (`pointerdown`
    capture, fuera del root). Caret = cuadrado rotado 45° (literal 10px, no hay token de caret).
  - **Flip/colisión (B5, jun-2026):** hook compartido `src/overlay/useFlipSide.ts` (NO exportado del
    index) — `useFlipSide(preferred)` devuelve `{side, recompute}`; `recompute(anchor, floating)` mide
    rects contra el viewport (gap 8px) y voltea al lado opuesto solo si el preferido no entra Y el
    opuesto sí. Popover llama `recompute` en open + listeners scroll/resize; Tooltip en
    `onPointerEnter`/`onFocusCapture` (la burbuja vive en DOM con `opacity:0`, mide siempre). Misma
    lógica para ambos. En jsdom los rects son 0 → puede resolver al lado por defecto; no romper tests.
  - Props controladas: Modal/Drawer `open`+`onClose`; Popover `open`+`onOpenChange`. `size` Modal
    SM/MD/LG = max-width 400/520/680; Drawer `side` right/left, 420px.
  - Tokens confirmados por nodo: scrim `--alpha-black-72` `#0a0a0bb8` · `--shadow-overlay` ·
    `--radius-surface`=12 · `--z-modal`=1400 · `--z-popover`=1500. `bg/elevated` hoy lee `#2e2e31` en
    los nodos — consumir SIEMPRE el token, no el hex.
- **Mensajes con tono (Banner/Toast/…):** mapear tono→glifo: info/neutral→Info, success→Check,
  warning/danger→Alert (`warning`). Con Material Symbols podés pasar cualquier símbolo directo
  (p.ej. `error` para danger); si lo usás, sumalo al `icon_names=` del `<link>` (subset de la fuente).
- **Patrones de a11y por tipo:**
  - Tabs → `role=tablist` + roving tabindex (activa=0, resto=-1) + flechas; `aria-selected`; conectar
    `aria-controls` al panel.
  - Navegación (Breadcrumb/Nav) → `<nav aria-label>`; actual con `aria-current`; separadores
    `aria-hidden`.
  - Feedback transitorio (Toast) → `role=status` + `aria-live=polite`. Persistente (Banner) →
    `role=status`.
  - Form (FormField) → label asociado por `htmlFor`/`id`; error como texto (no solo color) +
    `aria-invalid` en el control.
- **`Field/*` de Figma (Input/Password/Select/Textarea):** = `FormField` + el control correspondiente.
  NO crear componente nuevo salvo que el diseño agregue estructura propia; por defecto, componer
  `FormField` con `<Input>`/`<Select>`/`<Textarea>` (Password = Input con toggle de visibilidad).
- **Patrones (código):** en Figma son frames de composición bajo `Pattern ·` (Doc 1024-wide con
  `_Header`/`_Footer` + "Anatomía" + secciones de copy). En CÓDIGO se construyen como componentes de
  layout reusables (carpeta propia, 4 archivos, título `Components/Patterns/<Nombre>`), NO como
  stories sueltas: exponen slots (`sidebar`/`topbar`/`children` en AppShell; `banner`/`actions`/
  `children` en Form; `steps`/`current`/`onStepChange` en Wizard; `toolbar`/`header`/`pagination`/
  `empty` en DataTable) y la STORY los compone con los átomos/moléculas/organismos reales para
  reproducir el ejemplo del Doc. El copy de `parameters.viu` se saca casi literal de las secciones del
  Doc de Figma. Code Connect: `figma.connect` al nodo del frame Doc (sin props, solo `example`). KPI
  tiles / brand / celdas de tabla en stories van con `style={{…var(--token)…}}` inline — siempre
  tokens, nunca hex.
- **Verificación obligatoria por batch:** `npm install` si el container es nuevo → `typecheck` ·
  `test` · `build` (lib) · `figma connect parse` · `build-storybook`. Todo verde antes de commitear.
