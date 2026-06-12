import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Divider.module.css";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Optional centered label (horizontal only). */
  label?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = "horizontal", label, className, ...rest },
  ref,
) {
  if (orientation === "horizontal" && label) {
    return (
      <div ref={ref} role="separator" className={cx(styles.labeled, className)} {...rest}>
        <span className={styles.line} />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} />
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cx(styles.divider, styles[orientation], className)}
      {...rest}
    />
  );
});
