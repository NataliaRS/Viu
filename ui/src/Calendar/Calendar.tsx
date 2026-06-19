import { useState, type KeyboardEvent } from "react";
import { Icon } from "../Icon/Icon";
import {
  MONTHS,
  WEEKDAYS,
  fmt,
  monthCells,
  sameDay,
  type DateRange,
} from "./calendarUtils";
import styles from "./Calendar.module.css";

export interface CalendarProps {
  mode: "single" | "range";
  /** Selected date (single mode). */
  selected?: Date | null;
  /** Selected range (range mode). */
  range?: DateRange;
  /** Month shown when the calendar mounts. */
  defaultMonth?: Date;
  onPick: (day: Date) => void;
  /** Called on Escape. */
  onClose?: () => void;
  /** id wired to the month header for the dialog's aria-labelledby. */
  labelId?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Brand calendar popover shared by Datepicker (single) and DateRangePicker
 * (range). Single selection = brand circle (+ today ring); range = brand
 * endpoints with a brand-subtle band between them. Monday-first, Spanish
 * labels. It is rendered conditionally by the parent, so it remounts on each
 * open and `defaultMonth` seeds the visible month correctly.
 */
export function Calendar({ mode, selected = null, range, defaultMonth, onPick, onClose, labelId }: CalendarProps) {
  const seed = defaultMonth ?? selected ?? range?.from ?? new Date();
  const [view, setView] = useState({ year: seed.getFullYear(), month: seed.getMonth() });
  const today = new Date();

  const move = (delta: number) =>
    setView(({ year, month }) => {
      const m = month + delta;
      return { year: year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose?.();
    }
  };

  const isSelected = (d: Date) =>
    mode === "single"
      ? sameDay(d, selected)
      : sameDay(d, range?.from ?? null) || sameDay(d, range?.to ?? null);
  const isInRange = (d: Date) =>
    mode === "range" && !!range?.from && !!range?.to && d > range.from && d < range.to;
  const isToday = (d: Date) => mode === "single" && sameDay(d, today);

  return (
    <div role="dialog" aria-labelledby={labelId} className={styles.calendar} onKeyDown={onKeyDown}>
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
                isToday(d) && styles.today,
                isInRange(d) && styles.inRange,
                isSelected(d) && styles.selected,
              )}
              aria-label={fmt(d)}
              aria-pressed={isSelected(d)}
              onClick={() => onPick(d)}
            >
              {d.getDate()}
            </button>
          ) : (
            <span key={i} className={styles.blank} />
          ),
        )}
      </div>
    </div>
  );
}
