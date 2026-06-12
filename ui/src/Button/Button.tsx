import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Maps to Figma `Variant`. */
  variant?: ButtonVariant;
  /** Control height/type scale. Maps to Figma `Size` (MD/SM/LG). */
  size?: ButtonSize;
  /** Icon before the label (typically a 16px `<Icon />`). */
  leadingIcon?: ReactNode;
  /** Icon after the label. */
  trailingIcon?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    children,
    className,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(styles.button, styles[variant], styles[size], className)}
      {...rest}
    >
      {leadingIcon ? (
        <span className={styles.icon} aria-hidden>
          {leadingIcon}
        </span>
      ) : null}
      {children != null ? <span className={styles.label}>{children}</span> : null}
      {trailingIcon ? (
        <span className={styles.icon} aria-hidden>
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
});
