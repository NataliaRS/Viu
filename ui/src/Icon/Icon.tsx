import { forwardRef, type SVGProps } from "react";
import { glyphs, type GlyphName } from "./glyphs";
import styles from "./Icon.module.css";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /** Which VIU glyph to render. */
  glyph: GlyphName;
  /** Pixel size (width & height). Defaults to 16, the Figma source size. */
  size?: number | string;
  /**
   * Accessible label. When provided the icon is exposed as an image with this
   * name; when omitted the icon is hidden from assistive tech (decorative).
   */
  title?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { glyph, size = 16, title, className, ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      className={cx(styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {glyphs[glyph]}
    </svg>
  );
});
