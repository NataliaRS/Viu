import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, Title, mono } from "./_shared";

const meta: Meta = { title: "Foundations/Spacing & Radius", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const SPACE = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];
const RADIUS = ["xs", "control", "surface", "pill"];

export const Spacing: Story = {
  render: () => (
    <div style={page}>
      <Title>Spacing</Title>
      <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)" }}>
        Escala <code style={mono}>space/*</code> (Scales).
      </p>
      <div style={{ display: "grid", gap: "var(--space-sm)", marginTop: "var(--space-lg)" }}>
        {SPACE.map((s) => {
          const v = tokens.scales[`space/${s}`];
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              <code style={{ ...mono, width: 110, flex: "none", color: "var(--color-text-tertiary)" }}>
                space/{s} · {v}
              </code>
              <div style={{ height: 16, width: v, background: "var(--color-bg-brand)", borderRadius: "var(--radius-xs)" }} />
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={page}>
      <Title>Radius</Title>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap", marginTop: "var(--space-lg)" }}>
        {RADIUS.map((r) => {
          const v = tokens.scales[`radius/${r}`];
          return (
            <div key={r} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: `var(--radius-${r})`,
                }}
              />
              <div style={{ marginTop: "var(--space-2xs)", fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-body-s)" }}>
                radius/{r}
              </div>
              <div style={{ ...mono, color: "var(--color-text-tertiary)" }}>{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};
