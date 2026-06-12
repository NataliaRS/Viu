import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Progress.module.css";

export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–max. Ignored when `indeterminate`. */
  value?: number;
  max?: number;
  size?: ProgressSize;
  indeterminate?: boolean;
  /** Accessible label. */
  label?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, max = 100, size = "md", indeterminate = false, label, className, ...rest },
  ref,
) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-label={label}
      className={cx(styles.track, styles[size], indeterminate && styles.indeterminate, className)}
      {...rest}
    >
      <div className={styles.fill} style={indeterminate ? undefined : { width: `${pct}%` }} />
    </div>
  );
});
