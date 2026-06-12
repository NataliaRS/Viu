---
name: figma-viu-build
description: Construir y mantener el VIU Design System en Figma vía el MCP de Figma (use_figma + get_screenshot + get_metadata + search_design_system + get_design_context + get_variable_defs). Usar SIEMPRE para crear/editar componentes, variantes, tokens, estilos, docs, patrones, portada o páginas en el archivo de Componentes de VIU. Incluye registro completo de componentes con IDs, mapa de tokens, kit de helpers en JS, estructura de doc, recetas, procedimientos (swap/tipografía/imagen/design-to-code) y los gotchas que causan rollback. Cargar antes de la primera llamada a use_figma.
---

# Figma VIU — build via MCP

## 0. Modelo del entorno (leer primero)
- `use_figma` ejecuta JS del Plugin API. Es **stateless** (pasar `fileKey` en cada llamada) y **transaccional**: cualquier error hace rollback total de esa llamada. Hacé el cambio + la verificación de datos en la MISMA llamada (devolver ids/medidas); el screenshot va en llamada aparte.
- Código ≤ 50000 chars por llamada. **Las fuentes NO persisten entre llamadas** → cargarlas en cada una antes de tocar texto.
- **Dos archivos, sin sync automático:**
  - Tokens/estilos (librería publicada): `o4tzMPcZIWMzVc67dW6dWW` (colecciones: Primitives [modo "Value", default 5:0], Semantic [Dark 8:0 / Light 8:1], Scales, Type Scale [Mobile/Desktop]).
  - Componentes (archivo de trabajo): `kjEg0KpLID4cH00DruERTN`.
  - Editar variable/estilo en Tokens NO se ve en Componentes hasta que el usuario **republica** la librería y acepta updates. Siempre avisarlo.
- **Las Sections (módulos de página) viven en un archivo Figma APARTE** — no están en Componentes. No mezclar.
- Importar de la librería por key: `importVariableByKeyAsync`, `importStyleByKeyAsync`, `importComponentByKeyAsync`, `importComponentSetByKeyAsync`. Los componentes de Componentes son LOCALES (archivo no publicado) → instanciar con `getNodeByIdAsync(id)` + `.createInstance()`.
- `figma.currentPage` no es asignable → `await figma.setCurrentPageAsync(page)`. `figma.loadAllPagesAsync` NO existe → iterar `figma.root.children` con `await page.loadAsync()`.
- `getPluginData`/`setPluginData` no van; usar `getSharedPluginData(ns,key)` / `setSharedPluginData(...)` con namespace estable (≥3 chars).

## 1. Pre-flight checklist
1. ¿En qué archivo escribo? (Componentes para componentes/docs/patrones; Tokens para variables/estilos.)
2. Cargar TODAS las fuentes que los estilos resuelven (§3).
3. Reinyectar el kit de helpers (§4).
4. Construyendo en una página: `await figma.setCurrentPageAsync(page)` O `page.appendChild(frame)` SIEMPRE (createFrame cae en la página ACTUAL).
5. Para reutilizar: `search_design_system` / import por key / `getNodeByIdAsync` antes de crear.
6. Ante cualquier duda del estado, LEERLO del archivo (no de memoria). El screenshot a veces va con lag en texto recién sobreescrito por propiedad → el dato del nodo es la verdad.

## 2. Mapa de keys VIU (revalidar en el primer arranque, §11)
> Inventario COMPLETO de las 5 colecciones de variables (331 tokens) auditado en §13. Acá van solo las keys de import más usadas para construir en Figma.

**Chrome de doc (Componentes):** `_Header`=`7:22` (overrides Eyebrow/Title/Description) · `_Footer`=`7:26`.

