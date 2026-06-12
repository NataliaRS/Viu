import { type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./ListItem.module.css";

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  chevron?: boolean;
  /** Makes the row interactive (renders a button). */
  onSelect?: () => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export function ListItem({
  leading,
  title,
  subtitle,
  meta,
  selected,
  disabled,
  chevron,
  onSelect,
  className,
  ...rest
}: ListItemProps) {
  const interactive = !!onSelect;
  const rowClass = cx(
    styles.row,
    interactive && styles.interactive,
    selected && styles.selected,
    disabled && styles.disabled,
  );
  const inner = (
    <>
      {leading ? <span className={styles.leading}>{leading}</span> : null}
      <span className={styles.content}>
        <span className={styles.title}>{title}</span>
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
      </span>
      {meta || chevron ? (
        <span className={styles.trailing}>
          {meta ? <span className={styles.meta}>{meta}</span> : null}
          {chevron ? <Icon glyph="Chevron" size={16} className={styles.chev} /> : null}
        </span>
      ) : null}
    </>
  );

  return (
    <li className={cx(styles.li, className)} {...rest}>
      {interactive ? (
        <button
          type="button"
          className={rowClass}
          disabled={disabled}
          aria-current={selected ? "true" : undefined}
          onClick={onSelect}
        >
          {inner}
        </button>
      ) : (
        <div className={rowClass} aria-current={selected ? "true" : undefined}>
          {inner}
        </div>
      )}
    </li>
  );
}
