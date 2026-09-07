import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, h2, grid, mono, Title, Swatch, copy, contrast } from "./_shared";
import { t } from "../../.storybook/i18n";

const meta: Meta = { title: "Foundations/Colors", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const primEntries = Object.entries(tokens.primitive) as [string, string][];
const v = (name: string) => `var(--${name.replace(/\//g, "-")})`;

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
  render: (_args, ctx) => {
    const L = (ctx.globals?.locale as "en" | "es") ?? "en";
    const fams = colorFamilies("color/");
    const alpha = primEntries.filter(([n]) => n.startsWith("alpha/"));
    return (
      <div style={page}>
        <Title>Primitives · Color</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          {t(
            L,
            "Raw values (click to copy). Components don't consume them directly — they use Semantic.",
            "Valores crudos (clic para copiar). Los componentes no los consumen directo — usan Semantic.",
          )}
        </p>
        {Object.entries(fams).map(([family, items]) => (
          <div key={family}>
            <h2 style={h2}>{family}</h2>
            <div style={grid(120)}>
              {items.map(([name, value]) => (
                <Swatch key={name} name={name.replace("color/", "")} value={value} cssVar={`--${name.replace(/\//g, "-")}`} />
              ))}
            </div>
          </div>
        ))}
        <h2 style={h2}>alpha</h2>
        <div style={grid(120)}>
          {alpha.map(([name, value]) => (
            <Swatch key={name} name={name.replace("alpha/", "")} value={value} cssVar={`--${name.replace(/\//g, "-")}`} />
          ))}
        </div>
      </div>
    );
  },
};

export const Semantic: Story = {
  render: (_args, ctx) => {
    const L = (ctx.globals?.locale as "en" | "es") ?? "en";
    const groups = ["bg", "text", "border", "feedback"];
    const dark = tokens.semantic.dark;
    const light = tokens.semantic.light;
    return (
      <div style={page}>
        <Title>Semantic · Color</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          {t(
            L,
            "The only color layer components consume. The swatch reflects the active theme (change it above ↑); the hex values show Dark / Light. Click to copy the token.",
            "La única capa de color que consumen los componentes. El swatch refleja el tema activo (cambialo arriba ↑); los hex muestran Dark / Light. Clic para copiar el token.",
          )}
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
                    <button
                      key={name}
                      type="button"
                      onClick={() => copy(v(name))}
                      title={t(L, `Copy ${v(name)}`, `Copiar ${v(name)}`)}
                      style={{
                        textAlign: "left",
                        padding: 0,
                        cursor: "pointer",
                        color: "inherit",
                        font: "inherit",
                        background: "var(--color-bg-raised)",
                        border: "1px solid var(--color-border-subtle)",
                        borderRadius: "var(--radius-surface)",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ height: 48, background: v(name) }} />
                      <div style={{ padding: "var(--space-2xs) var(--space-sm)" }}>
                        <div style={{ fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-body-s)" }}>{short}</div>
                        <div style={{ ...mono, fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                          {dark[name]} · {light[name]}
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Contrast: Story = {
  render: (_args, ctx) => {
    const L = (ctx.globals?.locale as "en" | "es") ?? "en";
    const dark = tokens.semantic.dark;
    const bgKeys = ["color/bg/base", "color/bg/raised", "color/bg/elevated", "color/bg/sunken"];
    const textKeys = ["color/text/primary", "color/text/secondary", "color/text/tertiary", "color/text/muted", "color/text/link", "color/text/brand"];
    return (
      <div style={page}>
        <Title>{t(L, "Contrast · WCAG (Dark theme)", "Contraste · WCAG (tema Dark)")}</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          {L === "es" ? (
            <>
              Ratio de contraste de cada texto sobre cada fondo. <strong>AA</strong> = ≥ 4.5 (texto normal),
              ≥ 3 (texto grande). Sobre fondos sólidos del tema oscuro.
            </>
          ) : (
            <>
              Contrast ratio of each text over each background. <strong>AA</strong> = ≥ 4.5 (normal text),
              ≥ 3 (large text). Over the dark theme's solid backgrounds.
            </>
          )}
        </p>
        <div style={{ overflowX: "auto", marginTop: "var(--space-lg)" }}>
          <table style={{ borderCollapse: "separate", borderSpacing: 6 }}>
            <thead>
              <tr>
                <th scope="col">
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                    {t(L, "Text over background", "Texto sobre fondo")}
                  </span>
                </th>
                {bgKeys.map((b) => (
                  <th key={b} style={{ ...mono, color: "var(--color-text-tertiary)", fontWeight: 400, padding: "0 var(--space-xs)" }}>
                    {b.replace("color/bg/", "bg/")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {textKeys.map((tk) => (
                <tr key={tk}>
                  <td style={{ ...mono, color: "var(--color-text-tertiary)", paddingRight: "var(--space-sm)", whiteSpace: "nowrap" }}>
                    {tk.replace("color/text/", "text/")}
                  </td>
                  {bgKeys.map((b) => {
                    const r = contrast(dark[tk], dark[b]);
                    const pass = r >= 4.5;
                    return (
                      <td key={b}>
                        <div
                          style={{
                            background: dark[b],
                            color: dark[tk],
                            border: "1px solid var(--color-border-subtle)",
                            borderRadius: "var(--radius-control)",
                            padding: "var(--space-sm)",
                            minWidth: 96,
                            textAlign: "center",
                          }}
                        >
                          <div style={{ fontFamily: "var(--font-family-label)", fontWeight: 500 }}>Aa</div>
                          <div style={{ ...mono, fontSize: "11px" }}>
                            {r.toFixed(2)} {pass ? "AA✓" : r >= 3 ? "AA large" : "✗"}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};

export const Compare: Story = {
  render: (_args, ctx) => {
    const L = (ctx.globals?.locale as "en" | "es") ?? "en";
    const dark = tokens.semantic.dark;
    const light = tokens.semantic.light;
    const cell = (hex: string) => (
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)" }}>
        <span style={{ width: 28, height: 28, borderRadius: "var(--radius-xs)", background: hex, border: "1px solid var(--color-border-subtle)", flex: "none" }} />
        <code style={{ ...mono, color: "var(--color-text-tertiary)" }}>{hex}</code>
      </div>
    );
    return (
      <div style={page}>
        <Title>{t(L, "Dark / Light · side by side", "Dark / Light · lado a lado")}</Title>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
          {t(
            L,
            "Every semantic token in both themes, independent of the active theme.",
            "Cada token semántico en ambos temas, sin depender del tema activo.",
          )}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 1fr) 1fr 1fr", gap: "var(--space-2xs) var(--space-lg)", marginTop: "var(--space-lg)", alignItems: "center" }}>
          <div style={h2}>token</div>
          <div style={h2}>dark</div>
          <div style={h2}>light</div>
          {Object.keys(dark).map((name) => (
            <Row key={name} name={name} darkCell={cell(dark[name])} lightCell={cell(light[name])} />
          ))}
        </div>
      </div>
    );
  },
};

function Row({ name, darkCell, lightCell }: { name: string; darkCell: React.ReactNode; lightCell: React.ReactNode }) {
  return (
    <>
      <code style={{ ...mono, color: "var(--color-text-secondary)" }}>{name.replace("color/", "")}</code>
      {darkCell}
      {lightCell}
    </>
  );
}
