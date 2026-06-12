# VIU Design System · Principios

## Cómo leer este documento
Está escrito para que cualquiera lo entienda en frío, sin contexto previo, y para que sea escaneable
en un minuto. Define los principios de la marca VIU: las pocas reglas, en voz propia, que gobiernan
cada decisión del sistema. Todo término técnico se define donde aparece; toda decisión se justifica.

Este es el producto. La evidencia teórica que respalda cada principio (la bibliografía y los
estándares) vive en `canon.md`. Los valores concretos (colores exactos, tamaños, etc.) viven en la
capa de arquitectura y tokens. Este documento no contiene valores de implementación: contiene el
porqué.

**Quién es VIU.** Una práctica de UX, marketing y retail con ~20 años de experiencia
multi-industria, que ayuda a marcas y empresas a entender de forma holística el mundo alrededor de
su usuario y a construir sistemas maduros y ejecutables —incluida la integración real de IA— para
resolver sus problemas de raíz. Premium, experta, confiable. Femenina y corporativa. Global.

## Los 7 principios VIU

### P1 · Tratamos la enfermedad, no el síntoma
- **Qué significa.** Antes de proponer una solución, entendemos el problema real: el porqué, el
  para qué y el qué. Separamos el síntoma de la causa.
- **Por lo tanto.** Toda solución parte de un problema raíz declarado. Aceptamos que a veces se
  resuelve por etapas, o cambiando más de una cosa.
- **Cómo se mide (definición de cumplido).** Para cualquier entrega podemos nombrar la "enfermedad"
  que ataca, no solo la función que agrega. Si solo hay síntoma identificado, no se arranca.
- **Qué NO es.** No es resolver lo superficial, ni ejecutar lo pedido al pie de la letra sin
  diagnóstico.

### P2 · El sistema desaparece; la experiencia se siente natural
- **Qué significa.** La mejor solución no se nota. El usuario nunca debería percibir que existió un
  problema que alguien tuvo que resolver.
- **Por lo tanto.** Lógica clara, flujos naturales, cero fricción y cero confusión. El esfuerzo de
  diseño queda oculto bajo el resultado.
- **Cómo se mide.** El usuario completa su tarea sin detenerse a pensar; nada en la interfaz llama
  la atención sobre sí mismo.
- **Qué NO es.** No es exhibir la complejidad ni el ingenio del diseño.

### P3 · Autoridad, no novedad
- **Qué significa.** La marca se presenta con la madurez de casi 20 años: experta, premium, segura.
  Femenina y corporativa a la vez; moderna y única; con la calidad de una pieza editorial de alto
  nivel.
- **Por lo tanto.** Elegimos calidad sobre precio y contención editorial sobre adorno. Nada lee como
  tentativo.
- **Cómo se mide.** Ninguna pantalla parece "recién empezada". Todo transmite seguridad y oficio.
- **Qué NO es.** No es parecer nueva, insegura, pequeña ni artesanal-amateur. No es seguir tendencias
  por moda.

### P4 · Estructura con intención: el leitmotiv, nunca la decoración
- **Qué significa.** Heredamos la disciplina del diseño editorial clásico —retícula, jerarquía, un
  leitmotiv (motivo visual recurrente) que identifica la marca—. Los principios Gestalt (el ojo
  agrupa por proximidad, similaridad y región común) gobiernan cómo se agrupa el contenido.
- **Por lo tanto.** Cada elemento existe para comunicar; si no comunica, se quita. El contraste se
  asigna según el nivel de importancia. Hay consistencia total: cualquier pieza se reconoce como VIU.
- **Cómo se mide.** Se puede justificar la presencia de cada elemento. Nada es decorativo,
  desordenado ni "porque sí".
- **Qué NO es.** No es decoración, no es desorden, y no es minimalismo absurdo (vacío sin intención).

### P5 · Accesible y humana, sin excepción
- **Qué significa.** La accesibilidad es un piso obligatorio, no un extra. La voz es profesional
  pero cercana: clara, simple y entendible por cualquiera.
- **Por lo tanto (accesibilidad).** Contraste verificado con números; estados de foco siempre;
  estructura legible por lectores de pantalla; el estado se comunica con color + información, nunca
  solo color; mensajes de error claros; breakpoints claros.
- **Por lo tanto (voz).** Profesional + amigable + inteligente; educativa y simple; con humor
  inteligente que no cae en lo tonto; CTAs de máximo 3 palabras; nunca despectiva ni discriminatoria.
- **Cómo se mide.** WCAG 2.2 AA verificado numéricamente (4.5:1 texto, 3:1 texto grande/UI).
  Checklist de voz por cada pieza de texto.
- **Qué NO es.** No es accesibilidad "si alcanza el tiempo". No es jerga técnica ni un tono frío o
  distante.

### P6 · Construimos para escalar y para durar — la IA incluida
- **Qué significa.** Estrategia de largo plazo que considera al usuario desde el inicio. Sistemas y
  operaciones ejecutables y viables, incluyendo cómo construir alrededor de la IA de forma real.
  Ambición global.
- **Por lo tanto.** Preferimos decisiones que componen capacidad en el tiempo sobre atajos de corto
  plazo. Toda integración de IA debe ser viable y mantenible, no un truco.
- **Cómo se mide.** Cada decisión relevante favorece durabilidad y escala. Toda integración de IA
  tiene un caso de uso viable y un sistema alrededor.
- **Qué NO es.** No es solución de corto plazo. No es IA por moda sin sistema que la sostenga.

