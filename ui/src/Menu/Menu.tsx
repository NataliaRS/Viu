import { type HTMLAttributes } from "react";
import styles from "./Menu.module.css";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Floating menu surface. Compose with MenuItem children. Positioning is up to the caller. */
export function Menu({ children, className, ...rest }: MenuProps) {
  return (
    <div role="menu" className={cx(styles.menu, className)} {...rest}>
      {children}
    </div>
  );
}
