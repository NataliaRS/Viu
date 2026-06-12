import { type HTMLAttributes, type ReactNode } from "react";
import { Step, type StepStatus } from "../Step/Step";
import styles from "./Stepper.module.css";

export interface StepperItem {
  label: ReactNode;
  number?: number | string;
  status: StepStatus;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: StepperItem[];
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Horizontal progress through a sequence of Step atoms. */
export function Stepper({ steps, className, ...rest }: StepperProps) {
  return (
    <div role="list" className={cx(styles.stepper, className)} {...rest}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <Step
            key={i}
            status={s.status}
            number={s.number ?? i + 1}
            label={s.label}
            connector={!last}
            style={last ? undefined : { flex: "1 1 0", width: "auto", minWidth: 0 }}
          />
        );
      })}
    </div>
  );
}
