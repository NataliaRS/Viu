import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, h2, Title, mono } from "./_shared";

const meta: Meta = { title: "Foundations/Typography", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const order = ["oversize", "display", "headline", "title", "body", "label", "code"];
const names = Object.keys(tokens.type.mobile).map((k) => k.replace("font-size/", ""));
const grouped = order.map((role) => [role, names.filter((n) => n.split("-")[0] === role)] as const);

export const Scale: Story = {
  render: () => (
    <div style={page}>
      <Title>Typography</Title>
      <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
        Escala responsive (Mobile por defecto, Desktop ≥ 1024px). PP Neue Montreal · Google Sans ·
        General Sans · JetBrains Mono.
      </p>
      {grouped.map(([role, items]) => (
        <div key={role}>
          <h2 style={h2}>{role}</h2>
          <div style={{ display: "grid", gap: "var(--space-lg)" }}>
            {items.map((short) => {
              const m = tokens.type.mobile[`font-size/${short}`];
              const d = tokens.type.desktop[`font-size/${short}`];
              return (
                <div key={short} style={{ display: "flex", alignItems: "baseline", gap: "var(--space-lg)" }}>
                  <code style={{ ...mono, color: "var(--color-text-tertiary)", width: 160, flex: "none" }}>
                    {short} · {m === d ? m : `${m}→${d}`}
                  </code>
                  <span className={`viu-type-${short}`}>Crecer es posible</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ),
};
