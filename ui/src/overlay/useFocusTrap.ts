import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Traps Tab focus inside `ref` while `active`, moves focus in on open and
 * restores it on close, and dismisses on Escape. Shared by the overlay
 * organisms (Modal / Drawer / Popover). Handlers are read through refs so the
 * effect only re-runs when `active` toggles — not on every parent render.
 */
export function useFocusTrap(
  active: boolean,
  ref: RefObject<HTMLElement | null>,
  onDismiss?: () => void,
  opts: { closeOnEsc?: boolean } = {},
) {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;
  const closeOnEscRef = useRef(opts.closeOnEsc ?? true);
  closeOnEscRef.current = opts.closeOnEsc ?? true;

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // Move focus into the surface (the node itself is tabIndex=-1 as fallback).
    (focusables()[0] ?? node).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscRef.current) {
        e.stopPropagation();
        onDismissRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey) {
        if (activeEl === first || !node.contains(activeEl)) {
          e.preventDefault();
          last.focus();
        }
      } else if (activeEl === last || !node.contains(activeEl)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      previouslyFocused?.focus?.();
    };
  }, [active, ref]);
}

/** Locks `document.body` scroll while `active`. Restores the prior value on exit. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}
