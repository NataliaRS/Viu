import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  /** Image source. When omitted, initials are shown on the brand-2 surface. */
  src?: string;
  alt?: string;
  /** Initials to display when there is no image (e.g. "NR"). */
  initials?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = "md", src, alt = "", initials = "", className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx(styles.avatar, styles[size], className)} {...rest}>
      {src ? (
        <img className={styles.img} src={src} alt={alt} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </span>
  );
});
