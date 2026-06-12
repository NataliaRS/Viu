import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx(styles.badge, styles[tone], className)} {...rest}>
      {children}
    </span>
  );
});
