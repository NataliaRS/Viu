# VIU Design System · Interacción (estados y motion)

## Cómo leer este documento
Define cómo se aplican los estados y el movimiento en cualquier componente — el comportamiento, no la
apariencia. Es el puente entre dos grupos de tokens ya construidos (`--state-*` y `--motion-*`) y los
componentes que los usan. Sirve para que dos componentes distintos (hechos por personas distintas, en
momentos distintos) se sientan iguales al tocarlos.

No define valores nuevos: usa los que ya existen en `tokens.json`. Si una regla acá choca con
`principles.md`, gana principios (P2: el sistema desaparece; P5: accesible sin excepción).

## 1 · El modelo de estados (uno solo para todo)
Todo elemento accionable (botón, link, chip interactivo, item de lista, fila seleccionable, control
de formulario) recorre el mismo conjunto de estados. Lo que cambia entre componentes es el
tratamiento visual, nunca el modelo.

| Estado | Qué comunica | Disparador |
|---|---|---|
| reposo (rest) | disponible | ninguno |
| hover | "esto responde al puntero" | puntero encima (solo dispositivos con hover) |
| focus | "el teclado está acá" | `:focus-visible` (teclado), no click de mouse |
| pressed (active) | "se está activando" | mientras se mantiene |
| selected | "esto está elegido" (persistente) | estado de la app |
| disabled | "no disponible ahora" | atributo del elemento |
| loading | "procesando, no repitas" | estado de la app |

**Reglas:**
- Un estado nunca se comunica solo con color (P5). Acompañar con forma, ícono, posición, borde o
  relleno (ej.: selected = relleno + checkmark, no solo tinte).
- hover y focus son distintos. hover es para puntero; focus es obligatorio y visible para teclado.
  Nunca se reemplaza foco por hover.
- El foco nunca se elimina. Se puede reestilar, pero siempre visible (`:focus-visible` + anillo de
  marca).

## 2 · Capas de estado (`--state-*`) — cómo se aplican
Las capas de estado son opacidades que se superponen al color base del elemento para
oscurecerlo/aclararlo de forma uniforme, sin definir un color nuevo por cada estado. Valores
(observado):

| Token | Valor | Uso |
|---|---|---|
| `--state-hover` | 0.08 | overlay en hover |
| `--state-focus` | 0.12 | overlay opcional en foco (además del anillo) |
| `--state-pressed` | 0.16 | overlay en pressed |
| `--state-dragged` | 0.24 | overlay mientras se arrastra |
| `--state-disabled` | 0.38 | mecanismo crudo/legacy. ⚠️ NO usar como opacidad global del elemento en componentes nuevos — ver la regla de `disabled` abajo. *(corregido jun-2026: antes decía "opacidad del elemento entero en disabled".)* |

**Dos formas válidas de aplicarlas:**

1. **Overlay genérico** (preferida para superficies neutras: items de lista, filas, chips, ghost
   buttons). Una capa `currentColor`/blanco/negro a la opacidad del estado sobre el fondo:
   ```css
   .item { position: relative; }
   .item::after {
     content: ""; position: absolute; inset: 0;
     background: currentColor; opacity: 0; /* o un token de superficie */
     transition: opacity var(--motion-duration-micro) var(--motion-ease-standard);
   }
   .item:hover::after  { opacity: var(--state-hover); }
   .item:active::after { opacity: var(--state-pressed); }
   ```
2. **Colores de estado pre-horneados** (preferida cuando el componente ya tiene tokens de color por
   estado, como el Button primary). Ahí no se usa overlay: se cambia el token de fondo directamente
   (`--color-bg-brand → --color-bg-brand-hover → --color-bg-brand-pressed`). Las capas `--state-*`
   son el mecanismo crudo detrás de esos tokens.

