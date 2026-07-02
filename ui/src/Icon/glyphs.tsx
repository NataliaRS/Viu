/**
 * Íconos del sistema = **Material Symbols (Google)**, embebidos como SVG oficiales
 * (repo `google/material-design-icons`, estilo *Outlined*, peso 400, grade 0,
 * viewBox `0 -960 960 960`, basados en fill). Sin dependencia de fuente: el `Icon`
 * dibuja el path directamente con `fill: currentColor`.
 *
 * Para no tocar los ~48 usos del repo, la prop `glyph` sigue aceptando los 11
 * nombres legacy y se resuelven al símbolo Material correspondiente.
 *
 * Direccionales (Chevron/Arrow): el baseline del CÓDIGO es derecha (el viejo glyph
 * apuntaba →) y los componentes rotan por CSS; por eso Chevron→`chevron_right` y
 * Arrow→`arrow_forward` (apuntan a la derecha) y todas las rotaciones existentes
 * (rotate 90→abajo, 180→izquierda, 270→arriba) se conservan sin tocar CSS.
 * (En Figma el baseline es abajo y por eso allí Chevron rot0→`stat_minus_1`.)
 *
 * Sumar un ícono nuevo: copiar el path de `symbols/web/<name>/materialsymbolsoutlined/
 * <name>_24px.svg` del repo y agregarlo a `symbolPaths`.
 */
export type GlyphName =
  | "Plus"
  | "Check"
  | "Chevron"
  | "Close"
  | "Arrow"
  | "Search"
  | "Info"
  | "Alert"
  | "Visibility"
  | "VisibilityOff"
  | "Folder";

/** Legacy glyph → Material Symbol name. */
export const glyphToSymbol: Record<GlyphName, string> = {
  Plus: "add",
  Check: "check",
  Chevron: "chevron_right",
  Close: "close",
  Arrow: "arrow_forward",
  Search: "search",
  Info: "info",
  Alert: "warning",
  Visibility: "visibility",
  VisibilityOff: "visibility_off",
  Folder: "folder",
};

/** Material Symbol name → SVG path `d` (Outlined 400, viewBox 0 -960 960 960). */
export const symbolPaths: Record<string, string> = {
  add: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z",
  arrow_forward: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z",
  check: "M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z",
  chevron_right: "M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z",
  close:
    "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
  folder:
    "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z",
  info: "M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
  search:
    "M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z",
  visibility:
    "M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z",
  visibility_off:
    "m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z",
  warning:
    "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z",
  error:
    "M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
  account_circle:
    "M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z",
  stat_1: "m296-345-56-56 240-240 240 240-56 56-184-183-184 183Z",
};

/** Resuelve el nombre Material a partir de un nombre legacy o uno Material directo. */
export function resolveSymbol(glyph: string): string {
  return (glyphToSymbol as Record<string, string>)[glyph] ?? glyph;
}

/** Devuelve el path `d` del símbolo (o `undefined` si no está embebido). */
export function symbolPath(glyph: string): string | undefined {
  return symbolPaths[resolveSymbol(glyph)];
}

/** Símbolos Material embebidos (para docs/galería). */
export const USED_SYMBOLS = Object.keys(symbolPaths);
