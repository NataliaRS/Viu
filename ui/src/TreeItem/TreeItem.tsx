import { type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./TreeItem.module.css";

export interface TreeItemProps {
  label: ReactNode;
  /** Indent level (0-based). */
  level?: number;
  /** Has children → renders an expand chevron. */
  hasChildren?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  selected?: boolean;
  onSelect?: () => void;
  icon?: ReactNode;
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
  icon,
  className,
}: TreeItemProps) {
  return (
    <div
      role="treeitem"
      aria-selected={selected || undefined}
      aria-expanded={hasChildren ? !!expanded : undefined}
      aria-level={level + 1}
      tabIndex={selected ? 0 : -1}
      className={cx(styles.item, selected && styles.selected, className)}
      style={{ paddingLeft: `calc(var(--space-xs) + ${level} * var(--space-md))` }}
      onClick={onSelect}
    >
      {hasChildren ? (
        <span
          className={cx(styles.chevron, expanded && styles.open)}
          role="button"
          aria-label={expanded ? "Colapsar" : "Expandir"}
          onClick={(e) => {
            e.stopPropagation();
            onExpandedChange?.(!expanded);
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
