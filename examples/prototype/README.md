# VIU · Prototipo (React)

Plantilla mínima para prototipar **respetando la marca**: usa los componentes de
`@viu/ui` y los tokens de `@viu/design-tokens`.

> **Publicado en GitHub Pages:** https://nataliars.github.io/Viu/prototype/
> (el Storybook vive en `/Viu/`; este prototipo en `/Viu/prototype/` — un solo
> deploy publica ambos, ver `.github/workflows/deploy-storybook.yml`).

## Correr (dentro de este monorepo)

```bash
# desde la raíz del repo, una vez:
npm install
npm run build:tokens          # genera dist/tokens.css
npm run build -w @viu/ui      # genera el dist de los componentes

# luego:
npm run dev -w @viu/prototype     # http://localhost:5173
```

## Las 3 reglas para que respete la marca

1. **Cargá tokens + estilos una vez** (ver `src/main.tsx`):
   ```ts
   import "@viu/design-tokens/css"; // variables CSS + temas (black-first)
   import "@viu/ui/styles";          // estilos de los componentes
   ```
   y seteá el tema: `<html data-theme="dark">` (o `"light"`).

2. **Componé solo con `@viu/ui`** — nada de `<button>`/`<div class="card">` caseros.

3. **Para tu layout propio, usá SOLO tokens** — `var(--space-*)`, `var(--color-*)`,
   clases `viu-type-*`. **Nunca** hex ni px sueltos.

## En un proyecto STANDALONE (fuera del monorepo)

Instalá ambos paquetes y borrá el alias de `vite.config.ts`:

```bash
npm i @viu/ui @viu/design-tokens react react-dom
```

## Fuentes de marca

Los estilos referencian PP Neue Montreal · Google Sans · General Sans · JetBrains
Mono. Para fidelidad total, agregá sus `@font-face`; si no, caen a fallbacks
del sistema (los componentes, colores y espaciados igual quedan correctos).
