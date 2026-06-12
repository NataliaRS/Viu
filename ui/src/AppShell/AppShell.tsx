import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./AppShell.module.css";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Persistent sidebar — brand, primary navigation and account. */
  sidebar: ReactNode;
  /** Top bar — location (breadcrumb), search, primary action and account. */
  topbar?: ReactNode;
  /** The page content — the only region that changes when navigating. */
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * App shell pattern: a persistent sidebar + top bar framing a scrollable
 * content region. The shell stays put while navigating; only `children` change.
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { sidebar, topbar, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.shell, className)} {...rest}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.main}>
        {topbar ? <header className={styles.topbar}>{topbar}</header> : null}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
});
