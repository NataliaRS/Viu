import { forwardRef, useState, type HTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Image.module.css";

export type ImageRatio = "16:9" | "4:3" | "1:1" | "3:2" | "free";
export type ImageState = "default" | "loading" | "error";

export interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  ratio?: ImageRatio;
  /** Force a state. Otherwise resolves from `src` + load errors. */
  state?: ImageState;
  /** Text shown in the error placeholder. */
  errorLabel?: string;
}

const ratioClass: Record<ImageRatio, string | undefined> = {
  "16:9": "r169",
  "4:3": "r43",
  "1:1": "r11",
  "3:2": "r32",
  free: undefined,
};

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Image = forwardRef<HTMLDivElement, ImageProps>(function Image(
  { src, alt = "", ratio = "16:9", state, errorLabel = "Sin imagen", className, ...rest },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const resolved: ImageState = state ?? (!src || failed ? "error" : "default");
  const rc = ratioClass[ratio];

  return (
    <div ref={ref} className={cx(styles.image, rc && styles[rc], className)} {...rest}>
      {resolved === "default" && src ? (
        <img className={styles.img} src={src} alt={alt} onError={() => setFailed(true)} />
      ) : null}
      {resolved === "loading" ? (
        <div className={styles.placeholder}>
          <Spinner size="sm" />
        </div>
      ) : null}
      {resolved === "error" ? (
        <div className={styles.placeholder}>
          <Icon glyph="Alert" size={24} />
          <span className={styles.caption}>{errorLabel}</span>
        </div>
      ) : null}
    </div>
  );
});
