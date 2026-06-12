import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, h2, Title, mono } from "./_shared";

const meta: Meta = { title: "Foundations/Tokens", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const prim = tokens.primitive as Record<string, string | number>;
const scales = tokens.scales as Record<string, string | number>;
const pick = (obj: Record<string, string | number>, prefix: string) =>
  Object.entries(obj).filter(([n]) => n.startsWith(prefix));

const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: "var(--space-md)" };
const key: React.CSSProperties = { ...mono, width: 200, flex: "none", color: "var(--color-text-tertiary)" };

export const All: Story = {
  render: () => (
    <div style={page}>
      <Title>Tokens</Title>

      <h2 style={h2}>border-width (scales)</h2>
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {pick(scales, "border-width/").map(([n, v]) => (
          <div key={n} style={row}>
            <code style={key}>{n} · {v}</code>
            <div style={{ width: 120, borderTop: `${v} solid var(--color-text-primary)` }} />
          </div>
        ))}
      </div>

      <h2 style={h2}>icon-size (primitives)</h2>
      <div style={{ ...row, gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "flex-end" }}>
        {pick(prim, "icon-size/").map(([n, v]) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: v, height: v, background: "var(--color-bg-brand)", borderRadius: "var(--radius-xs)" }} />
            <div style={{ ...mono, color: "var(--color-text-tertiary)", marginTop: 4 }}>{n.replace("icon-size/", "")} {v}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>opacity (primitives)</h2>
      <div style={{ ...row, gap: "var(--space-sm)", flexWrap: "wrap" }}>
        {pick(prim, "opacity/").map(([n, v]) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, background: "var(--color-text-primary)", opacity: Number(v), borderRadius: "var(--radius-xs)" }} />
            <div style={{ ...mono, color: "var(--color-text-tertiary)", marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>aspect-ratio (scales)</h2>
      <div style={{ ...row, gap: "var(--space-md)", flexWrap: "wrap", alignItems: "flex-start" }}>
        {pick(scales, "aspect/").map(([n, v]) => (
          <div key={n} style={{ width: 140 }}>
            <div style={{ width: "100%", aspectRatio: String(v), background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-control)" }} />
            <div style={{ ...mono, color: "var(--color-text-tertiary)", marginTop: 4 }}>{n.replace("aspect/", "")} · {v}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>motion (scales)</h2>
      <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
        {pick(scales, "motion/").map(([n, v]) => (
          <code key={n} style={{ ...mono, color: "var(--color-text-secondary)" }}>{n} · {v}</code>
        ))}
      </div>

      <h2 style={h2}>z-index (primitives)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: "var(--space-2xs)" }}>
        {pick(prim, "z/").map(([n, v]) => (
          <code key={n} style={{ ...mono, color: "var(--color-text-secondary)" }}>{n} · {v}</code>
        ))}
      </div>

      <h2 style={h2}>breakpoints (primitives)</h2>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
        {pick(prim, "breakpoint/").map(([n, v]) => (
          <code key={n} style={{ ...mono, color: "var(--color-text-secondary)" }}>{n.replace("breakpoint/", "")} · {v}</code>
        ))}
      </div>
    </div>
  ),
};
