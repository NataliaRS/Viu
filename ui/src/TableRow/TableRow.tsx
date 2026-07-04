import {
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Icon } from "../Icon/Icon";
import styles from "./TableRow.module.css";

/** WAI-ARIA table: cada hijo de `role="row"` debe tener `role="cell"`. Los consumidores
 *  pasan celdas crudas → inyectamos el rol para que toda tabla sea accesible sin repetir
 *  `role="cell"` a mano (axe: aria-required-children). */
const asCells = (children: ReactNode) =>
  Children.map(children, (c) =>
    isValidElement(c) && !(c.props as { role?: string }).role
      ? cloneElement(c as ReactElement, { role: "cell" })
      : c,
  );

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Renders a leading selection checkbox. */
  selectable?: boolean;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Renders a trailing chevron. */
  chevron?: boolean;
  /** Highlights on hover (e.g. for clickable rows). */
  interactive?: boolean;
  /** The row cells. */
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(function TableRow(
  { selectable, selected, onSelectedChange, chevron, interactive, children, className, onClick, ...rest },
  ref,
) {
  const clickable = interactive || !!onClick;
  return (
    <div
      ref={ref}
      role="row"
      aria-selected={selected || undefined}
      className={cx(styles.row, selected && styles.selected, clickable && styles.interactive, className)}
      onClick={onClick}
      {...rest}
    >
      {selectable ? (
        <div role="cell" className={styles.checkCell}>
          <Checkbox
            checked={!!selected}
            onChange={(e) => onSelectedChange?.(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Seleccionar fila"
          />
        </div>
      ) : null}
      {asCells(children)}
      {chevron ? (
        <div role="cell" className={styles.chevronCell} aria-hidden>
          <Icon glyph="Chevron" size={16} />
        </div>
      ) : null}
    </div>
  );
});
