import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./IconContainer.module.css";

export type IconContainerSize = "sm" | "md" | "lg";

export interface IconContainerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: IconContainerSize;
  /** The icon to frame (e.g. <Icon glyph="Info" />). Sized automatically. */
  icon: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * A framed surface for an icon (bg/elevated + border/subtle + radius/control).
 * Derived from the Card recipe's decoupled icon box (§6b of the build skill).
 */
export const IconContainer = forwardRef<HTMLSpanElement, IconContainerProps>(function IconContainer(
  { size = "lg", icon, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx(styles.container, styles[size], className)} {...rest}>
      {icon}
    </span>
  );
});
