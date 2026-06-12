import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Radio.module.css";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, ...rest },
  ref,
) {
  return (
    <label className={cx(styles.root, className)}>
      <input ref={ref} type="radio" className={styles.input} {...rest} />
      <span className={styles.circle} aria-hidden>
        <span className={styles.dot} />
      </span>
      {label != null ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
});
