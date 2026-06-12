import { type HTMLAttributes } from "react";
import styles from "./Nav.module.css";

export interface NavProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name for the navigation landmark. */
  "aria-label": string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Vertical navigation landmark. Compose with NavItem children. */
export function Nav({ children, className, ...rest }: NavProps) {
  return (
    <nav className={cx(styles.nav, className)} {...rest}>
      {children}
    </nav>
  );
}
