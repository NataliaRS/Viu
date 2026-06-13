import { useRef, type ReactNode } from "react";
import { useFlipSide } from "../overlay/useFlipSide";
import styles from "./Tooltip.module.css";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip content. */
  label: ReactNode;
  side?: TooltipSide;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * CSS-only tooltip: shows on hover/focus of the wrapped trigger. The resolved
 * side flips to the opposite edge when the preferred side would overflow the
 * viewport (measured on hover/focus via the shared `useFlipSide`).
 */
export function Tooltip({ label, side = "top", children }: TooltipProps) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const bubbleRef = useRef<HTMLSpanElement | null>(null);
  const { side: resolved, recompute } = useFlipSide(side);

  const measure = () => recompute(wrapRef.current, bubbleRef.current);

  return (
    <span
      className={styles.wrap}
      ref={wrapRef}
      onPointerEnter={measure}
      onFocusCapture={measure}
    >
      {children}
      <span ref={bubbleRef} role="tooltip" className={cx(styles.bubble, styles[resolved])}>
        {label}
      </span>
    </span>
  );
}
