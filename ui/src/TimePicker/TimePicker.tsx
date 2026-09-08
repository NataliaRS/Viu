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
import { MenuItem } from "../MenuItem/MenuItem";
import styles from "./TimePicker.module.css";

export interface TimePickerProps {
  /** Hora seleccionada, formato "HH:MM" (24h). Controlado. */
  value?: string;
  /** Valor inicial no controlado, "HH:MM". */
  defaultValue?: string;
  onValueChange?: (time: string) => void;
  label?: ReactNode;
  htmlFor?: string;
  helper?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  /** Minutos entre opciones. Default 30. */
  step?: number;
  /** Rango de opciones "HH:MM". Default 00:00–23:30. */
  min?: string;
  max?: string;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");
const pad = (n: number) => String(n).padStart(2, "0");
const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fromMinutes = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

function buildOptions(min: string, max: string, step: number): string[] {
  const lo = toMinutes(min);
  const hi = toMinutes(max);
  const out: string[] = [];
  for (let m = lo; m <= hi; m += step) out.push(fromMinutes(m));
  return out;
}

/**
 * Time picker (Figma `409:6`, estado `Abierto` `1009:6`): un control que abre un
 * dropdown propio de horas — REEMPLAZA al `<input type=time>` nativo. Cada opción
 * reusa `MenuItem` (mismos principios: Body/M, padding, radio). La opción elegida
 * usa el estado `selected` de MenuItem — fondo `bg/brand-subtle` (rojo) + check
 * Icon (`text/brand`) a la derecha; el chevron del control apunta arriba
 * (`stat_1`) al estar abierto.
 */
export const TimePicker = forwardRef<HTMLButtonElement, TimePickerProps>(function TimePicker(
  {
    value,
    defaultValue,
    onValueChange,
    label,
    htmlFor,
    helper,
    error,
    disabled,
    step = 30,
    min = "00:00",
    max = "23:30",
    className,
  },
  ref,
) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<string | null>(defaultValue ?? null);
  const selected = controlled ? value ?? null : internal;

  const options = buildOptions(min, max, step);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
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

  // Al abrir, arrancar el foco de teclado en la opción seleccionada y scrollearla.
  useEffect(() => {
    if (!open) return;
    const i = selected ? options.indexOf(selected) : -1;
    const start = i >= 0 ? i : 0;
    setActiveIndex(start);
    requestAnimationFrame(() => {
      listRef.current?.children[start]?.scrollIntoView({ block: "nearest" });
    });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const commit = (time: string) => {
    if (!controlled) setInternal(time);
    onValueChange?.(time);
    setOpen(false);
  };

  const toggle = () => {
    if (!disabled) setOpen((o) => !o);
  };

  const move = (delta: number) => {
    setActiveIndex((i) => {
      const next = Math.min(options.length - 1, Math.max(0, i + delta));
      listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
      return next;
    });
  };

  const onControlKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      else move(e.key === "ArrowDown" ? 1 : -1);
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      commit(options[activeIndex]);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
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
        className={cx(styles.control, open && styles.open, !!error && styles.error)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={error ? true : undefined}
        onClick={toggle}
        onKeyDown={onControlKeyDown}
      >
        <span className={selected ? styles.value : styles.placeholder}>{selected ?? "HH:MM"}</span>
        <Icon glyph={open ? "stat_1" : "stat_minus_1"} size={16} className={styles.chevron} />
      </button>

      {open ? (
        <div ref={listRef} role="listbox" aria-labelledby={labelId} className={styles.dropdown}>
          {options.map((opt, i) => {
            const isSelected = opt === selected;
            return (
              <MenuItem
                key={opt}
                role="option"
                aria-selected={isSelected}
                selected={isSelected}
                // Cursor de teclado (activo): resalta indigo salvo en la fila
                // seleccionada, cuyo rojo (`selected`) siempre gana.
                style={
                  i === activeIndex && !isSelected
                    ? { background: "var(--color-bg-brand-2-subtle)" }
                    : undefined
                }
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(opt)}
              >
                {opt}
              </MenuItem>
            );
          })}
        </div>
      ) : null}

      {message ? (
        <p className={cx(styles.message, error ? styles.messageError : false)}>{message}</p>
      ) : null}
    </div>
  );
});
