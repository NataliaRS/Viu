import { useState } from "react";
import { Button, Icon, type ButtonVariant, type ButtonSize, type GlyphName } from "../index";

const variants: ButtonVariant[] = ["primary", "secondary", "tertiary"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];
const allGlyphs: GlyphName[] = [
  "Plus",
  "Check",
  "Chevron",
  "Close",
  "Arrow",
  "Search",
  "Info",
  "Alert",
];

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "var(--color-bg-base)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-family-body)",
    padding: "var(--space-2xl)",
  };
  const h2: React.CSSProperties = {
    color: "var(--color-text-secondary)",
    fontFamily: "var(--font-family-label)",
    letterSpacing: "4px",
    fontSize: "var(--font-size-label-s)",
    textTransform: "uppercase",
    margin: "var(--space-2xl) 0 var(--space-md)",
  };
  const row: React.CSSProperties = {
    display: "flex",
    gap: "var(--space-md)",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "var(--space-md)",
  };

  return (
    <div style={pageStyle}>
      <div style={{ ...row, justifyContent: "space-between" }}>
        <strong className="viu-type-title-m">VIU UI · Playground</strong>
        <Button variant="secondary" size="sm" onClick={toggle}>
          Tema: {theme}
        </Button>
      </div>

      {variants.map((v) => (
        <div key={v}>
          <h2 style={h2}>{v}</h2>
          <div style={row}>
            {sizes.map((s) => (
              <Button key={s} variant={v} size={s}>
                Button {s.toUpperCase()}
              </Button>
            ))}
            <Button variant={v} leadingIcon={<Icon glyph="Plus" />}>
              Con icono
            </Button>
            <Button variant={v} trailingIcon={<Icon glyph="Arrow" />}>
              Siguiente
            </Button>
            <Button variant={v} disabled>
              Disabled
            </Button>
          </div>
        </div>
      ))}

      <h2 style={h2}>Iconos</h2>
      <div style={{ ...row, gap: "var(--space-lg)" }}>
        {allGlyphs.map((g) => (
          <div key={g} style={{ display: "grid", placeItems: "center", gap: "var(--space-xs)" }}>
            <Icon glyph={g} size={24} title={g} />
            <span className="viu-type-body-s" style={{ color: "var(--color-text-tertiary)" }}>
              {g}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
