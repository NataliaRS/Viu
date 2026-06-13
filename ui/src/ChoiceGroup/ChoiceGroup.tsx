import { forwardRef, useId, useState, type ReactNode } from "react";
import { Radio } from "../Radio/Radio";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./ChoiceGroup.module.css";

export interface ChoiceOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface BaseChoiceGroupProps {
  /** Group label (rendered as `<legend>`). */
  label: ReactNode;
  options: ChoiceOption[];
  /** Optional helper text below the items. */
  helper?: ReactNode;
  /** Shared name for the radio inputs (defaults to a generated id). */
  name?: string;
  disabled?: boolean;
  className?: string;
}

export interface RadioChoiceGroupProps extends BaseChoiceGroupProps {
  type: "radio";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface CheckboxChoiceGroupProps extends BaseChoiceGroupProps {
  type: "checkbox";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ChoiceGroupProps = RadioChoiceGroupProps | CheckboxChoiceGroupProps;

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * A labelled group of mutually-related choices (Figma `728:35`). Reuses the
 * Radio / Checkbox atoms — `type="radio"` for single choice (one value),
 * `type="checkbox"` for multiple (array of values). Wrapped in a `<fieldset>`
 * + `<legend>` for grouping semantics.
 */
export const ChoiceGroup = forwardRef<HTMLFieldSetElement, ChoiceGroupProps>(
  function ChoiceGroup(props, ref) {
    const { type, label, options, helper, name, disabled, className } = props;
    const autoName = useId();
    const helperId = useId();
    const groupName = name ?? autoName;

    const [radioState, setRadioState] = useState<string | undefined>(
      type === "radio" ? props.defaultValue : undefined,
    );
    const [checkState, setCheckState] = useState<string[]>(
      type === "checkbox" ? (props.defaultValue ?? []) : [],
    );

    const isChecked = (value: string) => {
      if (type === "radio") return (props.value ?? radioState) === value;
      return (props.value ?? checkState).includes(value);
    };

    const onRadio = (value: string) => {
      if (props.type !== "radio") return;
      if (props.value == null) setRadioState(value);
      props.onValueChange?.(value);
    };
    const onCheck = (value: string) => {
      if (props.type !== "checkbox") return;
      const current = props.value ?? checkState;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      if (props.value == null) setCheckState(next);
      props.onValueChange?.(next);
    };

    return (
      <fieldset
        ref={ref}
        className={cx(styles.group, className)}
        disabled={disabled}
        aria-describedby={helper != null ? helperId : undefined}
      >
        <legend className={styles.legend}>{label}</legend>
        <div className={styles.items}>
          {options.map((o) =>
            type === "radio" ? (
              <Radio
                key={o.value}
                name={groupName}
                value={o.value}
                label={o.label}
                checked={isChecked(o.value)}
                disabled={o.disabled}
                onChange={() => onRadio(o.value)}
              />
            ) : (
              <Checkbox
                key={o.value}
                value={o.value}
                label={o.label}
                checked={isChecked(o.value)}
                disabled={o.disabled}
                onChange={() => onCheck(o.value)}
              />
            ),
          )}
        </div>
        {helper != null ? (
          <p id={helperId} className={styles.helper}>
            {helper}
          </p>
        ) : null}
      </fieldset>
    );
  },
);
