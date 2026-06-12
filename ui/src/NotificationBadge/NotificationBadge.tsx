import { forwardRef, type HTMLAttributes } from "react";
import styles from "./NotificationBadge.module.css";

export interface NotificationBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Number shown in the badge. Above `max` it renders `max+`. */
  count?: number;
  max?: number;
  /** Render the small dot variant instead of a count. */
  dot?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const NotificationBadge = forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  function NotificationBadge({ count = 0, max = 99, dot = false, className, ...rest }, ref) {
    if (dot) {
      return <span ref={ref} className={cx(styles.badge, styles.dot, className)} {...rest} />;
    }
    const display = count > max ? `${max}+` : String(count);
    return (
      <span ref={ref} className={cx(styles.badge, styles.count, className)} {...rest}>
        {display}
      </span>
    );
  },
);
