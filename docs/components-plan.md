# VIU Design System — Plan de Componentes (Fase 2)

> **Corrección importante:** los componentes **ya están diseñados** en Figma
> (archivo _Componentes_ `kjEg0KpLID4cH00DruERTN`). Cada uno vive en su propia
> página con variantes y propiedades. El registro completo de IDs, props y
> recetas está en el skill **`.claude/skills/figma-viu-build/SKILL.md`** (§2b).
>
> Por tanto la Fase 2 NO es "diseñar componentes", es **design-to-code**:
> implementar en código los componentes existentes, con paridad 1:1 sobre la
> librería de tokens, y mapearlos con **Code Connect** (los IDs ya se conocen).

## Inventario real (67 componentes + 5 patrones)

Verificado vía MCP (ej. `Button 8:53` → 45 variantes Variant×State×Size).
Conteo del skill: **27 átomos · 31 moléculas · 9 organismos · 5 patrones**.

### Átomos (27) — con ID Figma y variantes
Icon `56:431` (8) · Icon button `393:190` (36) · Button `8:53` (45) ·
Badge `14:77` (6) · Link `22:137` (5) · Tag `15:42` (3) · Status `20:150` (4) ·
Pill `16:63` (6) · Chip `17:67` (12) · Notification badge `18:75` (3) ·
Avatar `19:90` (10) · Divider `20:97` (3) · Progress `22:184` (3) ·
Tooltip `23:167` (2) · Checkbox `24:167` (12) · Radio `24:227` (8) ·
Switch `24:279` (8) · Slider `225:16` (2) · Input `26:197` (5) ·
Skeleton `229:10` (3) · Spinner `20:209` (3) · Select `26:293` (5) ·
Step `189:25` (3) · Textarea `26:250` (5) · Tab `161:43` (6) ·
Rating `410:43` (6) · Image `543:62` (15)

### Moléculas (31)
Search `26:347` · Datepicker `28:386` · Toast `176:101` · Field/Textarea `223:46` ·
Stepper `339:66` · Accordion item `174:19` · Accordion `399:7` · Avatar group `185:37` ·
Banner `135:84` · Form field `27:255` · Menu `377:6` · Dropzone `235:28` ·
File row `237:49` · Breadcrumb `163:19` · List item `165:41` · Menu item `170:21` ·
Table row `195:58` · Field/Input `362:6` · Field/Password `407:6` · Tabs `366:6` ·
Field/Select `191:33` · Pagination `168:32` · Toolbar `172:29` · Nav item `233:19` ·
Nav `401:7` · List `400:7` · Quote `413:7` · Tree item `411:19` · Rich text `402:7` ·
Time picker `409:6` · Video embed `414:7`

### Organismos (9)
Table `372:6` · Card `434:6` (45 var) · Modal `140:57` · Page header `147:89` ·
Empty state `157:55` · Drawer `227:53` · Popover `187:69` · Tree view `412:7` ·
Footer `415:7`

### Patrones (5, frames de composición, páginas `Pattern ·`)
Formulario · App shell · Form · Wizard · Data table

## Flujo design-to-code (por componente)

1. `get_design_context(fileKey, nodeId)` → código de referencia + screenshot + metadata.
2. `get_variable_defs(fileKey, nodeId)` → tokens semánticos aplicados (mapean 1:1 a
   nuestras CSS vars `--color-*`, `--space-*`, `--radius-*`, `.viu-type-*`).
3. Implementar el componente consumiendo SOLO tokens semánticos/escalas.
4. Mapear las _variant properties_ de Figma a props del componente (mismo nombre:
   `variant`, `state`/`estado`, `size`, `tone`, `superficie`, `disposición`).
5. **Code Connect**: `figma connect` ligando el nodo al componente de `@viu/ui`.
6. Verificar contra el screenshot de Figma.

## Prerrequisitos

1. **Lockear stack.** Recomendación: **React + TypeScript + CSS Modules** sobre
   `dist/tokens.css`. Compatible con Code Connect y reusa los tokens tal cual.
2. **Sistema de iconos.** `Icon 56:431` tiene 8 glifos (Plus/Check/Chevron/Close/
   Arrow/Search/Info/Alert) — exportarlos como SVG/React desde Figma; es base de ~15
   componentes.
3. **Fuentes.** PP Neue Montreal (display) · Google Sans (body) · General Sans
   (label) · JetBrains Mono (code). Ya declaradas en los tokens.
4. **Infra de paquete.** `@viu/ui` junto a `@viu/design-tokens` (tsup, ESM,
   peerDeps React).
5. **Calidad.** Storybook · Vitest + Testing Library · axe (a11y).

## Convenciones de componente

- Consumen SOLO tokens semánticos + escalas (nunca primitivos ni hex).
- Props alineadas 1:1 con las _variant properties_ de Figma (Code Connect directo).
- Accesibles por defecto: roles ARIA, focus con `--color-border-focus`, teclado.
- `ref` forwarding, `className`/`style` passthrough, controlado/no-controlado.

## Tramos de entrega (orden por dependencia)

1. **Núcleo de átomos:** Icon · Icon button · Button · Link · Badge · Tag · Status ·
   Pill · Chip · Divider · Avatar · Spinner · Skeleton — valida el pipeline
   tokens→componente→Storybook→Code Connect end-to-end.
2. **Formularios (átomos):** Input · Textarea · Select · Checkbox · Radio · Switch ·
   Slider · Progress · Tooltip · Rating · Tab · Step · Image · Notification badge.
3. **Moléculas de formulario/navegación:** Form field · Field (Input/Password/
   Select/Textarea) · Search · Menu/Menu item · Breadcrumb · Tabs · Pagination ·
   Nav/Nav item · Toolbar · Stepper · Accordion/Accordion item.
4. **Moléculas de datos/feedback:** List/List item · Table row · Avatar group ·
   Toast · Banner · Datepicker · Time picker · Dropzone · File row · Tree item ·
   Quote · Rich text · Video embed.
5. **Organismos:** Card · Table · Modal · Drawer · Popover · Page header ·
   Empty state · Tree view · Footer.
6. **Patrones:** Formulario · Form · Wizard · App shell · Data table.

## Notas del sistema (del skill)

- **Dos archivos sin sync automático:** Tokens `o4tzMPcZIWMzVc67dW6dWW` (librería
  publicada) y Componentes `kjEg0KpLID4cH00DruERTN`. Editar tokens requiere
  republicar para que los componentes lo vean.
- **Fuente de verdad de tokens = la VARIABLE de Figma**; nuestro `tokens/*.json` y
  el CSS/JS se derivan de ahí. Mantener la paridad al re-extraer.
- Taxonomía: Badge/Tag comunican (no interactivos) · Pill/Chip se accionan ·
  Notification badge se monta encima. No mezclar.

## Próximo paso

Lockear el stack y arrancar el **Tramo 1 end-to-end** con un componente piloto
(`Icon` + `Button`) usando `get_design_context`/`get_variable_defs`, montar Storybook
y un mapping de Code Connect como prueba de extremo a extremo.
