// Shared helpers for the Foundations docs. Values come from the generated tokens
// (mirror of the Figma variables) so these pages stay in sync with the source.
import { tokens } from "../../../dist/tokens.js";

export { tokens };

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

export function Swatch({ name, value, cssVar }: { name: string; value: string; cssVar?: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-surface)",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 56, background: cssVar ? `var(${cssVar})` : value }} />
      <div style={{ padding: "var(--space-2xs) var(--space-sm)" }}>
        <div style={{ fontSize: "var(--font-size-body-s)", fontFamily: "var(--font-family-label)" }}>
          {name}
        </div>
        <div style={{ ...mono, color: "var(--color-text-tertiary)" }}>{value}</div>
      </div>
    </div>
  );
}
