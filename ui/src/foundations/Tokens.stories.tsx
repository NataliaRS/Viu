import type { Meta, StoryObj } from "@storybook/react";
import { tokens, page, h2, Title, mono, grid } from "./_shared";

const meta: Meta = { title: "Foundations/Tokens", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const prim = tokens.primitive as Record<string, string | number>;
const scales = tokens.scales as Record<string, string | number>;
const semantic = (tokens.semantic as { dark: Record<string, string> }).dark;
const effects = (tokens.effects as { dark: Record<string, string> }).dark;
const gridTokens = tokens.grid as Record<string, Record<string, string | number>>;

const pick = (obj: Record<string, string | number>, prefix: string) =>
  Object.entries(obj).filter(([n]) => n.startsWith(prefix));
const semPick = (prefix: string) => Object.keys(semantic).filter((n) => n.startsWith(prefix));
const short = (n: string) => n.split("/").slice(1).join("/");
const cssVar = (name: string) => `var(--${name.replace(/\//g, "-")})`;

const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: "var(--space-md)" };
const key: React.CSSProperties = { ...mono, width: 210, flex: "none", color: "var(--color-text-tertiary)" };
const val: React.CSSProperties = { ...mono, fontSize: "var(--font-size-body-s)", color: "var(--color-text-secondary)", marginTop: 4 };
const note: React.CSSProperties = { ...mono, color: "var(--color-text-tertiary)", fontSize: "var(--font-size-body-s)" };
const intro: React.CSSProperties = { color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)", maxWidth: 760, margin: "0 0 var(--space-md)" };
const groupTitle: React.CSSProperties = { fontFamily: "var(--font-family-display)", fontSize: "var(--font-size-title-s)", fontWeight: 500, color: "var(--color-text-primary)", margin: "var(--space-4xl) 0 0", borderTop: "1px solid var(--color-border-subtle)", paddingTop: "var(--space-lg)" };

/** Filled color swatch (primitive/alpha/bg/feedback). */
function Sw({ bg, label, sub }: { bg: string; label: string; sub: string }) {
  return (
    <div>
      <div style={{ height: 44, background: bg, border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-control)" }} />
      <div style={val}>{label}</div>
      <div style={note}>{sub}</div>
    </div>
  );
}
/** cubic-bezier(x1,y1,x2,y2) → small SVG curve. */
function EaseCurve({ value }: { value: string }) {
  const m = value.match(/cubic-bezier\(([^)]+)\)/);
  const [x1, y1, x2, y2] = m ? m[1].split(",").map(Number) : [0, 0, 1, 1];
  const S = 72, px = (x: number) => x * S, py = (y: number) => (1 - y) * S;
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ flex: "none", background: "var(--color-bg-raised)", borderRadius: "var(--radius-control)", border: "1px solid var(--color-border-subtle)" }}>
      <line x1="0" y1={S} x2={S} y2="0" stroke="var(--color-border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
      <path d={`M 0 ${S} C ${px(x1)} ${py(y1)} ${px(x2)} ${py(y2)} ${S} 0`} fill="none" stroke="var(--color-text-brand)" strokeWidth="2" />
    </svg>
  );
}

