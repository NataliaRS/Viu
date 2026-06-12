import { Icon } from "../Icon/Icon";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  variant?: "numbered" | "simple";
  /** Pages shown on each side of the current page (numbered variant). */
  siblingCount?: number;
  "aria-label"?: string;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

function pageRange(page: number, total: number, sib: number): Array<number | "…"> {
  const out: Array<number | "…"> = [];
  const left = Math.max(2, page - sib);
  const right = Math.min(total - 1, page + sib);
  out.push(1);
  if (left > 2) out.push("…");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < total - 1) out.push("…");
  if (total > 1) out.push(total);
  return out;
}

export function Pagination({
  page,
  total,
  onPageChange,
  variant = "numbered",
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) {
  const go = (p: number) => onPageChange(Math.max(1, Math.min(total, p)));

  const prev = (
    <button
      type="button"
      className={cx(styles.cell, styles.edge)}
      aria-label="Página anterior"
      disabled={page <= 1}
      onClick={() => go(page - 1)}
    >
      <Icon glyph="Chevron" size={16} className={styles.chevLeft} />
    </button>
  );
  const next = (
    <button
      type="button"
      className={cx(styles.cell, styles.edge)}
      aria-label="Página siguiente"
      disabled={page >= total}
      onClick={() => go(page + 1)}
    >
      <Icon glyph="Chevron" size={16} />
    </button>
  );

  return (
    <nav
      aria-label={rest["aria-label"] ?? "Paginación"}
      className={cx(styles.nav, variant === "simple" && styles.simple, className)}
    >
      {prev}
      {variant === "numbered" ? (
        pageRange(page, total, siblingCount).map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className={styles.ellipsis} aria-hidden>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cx(styles.cell, p === page && styles.current)}
              aria-label={`Página ${p}`}
              aria-current={p === page ? "page" : undefined}
              onClick={() => go(p)}
            >
              {p}
            </button>
          ),
        )
      ) : (
        <span className={styles.text}>
          Página {page} de {total}
        </span>
      )}
      {next}
    </nav>
  );
}
