import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./Quote.module.css";

export interface QuoteProps extends HTMLAttributes<HTMLElement> {
  /** Attribution name. */
  author?: ReactNode;
  /** Attribution role/source. */
  source?: ReactNode;
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export function Quote({ author, source, children, className, ...rest }: QuoteProps) {
  return (
    <figure className={cx(styles.quote, className)} {...rest}>
      <blockquote className={styles.text}>{children}</blockquote>
      {author || source ? (
        <figcaption className={styles.author}>
          {author}
          {source ? <span className={styles.role}>· {source}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
