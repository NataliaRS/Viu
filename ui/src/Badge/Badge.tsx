import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /**
   * Ícono leading (antes del label). `true` = glifo por defecto `sell` (Figma
   * prop `Icono#1024:0`); también acepta un `<Icon />` propio. El color hereda
   * del texto del tono (`on-soft`).
   */
  icon?: boolean | ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", icon, className, children, ...rest },
  ref,
) {
  const iconNode = icon === true ? <Icon glyph="sell" /> : icon;
  return (
    <span ref={ref} className={cx(styles.badge, styles[tone], className)} {...rest}>
      {iconNode ? (
        <span className={styles.icon} aria-hidden>
          {iconNode}
        </span>
      ) : null}
      {children}
    </span>
  );
});
