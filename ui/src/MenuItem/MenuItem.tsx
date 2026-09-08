import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./MenuItem.module.css";

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  /** Keyboard shortcut hint shown on the right (e.g. "⌘K"). */
  shortcut?: ReactNode;
  /**
   * Estado "Seleccionado" (Figma): fondo `bg/brand-subtle` (rojo) + check a la
   * derecha (`text/brand`). El fondo seleccionado gana sobre el hover.
   */
  selected?: boolean;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { icon, shortcut, selected, children, className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      role="menuitem"
      className={cx(styles.item, selected && styles.selected, className)}
      {...rest}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {shortcut ? <span className={styles.shortcut}>{shortcut}</span> : null}
      {selected ? <Icon glyph="check" size={16} className={styles.check} aria-hidden /> : null}
    </button>
  );
});
