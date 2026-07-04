# Visual baselines (F5 · regresión Figma ↔ Storybook)

Las baselines son artefactos **aprobados** por la dueña del sistema — pero la captura está
automatizada: `FIGMA_TOKEN=… node scripts/capture-baselines.mjs` renderiza cada `figmaNode`
del manifest vía la Images REST API de Figma (Pro alcanza) y guarda los PNG 1x acá. Nadie
exporta a mano.

**Gobernanza (regla):** baselines nuevas o cambiadas van en commit propio etiquetado
`baseline:` que Natalia aprueba mirando el diff — su rol es aprobar, no operar. PROHIBIDO
refrescar una baseline para poner en verde un test que falla sin su OK explícito: un fallo
visual es una pregunta ("¿cambió a propósito?") y la responde gobernanza, no el script.

`manifest.json`: una entry por comparación — `figmaNode` (+ `figmaFileKey` opcional para
cross-file, ej. el wrapper Icon), `storyId` (la story que renderiza ESA MISMA variante),
`baseline` (el PNG), `selector` (opcional, aísla el elemento a comparar; default
`#storybook-root > *` — usalo cuando un decorator envuelve la story), `threshold` (ratio
0–1 tolerado; generoso al inicio — fuentes y antialiasing difieren entre Figma y browser),
`skip: true` para desactivar sin borrar.

**Regla — story de paridad (F5):** cada entry de regresión visual apunta a una **story de
paridad dedicada** (`…--visual-parity`) que espeja el **contenido literal del nodo Figma**,
no una story de uso. El comparador pixel-diffea, y una story de uso (p.ej. Badge `Default`
= "Nuevo") contra un nodo con otro texto ("Etiqueta" + punto) mide **contenidos distintos**,
no diferencias de render — falso positivo. La story de paridad replica texto, íconos/puntos
y variante exactos del nodo. Al agregar una entry, creá (o reusá) su `VisualParity` y no le
cambies el contenido sin re-alinear el nodo y la baseline.

POC: Badge Tone=Neutral (`14:59`). Cola sugerida (plan F5): Button, Input, Card, Tab —
5–10 core y calibrar thresholds antes de escalar.
Corrida local del comparador: `node scripts/visual-regression.mjs --storybook ui/storybook-static`
