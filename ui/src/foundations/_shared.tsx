// Shared helpers for the Foundations docs. Values come from the generated tokens
// (mirror of the Figma variables) so these pages stay in sync with the source.
import { useState } from "react";
import { tokens } from "../../../dist/tokens.js";

export { tokens };

export const copy = (text: string) => {
  try {
    navigator.clipboard?.writeText(text);
  } catch {
    /* clipboard may be blocked in some embeds */
  }
};

export const page: React.CSSProperties = {
  background: "var(--color-bg-base)",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-family-body)",
  padding: "var(--space-2xl)",
  minHeight: "100vh",
};

export const h2: React.CSSProperties = {
  fontFamily: "var(--font-family-label)",
  fontSize: "var(--font-size-label-s)",
  fontWeight: 500,
  letterSpacing: "var(--tracking-wide)",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
  margin: "var(--space-2xl) 0 var(--space-md)",
};

export const grid = (min = 160): React.CSSProperties => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
  gap: "var(--space-sm)",
});

export const mono: React.CSSProperties = {
  fontFamily: "var(--font-family-mono)",
  fontSize: "var(--font-size-body-s)",
};

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="viu-type-headline-s" style={{ margin: "0 0 var(--space-xs)" }}>
      {children}
    </h1>
  );
}

/** A copy-to-clipboard color swatch. Click copies the CSS var (or raw value). */
export function Swatch({ name, value, cssVar }: { name: string; value: string; cssVar?: string }) {
  const [copied, setCopied] = useState(false);
  const text = cssVar ? `var(${cssVar})` : value;
  const onClick = () => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      title={`Copiar ${text}`}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: 0,
        cursor: "pointer",
        background: "var(--color-bg-raised)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-surface)",
        overflow: "hidden",
        color: "inherit",
        font: "inherit",
      }}
    >
      <div style={{ height: 56, position: "relative", background: cssVar ? `var(${cssVar})` : value }}>
        {copied ? (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "var(--color-bg-overlay)",
              color: "var(--color-text-on-brand)",
              fontFamily: "var(--font-family-label)",
              fontSize: "var(--font-size-label-s)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
            }}
          >
            copiado
          </span>
        ) : null}
      </div>
      <div style={{ padding: "var(--space-2xs) var(--space-sm)" }}>
        <div style={{ fontSize: "var(--font-size-body-s)", fontFamily: "var(--font-family-label)" }}>{name}</div>
        <div style={{ ...mono, color: "var(--color-text-tertiary)" }}>{value}</div>
      </div>
    </button>
  );
}

/* ---- WCAG contrast helpers (for the contrast matrix) ---- */
function lum(hex: string) {
  const c = hex.replace("#", "").slice(0, 6);
  const ch = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = ch.map(f);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const L1 = lum(a);
  const L2 = lum(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
