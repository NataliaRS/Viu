import type { ReactNode } from "react";

/**
 * The 8 glyphs of the VIU `Icon` component (Figma set 56:431).
 * Authored as 16×16 line icons (stroke = currentColor, 1.5) to match the
 * Figma source, which uses strokes rather than fills for these glyphs.
 */
export type GlyphName =
  | "Plus"
  | "Check"
  | "Chevron"
  | "Close"
  | "Arrow"
  | "Search"
  | "Info"
  | "Alert";

export const glyphs: Record<GlyphName, ReactNode> = {
  Plus: (
    <>
      <path d="M8 3v10" />
      <path d="M3 8h10" />
    </>
  ),
  Check: <path d="M3.5 8.5l3 3 6-6.5" />,
  Chevron: <path d="M6 4l4 4-4 4" />,
  Close: (
    <>
      <path d="M4 4l8 8" />
      <path d="M12 4l-8 8" />
    </>
  ),
  Arrow: (
    <>
      <path d="M2.5 8h11" />
      <path d="M9 4l4 4-4 4" />
    </>
  ),
  Search: (
    <>
      <circle cx="6.5" cy="6.5" r="4.5" />
      <path d="M11 11l3 3" />
    </>
  ),
  Info: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7.5v3.5" />
      <path d="M8 5h.01" />
    </>
  ),
  Alert: (
    <>
      <path d="M8 2.5l6.5 11.5h-13z" />
      <path d="M8 6.5v3.5" />
      <path d="M8 12h.01" />
    </>
  ),
};
