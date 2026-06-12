import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import type { GlyphName } from "../Icon/glyphs";
import styles from "./Banner.module.css";

export type BannerTone = "info" | "success" | "warning" | "danger" | "neutral";

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: BannerTone;
  title?: ReactNode;
  /** Optional inline link below the message (e.g. <Link href>Más información</Link>). */
  link?: ReactNode;
  /** When provided, renders a close affordance. */
  onClose?: () => void;
}

const glyphFor: Record<BannerTone, GlyphName> = {
  info: "Info",
  neutral: "Info",
  success: "Check",
  warning: "Alert",
  danger: "Alert",
};

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { tone = "info", title, link, onClose, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} role="status" className={cx(styles.banner, styles[tone], className)} {...rest}>
      <span className={styles.icon} aria-hidden>
        <Icon glyph={glyphFor[tone]} size={16} />
      </span>
      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <p className={styles.message}>{children}</p> : null}
        {link ? <div className={styles.link}>{link}</div> : null}
      </div>
      {onClose ? (
        <button type="button" className={styles.close} aria-label="Cerrar" onClick={onClose}>
          <Icon glyph="Close" size={16} />
        </button>
      ) : null}
    </div>
  );
});
