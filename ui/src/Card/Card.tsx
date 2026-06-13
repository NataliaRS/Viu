import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import styles from "./Card.module.css";

export type CardSurface = "elevated" | "outlined" | "filled";
/** Media on top (`Arriba`), beside (`Lateral`) or at the bottom (`Abajo`). */
export type CardOrientation = "vertical" | "horizontal" | "media-bottom";
/** Title size — any heading step of the system type scale (title → headline → display → oversize). */
export type CardTitleSize =
  | "title-s"
  | "title-m"
  | "title-l"
  | "headline-s"
  | "headline-m"
  | "headline-l"
  | "display-s"
  | "display-m"
  | "display-l"
  | "oversize-s"
  | "oversize-m"
  | "oversize-l";

export interface CardAuthor {
  name: ReactNode;
  /** Secondary line (date · reading time…). */
  meta?: ReactNode;
  /** Avatar element (e.g. `<Avatar initials="NR" />`). */
  avatar?: ReactNode;
}

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  surface?: CardSurface;
  orientation?: CardOrientation;
  /** Persistent selected state (brand-2 surface + border). */
  selected?: boolean;
  disabled?: boolean;
  /** Makes the whole card operable (pointer + keyboard). */
  interactive?: boolean;

  /** Media slot (e.g. an `<Image>`). */
  media?: ReactNode;
  /** Floating badge over the top-right corner. */
  badge?: ReactNode;
  /** Top accent bar (Barra). */
  accent?: boolean;

  /** Decoupled icon box (48×48) at the top of the content. */
  icon?: ReactNode;
  /** Tags row (e.g. several `<Tag>`). */
  tags?: ReactNode;
  /** Kicker above the title (CATEGORÍA). */
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Title type-scale step (defaults to `title-s`). */
  titleSize?: CardTitleSize;
  subtitle?: ReactNode;
  /** Header action, aligned right of the eyebrow (e.g. an icon / IconButton). */
  action?: ReactNode;
  /** Body copy. */
  body?: ReactNode;
  /** Inline link ("Leer más"). */
  link?: ReactNode;
  /** Footer buttons (0, 1 or 2). */
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  /** Author block at the foot, after a divider. */
  author?: CardAuthor;

  /** Escape hatch — extra content rendered in the body area. */
  children?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    surface = "elevated",
    orientation = "vertical",
    selected,
    disabled,
    interactive,
    media,
    badge,
    accent,
    icon,
    tags,
    eyebrow,
    title,
    subtitle,
    action,
    body,
    titleSize = "title-s",
    link,
    primaryAction,
    secondaryAction,
    author,
    children,
    className,
    onClick,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const clickable = (interactive || !!onClick) && !disabled;
  const hasHeaderTop = eyebrow != null || action != null;
  const hasHeader = hasHeaderTop || title != null || subtitle != null;
  const hasFooter = primaryAction != null || secondaryAction != null;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (clickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  return (
    <div
      ref={ref}
      className={cx(
        styles.card,
        styles[surface],
        orientation === "horizontal" && styles.horizontal,
        orientation === "media-bottom" && styles.mediaBottom,
        selected && styles.selected,
        disabled && styles.disabled,
        clickable && styles.interactive,
        className,
      )}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-disabled={disabled || undefined}
      onClick={clickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {accent ? <span className={styles.accent} aria-hidden /> : null}
      {badge ? <div className={styles.badge}>{badge}</div> : null}
      {media ? <div className={styles.media}>{media}</div> : null}
      <div className={styles.content}>
        {icon ? <div className={styles.iconBox}>{icon}</div> : null}
        {tags ? <div className={styles.tags}>{tags}</div> : null}
        {hasHeader ? (
          <div className={styles.header}>
            {hasHeaderTop ? (
              <div className={styles.headerTop}>
                <span className={styles.eyebrow}>{eyebrow}</span>
                {action != null ? <span className={styles.action}>{action}</span> : null}
              </div>
            ) : null}
            {title != null ? <h3 className={cx(styles.title, `viu-type-${titleSize}`)}>{title}</h3> : null}
            {subtitle != null ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>
        ) : null}
        {body != null ? <p className={styles.body}>{body}</p> : null}
        {children}
        {link != null ? <div className={styles.link}>{link}</div> : null}
        {hasFooter ? (
          <div className={styles.footer}>
            {primaryAction}
            {secondaryAction}
          </div>
        ) : null}
        {author ? (
          <>
            <hr className={styles.divider} />
            <div className={styles.author}>
              {author.avatar ? <span className={styles.authorAvatar}>{author.avatar}</span> : null}
              <span className={styles.authorText}>
                <span className={styles.authorName}>{author.name}</span>
                {author.meta != null ? <span className={styles.authorMeta}>{author.meta}</span> : null}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
});
