import { forwardRef, type SelectHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Select.module.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error, className, children, ...rest },
  ref,
) {
  return (
    <span className={styles.wrap}>
      <select
        ref={ref}
        className={cx(styles.field, error && styles.error, className)}
        aria-invalid={error || undefined}
        {...rest}
      >
        {children}
      </select>
      <Icon glyph="Chevron" size={16} className={styles.chevron} />
    </span>
  );
});
