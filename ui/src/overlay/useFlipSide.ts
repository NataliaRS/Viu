import { useCallback, useState } from "react";

export type FlipSide = "top" | "bottom" | "left" | "right";

const OPPOSITE: Record<FlipSide, FlipSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

/**
 * Collision-aware side resolution shared by the floating components (Tooltip,
 * Popover). Returns the side to actually render on: the preferred side when the
 * floating element fits the viewport there, otherwise the opposite side — but
 * only if flipping actually helps (if neither side fits, the preferred side is
 * kept). Call `recompute(anchor, floating)` whenever the floating element
 * becomes visible (open / hover / focus) and on scroll/resize while it shows.
 */
export function useFlipSide(preferred: FlipSide) {
  const [side, setSide] = useState<FlipSide>(preferred);

  const recompute = useCallback(
    (anchor: HTMLElement | null, floating: HTMLElement | null) => {
      if (!anchor || !floating || typeof window === "undefined") {
        setSide(preferred);
        return;
      }
      const a = anchor.getBoundingClientRect();
      const f = floating.getBoundingClientRect();
      const gap = 8;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const fits = (s: FlipSide) => {
        switch (s) {
          case "top":
            return a.top - gap - f.height >= 0;
          case "bottom":
            return a.bottom + gap + f.height <= vh;
          case "left":
            return a.left - gap - f.width >= 0;
          case "right":
            return a.right + gap + f.width <= vw;
        }
      };

      // Prefer the requested side; flip only when it overflows AND the opposite
      // side actually fits — otherwise keep the preferred side.
      setSide(fits(preferred) || !fits(OPPOSITE[preferred]) ? preferred : OPPOSITE[preferred]);
    },
    [preferred],
  );

  return { side, recompute };
}
