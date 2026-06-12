import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./Table.module.css";

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
  /** Header row content (column titles). */
  header?: ReactNode;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Tabular container. Compose with TableRow children; pass a header row. */
export function Table({ header, children, className, ...rest }: TableProps) {
  return (
    <div role="table" className={cx(styles.table, className)} {...rest}>
      {header ? (
        <div role="row" className={styles.header}>
          {header}
        </div>
      ) : null}
      <div role="rowgroup" className={styles.body}>
        {children}
      </div>
    </div>
  );
}
