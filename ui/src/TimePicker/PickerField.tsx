import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./PickerField.module.css";

export interface PickerFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Native input type (e.g. "time" or "date"). */
  pickerType: string;
  label?: ReactNode;
  htmlFor?: string;
  helper?: ReactNode;
  error?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Shared trigger field for date/time pickers: label + native input + chevron + help/error. */
export const PickerField = forwardRef<HTMLInputElement, PickerFieldProps>(function PickerField(
  { pickerType, label, htmlFor, helper, error, disabled, className, onClick, ...rest },
  ref,
) {
  const message = error ?? helper;
  return (
    <div className={cx(styles.field, disabled && styles.disabled, className)}>
      {label ? (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      <div className={cx(styles.control, error ? styles.error : false)}>
        <input
          ref={ref}
          id={htmlFor}
          type={pickerType}
          className={styles.input}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          onClick={(e) => {
            (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
            onClick?.(e);
          }}
          {...rest}
        />
        <Icon glyph="Chevron" size={18} className={styles.chevron} />
      </div>
      {message ? <p className={cx(styles.message, error ? styles.messageError : false)}>{message}</p> : null}
    </div>
  );
});
