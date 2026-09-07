import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Chip.module.css";

export type ChipVariant = "input" | "avatar" | "choice";

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onSelect"> {
  variant?: ChipVariant;
  label: string;
  disabled?: boolean;
  /** Avatar node, rendered before the label when variant="avatar". */
  avatar?: ReactNode;
  /** Remove handler (variant input/avatar) — renders the ✕ affordance. */
  onRemove?: () => void;
  /** Selected state for variant="choice". */
  selected?: boolean;
  /** Click handler for variant="choice". */
  onToggle?: () => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { variant = "input", label, disabled, avatar, onRemove, selected, onToggle, className, ...rest },
  ref,
) {
  if (variant === "choice") {
    return (
      <button
        type="button"
        disabled={disabled}
        aria-pressed={!!selected}
        onClick={onToggle}
        className={cx(styles.chip, styles.choice, selected && styles.choiceSelected, className)}
      >
        {selected ? <Icon glyph="Check" size={14} /> : null}
        <span className={styles.label}>{label}</span>
      </button>
    );
  }

  return (
    <span
      ref={ref}
      aria-disabled={disabled || undefined}
      className={cx(styles.chip, styles[variant], disabled && styles.disabled, className)}
      {...rest}
    >
      {variant === "avatar" && avatar ? <span className={styles.avatarSlot}>{avatar}</span> : null}
      <span className={styles.label}>{label}</span>
      {onRemove ? (
        <button
          type="button"
          className={styles.remove}
          aria-label={`Quitar ${label}`}
          disabled={disabled}
          onClick={onRemove}
        >
          <Icon glyph="Close" size={12} />
        </button>
      ) : null}
    </span>
  );
});
