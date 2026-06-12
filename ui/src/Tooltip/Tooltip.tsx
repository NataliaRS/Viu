import { type ReactNode } from "react";
import styles from "./Tooltip.module.css";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip content. */
  label: ReactNode;
  side?: TooltipSide;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** CSS-only tooltip: shows on hover/focus of the wrapped trigger. */
export function Tooltip({ label, side = "top", children }: TooltipProps) {
  return (
    <span className={styles.wrap}>
      {children}
      <span role="tooltip" className={cx(styles.bubble, styles[side])}>
        {label}
      </span>
    </span>
  );
}
