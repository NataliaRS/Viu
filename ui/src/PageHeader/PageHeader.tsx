import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { IconButton } from "../IconButton/IconButton";
import { Icon } from "../Icon/Icon";
import styles from "./PageHeader.module.css";

export type PageHeaderVariant = "standard" | "compact" | "centered";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  breadcrumb?: ReactNode;
  subtitle?: ReactNode;
  status?: ReactNode;
  /** Action(s) on the right (e.g. Buttons). */
  actions?: ReactNode;
  /** Tab strip below the title (e.g. <Tabs/>). */
  tabs?: ReactNode;
  onBack?: () => void;
  variant?: PageHeaderVariant;
  divider?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { title, breadcrumb, subtitle, status, actions, tabs, onBack, variant = "standard", divider = true, className, ...rest },
  ref,
) {
  return (
    <header ref={ref} className={cx(styles.header, styles[variant], className)} {...rest}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          {breadcrumb ? <div className={styles.breadcrumb}>{breadcrumb}</div> : null}
          <div className={styles.titleRow}>
            {onBack ? (
              <IconButton
                variant="tertiary"
                size="sm"
                aria-label="Volver"
                onClick={onBack}
                icon={<Icon glyph="Arrow" style={{ transform: "rotate(180deg)" }} />}
              />
            ) : null}
            <h1 className={styles.title}>{title}</h1>
            {status}
          </div>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {tabs ? <div className={styles.tabs}>{tabs}</div> : null}
      {divider ? <div className={styles.divider} aria-hidden /> : null}
    </header>
  );
});
