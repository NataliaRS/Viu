import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./Pill.module.css";

export interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected (active filter) state — maps to Figma `State=Selected`. */
  selected?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Pill = forwardRef<HTMLButtonElement, PillProps>(function Pill(
  { selected = false, className, children, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cx(styles.pill, selected && styles.selected, className)}
      {...rest}
    >
      {children}
    </button>
  );
});
