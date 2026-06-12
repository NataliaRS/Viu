import { type HTMLAttributes } from "react";
import styles from "./Accordion.module.css";

export type AccordionProps = HTMLAttributes<HTMLDivElement>;

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Groups AccordionItem children with dividers. Each item manages its own open state. */
export function Accordion({ children, className, ...rest }: AccordionProps) {
  return (
    <div className={cx(styles.accordion, className)} {...rest}>
      {children}
    </div>
  );
}
