import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  indeterminate?: boolean;
  label?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { indeterminate = false, label, className, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else if (ref) (ref as any).current = node;
  };

  return (
    <label className={cx(styles.root, className)}>
      <input ref={setRefs} type="checkbox" className={styles.input} {...rest} />
      <span className={styles.box} aria-hidden>
        <span className={styles.check}>
          <Icon glyph="Check" size={12} />
        </span>
        <span className={styles.bar} />
      </span>
      {label != null ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
});
