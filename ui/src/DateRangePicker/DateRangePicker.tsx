import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import { startOfDay, type DateRange } from "../Calendar/calendarUtils";
import { DateField } from "../DateField/DateField";
import styles from "./DateRangePicker.module.css";

export type { DateRange };

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

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Date range picker (Figma `732:120`): two DateField triggers (Desde / Hasta)
 * that open the shared brand Calendar in range mode — endpoints are brand
 * circles, the days between a brand-subtle band. Two-click selection (start,
 * then end). Mirrors Figma, which composes the range picker from two Datepicker
 * fields plus one Calendar.
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

    const pick = (day: Date) => {
      const d = startOfDay(day);
      let next: DateRange;
      if (!range.from || (range.from && range.to)) next = { from: d, to: null };
      else if (d < range.from) next = { from: d, to: null };
      else next = { from: range.from, to: d };
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <div className={cx(styles.root, className)} ref={setRefs}>
        <div className={styles.fields}>
          <DateField
            label={fromLabel}
            value={range.from}
            open={open}
            disabled={disabled}
            onClick={() => !disabled && setOpen(true)}
          />
          <DateField
            label={toLabel}
            value={range.to}
            open={open}
            disabled={disabled}
            onClick={() => !disabled && setOpen(true)}
          />
        </div>

        {open ? (
          <Calendar
            mode="range"
            range={range}
            defaultMonth={range.from ?? undefined}
            onPick={pick}
            onClose={() => setOpen(false)}
            labelId={labelId}
          />
        ) : null}
      </div>
    );
  },
);
