import { useRef, type ReactNode } from "react";
import { Tab, type TabVariant } from "../Tab/Tab";
import styles from "./Tabs.module.css";

export interface TabsItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabsItem[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: TabVariant;
  "aria-label"?: string;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** A group of Tab atoms with roving focus + arrow-key navigation. */
export function Tabs({ items, value, onValueChange, variant = "line", className, ...rest }: TabsProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const enabled = items.filter((i) => !i.disabled);

  const move = (dir: 1 | -1) => {
    const idx = enabled.findIndex((i) => i.value === value);
    const next = enabled[(idx + dir + enabled.length) % enabled.length];
    if (next) {
      onValueChange(next.value);
      refs.current[next.value]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={rest["aria-label"]}
      className={cx(styles.tablist, variant === "segmented" && styles.segmented, className)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          move(1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          move(-1);
        }
      }}
    >
      {items.map((it) => (
        <Tab
          key={it.value}
          ref={(node) => {
            refs.current[it.value] = node;
          }}
          variant={variant}
          active={value === it.value}
          disabled={it.disabled}
          icon={it.icon}
          tabIndex={value === it.value ? 0 : -1}
          onClick={() => onValueChange(it.value)}
        >
          {it.label}
        </Tab>
      ))}
    </div>
  );
}