**disabled — ⚠️ CRITERIO CORREGIDO (jun-2026, confirmado contra variantes de Figma):** se usan
tokens explícitos `bg-disabled`/`text-disabled` por variante, **NO** dimming universal con `opacity:
var(--state-disabled)`. **Cómo aplicar según el tipo de superficie (RESUELTO jun-2026, B1):**
componentes **rellenos** (Button, Input, Select, Chip, PickerField…) → `background: bg-disabled` +
`color: text-disabled` (+ `border-color: border-subtle` si aplica); componentes **transparentes /
solo-texto** (ListItem, MenuItem, Tab…) → solo `color: text-disabled` en el texto y los íconos (sin
relleno: meterle un `bg-disabled` a una superficie transparente la ensucia). El punto del criterio
es contraste controlado, no rellenar todo. `pointer-events: none`/`cursor: not-allowed` se mantienen.
**Migración COMPLETA (jun-2026, B1):** el conteo histórico "~15 pendientes" estaba inflado — solo
quedaban 4 (ListItem, MenuItem, Tab con `opacity: var(--state-disabled)`; TimePicker/PickerField con
`opacity: 0.5` mágico); los demás ya consumían los tokens. *(Observado histórico — OBSOLETO: el
Button original usaba opacidad del elemento completo; ese patrón no se replica.)*

**`selected` y `dragged` — RESUELTO (jun-2026, A3):**
- **`dragged`** (transitorio) → **overlay** con `--state-dragged` (0.24). Es feedback efímero
  mientras se arrastra; no amerita un color propio.
- **`selected`** (persistente) → **token de color semántico de superficie** (ej. `bg/brand-subtle` o
  un `bg/selected` si se agrega) **+ un signifier no-color** (borde, check o relleno), **nunca**
  opacidad sola. Razón: es un estado persistente y significativo; P5 prohíbe comunicarlo solo por
  color/opacidad, y una superficie real lee mejor que un overlay genérico. Se materializa al
  construir el primer componente con `selected` (chips/listas/filas seleccionables); ahí se decide
  si alcanza `bg/brand-subtle` o se crea un semántico `bg/selected` dedicado.

**Paridad de color de estado en componentes de selección/lista — CONVENCIÓN (jun-2026, Figma):**
- **Hover → `bg/brand-2-subtle`** (índigo). **Seleccionado/Activo → `bg/brand-subtle`** (crimson).
- **Aplica a:** Tree item, Nav item, List item, Menu item, Table row, Pill (hover), Chip (hover).
- **NO se tocan** (ya consistentes en brand sólido / `text-brand` rojo): form controls on
  (Checkbox/Radio/Switch), Tab/Step activo, y Pill **seleccionado**.
- **Texto sobre los tintes:** `text/on-brand-2` y `text/primary` mantienen contraste sobre AMBOS.
- ⚠️ **EXCEPCIONES verificadas contra Figma (jun-2026) — NO unificar a crimson:** algunos componentes
  con estado seleccionado/activo usan **índigo a propósito** y su Figma así lo confirma; la regla
  crimson NO les aplica:
  - **Card** (`434:6`) seleccionada → `bg/brand-2-subtle` + `border/brand-2` (índigo). ✓ ya en código.
  - **Pagination** (`168:32`) página actual → borde `border/brand-2` + `bg/brand-2-subtle` (índigo). ✓.
  - **DateRangePicker** (`732:120`) → paleta **solo crimson** (rango = `bg/brand-subtle`, endpoints =
    `bg/brand`); Figma NO define índigo ni hover de día → el `.day:hover` neutro NO se cambia a índigo.
  - **SegmentedControl** → familia Tab (segmento activo = `bg/elevated` + sombra), no brand.
  - **Combobox** (`730:40`) opción resaltada (active-descendant) → `bg/brand-2-subtle` (índigo). ✓
    corregido jun-2026 (antes usaba `bg/hover` inline). Las opciones reusan MenuItem (hover índigo ya).
- ✅ **Paridad de código RESUELTA y CROSS-CHECKED contra Figma (jun-2026):** verificada nodo-a-nodo
  con `get_variable_defs` + `get_screenshot` (ver rutina en `code-build.md`) sobre Tree/List/Table/
  Nav/Menu/Pill/Chip — Hover=índigo / Seleccionado=crimson mapean 1:1. Aplicada en los 9 puntos:
  - **Hover → `bg/brand-2-subtle`:** TreeItem (`.item:hover`), NavItem (`.item:hover`), ListItem
    (`.interactive:hover`), MenuItem (`.item:hover`), TableRow (`.interactive:hover`), Pill
    (`.pill:hover`), Chip (`.input:hover`/`.avatar:hover`). Chip `choice:hover` ya estaba ✓.
  - **Seleccionado/Activo → `bg/brand-subtle` (crimson):** flipeados ListItem `.selected`, TableRow
    `.selected` y NavItem `.active` (antes índigo); TreeItem `.selected` y Chip choice ya estaban ✓.
  - **NO tocados (correcto):** Pill `.selected`/`.selected:hover` (brand sólido + `text/on-brand`),
    form controls on, Tab/Step activo. Texto sobre tintes = `text/primary` (TreeItem selected usa
    `text/brand`, que ya leía sobre crimson).

