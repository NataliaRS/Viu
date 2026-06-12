import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./PasswordInput.module.css";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Password field with a show/hide toggle (Field/Password). */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { error, className, ...rest },
  ref,
) {
  const [visible, setVisible] = useState(false);
  return (
    <span className={styles.wrap}>
      <input
        ref={ref}
        type={visible ? "text" : "password"}
        className={cx(styles.field, error && styles.error, className)}
        aria-invalid={error || undefined}
        {...rest}
      />
      <button
        type="button"
        className={styles.toggle}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
      >
        <Icon glyph={visible ? "VisibilityOff" : "Visibility"} size={16} />
      </button>
    </span>
  );
});
