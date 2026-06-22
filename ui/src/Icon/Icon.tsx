import { forwardRef, type HTMLAttributes } from "react";
import { resolveSymbol, type GlyphName } from "./glyphs";
import styles from "./Icon.module.css";

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "ref" | "children"> {
  /**
   * Ícono a renderizar. Acepta los nombres legacy del sistema (`"Chevron"`,
   * `"Plus"`…) o directamente un nombre de Material Symbol (`"calendar_month"`).
   */
  glyph: GlyphName | (string & {});
  /** Pixel size (width & height & font-size). Defaults to 16. */
  size?: number | string;
  /**
   * Accessible label. When provided the icon is exposed as an image with this
   * name; when omitted the icon is hidden from assistive tech (decorative).
   */
  title?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Ícono del sistema VIU = **Material Symbols** (fuente "Material Symbols Outlined",
 * cargada por la app — ver ui/README). Renderiza la ligadura del símbolo; el color
 * hereda de `currentColor` y el tamaño del `font-size`.
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { glyph, size = 16, title, className, style, ...rest },
  ref,
) {
  const symbol = resolveSymbol(glyph);
  return (
    <span
      ref={ref}
      className={cx(styles.icon, className)}
      data-icon={symbol}
      style={{ fontSize: size, ...style }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      translate="no"
      {...rest}
    >
      {symbol}
    </span>
  );
});
