import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Tag.module.css";

export type TagTone = "neutral" | "brand" | "indigo";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { tone = "neutral", className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx(styles.tag, styles[tone], className)} {...rest}>
      {children}
    </span>
  );
});
