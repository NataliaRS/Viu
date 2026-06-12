import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Status.module.css";

export type StatusKind = "online" | "busy" | "away" | "offline";

const defaultLabels: Record<StatusKind, string> = {
  online: "En línea",
  busy: "Ocupado",
  away: "Ausente",
  offline: "Desconectado",
};

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  status?: StatusKind;
  /** Show a text label next to the dot. Pass a string to override the default. */
  label?: boolean | string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Status = forwardRef<HTMLSpanElement, StatusProps>(function Status(
  { status = "offline", label = false, className, ...rest },
  ref,
) {
  const text = label === true ? defaultLabels[status] : label || undefined;
  return (
    <span ref={ref} className={cx(styles.status, className)} {...rest}>
      <span className={cx(styles.dot, styles[status])} role="img" aria-label={defaultLabels[status]} />
      {text ? <span className={styles.label}>{text}</span> : null}
    </span>
  );
});
