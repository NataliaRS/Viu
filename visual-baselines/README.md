# Visual baselines (F5b · regresión **DOM-vs-DOM**)

El gate mecánico compara **el screenshot de la story contra sí mismo en el tiempo** — la
baseline ES un screenshot de la story (Chromium), no un PNG de Figma. Mismo rasterizer en
baseline y en la corrida → estable: una story sin cambios da ~0% de diferencia, y un % >0 es
señal real (algo cambió), no ruido. Captura automatizada:
`node scripts/capture-baselines.mjs --storybook ui/storybook-static [--only "Badge"]`.

**Por qué NO se compara contra Figma (doctrina, aprobada jul-2026):** la fidelidad Figma↔web se
juzga en **métricas y tokens** (padding, gap, tamaños, tracking, dimensiones — verificable) y **a
ojo de la dueña** al aprobar baselines; **nunca por pixel-diff cross-rasterizer**, cuyo residuo
(~15% medido en el POC, con paridad métrica excelente) es ruido de rasterización — tipografías
incluidas — y no señal. Prohibido introducir gates/métricas que afirmen paridad pixel-perfecta con
Figma. (Ver `code-build` + `decision-log` F5 · POC visual.)

**Aprobación de baselines (gobernanza):** una baseline nueva la aprueba Natalia comparando **LADO
A LADO** el screenshot de la story (`visual-baselines/`) contra el render del nodo Figma
(`visual-figma-refs/`, generado por `scripts/capture-figma-refs.mjs` con `FIGMA_TOKEN`; es **ayuda
de revisión, NO baseline**). Ahí vive el vínculo Figma↔diseño. La baseline aprobada va en commit
propio etiquetado `baseline:` + `skip:false`. **PROHIBIDO refrescar una baseline para poner en
verde un test que falla sin su OK explícito:** un fallo visual es una pregunta ("¿cambió a
propósito?"), la responde gobernanza, no el script. El workflow `visual-baseline.yml`
(`workflow_dispatch`) produce ambos PNG como artifact para esa revisión; no commitea nada.

`manifest.json`: una entry por comparación — `storyId` (la story a screenshotear), `baseline` (el
PNG DOM), `selector` (opcional, aísla el elemento; default `#storybook-root > *` — usalo cuando un
decorator envuelve la story), `threshold` (ratio 0–1 tolerado; con DOM-vs-DOM ~0, chico), `skip:
true` para desactivar sin borrar. `figmaNode` (+ `figmaFileKey` opcional cross-file) queda como
**referencia** para el render de Figma lado-a-lado, no como fuente de la baseline.

**Regla — story de paridad:** cada entry apunta a una **story de paridad dedicada**
(`…--visual-parity`) que espeja el **contenido literal del nodo Figma** (texto, íconos/puntos,
variante), no una story de uso — así el ojo compara lo mismo que el nodo. No le cambies el
contenido sin re-alinear el nodo y la baseline.

POC: Badge Tone=Neutral (`14:59` ↔ story `components-atoms-badge--visual-parity`). Cola sugerida:
Button, Input, Card, Tab — 5–10 core.
Corrida local del comparador: `node scripts/visual-regression.mjs --storybook ui/storybook-static`
