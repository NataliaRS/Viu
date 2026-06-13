import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./SegmentedControl.module.css";

export interface SegmentedControlOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: SegmentedControlOption[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value (defaults to the first option). */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Shared radio-group name (defaults to a generated id). */
  name?: string;
  /** Disable the whole control. */
  disabled?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Single-select control between mutually exclusive options (Figma `724:28`).
 * Built on native radios for free keyboard support (arrow keys move + select);
 * the active segment is the elevated "thumb". NOT navigation — that's Tabs.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    { options, value, defaultValue, onValueChange, name, disabled, className, ...rest },
    ref,
  ) {
    const controlled = value != null;
    const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
    const selected = controlled ? value : internal;
    const groupName = useId();

    const select = (v: string) => {
      if (!controlled) setInternal(v);
      onValueChange?.(v);
    };

    return (
      <div ref={ref} role="radiogroup" className={cx(styles.track, className)} {...rest}>
        {options.map((o) => {
          const active = o.value === selected;
          const segDisabled = disabled || o.disabled;
          return (
            <label
              key={o.value}
              className={cx(styles.segment, active && styles.active, segDisabled && styles.disabled)}
            >
              <input
                type="radio"
                className={styles.input}
                name={name ?? groupName}
                value={o.value}
                checked={active}
                disabled={segDisabled}
                onChange={() => select(o.value)}
              />
              <span className={styles.label}>{o.label}</span>
            </label>
          );
        })}
      </div>
    );
  },
);
