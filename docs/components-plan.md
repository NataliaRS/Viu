# VIU Design System — Plan de Componentes (Fase 2)

> Estado: la fundación de tokens está completa y en `main`/rama de trabajo.
> El archivo Figma _Componentes_ contiene hoy la **portada + índice** (roadmap de
> 73 componentes) y los símbolos `_Header` / `_Footer`. Los componentes aún no
> están diseñados como frames individuales; este plan los implementa en código
> sobre la librería de tokens, listos para sincronizar con Figma vía Code Connect
> a medida que se vayan diseñando.

## Inventario (desde el índice de Figma)

**Átomos (28):** Icon · Icon button · Button · Badge · Link · Tag · Status · Pill ·
Chip · Notification badge · Avatar · Divider · Progress · Tooltip · Checkbox ·
Radio · Switch · Slider · Input · Skeleton · Spinner · Select · Step · Textarea ·
Tab · Rating · Image · Icon container

**Moléculas (31):** Search · Datepicker · Time picker · Toast · Banner · Stepper ·
Accordion · Accordion item · Avatar group · Form field · Field (Input/Password/
Textarea) · Select field · Menu · Menu item · Dropzone · File row · Breadcrumb ·
List · List item · Table row · Tabs · Pagination · Toolbar · Nav · Nav item ·
Quote · Tree item · Rich text · Video embed

**Organismos (9):** Card · Table · Modal · Drawer · Popover · Page header ·
Empty state · Tree view · Footer

**Patrones (5):** Formulario · Form · Wizard · App shell · Data table

## Prerrequisitos (antes de escribir componentes)

1. **Lockear el stack.** Recomendación: **React + TypeScript + CSS Modules sobre
   las CSS variables ya generadas** (`dist/tokens.css`). Motivos: máxima
   compatibilidad con Code Connect, los tokens ya son CSS vars con tema, y permite
   distribución headless-friendly. Alternativa válida: Web Components (Lit) si se
   quiere agnóstico de framework.
2. **Sistema de iconos.** El átomo `Icon` es base de ~15 componentes. Definir set
   (¿Lucide? ¿iconos propios exportados de Figma?), formato (SVG sprite o
   componentes React) y convención de tamaños ligada a `--font-size-*` / `--space-*`.
3. **Fuentes.** Cargar PP Neue Montreal (display), Google Sans (body),
   General Sans (label), JetBrains Mono (code) — `@font-face` + fallbacks ya
   declarados en los tokens.
4. **Infra de paquete.** `@viu/ui` junto a `@viu/design-tokens`: bundler (tsup),
   exports ESM, tree-shaking, `peerDependencies` de React.
5. **Calidad.** Storybook (docs vivas), Vitest + Testing Library, axe para a11y,
   y tests visuales opcionales.

## Convenciones de componente

- **Solo consumen tokens semánticos + escalas** (`var(--color-*)`, `var(--space-*)`,
  `var(--radius-*)`, clases `.viu-type-*`). Nunca primitivos ni hex.
- API de variantes alineada 1:1 con las _properties_ de Figma (`variant`, `size`,
  `state`, `tone`) para que el Code Connect sea directo.
- Accesibles por defecto (roles ARIA, focus visible con `--color-border-focus`,
  navegación por teclado).
- Controlados/no-controlados donde aplique; `ref` forwarding; `className`/`style`
  passthrough.

## Tramos de entrega (orden por dependencia y valor)

### Tramo 1 — Núcleo de átomos (desbloquea casi todo)
Icon · Icon container · Button · Icon button · Link · Badge · Tag · Status · Pill ·
Chip · Divider · Avatar · Spinner · Skeleton
→ entrega un kit usable y prueba el pipeline tokens→componente→Storybook→Code Connect.

### Tramo 2 — Formularios (átomos)
Input · Textarea · Select · Checkbox · Radio · Switch · Slider · Progress ·
Tooltip · Rating · Tab · Step · Image · Notification badge

### Tramo 3 — Moléculas de formulario y navegación
Form field · Field · Select field · Search · Menu / Menu item · Breadcrumb ·
Tabs · Pagination · Nav / Nav item · Toolbar · Stepper · Accordion / Accordion item

### Tramo 4 — Moléculas de datos y feedback
List / List item · Table row · Avatar group · Toast · Banner · Datepicker ·
Time picker · Dropzone · File row · Tree item · Quote · Rich text · Video embed

### Tramo 5 — Organismos
Card · Table · Modal · Drawer · Popover · Page header · Empty state · Tree view · Footer

### Tramo 6 — Patrones
Formulario · Form · Wizard · App shell · Data table

## Sincronización con Figma

A medida que cada componente se diseñe como frame/variant set en el archivo
_Componentes_, mapearlo con **Code Connect** (`figma connect`) para que el código
generado desde diseño apunte al componente real de `@viu/ui`.

## Próximo paso

Lockear el stack (punto 1) y arrancar el **Tramo 1** end-to-end:
`Icon` + `Button` + Storybook + 1 mapping de Code Connect como prueba de extremo a extremo.
