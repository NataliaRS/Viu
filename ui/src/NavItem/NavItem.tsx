import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import styles from "./NavItem.module.css";

export interface NavItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(function NavItem(
  { icon, active, children, className, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx(styles.item, active && styles.active, className)}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
    </a>
  );
});