## 3 · Motion (`--motion-*`) — cómo se aplica
El motion comunica causa-efecto y continuidad; nunca decora. Regla raíz: micro-interacciones rápidas,
entradas un poco más lentas, nada que estorbe (P2).

**Duraciones (semánticas, por rol):**

| Token | Valor | Cuándo |
|---|---|---|
| `--motion-duration-micro` | 160ms | hover, pressed, foco, cambios de color de estado |
| `--motion-duration-short` | 240ms | transiciones de UI estándar |
| `--motion-duration-medium` | 320ms | entradas de elementos, popovers, acordeones |
| `--motion-duration-long` | 400ms | movimientos amplios (paneles, hojas) |
| `--motion-duration-loop` | 600ms | animaciones en bucle (spinner) |

**Curvas (easings):**

| Token | Curva | Cuándo |
|---|---|---|
| `--motion-ease-standard` | `cubic-bezier(0.2,0.8,0.2,1)` | la mayoría: cambios de estado, movimientos dentro de pantalla |
| `--motion-ease-enter` | `cubic-bezier(0,0,0.2,1)` | algo que entra (aparece/crece) — desacelera al final |
| `--motion-ease-exit` | `cubic-bezier(0.4,0,1,1)` | algo que sale (desaparece) — acelera al irse |
| `--motion-ease-emphasized` | `cubic-bezier(0.2,0,0,1)` | momentos destacados, con intención |

**Reglas de aplicación:**
- Estados (hover/pressed/focus) → siempre `--motion-duration-micro` + `--motion-ease-standard`.
  (Observado en Button.)
- Transicioná propiedades baratas (color, opacidad, transform). Evitá animar
  `width`/`height`/`top`/`left`; usá `transform`.
- La micro-animación de personalidad de VIU es contenida: el Button baja 1px en pressed. No rebotes
  ni escalados llamativos (P3: autoridad, no novedad).
- El producto consume siempre `--motion-*`, nunca `--p-duration-*`/`--p-ease-*` directo (la
  verificación es `token-usage.mjs`).

## 4 · `prefers-reduced-motion` (no negociable)
Quien activó "reducir movimiento" recibe cambios instantáneos o muy atenuados, sin transiciones de
posición/escala. Piso global del sistema:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Excepción razonable: cambios de opacidad/color pueden mantener una transición mínima porque no
provocan malestar vestibular. El spinner de loading se reemplaza por un indicador estático.

## 5 · Checklist de interacción (antes de dar por terminado un componente)
- ☐ Tiene los estados que le corresponden del modelo (§1), no menos.
- ☐ hover y focus son distintos; el foco es visible y no se eliminó.
- ☐ Ningún estado se comunica solo con color (§1).
- ☐ Las transiciones de estado usan `--motion-duration-micro` + `--motion-ease-standard`.
- ☐ Solo anima propiedades baratas (color/opacidad/transform).
- ☐ Consume `--state-*` y `--motion-*`, nunca primitivos (verificar con `token-usage.mjs`).
- ☐ Respeta `prefers-reduced-motion`.
- ☐ disabled = tokens `bg-disabled`/`text-disabled` por variante + `pointer-events: none` +
  `disabled`/`aria-disabled`. *(corregido jun-2026: antes decía "opacidad `--state-disabled` + sin
  eventos"; el dimming universal por opacidad quedó OBSOLETO — ver §2.)* loading bloquea y expone
  `aria-busy`.

---
Esta doc define el comportamiento. `principles.md` el porqué; `tokens.json` los valores (`--state-*`,
`--motion-*`); la arquitectura dónde viven. Cada componente nuevo se valida contra el checklist §5.
