import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonVariant = "primary" | "secondary" | "tertiary";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** The icon to render (e.g. <Icon glyph="Plus" />). Sized automatically. */
  icon: ReactNode;
  /** Required: icon-only buttons must have an accessible name. */
  "aria-label": string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = "primary", size = "md", icon, className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(styles.iconButton, styles[variant], styles[size], className)}
      {...rest}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
});
