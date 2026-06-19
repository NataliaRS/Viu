import { forwardRef, useId, type ReactNode } from "react";
import { fmt } from "../Calendar/calendarUtils";
import styles from "./DateField.module.css";

export interface DateFieldProps {
  label?: ReactNode;
  /** Associates the label with the trigger; auto-generated when omitted. */
  htmlFor?: string;
  /** Date shown in the field, or null for the placeholder. */
  value?: Date | null;
  placeholder?: string;
  open?: boolean;
  error?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Calendar glyph drawn inline (Figma draws it as a vector in the field, not an Icon instance). */
function CalendarGlyph() {
  return (
    <svg
      className={styles.icon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden
      focusable="false"
    >
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M2 6.5 H14" />
      <path d="M5.5 2 V4" />
      <path d="M10.5 2 V4" />
    </svg>
  );
}

/**
 * Shared date trigger field: label + value/placeholder + calendar glyph.
 * Reused by Datepicker (one field) and DateRangePicker (Desde / Hasta), mirroring
 * Figma where the range picker composes two Datepicker fields.
 */
export const DateField = forwardRef<HTMLButtonElement, DateFieldProps>(function DateField(
  { label, htmlFor, value = null, placeholder = "DD / MM / AAAA", open, error, disabled, onClick },
  ref,
) {
  const reactId = useId();
  const id = htmlFor ?? reactId;
  return (
    <div className={styles.wrap}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <button
        ref={ref}
        type="button"
        id={id}
        className={cx(styles.field, open && styles.open, error && styles.error)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={error || undefined}
        onClick={onClick}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value ? fmt(value) : placeholder}
        </span>
        <CalendarGlyph />
      </button>
    </div>
  );
});
