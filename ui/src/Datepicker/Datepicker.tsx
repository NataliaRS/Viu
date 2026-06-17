import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Icon } from "../Icon/Icon";
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

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");
const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (d: Date) => `${pad(d.getDate())} / ${pad(d.getMonth() + 1)} / ${d.getFullYear()}`;
const sameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Days of `month` (0-based) laid out Monday-first, with leading nulls for blanks. */
function monthCells(year: number, month: number): Array<Date | null> {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // Mon-first
  const days = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  return cells;
}

/**
 * Date picker (Figma `28:386`): a trigger field that opens a custom brand
 * calendar popover. The selected day is a brand circle; today is a bordered
 * ring. Single-date selection, Monday-first, Spanish month/weekday labels.
 *
 * NOTE: this replaced the previous native `<input type="date">` wrapper, which
 * did not match the Figma calendar. The Icon set has no calendar glyph, so the
 * field affordance is the same Chevron used by Select/DateRangePicker.
 */
export const Datepicker = forwardRef<HTMLButtonElement, DatepickerProps>(function Datepicker(
  { value, defaultValue, onValueChange, label, htmlFor, helper, error, disabled, className },
  ref,
) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const selected = controlled ? value : internal;

  const [open, setOpen] = useState(false);
  const initial = selected ?? new Date();
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });

  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const message = error ?? helper;
  const today = new Date();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open]);

  const commit = (next: Date | null) => {
    if (!controlled) setInternal(next);
    onValueChange?.(next);
  };

  const pick = (day: Date) => {
    commit(startOfDay(day));
    setOpen(false);
  };

  const toggleOpen = () => {
    if (disabled) return;
    if (selected) setView({ year: selected.getFullYear(), month: selected.getMonth() });
    setOpen((o) => !o);
  };

  const move = (delta: number) =>
    setView(({ year, month }) => {
      const m = month + delta;
      return { year: year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });

  const onCalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
    }
  };

  return (
    <div className={cx(styles.root, className)} ref={rootRef}>
      {label ? (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      <button
        ref={ref}
        type="button"
        id={htmlFor}
        className={cx(styles.field, open && styles.open, !!error && styles.error)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={error ? true : undefined}
        onClick={toggleOpen}
      >
        <span className={selected ? styles.value : styles.placeholder}>
          {selected ? fmt(selected) : "DD / MM / AAAA"}
        </span>
        <Icon glyph="Chevron" size={18} className={styles.fieldIcon} title="" />
      </button>

      {message ? (
        <p className={cx(styles.message, error ? styles.messageError : false)}>{message}</p>
      ) : null}

      {open ? (
        <div role="dialog" aria-labelledby={labelId} className={styles.calendar} onKeyDown={onCalKeyDown}>
          <div className={styles.header}>
            <button type="button" className={styles.nav} aria-label="Mes anterior" onClick={() => move(-1)}>
              <Icon glyph="Chevron" size={18} className={styles.prev} title="" />
            </button>
            <p id={labelId} className={styles.month}>
              {MONTHS[view.month]} {view.year}
            </p>
            <button type="button" className={styles.nav} aria-label="Mes siguiente" onClick={() => move(1)}>
              <Icon glyph="Chevron" size={18} title="" />
            </button>
          </div>

          <div className={styles.weekdays}>
            {WEEKDAYS.map((w, i) => (
              <span key={i} className={styles.weekday}>{w}</span>
            ))}
          </div>

          <div className={styles.grid}>
            {monthCells(view.year, view.month).map((d, i) =>
              d ? (
                <button
                  key={i}
                  type="button"
                  className={cx(
                    styles.day,
                    sameDay(d, today) && styles.today,
                    sameDay(d, selected) && styles.selected,
                  )}
                  aria-label={fmt(d)}
                  aria-pressed={sameDay(d, selected)}
                  onClick={() => pick(d)}
                >
                  {d.getDate()}
                </button>
              ) : (
                <span key={i} className={styles.blank} />
              ),
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
});
