import { forwardRef, type FormHTMLAttributes, type ReactNode } from "react";
import styles from "./Form.module.css";

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "title"> {
  /** Form heading. */
  title?: ReactNode;
  /** Supporting line under the title. */
  description?: ReactNode;
  /** Slot above the fields — typically an error-summary `<Banner tone="danger">`. */
  banner?: ReactNode;
  /** Footer actions, right-aligned (e.g. Cancel + Submit). */
  actions?: ReactNode;
  /** The fields — stack of `FormField`s (and row wrappers for short pairs). */
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/**
 * Form pattern: a titled surface with an optional banner, a single-column
 * stack of fields and a right-aligned action footer. The primary action is
 * never disabled by errors — on submit, the errors are shown.
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { title, description, banner, actions, children, className, ...rest },
  ref,
) {
  return (
    <form ref={ref} className={cx(styles.form, className)} {...rest}>
      {title || description ? (
        <div className={styles.head}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      ) : null}
      {banner ? <div className={styles.banner}>{banner}</div> : null}
      <div className={styles.fields}>{children}</div>
      {actions ? (
        <>
          <div className={styles.divider} />
          <div className={styles.actions}>{actions}</div>
        </>
      ) : null}
    </form>
  );
});
