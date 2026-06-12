import styles from "./Rating.module.css";

export interface RatingProps {
  value?: number;
  max?: number;
  /** Star pixel size. */
  size?: number;
  /** When provided (and not readOnly), stars become clickable. */
  onChange?: (value: number) => void;
  readOnly?: boolean;
  "aria-label"?: string;
  className?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26 6.6.7-4.9 4.6 1.3 6.74L12 17.6 6.1 20.9l1.3-6.74L2.5 8.96l6.6-.7L12 2Z" />
    </svg>
  );
}

export function Rating({
  value = 0,
  max = 5,
  size = 20,
  onChange,
  readOnly,
  className,
  "aria-label": ariaLabel,
}: RatingProps) {
  const interactive = !!onChange && !readOnly;
  return (
    <span
      role={interactive ? "radiogroup" : "img"}
      aria-label={ariaLabel ?? `${value} de ${max}`}
      className={cx(styles.rating, className)}
    >
      {Array.from({ length: max }, (_, i) => {
        const idx = i + 1;
        const filled = idx <= value;
        if (interactive) {
          return (
            <button
              key={idx}
              type="button"
              aria-label={`${idx}`}
              aria-pressed={filled}
              className={cx(styles.star, styles.button, filled && styles.filled)}
              onClick={() => onChange!(idx)}
            >
              <Star size={size} />
            </button>
          );
        }
        return (
          <span key={idx} className={cx(styles.star, filled && styles.filled)}>
            <Star size={size} />
          </span>
        );
      })}
    </span>
  );
}
