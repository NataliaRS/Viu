import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Search } from "../Search/Search";
import { MenuItem } from "../MenuItem/MenuItem";
import styles from "./Combobox.module.css";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Text shown when the query matches no option. */
  emptyText?: string;
  /** Accessible name for the input. */
  "aria-label"?: string;
  className?: string;
  id?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Filterable single-select combobox (Figma `730:40`). Reuses the Search field
 * and MenuItem rows. Follows the WAI-ARIA combobox + listbox pattern: focus
 * stays on the input, the active option is tracked via `aria-activedescendant`.
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Buscar…",
    disabled,
    emptyText = "Sin resultados",
    className,
    id,
    "aria-label": ariaLabel,
  },
  ref,
) {
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = controlled ? value : internalValue;
  const selectedLabel = options.find((o) => o.value === selectedValue)?.label ?? "";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const autoId = useId();
  const baseId = id ?? autoId;
  const listId = `${baseId}-list`;
  const optionId = (i: number) => `${baseId}-opt-${i}`;

  const filtered = open
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  // Dismiss on a pointer press outside the field + list.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open]);

  const openList = () => {
    if (disabled || open) return;
    setQuery(selectedLabel);
    setActiveIndex(0);
    setOpen(true);
  };

  const select = (option: ComboboxOption) => {
    if (option.disabled) return;
    if (!controlled) setInternalValue(option.value);
    onValueChange?.(option.value);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openList();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (open && filtered[activeIndex]) {
        e.preventDefault();
        select(filtered[activeIndex]);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.stopPropagation();
        setOpen(false);
      }
    }
  };

  const activeId = open && filtered[activeIndex] ? optionId(activeIndex) : undefined;

  return (
    <div className={cx(styles.combobox, className)} ref={rootRef}>
      <Search
        ref={ref}
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeId}
        aria-autocomplete="list"
        value={open ? query : selectedLabel}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={openList}
        onKeyDown={onKeyDown}
        onClear={selectedValue || query ? () => {
          if (!controlled) setInternalValue(undefined);
          onValueChange?.("");
          setQuery("");
        } : undefined}
      />
      {open ? (
        <div role="listbox" id={listId} className={styles.list}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>{emptyText}</p>
          ) : (
            filtered.map((o, i) => (
              <MenuItem
                key={o.value}
                role="option"
                id={optionId(i)}
                aria-selected={o.value === selectedValue}
                tabIndex={-1}
                disabled={o.disabled}
                style={i === activeIndex ? { background: "var(--color-bg-brand-2-subtle)" } : undefined}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(o)}
              >
                {o.label}
              </MenuItem>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
});
