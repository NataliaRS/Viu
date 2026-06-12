import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Stepper, type StepperItem } from "../Stepper/Stepper";
import { Button } from "../Button/Button";
import styles from "./Wizard.module.css";

export interface WizardStep {
  /** Short label shown in the stepper. */
  label: ReactNode;
  /** The step's body, rendered when it is the current step. */
  content: ReactNode;
}

export interface WizardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  steps: WizardStep[];
  /** Current step index (0-based). Controlled. */
  current: number;
  /** Requests a move to another step (Back, or a completed step). */
  onStepChange?: (index: number) => void;
  /** Called when advancing past the last step. */
  onFinish?: () => void;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Wizard pattern: a stepper + the current step's content + a footer that shows
 * progress and Back/Next. Validate each step before advancing; the last step is
 * a summary/confirmation before finishing.
 */
export const Wizard = forwardRef<HTMLDivElement, WizardProps>(function Wizard(
  { steps, current, onStepChange, onFinish, backLabel = "Atrás", nextLabel = "Continuar", finishLabel = "Finalizar", className, ...rest },
  ref,
) {
  const isLast = current >= steps.length - 1;
  const stepperItems: StepperItem[] = steps.map((s, i) => ({
    label: s.label,
    number: i + 1,
    status: i < current ? "complete" : i === current ? "current" : "upcoming",
  }));

  return (
    <div ref={ref} className={cx(styles.wizard, className)} {...rest}>
      <Stepper steps={stepperItems} />
      <div className={styles.divider} />
      <div className={styles.step}>{steps[current]?.content}</div>
      <div className={styles.divider} />
      <div className={styles.footer}>
        <span className={styles.count}>
          Paso {current + 1} de {steps.length}
        </span>
        <Button variant="secondary" disabled={current === 0} onClick={() => onStepChange?.(current - 1)}>
          {backLabel}
        </Button>
        <Button variant="primary" onClick={() => (isLast ? onFinish?.() : onStepChange?.(current + 1))}>
          {isLast ? finishLabel : nextLabel}
        </Button>
      </div>
    </div>
  );
});
