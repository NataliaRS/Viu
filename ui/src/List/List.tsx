import { type HTMLAttributes } from "react";
import styles from "./List.module.css";

export type ListProps = HTMLAttributes<HTMLUListElement>;

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** A vertical list container. Compose with ListItem children. */
export function List({ children, className, ...rest }: ListProps) {
  return (
    <ul role="list" className={cx(styles.list, className)} {...rest}>
      {children}
    </ul>
  );
}
