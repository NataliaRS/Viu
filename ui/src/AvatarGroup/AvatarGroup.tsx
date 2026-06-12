import { Avatar, type AvatarSize } from "../Avatar/Avatar";
import styles from "./AvatarGroup.module.css";

export interface AvatarGroupItem {
  initials?: string;
  src?: string;
  alt?: string;
}

export interface AvatarGroupProps {
  items: AvatarGroupItem[];
  /** Max avatars shown before collapsing into a +N chip. */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export function AvatarGroup({ items, max = 4, size = "md", className }: AvatarGroupProps) {
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  return (
    <div className={cx(styles.group, className)}>
      {shown.map((it, i) => (
        <span className={styles.ring} key={i}>
          <Avatar size={size} src={it.src} alt={it.alt} initials={it.initials} />
        </span>
      ))}
      {extra > 0 ? (
        <span className={styles.ring}>
          <span className={cx(styles.count, styles[size])} aria-label={`${extra} más`}>
            +{extra}
          </span>
        </span>
      ) : null}
    </div>
  );
}
