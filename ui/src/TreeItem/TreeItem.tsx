import { type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./TreeItem.module.css";

export interface TreeItemProps {
  label: ReactNode;
  /** Indent level (0-based). */
  level?: number;
  /** Has children → renders an expand chevron (Figma `Expansión`: Expandido/Colapsado vs Hoja). */
  hasChildren?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  /** Show a leading checkbox (selectable trees). */
  checkbox?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export function TreeItem({
  label,
  level = 0,
  hasChildren,
  expanded,
  onExpandedChange,
  selected,
  onSelect,
  disabled,
  icon,
  checkbox,
  checked,
  onCheckedChange,
  className,
}: TreeItemProps) {
  return (
    <div
      role="treeitem"
      aria-selected={selected || undefined}
      aria-expanded={hasChildren ? !!expanded : undefined}
      aria-level={level + 1}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : selected ? 0 : -1}
      className={cx(styles.item, selected && styles.selected, disabled && styles.disabled, className)}
      style={{ paddingLeft: `calc(var(--space-xs) + ${level} * var(--space-md))` }}
      onClick={disabled ? undefined : onSelect}
    >
      {checkbox ? (
        <span className={styles.checkbox} onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={checked}
            disabled={disabled}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            aria-label={typeof label === "string" ? label : "Seleccionar elemento"}
          />
        </span>
      ) : null}
      {hasChildren ? (
        <span
          className={cx(styles.chevron, expanded && styles.open)}
          role="button"
          aria-label={expanded ? "Colapsar" : "Expandir"}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onExpandedChange?.(!expanded);
          }}
        >
          <Icon glyph="Chevron" size={16} />
        </span>
      ) : (
        <span className={styles.spacer} />
      )}
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{label}</span>
    </div>
  );
}
