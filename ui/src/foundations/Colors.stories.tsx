import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, h2, grid, Title, Swatch } from "./_shared";

const meta: Meta = { title: "Foundations/Colors", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const primEntries = Object.entries(tokens.primitive) as [string, string][];
const colorFamilies = (prefix: string) => {
  const byFamily: Record<string, [string, string][]> = {};
  for (const [name, value] of primEntries) {
    if (!name.startsWith(prefix)) continue;
    const family = name.split("/")[1];
    (byFamily[family] ??= []).push([name, value]);
  }
  return byFamily;
};

export const Primitives: Story = {
  render: () => {
    const fams = colorFamilies("color/");
    const alpha = primEntries.filter(([n]) => n.startsWith("alpha/"));
    return (
      <div style={page}>
        <Title>Primitives · Color</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          Valores crudos. Los componentes no los consumen directo (usan Semantic).
        </p>
        {Object.entries(fams).map(([family, items]) => (
          <div key={family}>
            <h2 style={h2}>{family}</h2>
            <div style={grid(120)}>
              {items.map(([name, value]) => (
                <Swatch key={name} name={name.replace("color/", "")} value={value} />
              ))}
            </div>
          </div>
        ))}
        <h2 style={h2}>alpha</h2>
        <div style={grid(120)}>
          {alpha.map(([name, value]) => (
            <Swatch key={name} name={name.replace("alpha/", "")} value={value} />
          ))}
        </div>
      </div>
    );
  },
};

export const Semantic: Story = {
  render: () => {
    const groups = ["bg", "text", "border", "feedback"];
    const dark = tokens.semantic.dark;
    const light = tokens.semantic.light;
    return (
      <div style={page}>
        <Title>Semantic · Color</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          La única capa de color que consumen los componentes. El swatch refleja el tema activo
          (cambialo en la barra ↑); los hex muestran Dark / Light.
        </p>
        {groups.map((g) => (
          <div key={g}>
            <h2 style={h2}>{g}</h2>
            <div style={grid(200)}>
              {Object.keys(dark)
                .filter((n) => n.startsWith(`color/${g}/`))
                .map((name) => {
                  const short = name.replace(`color/${g}/`, "");
                  return (
                    <div
                      key={name}
                      style={{
                        border: "1px solid var(--color-border-subtle)",
                        borderRadius: "var(--radius-surface)",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ height: 48, background: `var(--${name.replace(/\//g, "-")})` }} />
                      <div style={{ padding: "var(--space-2xs) var(--space-sm)" }}>
                        <div style={{ fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-body-s)" }}>
                          {short}
                        </div>
                        <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                          {dark[name]} · {light[name]}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