**Tokens semánticos (importVariableByKeyAsync) — hex Dark:**
- bg/base `a94efb30d1a29b23436cf6f55ef378bf20af7995` `#0a0a0b` · bg/raised `93a33ba1d5e233516c8a9747e8bca30047f63c8f` `#141416` · bg/elevated `37599ec0f26a47552c0d6936ab83375fefa8e3a2` `#1c1c1f` · bg/subtle `d14cf2604b2eb8fd08a8134e4f18b0874c4bb160` (SEMI-TRANSP, no cubre imágenes) · bg/strong `2415ce030a43a901d0fd6cf32909a617e4203fce` `#3a3a3e`
- bg/brand (FILL crimson) `8c1696cc425e0b0d8bc98130d76e3a5c4273ae41` `#b5262e` · bg/brand-2 (indigo) `01c7bf9ee385684a8b84aca7a080db968b3a4227` `#5a55a8` · bg/brand-subtle `2490dd9872fc55e9679f05f0355d803de1ed167b` · bg/brand-2-subtle `11f304934a8b99c3de55f140069438937703f838`
- border/subtle `d2263eddc3aca55f034d9ad5fa9ad1f0ec930bcd` (white-16) · border/default `90ec1c5e091e3df1f852a5cea09683ccd77f823f` (white-28) · border/strong `95b17f30a2f6694fc8b3522d89233bcdb00e1556` (white-40) · border/focus `574dfa18bda1a8cb92ca8bb84835b0173704ca0c` `#5a55a8`
- text/primary `dde7ee7f0f9be83886de934f843ad8e868650371` `#f5f5f7` · text/secondary `a381f45842865dca09d59f08c469f72ff2d4d11c` `#a8a8ad` · text/tertiary `e705c41d9a7e98eb94e364860b6c3ceeb350c8ae` `#828287` · text/brand (TEXT-only salmon) `07c58022dce329153b6fff605b7c3c60769fcc88` `#f07178` · text/on-brand `774bff01c82efe80d874a5afd90b74baad12a8fc` `#fff`
- success-text `8db46a247f22f06e0b26d9f59d4f0f1d2d7d20b8` `#3dd68c` · success-solid `2e9317f051cf30a68ac5cf49ba91f59f26d7745b` `#20b473` · danger-text `52cf9ba1bf50f8ac3d9e3eaf549a8037d7f6c375` · danger-border `22034da3a0982b1f0d2e06c945f3259a64a0386e`
- radius lg `3a98dc2bceeff0e8e530868d9c76cb05f222372a` (=12) · radius md `6e0a09c87a9d3af496418c444d2c125ee2fef6c9` (=8) · space lg `aa45f870bfc1daed41b4871d679c3e73c8f90f6f` · md `89a14d0c02f77bc4405042eee51bb1f38ff208bd` · sm `7acaa18b794037b200aa57ae3a3804d66f641a86` · xs `4cf7f6a394c4559902ca399b641201e076b0e00d`

**Primitivos útiles:** alpha/white-16 `0a37c90969569f3d330645a9d1fc4a827b084b7f` · white-28 `ecec71da3851ec639f2428745a54a78f970163aa` · white-40 `1cd88b4d5c7c1796891310af5c520c8944bc9835` · neutral/650 `#3a3a3e` `f5253a937baa0b7a5b4069cc9ec7976f78674efc`.

**Estilos de texto (importStyleByKeyAsync):** Display/S `d0284b1a9190395762f7706eb5128d78f196320b` · Headline/M `6e23fbd2712ff04361892f8bc0b3f21ebf8596b8` · Title/L `35dc28c7eead42b51c97d0ef3fe6fd613a4941c0` · Title/M `7ff700ce6778474996205cf9a4c0e4863aa3657d` · Title/S `603620ded06931efb0b85430a31c168394a6fe3e` · Body/L `1b1f4a805f78a665a9f2f7e6b8575ea8167a0a3f` · Body/M `28bd418f889fa4fafa936d61b7838beb0b07a620` · Body/S `6fd038d3797dd3f906f20bae8c7d72c5b1b6a9ff` · Label/M `e51a9ec1c4c217deac07dd686e95e98b75aee9a7` · Label/S `718d9549efb62b130d784332a9a41519b2888185`.

