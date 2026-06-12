import { forwardRef, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Dropzone.module.css";

export interface DropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  hint?: ReactNode;
  /** Error message — switches to the error state and shows this text. */
  error?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList) => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(function Dropzone(
  {
    title = "Arrastrá tus archivos o hacé click para explorar",
    hint = "PNG, JPG o PDF · hasta 10 MB",
    error,
    accept,
    multiple,
    onFilesSelected,
    className,
    ...rest
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const open = () => inputRef.current?.click();
  const hintText = error ?? (drag ? "Soltá para subir" : hint);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={typeof title === "string" ? title : "Zona de carga de archivos"}
      className={cx(styles.zone, drag && styles.active, error && styles.error, className)}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (e.dataTransfer.files?.length) onFilesSelected?.(e.dataTransfer.files);
      }}
      {...rest}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className={styles.input}
        onChange={(e) => {
          if (e.target.files?.length) onFilesSelected?.(e.target.files);
        }}
      />
      <span className={styles.circle} aria-hidden>
        <Icon glyph="Plus" size={22} />
      </span>
      <p className={styles.title}>{title}</p>
      <p className={styles.hint}>{hintText}</p>
    </div>
  );
});
