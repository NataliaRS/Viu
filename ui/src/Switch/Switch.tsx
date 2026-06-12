import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Switch.module.css";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked = false, onCheckedChange, label, disabled, className, onClick, ...rest },
  ref,
) {
  const button = (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cx(styles.track, !label && className)}
      onClick={(e) => {
        onClick?.(e);
        onCheckedChange?.(!checked);
      }}
      {...rest}
    >
      <span className={styles.thumb} aria-hidden />
    </button>
  );

  if (label == null) return button;
  return (
    <label className={cx(styles.root, className)}>
      {button}
      <span className={styles.label}>{label}</span>
    </label>
  );
});
