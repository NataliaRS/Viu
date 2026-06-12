import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { variant = "text", width, height, className, style, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden
      className={cx(styles.skeleton, styles[variant], className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
});
