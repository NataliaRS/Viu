import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import type { GlyphName } from "../Icon/glyphs";
import styles from "./EmptyState.module.css";

export type EmptyStateVariant = "first" | "empty" | "error";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: EmptyStateVariant;
  /** Override the default icon for the variant. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Action(s), e.g. one or two Buttons. */
  actions?: ReactNode;
}

const glyphFor: Record<EmptyStateVariant, GlyphName> = { first: "Plus", empty: "Search", error: "Alert" };
const circleClass: Record<EmptyStateVariant, string> = { first: "first", empty: "emptyIcon", error: "error" };

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { variant = "first", icon, title, description, actions, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.empty, className)} {...rest}>
      <span className={cx(styles.circle, styles[circleClass[variant]])} aria-hidden>
        {icon ?? <Icon glyph={glyphFor[variant]} size={24} />}
      </span>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
});
