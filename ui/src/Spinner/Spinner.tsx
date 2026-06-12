import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** Accessible label. Defaults to "Cargando". */
  label?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = "md", label = "Cargando", className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx(styles.spinner, styles[size], className)}
      {...rest}
    />
  );
});