### P7 · Un norte claro, con flexibilidad para corregir el rumbo
- **Qué significa.** Creemos en la iteración, la mejora continua y la optimización. Un north star
  (objetivo guía) marca la dirección; si en el camino algo mejora el resultado, se ajusta.
- **Por lo tanto.** Siempre existe un norte declarado. Los cambios se prueban, se documentan y se
  revisan.
- **Cómo se mide.** Hay un north star explícito por iniciativa. Toda decisión queda registrada en el
  decision log.
- **Qué NO es.** No es rigidez, ni cambio sin registro.

## Orden de prioridad (cómo se resuelven los conflictos)
Cuando dos principios compiten, este es el desempate. No se deja a criterio del momento.
- **Pisos no negociables (nunca se sacrifican):** 1. Accesibilidad (P5). Si una solución no cumple
  AA, no se aprueba, sin importar qué otro principio la favorezca. 2. Locks de identidad: base negra;
  rojo de VIU como acento primario de marca (con un secundario menor frío); contención (ante la
  duda, se quita).
- **Entre objetivos, cuando compiten, gana el de número menor:** P1 (problema real) → P2
  (experiencia natural) → P3 (autoridad) → P4 (estructura) → P6 (escala y durabilidad) → P7
  (iteración).
- **Ejemplo:** si "agregar más opciones" (completitud) choca con P2 (experiencia natural) y P4
  (contención), pierden las opciones — se simplifica o se revela de forma progresiva.

## No-objetivos (lo que VIU explícitamente NO es)
Existen para defender el sistema del crecimiento sin criterio.
- No parece nueva, insegura, pequeña ni amateur.
- No es decorativa, desordenada ni sin intención.
- No es minimalista por moda (vacío que no comunica).
- No usa jerga técnica ni un tono frío en su voz.
- No es despectiva ni discriminatoria, nunca.
- No abusa del movimiento: sin animación exagerada ni sobre-complicada.
- No vende soluciones de corto plazo ni superficiales.
- No es genérica: si una decisión podría aparecer igual en cualquier sistema, se replantea.

## Esencia visual y verbal (nivel marca)
Esto fija el carácter; los valores numéricos exactos viven en la arquitectura/tokens.
- **Color.** Base negra. El rojo de VIU es el acento primario de marca; su gama se genera anclando
  el hue (matiz) en el rojo y variando brillo y saturación, en versión clara y oscura. Hay un acento
  secundario menor: un índigo/morado frío profundo, `#272558` — subordinado al rojo, para apoyo,
  profundidad y gradients, nunca para competir con él. La versión clara usa un blanco frío, nunca
  crema. Las alertas y estados tienden a una sensación fría, no cálida. Se exploran gradients sutiles
  entre los oscuros y la paleta. Guía de proporción 10-20-70.
- **Tipografía.** Las familias ya están definidas; se usan con autoridad y con legibilidad
  obligatoria. Escala responsive con variantes display/large/medium/small según dispositivo.
- **Retícula.** Base de 8px, con paso de 4px para elementos pequeños (escala mixta).
- **Componentes.** Botón primario (destaca), secundario (soporte real) y terciario (situaciones muy
  específicas). Los estados (reposo/hover/foco) se distinguen con color y una micro-animación que les
  da personalidad. Los componentes son flexibles dentro de su contenedor. Todo componente se siente
  parte de la marca.
- **Voz.** Profesional, cercana, clara, educativa, con humor inteligente. Términos positivos,
  estratégicos e inclusivos.

## Gobernanza
Reglas explícitas de quién decide y cuándo se revisa el sistema.
- **Creación de componentes.** Solo la dueña del sistema (Natalia) crea o aprueba componentes
  nuevos, en Figma o en código.
- **Documentación de decisiones.** Cada decisión se registra en un decision log al tomarse.
- **Revisión del sistema.** Se revisa ante cualquier cambio significativo (por ejemplo, un cambio de
  color general o de tipografía).
- **Definición de "funcional/terminado".** Un componente o el sistema está terminado cuando la dueña
  lo aprueba explícitamente como funcional — no antes.
- **Versionado y madurez.** Se versiona con semver; cada token y componente lleva una etiqueta de
  madurez en la **escala única `Draft / Reviewed / Stable / Deprecated`** *(unificada jun-2026, A1;
  antes coexistía `experimental/estable/obsoleto`, ahora deprecado como vocabulario).*

## Decisión de marca registrada · acento secundario
La identidad parte de "rojo como acento primario". Se incorpora un acento secundario menor:
`#272558`, un índigo/morado frío profundo. Es un acento secundario de marca (no solo un tono para
estados): subordinado al rojo y de uso acotado, para profundidad, gradients y énfasis secundario. El
rojo sigue siendo el acento dominante; el secundario nunca compite con él (regla de contención,
P-prioridad).

**Implicación para la capa de tokens (a resolver en arquitectura):** como `#272558` es muy oscuro,
sobre fondos oscuros se usarán tintes más claros derivados anclando ese hue y variando
brillo/saturación, de modo que cualquier uso como texto o ícono cumpla contraste AA. La base
`#272558` se usa tal cual sobre fondos claros y como extremo de gradient sobre los oscuros.

---
Los principios definen el porqué. `canon.md` los respalda con teoría; la capa de arquitectura define
el qué y el cómo. Si alguno de estos principios deja de reflejar la intención de la marca, se
actualiza acá primero — este documento es la fuente de mayor autoridad del sistema.
