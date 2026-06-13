import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Icon } from "../Icon/Icon";
import { useFocusTrap } from "../overlay/useFocusTrap";
import { useFlipSide } from "../overlay/useFlipSide";
import styles from "./Popover.module.css";

export type PopoverSide = "bottom" | "top";

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the surface is shown. Controlled. */
  open: boolean;
  /** Open/close requests (trigger toggle, Esc, outside click, close button). */
  onOpenChange?: (open: boolean) => void;
  /** Which side of the trigger the surface floats on. Maps to Figma `Posición`. */
  side?: PopoverSide;
  /** The element the surface is anchored to (e.g. a `<Button>`). */
  trigger: ReactNode;
  /** Optional heading row. */
  title?: ReactNode;
  /** Show the close (✕) button in the header (requires `title`). */
  showClose?: boolean;
  /** Action slot, typically one or two small `<Button>`s. */
  actions?: ReactNode;
  /** Dismiss on the Escape key. */
  closeOnEsc?: boolean;
  /** Body content. */
  children: ReactNode;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    open,
    onOpenChange,
    side = "bottom",
    trigger,
    title,
    showClose = true,
    actions,
    closeOnEsc = true,
    children,
    className,
    ...rest
  },
  ref,
) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const { side: resolvedSide, recompute } = useFlipSide(side);

  useFocusTrap(open, panelRef, () => onOpenChange?.(false), { closeOnEsc });

  // Flip to the opposite side when the surface would overflow the viewport.
  // Re-measure on open and while it stays open (scroll/resize).
  useEffect(() => {
    if (!open) return;
    const measure = () => recompute(rootRef.current, panelRef.current);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, recompute]);

  // Dismiss on a pointer press outside the anchor + surface.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onOpenChange?.(false);
      }
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open, onOpenChange]);

  const setRefs = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };

  return (
    <span className={styles.root} ref={rootRef}>
      <span className={styles.anchor} onClick={() => onOpenChange?.(!open)}>
        {trigger}
      </span>
      {open ? (
        <div
          ref={setRefs}
          role="dialog"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          className={cx(styles.panel, styles[resolvedSide], className)}
          {...rest}
        >
          <span className={styles.caret} aria-hidden />
          {title ? (
            <div className={styles.header}>
              <p id={titleId} className={styles.title}>
                {title}
              </p>
              {showClose ? (
                <button
                  type="button"
                  className={styles.close}
                  aria-label="Cerrar"
                  onClick={() => onOpenChange?.(false)}
                >
                  <Icon glyph="Close" size={16} />
                </button>
              ) : null}
            </div>
          ) : null}
          <div className={styles.body}>{children}</div>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      ) : null}
    </span>
  );
});
