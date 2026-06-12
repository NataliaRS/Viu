import { forwardRef, type AnchorHTMLAttributes } from "react";
import styles from "./Link.module.css";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { disabled, className, children, href, onClick, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx(styles.link, disabled && styles.disabled, className)}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      {...rest}
    >
      {children}
    </a>
  );
});
