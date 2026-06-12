import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./MenuItem.module.css";

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  /** Keyboard shortcut hint shown on the right (e.g. "⌘K"). */
  shortcut?: ReactNode;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { icon, shortcut, children, className, type = "button", ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} role="menuitem" className={cx(styles.item, className)} {...rest}>
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {shortcut ? <span className={styles.shortcut}>{shortcut}</span> : null}
    </button>
  );
});
