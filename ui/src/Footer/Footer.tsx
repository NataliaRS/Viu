import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./Footer.module.css";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Copyright / fine print shown at the end. */
  copyright?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export function Footer({ copyright, children, className, ...rest }: FooterProps) {
  return (
    <footer className={cx(styles.footer, className)} {...rest}>
      {children}
      {copyright ? <span className={styles.copyright}>{copyright}</span> : null}
    </footer>
  );
}
