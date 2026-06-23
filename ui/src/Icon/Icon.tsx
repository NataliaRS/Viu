import { forwardRef, type SVGProps } from "react";
import { resolveSymbol, symbolPath, type GlyphName } from "./glyphs";
import styles from "./Icon.module.css";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /**
   * Ícono a renderizar. Acepta los nombres legacy del sistema (`"Chevron"`,
   * `"Plus"`…) o directamente un nombre de Material Symbol embebido (`"error"`).
   */
  glyph: GlyphName | (string & {});
  /** Pixel size (width & height). Defaults to 16. */
  size?: number | string;
  /**
   * Accessible label. When provided the icon is exposed as an image with this
   * name; when omitted the icon is hidden from assistive tech (decorative).
   */
  title?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Ícono del sistema VIU = **Material Symbols (Google)**, SVG oficial embebido
 * (Outlined 400, viewBox `0 -960 960 960`, fill = currentColor). Sin dependencia
 * de fuente. El color hereda del texto; el tamaño es width/height.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { glyph, size = 16, title, className, ...rest },
  ref,
) {
  const symbol = resolveSymbol(glyph);
  const d = symbolPath(glyph);
  return (
    <svg
      ref={ref}
      className={cx(styles.icon, className)}
      data-icon={symbol}
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {d ? <path d={d} /> : null}
    </svg>
  );
});
