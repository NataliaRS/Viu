import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./FileRow.module.css";

export type FileRowState = "loading" | "complete" | "error";

export interface FileRowProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Short type tag shown in the tile (e.g. "PDF"). */
  ext?: string;
  state?: FileRowState;
  /** 0–100, used in the loading state. */
  progress?: number;
  /** Meta line for the complete state (e.g. "2,4 MB · Completado"). */
  meta?: ReactNode;
  onRemove?: () => void;
  onRetry?: () => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const FileRow = forwardRef<HTMLDivElement, FileRowProps>(function FileRow(
  { name, ext = "file", state = "loading", progress = 0, meta, onRemove, onRetry, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.row, className)} {...rest}>
      <span className={styles.tile} aria-hidden>
        {ext}
      </span>
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        {state === "loading" ? (
          <div className={styles.statusRow}>
            <div className={styles.track}>
              <div className={styles.fill} style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
            </div>
            <span className={styles.pct}>{Math.round(progress)}%</span>
          </div>
        ) : null}
        {state === "complete" && meta ? <p className={styles.meta}>{meta}</p> : null}
        {state === "error" ? (
          <div className={styles.errorRow}>
            <span className={styles.errText}>Error al subir</span>
            {onRetry ? (
              <>
                <span className={styles.dot} aria-hidden>
                  ·
                </span>
                <button type="button" className={styles.retry} onClick={onRetry}>
                  Reintentar
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className={styles.trailing}>
        {state === "complete" ? (
          <span className={styles.ok} aria-hidden>
            <Icon glyph="Check" size={16} />
          </span>
        ) : null}
        {onRemove ? (
          <button type="button" className={styles.remove} aria-label={`Quitar ${name}`} onClick={onRemove}>
            <Icon glyph="Close" size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
});