**Familias de fuente (cargar TODAS al inicio de un build de texto):**
- Display/Headline/Title (sección) → **PP Neue Montreal / Medium**
- **Body/* (lectura) → Google Sans / Regular** ← (migrado; Merriweather ELIMINADO)
- Label/* (UI: botones, tags, inputs) → **General Sans / Medium**
- Code → **JetBrains Mono**
- Variables de familia (tokens de código): `font-family/display`, `font-family/body` y `font-family/reading` → ambas ahora `"Google Sans", "General Sans", "Inter", system-ui, sans-serif`; `font-family/mono`. **Las text styles NO bindean fontFamily a la variable**: la variable = token de código (stack CSS), el estilo = familia literal de Figma; mantener ambos en sync a mano. Para cambiar la fuente del sistema: actualizar la VARIABLE (`setValueForMode`) y el `fontName` de los estilos por rol. "Inter" usa style "Semi Bold" (con espacio).

### 2b. Registro de componentes (IDs locales · página = componente)
Instanciar con `getNodeByIdAsync(id)`. SET(n)=set de n variantes; COMP=componente único.

**ÁTOMOS (27):** Icon `56:431` SET(8) Glyph:Plus/Check/Chevron/Close/Arrow/Search/Info/Alert · Icon button `393:190` SET(36) Variant·State·Size · Button `8:53` SET(45) Variant Primary/Secondary/Tertiary·State Default/Hover/Pressed/Disabled/Focus·Size MD/SM/LG (`Label#53:0`) · Badge `14:77` SET(6) Tone (`Label#65:0`) · Link `22:137` SET(5) State (`Label#65:19`) · Tag `15:42` SET(3) Tone Neutral/Brand/Indigo (`Label#65:7`) · Status `20:150` SET(4) Online/Busy/Away/Offline · Pill `16:63` SET(6) State (`Label#65:23`) · Chip `17:67` SET(12) Type Input/Con avatar/Choice·State · Notification badge `18:75` SET(3) Dot/Count/Max · Avatar `19:90` SET(10) Size XS–XL·Type Iniciales/Imagen (`Iniciales#66:4`) · Divider `20:97` SET(3) · Progress `22:184` SET(3) · Tooltip `23:167` SET(2) · Checkbox `24:167` SET(12) · Radio `24:227` SET(8) · Switch `24:279` SET(8) · Slider `225:16` SET(2) Único/Rango · Input `26:197` SET(5) · Skeleton `229:10` SET(3) · Spinner `20:209` SET(3) · Select `26:293` SET(5) · Step `189:25` SET(3) · Textarea `26:250` SET(5) · Tab `161:43` SET(6) Estilo Línea/Segmentado·Estado · Rating `410:43` SET(6) 0–5 · Image `543:62` SET(15) Aspect ratio 16:9/4:3/1:1/3:2/Libre · Estado Default/Loading/Error (Default=fill imagen cover · Loading=superficie+Spinner · Error=superficie+Icon Alert+"Sin imagen"; sin props de texto/bool, imagen por imageHash; doc en `Atom · Image`).

**MOLÉCULAS (31):** Search `26:347` SET(4) (`Texto#84:18`) · Datepicker `28:386` SET(5) · Toast `176:101` SET(4) Tono · Field/Textarea `223:46` SET(4) · Stepper `339:66` COMP · Accordion item `174:19` SET(2) · Accordion `399:7` COMP · Avatar group `185:37` SET(2) · Banner `135:84` SET(5) Tono (`Texto título#135:12`,`Texto mensaje#135:13`) · Form field `27:255` SET(3) · Menu `377:6` COMP · Dropzone `235:28` SET(3) · File row `237:49` SET(3) · Breadcrumb `163:19` SET(2) · List item `165:41` SET(4) · Menu item `170:21` SET(3) · Table row `195:58` SET(3) · Field/Input `362:6` SET(4) · Field/Password `407:6` SET(4) · Tabs `366:6` COMP · Field/Select `191:33` (pág "Select field") SET(4) · Pagination `168:32` SET(2) · Toolbar `172:29` COMP · Nav item `233:19` SET(3) · Nav `401:7` COMP · List `400:7` COMP · Quote `413:7` COMP · Tree item `411:19` SET(3) · Rich text `402:7` COMP · Time picker `409:6` SET(4) · Video embed `414:7` COMP.

**ORGANISMOS (9):** Table `372:6` COMP · **Card `434:6` SET(45)** (§6) · Modal `140:57` SET(3) Tamaño · Page header `147:89` SET(3) (`Título#147:17`,`Texto subtítulo#147:18`,`Texto breadcrumb#147:19`) · Empty state `157:55` SET(3) · Drawer `227:53` COMP · Popover `187:69` SET(2) · Tree view `412:7` COMP · Footer `415:7` COMP.

**PATRONES (5, frames de composición — NO componentes; páginas `Pattern ·`):** Formulario · App shell · Form · Wizard · Data table.

## 3. Cargar fuentes (siempre, antes de characters/textAutoResize)

```js
for (const f of [
  {family:'PP Neue Montreal', style:'Medium'},
  {family:'General Sans', style:'Regular'},
  {family:'General Sans', style:'Medium'},
  {family:'Google Sans', style:'Regular'},
  {family:'Google Sans', style:'Medium'},
]) await figma.loadFontAsync(f);
```

Si aplicás un text style, cargá la familia que ESE estilo resuelve HOY (Body=Google Sans, Label=General Sans, Display/Title=PP Neue). "Inter" → "Semi Bold" (con espacio).

## 4. Kit de helpers (reinyectar en cada build)

```js
async function importVars(map){const V={};for(const[n,k]of Object.entries(map))
  V[n]=await figma.variables.importVariableByKeyAsync(k);return V;}
async function importStyles(map){const S={};for(const[n,k]of Object.entries(map))
  S[n]=(await figma.importStyleByKeyAsync(k)).id;return S;}
function bf(n,V,key){n.fills=[figma.variables.setBoundVariableForPaint(
  {type:'SOLID',color:{r:0,g:0,b:0}},'color',V[key])];}
function bs(n,V,key){n.strokes=[figma.variables.setBoundVariableForPaint(
  {type:'SOLID',color:{r:0,g:0,b:0}},'color',V[key])];}
function bind(n,f,V,key){n.setBoundVariable(f,V[key]);} // f='itemSpacing'|'paddingLeft'|'topLeftRadius'...
function bindR(n,V,key){['topLeftRadius','topRightRadius','bottomLeftRadius',
  'bottomRightRadius'].forEach(f=>n.setBoundVariable(f,V[key]));}
// med: 'pp'→PP Neue Medium · 'ls'→General Sans Medium · default→Google Sans Regular (body)
async function T(s,styleId,V,colorKey,med){const t=figma.createText();
  t.fontName=med==='pp'?{family:'PP Neue Montreal',style:'Medium'}
    :med==='ls'?{family:'General Sans',style:'Medium'}
    :{family:'Google Sans',style:'Regular'};
  t.characters=s; if(styleId) await t.setTextStyleIdAsync(styleId);
  bf(t,V,colorKey); t.textAutoResize='HEIGHT'; return t;}
function recolor(inst,V,key){inst.findAll(n=>true).forEach(n=>{ // line icons usan strokes
  if('strokes'in n&&Array.isArray(n.strokes)&&n.strokes.length)bs(n,V,key);
  if('fills'in n&&Array.isArray(n.fills)&&n.fills.length&&n.type!=='COMPONENT'&&n.type!=='INSTANCE')bf(n,V,key);});}
function setLabel(inst,val){const k=Object.keys(inst.componentProperties||{})
  .find(x=>/^Label/.test(x)&&inst.componentProperties[x].type==='TEXT');
  if(k)try{inst.setProperties({[k]:val});}catch(e){}}
// reusar un text style de otro nodo en uno nuevo: nuevo.setTextStyleIdAsync(otro.textStyleId)
```

## 5. Auto-layout (orden correcto)
- Fijar `primaryAxisSizingMode`/`counterAxisSizingMode='FIXED'` ANTES de `resize`. HUG=`'AUTO'`; FILL en su eje=`layoutAlign='STRETCH'` (padre FIXED ese eje); distribuir=`layoutGrow=1`.
- **GOTCHA: `resize(w,h)` sobre un eje en AUTO lo pasa a FIXED.** Si después agregás hijos, el frame queda con alto fijo y CLIPEA (lo vimos en root de homepage y en bloques del índice de portada). Solución: setear `primaryAxisSizingMode='AUTO'` DESPUÉS de poblar hijos, no via resize.
- Texto dentro de tarjeta/columna: `layoutAlign='STRETCH'` o ancho fijo, o se desborda a su ancho natural (bug visual recurrente).
- Grids/chips: `layoutWrap='WRAP'` + `counterAxisSpacing` (necesita ancho fijo).
- Conectores/subrayados alineados en fila: ítems del mismo alto + `counterAxisAlignItems='MIN'` (o 'MAX').
- Frame con auto-layout en HUG ignora `resize`. Overlay full-bleed → FIXED ambos ejes + resize + `constraints {STRETCH,STRETCH}`. `layoutPositioning='ABSOLUTE'` saca del flujo; pineá con constraints (MIN/MAX/STRETCH). Z-order = orden de hijos (último = encima).
- **Contenedores con texto variable (pill, chip, tag, badge, botón, link): el root DEBE ir con `primaryAxisSizingMode='AUTO'` (hug) en el eje del texto — nunca FIXED**, o el texto largo se desborda/clipea en vez de expandir el contenedor. El texto interno con `textAutoResize='WIDTH_AND_HEIGHT'`. Si se necesita un tope, usar `maxWidth` + `textTruncation='ENDING'`, no un ancho fijo. (Bug real: el Pill tenía FIXED=80px y no crecía; el resto de la familia ya estaba en hug — auditado.)

## 6. Componentes / variantes (recetas)
- Hermano: `set.clone()` (clona variantes+props con refs recableadas; releer keys del clon). Ej.: Field/Input = clonar Field/Select y quitar el chevron.
- `combineAsVariants` NO posiciona: tras `figma.combineAsVariants([...],page)` acomodar `v.x` en fila + `set.resize(...)`. Agregar un eje de variante: clonar variantes del valor base, `name.replace('Eje=Viejo','Eje=Nuevo')`, `set.appendChild(clone)`, reposicionar en grilla.
- Property keys con sufijo `#id` (`Label#161:2`): leerlos de `componentPropertyDefinitions`, NO adivinar. Las VARIANT (`Estado`,`Variant`,`Estilo`,`Size`,`Superficie`,`Disposición`) van SIN sufijo.
- Default de prop: `set.editComponentProperty(key,{defaultValue})`. Override por instancia: `inst.setProperties({...})`.
- Glifo/ícono anidado intercambiable: en cada variante, append al componente PRIMERO → `nestedIcon.isExposedInstance=true` → la prop `Glyph` aparece en la instancia; cambiar con `setProperties({'Glyph':'Search'})`.
- Mover un subárbol a un wrapper puede romper `componentPropertyReferences` → re-asignar la ref después (`{characters:'…#id'}` / `{visible:'…#id'}`) en TODAS las variantes; mapear por orden dentro del frame es más robusto que por nombre.
- Mover nodo entre páginas: `destPage.appendChild(node)` (ids/refs persisten). No se puede borrar la página actual (cambiar primero).
- Estrellas (Rating): `createStar()`. Triángulo play: `createVector()` `vectorPaths=[{windingRule:'NONZERO',data:'M 0 0 L 22 13 L 0 26 Z'}]`.

### 6b. Card (`434:6`) — receta
45 variantes: **Superficie** (Elevated/Outlined/Filled) × **Estado** (Default/Hover/Focus/Selected/Disabled) × **Disposición** (Arriba/Lateral/Abajo). Raíz (Arriba): `[Media, Content, Badge(abs), Barra(abs)]`.
- **Media** (`Media#123:0`): frame con FILL de imagen. Arriba (vertical 320×160) / Lateral (izq, ancho fijo) / Abajo (al pie, esquinas SUP redondeadas ligadas a radius + clipsContent).
- **Content** (VERTICAL): `Ícono → Tags → Encabezado(eyebrow/título/subtítulo + ícono acción) → Cuerpo → Leer más(Link) → Footer → Divisor → Autor`.
  - **Ícono** (`Ícono#422:0`): **DESACOPLADO de la imagen** — caja compacta 48×48 (bg/elevated + border/subtle + radius md) con glifo centrado EXPUESTO, al tope del Content. Ícono e imagen tienen booleano y espacio independientes (no overlay).
  - **Autor** (`Avatar#123:1`): avatar+nombre+meta al PIE tras divisor (`Autor nombre#436:0`,`Autor meta#436:31`).
  - Footer con `Botón primario#458:0` y `Botón secundario#458:46` (independientes → 0/1/2 botones).
- **Barra** (`Barra#447:0`): acento sup 4px bg/brand, absolute, `constraints {STRETCH,MIN}`, root `clipsContent=true`.
- **Badge** (`Badge#123:7`): absolute sup-der sobre la imagen. **En Abajo baja con la imagen**: `v.appendChild(badge)` (z-order al frente, porque el Media es el último hijo) + reposicionar sobre la esquina sup-der del media de abajo + `constraints {MAX,MAX}`.
- Props texto/swap: Título#123:8 · Texto eyebrow#123:9 · Texto subtítulo#123:10 · Texto cuerpo#123:11 · Ícono acción#123:13 (INSTANCE_SWAP) · más booleanos Eyebrow#123:2 · Subtítulo#123:3 · Acción#123:4 · Cuerpo#123:5 · Footer#123:6 · Tags#442:0 · Link#443:0.

## 7. Estructura canónica de doc (un componente = una página)
Frame vertical 1024, fondo bg/base: `_Header`(7:22, STRETCH; Eyebrow `ÁTOMO|MOLÉCULA|ORGANISMO · <CAT>`) → `Content`(VERTICAL, padding L/R 96, top 48, bottom 72, gap 56; Anatomía / Propiedades [o Composición+Comportamiento] / Cuándo y dónde) → `_Footer`(7:26, STRETCH). Frame `<Componente> · Doc`; página `Atom ·`/`Molecule ·`/`Organism ·`. Ítem y contenedor en páginas SEPARADAS (Step/Stepper, Tab/Tabs, Table row/Table, Menu item/Menu, Nav item/Nav, List item/List, Tree item/Tree view, Accordion item/Accordion). Patrones en `Pattern ·`, sin esta estructura (ejemplo armado). Tratamiento global: `page.backgrounds` #1A1A1A; cada frame de Doc stroke 1px border/subtle, `strokeAlign='INSIDE'`.

### 7b. Portada (`Portada` 0:1, frame `31:413`)
Layout ABSOLUTO: logo VIU+punto, eyebrow crimson, título, descripción, Índice `31:421`, _Footer. Índice **por nivel atómico** (ÁTOMOS·26 / MOLÉCULAS·31 / ORGANISMOS·9 / PATRONES·5): por bloque, rótulo crimson (Label/S, reusar el estilo/fill existente) + párrafo con nombres separados por " · ". Cuidado con el gotcha de §5 en los bloques (poner AUTO tras poblar, o clipea). Las Sections NO van (archivo aparte).

## 8. Verificación
- Screenshot por URL (barato); `enableBase64Response:true` solo para inspeccionar a fondo o sin shell. No amplía sobre el tamaño natural → aislar el nodo.
- Diagnóstico fino (¿falta label?, ¿color?, ¿texto recién seteado?): leer DATOS del nodo (`characters`/`visible`/`width`/`opacity`/`componentPropertyReferences`) es más confiable que una imagen chica. Verificar cada cambio antes de declararlo hecho.

## 9. Taxonomía VIU
Átomo = primitivo. Molécula = composición (`Field / X`; página `Molecule ·`). Organismo = bloque complejo/superficie. Badge/Tag comunican (no interactivos); Pill/Chip se accionan; Notification badge se monta encima. No son el mismo componente.

## 10. Paridad con código / design-to-code
- Fuente de verdad de tokens = la VARIABLE de Figma; el código (`tokens.json → CSS`) se deriva. Las text styles NO bindean fontFamily a la variable → mantener en sync a mano (§2).
- Extraer specs por nodo: `get_design_context` (code+screenshot+metadata) y `get_variable_defs` (tokens aplicados a ESE nodo).
- **Auditar TODO el sistema de tokens: NO uses `get_variable_defs`** (solo devuelve lo pegado a un nodo → incompleto). Usá `getLocalVariablesAsync` vía `use_figma` (§11) y compará contra el inventario completo (§13).
- Las 5 colecciones del archivo Tokens (auditadas jun-2026, §13): Primitives(183) · Semantic(52) · Scales(70) · Type Scale(23) · Grid(3) = **331 variables**.
- **Sync a repo:** el MCP de Figma NO escribe a disco. Pero las **sesiones web de Claude Code SÍ tienen file tools + git** → el código vive en el repo `NataliaRS/Viu` (§14). En sesiones sin file tools, entregar el contenido como texto.

## 11. Primer arranque (revalidar keys)

```js
const vars = await figma.variables.getLocalVariablesAsync();   // archivo Tokens
const styles = await figma.getLocalTextStylesAsync();
// mapear name→{key, valuesByMode/fontName} y comparar contra §2
```

En Componentes, ubicar componentes/páginas por nombre iterando `figma.root.children` (no asumir ids viejos si hubo reorganización).

## 12. Disciplina de proceso
- Inspeccionar el estado REAL antes de afirmar (el contexto puede estar viejo).
- Antes de borrar: censo — confirmar que el "duplicado" es idéntico y que el que queda está completo; reordenar dependencias primero. Para swap de un set: escanear TODO el archivo por instancias (`i.mainComponent?.parent?.id===oldId`), mover+renombrar el nuevo (el id no cambia → instancias siguen ligadas), borrar el viejo (borra sus instancias), reconstruir ejemplos del doc, preservar assets fuente.
- Cambio de tipografía/estilo de librería: editar `fontName` de estilos + `setValueForMode` de las font-family vars en Tokens → el usuario republica → barrer en el consumidor SOLO nodos crudos (`textStyleId===''`) con `fontName` directo; saltar los que tienen estilo (actualizan vía republish; tocarlos crea override). Mixto → `getStyledTextSegments(['fontName'])`+`setRangeFontName`.
- Imagen por hash: leer `fills.find(f=>f.type==='IMAGE').imageHash` del origen; aplicar `node.fills=fills.map(f=>f.type==='IMAGE'?Object.assign({},f,{imageHash:TARGET}):f)`; barrido "todo menos avatar" salta ancestros "avatar" y nodos dentro de instancias (heredan del master).
- Responder español rioplatense, nivel Director, conciso, con tradeoffs honestos. Cambio + verificación de datos en la misma llamada; screenshot aparte.

## 13. Sistema de tokens — inventario completo (auditado vía `getLocalVariablesAsync`, jun 2026)
5 colecciones / **331 variables**. Nombres con "/" = jerarquía. Los aliases SIEMPRE apuntan a Primitives.

**Primitives (183, mode `Value`):**
- `color/{red 300-700, neutral 0-1000 (incl 650=#3a3a3e), green/amber/alert/blue 50-700, indigo 300-900}` · `alpha/{white-06/12/16/24/28/40/72, black-08/14/24/72, red-12/24/32, green-14, amber-16, alert-14, blue-14, indigo-14/24}`
- `space/{0,2,4,6,8,12,16,20,24,32,40,48,64,96,128,192,256}` · `radius/{none0,xs4,sm6,md8,lg12,xl16,2xl24,round9999}`
- `border-width/{0,1,2,3,4}` · `icon-size/{xs16,sm20,md24,lg32,xl40,2xl48}` · `opacity/{0,5,8,12,16,24,38,60,100}`
- `z/{hide -1, base 0, raised 100, docked 300, dropdown 1000, sticky 1100, banner 1200, overlay 1300, modal 1400, popover 1500, toast 1600, tooltip 1700}`
- `breakpoint/{xs320,sm768,md1024,lg1280,xl1440,2xl1920}` · `duration/{instant0,fast160,base240,moderate320,slow400,emphasized480,deliberate600}ms`
- `font-size/{50:11,75:12,100:14,200:16,300:18,400:20,500:22,600:25,700:28,800:32,900:36,1000:40,1100:45,1200:51,1300:58,1400:65,1500:73,1600:82}`
- `font-weight/{regular400,medium500,semibold600,bold700}` · `line-height/{tight1.2,snug1.3,relaxed1.5}` · `tracking/{tight -0.02em, normal 0, wide 0.04em}`
- `font-family/{display:"PP Neue Montreal",Satoshi,"Söhne Breit"; body & reading:"Google Sans","General Sans",Inter; mono:"JetBrains Mono"}`
- `easing/{standard,enter,exit,emphasized}` · `aspect-ratio/{square,4-3,3-2,16-9,21-9,golden}`

**Semantic (52, `Dark`/`Light`):** `color/bg/*` (16, incl `strong`=neutral/650 Dark · neutral/100 Light), `text/*` (11), `border/*` (5), `feedback/*` (20 = success/warning/danger/info × text/border/surface/solid/on-solid).

**Scales (70, `Value` — aliases):** `space/{3xs..6xl + stack-*/inline-*/inset-*}`, `radius/{xs,control=md,surface=lg,pill=round}`, `border-width/{default1,strong2,heavy4}`, `z/*`, `font-weight/emphasis=semibold`, `icon/{sm,md,lg,xl}`, `state/{hover=op8,focus=op12,pressed=op16,dragged=op24,disabled=op38}`, `size/target-min=space24`, `aspect/*`, `motion/{duration-micro..loop, ease-*}`.

**Type Scale (23, `Mobile`/`Desktop` — aliases a `font-size/*`):** oversize/display/headline/title L·M·S, body XL·L·M·S, label 2XL·XL·L·M·S, code M·S. Cada uno con alias distinto por modo (ej. `title-l` Mobile={500}=22 / Desktop={700}=28). body/label/code son iguales en ambos modos.

**Grid (3, modos base/sm/md/lg/xl/2xl):** `grid-columns` 4/8/8/12/12/12 · `grid-gutter` 16/24/24/32/32/32 · `grid-margin` 16/32/48/48/64/96.

**Text styles** (separados de las variables): Oversize/Display/Headline/Title → PP Neue Montreal Medium; Body → Google Sans Regular; Label → General Sans Medium; Code → JetBrains Mono. `letterSpacing` en **%** → tight=-2% (=-0.02em); Label/S=4% (=0.04em, NO 4px). `lineHeight`: display/headline 120%, title 130%, body/label/code 150%.

> GOTCHA de auditoría: `get_variable_defs` solo ve variables PEGADAS a un nodo. Una extracción previa "por frames" se perdió ~250 variables (todo lo no-color: border-width, icon-size, opacity, z, duration, font-size numéricos, easing, aspect-ratio, scales semánticas, modo Mobile del Type Scale). Auditar SIEMPRE con `getLocalVariablesAsync`.

## 14. Repo de código — `@viu/design-tokens` + `@viu/ui` (`NataliaRS/Viu`, público)
Repo trabajado en sesiones web de Claude Code (rama `claude/*`). Storybook en vivo: **https://nataliars.github.io/Viu/**

**Tokens (raíz):** `tokens/{primitives,semantic,scales,type-scale,grid}.json` espejan 1:1 las 5 colecciones (§13). `scripts/build-tokens.mjs` (sin deps) resuelve alias y emite `dist/{tokens.css,tokens.json,tokens.js,.d.ts}`. Comando: `npm run build:tokens`.
- CSS: primitivos + scales + grid en `:root`; Semantic black-first (`:root`=Dark, `[data-theme="light"]`, `prefers-color-scheme`); Type Scale responsive (Mobile en `:root`, Desktop en `@media (min-width:1024px)` — **el disparador 1024px es decisión de código**; Figma cambia el modo por frame, no hay breakpoint oficial). Clases `.viu-type-*`, contenedor `.viu-grid`.
- Naming CSS: `color/bg/base`→`--color-bg-base`, `space/md`→`--space-md`. Derivados de código (NO son variables Figma): `--font-family-label` (=General Sans, tomado de la text style Label) y `--font-family-code` (=mono).

**Componentes:** `ui/` = paquete `@viu/ui` (React 18 + TS + CSS Modules). tsup→dist, Vitest, playground Vite, Storybook 8 (react-vite + addon-a11y + switch de tema). Cada componente: `Componente.tsx` + `.module.css` + `.stories.tsx` + `.figma.tsx` (Code Connect).
- Hechos — **capa de átomos COMPLETA (28)**: Icon, IconButton, Button, Badge, Link, Tag, Status, Pill, Chip, Notification badge, Avatar, Divider, Progress, Tooltip, Checkbox, Radio, Switch, Slider, Input, Skeleton, Spinner, Select, Step, Textarea, Tab, Rating, Image, Icon container. Pendiente: moléculas/organismos/patrones del registro §2b (design-to-code con `get_design_context`/`get_variable_defs` por nodo).
- Deudas conocidas: Slider solo modo Único (falta Rango/doble thumb); Tooltip CSS-only sin colisión/flip; Icon container derivado del recipe de Card (no tiene nodo propio en Figma).
- Iconos: SVG stroke a mano (`currentColor`) — el sandbox bloquea descargar assets de Figma; reemplazables por los exportados.

**Regla de consumo de tokens (código) — CERO valores mágicos:** un componente nunca usa hex ni números sueltos. Mapa de tokenización (úsalo para CADA componente nuevo del Tramo 2+):
- color → SOLO Semantic (`--color-bg|text|border|feedback-*`). Nunca primitivos de color ni hex.
- espaciado/padding/gap → `--space-*` (Scales) · radios → `--radius-*` (Scales) · z-index → `--z-*`.
- transiciones → `transition-duration: var(--motion-duration-micro)` + `transition-timing-function: var(--motion-ease-standard)` (Scales). Animaciones largas → `--motion-duration-loop`.
- bordes/líneas → `--border-width-default` (1px) / `--border-width-strong` (2px). Focus ring → `outline: var(--border-width-strong) solid var(--color-border-focus); outline-offset: var(--space-3xs)`.
- tamaño de iconos → `--icon-size-*` (xs16/sm20/md24/lg32/xl40/2xl48).
- tipografía → `--font-size-*` (Type Scale, responsive), `--font-family-{display|body|label|code}`, `--font-weight-*`, `--line-height-{tight|snug|relaxed}`, `--tracking-{tight|normal|wide}`. (Para micro-labels en mayúscula: `--tracking-wide`.)
- **Matiz honesto:** en código SÍ se consumen ciertos primitivos sin capa semántica (font-family, font-weight, line-height, tracking, icon-size, font-size numéricos). La regla Figma "nunca Primitives" aplica a COLOR; en tipografía/dimensión esos primitivos SON los tokens consumibles.
- Literales aceptados (también literales en Figma, no hay token): bordes `1.5px` de Button/IconButton; alturas de control 32/40/48; tamaños de Avatar 24–64; `2.5px` del Spinner MD.

**Consumir desde JS/TS** (`@viu/design-tokens`): claves con **slash**. `tokens.semantic.{dark,light}["color/bg/base"]` · `tokens.scales["space/md"]` · `tokens.type.{mobile,desktop}["font-size/title-l"]` · `tokens.grid["grid-columns"][mode]`. (El `preview.html` del repo las usa así.)

**CI/deploy:** `.github/workflows/deploy-storybook.yml` → build + GitHub Pages en cada push. Pages se habilita 1 vez (Settings→Pages→Source: GitHub Actions). La GitHub App de Claude Code necesita permiso **Contents: write** para pushear.

**Correcciones halladas en la auditoría (ya aplicadas en código):** `bg/strong` Light = neutral/100 (no 200) · `breakpoint/xs`=320 (no 375) · Type Scale es responsive (no solo Desktop) → corrige iniciales de Avatar LG (18px Mobile) · letterSpacing de Figma en % → micro-labels (Badge/Tag/Status/Label-S) usan `tracking/wide`=0.04em (no 4px).

## Estado actual (junio 2026)
**Tokens:** auditados 1:1 contra Figma (331 vars / 5 colecciones, §13) y espejados en código (repo §14); paridad verificada. **Código:** `@viu/design-tokens` (pipeline tokens→CSS) + `@viu/ui` con los **28 átomos completos** en Storybook desplegado.
Tipografía Google Sans (body/reading); Merriweather eliminado (0 nodos). 67 componentes en Figma: 27 átomos · 31 moléculas · 9 organismos + 5 patrones. Sections en archivo aparte. Card modular (45 var): Disposición Arriba/Lateral/Abajo, ícono desacoplado, autor al pie, tags, leer más, barra, footer 2 botones, badge que sigue a la imagen. Portada con índice por nivel atómico. Homepage de prueba en `Test · Homepage`. Gaps opcionales: Segmented control, Radio/Checkbox group, Combobox/Autocomplete, Date range picker, Kbd. Átomo Image (15 var: Aspect ratio × Estado) como primitiva de media; thumbnail = Image en ratio chico (no es componente aparte). Video sigue siendo molécula (Video embed `414:7`); su poster puede instanciar Image a futuro.
