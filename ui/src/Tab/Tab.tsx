import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Tab.module.css";

export type TabVariant = "line" | "segmented";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state — maps to Figma `Estado=Activo`. */
  active?: boolean;
  variant?: TabVariant;
  /** Ícono leading (Figma `Icono`). Típicamente un `<Icon />` @xs. */
  icon?: ReactNode;
  /**
   * Ícono trailing (Figma `Icono fin`, default off). Para tabs cerrables:
   * `<Icon glyph="close" />`. Decorativo salvo que el nodo pasado sea interactivo.
   */
  trailingIcon?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { active = false, variant = "line", icon, trailingIcon, children, className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      role="tab"
      aria-selected={active}
      className={cx(styles.tab, styles[variant], className)}
      {...rest}
    >
      <span className={styles.inner}>
        {icon ? (
          <span className={styles.icon} aria-hidden>
            {icon}
          </span>
        ) : null}
        <span>{children}</span>
        {trailingIcon ? (
          <span className={styles.icon} aria-hidden>
            {trailingIcon}
          </span>
        ) : null}
      </span>
      {variant === "line" ? <span className={styles.underline} aria-hidden /> : null}
    </button>
  );
});
