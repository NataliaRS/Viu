import {
  forwardRef,
  useId,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";
import { useFocusTrap, useScrollLock } from "../overlay/useFocusTrap";
import styles from "./Drawer.module.css";

export type DrawerSide = "right" | "left";

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the panel is shown. Controlled. */
  open: boolean;
  /** Requested dismissal (Esc, scrim click or the close button). */
  onClose?: () => void;
  /** Edge the panel slides from. */
  side?: DrawerSide;
  /** Panel heading. */
  title: ReactNode;
  /** Show the close (✕) button in the header. */
  showClose?: boolean;
  /** Footer slot, typically one or two `<Button>`s. */
  footer?: ReactNode;
  /** Dismiss when the scrim is clicked. */
  closeOnOverlayClick?: boolean;
  /** Dismiss on the Escape key. */
  closeOnEsc?: boolean;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    onClose,
    side = "right",
    title,
    showClose = true,
    footer,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    children,
    className,
    ...rest
  },
  ref,
) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  useFocusTrap(open, panelRef, onClose, { closeOnEsc });
  useScrollLock(open);

  if (!open || typeof document === "undefined") return null;

  const setRefs = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };

  const onScrimMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className={cx(styles.overlay, styles[side])} onMouseDown={onScrimMouseDown}>
      <div
        ref={setRefs}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx(styles.panel, className)}
        {...rest}
      >
        <div className={styles.header}>
          <p id={titleId} className={styles.title}>
            {title}
          </p>
          {showClose ? (
            <button type="button" className={styles.close} aria-label="Cerrar" onClick={onClose}>
              <Icon glyph="Close" size={20} />
            </button>
          ) : null}
        </div>
        <div className={styles.divider} />
        <div className={styles.body}>{children}</div>
        {footer ? (
          <>
            <div className={styles.divider} />
            <div className={styles.footer}>{footer}</div>
          </>
        ) : null}
      </div>
    </div>,
    document.body,
  );
});
