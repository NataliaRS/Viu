import { forwardRef, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Calendar } from "../Calendar/Calendar";
import { startOfDay } from "../Calendar/calendarUtils";
import { DateField } from "../DateField/DateField";
import styles from "./Datepicker.module.css";

export interface DatepickerProps {
  /** Controlled selected date. */
  value?: Date | null;
  /** Uncontrolled initial date. */
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
  label?: ReactNode;
  /** Associates the label with the trigger for a11y. */
  htmlFor?: string;
  helper?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Date picker (Figma `28:386`): a trigger field (DateField) that opens the
 * shared brand Calendar in single mode. The selected day is a brand circle and
 * today a bordered ring. The Calendar and DateField are the same primitives the
 * DateRangePicker composes, mirroring Figma's component reuse.
 */
export const Datepicker = forwardRef<HTMLButtonElement, DatepickerProps>(function Datepicker(
  { value, defaultValue, onValueChange, label, htmlFor, helper, error, disabled, className },
  ref,
) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const selected = controlled ? value : internal;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const message = error ?? helper;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open]);

  const pick = (day: Date) => {
    const next = startOfDay(day);
    if (!controlled) setInternal(next);
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <div className={cx(styles.root, className)} ref={rootRef}>
      <DateField
        ref={ref}
        label={label}
        htmlFor={htmlFor}
        value={selected}
        open={open}
        error={!!error}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((o) => !o);
        }}
      />

      {message ? (
        <p className={cx(styles.message, !!error && styles.messageError)}>{message}</p>
      ) : null}

      {open ? (
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? undefined}
          onPick={pick}
          onClose={() => setOpen(false)}
          labelId={labelId}
        />
      ) : null}
    </div>
  );
});
