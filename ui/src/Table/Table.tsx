import {
  Children,
  cloneElement,
  isValidElement,
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./Table.module.css";

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
  /** Header row content (column titles). */
  header?: ReactNode;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Un `role="row"` de header requiere `role="columnheader"` en cada celda (WAI-ARIA
 *  table). El header suele llegar como fragment (`<>…</>`); desenvolvemos e inyectamos el
 *  rol para que sea accesible sin marcarlo a mano (axe: aria-required-children). */
const asColumnHeaders = (header: ReactNode): ReactNode => {
  const cells =
    isValidElement(header) && header.type === Fragment
      ? (header.props as { children?: ReactNode }).children
      : header;
  return Children.map(cells, (c) => {
    if (!isValidElement(c)) return c;
    const props = c.props as { role?: string; children?: ReactNode };
    // Celdas vacías (p.ej. la columna spacer del checkbox) NO llevan columnheader:
    // un columnheader sin texto dispara empty-table-header. Quedan como div plano
    // (aria-required-children se satisface con los columnheader con título).
    if (props.role || props.children == null || props.children === "") return c;
    return cloneElement(c as ReactElement, { role: "columnheader" });
  });
};

/** Tabular container. Compose with TableRow children; pass a header row. */
export function Table({ header, children, className, ...rest }: TableProps) {
  return (
    <div role="table" className={cx(styles.table, className)} {...rest}>
      {header ? (
        <div role="row" className={styles.header}>
          {asColumnHeaders(header)}
        </div>
      ) : null}
      <div role="rowgroup" className={styles.body}>
        {children}
      </div>
    </div>
  );
}
