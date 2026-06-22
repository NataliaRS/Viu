# VIU Design System · Canon (apéndice de evidencia)

Este documento es el respaldo de `principles.md`. Contiene la síntesis del canon teórico
(bibliografía + estándares) organizada por lente, con la implicación de cada principio.
`principles.md` es el producto — los principios VIU en voz propia; este canon es la evidencia que
los sustenta. Mantiene la misma regla de transparencia: cada término definido, cada decisión
justificada.

## Cómo leer este documento
Este documento está escrito para que cualquier persona que llegue sin contexto previo —un diseñador
nuevo, un desarrollador, o el propio autor dentro de dos años— pueda entenderlo completo sin
necesitar otra fuente. No asume que nada esté "ya entendido". Cada término técnico se define la
primera vez que aparece. Cada decisión se enuncia explícitamente, junto con la razón que la sustenta.

Un design system (sistema de diseño) es el conjunto único de decisiones, reglas, valores
reutilizables (tokens), componentes y guías que permite construir productos digitales de forma
consistente y a escala. Este documento es la capa de principios: define el por qué de cada decisión.
Es independiente del archivo que define los valores concretos (el qué), de modo que ambos puedan
evolucionar sin contradecirse.

**Regla de transparencia (aplica a todo el sistema):** ningún documento del sistema puede depender de
conocimiento implícito. Si algo importa, se escribe; si se decide, se justifica; si se asume, se
declara la asunción.

## Glosario
Definiciones que el resto del documento usa. Se listan acá para no interrumpir la lectura después.
- **Token (token de diseño):** un valor de diseño con nombre, reutilizable, referenciado por su
  propósito y no por su apariencia. Ejemplo: en vez de escribir el color `#B5262E` en cada botón, se
  usa un token llamado color de marca. Si el valor cambia, cambia en un solo lugar.
- **Primitive / option token (token primitivo):** el valor crudo, sin significado de uso. Ejemplo:
  `rojo-500 = #B5262E`. Es una opción disponible, no una decisión de dónde usarla.
- **Semantic / decision token (token semántico):** un token que asigna un propósito a un primitivo.
  Ejemplo: `color/fondo/marca → rojo-500`. Comunica para qué sirve, no qué valor tiene. El producto
  siempre usa estos, nunca los primitivos directos.
- **Theme token (token de marca/tema):** la capa que define la identidad concreta (qué rojo es el de
  marca, qué fuente, etc.). Cambiar esta capa re-marca todo el sistema sin tocar las demás.
- **Component token (token de componente):** un token específico de un componente. Ejemplo:
  `boton/fondo/primario`.
- **Mode (modo):** una variante de un mismo token según el contexto. Ejemplo: el color de texto tiene
  un valor en modo oscuro y otro en modo claro.
- **Breakpoint:** un ancho de pantalla a partir del cual el diseño cambia (por ejemplo, de móvil a
  escritorio).
- **State layer (capa de estado):** una capa visual (normalmente una opacidad superpuesta) que
  comunica el estado de un elemento interactivo: reposo, hover (puntero encima), foco (seleccionado
  por teclado), pressed (presionado), disabled (inhabilitado).
- **WCAG 2.2 AA:** Web Content Accessibility Guidelines versión 2.2, nivel de conformidad AA. Es el
  estándar internacional de accesibilidad web del W3C y el referente legal vigente (lo exigen la ADA
  en EE. UU. y la European Accessibility Act). "AA" es el nivel intermedio, el mínimo exigible en la
  práctica.
- **Contrast ratio (ratio de contraste):** medida de diferencia de luminancia entre dos colores, de
  1:1 (idénticos) a 21:1 (negro/blanco). WCAG 2 exige 4.5:1 para texto normal y 3:1 para texto grande
  o componentes de interfaz.
- **APCA (Advanced Perceptual Contrast Algorithm):** un método de contraste más fiel a la percepción
  humana, candidato para la futura WCAG 3. A la fecha es exploratorio y no es requisito legal.
