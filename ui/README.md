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

## Code Connect

Cada componente trae su `*.figma.tsx` que mapea las _variant properties_ de Figma
a las props. Publicar con `npx figma connect publish` (requiere token de Figma).
