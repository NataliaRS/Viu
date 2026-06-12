import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Card.module.css";

export type CardSurface = "elevated" | "outlined" | "filled";
export type CardOrientation = "vertical" | "horizontal";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  orientation?: CardOrientation;
  /** Media slot (e.g. an Image), shown on top (vertical) or side (horizontal). */
  media?: ReactNode;
  /** Footer slot (e.g. actions). */
  footer?: ReactNode;
  /** Floating badge (top-right). */
  badge?: ReactNode;
  /** Top accent bar. */
  accent?: boolean;
  interactive?: boolean;
  children?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { surface = "elevated", orientation = "vertical", media, footer, badge, accent, interactive, children, className, onClick, ...rest },
  ref,
) {
  const clickable = interactive || !!onClick;
  return (
    <div
      ref={ref}
      className={cx(styles.card, styles[surface], orientation === "horizontal" && styles.horizontal, clickable && styles.interactive, className)}
      onClick={onClick}
      {...rest}
    >
      {accent ? <span className={styles.accent} aria-hidden /> : null}
      {badge ? <div className={styles.badge}>{badge}</div> : null}
      {media ? <div className={styles.media}>{media}</div> : null}
      <div className={styles.content}>
        {children != null ? <div className={styles.body}>{children}</div> : null}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
});
