import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Kbd.module.css";

export type KbdProps = HTMLAttributes<HTMLElement>;

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Keycap — renders a `<kbd>` for keyboard keys and shortcuts (Figma `721:7`). */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, children, ...rest },
  ref,
) {
  return (
    <kbd ref={ref} className={cx(styles.kbd, className)} {...rest}>
      {children}
    </kbd>
  );
});
