import { forwardRef, type InputHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Search.module.css";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Shows a clear button when there is a value; called when it is pressed. */
  onClear?: () => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { onClear, className, value, placeholder = "Buscar…", ...rest },
  ref,
) {
  const hasValue = value != null && value !== "";
  return (
    <span className={styles.wrap}>
      <Icon glyph="Search" size={16} className={styles.leading} />
      <input
        ref={ref}
        type="search"
        role="searchbox"
        className={cx(styles.input, className)}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
      {onClear && hasValue ? (
        <button type="button" className={styles.clear} aria-label="Limpiar búsqueda" onClick={onClear}>
          <Icon glyph="Close" size={12} />
        </button>
      ) : null}
    </span>
  );
});
