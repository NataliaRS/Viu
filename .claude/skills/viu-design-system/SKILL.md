---
name: viu-design-system
description: "Skill maestro y única fuente de verdad del VIU Design System — marca, principios, canon teórico, estándar de documentación, y build operativo en Figma (MCP) y en código (repo NataliaRS/Viu, Storybook). Usar SIEMPRE que el trabajo toque cualquier cosa de VIU: crear/editar componentes, variantes, tokens, estilos, docs, patrones, portada o páginas en Figma; escribir o revisar componentes React/CSS/Storybook del repo; decisiones de marca, color, tipografía, voz, accesibilidad o gobernanza; auditorías de tokens/contraste; collateral de marketing con la marca VIU; o cualquier mención de 'VIU', 'el design system', 'el sistema', 'tokens', 'la librería', 'el Storybook' o 'el repo'. Cargar ANTES de la primera llamada a use_figma o al primer cambio en código. Reemplaza y absorbe al skill figma-viu-build."
metadata:
  version: "2026.07.03"
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
  deprecado; mapeo de transición: experimental→Draft·Reviewed, estable→Stable, obsoleto→Deprecated. *(Ejecución: ver decision-log.md · jun-2026 A1.)*
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
| **Estado actual del sistema (conteos, inventarios, pendientes vivos)** | `references/state.md` — la única fuente de estado; se actualiza en cada batch |
| **Historia: decisiones cerradas, batches, correcciones** | `references/decision-log.md` — append-only |
| Decisión de marca, conflicto entre principios, voz, no-objetivos | `references/principles.md` |
| Justificar/cuestionar un principio con teoría (Norman, WCAG, Frost, Kholmatova…) | `references/canon.md` |
| Estados, capas `--state-*`, motion `--motion-*`, reduced-motion, checklist de interacción | `references/interaction.md` |
| Documentar un componente o foundation (plantillas 11-dim / 6-dim, quality bar, equivalencias MD↔Figma↔Storybook) | `references/doc-standard.md` |
| Cualquier trabajo en Figma (use_figma, keys, registro de componentes, helpers, recetas, gotchas, inventario de 350 tokens) | `references/figma-build.md` — leer ANTES de la primera llamada a use_figma |
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
   doc-standard.md; skill → `node .claude/skills/viu-design-system/scripts/verify-pointers.mjs` y
   `verify-counts.mjs` en 0 (gates mecánicos del propio skill — F1). **Cross-check obligatorio con Figma ante CUALQUIER cambio visual/de componente:
   Figma es la fuente de verdad — confirmar nodo-a-nodo (`get_variable_defs` + `get_screenshot` con
   `enableBase64Response:true`, el sandbox bloquea egress a figma.com) antes de declarar hecho; no
   aplicar convenciones "de memoria" sin verificarlas. Detalle del método en `code-build.md`.** Ubicación del tooling: los gates de gobernanza (`build/token-usage.mjs`,
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
estado en `references/state.md` (conteos, inventarios, pendientes) y los de code-build/figma-build,
(b) la sección de convenciones que toque con los gotchas nuevos, (c) keys/IDs/tokens si cambiaron,
(d) **append** de lo cerrado en `references/decision-log.md` (nunca se edita lo ya logueado). Este
SKILL.md solo se toca si cambió una REGLA (identidad, gobernanza, proceso) — y entonces se bumpea
`metadata.version` en el frontmatter (fecha del cambio), que sirve para detectar snapshots viejos en
claude.ai contra el repo. Las actualizaciones
son fusiones que preservan todo el detalle previo — nunca un rewrite que pierda riqueza. Excepción
que evita que el skill acumule mentiras: un dato que quedó FALSO no se preserva, se corrige en el
lugar con nota (`corregido <fecha>: antes decía X`) — preservar riqueza ≠ preservar errores. Si algo
causó un rollback, un error de TS, un bug de foco, una sorpresa de CI o una corrección de token:
queda escrito acá, no solo en el chat. **Verificación mecánica (F1):** los scripts en `scripts/`
del skill — `verify-pointers.mjs` (punteros §↔headings) · `verify-counts.mjs` (conteos declarados vs.
snapshot de tokens, carpetas de `ui/src` con story, madurez en stories) · `verify-parity.mjs`
(manifest `components.json`; SKIPea hasta que exista, Fase 2) — deben salir en 0 antes de cerrar el
batch. Si `verify-counts` falla, el fix es actualizar el estado con nota de corrección — NUNCA
aflojar el script ni la EXCLUDE list para silenciarlo.

Al instalar este skill, **desinstalar `figma-viu-build`**: ambos compiten en triggering y el viejo
quedó atrás. Este lo absorbe entero.

### 5b. Sync del skill (el repo manda)
Este skill vive versionado en `NataliaRS/Viu` → `.claude/skills/viu-design-system/` (rama
`claude/viu-design-system`, repo público). Claude Code lo consume directo del filesystem — cada
commit lo actualiza al instante de ese lado. La copia instalada en claude.ai es un **snapshot** que
se republica a mano; nunca se editan las dos copias en paralelo: **el repo es la fuente de verdad
del skill mismo.**
- **Rutina "actualizá el skill desde el repo" (en chat, cuando Natalia lo pida):**
  1. `git clone --depth 1 https://github.com/NataliaRS/Viu.git` en el sandbox (github.com está
     permitido) y tomar `.claude/skills/viu-design-system/`.
  2. Correr los gates del skill antes de empaquetar: `node .claude/skills/viu-design-system/
     scripts/verify-pointers.mjs` + `verify-counts.mjs`. Si algo falla → avisar con el output y NO
     empaquetar (no se instala un skill con punteros rotos o conteos falsos).
  3. Empaquetar con el script del skill-creator desde un directorio ESCRIBIBLE:
     `cd /home/claude && PYTHONPATH=/mnt/skills/examples/skill-creator python -m
     scripts.package_skill <ruta-del-skill>` (correrlo desde el dir del skill-creator falla:
     filesystem read-only).
  4. Copiar el `.skill` a outputs + `present_files` → Natalia toca **Save skill** (mismo nombre =
     reemplaza la instalada). Total: un mensaje + un click.
  - **Vía preferida desde F3 (jul-2026):** cada push que toca la carpeta del skill dispara
    `package-skill.yml`, que corre los tres gates y sube el `.skill` como artifact (90 días) — bajar
    el artifact del run verde e instalarlo: cero mensajes, un click. La rutina de arriba queda como
    fallback y para verificaciones ad-hoc.
- **Dirección inversa (el batch se cerró en chat, no en Code):** generar los archivos actualizados
  del skill, presentarlos, y Natalia le pide a Claude Code que los commitee a
  `.claude/skills/viu-design-system/`. Después, opcionalmente, correr la rutina de arriba para
  republicar el snapshot de chat desde el repo.
- **Regla §5 ampliada:** el cierre de batch en Claude Code incluye commitear la carpeta
  `.claude/skills/viu-design-system/` en el mismo commit/PR del batch — el repo nunca queda atrás
  del código.

