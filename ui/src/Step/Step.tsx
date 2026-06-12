import { forwardRef, type HTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Step.module.css";

export type StepStatus = "complete" | "current" | "upcoming";

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  status?: StepStatus;
  number?: number | string;
  label?: React.ReactNode;
  /** Show the trailing connector line to the next step. */
  connector?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Step = forwardRef<HTMLDivElement, StepProps>(function Step(
  { status = "upcoming", number, label, connector = false, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.step, styles[status], className)} {...rest}>
      <div className={styles.row}>
        <span className={styles.node}>
          {status === "complete" ? <Icon glyph="Check" size={16} /> : number}
        </span>
        {connector ? <span className={styles.connector} /> : null}
      </div>
      {label != null ? <span className={styles.label}>{label}</span> : null}
    </div>
  );
});
