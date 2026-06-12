import { type HTMLAttributes } from "react";
import styles from "./Toolbar.module.css";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** A horizontal grouping of actions. Compose with Icon button / Button / Divider (vertical). */
export function Toolbar({ children, className, ...rest }: ToolbarProps) {
  return (
    <div role="toolbar" className={cx(styles.toolbar, className)} {...rest}>
      {children}
    </div>
  );
}
