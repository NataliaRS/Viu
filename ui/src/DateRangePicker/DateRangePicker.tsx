import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Icon } from "../Icon/Icon";
import styles from "./DateRangePicker.module.css";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DateRangePickerProps {
  /** Controlled selected range. */
  value?: DateRange;
  /** Uncontrolled initial range. */
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  fromLabel?: string;
  toLabel?: string;
  disabled?: boolean;
  className?: string;
}

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

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
 * Date range picker (Figma `732:120`): two trigger fields (Desde / Hasta) that
 * open a shared custom range calendar — endpoints are brand circles, the days
 * between are a brand-subtle band. Two-click selection (start, then end).
 *
 * NOTE: Figma reuses the Datepicker visual for the two fields, but in code the
 * native Datepicker opens the OS date picker (which conflicts with this custom
 * calendar), so the fields are read-only triggers and the calendar is the only
 * selector. The Icon set has no calendar glyph, so the field affordance is the
 * standard Chevron used by the other fields.
 */
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    { value, defaultValue, onValueChange, fromLabel = "Desde", toLabel = "Hasta", disabled, className },
    ref,
  ) {
    const controlled = value !== undefined;
    const [internal, setInternal] = useState<DateRange>(defaultValue ?? { from: null, to: null });
    const range = controlled ? value : internal;

    const [open, setOpen] = useState(false);
    const initial = range.from ?? new Date();
    const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });

    const rootRef = useRef<HTMLDivElement | null>(null);
    const labelId = useId();

    const setRefs = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
    };

    useEffect(() => {
      if (!open) return;
      const onDown = (e: PointerEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("pointerdown", onDown, true);
      return () => document.removeEventListener("pointerdown", onDown, true);
    }, [open]);

    const commit = (next: DateRange) => {
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    };

    const pick = (day: Date) => {
      const d = startOfDay(day);
      let next: DateRange;
      if (!range.from || (range.from && range.to)) next = { from: d, to: null };
      else if (d < range.from) next = { from: d, to: null };
      else next = { from: range.from, to: d };
      commit(next);
    };

    const openOn = (anchor: Date | null) => {
      if (disabled) return;
      if (anchor) setView({ year: anchor.getFullYear(), month: anchor.getMonth() });
      setOpen(true);
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

    const inRange = (d: Date) =>
      !!range.from && !!range.to && d > range.from && d < range.to;
    const isEndpoint = (d: Date) => sameDay(d, range.from) || sameDay(d, range.to);

    const field = (label: string, val: Date | null) => (
      <div className={styles.fieldWrap}>
        <span className={styles.fieldLabel}>{label}</span>
        <button
          type="button"
          className={styles.field}
          disabled={disabled}
          aria-label={`${label}: ${val ? fmt(val) : "sin fecha"}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => openOn(val ?? range.from)}
        >
          <span className={val ? styles.value : styles.placeholder}>
            {val ? fmt(val) : "DD / MM / AAAA"}
          </span>
          <Icon glyph="Chevron" size={18} className={styles.fieldIcon} />
        </button>
      </div>
    );

    return (
      <div className={cx(styles.root, className)} ref={setRefs}>
        <div className={styles.fields}>
          {field(fromLabel, range.from)}
          {field(toLabel, range.to)}
        </div>

        {open ? (
          <div
            role="dialog"
            aria-labelledby={labelId}
            className={styles.calendar}
            onKeyDown={onCalKeyDown}
          >
            <div className={styles.header}>
              <button type="button" className={styles.nav} aria-label="Mes anterior" onClick={() => move(-1)}>
                <Icon glyph="Chevron" size={18} className={styles.prev} />
              </button>
              <p id={labelId} className={styles.month}>
                {MONTHS[view.month]} {view.year}
              </p>
              <button type="button" className={styles.nav} aria-label="Mes siguiente" onClick={() => move(1)}>
                <Icon glyph="Chevron" size={18} />
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
                    className={cx(styles.day, inRange(d) && styles.inRange, isEndpoint(d) && styles.endpoint)}
                    aria-label={fmt(d)}
                    aria-pressed={isEndpoint(d)}
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
  },
);
