# VIU Design System

Sistema de diseño **black-first**, acento crimson `#B5262E`, secundario índigo.
Esta es la **fundación de tokens**: la fuente única de verdad, con **paridad 1:1**
con los archivos de Figma _Tokens & Foundations_ y _Componentes_.

> Estado actual: **fundación de tokens completa**. La capa de componentes
> (28 átomos · 31 moléculas · 9 organismos · 5 patrones) está en el roadmap —
> ver [Componentes](#componentes-roadmap).

## Arquitectura

Cadena de alias, igual que en Figma — **los componentes consumen solo la capa
semántica y las escalas, nunca primitivos ni hex directo**:

```
primitivos  →  semánticos (por tema)  →  temas (dark / light)
  color/*          color/bg|text|border|feedback/*       :root = dark
  alpha/*                                                 [data-theme="light"]
```

```
tokens/                 # FUENTE DE VERDAD (editar aquí), formato DTCG
  primitives.json       # color crudo + alphas  (70 tokens)
  semantic.json         # alias por tema dark/light  (51 × 2)
  scale.json            # spacing, radius, tipografía, breakpoints, grid
scripts/
  build-tokens.mjs      # resuelve alias → genera /dist  (sin dependencias)
dist/                   # GENERADO (no editar a mano)
  tokens.css            # CSS custom properties + temas + utilidades de tipo/grid
  tokens.json           # tokens resueltos (plano)
  tokens.js / .d.ts     # consumo desde JS/TS
preview.html            # visor de tokens (abrir en el navegador)
```

## Uso

```bash
npm run build:tokens     # regenera /dist desde /tokens
```

### En CSS

```html
<link rel="stylesheet" href="dist/tokens.css" />
```

```css
.card {
  background: var(--color-bg-raised);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-surface);
  padding: var(--space-lg);
}
```

Por defecto el tema es **dark** (black-first). Para tema claro:

```html
<html data-theme="light"> … </html>
```

Sin `data-theme`, el sistema sigue el modo del sistema operativo
(`prefers-color-scheme`).

### Tipografía y grid

```html
<h1 class="viu-type-display-l">Titular</h1>
<p class="viu-type-body-l">Texto de cuerpo</p>

<div class="viu-grid"> … </div>   <!-- 4→12 columnas responsive -->
```

### En JS / TS

```ts
import { tokens } from "@viu/design-tokens";

tokens.semantic.dark["color.bg.base"];   // "#0a0a0b"
tokens.scale["space.md"];                // "16px"
```

## Tokens

| Capa | Grupos | Notas |
|------|--------|-------|
| **Primitivos** | `color/{red,neutral,green,amber,alert,blue,indigo}`, `alpha/*` | Crudos, no se consumen directo |
| **Semánticos** | `bg`, `text`, `border`, `feedback` | Alias por tema (dark/light) |
| **Espaciado** | `space/3xs…6xl` | 2 → 192 px |
| **Radios** | `radius/{xs,control,surface,pill}` | 4 / 8 / 12 / full |
| **Tipografía** | `oversize · display · headline · title · body · label · code` | PP Neue Montreal · Google Sans · General Sans · mono |
| **Grid** | `base · sm · md · lg · xl · 2xl` | 4→12 cols, 375→1920 px |

### Marca

- **Acento (crimson):** `#B5262E` (`color/red/500`)
- **Secundario (índigo):** `#5A55A8` (`color/indigo/500`)

## Componentes (roadmap)

Inventario definido en el archivo de Figma _Componentes_:

- **Átomos (28):** Icon, Icon button, Button, Badge, Link, Tag, Status, Pill, Chip, Notification badge, Avatar, Divider, Progress, Tooltip, Checkbox, Radio, Switch, Slider, Input, Skeleton, Spinner, Select, Step, Textarea, Tab, Rating, Image, Icon container
- **Moléculas (31):** Search, Datepicker, Time picker, Toast, Banner, Stepper, Accordion, Avatar group, Form field, Field, Select field, Menu, Dropzone, File row, Breadcrumb, List, Table row, Tabs, Pagination, Toolbar, Nav, Quote, Tree item, Rich text, Video embed, …
- **Organismos (9):** Card, Table, Modal, Drawer, Popover, Page header, Empty state, Tree view, Footer
- **Patrones (5):** Formulario, Form, Wizard, App shell, Data table

> Cada componente vivirá en su página-documento en Figma (anatomía, propiedades,
> guía de uso) y se implementará en código sobre esta librería de tokens.

## Fuentes en Figma

- **Tokens & Foundations** · `o4tzMPcZIWMzVc67dW6dWW`
- **Componentes** · `kjEg0KpLID4cH00DruERTN`