export const All: Story = {
  render: () => (
    <div style={page}>
      <Title>Tokens</Title>
      <p style={intro}>
        Índice completo de TODOS los tokens del sistema — la fuente única que consumen los componentes,
        espejo 1:1 de las variables de Figma. <code style={note}>(primitives)</code> = valor crudo ·{" "}
        <code style={note}>(scales)</code> = alias semántico · <code style={note}>(semantic)</code> = por
        tema (light/dark). Las páginas Colors / Typography / Spacing &amp; Radius / Grid / Effects
        muestran cada familia con más detalle; acá está todo junto para referencia.
      </p>

      {/* ============================= COLOR ============================= */}
      <div style={groupTitle}>Color</div>

      <h2 style={h2}>semantic · background (semantic)</h2>
      <div style={grid(150)}>
        {semPick("color/bg/").map((n) => <Sw key={n} bg={cssVar(n)} label={short(n)} sub="semantic" />)}
      </div>

      <h2 style={h2}>semantic · text (semantic)</h2>
      <div style={{ ...row, gap: "var(--space-lg)", flexWrap: "wrap" }}>
        {semPick("color/text/").map((n) => (
          <div key={n}>
            <div style={{ fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-title-s)", color: cssVar(n) }}>Ag</div>
            <div style={val}>{short(n)}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>semantic · border (semantic)</h2>
      <div style={{ ...row, gap: "var(--space-lg)", flexWrap: "wrap" }}>
        {semPick("color/border/").map((n) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 44, border: `2px solid ${cssVar(n)}`, borderRadius: "var(--radius-control)", background: "var(--color-bg-raised)" }} />
            <div style={val}>{short(n)}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>semantic · feedback (semantic)</h2>
      <div style={grid(150)}>
        {semPick("color/feedback/").map((n) => <Sw key={n} bg={cssVar(n)} label={short(n)} sub="semantic" />)}
      </div>

      <h2 style={h2}>primitives · color ramps (primitives)</h2>
      {["red", "neutral", "green", "amber", "alert", "blue", "indigo"].map((ramp) => (
        <div key={ramp} style={{ marginBottom: "var(--space-sm)" }}>
          <div style={{ ...note, marginBottom: 4 }}>{ramp}</div>
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {pick(prim, `color/${ramp}/`).map(([n, v]) => (
              <div key={n} title={`${n} · ${v}`} style={{ width: 56 }}>
                <div style={{ height: 40, background: String(v), border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-xs)" }} />
                <div style={{ ...note, textAlign: "center" }}>{short(n)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2 style={h2}>primitives · alpha (primitives)</h2>
      <div style={grid(120)}>
        {pick(prim, "alpha/").map(([n, v]) => <Sw key={n} bg={String(v)} label={short(n)} sub={String(v)} />)}
      </div>

      {/* ============================= TYPOGRAPHY ============================= */}
      <div style={groupTitle}>Typography</div>

      <h2 style={h2}>font-family (primitives)</h2>
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {pick(prim, "font-family/").map(([n, v]) => (
          <div key={n}>
            <span style={{ fontFamily: String(v), fontSize: "var(--font-size-title-s)" }}>The quick brown fox — 0123</span>
            <div style={note}>{short(n)}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>font-size (primitives)</h2>
      <div style={{ display: "grid", gap: "var(--space-xs)" }}>
        {pick(prim, "font-size/").map(([n, v]) => (
          <div key={n} style={{ display: "flex", alignItems: "baseline", gap: "var(--space-md)" }}>
            <code style={{ ...mono, width: 130, flex: "none", color: "var(--color-text-tertiary)" }}>{short(n)} · {v}</code>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: String(v), lineHeight: 1.1 }}>Ag</span>
          </div>
        ))}
      </div>

      <h2 style={h2}>font-weight (primitives)</h2>
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {pick(prim, "font-weight/").map(([n, v]) => (
          <div key={n} style={row}>
            <code style={key}>{short(n)} · {v}</code>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-title-m)", fontWeight: Number(v) }}>The quick brown fox</span>
          </div>
        ))}
      </div>

      <h2 style={h2}>line-height (primitives)</h2>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
        {pick(prim, "line-height/").map(([n, v]) => (
          <div key={n} style={{ width: 220 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)", lineHeight: Number(v), color: "var(--color-text-secondary)" }}>
              Texto de varias líneas para ver el interlineado según el token aplicado.
            </p>
            <div style={val}>{short(n)} · {v}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>tracking / letter-spacing (primitives)</h2>
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {pick(prim, "tracking/").map(([n, v]) => (
          <div key={n} style={row}>
            <code style={key}>{short(n)} · {v}</code>
            <span style={{ fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-title-s)", letterSpacing: String(v), textTransform: "uppercase" }}>Tracking</span>
          </div>
        ))}
      </div>

      {/* ============================= SPACE & RADIUS ============================= */}
      <div style={groupTitle}>Space &amp; radius</div>

      <h2 style={h2}>space (primitives)</h2>
      <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
        {pick(prim, "space/").map(([n, v]) => (
          <div key={n} style={row}>
            <code style={key}>{short(n)} · {v}</code>
            <div style={{ height: 12, width: v, background: "var(--color-bg-brand-2)", borderRadius: 2 }} />
          </div>
        ))}
      </div>

      <h2 style={h2}>space (scales — alias)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "var(--space-2xs)" }}>
        {pick(scales, "space/").map(([n, v]) => <code key={n} style={{ ...mono, color: "var(--color-text-secondary)" }}>{n} · {v}</code>)}
      </div>

      <h2 style={h2}>radius (primitives + scales)</h2>
      <div style={{ ...row, gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "flex-end" }}>
        {[...pick(prim, "radius/"), ...pick(scales, "radius/")].map(([n, v]) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-default)", borderTopLeftRadius: String(v), borderTopRightRadius: String(v) }} />
            <div style={val}>{n.replace("radius/", "")} · {v}</div>
          </div>
        ))}
      </div>

      {/* ============================= MOTION ============================= */}
      <div style={groupTitle}>Motion</div>

      <h2 style={h2}>duration (primitives)</h2>
      <div style={{ display: "grid", gap: "var(--space-xs)" }}>
        {pick(prim, "duration/").map(([n, v]) => {
          const ms = parseInt(String(v), 10) || 0;
          return (
            <div key={n} style={row}>
              <code style={key}>{short(n)} · {v}</code>
              <div style={{ height: 8, width: Math.max(2, ms * 0.5), background: "var(--color-bg-brand)", borderRadius: "var(--radius-pill)" }} />
            </div>
          );
        })}
      </div>

      <h2 style={h2}>easing (primitives)</h2>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
        {pick(prim, "easing/").map(([n, v]) => (
          <div key={n} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
            <EaseCurve value={String(v)} />
            <div><div style={{ fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-label-m)", fontWeight: 500 }}>{short(n)}</div><div style={val}>{v}</div></div>
          </div>
        ))}
      </div>

      <h2 style={h2}>motion (scales — alias)</h2>
      <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
        {pick(scales, "motion/").map(([n, v]) => <code key={n} style={{ ...mono, color: "var(--color-text-secondary)" }}>{n} · {v}</code>)}
      </div>

      {/* ============================= INTERACTION ============================= */}
      <div style={groupTitle}>Interaction</div>

      <h2 style={h2}>state layers (scales — opacidad de estado)</h2>
      <div style={{ ...row, gap: "var(--space-md)", flexWrap: "wrap" }}>
        {pick(scales, "state/").map(([n, v]) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ position: "relative", width: 88, height: 56, background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-control)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--color-text-primary)", opacity: Number(v) }} />
            </div>
            <div style={val}>{short(n)}</div>
            <div style={note}>{Math.round(Number(v) * 100)}%</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>opacity (primitives)</h2>
      <div style={{ ...row, gap: "var(--space-sm)", flexWrap: "wrap" }}>
        {pick(prim, "opacity/").map(([n, v]) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, background: "var(--color-text-primary)", opacity: Number(v), borderRadius: "var(--radius-xs)" }} />
            <div style={val}>{v}</div>
          </div>
        ))}
      </div>

      {/* ============================= SIZING ============================= */}
      <div style={groupTitle}>Sizing</div>

      <h2 style={h2}>icon-size (primitives) · icon (scales)</h2>
      <div style={{ ...row, gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "flex-end" }}>
        {pick(prim, "icon-size/").map(([n, v]) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: v, height: v, background: "var(--color-bg-brand)", borderRadius: "var(--radius-xs)" }} />
            <div style={val}>{short(n)} · {v}</div>
          </div>
        ))}
      </div>
      <div style={{ ...note, marginTop: "var(--space-xs)" }}>
        Alias semánticos → {pick(scales, "icon/").map(([n, v]) => `${short(n)}=${v}`).join(" · ")}
      </div>

      <h2 style={h2}>size · objetivo táctil mínimo (scales)</h2>
      <div style={{ ...row, gap: "var(--space-md)" }}>
        {pick(scales, "size/").map(([n, v]) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <div style={{ width: v, height: v, background: "var(--color-bg-brand-2-subtle)", border: "1px dashed var(--color-border-brand-2)", borderRadius: "var(--radius-xs)" }} />
            <div>
              <code style={{ ...mono, color: "var(--color-text-secondary)" }}>{n} · {v}</code>
              <div style={note}>Área mínima interactiva (WCAG 2.5.8 · AA target size).</div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={h2}>aspect-ratio (scales)</h2>
      <div style={{ ...row, gap: "var(--space-md)", flexWrap: "wrap", alignItems: "flex-start" }}>
        {pick(scales, "aspect/").map(([n, v]) => (
          <div key={n} style={{ width: 140 }}>
            <div style={{ width: "100%", aspectRatio: String(v), background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-control)" }} />
            <div style={val}>{short(n)} · {v}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>border-width (scales)</h2>
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {pick(scales, "border-width/").map(([n, v]) => (
          <div key={n} style={row}>
            <code style={key}>{short(n)} · {v}</code>
            <div style={{ width: 120, borderTop: `${v} solid var(--color-text-primary)` }} />
          </div>
        ))}
      </div>

      {/* ============================= LAYOUT ============================= */}
      <div style={groupTitle}>Layout</div>

      <h2 style={h2}>grid (por modo)</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", ...mono, color: "var(--color-text-secondary)" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "var(--space-2xs) var(--space-md) var(--space-2xs) 0", color: "var(--color-text-tertiary)" }} />
              {["base", "sm", "md", "lg", "xl", "2xl"].map((m) => <th key={m} style={{ textAlign: "right", padding: "var(--space-2xs) var(--space-md)", color: "var(--color-text-tertiary)" }}>{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {Object.entries(gridTokens).map(([name, modes]) => (
              <tr key={name}>
                <td style={{ padding: "var(--space-2xs) var(--space-md) var(--space-2xs) 0", color: "var(--color-text-primary)" }}>{name}</td>
                {["base", "sm", "md", "lg", "xl", "2xl"].map((m) => <td key={m} style={{ textAlign: "right", padding: "var(--space-2xs) var(--space-md)" }}>{modes[m]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2}>z-index (primitives)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: "var(--space-2xs)" }}>
        {pick(prim, "z/").map(([n, v]) => <code key={n} style={{ ...mono, color: "var(--color-text-secondary)" }}>{short(n)} · {v}</code>)}
      </div>

      <h2 style={h2}>breakpoints (primitives)</h2>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
        {pick(prim, "breakpoint/").map(([n, v]) => <code key={n} style={{ ...mono, color: "var(--color-text-secondary)" }}>{short(n)} · {v}</code>)}
      </div>

      {/* ============================= EFFECTS ============================= */}
      <div style={groupTitle}>Effects</div>

      <h2 style={h2}>shadow (semantic · por tema)</h2>
      <div style={{ ...row, gap: "var(--space-2xl)", flexWrap: "wrap" }}>
        {Object.keys(effects).filter((n) => n.startsWith("shadow/")).map((n) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: 96, height: 64, background: "var(--color-bg-elevated)", borderRadius: "var(--radius-surface)", boxShadow: cssVar(n) }} />
            <div style={{ ...val, marginTop: "var(--space-sm)" }}>{short(n)}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>gradient (semantic · por tema)</h2>
      <div style={grid(180)}>
        {Object.keys(effects).filter((n) => n.startsWith("gradient/")).map((n) => (
          <div key={n}>
            <div style={{ height: 64, background: cssVar(n), borderRadius: "var(--radius-surface)", border: "1px solid var(--color-border-subtle)" }} />
            <div style={val}>{short(n)}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};
