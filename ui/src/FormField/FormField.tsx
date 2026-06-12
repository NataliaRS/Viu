import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./FormField.module.css";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** Associates the label with the control (pass the same id to your input). */
  htmlFor?: string;
  required?: boolean;
  /** Helper text shown below the control. */
  helper?: ReactNode;
  /** Error message — replaces the helper and switches to the error style. */
  error?: ReactNode;
  disabled?: boolean;
  /** The form control (Input, Select, Textarea, …). */
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { label, htmlFor, required, helper, error, disabled, children, className, ...rest },
  ref,
) {
  const message = error ?? helper;
  return (
    <div ref={ref} className={cx(styles.field, disabled && styles.disabled, className)} {...rest}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className={styles.req} aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
      {message ? <p className={cx(styles.message, error ? styles.error : false)}>{message}</p> : null}
    </div>
  );
});
