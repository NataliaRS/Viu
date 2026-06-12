import { type ReactNode } from "react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash";
  "aria-label"?: string;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export function Breadcrumb({ items, separator = "chevron", className, ...rest }: BreadcrumbProps) {
  const sep = separator === "slash" ? "/" : "›";
  return (
    <nav aria-label={rest["aria-label"] ?? "Breadcrumb"} className={cx(styles.nav, className)}>
      <ol className={styles.list}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {last || !it.href ? (
                <span className={styles.current} aria-current={last ? "page" : undefined}>
                  {it.label}
                </span>
              ) : (
                <a href={it.href} className={styles.link}>
                  {it.label}
                </a>
              )}
              {!last ? (
                <span className={styles.sep} aria-hidden>
                  {sep}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
