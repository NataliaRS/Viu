import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./TreeView.module.css";

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Tree container. Compose with TreeItem children. */
export function TreeView({ children, className, ...rest }: TreeViewProps) {
  return (
    <div role="tree" className={cx(styles.tree, className)} {...rest}>
      {children}
    </div>
  );
}