- **OKLCH:** un modelo de color perceptualmente uniforme (a diferencia de HSL). Útil para crear
  escalas de color que se ven parejas al ojo.
- **Atomic Design:** metodología de Brad Frost que organiza la interfaz en niveles: átomos (elementos
  básicos: botón, input), moléculas (combinaciones simples: campo de formulario), organismos
  (secciones: barra de navegación), templates y páginas.

## 1 · Identidad (los límites que ningún principio puede cruzar)
Estas tres decisiones de identidad son anteriores a cualquier principio del canon. Cuando un
principio de la teoría entra en conflicto con una de ellas, gana la identidad, y el conflicto se
documenta.

**1.1 Black-first.** La base visual del sistema es el negro. El modo oscuro es el modo por defecto;
el claro existe pero es secundario. Por qué: la identidad de marca de origen (Viu Marketing Center)
es negra con fondos oscuros; el negro hace que el acento de color resalte. Regla: la superficie base
por defecto es negra (`#0A0A0B`). El modo claro, cuando se use, debe ser blanco frío (con un matiz
azul-gris muy leve), nunca crema o cálido.

**1.2 Crimson como acento primario (con un secundario menor frío).** El acento primario de marca es
el rojo `#B5262E`. Existe además un acento secundario menor frío, el índigo `#272558`, subordinado al
rojo. Por qué: un acento único es más memorable y disciplinado que una paleta de varios; es la firma
de la marca. Regla: `#B5262E` es el acento primario, reservado a identidad y a la acción principal
(CTA). `#272558` es un acento secundario menor para profundidad, gradients y énfasis, que nunca
compite con el rojo. Ningún acento de marca se usa para comunicar error ni estado del sistema: los
colores de éxito/advertencia/error/información son una capa funcional separada (ver sección 5).

**1.3 Restraint senior (contención).** Preferir quitar antes que agregar. El silencio visual es una
señal de jerarquía. Por qué: es un sistema de nivel director/senior; la densidad decorativa lee como
falta de criterio. Regla: ante la duda entre agregar y quitar, se quita. Un acento, un CTA primario
por superficie, un momento de motion por pantalla.

**1.4 Specificity is the brand (especificidad).** Nada genérico. Regla: toda decisión debe poder
justificarse de forma específica. Si una solución podría aparecer igual en cualquier sistema, se
replantea.

