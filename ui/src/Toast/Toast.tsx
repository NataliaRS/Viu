import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import type { GlyphName } from "../Icon/glyphs";
import styles from "./Toast.module.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: ToastTone;
  title?: ReactNode;
  onClose?: () => void;
}

const glyphFor: Record<ToastTone, GlyphName> = {
  info: "Info",
  success: "Check",
  warning: "Alert",
  danger: "Alert",
};

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { tone = "info", title, onClose, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} role="status" aria-live="polite" className={cx(styles.toast, className)} {...rest}>
      <span className={cx(styles.icon, styles[tone])} aria-hidden>
        <Icon glyph={glyphFor[tone]} size={20} />
      </span>
      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <p className={styles.message}>{children}</p> : null}
      </div>
      {onClose ? (
        <button type="button" className={styles.close} aria-label="Cerrar" onClick={onClose}>
          <Icon glyph="Close" size={16} />
        </button>
      ) : null}
    </div>
  );
});
