import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./IconContainer.module.css";

export type IconContainerSize = "sm" | "md" | "lg";
export type IconContainerTone =
  | "brand"
  | "neutral"
  | "inverse"
  | "danger"
  | "warning"
  | "success"
  | "info"
  | "disabled";
/** Figma `Style`: relleno con tinte vs borde de color. */
export type IconContainerAppearance = "filled" | "stroke";

export interface IconContainerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma `Size` — contenedor 24/32/40, ícono 16/24/32. */
  size?: IconContainerSize;
  /** Figma `Tone` — color semántico del marco y el ícono. */
  tone?: IconContainerTone;
  /** Figma `Style` — `filled` (tinte) o `stroke` (borde). */
  appearance?: IconContainerAppearance;
  /** The icon to frame (e.g. <Icon glyph="Info" />). Sized automatically. */
  icon: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Marco circular para un ícono (Figma `574:150`). El color del marco y del ícono
 * (vía `currentColor`) lo da el `tone`; `appearance` elige relleno con tinte
 * (`filled`) o borde de color (`stroke`).
 */
export const IconContainer = forwardRef<HTMLSpanElement, IconContainerProps>(function IconContainer(
  { size = "lg", tone = "neutral", appearance = "filled", icon, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx(styles.container, styles[size], styles[appearance], styles[tone], className)}
      {...rest}
    >
      {icon}
    </span>
  );
});
