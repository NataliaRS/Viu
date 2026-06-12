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
  tipa `status: "Draft"|"Reviewed"|"Stable"|"Deprecated"` y las stories quedaron 67 `Stable` + 2
  `Reviewed` (Tooltip/Slider, ex-`beta`). El badge mapea Draft→warning · Reviewed→info · Stable→success
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
| Cualquier trabajo en Figma (use_figma, keys, registro de componentes, helpers, recetas, gotchas, inventario de 331 tokens) | `references/figma-build.md` — leer ANTES de la primera llamada a use_figma |
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
   doc-standard.md. Ubicación del tooling: los gates de gobernanza (`build/token-usage.mjs`,
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
queda escrito acá, no solo en el chat.

Al instalar este skill, **desinstalar `figma-viu-build`**: ambos compiten en triggering y el viejo
quedó atrás. Este lo absorbe entero.

## 6. Estado actual (junio 2026)
- **Tokens:** 331 variables / 5 colecciones, auditadas 1:1 Figma↔código; paridad verificada.
  Effects (sombras/gradients) como Styles → `tokens/effects.json`.
- **Figma:** **28 átomos · 31 moléculas · 9 organismos = 68 componentes** + 4 patrones (frames de
  composición, sin nodo de componente). *(corregido jun-2026 por enumeración directa de
  `figma.root.children`: antes el registro decía "27 átomos / 66" y la portada "ÁTOMOS·26"; el
  faltante era **Icon container**, que SÍ tiene nodo — `SET 574:150`.)* Card modular SET(45). Átomo
  Image (15 var). Portada con índice por nivel atómico. Sections en archivo aparte; `Marketing ·
  LinkedIn` fuera del índice. Sandbox de pruebas: `zmTSs2J5H3EIkItlF85rfc`.
- **Código (`NataliaRS/Viu`, rama `claude/viu-design-system`):** sistema CERRADO — **28 átomos + 31
  moléculas + 9 organismos + 4 patrones** en `@viu/ui`, Storybook en vivo
  (https://nataliars.github.io/Viu/) con chrome de marca, ViuDocs y Foundations interactivas.
- **A11y:** 0 fallas WCAG reales; `success-solid` = green-700; contraste de borde = excepción
  documentada (1.4.11). Cuatro gates limpios — `token-usage · ghost-check · lint-literals ·
  contrast-audit` — que **corren en el proyecto de gobernanza, NO en `NataliaRS/Viu`** (verificado
  jun-2026: ausentes en el repo de código; el gate del repo es el de 5 pasos: typecheck · test ·
  build · figma connect parse · build-storybook).
- **Pendientes — DECIDIDOS jun-2026, en cola de ejecución (orden sugerido):**
  1. ~~**B2** · sumar Eye/EyeOff al Icon de Figma~~ ✅ HECHO (jun-2026). Natalia los creó en Figma
     como `Visibility`/`Visibility_off`; el código se renombró a `Visibility`/`VisibilityOff`
     (alineado a Figma, mejor nombre semántico). Code Connect mapea `Visibility_off`→`VisibilityOff`.
  2. ~~**B3** · `.figma.tsx` de Icon container~~ ✅ HECHO (jun-2026). Surgió un gap nuevo: el nodo
     Figma tiene `style`/`tone` (48 var) que el código no expone — anotado en code-build §14.
  3. ~~**A1** · actualizar la etiqueta de madurez de los componentes a la escala única
     Draft/Reviewed/Stable/Deprecated~~ ✅ HECHO (jun-2026). `ViuDocs.tsx` retipado + stories
     migradas (67 Stable, 2 Reviewed); tipo viejo `stable|beta|wip` obsoleto.
  4. ~~**B1** · migrar componentes de `disabled` por opacidad a `bg-disabled`/`text-disabled`~~
     ✅ HECHO (jun-2026). Resultaron solo **4** (no ~15): ListItem, MenuItem, Tab (usaban `opacity:
     var(--state-disabled)`) + TimePicker/PickerField (`opacity: 0.5` mágico). Regla aplicada:
     rellenos→`bg-disabled`+`text-disabled`; transparentes→solo `text-disabled` (ver interaction §2).
  5. **B4** · Slider modo Rango (doble thumb) en código. *(decidido: hacer)*
  6. **B5** · resolver colisión/flip de Tooltip + Popover juntos (misma lógica). *(decidido)*
- **A4 (RESUELTO): átomo `Marker` DESCARTADO** — no es gap real; "Marker, no CheckCircle" sigue
  siendo solo la regla de nombrar por rol (figma-build §12), no un componente a construir.
- **Gaps opcionales (C1):** Segmented control · Radio/Checkbox group · Combobox/Autocomplete · Date
  range picker · Kbd. **Proceso decidido: se crean PRIMERO en Figma (fuente de verdad) y luego
  design-to-code a `@viu/ui`.** Cada uno requiere aprobación de gobernanza + demanda real; se
  priorizan por necesidad de producto (no se construyen los 5 en batch).
