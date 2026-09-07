import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, grid, Title, mono } from "./_shared";
import { t } from "../../.storybook/i18n";

const meta: Meta = { title: "Foundations/Effects", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const shadowNames = Object.keys(tokens.effects.dark).filter((n) => n.startsWith("shadow/"));
const gradientNames = Object.keys(tokens.effects.dark).filter((n) => n.startsWith("gradient/"));
const v = (name: string) => `var(--${name.replace(/\//g, "-")})`;

export const Shadows: Story = {
  render: (_args, ctx) => {
    const L = (ctx.globals?.locale as "en" | "es") ?? "en";
    return (
      <div style={page}>
        <Title>Elevation · Shadows</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          {t(
            L,
            "Derived from Figma's Effect Styles. They react to the theme (change it in the toolbar ↑).",
            "Derivadas de los Effect Styles de Figma. Reaccionan al tema (cambialo en la barra ↑).",
          )}
        </p>
        <div style={{ ...grid(220), marginTop: "var(--space-xl)", rowGap: "var(--space-2xl)" }}>
          {shadowNames.map((name) => (
            <div key={name}>
              <div
                style={{
                  height: 96,
                  background: "var(--color-bg-raised)",
                  borderRadius: "var(--radius-surface)",
                  boxShadow: v(name),
                }}
              />
              <div style={{ marginTop: "var(--space-sm)", fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-body-s)" }}>
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Gradients: Story = {
  render: (_args, ctx) => {
    const L = (ctx.globals?.locale as "en" | "es") ?? "en";
    return (
      <div style={page}>
        <Title>Gradients</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          {t(
            L,
            "Derived from Figma's Paint Styles (the radial ones are visual approximations of Figma's transforms). They react to the theme.",
            "Derivados de los Paint Styles de Figma (los radiales son aproximaciones visuales de las transformaciones de Figma). Reaccionan al tema.",
          )}
        </p>
        <div style={{ ...grid(260), marginTop: "var(--space-xl)" }}>
          {gradientNames.map((name) => (
            <div key={name} style={{ border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-surface)", overflow: "hidden" }}>
              <div style={{ height: name === "gradient/accent-line" ? 12 : 140, background: v(name) }} />
              <div style={{ padding: "var(--space-2xs) var(--space-sm)", fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-body-s)" }}>
                {name}
                <span style={{ ...mono, color: "var(--color-text-tertiary)", display: "block" }}>
                  box-shadow / background
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