## 2 · Cognición e interacción
Fuentes: Norman (The Design of Everyday Things); Krug (Don't Make Me Think); Cooper (About Face);
Johnson (Designing with the Mind in Mind); Weinschenk (100 Things…); Yablonski (Laws of UX); Lidwell
(Universal Principles of Design); Rogers/Sharp/Preece; heurísticas de Nielsen Norman Group.

| Principio (definido) | Implicación: regla explícita para el sistema |
|---|---|
| **Affordance y signifier** — un affordance es lo que un objeto permite hacer; un signifier es la señal visible de ello. Lo interactivo debe parecer interactivo. | Se crea un sistema de capas de estado (reposo/hover/foco/pressed/disabled) y un indicador de foco visible para todo control. El estado nunca se comunica solo con color. |
| **Feedback inmediato** — toda acción debe producir una respuesta visible. El "umbral de Doherty" sitúa en ~400 ms el límite para que la interacción se sienta fluida. | Toda interacción responde en ≤240 ms (escala de motion rápida). Si una operación tarda más de ~1 s, se muestra un indicador de carga o un esqueleto. Las duraciones de animación se eligen por umbral perceptual, no por estética. |
| **Reconocer es más fácil que recordar** (heurística de Nielsen #6) | Las API de los componentes son consistentes entre sí; las etiquetas son visibles; no hay gestos ocultos como única vía (coincide con WCAG 2.5.7, que exige alternativa a arrastrar). |
| **Ley de Fitts** — el tiempo para alcanzar un objetivo crece cuanto más chico o lejano está; los bordes y esquinas de pantalla son "infinitamente" alcanzables. | El área mínima de cualquier objetivo táctil/clic es 24×24 px (token `size/target-min`). La acción principal de una superficie es el elemento de mayor tamaño. |
| **Ley de Hick** — el tiempo de decisión crece con el número de opciones. | Se limita el número de acciones primarias por superficie; el contenido complejo se revela de forma progresiva. |
| **Principios Gestalt** — el ojo agrupa por proximidad, similaridad y región común. | El agrupamiento se logra con espacio y contención (fondos, superficies), no con líneas divisorias. Recae en los tokens de espaciado y de superficie. |
| **Ley de Jakob** — la gente espera que un sitio funcione como los demás que ya conoce. | Los comportamientos de los componentes siguen convenciones establecidas; no se reinventan interacciones conocidas sin razón. |
| **Memoria de trabajo limitada / chunking** (Weinschenk, Miller) | El contenido se fragmenta en grupos rotulados; las listas y menús no exceden un tamaño razonable. |

## 3 · Información y estructura
Fuentes: Rosenfeld/Morville/Arango (Information Architecture); Covert (How to Make Sense of Any Mess);
Kalbach (Mapping Experiences); Samara (Making and Breaking the Grid).

| Principio (definido) | Implicación: regla explícita |
|---|---|
| **Arquitectura de información** — la disciplina de organizar, rotular, navegar y permitir buscar contenido. | Los patrones de navegación (global, local, breadcrumb, paginación) son parte del sistema. El modelo de contenido se define antes que el layout. |
| **El lenguaje primero** (Covert) — antes de diseñar hay que acordar cómo se nombran las cosas. | La convención de nombres de tokens es la ontología compartida del sistema: un nombre por concepto, con la estructura categoría / concepto / propiedad / variante / estado. |
| **El grid como disciplina, y saber cuándo romperlo** (Samara) — una retícula da orden; romperla a propósito crea énfasis. | Hay una retícula responsive base (columnas que cambian por breakpoint). La ruptura del grid se permite solo de forma intencional y reservada a momentos editoriales (por ejemplo, un hero), que es donde se expresa la identidad. |
| **Los mapas de experiencia guían los patrones** (Kalbach) | La librería de patrones se construye a partir de flujos reales de usuario, no creando un componente "porque podría hacer falta". |

## 4 · Diseño de sistemas, escala y gobernanza
Fuentes: Kholmatova (Design Systems); Frost (Atomic Design); Mall (Design That Scales);
Curtis / EightShapes; Sparkbox; especificación W3C Design Tokens (DTCG); Meadows (Thinking in
Systems).

| Principio (definido) | Implicación: regla explícita |
|---|---|
| **Atomic Design** (definido en glosario) | Es la taxonomía de componentes del sistema: átomos → moléculas → organismos → templates → páginas. Se usa como andamio mental, no como jerarquía rígida. |
| **Sistemas "estrictos" vs "flexibles"** (Kholmatova) — uno estricto prioriza consistencia; uno flexible, libertad creativa. | Decisión: este es un sistema estricto (consistencia fuerte) con una capa de marca intercambiable encima. Los principios son su ADN. |
| **Tokens "opción" vs "decisión"** (Curtis / DTCG) | Establece los cuatro niveles del sistema: Primitivos (opciones) → Semánticos (decisiones de uso) → Tema (marca) → Componente (aplicación). El producto referencia semánticos o de componente, nunca primitivos. |
| **El sistema es un producto** (Mall, Curtis) — tiene usuarios (los equipos), versiones y mantenimiento. | Decisión: se versiona con semver, se lleva changelog, cada token/componente tiene una etiqueta de madurez (experimental / estable / obsoleto), y existe una ruta de contribución y un "criterio de terminado" por componente. |
| **Pensamiento sistémico / puntos de palanca** (Meadows) — el mayor poder de cambio está en el paradigma y las reglas, no en los valores sueltos. | Decisión: este documento de principios es el punto de mayor apalancamiento del sistema. Se diseñan bucles de feedback: la telemetría de uso retroalimenta la evolución del sistema. |
| **Única fuente de verdad** | Decisión: existe un único archivo de tokens editado a mano; todos los demás formatos (CSS, etc.) se generan de él automáticamente. Nunca se editan a mano los archivos generados, para que no puedan divergir. |

## 5 · Accesibilidad e inclusión
Fuentes: WCAG 2.2 AA (W3C); Deque; The A11Y Project; Horton/Quesenbery (A Web for Everyone); Gilbert
(Inclusive Design); Microsoft Inclusive Design Toolkit.

| Principio (definido) | Implicación: regla explícita |
|---|---|
| **WCAG 2.2 AA es el piso obligatorio** — es el estándar legal vigente (ADA, European Accessibility Act). | El contraste se verifica numéricamente: 4.5:1 para texto normal, 3:1 para texto grande o elementos de interfaz. Es una compuerta de aprobación, no una recomendación. |
| **Target Size mínimo 24×24 px** (criterio AA 2.5.8, nuevo en WCAG 2.2) | Token `size/target-min` = 24px. Los controles más chicos cumplen mediante separación si no por tamaño. |
| **Foco visible y no obstruido** (criterios 2.4.11 y Focus Appearance) | Hay tokens de anillo de foco, y una disciplina de capas (z-index): los encabezados fijos y los overlays no pueden tapar el elemento enfocado. |
| **WCAG 3 / APCA son futuro, no cumplimiento** — WCAG 3 está en borrador (no se espera final hasta ~2028–2030) y APCA fue retirado del borrador en 2023; el algoritmo de contraste "está por determinarse". | Decisión: las escalas de color se autoran en OKLCH para que se vean parejas, pero el resultado entregado siempre cumple WCAG 2. No se re-pinta la paleta por APCA hoy. |
| **Diseño inclusivo: resolver para uno, extender a muchos** (Microsoft, Gilbert) — las limitaciones son permanentes, temporales o situacionales. | Se respeta `prefers-reduced-motion`; se soporta alto contraste; el estado siempre se comunica con color + ícono, nunca solo color. |
| **POUR + HTML semántico** (Horton/Quesenbery) — Perceivable, Operable, Understandable, Robust. | La semántica HTML y los patrones ARIA correctos se incorporan dentro de cada componente desde el inicio, no se agregan después. |

## 6 · Producto, lean y estrategia
Fuentes: Levy (UX Strategy); Gothelf/Seiden (Lean UX); Ries (The Lean Startup); Patton (User Story
Mapping).

| Principio (definido) | Implicación: regla explícita |
|---|---|
| **Outcomes sobre outputs** (Lean UX) — importa el resultado logrado, no la cantidad producida. | El éxito del sistema se mide por la velocidad del equipo y los resultados del producto, no por el número de componentes. Se miden adopción y madurez. |
| **Build-measure-learn** (Ries) — construir lo mínimo, medir, aprender, iterar. | El sistema se entrega en rebanadas verticales finas (tokens → un componente real → una página real). Cada componente es una hipótesis hasta validarse. |
| **Story mapping** (Patton) — priorizar por el recorrido del usuario. | Se construyen primero los componentes que los productos realmente necesitan; el resto se difiere. |

## 7 · Visual y percepción
Fuentes: teoría de escala modular; sistema espacial de 8 puntos; color perceptual (OKLCH); Samara
(grid); Weinschenk (percepción).

| Principio (definido) | Implicación: regla explícita |
|---|---|
| **Escala modular** — los tamaños de tipografía siguen una progresión por un ratio. *Observado:* el Type Scale real es una escala **mixta de ratio ≈1.125** (major second) — no un 1.125 exacto: los saltos varían (16→18 = 1.125; 14→16 ≈ 1.143; 28→32 ≈ 1.143), con un tramo de pasos más pequeños ("bajo contraste") en los tamaños de cuerpo. *(corregido jun-2026: antes afirmaba 1.125 limpio; los valores reales de font-size lo desmienten — ver figma-build.md §13.)* | Se mantiene una escala ≈1.125, con un tramo de pasos más pequeños en los tamaños de cuerpo para mayor afinación. |
| **Sistema de 8 puntos** — todo espaciado es múltiplo de 8 (con pasos de 4 para ajustes finos), para un ritmo predecible. | Es la base de la escala de espaciado. |
| **Color perceptual (OKLCH vs HSL)** — HSL no es uniforme al ojo; OKLCH sí. | Las rampas de color se construyen en OKLCH para que cada paso se perciba parejo; se entregan en hex/CSS que cumple WCAG 2. |
| **Jerarquía por tamaño, peso y espacio** — no por decoración. | Refuerza la regla de contención: la jerarquía se logra con tipografía y espacio, no agregando adornos. |

## 8 · Motion (movimiento)
Fuentes: los 12 principios de animación de Disney adaptados a interfaz; semántica de motion de
Material Design.

| Principio (definido) | Implicación: regla explícita |
|---|---|
| **El movimiento comunica causalidad y continuidad** — no adorna. | Hay curvas de aceleración con significado (entrada, salida, estándar, enfático) y duraciones atadas a umbrales perceptuales. |
| **Slow-in / slow-out, anticipación, follow-through** — principios que hacen el movimiento natural. | Se expresan mediante curvas cubic-bezier; la curva "enfática" se reserva para entradas destacadas. |
| **Uso parsimonioso** | Un solo momento de motion por superficie (regla de contención). |

## 9 · Benchmarks enterprise: qué adoptar y qué evitar
Fuentes: IBM Carbon; Salesforce Lightning; Shopify Polaris; Atlassian Design System; Google Material
Design; Elastic EUI. Un benchmark es un sistema de referencia contra el cual compararse. De cada uno
se toma lo que aplica y se descarta lo que choca con la identidad.

| Sistema | Qué se adopta | Qué se evita |
|---|---|---|
| Atlassian | Su semántica de tokens de color (roles claros: texto, fondo, borde, estado). | — |
| Material (Google) | Tres niveles de token; capas de estado; clases de tamaño de ventana para diseño adaptable. | Su lenguaje pesado de sombras y elevación (choca con el black-first). |
| Carbon (IBM) | Rigor de retícula y de gobernanza/especificaciones. | Su neutralidad de marca y densidad excesivas. |
| Polaris (Shopify) | Su disciplina de contenido y voz. | Su estética propia de e-commerce. |
| Lightning (Salesforce) | Especificaciones de accesibilidad por componente. | Su complejidad de plataforma. |
| EUI (Elastic) | Su modelo de temas intercambiables. | — |

## 10 · Decision log (registro de decisiones)
Cada decisión de paradigma del sistema, enunciada de forma explícita y con su razón.
1. El sistema es estricto, con una capa de marca intercambiable. *Razón:* prioriza consistencia,
   pero permite re-marcar para distintos productos sin reconstruir.
2. WCAG 2.2 AA es la compuerta de aprobación; APCA/OKLCH son herramientas de calidad, no de
   cumplimiento. *Razón:* AA es el estándar legal vigente; APCA aún no es estándar.
3. Hay una única fuente de verdad de tokens; el resto se genera. *Razón:* elimina por diseño la
   posibilidad de que dos archivos se contradigan.
4. El estado se comunica siempre con color + ícono, nunca solo color. *Razón:* accesibilidad para
   daltonismo y baja visión.
5. La contención gana sobre cualquier principio de densidad. *Razón:* es un lock de identidad senior.
6. El modo oscuro es el por defecto; el claro es blanco frío. *Razón:* identidad black-first.
7. El contraste se verifica con números antes de aprobar cualquier color de texto. *Razón:* la
   accesibilidad no se estima a ojo.
8. *(jun-2026, A1)* Escala de madurez única: `Draft / Reviewed / Stable / Deprecated`. *Razón:* dos
   vocabularios para lo mismo invitan a inconsistencia; el estándar de doc y el Storybook ya la usan.
9. *(jun-2026, A2)* La tabla de equivalencias MD↔Figma↔Storybook (doc-standard) es normativa.
   *Razón:* refleja cómo ya documentamos (`parameters.viu` ↔ secciones de Figma); bajo riesgo.
10. *(jun-2026, A3)* `dragged` = overlay `--state-dragged`; `selected` = superficie semántica +
    signifier no-color, nunca opacidad sola. *Razón:* persistencia + P5 (no comunicar solo por
    color).
11. *(jun-2026, A4)* Átomo `Marker` descartado. *Razón:* no es gap real reusable; viola
    specificity / "no inflar".
12. *(jun-2026, A5)* Arquitectura R3 cerrada: `@viu/ui` es la implementación de referencia; el CSS
    vanilla se da por superado. *Razón:* no se mantienen dos implementaciones en paralelo.
13. *(jun-2026, C1)* Los componentes-gap nuevos se crean PRIMERO en Figma (fuente de verdad) y luego
    design-to-code. *Razón:* la paridad manda desde el diseño; el código se deriva.

## Sistema de íconos

El sistema NO tiene glifos propios. Los íconos son **Material Symbols (Google)**, en dos piezas:

- **Librería «Glyph»** (archivo Icon `5rV8Ad6qqHx5mocSpObi0k`, set `24:10626`, key `d1ef2b816438e4f91b31fc7c67138b50c3c886ae`): 2.864 variantes, propiedad `Icon`, nombres en snake_case (`Icon=add`, `Icon=stat_minus_1`…). Nombres ya limpiados (sin sufijos `_24dp_…`).
- **Wrapper «Icon»** (key `71c7115a767b41fd94237eaf736cfc0a3aaae7ed`; importado en Componentes resuelve SIEMPRE a local `944:6`): 6 variantes `Size` (xs/sm/md/lg/xl/2xl) con ancho/alto ligados a `icon-size/*`, una instancia anidada «Glyph» swappeable, y color por token de texto (overrideable, currentColor).

**Tokens icon-size** (primitives, scope WIDTH_HEIGHT): xs 16 · sm 20 · md 24 · lg 32 · xl 40 · 2xl 48.

**Uso:** poné un «Icon», elegí `Size`, swappeá la «Glyph» anidada. El color hereda del texto contiguo.

**Deprecado:** el set local VIU `56:431` (11 glifos: Plus/Check/Chevron/Close/Arrow/Search/Info/Alert/Visibility/Visibility_off/Folder) fue **migrado y eliminado**. No reintroducir glifos locales.

**Decisión clave de chevron:** la librería NO trae chevron fino arriba/abajo (no hay `expand_more`/`chevron_down`). Se usa `stat_minus_1` (⌄ abajo) y `stat_1` (⌃ arriba) — los "trend chevrons" finos de Material, que calzan con la estética VIU. Los laterales sí: `chevron_left`/`chevron_right`.

## 11 · Glosario de foundations que el sistema debe documentar
Para estar completo a nivel enterprise, el sistema documenta tanto las foundations de tokens/estilos
como las conceptuales. Ninguna se da por supuesta.
- **De estilos (valores):** Color · Tipografía · Espaciado · Grid y layout · Forma (radio) · Borde ·
  Elevación · Motion · Opacidad · Iconografía · Aspect ratio · Z-index.
- **Conceptuales (reglas y comportamiento):** Usabilidad (principios) · Interacción (capas de
  estado) · Accesibilidad (contraste, target, foco, semántica) · Contenido y voz · Diseño adaptable
  (clases de tamaño de ventana) · Gobernanza (versionado, madurez, contribución).

---
Este documento define el porqué del sistema. El documento que define los valores concretos (el qué) y
el que define qué va en cada capa de la arquitectura (el cómo) lo referencian, nunca al revés.
