/**
 * Mapeo del set legacy de glifos VIU → nombres de Material Symbols (Google).
 *
 * El sistema de íconos pasó a **Material Symbols** (ver canon §Sistema de íconos):
 * el `Icon` ahora renderiza la ligadura de la fuente "Material Symbols Outlined".
 * Para no tocar los ~48 usos del repo, la prop `glyph` sigue aceptando los 11
 * nombres legacy y se resuelven acá al símbolo Material correspondiente.
 *
 * Direccionales (Chevron/Arrow): el baseline del CÓDIGO es derecha (el viejo
 * glyph apuntaba →), y los componentes rotan por CSS. Por eso Chevron→`chevron_right`
 * y Arrow→`arrow_forward` (apuntan a la derecha): todas las rotaciones existentes
 * (rotate 90→abajo, 180→izquierda, 270→arriba) se conservan sin tocar CSS.
 * (En Figma el baseline es abajo y por eso allí Chevron rot0→`stat_minus_1`.)
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

/** Legacy glyph → Material Symbol (ligature name). */
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

/**
 * Resuelve el símbolo Material a renderizar. Acepta un nombre legacy
 * (`"Chevron"`) o directamente un símbolo Material (`"calendar_month"`).
 */
export function resolveSymbol(glyph: string): string {
  return (glyphToSymbol as Record<string, string>)[glyph] ?? glyph;
}

/**
 * Símbolos Material usados por el sistema. Se pasan a Google Fonts como
 * `icon_names=` para subsetear la fuente (ver ui/README + preview-head.html).
 */
export const USED_SYMBOLS = [
  "add",
  "arrow_forward",
  "check",
  "chevron_right",
  "close",
  "folder",
  "info",
  "search",
  "visibility",
  "visibility_off",
  "warning",
] as const;
