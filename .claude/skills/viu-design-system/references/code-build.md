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

**Componentes:** `ui/` = paquete `@viu/ui` (React 18 + TS + CSS Modules). tsup→dist, Vitest,
playground Vite, Storybook 8 (react-vite + addon-a11y + switch de tema). Cada componente:
`Componente.tsx` + `.module.css` + `.stories.tsx` + `.figma.tsx` (Code Connect).

**Hechos: 29 átomos + 33 moléculas + 9 organismos + 4 patrones** *(jun-2026: +Kbd átomo,
+SegmentedControl +ChoiceGroup moléculas — C1 design-to-code en curso, 3/5).*
- **Átomos (29):** Icon (10 glifos, +Visibility/VisibilityOff), IconButton, Button, Badge, Link, Tag, Status, Pill,
  Chip, Notification badge, Avatar, Divider, Progress, Tooltip, Checkbox, Radio, Switch, Slider,
  Input, Skeleton, Spinner, Select, Step, Textarea, Tab, Rating, Image, Icon container, **Kbd**
  (`<kbd>`, JetBrains Mono; sombra inferior literal `0 1px 0 rgba(0,0,0,.45)` + `min-width:26px` =
  excepciones honestas del keycap, sin token).
- **Moléculas (29 componentes + 3 recetas Field):** FormField, Search, Tabs, Breadcrumb, Banner,
  Toast, Pagination, Nav, NavItem, Accordion, AccordionItem, List, ListItem, AvatarGroup, Stepper,
  Menu, MenuItem, Dropzone, FileRow, PasswordInput, TableRow, TreeItem, Toolbar, Quote, RichText,
  VideoEmbed, TimePicker, Datepicker, **SegmentedControl** (radiogroup sobre radios nativos; thumb
  activo = bg/elevated + shadow/raised; paddings off-grid de Figma 3/7px redondeados a tokens
  `3xs`/`xs` → misma altura externa 38px), **ChoiceGroup** (fieldset+legend; reusa Radio/Checkbox;
  unión discriminada radio→`value:string` / checkbox→`value:string[]`; helper vía aria-describedby).
  Field/Input·Select·Textarea = recetas FormField+control (story `Fields`).
- **Organismos (9):** Card, EmptyState, PageHeader, Footer, Table, TreeView, Modal, Drawer, Popover.
  Overlays comparten `src/overlay/useFocusTrap.ts` (foco atrapado + Esc + restore) y `useScrollLock`;
  Modal/Drawer van por `createPortal` con scrim `alpha/black-72` en `z/modal`; Popover es anclado
  (trigger slot + caret + click-outside) en `z/popover`.
- **Patrones (4):** AppShell (sidebar+topbar+content), Form (layout + banner + acciones), Wizard
  (Stepper + paso + nav controlada), DataTable (toolbar + Table + paginación + estados). Son
  componentes de layout reusables que componen el resto (no stories sueltas).

**Deudas conocidas:** ~~Slider solo modo Único~~ → **RESUELTO (B4, jun-2026):** Slider soporta `range`
(doble thumb, banda entre extremos) vía unión discriminada `SingleSliderProps | RangeSliderProps`;
`onValueChange([lo,hi])`, clamping lo≤hi, dos `<input type=range>` superpuestos (thumbs grabbables por
z-index dinámico). ~~Tooltip/Popover sin colisión/flip~~ → **RESUELTO (B5, jun-2026):** hook compartido
`src/overlay/useFlipSide.ts` voltea al lado opuesto cuando el preferido se sale del viewport (Tooltip
mide en hover/focus; Popover en open + scroll/resize). **C1 design-to-code EN CURSO (jun-2026, 3/5):** ✅ Kbd `721:7` + ✅ SegmentedControl `724:28` +
✅ ChoiceGroup `728:35` portados a `@viu/ui`. Faltan: Combobox `730:40` (reusa Search+MenuItem),
Date range picker `732:120` (reusa Datepicker ×2 + calendario custom) — detalle/IDs en
figma-build §2b/§14. **Icon container — Code
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

**Iconos:** SVG stroke a mano (`currentColor`) — el sandbox bloquea descargar assets de Figma;
reemplazables por los exportados.

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
  nombre, sumalo a esa lista global (no a `children`). Para hacer un slot toggleable en una story
  puntual: `argTypes: { link: { control: "boolean", mapping: { true: <Nodo/>, false: undefined } } }`
  y `args: { link: false }` (ej. Banner).
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
  - `cx(..., cond && clase)` con `cond: ReactNode` rompe (puede ser null/0). Usá `cond ? clase :
    false`.
  - Merge de refs: `useRef<T | null>(null)` (mutable) y `(ref as any).current = node` para forwardear.
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
- **Mensajes con tono (Banner/Toast/…):** mapear tono→glifo con el set de íconos: info/neutral→Info,
  success→Check, warning/danger→Alert. El set es limitado: si un componente necesita otro glifo,
  primero agregarlo al átomo Icon (y a Figma), no inventarlo inline.
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
