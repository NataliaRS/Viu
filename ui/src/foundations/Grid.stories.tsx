import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, h2, Title, mono } from "./_shared";

const meta: Meta = { title: "Foundations/Grid", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const MODES = ["base", "sm", "md", "lg", "xl", "2xl"] as const;

export const Responsive: Story = {
  render: () => {
    const cols = tokens.grid["grid-columns"] as Record<string, number>;
    return (
      <div style={page}>
        <Title>Grid</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          Grilla responsive 4→12 columnas. Redimensioná la ventana para ver el cambio de modo
          (la franja se adapta con <code style={mono}>.viu-grid</code>).
        </p>

        <h2 style={h2}>especificación por modo</h2>
        <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
          {MODES.map((m) => (
            <code key={m} style={{ ...mono, color: "var(--color-text-secondary)" }}>
              {m} · {cols[m]} cols · gutter {String(tokens.grid["grid-gutter"][m])} · margin{" "}
              {String(tokens.grid["grid-margin"][m])}
            </code>
          ))}
        </div>

        <h2 style={h2}>columnas (live)</h2>
        <div className="viu-grid" style={{ background: "var(--color-bg-raised)", borderRadius: "var(--radius-surface)", paddingBlock: "var(--space-md)" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                height: 64,
                background: "var(--color-bg-brand-subtle)",
                border: "1px solid var(--color-border-brand-2)",
                borderRadius: "var(--radius-xs)",
              }}
            />
          ))}
        </div>
      </div>
    );
  },
};
