import type { ReactNode } from "react";

/**
 * The glyphs of the VIU `Icon` component (Figma set 56:431).
 * Authored as 16×16 line icons (stroke = currentColor, 1.5) to match the
 * Figma source, which uses strokes rather than fills for these glyphs.
 * NOTE: Eye / EyeOff were added in code for the password toggle — they should
 * also be added to the Figma Icon set to keep parity.
 */
export type GlyphName =
  | "Plus"
  | "Check"
  | "Chevron"
  | "Close"
  | "Arrow"
  | "Search"
  | "Info"
  | "Alert"
  | "Eye"
  | "EyeOff";

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
  Eye: (
    <>
      <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8Z" />
      <circle cx="8" cy="8" r="2" />
    </>
  ),
  EyeOff: (
    <>
      <path d="M6.3 6.3a2 2 0 0 0 2.7 2.7" />
      <path d="M9.8 3.3A6.6 6.6 0 0 1 14.5 8s-.6 1.1-1.7 2.2M4.7 4.7C2.8 5.8 1.5 8 1.5 8s2.4 4.5 6.5 4.5c1 0 1.9-.3 2.7-.7" />
      <path d="M2.5 2.5l11 11" />
    </>
  ),
};
