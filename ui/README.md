# @viu/ui

Biblioteca de componentes React del **VIU Design System**, construida 1:1 desde
Figma (_design-to-code_) sobre `@viu/design-tokens`. Estilada con **CSS Modules**
que consumen únicamente las CSS variables semánticas/escalas (nunca primitivos).

> Piloto (Tramo 1): `Button` (set Figma `8:53`) e `Icon` (set `56:431`).
> El resto de componentes se irá añadiendo siguiendo `docs/components-plan.md`.

## Uso

```tsx
import "@viu/design-tokens/css"; // CSS variables + temas (una vez, a nivel app)
import "@viu/ui/styles";         // estilos de los componentes
import { Button, Icon } from "@viu/ui";

<Button variant="primary" size="md" leadingIcon={<Icon glyph="Plus" />}>
  Crear
</Button>;
```

`Button`: `variant` `primary|secondary|tertiary`, `size` `sm|md|lg`, `leadingIcon`,
`trailingIcon`, + todos los atributos nativos de `<button>`.
`Icon`: `glyph` (Plus · Check · Chevron · Close · Arrow · Search · Info · Alert),
`size`, `title` (a11y).

## Scripts

```bash
npm run storybook        # docs vivas + playground (puerto 6006)
npm run build-storybook  # Storybook estático
npm run dev              # playground Vite (visual)
npm run typecheck        # tsc --noEmit
npm test                 # vitest + Testing Library
npm run build            # tsup → dist/ (ESM + .d.ts + index.css)
npm run cc:check         # figma connect parse (valida los mappings *.figma.tsx)
```

Storybook (React + Vite) trae addon de accesibilidad (`@storybook/addon-a11y`) y
un switch de tema **dark/light** en la toolbar. Stories: `Atoms/Button`, `Atoms/Icon`
(incluye `AllVariants` / `AllGlyphs`).

## Fuentes de marca

Los tokens definen las **familias** (`--font-family-display/body/label/mono`) pero NO
cargan los archivos. En tu app, agregá estos `<link>` al `<head>` (mismas que usa el
Storybook vía `.storybook/preview-head.html`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<!-- Google Sans (body) + JetBrains Mono (code) -->
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<!-- General Sans (labels) + Satoshi (fallback de display) — Fontshare -->
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
<!-- Material Symbols Outlined — ÍCONOS del sistema (obligatorio para <Icon/>) -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&icon_names=add,arrow_forward,check,chevron_right,close,error,folder,info,search,visibility,visibility_off,warning&display=block" rel="stylesheet" />
```

`Icon` usa **Material Symbols (Google)**: renderiza la ligadura de la fuente
«Material Symbols Outlined». Si no cargás esa fuente, los íconos no se ven. La prop
`glyph` acepta los nombres legacy (`Plus`, `Chevron`, `Close`…) que se mapean a
símbolos Material, o directamente un nombre Material (`calendar_month`). Si usás
glifos nuevos, sumalos al `icon_names=` del `<link>` para que entren en el subset.

**PP Neue Montreal** (display/títulos) es comercial; sin licencia, el stack cae a
Satoshi → system-ui. Con licencia, sumá su `@font-face`.

## Code Connect

Cada componente trae su `*.figma.tsx` que mapea las _variant properties_ de Figma
a las props. Publicar con `npx figma connect publish` (requiere token de Figma).
