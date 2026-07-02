import { forwardRef, type HTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  /** Image source — tiene prioridad (`Type=Imagen`). */
  src?: string;
  alt?: string;
  /**
   * Iniciales cuando no hay imagen (`Type=Iniciales`). Si no hay `src` ni
   * `initials`, se muestra el placeholder de persona (`Type=Ícono`, glyph
   * `account_circle`), del tamaño del avatar y con el color de las iniciales.
   */
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
      ) : initials ? (
        <span className={styles.initials}>{initials}</span>
      ) : (
        <Icon glyph="account_circle" className={styles.icon} />
      )}
    </span>
  );
});
