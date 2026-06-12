import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./AccordionItem.module.css";

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { title, defaultOpen = false, open, onOpenChange, children, className, ...rest },
  ref,
) {
  const [internal, setInternal] = useState(defaultOpen);
  const isOpen = open ?? internal;
  const bodyId = useId();

  const toggle = () => {
    onOpenChange?.(!isOpen);
    if (open === undefined) setInternal((v) => !v);
  };

  return (
    <div ref={ref} className={className} {...rest}>
      <button type="button" className={styles.header} aria-expanded={isOpen} aria-controls={bodyId} onClick={toggle}>
        <span className={styles.title}>{title}</span>
        <Icon glyph="Chevron" size={16} className={cx(styles.chevron, isOpen && styles.open)} />
      </button>
      <div id={bodyId} role="region" hidden={!isOpen} className={styles.body}>
        {children}
      </div>
    </div>
  );
});
