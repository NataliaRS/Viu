import { Children, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Table } from "../Table/Table";
import styles from "./DataTable.module.css";

export interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
  /** Toolbar slot — search, filters and actions above the table. */
  toolbar?: ReactNode;
  /** Column header cells (rendered as the table header row). */
  header?: ReactNode;
  /** Footer summary, e.g. "1–5 de 42 proyectos". */
  caption?: ReactNode;
  /** Pagination slot, shown at the footer's end. */
  pagination?: ReactNode;
  /** Shown inside the table body when there are no rows (e.g. an `<EmptyState/>`). */
  empty?: ReactNode;
  /** The `TableRow`s. When none and `empty` is set, the empty slot shows instead. */
  children?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Data table pattern: a toolbar (search/filters/actions) + a Table with
 * selectable rows + a footer (count + pagination). Always resolve the loading,
 * empty and error states — the empty state renders inside the table body.
 */
export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(function DataTable(
  { toolbar, header, caption, pagination, empty, children, className, "aria-label": ariaLabel, ...rest },
  ref,
) {
  const hasRows = Children.count(children) > 0;
  return (
    <div ref={ref} className={cx(styles.dataTable, className)} {...rest}>
      {toolbar ? <div className={styles.toolbar}>{toolbar}</div> : null}
      <Table aria-label={ariaLabel} header={header}>
        {hasRows ? children : empty ? <div className={styles.empty}>{empty}</div> : null}
      </Table>
      {caption || pagination ? (
        <div className={styles.footer}>
          {caption ? <span className={styles.caption}>{caption}</span> : null}
          {pagination ? <div className={styles.pagination}>{pagination}</div> : null}
        </div>
      ) : null}
    </div>
  );
});
