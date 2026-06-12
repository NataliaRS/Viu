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
import styles from "./Modal.module.css";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the dialog is shown. Controlled. */
  open: boolean;
  /** Requested dismissal (Esc, scrim click or the close button). */
  onClose?: () => void;
  /** Max width of the dialog. Maps to Figma `Tamaño` (SM/MD/LG = 400/520/680). */
  size?: ModalSize;
  /** Dialog heading. */
  title: ReactNode;
  /** Optional supporting line under the title. */
  subtitle?: ReactNode;
  /** Optional leading icon next to the title. */
  icon?: ReactNode;
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

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    size = "md",
    title,
    subtitle,
    icon,
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
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descId = useId();

  useFocusTrap(open, dialogRef, onClose, { closeOnEsc });
  useScrollLock(open);

  if (!open || typeof document === "undefined") return null;

  const setRefs = (node: HTMLDivElement | null) => {
    dialogRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };

  const onScrimMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={onScrimMouseDown}>
      <div
        ref={setRefs}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? descId : undefined}
        tabIndex={-1}
        className={cx(styles.dialog, styles[size], className)}
        {...rest}
      >
        <div className={styles.header}>
          {icon ? (
            <span className={styles.icon} aria-hidden>
              {icon}
            </span>
          ) : null}
          <div className={styles.heading}>
            <p id={titleId} className={styles.title}>
              {title}
            </p>
            {subtitle ? (
              <p id={descId} className={styles.subtitle}>
                {subtitle}
              </p>
            ) : null}
          </div>
          {showClose ? (
            <button type="button" className={styles.close} aria-label="Cerrar" onClick={onClose}>
              <Icon glyph="Close" size={16} />
            </button>
          ) : null}
        </div>
        {children != null ? <div className={styles.body}>{children}</div> : null}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
});
