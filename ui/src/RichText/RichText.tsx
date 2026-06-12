import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./RichText.module.css";

export interface RichTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Render trusted HTML (sanitize upstream). Alternatively pass children. */
  html?: string;
  children?: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

/** Styled prose container that applies the VIU type scale to rich content. */
export function RichText({ html, children, className, ...rest }: RichTextProps) {
  if (html != null) {
    return <div className={cx(styles.prose, className)} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
  }
  return (
    <div className={cx(styles.prose, className)} {...rest}>
      {children}
    </div>
  );
}
